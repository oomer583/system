import React, { useState } from 'react';
import './DeviceManagement.css';
import { Device } from '../types';

interface DeviceManagementProps {
  devices: Device[];
  onAdd: () => void;
  onRemove: (id: string) => void;
}

const DeviceManagement: React.FC<DeviceManagementProps> = ({ 
  devices = [], 
  onAdd, 
  onRemove 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.ipAddress.includes(searchTerm)
  );

  return (
    <div className="device-management">
      <div className="management-header">
        <h2>📱 Cihaz Yönetimi</h2>
        <button className="btn-add-device" onClick={onAdd}>+ Cihaz Ekle</button>
      </div>

      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Cihaz ara (ad veya IP)..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="management-table">
        <div className="table-header">
          <div>Cihaz Adı</div>
          <div>Model</div>
          <div>IP Adresi</div>
          <div>Durum</div>
          <div>İşlemler</div>
        </div>

        {filteredDevices.map(device => (
          <div key={device.id} className="table-row">
            <div className="col-name">📱 {device.name}</div>
            <div>{device.model}</div>
            <div className="mono">{device.ipAddress}</div>
            <div>
              <span className={`badge ${device.status}`}>
                {device.status === 'online' ? '🟢 Çevrimiçi' : '🔴 Çevrimdışı'}
              </span>
            </div>
            <div>
              <button className="btn-edit">✏️ Düzenle</button>
              <button 
                className="btn-delete"
                onClick={() => onRemove(device.id)}
              >
                🗑️ Sil
              </button>
            </div>
          </div>
        ))}

        {filteredDevices.length === 0 && (
          <div className="empty-state">
            <p>📭 Cihaz bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceManagement;
