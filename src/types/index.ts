export interface Device {
  id: string;
  name: string;
  model: string;
  osVersion: string;
  ipAddress: string;
  status: 'online' | 'offline';
  lastSeen: Date;
  isConnected: boolean;
  battery?: number;
  rssi?: number; // Signal strength
}

export interface ConnectionRequest {
  id: string;
  fromDeviceId: string;
  toDeviceId: string;
  timestamp: Date;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface SecurityLog {
  id: string;
  deviceId: string;
  action: string;
  timestamp: Date;
  details: Record<string, any>;
}

export interface Session {
  id: string;
  deviceId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  isActive: boolean;
}
