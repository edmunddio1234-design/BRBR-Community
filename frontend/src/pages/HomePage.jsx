import React from 'react';
import { T } from '../theme';
import { S } from '../styles';
import { Avatar, Button, Tag } from '../components/UI';
import Icon from '../components/Icons';
import { READING_GROUPS, BOOK_CHAPTERS } from '../constants';

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
  const readingGroupsCount = READING_GROUPS?.length || 12;
  const connectionsCount = 45;
  const helpersCount = members?.filter(m => m.availableSkills?.length > 0)?.length || 0;

  // Get newest members (first 4)
  const newestMembers = members?.slice(0, 4) || [];

  // Get available helpers (first 3)
  const availableHelpers = members
    ?.filter(m => m.availableSkills && m.availableSkills.length > 0)
    ?.slice(0, 3) || [];

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
        <Avatar src={user?.avatar} name={user?.firstName} size="lg" />
        <div style={{ ...S.flexCol, gap: '0.5rem' }}>
          <h1 style={{ ...S.h1, color: T.textDark, margin: 0 }}>
            Welcome back, {user?.firstName}!
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
            <Button
              key={action.page}
              onClick={() => setPage(action.page)}
              variant="secondary"
              style={{
                ...S.flexCol,
                gap: '0.5rem',
                padding: '1.5rem',
                backgroundColor: T.bgCard,
                border: `1px solid ${T.border}`,
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'center',
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
              <Icon name={action.icon} size="24" color={T.primary} />
              <span style={{ ...S.label, color: T.text, fontSize: '0.9rem' }}>{action.label}</span>
            </Button>
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
          { label: 'Available to Help', value: helpersCount },
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
                onClick={() => setSelMember(member)}
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
                <Avatar src={member.avatar} name={member.firstName} size="md" />
                <div style={{ ...S.flexCol, gap: '0.25rem', flex: 1 }}>
                  <p style={{ ...S.body, color: T.text, margin: 0, fontWeight: '500' }}>
                    {member.firstName} {member.lastName}
                  </p>
                  <p style={{ ...S.body, color: T.textMuted, margin: 0, fontSize: '0.85rem' }}>
                    {member.location || 'Community Member'}
                  </p>
                </div>
                <Icon name="chevron-right" size="20" color={T.textMuted} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Available to Help */}
        <div style={{ ...S.flexCol, gap: '1rem' }}>
          <h2 style={{ ...S.h2, color: T.text, margin: 0 }}>Available to Help</h2>
          <div style={{ ...S.flexCol, gap: '1.5rem' }}>
            {availableHelpers.map(helper => (
              <div
                key={helper.id}
                onClick={() => setSelMember(helper)}
                style={{
                  ...S.flexCol,
                  gap: '0.75rem',
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
                <div style={{ ...S.flexRow, alignItems: 'center', gap: '0.75rem' }}>
                  <Avatar src={helper.avatar} name={helper.firstName} size="sm" />
                  <p style={{ ...S.body, color: T.text, margin: 0, fontWeight: '500', flex: 1 }}>
                    {helper.firstName} {helper.lastName}
                  </p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                  }}
                >
                  {helper.availableSkills?.slice(0, 3).map((skill, idx) => (
                    <Tag
                      key={idx}
                      label={skill}
                      color={T.primary}
                      backgroundColor="transparent"
                      style={{
                        border: `1px solid ${T.primary}`,
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.75rem',
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
