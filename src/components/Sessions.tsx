import React, { useState } from 'react';
import './Sessions.css';
import { Session } from '../types';
import { generateFakeSessions } from '../services/deviceService';

const Sessions: React.FC = () => {
  const [sessions] = React.useState<Session[]>(generateFakeSessions());

  const handleDisconnect = (id: string) => {
    alert(`Session bağlantısı kesilecek: ${id}`);
  };

  return (
    <div className="sessions">
      <div className="section-header">
        <h2>📊 Aktif Oturumlar</h2>
        <p>{sessions.filter(s => s.isActive).length} aktif oturum</p>
      </div>

      <div className="sessions-list">
        {sessions.map(session => (
          <div key={session.id} className={`session-item ${session.isActive ? 'active' : 'inactive'}`}>
            <div className="session-info">
              <div className="session-header">
                <span className={`session-badge ${session.isActive ? 'active' : 'inactive'}`}>
                  {session.isActive ? '🟢 Aktif' : '⏹️ Sonlandırıldı'}
                </span>
                <span className="session-id">{session.id}</span>
              </div>
              <div className="session-details">
                <p>Cihaz: <strong>{session.deviceId}</strong></p>
                <p>Başlangıç: {session.startTime.toLocaleString('tr-TR')}</p>
                {session.endTime && (
                  <p>Sonlandırma: {session.endTime.toLocaleString('tr-TR')}</p>
                )}
                <p>Süre: {Math.floor((session.endTime || new Date()).getTime() - session.startTime.getTime()) / 1000 / 60} dakika</p>
              </div>
            </div>
            {session.isActive && (
              <button 
                className="btn-disconnect"
                onClick={() => handleDisconnect(session.id)}
              >
                ✕ Sonlandır
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sessions;
