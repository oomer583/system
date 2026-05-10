import { useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut, signInAnonymously } from 'firebase/auth';
import { auth } from './config';

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  loginAnonymously: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const loginAnonymously = async () => {
    await signInAnonymously(auth);
  };

  return { user, loading, logout, loginAnonymously };
};

export default useAuth;
