import React, { useState, useMemo } from 'react';
import { T } from '../theme';
import { S } from '../styles';
import { Avatar, Button, Tag, Card, TabBar } from '../components/UI';
import Icon from '../components/Icons';
import { READING_GROUPS } from '../constants';

const LOCATIONS = ['All', 'Baton Rouge', 'Houston', 'Atlanta', 'Dallas', 'New Orleans'];

export default function DirectoryPage({ members, setPage, setSelMember }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');

  // Filter members based on search query and location
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.work?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocation =
        selectedLocation === 'All' ||
        member.location?.includes(selectedLocation);

      return matchesSearch && matchesLocation;
    });
  }, [members, searchQuery, selectedLocation]);

  const handleViewProfile = (member) => {
    setSelMember(member);
    setPage('profile-view');
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.title}>Reader Directory</h1>
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search by name, location, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <Icon name="search" style={styles.searchIcon} />
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={styles.tabsSection}>
        <TabBar
          tabs={LOCATIONS}
          activeTab={selectedLocation}
          onTabChange={setSelectedLocation}
          style={styles.tabBar}
        />
      </div>

      {/* Results Count */}
      <div style={styles.resultCount}>
        {filteredMembers.length} reader{filteredMembers.length !== 1 ? 's' : ''} found
      </div>

      {/* Members Grid */}
      {filteredMembers.length > 0 ? (
        <div style={styles.grid}>
          {filteredMembers.map((member) => (
            <Card key={member.id} style={styles.memberCard}>
              <div style={styles.cardHeader}>
                <Avatar
                  src={member.avatar}
                  alt={member.name}
                  size="lg"
                  style={styles.avatar}
                />
                <div style={styles.memberInfo}>
                  <h3 style={styles.memberName}>{member.name}</h3>
                  <p style={styles.memberLocation}>{member.location}</p>
                </div>
              </div>

              {/* Work/Role Section */}
              {member.work && (
                <div style={styles.workSection}>
                  <p style={styles.workLabel}>Role</p>
                  <p style={styles.workValue}>{member.work}</p>
                </div>
              )}

              {/* Reading Groups Tags */}
              {member.readingGroups && member.readingGroups.length > 0 && (
                <div style={styles.tagsSection}>
                  <p style={styles.tagsLabel}>Reading Groups</p>
                  <div style={styles.tags}>
                    {member.readingGroups.map((groupId) => {
                      const group = READING_GROUPS.find((g) => g.id === groupId);
                      return group ? (
                        <Tag
                          key={groupId}
                          label={group.name}
                          style={styles.tag}
                        />
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {/* View Profile Button */}
              <Button
                label="View Profile"
                onClick={() => handleViewProfile(member)}
                style={styles.viewButton}
              />
            </Card>
          ))}
        </div>
      ) : (
        <div style={styles.noResults}>
          <p style={styles.noResultsText}>No readers found matching your search.</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: T.bg,
    minHeight: '100vh',
    fontFamily: T.fontBody,
  },

  header: {
    marginBottom: '2rem',
  },

  title: {
    fontSize: '2.5rem',
    fontFamily: T.fontDisplay,
    color: T.text,
    margin: '0 0 1.5rem 0',
    fontWeight: 700,
  },

  searchBar: {
    position: 'relative',
    maxWidth: '500px',
  },

  searchInput: {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 2.5rem',
    backgroundColor: T.bgCard,
    border: `1px solid ${T.border}`,
    borderRadius: '0.5rem',
    color: T.text,
    fontSize: '1rem',
    fontFamily: T.fontBody,
    outline: 'none',
    transition: 'all 0.2s ease',
  },

  searchIcon: {
    position: 'absolute',
    left: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: T.textMuted,
    pointerEvents: 'none',
  },

  tabsSection: {
    marginBottom: '2rem',
    overflow: 'x auto',
  },

  tabBar: {
    display: 'flex',
    gap: '0.5rem',
  },

  resultCount: {
    fontSize: '0.875rem',
    color: T.textMuted,
    marginBottom: '1.5rem',
    fontWeight: 500,
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },

  memberCard: {
    padding: '1.5rem',
    backgroundColor: T.bgCard,
    border: `1px solid ${T.border}`,
    borderRadius: '0.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },

  cardHeader: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start',
  },

  avatar: {
    flexShrink: 0,
  },

  memberInfo: {
    flex: 1,
  },

  memberName: {
    fontSize: '1.125rem',
    fontFamily: T.fontDisplay,
    color: T.text,
    margin: '0 0 0.25rem 0',
    fontWeight: 600,
  },

  memberLocation: {
    fontSize: '0.875rem',
    color: T.primary,
    margin: 0,
  },

  workSection: {
    paddingTop: '0.5rem',
    borderTop: `1px solid ${T.border}`,
  },

  workLabel: {
    fontSize: '0.75rem',
    color: T.textMuted,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    margin: '0 0 0.5rem 0',
  },

  workValue: {
    fontSize: '0.95rem',
    color: T.text,
    margin: 0,
  },

  tagsSection: {
    paddingTop: '0.5rem',
  },

  tagsLabel: {
    fontSize: '0.75rem',
    color: T.textMuted,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    margin: '0 0 0.5rem 0',
  },

  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },

  tag: {
    backgroundColor: `rgba(201, 166, 136, 0.1)`,
    color: T.primary,
    fontSize: '0.8rem',
    padding: '0.25rem 0.75rem',
    borderRadius: '0.25rem',
  },

  viewButton: {
    marginTop: 'auto',
    padding: '0.75rem 1rem',
    backgroundColor: T.primary,
    color: T.bg,
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: T.fontBody,
  },

  noResults: {
    textAlign: 'center',
    padding: '3rem 1rem',
  },

  noResultsText: {
    fontSize: '1rem',
    color: T.textMuted,
    margin: 0,
  },
};
