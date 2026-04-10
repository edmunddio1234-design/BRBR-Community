import React from 'react';
import { T } from '../theme';
import { S } from '../styles';

export function Avatar({ name, size = 40, style = {} }) {
  const initials = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '??';
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: T.gradientPrimary,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.36, fontWeight: '600', color: T.black,
      fontFamily: T.fontDisplay, letterSpacing: '1px',
      flexShrink: 0, ...style,
    }}>
      {initials}
    </div>
  );
}

export function Button({ children, variant = 'primary', onClick, style = {}, disabled = false }) {
  const base = {
    padding: '10px 24px', borderRadius: '4px', fontSize: '12px',
    fontFamily: T.fontBody, fontWeight: '600', letterSpacing: '1.5px',
    textTransform: 'uppercase', cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease', border: 'none', display: 'inline-flex',
    alignItems: 'center', gap: '8px', opacity: disabled ? 0.5 : 1,
  };
  const variants = {
    primary: { background: T.primary, color: T.black },
    secondary: { background: 'transparent', border: `1px solid ${T.primary}`, color: T.primary },
    danger: { background: T.danger, color: T.white },
    ghost: { background: 'transparent', color: T.primary, padding: '8px 16px' },
  };
  return (
    <button onClick={disabled ? undefined : onClick} style={{ ...base, ...variants[variant], ...style }}>
      {children}
    </button>
  );
}

export function Tag({ children, style = {} }) {
  return (
    <span style={{
      display: 'inline-block', padding: '4px 12px', borderRadius: '2px',
      fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase',
      fontFamily: T.fontBody, fontWeight: '500',
      background: T.primaryFaint, color: T.primary,
      border: `1px solid ${T.border}`, ...style,
    }}>
      {children}
    </span>
  );
}

export function Card({ children, style = {}, onClick, hoverable = false }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hoverable && setHovered(true)}
      onMouseLeave={() => hoverable && setHovered(false)}
      style={{
        ...S.card,
        ...(hovered ? S.cardHover : {}),
        ...(onClick ? { cursor: 'pointer' } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(5,5,5,0.92)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(8px)',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: T.gradientCard, border: `1px solid ${T.borderHover}`,
        borderRadius: '8px', maxWidth: '560px', width: '90%', maxHeight: '80vh',
        overflowY: 'auto', padding: '36px 32px', position: 'relative',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '12px', right: '16px', background: 'none',
          border: 'none', color: T.primary, fontSize: '1.5rem', cursor: 'pointer',
          opacity: 0.6,
        }}>&times;</button>
        {title && <h2 style={{ ...S.h2, marginBottom: '20px' }}>{title}</h2>}
        {children}
      </div>
    </div>
  );
}

export function TabBar({ tabs, active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
      {tabs.map(tab => (
        <button key={tab.key || tab} onClick={() => onChange(tab.key || tab)} style={{
          padding: '10px 24px', borderRadius: '2px', fontSize: '11px',
          letterSpacing: '2px', textTransform: 'uppercase', fontFamily: T.fontBody,
          fontWeight: (tab.key || tab) === active ? '600' : '400',
          background: (tab.key || tab) === active ? T.primary : T.primaryFaint,
          color: (tab.key || tab) === active ? T.black : T.text,
          border: `1px solid ${(tab.key || tab) === active ? T.primary : T.border}`,
          cursor: 'pointer', transition: 'all 0.3s ease',
        }}>
          {tab.label || tab}
        </button>
      ))}
    </div>
  );
}

export function EmptyState({ icon, title, subtitle }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>{icon}</div>
      <h3 style={{ ...S.h2, marginBottom: '8px' }}>{title}</h3>
      <p style={{ ...S.body, color: T.textMuted }}>{subtitle}</p>
    </div>
  );
}
