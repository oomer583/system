import React, { useState } from 'react';
import './ControlPanel.css';
import FileTransfer from './FileTransfer';

interface ControlPanelProps {
  deviceId?: string;
  deviceName: string;
  onClose: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ deviceId = 'unknown', deviceName, onClose }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showFileTransfer, setShowFileTransfer] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsConnected(true);
    setIsConnecting(false);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  return (
    <div className="control-panel-overlay" onClick={onClose}>
      <div className="control-panel" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="control-header">
          <h2>🎮 {deviceName}</h2>
          <span className={`status ${isConnected ? 'connected' : ''}`}>
            {isConnecting && '⏳ Bağlanıyor...'}
            {isConnected && '🟢 Bağlandı'}
            {!isConnecting && !isConnected && '🔴 Bağlantı Yok'}
          </span>
        </div>

        {!isConnected ? (
          <div className="connection-panel">
            <p>Uzak kontrol için bağlantı kurunuz.</p>
            <button 
              className="btn-connect"
              onClick={handleConnect}
              disabled={isConnecting}
            >
              {isConnecting ? '⏳ Bağlanıyor...' : '🔗 Bağlan'}
            </button>
          </div>
        ) : (
          <div className="remote-controls">
            <div className="control-section">
              <h3>Ekran Kontrolü</h3>
              <div className="screen-placeholder">
                <p>📺 Canlı Ekran (Simülasyon)</p>
              </div>
            </div>

            <div className="control-section">
              <h3>Kontrol Araçları</h3>
              <div className="control-buttons">
                <button className="control-btn">🏠 Home</button>
                <button className="control-btn">⬅️ Geri</button>
                <button className="control-btn">📋 Geçmiş</button>
                <button className="control-btn">🔆 Parlaklık</button>
                <button className="control-btn">🔊 Ses</button>
                <button className="control-btn">⚙️ Ayarlar</button>
              </div>
            </div>

            <div className="control-section">
              <h3>Dosya Transfer</h3>
              <div className="file-section">
                <button 
                  className="btn-file"
                  onClick={() => setShowFileTransfer(true)}
                >
                  📁 Dosya Yönetimi
                </button>
              </div>
            </div>

            <button 
              className="btn-disconnect"
              onClick={handleDisconnect}
            >
              ✕ Bağlantıyı Kes
            </button>
          </div>
        )}

        {showFileTransfer && (
          <FileTransfer
            deviceId={deviceId}
            deviceName={deviceName}
            onClose={() => setShowFileTransfer(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
