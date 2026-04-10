import React from 'react';
import { T } from '../theme';
import { S } from '../styles';
import { Button, Tag, Card } from '../components/UI';
import Icon from '../components/Icons';
import { api } from '../api';

export default function ProfileView({ member, setPage, onMessage }) {
  if (!member) {
    return (
      <div style={styles.container}>
        <p style={styles.emptyText}>Member not found</p>
        <Button onClick={() => setPage('directory')} style={styles.backButton}>
          Back to Directory
        </Button>
      </div>
    );
  }

  const displayValue = (value) => value || '\u2014';
  const hasContent = (arr) => arr && arr.length > 0;

  // Determine avatar: URL string (from mockMembers) or initials string (from old data)
  const avatarIsUrl = member.avatar && (member.avatar.startsWith('http') || member.avatar.startsWith('data:'));
  const avatarInitials = member.initials || (member.name ? member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '??');

  return (
    <div style={styles.container}>
      {/* Header with back button */}
      <div style={styles.header}>
        <button
          onClick={() => setPage('directory')}
          style={styles.backButtonSmall}
          aria-label="Back to directory"
        >
          <Icon name="arrow-left" size={20} color={T.primary} />
        </button>
        <h1 style={styles.title}>Member Profile</h1>
        <div style={styles.spacer} />
      </div>

      {/* Profile card */}
      <Card style={styles.profileCard}>
        {/* Avatar and basic info */}
        <div style={styles.profileHeader}>
          {/* Photo-capable avatar */}
          <div style={styles.avatarWrapper}>
            {avatarIsUrl ? (
              <img
                src={member.avatar}
                alt={member.name}
                style={styles.avatarImg}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div style={{
              ...styles.avatarFallback,
              display: avatarIsUrl ? 'none' : 'flex',
            }}>
              {avatarInitials}
            </div>
          </div>

          <div style={styles.profileInfo}>
            <h2 style={styles.name}>{member.name}</h2>
            {member.location && (
              <div style={styles.locationRow}>
                <Icon name="map-pin" size={16} color={T.primary} />
                <span style={styles.location}>{member.location}</span>
              </div>
            )}
            {member.bio && (
              <p style={styles.bio}>{member.bio}</p>
            )}
          </div>
        </div>

        {/* Message button */}
        <Button
          onClick={() => onMessage(member)}
          style={styles.messageButton}
          variant="primary"
        >
          Send Message
        </Button>

        {/* About section */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>About</h3>
          <div style={styles.aboutGrid}>
            {member.work && (
              <div style={styles.aboutItem}>
                <span style={styles.aboutLabel}>Work</span>
                <span style={styles.aboutValue}>{member.work}</span>
              </div>
            )}
            {member.age && (
              <div style={styles.aboutItem}>
                <span style={styles.aboutLabel}>Age</span>
                <span style={styles.aboutValue}>{member.age}</span>
              </div>
            )}
            {member.maritalStatus && (
              <div style={styles.aboutItem}>
                <span style={styles.aboutLabel}>Marital Status</span>
                <span style={styles.aboutValue}>{member.maritalStatus}</span>
              </div>
            )}
            {member.birthday && (
              <div style={styles.aboutItem}>
                <span style={styles.aboutLabel}>Birthday</span>
                <span style={styles.aboutValue}>{member.birthday}</span>
              </div>
            )}
            {member.languages && (
              <div style={styles.aboutItem}>
                <span style={styles.aboutLabel}>Languages</span>
                <span style={styles.aboutValue}>{Array.isArray(member.languages) ? member.languages.join(', ') : member.languages}</span>
              </div>
            )}
          </div>
        </div>

        {/* Reading Groups */}
        {hasContent(member.currentGroups) && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Reading Groups</h3>
            <div style={styles.tagsContainer}>
              {member.currentGroups.map((group) => (
                <Tag key={group}>{group}</Tag>
              ))}
            </div>
          </div>
        )}

        {/* Growth Areas / Spiritual Gifts */}
        {hasContent(member.spiritualGifts) && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Spiritual Gifts</h3>
            <div style={styles.tagsContainer}>
              {member.spiritualGifts.map((gift) => (
                <Tag key={gift}>{gift}</Tag>
              ))}
            </div>
          </div>
        )}

        {/* Hobbies */}
        {hasContent(member.hobbies) && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Hobbies & Interests</h3>
            <div style={styles.tagsContainer}>
              {member.hobbies.map((hobby) => (
                <Tag key={hobby}>{hobby}</Tag>
              ))}
            </div>
          </div>
        )}

        {/* Available to Help */}
        {hasContent(member.available) && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Available to Help With</h3>
            <div style={styles.tagsContainer}>
              {member.available.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>
        )}

        {/* Contact */}
        {(member.email || member.phone) && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Contact</h3>
            <div style={styles.contactGrid}>
              {member.email && (
                <div style={styles.contactItem}>
                  <Icon name="mail" size={16} color={T.primary} />
                  <a href={`mailto:${member.email}`} style={styles.contactLink}>{member.email}</a>
                </div>
              )}
              {member.phone && (
                <div style={styles.contactItem}>
                  <Icon name="phone" size={16} color={T.primary} />
                  <a href={`tel:${member.phone}`} style={styles.contactLink}>{member.phone}</a>
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', gap: 24, padding: 24, maxWidth: 800, margin: '0 auto' },
  header: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 },
  title: { fontSize: 24, fontWeight: 600, color: T.text, margin: 0, fontFamily: T.fontDisplay, flex: 1 },
  backButtonSmall: { background: 'none', border: 'none', padding: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' },
  spacer: { width: 36 },
  profileCard: { display: 'flex', flexDirection: 'column', gap: 32, padding: 32, background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12 },
  profileHeader: { display: 'flex', gap: 32, alignItems: 'flex-start', paddingBottom: 24, borderBottom: `1px solid ${T.border}` },
  avatarWrapper: { flexShrink: 0, width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', border: `3px solid ${T.primary}` },
  avatarImg: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' },
  avatarFallback: { width: '100%', height: '100%', background: T.gradientPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42, fontWeight: '700', color: T.black, fontFamily: T.fontDisplay, letterSpacing: '2px' },
  profileInfo: { flex: 1, display: 'flex', flexDirection: 'column', gap: 12 },
  name: { fontSize: 32, fontWeight: 700, color: T.text, margin: 0, fontFamily: T.fontDisplay },
  locationRow: { display: 'flex', alignItems: 'center', gap: 8, color: T.textMuted },
  location: { fontSize: 14, color: T.textMuted },
  bio: { fontSize: 14, lineHeight: 1.6, color: T.text, margin: 8 },
  messageButton: { alignSelf: 'flex-start', paddingLeft: 24, paddingRight: 24 },
  section: { display: 'flex', flexDirection: 'column', gap: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 600, color: T.primary, margin: 0, fontFamily: T.fontAccent, textTransform: 'uppercase', letterSpacing: 1 },
  aboutGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 },
  aboutItem: { display: 'flex', flexDirection: 'column', gap: 4 },
  aboutLabel: { fontSize: 12, color: T.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 },
  aboutValue: { fontSize: 14, color: T.text, fontWeight: 500 },
  tagsContainer: { display: 'flex', flexWrap: 'wrap', gap: 12 },
  contactGrid: { display: 'flex', flexDirection: 'column', gap: 12 },
  contactItem: { display: 'flex', alignItems: 'center', gap: 12 },
  contactLink: { fontSize: 14, color: T.primary, textDecoration: 'none', transition: 'color 0.2s ease' },
  emptyText: { fontSize: 14, color: T.textMuted, textAlign: 'center' },
};