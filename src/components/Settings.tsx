import React, { useState } from 'react';
import './Settings.css';

interface SettingsProps {
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoConnect: true,
    screenshotQuality: '85',
    screenshotInterval: '500'
  });

  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="settings-header">
          <h2>⚙️ Ayarlar</h2>
        </div>

        <div className="settings-content">
          <div className="settings-section">
            <h3>Bildirimler</h3>
            <label className="setting-item">
              <input 
                type="checkbox" 
                checked={settings.notifications}
                onChange={(e) => handleChange('notifications', e.target.checked)}
              />
              <span>Push bildirimleri</span>
            </label>
          </div>

          <div className="settings-section">
            <h3>Görünüm</h3>
            <label className="setting-item">
              <input 
                type="checkbox" 
                checked={settings.darkMode}
                onChange={(e) => handleChange('darkMode', e.target.checked)}
              />
              <span>Karanlık tema (Çok Yakında)</span>
            </label>
          </div>

          <div className="settings-section">
            <h3>Bağlantı</h3>
            <label className="setting-item">
              <input 
                type="checkbox" 
                checked={settings.autoConnect}
                onChange={(e) => handleChange('autoConnect', e.target.checked)}
              />
              <span>Otomatik bağlan</span>
            </label>
          </div>

          <div className="settings-section">
            <h3>Ekran Yayını</h3>
            <div className="setting-group">
              <label>Kalite: {settings.screenshotQuality}%</label>
              <input 
                type="range" 
                min="30" 
                max="100" 
                value={settings.screenshotQuality}
                onChange={(e) => handleChange('screenshotQuality', e.target.value)}
              />
            </div>
            <div className="setting-group">
              <label>Güncelleme Hızı: {settings.screenshotInterval}ms</label>
              <input 
                type="range" 
                min="100" 
                max="2000" 
                step="100"
                value={settings.screenshotInterval}
                onChange={(e) => handleChange('screenshotInterval', e.target.value)}
              />
            </div>
          </div>

          <div className="settings-section danger">
            <h3>Tehlikeli</h3>
            <button className="btn-danger">🗑️ Tüm Verileri Sil</button>
            <button className="btn-danger">🔄 Fabrika Ayarlarına Dön</button>
          </div>
        </div>

        <div className="settings-footer">
          <button className="btn-save" onClick={onClose}>✓ Kaydet</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
