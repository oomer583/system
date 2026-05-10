import { Device } from '../types';
import { firestoreService } from './firestoreService';

interface DeviceHeartbeat {
  deviceId: string;
  timestamp: Date;
  battery: number;
  rssi: number;
  status: 'online' | 'offline';
}

class HeartbeatService {
  private activeHeartbeats: Map<string, NodeJS.Timer> = new Map();
  private heartbeatInterval = 30000; // 30 seconds

  startHeartbeat(deviceId: string, interval: number = this.heartbeatInterval): void {
    // Stop existing heartbeat if any
    this.stopHeartbeat(deviceId);

    const timer = setInterval(async () => {
      await this.sendHeartbeat(deviceId);
    }, interval);

    this.activeHeartbeats.set(deviceId, timer);
    console.log(`Heartbeat started for device: ${deviceId}`);
  }

  stopHeartbeat(deviceId: string): void {
    const timer = this.activeHeartbeats.get(deviceId);
    if (timer) {
      clearInterval(timer);
      this.activeHeartbeats.delete(deviceId);
      console.log(`Heartbeat stopped for device: ${deviceId}`);
    }
  }

  private async sendHeartbeat(deviceId: string): Promise<void> {
    try {
      const heartbeat: DeviceHeartbeat = {
        deviceId,
        timestamp: new Date(),
        battery: Math.max(0, 100 - Math.random() * 30),
        rssi: -40 - Math.random() * 40,
        status: 'online'
      };

      // Update device lastSeen
      await firestoreService.updateDevice(deviceId, {
        lastSeen: heartbeat.timestamp,
        battery: heartbeat.battery,
        rssi: heartbeat.rssi,
        status: heartbeat.status,
        isConnected: true
      } as any);

      console.log(`Heartbeat sent for device ${deviceId}:`, heartbeat);
    } catch (error) {
      console.error(`Error sending heartbeat for device ${deviceId}:`, error);
    }
  }

  async markDeviceOffline(deviceId: string): Promise<void> {
    try {
      this.stopHeartbeat(deviceId);
      await firestoreService.updateDevice(deviceId, {
        status: 'offline',
        isConnected: false,
        lastSeen: new Date()
      } as any);
    } catch (error) {
      console.error(`Error marking device offline: ${deviceId}`, error);
    }
  }

  stopAllHeartbeats(): void {
    for (const [deviceId] of this.activeHeartbeats) {
      this.stopHeartbeat(deviceId);
    }
  }

  getActiveHeartbeats(): string[] {
    return Array.from(this.activeHeartbeats.keys());
  }

  isHeartbeatActive(deviceId: string): boolean {
    return this.activeHeartbeats.has(deviceId);
  }
}

export const heartbeatService = new HeartbeatService();
export default heartbeatService;
