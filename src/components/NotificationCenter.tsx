import React, { useState } from 'react';
import './NotificationCenter.css';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

const NotificationCenter: React.FC = () => {
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Cihaz Bağlandı',
      message: 'Samsung Galaxy S21 bağlandı',
      type: 'success',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false
    },
    {
      id: '2',
      title: 'Bağlantı Kesildi',
      message: 'iPhone 13 Pro bağlantı kesildi',
      type: 'warning',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false
    },
    {
      id: '3',
      title: 'Sistem Güncellemesi',
      message: 'Yeni güvenlik güncellemesi mevcut',
      type: 'info',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    const icons: Record<string, string> = {
      'info': 'ℹ️',
      'success': '✓',
      'warning': '⚠️',
      'error': '✕'
    };
    return icons[type] || '📬';
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return 'Az önce';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    return date.toLocaleDateString('tr-TR');
  };

  return (
    <div className="notification-center">
      <div className="notification-header">
        <h2>🔔 Bildirimler</h2>
        {unreadCount > 0 && (
          <span className="unread-badge">{unreadCount}</span>
        )}
      </div>

      <div className="notification-list">
        {notifications.map(notif => (
          <div key={notif.id} className={`notification-item ${notif.type} ${notif.read ? 'read' : 'unread'}`}>
            <div className="notification-icon">{getIcon(notif.type)}</div>
            <div className="notification-content">
              <h4>{notif.title}</h4>
              <p>{notif.message}</p>
              <span className="notification-time">{formatTime(notif.timestamp)}</span>
            </div>
            <button className="notification-close">×</button>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="empty-notifications">
          <p>📭 Bildirim yok</p>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
