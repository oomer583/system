import React, { useState } from 'react';
import './Auth.css';
import { useAuth } from '../hooks/useAuth';

interface AuthPageProps {
  onLoginSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginAnonymously } = useAuth();

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email ve şifre gerekli');
      return;
    }

    if (!validateEmail(email)) {
      setError('Geçersiz email adresi');
      return;
    }

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalı');
      return;
    }

    setLoading(true);
    try {
      // Simulate login
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Login successful:', email);
      onLoginSuccess();
    } catch (err) {
      setError('Giriş başarısız. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !confirmPassword) {
      setError('Tüm alanları doldurunuz');
      return;
    }

    if (!validateEmail(email)) {
      setError('Geçersiz email adresi');
      return;
    }

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalı');
      return;
    }

    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    setLoading(true);
    try {
      // Simulate registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Registration successful:', email);
      onLoginSuccess();
    } catch (err) {
      setError('Kayıt başarısız. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      await loginAnonymously();
      onLoginSuccess();
    } catch (err) {
      setError('Demo girişi başarısız');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>🎮 Remote Device Control</h1>
            <p>Cihazları uzaktan kontrol et</p>
          </div>

          <div className="auth-tabs">
            <button
              className={`tab-btn ${mode === 'login' ? 'active' : ''}`}
              onClick={() => {
                setMode('login');
                setError('');
              }}
            >
              Giriş Yap
            </button>
            <button
              className={`tab-btn ${mode === 'register' ? 'active' : ''}`}
              onClick={() => {
                setMode('register');
                setError('');
              }}
            >
              Kaydol
            </button>
          </div>

          <form onSubmit={mode === 'login' ? handleLogin : handleRegister}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Şifre</label>
              <input
                type="password"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            {mode === 'register' && (
              <div className="form-group">
                <label>Şifre Onayla</label>
                <input
                  type="password"
                  placeholder="••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            )}

            {error && <div className="error-message">{error}</div>}

            <button
              type="submit"
              className="btn-primary-auth"
              disabled={loading}
            >
              {loading ? '⏳ İşleniyor...' : mode === 'login' ? '🔓 Giriş Yap' : '📝 Kaydol'}
            </button>
          </form>

          <div className="divider">veya</div>

          <button
            className="btn-demo"
            onClick={handleDemoLogin}
            disabled={loading}
          >
            🎯 Demo Girişi
          </button>

          <div className="auth-footer">
            <p className="terms">
              Devam ederek, şartlar ve koşulları kabul etmiş olursunuz
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
