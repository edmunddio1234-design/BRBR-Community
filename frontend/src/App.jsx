import React, { useState, useEffect } from 'react';
import { T } from './theme';
import { api } from './api';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DirectoryPage from './pages/DirectoryPage';
import ProfileView from './pages/ProfileView';
import ProfileEdit from './pages/ProfileEdit';
import MyProfile from './pages/MyProfile';
import MessagesPage from './pages/MessagesPage';
import ConnectionsPage from './pages/ConnectionsPage';
import JobBoardPage from './pages/JobBoardPage';
import PrayerRequestPage from './pages/PrayerRequestPage';
import { GalleryPage } from './pages/GalleryPage';
import { SuggestionsPage } from './pages/SuggestionsPage';
import { ConnectionTree } from './pages/ConnectionTree';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('BRBR Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0A0A',
          color: '#F5EDE3',
          fontFamily: 'Inter, sans-serif',
          padding: '40px 20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>
            &#x1F4D6;
          </div>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '28px',
            color: '#C9A688',
            marginBottom: '12px',
          }}>
            Something went wrong
          </h2>
          <p style={{ color: '#999', maxWidth: '400px', lineHeight: '1.6', marginBottom: '24px' }}>
            The page encountered an unexpected error. Please try refreshing or navigating back home.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              if (this.props.onReset) this.props.onReset();
            }}
            style={{
              background: '#C9A688',
              color: '#0A0A0A',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 32px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Go Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const normalizeMember = (m) => {
  const ensureArray = (val) => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string' && val.length > 0) return val.split(',');
    return [];
  };
  return {
    ...m,
    kids: m.has_kids ?? m.kids ?? 0,
    retired: m.is_retired ?? m.retired ?? false,
    maritalStatus: m.marital_status || m.maritalStatus || '',
    spiritualGifts: ensureArray(m.spiritual_gifts || m.spiritualGifts),
    currentGroups: ensureArray(m.current_groups || m.currentGroups),
    desiredGroups: ensureArray(m.desired_groups || m.desiredGroups),
    hobbies: ensureArray(m.hobbies),
    available: ensureArray(m.available),
    availableToHelp: ensureArray(m.available || m.availableToHelp),
    needHelpWith: ensureArray(m.need_help_with || m.needHelpWith),
    languages: ensureArray(m.languages),
    canDrive: m.can_drive ?? m.canDrive ?? true,
    isBusinessOwner: m.is_business_owner ?? m.isBusinessOwner ?? false,
    businessName: m.business_name || m.businessName || '',
    businessDescription: m.business_description || m.businessDescription || '',
    onPrayerTeam: m.on_prayer_team ?? m.onPrayerTeam ?? false,
    joined: m.joined || '2026',
    smallGroup: m.current_groups?.[0] || m.currentGroups?.[0] || m.smallGroup || '',
    avatar: m.avatar || (m.name ? m.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '??'),
  };
};

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('home');
  const [selMember, setSelMember] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [members, setMembers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      api.getMembers()
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setMembers(data.map(normalizeMember));
          }
        })
        .catch(() => {});
    }
  }, [user]);

  useEffect(() => {
    if (user && !user._profileLoaded) {
      const token = localStorage.getItem('token');
      if (token) {
        api.getProfile()
          .then((profile) => {
            if (profile && profile.id) {
              setUser((prev) => ({
                ...prev,
                ...normalizeMember(profile),
                name: profile.name,
                fullName: profile.name,
                _profileLoaded: true,
              }));
            }
          })
          .catch(() => {});
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const fetchNotifications = () => {
        api.getNotifications()
          .then((data) => { if (Array.isArray(data)) setNotifications(data); })
          .catch(() => {});
        api.getUnreadCount()
          .then((data) => { if (data && typeof data.count === 'number') setUnreadCount(data.count); })
          .catch(() => {});
      };
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const handleMarkAllRead = () => {
    api.markAllNotificationsRead().then(() => {
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadCount(0);
    }).catch(() => {});
  };

  const handleMarkRead = (id) => {
    api.markNotificationRead(id).then(() => {
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }).catch(() => {});
  };

  if (!user) {
    return (
      <ErrorBoundary onReset={() => setPage('home')}>
        <LoginPage
          onLogin={(loginResult) => {
            if (loginResult.token) localStorage.setItem('token', loginResult.token);
            setUser(loginResult.user || loginResult);
          }}
        />
      </ErrorBoundary>
    );
  }

  const handleMsg = (m) => {
    setActiveChat(m.id);
    setPage('messages');
  };

  return (
    <ErrorBoundary onReset={() => setPage('home')}>
      <div style={{ fontFamily: T.fontBody, background: T.bg, minHeight: '100vh', color: T.text }}>
        <Navbar
          page={page} setPage={setPage} user={user}
          notifications={notifications} unreadCount={unreadCount}
          onMarkAllRead={handleMarkAllRead} onMarkRead={handleMarkRead}
          onLogout={() => { localStorage.removeItem('token'); setUser(null); setPage('home'); }}
        />
        {page === 'home' && <HomePage user={user} members={members} setPage={setPage} setSelMember={setSelMember} />}
        {page === 'directory' && <DirectoryPage members={members} setPage={setPage} setSelMember={setSelMember} />}
        {page === 'profile-view' && <ProfileView member={selMember} setPage={setPage} onMessage={handleMsg} />}
        {page === 'profile-me' && <MyProfile user={user} setPage={setPage} />}
        {page === 'profile-edit' && <ProfileEdit user={user} setUser={setUser} setPage={setPage} />}
        {page === 'messages' && <MessagesPage members={members} activeChat={activeChat} setActiveChat={setActiveChat} />}
        {page === 'connections' && <ConnectionsPage members={members} />}
        {page === 'jobs' && <JobBoardPage members={members} />}
        {page === 'prayer' && <PrayerRequestPage members={members} />}
        {page === 'gallery' && <GalleryPage members={members} />}
        {page === 'suggestions' && <SuggestionsPage members={members} />}
        {page === 'tree' && <ConnectionTree members={members} />}
      </div>
    </ErrorBoundary>
  );
}

export default App;
