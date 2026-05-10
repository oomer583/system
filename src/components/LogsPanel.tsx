import React, { useState, useEffect } from 'react';
import './LogsPanel.css';
import { SecurityLog } from '../types';
import { generateFakeLogs } from '../services/deviceService';

const LogsPanel: React.FC = () => {
  const [logs, setLogs] = useState<SecurityLog[]>([]);
  const [filterAction, setFilterAction] = useState<string>('all');

  useEffect(() => {
    setLogs(generateFakeLogs());
  }, []);

  const uniqueActions = Array.from(new Set(logs.map(log => log.action)));
  
  const filteredLogs = filterAction === 'all' 
    ? logs 
    : logs.filter(log => log.action === filterAction);

  const getActionIcon = (action: string): string => {
    const icons: Record<string, string> = {
      'screen_capture': '📸',
      'touch_input': '👆',
      'keyboard_input': '⌨️',
      'file_transfer': '📁',
      'clipboard': '📋',
      'call_log': '☎️',
      'sms': '💬',
    };
    return icons[action] || '📝';
  };

  const formatActionName = (action: string): string => {
    return action.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="logs-panel">
      <div className="logs-header">
        <h2>Güvenlik Logları</h2>
        <div className="logs-filter">
          <select 
            value={filterAction} 
            onChange={(e) => setFilterAction(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tüm İşlemler ({logs.length})</option>
            {uniqueActions.map(action => (
              <option key={action} value={action}>
                {formatActionName(action)} ({logs.filter(l => l.action === action).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="logs-container">
        {filteredLogs.length === 0 ? (
          <div className="empty-state">
            <p>📭 Seçili kategoride log bulunmamaktadır.</p>
          </div>
        ) : (
          <div className="logs-list">
            {filteredLogs.map((log) => (
              <div key={log.id} className="log-item">
                <div className="log-icon">
                  {getActionIcon(log.action)}
                </div>
                <div className="log-content">
                  <h4>{formatActionName(log.action)}</h4>
                  <p className="log-device">Cihaz: {log.deviceId}</p>
                  <p className="log-time">
                    ⏱️ {log.timestamp.toLocaleString('tr-TR')}
                  </p>
                  {Object.keys(log.details).length > 0 && (
                    <details className="log-details">
                      <summary>Detaylar</summary>
                      <pre>{JSON.stringify(log.details, null, 2)}</pre>
                    </details>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="logs-stats">
        <div className="stat-item">
          <span>Toplam Log:</span>
          <strong>{logs.length}</strong>
        </div>
        <div className="stat-item">
          <span>Görüntülenen:</span>
          <strong>{filteredLogs.length}</strong>
        </div>
        <div className="stat-item">
          <span>İşlem Türü:</span>
          <strong>{uniqueActions.length}</strong>
        </div>
      </div>
    </div>
  );
};

export default LogsPanel;
