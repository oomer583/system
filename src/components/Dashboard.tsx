import React, { useState } from 'react';
import './Dashboard.css';
import DeviceList from './DeviceList';
import LogsPanel from './LogsPanel';
import TrustedDevices from './TrustedDevices';
import Sessions from './Sessions';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'devices' | 'logs' | 'trusted' | 'sessions'>('devices');

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🖥️ Remote Device Control</h1>
        <button onClick={onLogout} className="logout-btn">Çıkış</button>
      </header>

      <nav className="dashboard-nav">
        <button 
          className={`nav-btn ${activeTab === 'devices' ? 'active' : ''}`}
          onClick={() => setActiveTab('devices')}
        >
          📱 Cihazlar
        </button>
        <button 
          className={`nav-btn ${activeTab === 'logs' ? 'active' : ''}`}
          onClick={() => setActiveTab('logs')}
        >
          📋 Loglar
        </button>
        <button 
          className={`nav-btn ${activeTab === 'trusted' ? 'active' : ''}`}
          onClick={() => setActiveTab('trusted')}
        >
          🔒 Güvenilir
        </button>
        <button 
          className={`nav-btn ${activeTab === 'sessions' ? 'active' : ''}`}
          onClick={() => setActiveTab('sessions')}
        >
          📊 Oturumlar
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'devices' && <DeviceList />}
        {activeTab === 'logs' && <LogsPanel />}
        {activeTab === 'trusted' && <TrustedDevices />}
        {activeTab === 'sessions' && <Sessions />}
      </main>
    </div>
  );
};

export default Dashboard;
