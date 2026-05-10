import React, { useState, useEffect } from 'react';
import './DeviceList.css';
import { Device } from '../types';
import { generateFakeDevices } from '../services/deviceService';
import DeviceDetail from './DeviceDetail';

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

const DeviceList: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  useEffect(() => {
    // Load fake devices
    setDevices(generateFakeDevices());
  }, []);

  return (
    <div className="device-list">
      <h2>Bağlı Cihazlar</h2>
      <div className="devices-grid">
        {devices.length === 0 ? (
          <p>Cihaz yükleniyor...</p>
        ) : (
          devices.map(device => (
            <div key={device.id} className={`device-card ${device.status}`}>
              <div className="device-header">
                <h3>{device.name}</h3>
                <span className={`status-badge ${device.status}`}>
                  {device.status === 'online' ? '🟢 Çevrimiçi' : '🔴 Çevrimdışı'}
                </span>
              </div>
              <div className="device-details">
                <p className="device-info">Model: {device.model}</p>
                <p className="device-info">OS: {device.osVersion}</p>
                <p className="device-info">IP: {device.ipAddress}</p>
                {device.battery !== undefined && (
                  <p className="device-info">Pil: {device.battery}%</p>
                )}
                <p className="device-info">Son görülme: {formatLastSeen(device.lastSeen)}</p>
              </div>
              <div className="device-actions">
                <button className="btn-primary" disabled={!device.isConnected}>
                  Kontrol Et
                </button>
                <button className="btn-secondary" onClick={() => setSelectedDevice(device)}>
                  Detaylar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedDevice && (
        <DeviceDetail 
          device={selectedDevice} 
          onClose={() => setSelectedDevice(null)} 
        />
      )}
    </div>
  );
};

export default DeviceList;
