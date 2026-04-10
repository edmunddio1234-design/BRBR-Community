import React, { useState } from 'react';
import { T } from '../theme';
import { S } from '../styles';
import { Button } from './UI';
import { api } from '../api';
import { MEMBERS } from '../constants';

export default function LoginPage({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        const result = await api.login(email, password);
        onLogin(result);
      } else {
        const result = await api.register({ name, email, password });
        onLogin(result);
      }
    } catch (err) {
      // Fallback to mock login
      const mockUser = MEMBERS.find(m => m.email?.toLowerCase() === email.toLowerCase());
      if (mockUser) {
        onLogin({ user: mockUser });
      } else if (mode === 'register' && name && email) {
        onLogin({ user: { id: Date.now(), name, email, avatar: name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() } });
      } else {
        setError(mode === 'login' ? 'Invalid credentials. Try: nikki@brbrcollection.com' : 'Please fill in all fields.');
      }
    }
    setLoading(false);
  };

  const inputStyle = {
    ...S.input,
    marginBottom: '16px',
  };

  return (
    <div style={{
      minHeight: '100vh', background: T.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: T.fontBody,
    }}>
      <div style={{
        width: '100%', maxWidth: '420px', padding: '20px',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontFamily: T.fontDisplay, fontSize: '32px', fontWeight: '600',
            color: T.primary, letterSpacing: '4px', margin: '0 0 8px 0',
          }}>BRBR</h1>
          <p style={{
            fontFamily: T.fontAccent, fontStyle: 'italic', fontSize: '16px',
            color: T.primaryLight, margin: '0 0 4px 0',
          }}>Beautifully Ratchet, Brilliantly Real</p>
          <p style={{
            fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase',
            color: T.textMuted, margin: '12px 0 0 0',
          }}>Community</p>
        </div>

        {/* Form Card */}
        <div style={{
          ...S.card, padding: '32px',
        }}>
          <h2 style={{ ...S.h2, textAlign: 'center', marginBottom: '24px' }}>
            {mode === 'login' ? 'Welcome Back' : 'Join the Movement'}
          </h2>

          <form onSubmit={handleSubmit}>
            {mode === 'register' && (
              <input
                type="text" placeholder="Your name" value={name}
                onChange={e => setName(e.target.value)}
                style={inputStyle} required
              />
            )}
            <input
              type="email" placeholder="Email address" value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle} required
            />
            <input
              type="password" placeholder="Password" value={password}
              onChange={e => setPassword(e.target.value)}
              style={inputStyle} required
            />

            {error && (
              <p style={{ color: T.danger, fontSize: '13px', margin: '0 0 16px 0' }}>{error}</p>
            )}

            <Button variant="primary" onClick={handleSubmit} style={{
              width: '100%', justifyContent: 'center', padding: '14px',
              fontSize: '13px', marginBottom: '16px',
            }} disabled={loading}>
              {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div style={{ textAlign: 'center' }}>
            <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }} style={{
              background: 'none', border: 'none', color: T.primary,
              fontSize: '13px', cursor: 'pointer', fontFamily: T.fontBody,
            }}>
              {mode === 'login' ? "Don't have an account? Join us" : 'Already a member? Sign in'}
            </button>
          </div>
        </div>

        {/* Quote */}
        <p style={{
          fontFamily: T.fontAccent, fontStyle: 'italic', fontSize: '14px',
          color: T.textMuted, textAlign: 'center', marginTop: '32px', lineHeight: '1.8',
        }}>
          "May these pages remind you that your story is sacred,<br />
          your struggle is valid, and your growth is already beautiful."
        </p>
      </div>
    </div>
  );
}
