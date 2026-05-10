import React from 'react';
import './TrustedDevices.css';

interface TrustedDevice {
  id: string;
  name: string;
  addedDate: Date;
  lastUsed: Date;
}

const TrustedDevices: React.FC = () => {
  const [devices] = React.useState<TrustedDevice[]>([
    {
      id: 'device-trusted-001',
      name: 'Samsung Galaxy Tab S7',
      addedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 'device-trusted-002',
      name: 'MacBook Pro',
      addedDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      lastUsed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'device-trusted-003',
      name: 'Windows PC',
      addedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      lastUsed: new Date()
    }
  ]);

  const handleRemove = (id: string) => {
    alert(`Güvenilir cihaz kaldırılacak: ${id}`);
  };

  return (
    <div className="trusted-devices">
      <div className="section-header">
        <h2>🔒 Güvenilir Cihazlar</h2>
        <p>{devices.length} cihaz kayıtlı</p>
      </div>

      <div className="devices-table">
        <div className="table-header">
          <div className="col-name">Cihaz Adı</div>
          <div className="col-date">Ekleme Tarihi</div>
          <div className="col-used">Son Kullanım</div>
          <div className="col-action">İşlem</div>
        </div>

        {devices.map(device => (
          <div key={device.id} className="table-row">
            <div className="col-name">
              <span className="device-icon">📱</span>
              <span>{device.name}</span>
            </div>
            <div className="col-date">
              {device.addedDate.toLocaleDateString('tr-TR')}
            </div>
            <div className="col-used">
              {Math.floor((Date.now() - device.lastUsed.getTime()) / (1000 * 60 * 60))} saat önce
            </div>
            <div className="col-action">
              <button 
                className="btn-remove"
                onClick={() => handleRemove(device.id)}
              >
                🗑️ Kaldır
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustedDevices;
