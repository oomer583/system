import React, { useState, useRef } from 'react';
import './FileTransfer.css';

interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'failed';
  timestamp: Date;
}

interface FileTransferProps {
  deviceId: string;
  deviceName: string;
  onClose: () => void;
}

const FileTransfer: React.FC<FileTransferProps> = ({ deviceId, deviceName, onClose }) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [tab, setTab] = useState<'send' | 'receive'>('send');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const fileItem: FileItem = {
        id: Date.now().toString() + i,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'pending',
        timestamp: new Date()
      };

      setFiles(prev => [...prev, fileItem]);

      // Simulate upload
      simulateUpload(fileItem.id);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const simulateUpload = (fileId: string) => {
    setFiles(prev => prev.map(f => f.id === fileId ? { ...f, status: 'uploading' } : f));

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) progress = 100;

      setFiles(prev => prev.map(f =>
        f.id === fileId
          ? {
              ...f,
              progress: Math.min(progress, 100),
              status: progress >= 100 ? 'completed' : 'uploading'
            }
          : f
      ));

      if (progress >= 100) clearInterval(interval);
    }, 500);
  };

  const handleRemoveFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const getFileIcon = (type: string): string => {
    if (type.startsWith('image/')) return '🖼️';
    if (type.startsWith('video/')) return '🎥';
    if (type.startsWith('audio/')) return '🎵';
    if (type === 'application/pdf') return '📄';
    return '📁';
  };

  return (
    <div className="file-transfer-overlay" onClick={onClose}>
      <div className="file-transfer-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="transfer-header">
          <h2>📁 Dosya Transfer</h2>
          <p>{deviceName}</p>
        </div>

        <div className="transfer-tabs">
          <button
            className={`tab-btn ${tab === 'send' ? 'active' : ''}`}
            onClick={() => setTab('send')}
          >
            📤 Gönder
          </button>
          <button
            className={`tab-btn ${tab === 'receive' ? 'active' : ''}`}
            onClick={() => setTab('receive')}
          >
            📥 Al
          </button>
        </div>

        <div className="transfer-content">
          {tab === 'send' ? (
            <div className="send-section">
              <div
                className="drop-zone"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add('dragover');
                }}
                onDragLeave={(e) => {
                  e.currentTarget.classList.remove('dragover');
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('dragover');
                  handleFileSelect({
                    target: { files: e.dataTransfer.files }
                  } as any);
                }}
              >
                <div className="drop-content">
                  <p className="drop-icon">📤</p>
                  <p className="drop-text">Dosyaları buraya sürükleyin</p>
                  <p className="drop-subtext">veya</p>
                  <button
                    className="btn-select-files"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Dosya Seç
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
              </div>

              {files.length > 0 && (
                <div className="file-list">
                  <h3>Dosyalar</h3>
                  {files.map(file => (
                    <div key={file.id} className={`file-item ${file.status}`}>
                      <span className="file-icon">{getFileIcon(file.type)}</span>
                      <div className="file-info">
                        <p className="file-name">{file.name}</p>
                        <p className="file-size">{formatFileSize(file.size)}</p>
                      </div>
                      <div className="file-progress">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                        <span className="progress-text">{Math.round(file.progress)}%</span>
                      </div>
                      {file.status === 'completed' && (
                        <span className="status-badge completed">✓</span>
                      )}
                      {file.status === 'failed' && (
                        <span className="status-badge failed">✕</span>
                      )}
                      {file.status === 'pending' || file.status === 'uploading' ? (
                        <button
                          className="btn-remove"
                          onClick={() => handleRemoveFile(file.id)}
                        >
                          ✕
                        </button>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="receive-section">
              <div className="empty-state">
                <p>📭 Alınan dosya yok</p>
                <p className="info">Cihazdan dosya alması için bekleyin</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileTransfer;
