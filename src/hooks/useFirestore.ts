import { useState, useEffect } from 'react';
import { Device, SecurityLog, ConnectionRequest } from '../types';
import { firestoreService } from '../services/firestoreService';

interface UseFirestoreDevicesReturn {
  devices: Device[];
  loading: boolean;
  error: Error | null;
  addDevice: (device: Device) => Promise<void>;
  updateDevice: (id: string, updates: Partial<Device>) => Promise<void>;
  deleteDevice: (id: string) => Promise<void>;
}

export const useFirestoreDevices = (userId: string): UseFirestoreDevicesReturn => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    try {
      const unsubscribe = firestoreService.subscribeToDevices(userId, (updatedDevices) => {
        setDevices(updatedDevices);
        setLoading(false);
      });

      return unsubscribe;
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  }, [userId]);

  const addDevice = async (device: Device) => {
    try {
      await firestoreService.addDevice(device);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updateDevice = async (id: string, updates: Partial<Device>) => {
    try {
      await firestoreService.updateDevice(id, updates);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteDevice = async (id: string) => {
    try {
      await firestoreService.deleteDevice(id);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return { devices, loading, error, addDevice, updateDevice, deleteDevice };
};

interface UseFirestoreLogsReturn {
  logs: SecurityLog[];
  loading: boolean;
  error: Error | null;
  addLog: (log: SecurityLog) => Promise<void>;
}

export const useFirestoreLogs = (deviceId: string): UseFirestoreLogsReturn => {
  const [logs, setLogs] = useState<SecurityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    try {
      const unsubscribe = firestoreService.subscribeTologs(deviceId, (updatedLogs) => {
        setLogs(updatedLogs);
        setLoading(false);
      });

      return unsubscribe;
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  }, [deviceId]);

  const addLog = async (log: SecurityLog) => {
    try {
      await firestoreService.addLog(log);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return { logs, loading, error, addLog };
};

interface UseFirestoreRequestsReturn {
  requests: ConnectionRequest[];
  loading: boolean;
  error: Error | null;
  createRequest: (request: ConnectionRequest) => Promise<void>;
  acceptRequest: (id: string) => Promise<void>;
  rejectRequest: (id: string) => Promise<void>;
}

export const useFirestoreRequests = (deviceId: string): UseFirestoreRequestsReturn => {
  const [requests, setRequests] = useState<ConnectionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    try {
      const unsubscribe = firestoreService.subscribeToPendingRequests(deviceId, (updatedRequests) => {
        setRequests(updatedRequests);
        setLoading(false);
      });

      return unsubscribe;
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  }, [deviceId]);

  const createRequest = async (request: ConnectionRequest) => {
    try {
      await firestoreService.createRequest(request);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const acceptRequest = async (id: string) => {
    try {
      await firestoreService.updateRequestStatus(id, 'accepted');
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const rejectRequest = async (id: string) => {
    try {
      await firestoreService.updateRequestStatus(id, 'rejected');
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return { requests, loading, error, createRequest, acceptRequest, rejectRequest };
};

export default useFirestoreDevices;
