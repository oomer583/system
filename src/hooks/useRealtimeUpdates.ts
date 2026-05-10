import { useState, useEffect } from 'react';
import { Device } from '../types';
import { generateFakeDevices } from '../services/deviceService';

interface UseRealtimeUpdatesReturn {
  devices: Device[];
  isConnected: boolean;
}

export const useRealtimeUpdates = (): UseRealtimeUpdatesReturn => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulate WebSocket connection
    const timer = setTimeout(() => {
      setIsConnected(true);
      setDevices(generateFakeDevices());
    }, 500);

    // Simulate periodic updates
    const updateInterval = setInterval(() => {
      setDevices(prevDevices =>
        prevDevices.map(device => ({
          ...device,
          lastSeen: new Date(),
          battery: Math.max(0, device.battery! - Math.random() * 5),
          rssi: device.rssi! + (Math.random() - 0.5) * 10
        }))
      );
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(updateInterval);
    };
  }, []);

  return { devices, isConnected };
};

export default useRealtimeUpdates;
