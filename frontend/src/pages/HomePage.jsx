import React from 'react';
import { T } from '../theme';
import { S } from '../styles';
import { Tag } from '../components/UI';
import Icon from '../components/Icons';
import { READING_GROUPS } from '../constants';

const HomePage = ({ user, members, setPage, setSelMember }) => {
  // Quick actions configuration
  const quickActions = [
    { label: 'Browse Readers', icon: 'users', page: 'directory' },
    { label: 'Messages', icon: 'chat', page: 'messages' },
    { label: 'Opportunities', icon: 'briefcase', page: 'jobs' },
    { label: 'Reflections', icon: 'hands', page: 'prayer' },
    { label: 'Gallery', icon: 'camera', page: 'gallery' },
    { label: 'Ideas', icon: 'star', page: 'suggestions' },
  ];

  // Get stats
  const memberCount = members?.length || 0;
  const readingGroupsCount = READING_GROUPS?.length || 5;
  const connectionsCount = 45;

  // Get newest members (first 4)
  const newestMembers = members?.slice(0, 4) || [];

  // Get available helpers (first 3 who have skills listed)
  const availableHelpers = members
    ?.filter(m => m.availableToHelp && m.availableToHelp.length > 0)
    ?.slice(0, 3) || [];

  // Helper: get display name
  const displayName = (m) => m?.name || m?.firstName || 'Member';

  // Helper: get initials from name
  const getInitials = (m) => {
    const n = m?.name || m?.firstName || '';
    return n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '??';
  };

  // Helper: render avatar (supports photo URL or initials fallback)
  const renderAvatar = (m, size = 48) => {
    const avatarVal = m?.avatar || '';
    const isUrl = avatarVal.startsWith('http') || avatarVal.startsWith('data:');
    if (isUrl) {
      return (
        <img
          src={avatarVal}
          alt={displayName(m)}
          style={{
            width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0,
          }}
          onError={e => { e.target.style.display = 'none'; e.target.nextSibling && (e.target.nextSibling.style.display = 'flex'); }}
        />
      );
    }
    return (
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: T.gradientPrimary,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.36, fontWeight: '600', color: T.black,
        fontFamily: T.fontDisplay, letterSpacing: '1px', flexShrink: 0,
      }}>
        {getInitials(m)}
      </div>
    );
  };

  return (
    <div style={{ ...S.flexCol, gap: '2rem', padding: '2rem', backgroundColor: T.bg, minHeight: '100vh' }}>
      {/* Welcome Banner */}
      <div
        style={{
          ...S.flexRow,
          alignItems: 'center',
          gap: '2rem',
          padding: '3rem',
          background: T.gradientPrimary,
          borderRadius: '12px',
          color: T.textDark,
        }}
      >
        {renderAvatar(user, 72)}
        <div style={{ ...S.flexCol, gap: '0.5rem' }}>
          <h1 style={{ ...S.h1, color: T.textDark, margin: 0 }}>
            Welcome back, {displayName(user).split(' ')[0]}!
          </h1>
          <p style={{ ...S.body, color: 'rgba(255, 255, 255, 0.9)', margin: 0 }}>
            Your BRBR community awaits.
          </p>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div style={{ ...S.flexCol, gap: '1rem' }}>
        <h2 style={{ ...S.h2, color: T.text, margin: 0 }}>Quick Actions</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
          }}
        >
          {quickActions.map(action => (
            <button
              key={action.page}
              onClick={() => setPage(action.page)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1.5rem',
                backgroundColor: T.bgCard,
                border: `1px solid ${T.border}`,
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'center',
                outline: 'none',
                fontFamily: T.fontBody,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = T.bgSoft;
                e.currentTarget.style.borderColor = T.primary;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = T.bgCard;
                e.currentTarget.style.borderColor = T.border;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Icon name={action.icon} size="24" color={T.primary} />
              <span style={{ ...S.label, color: T.text, fontSize: '0.9rem' }}>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
        }}
      >
        {[
          { label: 'Total Members', value: memberCount },
          { label: 'Reading Groups', value: readingGroupsCount },
          { label: 'Connections', value: connectionsCount },
        ].map((stat, idx) => (
          <div
            key={idx}
            style={{
              ...S.card,
              padding: '1.5rem',
              backgroundColor: T.bgCard,
              border: `1px solid ${T.border}`,
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <p style={{ ...S.label, color: T.textMuted, margin: '0 0 0.5rem 0', fontSize: '0.85rem' }}>
              {stat.label}
            </p>
            <p style={{ ...S.h3, color: T.primary, margin: 0, fontSize: '2rem' }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Main Content: 2-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Left Column: Newest Members */}
        <div style={{ ...S.flexCol, gap: '1rem' }}>
          <h2 style={{ ...S.h2, color: T.text, margin: 0 }}>Newest Members</h2>
          <div style={{ ...S.flexCol, gap: '1rem' }}>
            {newestMembers.map(member => (
              <div
                key={member.id}
                onClick={() => { setSelMember(member); setPage('profile-view'); }}
                style={{
                  ...S.flexRow,
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  backgroundColor: T.bgCard,
                  border: `1px solid ${T.border}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = T.bgSoft;
                  e.currentTarget.style.borderColor = T.primary;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = T.bgCard;
                  e.currentTarget.style.borderColor = T.border;
                }}
              >
                {renderAvatar(member, 48)}
                <div style={{ ...S.flexCol, gap: '0.25rem', flex: 1 }}>
                  <p style={{ ...S.body, color: T.text, margin: 0, fontWeight: '500' }}>
                    {displayName(member)}
                  </p>
                  <p style={{ ...S.body, color: T.textMuted, margin: 0, fontSize: '0.85rem' }}>
                    {member.location || member.work || 'Community Member'}
                  </p>
                </div>
                <span style={{ color: T.textMuted, fontSize: '18px' }}>&#8250;</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Reading Groups */}
        <div style={{ ...S.flexCol, gap: '1rem' }}>
          <h2 style={{ ...S.h2, color: T.text, margin: 0 }}>Reading Groups</h2>
          <div style={{ ...S.flexCol, gap: '1rem' }}>
            {READING_GROUPS.map((group, idx) => {
              const count = members?.filter(m =>
                m.currentGroups && m.currentGroups.includes(group)
              ).length || 0;
              return (
                <div
                  key={idx}
                  style={{
                    ...S.flexCol,
                    gap: '0.5rem',
                    padding: '1rem',
                    backgroundColor: T.bgCard,
                    border: `1px solid ${T.border}`,
                    borderRadius: '8px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <p style={{ ...S.body, color: T.text, margin: 0, fontWeight: '500' }}>
                    {group}
                  </p>
                  <p style={{ ...S.body, color: T.textMuted, margin: 0, fontSize: '0.8rem' }}>
                    {count} {count === 1 ? 'member' : 'members'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
