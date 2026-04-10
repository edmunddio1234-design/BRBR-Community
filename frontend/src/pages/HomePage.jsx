import React from 'react';
import { T } from '../theme';
import { S } from '../styles';
import Icon from '../components/Icons';
import { READING_GROUPS } from '../constants';

const GROUP_COLORS = {
  'Healing Through Words': '#D4A0A0',
  'Faith Foundations': '#C9A688',
  'Growth Mindset': '#B5653A',
  'Sister Circle': '#E8C9A8',
  'Purpose & Prayer': '#A08070',
};

const HomePage = ({ user, members, setPage, setSelMember }) => {
  const quickActions = [
    { label: 'Browse Readers', icon: 'users', page: 'directory' },
    { label: 'Messages', icon: 'chat', page: 'messages' },
    { label: 'Opportunities', icon: 'briefcase', page: 'jobs' },
    { label: 'Reflections', icon: 'hands', page: 'prayer' },
    { label: 'Gallery', icon: 'camera', page: 'gallery' },
    { label: 'Ideas', icon: 'star', page: 'suggestions' },
  ];

  const memberCount = members?.length || 0;
  const readingGroupsCount = READING_GROUPS?.length || 5;
  const newestMembers = members?.slice(0, 6) || [];

  const displayName = (m) => m?.name || m?.firstName || 'Member';
  const getInitials = (m) => {
    const n = m?.name || m?.firstName || '';
    return n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '??';
  };

  const renderAvatar = (m, size = 48) => {
    const avatarVal = m?.avatar || '';
    const isUrl = avatarVal.startsWith('http') || avatarVal.startsWith('data:');
    if (isUrl) {
      return (
        <img src={avatarVal} alt={displayName(m)}
          style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
          onError={e => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex'; }}
        />
      );
    }
    return (
      <div style={{
        width: size, height: size, borderRadius: '50%', background: T.gradientPrimary,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.36, fontWeight: '600', color: T.black,
        fontFamily: T.fontDisplay, letterSpacing: '1px', flexShrink: 0,
      }}>{getInitials(m)}</div>
    );
  };

  return (
    <div style={{ ...S.flexCol, gap: '2rem', padding: '2rem', backgroundColor: T.bg, minHeight: '100vh' }}>
      {/* Welcome Banner */}
      <div style={{
        ...S.flexRow, alignItems: 'center', gap: '2rem', padding: '3rem',
        background: T.gradientPrimary, borderRadius: '12px', color: T.textDark,
      }}>
        {renderAvatar(user, 72)}
        <div style={{ ...S.flexCol, gap: '0.5rem' }}>
          <h1 style={{ ...S.h1, color: T.textDark, margin: 0 }}>
            Welcome back, {displayName(user).split(' ')[0]}!
          </h1>
          <p style={{ ...S.body, color: 'rgba(255,255,255,0.9)', margin: 0 }}>Your BRBR community awaits.</p>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div style={{ ...S.flexCol, gap: '1rem' }}>
        <h2 style={{ ...S.h2, color: T.text, margin: 0 }}>Quick Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          {quickActions.map(action => (
            <button key={action.page} onClick={() => setPage(action.page)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
              padding: '1.5rem', backgroundColor: T.bgCard, border: `1px solid ${T.border}`,
              borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s ease',
              textAlign: 'center', outline: 'none', fontFamily: T.fontBody,
            }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = T.bgSoft; e.currentTarget.style.borderColor = T.primary; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = T.bgCard; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <Icon name={action.icon} size="24" color={T.primary} />
              <span style={{ ...S.label, color: T.text, fontSize: '0.9rem' }}>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {[
          { label: 'Total Members', value: memberCount },
          { label: 'Reading Groups', value: readingGroupsCount },
          { label: 'Cities', value: 5 },
        ].map((stat, idx) => (
          <div key={idx} style={{
            ...S.card, padding: '1.5rem', backgroundColor: T.bgCard,
            border: `1px solid ${T.border}`, borderRadius: '8px', textAlign: 'center',
          }}>
            <p style={{ ...S.label, color: T.textMuted, margin: '0 0 0.5rem 0', fontSize: '0.85rem' }}>{stat.label}</p>
            <p style={{ ...S.h3, color: T.primary, margin: 0, fontSize: '2rem' }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Newest Members — HORIZONTAL CARDS */}
      <div style={{ ...S.flexCol, gap: '1rem' }}>
        <h2 style={{ ...S.h2, color: T.text, margin: 0 }}>Newest Members</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {newestMembers.map(member => (
            <div key={member.id}
              onClick={() => { setSelMember(member); setPage('profile-view'); }}
              style={{
                ...S.flexRow, alignItems: 'center', gap: '1rem', padding: '1rem',
                backgroundColor: T.bgCard, border: `1px solid ${T.border}`,
                borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = T.bgSoft; e.currentTarget.style.borderColor = T.primary; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = T.bgCard; e.currentTarget.style.borderColor = T.border; }}
            >
              {renderAvatar(member, 44)}
              <div style={{ ...S.flexCol, gap: '0.15rem', flex: 1, minWidth: 0 }}>
                <p style={{ ...S.body, color: T.text, margin: 0, fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{displayName(member)}</p>
                <p style={{ ...S.body, color: T.textMuted, margin: 0, fontSize: '0.8rem' }}>{member.work || member.location || 'Community Member'}</p>
              </div>
              <span style={{ color: T.textMuted, fontSize: '18px' }}>&#8250;</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reading Groups — HORIZONTAL CARDS */}
      <div style={{ ...S.flexCol, gap: '1rem' }}>
        <h2 style={{ ...S.h2, color: T.text, margin: 0 }}>Reading Groups</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
          {READING_GROUPS.map((group, idx) => {
            const count = members?.filter(m => m.currentGroups && m.currentGroups.includes(group)).length || 0;
            const color = GROUP_COLORS[group] || T.primary;
            return (
              <div key={idx} style={{
                padding: '1.25rem', backgroundColor: T.bgCard,
                border: `1px solid ${T.border}`, borderRadius: '8px',
                borderLeft: `3px solid ${color}`, transition: 'all 0.2s ease',
              }}>
                <p style={{ ...S.body, color: T.text, margin: '0 0 0.25rem 0', fontWeight: '500' }}>{group}</p>
                <p style={{ ...S.body, color, margin: 0, fontSize: '0.85rem', fontWeight: '600' }}>{count} {count === 1 ? 'member' : 'members'}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
