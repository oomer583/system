import { useEffect, useCallback } from 'react';
import { heartbeatService } from '../services/heartbeatService';

interface UseDeviceHeartbeatOptions {
  interval?: number;
  onOffline?: (deviceId: string) => void;
}

export const useDeviceHeartbeat = (
  deviceId: string,
  options?: UseDeviceHeartbeatOptions
) => {
  const { interval = 30000, onOffline } = options || {};

  useEffect(() => {
    // Start heartbeat for device
    heartbeatService.startHeartbeat(deviceId, interval);

    return () => {
      // Stop heartbeat when component unmounts
      heartbeatService.stopHeartbeat(deviceId);
      onOffline?.(deviceId);
    };
  }, [deviceId, interval, onOffline]);

  const markOffline = useCallback(async () => {
    await heartbeatService.markDeviceOffline(deviceId);
  }, [deviceId]);

  const isActive = heartbeatService.isHeartbeatActive(deviceId);

  return { isActive, markOffline };
};

export default useDeviceHeartbeat;
