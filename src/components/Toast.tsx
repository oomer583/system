import React, { useState, useEffect } from 'react';
import './Toast.css';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface ToastContainerProps {
  messages: ToastMessage[];
  onRemove: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages, onRemove }) => {
  useEffect(() => {
    const timers = messages.map(msg => {
      const timer = setTimeout(() => {
        onRemove(msg.id);
      }, msg.duration || 3000);
      return () => clearTimeout(timer);
    });

    return () => timers.forEach(clear => clear());
  }, [messages, onRemove]);

  return (
    <div className="toast-container">
      {messages.map(msg => (
        <div key={msg.id} className={`toast toast-${msg.type}`}>
          <span className="toast-icon">
            {msg.type === 'success' && '✓'}
            {msg.type === 'error' && '✕'}
            {msg.type === 'warning' && '⚠'}
            {msg.type === 'info' && 'ℹ'}
          </span>
          <span className="toast-message">{msg.message}</span>
          <button 
            className="toast-close"
            onClick={() => onRemove(msg.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
