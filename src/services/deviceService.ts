import { Device, ConnectionRequest, SecurityLog, Session } from '../types';

// Fake devices data
export const generateFakeDevices = (): Device[] => {
  return [
    {
      id: 'device-001',
      name: 'Samsung Galaxy S21',
      model: 'SM-G991B',
      osVersion: 'Android 13',
      ipAddress: '192.168.1.100',
      status: 'online',
      lastSeen: new Date(),
      isConnected: true,
      battery: 85,
      rssi: -45
    },
    {
      id: 'device-002',
      name: 'iPhone 13 Pro',
      model: 'iPhone13,3',
      osVersion: 'iOS 16.5',
      ipAddress: '192.168.1.101',
      status: 'offline',
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isConnected: false,
      battery: 20,
      rssi: -80
    },
    {
      id: 'device-003',
      name: 'Pixel 6',
      model: 'oriole',
      osVersion: 'Android 14',
      ipAddress: '192.168.1.102',
      status: 'online',
      lastSeen: new Date(),
      isConnected: true,
      battery: 92,
      rssi: -35
    },
    {
      id: 'device-004',
      name: 'OnePlus 9',
      model: 'LE2101',
      osVersion: 'Android 12',
      ipAddress: '192.168.1.103',
      status: 'online',
      lastSeen: new Date(),
      isConnected: true,
      battery: 65,
      rssi: -50
    }
  ];
};

export const generateFakeSessions = (): Session[] => {
  return [
    {
      id: 'session-001',
      deviceId: 'device-001',
      userId: 'user-123',
      startTime: new Date(Date.now() - 30 * 60 * 1000),
      isActive: true
    },
    {
      id: 'session-002',
      deviceId: 'device-003',
      userId: 'user-123',
      startTime: new Date(Date.now() - 5 * 60 * 1000),
      endTime: new Date(Date.now() - 1 * 60 * 1000),
      isActive: false
    }
  ];
};

export const generateFakeLogs = (): SecurityLog[] => {
  return [
    {
      id: 'log-001',
      deviceId: 'device-001',
      action: 'screen_capture',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      details: { resolution: '1080x2400', size: 2.5 }
    },
    {
      id: 'log-002',
      deviceId: 'device-001',
      action: 'touch_input',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      details: { x: 540, y: 1200 }
    }
  ];
};
