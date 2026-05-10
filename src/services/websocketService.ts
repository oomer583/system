// Mock WebSocket service
export interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: number;
}

class WebSocketService {
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 3000;
  private isConnected = false;
  private listeners: Map<string, Function[]> = new Map();

  connect(url: string): Promise<void> {
    return new Promise((resolve) => {
      console.log(`Connecting to WebSocket: ${url}`);
      setTimeout(() => {
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.emit('connected', { url });
        resolve();
      }, 1000);
    });
  }

  disconnect(): void {
    this.isConnected = false;
    this.emit('disconnected', {});
  }

  send(message: WebSocketMessage): void {
    if (!this.isConnected) {
      console.warn('WebSocket not connected');
      return;
    }
    console.log('WebSocket message sent:', message);
  }

  on(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  off(event: string, callback: Function): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) callbacks.splice(index, 1);
    }
  }

  private emit(event: string, data: any): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  isConnectedStatus(): boolean {
    return this.isConnected;
  }
}

export const webSocketService = new WebSocketService();
export default webSocketService;
