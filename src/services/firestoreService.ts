import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  onSnapshot,
  Firestore
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { Device, Session, SecurityLog, ConnectionRequest } from '../types';

// Firestore Collections
const DEVICES_COLLECTION = 'devices';
const SESSIONS_COLLECTION = 'sessions';
const LOGS_COLLECTION = 'security_logs';
const REQUESTS_COLLECTION = 'connection_requests';

class FirestoreService {
  // Device operations
  async addDevice(device: Device): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, DEVICES_COLLECTION), {
        ...device,
        lastSeen: device.lastSeen.toISOString(),
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding device:', error);
      throw error;
    }
  }

  async updateDevice(id: string, updates: Partial<Device>): Promise<void> {
    try {
      const deviceRef = doc(db, DEVICES_COLLECTION, id);
      await updateDoc(deviceRef, {
        ...updates,
        lastSeen: updates.lastSeen?.toISOString(),
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating device:', error);
      throw error;
    }
  }

  async deleteDevice(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, DEVICES_COLLECTION, id));
    } catch (error) {
      console.error('Error deleting device:', error);
      throw error;
    }
  }

  async getDevices(userId?: string): Promise<Device[]> {
    try {
      const queryRef = userId
        ? query(collection(db, DEVICES_COLLECTION), where('userId', '==', userId))
        : collection(db, DEVICES_COLLECTION);
      
      const snapshot = await getDocs(queryRef);
      return snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        lastSeen: new Date(doc.data().lastSeen)
      })) as Device[];
    } catch (error) {
      console.error('Error getting devices:', error);
      throw error;
    }
  }

  subscribeToDevices(userId: string, callback: (devices: Device[]) => void): () => void {
    try {
      const queryRef = query(
        collection(db, DEVICES_COLLECTION),
        where('userId', '==', userId)
      );

      const unsubscribe = onSnapshot(queryRef, (snapshot) => {
        const devices = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          lastSeen: new Date(doc.data().lastSeen)
        })) as Device[];
        callback(devices);
      });

      return unsubscribe;
    } catch (error) {
      console.error('Error subscribing to devices:', error);
      throw error;
    }
  }

  // Session operations
  async createSession(session: Session): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, SESSIONS_COLLECTION), {
        ...session,
        startTime: session.startTime.toISOString(),
        endTime: session.endTime?.toISOString(),
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  }

  async endSession(id: string): Promise<void> {
    try {
      const sessionRef = doc(db, SESSIONS_COLLECTION, id);
      await updateDoc(sessionRef, {
        isActive: false,
        endTime: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error ending session:', error);
      throw error;
    }
  }

  // Security log operations
  async addLog(log: SecurityLog): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, LOGS_COLLECTION), {
        ...log,
        timestamp: log.timestamp.toISOString(),
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding log:', error);
      throw error;
    }
  }

  async getLogs(deviceId?: string, limit: number = 100): Promise<SecurityLog[]> {
    try {
      const queryRef = deviceId
        ? query(
            collection(db, LOGS_COLLECTION),
            where('deviceId', '==', deviceId)
          )
        : collection(db, LOGS_COLLECTION);

      const snapshot = await getDocs(queryRef);
      return snapshot.docs
        .map(doc => ({
          ...doc.data(),
          id: doc.id,
          timestamp: new Date(doc.data().timestamp)
        }))
        .slice(0, limit) as SecurityLog[];
    } catch (error) {
      console.error('Error getting logs:', error);
      throw error;
    }
  }

  subscribeTologs(deviceId: string, callback: (logs: SecurityLog[]) => void): () => void {
    try {
      const queryRef = query(
        collection(db, LOGS_COLLECTION),
        where('deviceId', '==', deviceId)
      );

      const unsubscribe = onSnapshot(queryRef, (snapshot) => {
        const logs = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          timestamp: new Date(doc.data().timestamp)
        })) as SecurityLog[];
        callback(logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
      });

      return unsubscribe;
    } catch (error) {
      console.error('Error subscribing to logs:', error);
      throw error;
    }
  }

  // Connection request operations
  async createRequest(request: ConnectionRequest): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, REQUESTS_COLLECTION), {
        ...request,
        timestamp: request.timestamp.toISOString(),
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating request:', error);
      throw error;
    }
  }

  async updateRequestStatus(
    id: string,
    status: 'accepted' | 'rejected'
  ): Promise<void> {
    try {
      const requestRef = doc(db, REQUESTS_COLLECTION, id);
      await updateDoc(requestRef, { status });
    } catch (error) {
      console.error('Error updating request:', error);
      throw error;
    }
  }

  async getPendingRequests(toDeviceId: string): Promise<ConnectionRequest[]> {
    try {
      const queryRef = query(
        collection(db, REQUESTS_COLLECTION),
        where('toDeviceId', '==', toDeviceId),
        where('status', '==', 'pending')
      );

      const snapshot = await getDocs(queryRef);
      return snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        timestamp: new Date(doc.data().timestamp)
      })) as ConnectionRequest[];
    } catch (error) {
      console.error('Error getting pending requests:', error);
      throw error;
    }
  }

  subscribeToPendingRequests(
    toDeviceId: string,
    callback: (requests: ConnectionRequest[]) => void
  ): () => void {
    try {
      const queryRef = query(
        collection(db, REQUESTS_COLLECTION),
        where('toDeviceId', '==', toDeviceId),
        where('status', '==', 'pending')
      );

      const unsubscribe = onSnapshot(queryRef, (snapshot) => {
        const requests = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          timestamp: new Date(doc.data().timestamp)
        })) as ConnectionRequest[];
        callback(requests);
      });

      return unsubscribe;
    } catch (error) {
      console.error('Error subscribing to requests:', error);
      throw error;
    }
  }
}

export const firestoreService = new FirestoreService();
export default firestoreService;
