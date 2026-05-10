import React, { useState } from 'react';
import './AdminPanel.css';

interface AdminStats {
  totalDevices: number;
  activeDevices: number;
  totalUsers: number;
  totalSessions: number;
}

const AdminPanel: React.FC = () => {
  const [stats] = useState<AdminStats>({
    totalDevices: 156,
    activeDevices: 89,
    totalUsers: 234,
    totalSessions: 1024
  });

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>👑 Admin Paneli</h2>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📱</div>
          <div className="stat-content">
            <h3>Toplam Cihaz</h3>
            <p className="stat-number">{stats.totalDevices}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🟢</div>
          <div className="stat-content">
            <h3>Aktif Cihaz</h3>
            <p className="stat-number">{stats.activeDevices}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Toplam Kullanıcı</h3>
            <p className="stat-number">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Oturum</h3>
            <p className="stat-number">{stats.totalSessions}</p>
          </div>
        </div>
      </div>

      <div className="admin-sections">
        <div className="admin-section">
          <h3>📋 Yönetim Araçları</h3>
          <div className="tool-buttons">
            <button className="tool-btn">👥 Kullanıcı Yönetimi</button>
            <button className="tool-btn">📱 Cihaz Yönetimi</button>
            <button className="tool-btn">🔐 İzinler</button>
            <button className="tool-btn">📊 Raporlar</button>
            <button className="tool-btn">🔧 Sistem Ayarları</button>
            <button className="tool-btn">🗑️ Temizleme</button>
          </div>
        </div>

        <div className="admin-section">
          <h3>⚠️ Sistem Durumu</h3>
          <div className="status-items">
            <div className="status-item">
              <span>API Sunucusu</span>
              <span className="status-badge ok">✓ Çalışıyor</span>
            </div>
            <div className="status-item">
              <span>Firebase</span>
              <span className="status-badge ok">✓ Bağlı</span>
            </div>
            <div className="status-item">
              <span>WebSocket</span>
              <span className="status-badge ok">✓ Aktif</span>
            </div>
            <div className="status-item">
              <span>Veritabanı</span>
              <span className="status-badge ok">✓ İyi</span>
            </div>
          </div>
        </div>

        <div className="admin-section">
          <h3>🔒 Güvenlik</h3>
          <div className="security-options">
            <button className="security-btn">🔐 SSL Sertifikası</button>
            <button className="security-btn">🛡️ Firewall Kuralları</button>
            <button className="security-btn">📋 Audit Logları</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
