import React, { useState } from 'react';
import { T } from '../theme';
import { Avatar, Button } from './UI';
import Icon from './Icons';

const NAV_ITEMS = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'directory', label: 'Readers', icon: 'users' },
  { key: 'messages', label: 'Messages', icon: 'chat' },
  { key: 'prayer', label: 'Reflections', icon: 'hands' },
  { key: 'connections', label: 'Support', icon: 'heart' },
  { key: 'jobs', label: 'Opportunities', icon: 'briefcase' },
  { key: 'gallery', label: 'Gallery', icon: 'camera' },
  { key: 'suggestions', label: 'Ideas', icon: 'star' },
  { key: 'tree', label: 'Network', icon: 'tree' },
];

export default function Navbar({ page, setPage, user, notifications = [], unreadCount = 0, onMarkAllRead, onMarkRead, onLogout }) {
  const [showNotif, setShowNotif] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (key) => {
    setPage(key);
    setMobileOpen(false);
  };

  return (
    <>
      <nav style={{
        background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${T.border}`, position: 'sticky', top: 0, zIndex: 1000,
        padding: '0 24px',
      }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between', height: '64px',
        }}>
          {/* Left: Back + Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Back to Main Site */}
            <a href="https://br-collectionnddf.vercel.app" title="Back to BRBR main site" style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              textDecoration: 'none', color: T.textMuted, fontSize: '10px',
              fontFamily: T.fontBody, letterSpacing: '0.5px', textTransform: 'uppercase',
              padding: '5px 10px', borderRadius: '4px',
              border: `1px solid ${T.border}`, transition: 'all 0.3s ease',
              flexShrink: 0,
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = T.primary; e.currentTarget.style.borderColor = T.primary; }}
            onMouseOut={(e) => { e.currentTarget.style.color = T.textMuted; e.currentTarget.style.borderColor = T.border; }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5m0 0l7 7m-7-7l7-7"/></svg>
              BRBR
            </a>
            {/* Logo */}
            <div onClick={() => handleNav('home')} style={{
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span style={{
                fontFamily: T.fontDisplay, fontSize: '16px', fontWeight: '600',
                color: T.primary, letterSpacing: '2px',
              }}>BRBR</span>
              <span style={{
                fontFamily: T.fontAccent, fontStyle: 'italic', fontSize: '12px',
                color: T.textMuted, letterSpacing: '1px',
              }}>Community</span>
            </div>
          </div>

          {/* Center: Desktop Nav (hidden on mobile) */}
          <div className="desktop-nav" style={{
            display: 'flex', alignItems: 'center', gap: '2px',
          }}>
            {NAV_ITEMS.map(item => (
              <button key={item.key} title={item.label} onClick={() => handleNav(item.key)} style={{
                background: page === item.key ? T.primaryFaint : 'transparent',
                border: 'none', borderRadius: '6px', padding: '8px 12px',
                color: page === item.key ? T.primary : T.textMuted,
                fontFamily: T.fontBody, fontSize: '10px', letterSpacing: '0.8px',
                textTransform: 'uppercase', cursor: 'pointer',
                transition: 'all 0.3s ease', display: 'flex',
                alignItems: 'center', gap: '5px',
                borderBottom: page === item.key ? `2px solid ${T.primary}` : '2px solid transparent',
              }}>
                <Icon name={item.icon} size={14} color={page === item.key ? T.primary : T.textMuted} />
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Right: Notifications + User + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            {/* Notifications */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowNotif(!showNotif)} title="Notifications" style={{
                background: 'none', border: 'none', cursor: 'pointer',
                position: 'relative', padding: '4px',
              }}>
                <Icon name="bell" size={20} color={T.textMuted} />
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '-2px', right: '-2px',
                    background: T.danger, color: T.white, fontSize: '9px',
                    fontWeight: '700', borderRadius: '50%', width: '16px',
                    height: '16px', display: 'flex', alignItems: 'center',
                    justifyContent: 'center',
                  }}>{unreadCount}</span>
                )}
              </button>
              {showNotif && (
                <div style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: '8px',
                  width: '320px', background: T.bgCard, border: `1px solid ${T.border}`,
                  borderRadius: '8px', boxShadow: T.shadowLg, maxHeight: '400px',
                  overflowY: 'auto', zIndex: 1001,
                }}>
                  <div style={{
                    padding: '12px 16px', borderBottom: `1px solid ${T.border}`,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <span style={{ fontFamily: T.fontDisplay, fontSize: '14px', color: T.text }}>Notifications</span>
                    {unreadCount > 0 && (
                      <button onClick={() => { onMarkAllRead?.(); setShowNotif(false); }} style={{
                        background: 'none', border: 'none', color: T.primary,
                        fontSize: '11px', cursor: 'pointer', fontFamily: T.fontBody,
                      }}>Mark all read</button>
                    )}
                  </div>
                  {notifications.length === 0 ? (
                    <div style={{ padding: '24px', textAlign: 'center', color: T.textMuted, fontSize: '13px' }}>
                      No notifications yet
                    </div>
                  ) : notifications.slice(0, 10).map(n => (
                    <div key={n.id} onClick={() => { onMarkRead?.(n.id); setShowNotif(false); }} style={{
                      padding: '12px 16px', borderBottom: `1px solid ${T.borderLight}`,
                      cursor: 'pointer', background: n.is_read ? 'transparent' : T.primaryFaint,
                    }}>
                      <p style={{ fontSize: '13px', color: T.text, margin: '0 0 4px 0' }}>{n.message || n.text}</p>
                      <span style={{ fontSize: '11px', color: T.textMuted }}>{n.created_at ? new Date(n.created_at).toLocaleDateString() : ''}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* User Menu */}
            <div style={{ position: 'relative' }}>
              <div onClick={() => setShowMenu(!showMenu)} title={user?.name || 'Menu'} style={{
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <Avatar name={user?.name} size={32} />
              </div>
              {showMenu && (
                <div style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: '8px',
                  width: '200px', background: T.bgCard, border: `1px solid ${T.border}`,
                  borderRadius: '8px', boxShadow: T.shadowLg, zIndex: 1001,
                }}>
                  <div style={{ padding: '12px 16px', borderBottom: `1px solid ${T.border}` }}>
                    <p style={{ fontFamily: T.fontDisplay, fontSize: '14px', color: T.text, margin: 0 }}>{user?.name}</p>
                    <p style={{ fontSize: '11px', color: T.textMuted, margin: '2px 0 0' }}>{user?.email}</p>
                  </div>
                  <button onClick={() => { setPage('profile-me'); setShowMenu(false); }} style={{
                    display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
                    padding: '10px 16px', background: 'none', border: 'none',
                    color: T.text, fontSize: '13px', cursor: 'pointer', textAlign: 'left',
                    fontFamily: T.fontBody,
                  }}>
                    <Icon name="edit" size={14} color={T.textMuted} /> My Profile
                  </button>
                  <button onClick={() => { onLogout(); setShowMenu(false); }} style={{
                    display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
                    padding: '10px 16px', background: 'none', border: 'none',
                    color: T.danger, fontSize: '13px', cursor: 'pointer', textAlign: 'left',
                    fontFamily: T.fontBody, borderTop: `1px solid ${T.borderLight}`,
                  }}>
                    <Icon name="logout" size={14} color={T.danger} /> Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button className="mobile-hamburger" onClick={() => setMobileOpen(!mobileOpen)} style={{
              display: 'none', background: 'none', border: 'none', cursor: 'pointer',
              padding: '6px', flexDirection: 'column', gap: '4px',
            }}>
              <span style={{ display: 'block', width: '20px', height: '2px', background: mobileOpen ? T.primary : T.textMuted, transition: 'all 0.3s', transform: mobileOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none' }} />
              <span style={{ display: 'block', width: '20px', height: '2px', background: mobileOpen ? 'transparent' : T.textMuted, transition: 'all 0.3s' }} />
              <span style={{ display: 'block', width: '20px', height: '2px', background: mobileOpen ? T.primary : T.textMuted, transition: 'all 0.3s', transform: mobileOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: '64px', left: 0, right: 0, bottom: 0,
          background: 'rgba(10,10,10,0.98)', zIndex: 999,
          padding: '16px 24px', overflowY: 'auto',
          animation: 'slideDown 0.2s ease',
        }}>
          {NAV_ITEMS.map(item => (
            <button key={item.key} onClick={() => handleNav(item.key)} style={{
              display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
              padding: '14px 16px', background: page === item.key ? T.primaryFaint : 'transparent',
              border: 'none', borderRadius: '8px', cursor: 'pointer',
              marginBottom: '4px', transition: 'all 0.2s ease',
              borderLeft: page === item.key ? `3px solid ${T.primary}` : '3px solid transparent',
            }}>
              <Icon name={item.icon} size={18} color={page === item.key ? T.primary : T.textMuted} />
              <span style={{
                fontFamily: T.fontBody, fontSize: '14px', fontWeight: page === item.key ? '600' : '400',
                color: page === item.key ? T.primary : T.text,
                letterSpacing: '0.5px',
              }}>{item.label}</span>
            </button>
          ))}
          <div style={{ borderTop: `1px solid ${T.border}`, marginTop: '12px', paddingTop: '12px' }}>
            <a href="https://br-collectionnddf.vercel.app" style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '14px 16px', textDecoration: 'none', color: T.textMuted,
              fontFamily: T.fontBody, fontSize: '14px',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5m0 0l7 7m-7-7l7-7"/></svg>
              Back to BRBR Main Site
            </a>
          </div>
        </div>
      )}

      {/* Click outside to close dropdowns */}
      {(showNotif || showMenu) && (
        <div onClick={() => { setShowNotif(false); setShowMenu(false); }} style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999,
        }} />
      )}

      {/* Responsive CSS injected via style tag */}
      <style>{`
        @media (min-width: 1024px) {
          .nav-label { display: inline !important; }
          .mobile-hamburger { display: none !important; }
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 1023px) and (min-width: 769px) {
          .nav-label { display: none !important; }
          .mobile-hamburger { display: none !important; }
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 768px) {
          .nav-label { display: none !important; }
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
