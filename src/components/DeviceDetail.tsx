import React from 'react';
import { Device } from '../types';
import './DeviceDetail.css';

interface DeviceDetailProps {
  device: Device;
  onClose: () => void;
}

const formatLastSeen = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);

  if (diffMins < 1) return 'Şimdi';
  if (diffMins < 60) return `${diffMins} dakika önce`;
  if (diffHours < 24) return `${diffHours} saat önce`;
  return date.toLocaleDateString('tr-TR');
};

const DeviceDetail: React.FC<DeviceDetailProps> = ({ device, onClose }) => {
  return (
    <div className="device-detail-modal" onClick={onClose}>
      <div className="device-detail-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="detail-header">
          <h2>{device.name}</h2>
          <span className={`status-badge ${device.status}`}>
            {device.status === 'online' ? '🟢 Çevrimiçi' : '🔴 Çevrimdışı'}
          </span>
        </div>

        <div className="detail-grid">
          <div className="detail-section">
            <h3>Cihaz Bilgileri</h3>
            <div className="detail-item">
              <label>Model:</label>
              <span>{device.model}</span>
            </div>
            <div className="detail-item">
              <label>İşletim Sistemi:</label>
              <span>{device.osVersion}</span>
            </div>
            <div className="detail-item">
              <label>IP Adresi:</label>
              <span>{device.ipAddress}</span>
            </div>
            <div className="detail-item">
              <label>Cihaz ID:</label>
              <span className="mono">{device.id}</span>
            </div>
          </div>

          <div className="detail-section">
            <h3>Durum Bilgileri</h3>
            <div className="detail-item">
              <label>Bağlantı:</label>
              <span>{device.isConnected ? '✓ Bağlı' : '✗ Bağlı Değil'}</span>
            </div>
            <div className="detail-item">
              <label>Pil Durumu:</label>
              <div className="battery-bar">
                <div 
                  className={`battery-fill ${device.battery! > 50 ? 'high' : device.battery! > 20 ? 'medium' : 'low'}`}
                  style={{ width: `${device.battery}%` }}
                />
                <span>{device.battery}%</span>
              </div>
            </div>
            <div className="detail-item">
              <label>Sinyal Gücü:</label>
              <span>{device.rssi}dBm</span>
            </div>
            <div className="detail-item">
              <label>Son Görülme:</label>
              <span>{formatLastSeen(device.lastSeen)}</span>
            </div>
          </div>
        </div>

        <div className="detail-actions">
          <button className="btn-primary" disabled={!device.isConnected}>
            🎮 Kontrol Et
          </button>
          <button className="btn-secondary">📋 Loglar</button>
          <button className="btn-secondary">🔒 İzinler</button>
          <button className="btn-danger">🗑️ Çıkar</button>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetail;
