import React, { useState } from 'react';
import './ConnectionRequest.css';
import { ConnectionRequest } from '../types';

interface ConnectionRequestProps {
  request: ConnectionRequest;
  deviceName: string;
  onAccept: () => void;
  onReject: () => void;
}

const ConnectionRequest: React.FC<ConnectionRequestProps> = ({
  request,
  deviceName,
  onAccept,
  onReject
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAccept = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    onAccept();
    setIsProcessing(false);
  };

  const handleReject = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    onReject();
    setIsProcessing(false);
  };

  return (
    <div className="connection-request-overlay">
      <div className="connection-request-popup">
        <div className="request-icon">🔗</div>
        <h2>Bağlantı İsteği</h2>
        <p className="request-message">
          <strong>{deviceName}</strong> sizin cihazınızı kontrol etmek istiyor.
        </p>
        <p className="request-time">
          İstek zamanı: {request.timestamp.toLocaleTimeString('tr-TR')}
        </p>
        
        <div className="request-details">
          <p>İstek ID: <code>{request.id}</code></p>
          <p>Cihaz ID: <code>{request.fromDeviceId}</code></p>
        </div>

        <div className="request-actions">
          <button 
            className="btn-accept"
            onClick={handleAccept}
            disabled={isProcessing}
          >
            {isProcessing ? '⏳ İşleniyor...' : '✓ Kabul Et'}
          </button>
          <button 
            className="btn-reject"
            onClick={handleReject}
            disabled={isProcessing}
          >
            {isProcessing ? '⏳ İşleniyor...' : '✗ Reddet'}
          </button>
        </div>

        <p className="warning-text">
          ⚠️ Yalnızca güvenilir cihazlardan gelen istekleri kabul edin.
        </p>
      </div>
    </div>
  );
};

export default ConnectionRequest;
