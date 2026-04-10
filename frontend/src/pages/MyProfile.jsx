import React from 'react';
import { T } from '../theme';
import { S } from '../styles';
import { Avatar, Button, Tag, Card } from '../components/UI';
import Icon from '../components/Icons';

export default function MyProfile({ user, setPage }) {
  if (!user) {
    return (
      <div style={styles.container}>
        <p style={styles.emptyText}>No user data available</p>
      </div>
    );
  }

  const displayValue = (value) => value || '—';
  const hasContent = (arr) => arr && arr.length > 0;

  return (
    <div style={styles.container}>
      {/* Header with title */}
      <div style={styles.header}>
        <h1 style={styles.title}>My Profile</h1>
      </div>

      {/* Profile card */}
      <Card style={styles.profileCard}>
        {/* Avatar and basic info */}
        <div style={styles.profileHeader}>
          <Avatar name={user.name} size={120} />
          <div style={styles.profileInfo}>
            <h2 style={styles.name}>{user.name}</h2>
            {user.location && (
              <div style={styles.locationRow}>
                <Icon name="map-pin" size={16} color={T.primary} />
                <span style={styles.location}>{user.location}</span>
              </div>
            )}
            {user.bio && (
              <p style={styles.bio}>{user.bio}</p>
            )}
          </div>
        </div>

        {/* Edit button */}
        <Button
          onClick={() => setPage('profile-edit')}
          style={styles.editButton}
          variant="primary"
        >
          <Icon name="edit-2" size={16} color="currentColor" />
          Edit Profile
        </Button>

        {/* About section */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>About</h3>
          <div style={styles.aboutGrid}>
            {user.work && (
              <div style={styles.aboutItem}>
                <span style={styles.aboutLabel}>Work</span>
                <span style={styles.aboutValue}>{user.work}</span>
              </div>
            )}
            {user.age && (
              <div style={styles.aboutItem}>
                <span style={styles.aboutLabel}>Age</span>
                <span style={styles.aboutValue}>{user.age}</span>
              </div>
            )}
            {user.maritalStatus && (
              <div style={styles.aboutItem}>
                <span style={styles.aboutLabel}>Marital Status</span>
                <span style={styles.aboutValue}>{user.maritalStatus}</span>
              </div>
            )}
            {user.birthday && (
              <div style={styles.aboutItem}>
                <span style={styles.aboutLabel}>Birthday</span>
                <span style={styles.aboutValue}>{user.birthday}</span>
              </div>
            )}
            {user.languages && (
              <div style={styles.aboutItem}>
                <span style={styles.aboutLabel}>Languages</span>
                <span style={styles.aboutValue}>{user.languages}</span>
              </div>
            )}
          </div>
        </div>

        {/* Reading Groups */}
        {hasContent(user.currentGroups) && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Currently Reading</h3>
            <div style={styles.tagsContainer}>
              {user.currentGroups.map((group) => (
                <Tag key={group} label={group} style={styles.tag} />
              ))}
            </div>
          </div>
        )}

        {/* Desired Groups */}
        {hasContent(user.desiredGroups) && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Interested in Joining</h3>
            <div style={styles.tagsContainer}>
              {user.desiredGroups.map((group) => (
                <Tag key={group} label={group} style={styles.tag} />
              ))}
            </div>
          </div>
        )}

        {/* Spiritual Gifts */}
        {hasContent(user.spiritualGifts) && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Spiritual Gifts</h3>
            <div style={styles.tagsContainer}>
              {user.spiritualGifts.map((gift) => (
                <Tag key={gift} label={gift} style={styles.tag} />
              ))}
            </div>
          </div>
        )}

        {/* Hobbies */}
        {hasContent(user.hobbies) && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Hobbies & Interests</h3>
            <div style={styles.tagsContainer}>
              {user.hobbies.map((hobby) => (
                <Tag key={hobby} label={hobby} style={styles.tag} />
              ))}
            </div>
          </div>
        )}

        {/* Available to Help */}
        {hasContent(user.available) && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>I Can Help With</h3>
            <div style={styles.tagsContainer}>
              {user.available.map((item) => (
                <Tag key={item} label={item} style={styles.tag} />
              ))}
            </div>
          </div>
        )}

        {/* Need Help With */}
        {hasContent(user.needHelpWith) && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>I Need Help With</h3>
            <div style={styles.tagsContainer}>
              {user.needHelpWith.map((item) => (
                <Tag key={item} label={item} style={styles.tag} />
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        {(user.email || user.phone) && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Contact Information</h3>
            <div style={styles.contactGrid}>
              {user.email && (
                <div style={styles.contactItem}>
                  <Icon name="mail" size={16} color={T.primary} />
                  <span style={styles.contactValue}>{user.email}</span>
                </div>
              )}
              {user.phone && (
                <div style={styles.contactItem}>
                  <Icon name="phone" size={16} color={T.primary} />
                  <span style={styles.contactValue}>{user.phone}</span>
                </div>
              )}
              {user.social && (
                <div style={styles.contactItem}>
                  <Icon name="link" size={16} color={T.primary} />
                  <span style={styles.contactValue}>{user.social}</span>
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
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    padding: 24,
    maxWidth: 800,
    margin: '0 auto',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  title: {
    fontSize: 24,
    fontWeight: 600,
    color: T.text,
    margin: 0,
    fontFamily: T.fontDisplay,
  },

  profileCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    padding: 32,
    background: T.bgCard,
    border: `1px solid ${T.border}`,
    borderRadius: 12,
  },

  profileHeader: {
    display: 'flex',
    gap: 32,
    alignItems: 'flex-start',
    paddingBottom: 24,
    borderBottom: `1px solid ${T.border}`,
  },

  profileInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },

  name: {
    fontSize: 32,
    fontWeight: 700,
    color: T.text,
    margin: 0,
    fontFamily: T.fontDisplay,
  },

  locationRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: T.textMuted,
  },

  location: {
    fontSize: 14,
    color: T.textMuted,
  },

  bio: {
    fontSize: 14,
    lineHeight: 1.6,
    color: T.text,
    margin: 8,
  },

  editButton: {
    alignSelf: 'flex-start',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 24,
    paddingRight: 24,
  },

  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: T.primary,
    margin: 0,
    fontFamily: T.fontAccent,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  aboutGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 20,
  },

  aboutItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },

  aboutLabel: {
    fontSize: 12,
    color: T.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: 600,
  },

  aboutValue: {
    fontSize: 14,
    color: T.text,
    fontWeight: 500,
  },

  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
  },

  tag: {
    padding: '6px 12px',
    background: T.primaryFaint,
    border: `1px solid ${T.border}`,
    borderRadius: 20,
    fontSize: 13,
    color: T.primary,
    fontWeight: 500,
  },

  contactGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },

  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },

  contactValue: {
    fontSize: 14,
    color: T.text,
    fontWeight: 500,
  },

  emptyText: {
    fontSize: 14,
    color: T.textMuted,
    textAlign: 'center',
  },
};
