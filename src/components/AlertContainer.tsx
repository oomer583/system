import React from 'react';
import { useAlert, Alert } from '../context/AlertContext';
import './AlertContainer.css';

const AlertContainer: React.FC = () => {
  const { alerts, removeAlert } = useAlert();

  const getIcon = (type: Alert['type']): string => {
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠️',
      info: 'ℹ'
    };
    return icons[type];
  };

  return (
    <div className="alert-container">
      {alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.type}`}>
          <div className="alert-content">
            <span className="alert-icon">{getIcon(alert.type)}</span>
            <div className="alert-text">
              <p className="alert-title">{alert.title}</p>
              <p className="alert-message">{alert.message}</p>
            </div>
          </div>
          <button
            className="alert-close"
            onClick={() => removeAlert(alert.id)}
            aria-label="Kapat"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default AlertContainer;
