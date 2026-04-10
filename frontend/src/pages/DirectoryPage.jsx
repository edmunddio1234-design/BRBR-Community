import React, { useState, useMemo } from 'react';
import { T } from '../theme';
import { Button, Tag, Card, TabBar } from '../components/UI';
import Icon from '../components/Icons';
import { MOCK_MEMBERS } from '../mockMembers';

const LOCATIONS = ['All', 'Baton Rouge', 'Houston', 'Atlanta', 'Dallas', 'New Orleans'];

export default function DirectoryPage({ members: propMembers, setPage, setSelMember }) {
  const members = (propMembers && propMembers.length > 0) ? propMembers : MOCK_MEMBERS;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');

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

  const locationCounts = useMemo(() => {
    const counts = {};
    members.forEach(m => { counts[m.location] = (counts[m.location] || 0) + 1; });
    return counts;
  }, [members]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Reader Directory</h1>
        <p style={styles.subtitle}>
          {members.length} beautiful souls across {Object.keys(locationCounts).length} cities — connected through reading, faith, and sisterhood.
        </p>
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search by name, city, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <Icon name="search" style={styles.searchIcon} />
        </div>
      </div>

      <div style={styles.statsRow}>
        {LOCATIONS.filter(l => l !== 'All').map(city => (
          <div key={city} style={{
            ...styles.statChip,
            background: selectedLocation === city ? T.primary : T.bgCard,
            color: selectedLocation === city ? T.black : T.text,
            cursor: 'pointer',
          }} onClick={() => setSelectedLocation(city === selectedLocation ? 'All' : city)}>
            <span style={{ fontWeight: '700', fontSize: '18px' }}>{locationCounts[city] || 0}</span>
            <span style={{ fontSize: '11px', opacity: 0.8 }}>{city}</span>
          </div>
        ))}
      </div>

      <div style={styles.tabsSection}>
        <TabBar
          tabs={LOCATIONS}
          active={selectedLocation}
          onChange={setSelectedLocation}
        />
      </div>

      <div style={styles.resultCount}>
        {filteredMembers.length} reader{filteredMembers.length !== 1 ? 's' : ''} found
        {selectedLocation !== 'All' && ` in ${selectedLocation}`}
      </div>

      {filteredMembers.length > 0 ? (
        <div style={styles.grid}>
          {filteredMembers.map((member) => (
            <Card key={member.id} style={styles.memberCard}>
              <div style={styles.cardHeader}>
                <div style={styles.avatarContainer}>
                  <img
                    src={member.avatar}
                    alt={member.name}
                    style={styles.avatarImage}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div style={{ ...styles.avatarFallback, display: 'none' }}>
                    {member.initials || member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                </div>
                <div style={styles.memberInfo}>
                  <h3 style={styles.memberName}>{member.name}</h3>
                  <p style={styles.memberLocation}>{member.location}</p>
                </div>
              </div>

              {member.work && (
                <div style={styles.workSection}>
                  <p style={styles.workLabel}>Role</p>
                  <p style={styles.workValue}>{member.work}</p>
                </div>
              )}

              {member.bio && (
                <p style={styles.bioPreview}>
                  {member.bio.length > 90 ? member.bio.slice(0, 90) + '...' : member.bio}
                </p>
              )}

              {member.currentGroups && member.currentGroups.length > 0 && (
                <div style={styles.tagsSection}>
                  <p style={styles.tagsLabel}>Reading Groups</p>
                  <div style={styles.tags}>
                    {member.currentGroups.map((group, idx) => (
                      <Tag key={idx}>{group}</Tag>
                    ))}
                  </div>
                </div>
              )}

              <Button onClick={() => handleViewProfile(member)} style={styles.viewButton}>
                View Profile
              </Button>
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
  container: { padding: '2rem', backgroundColor: T.bg, minHeight: '100vh', fontFamily: T.fontBody },
  header: { marginBottom: '2rem' },
  title: { fontSize: '2.5rem', fontFamily: T.fontDisplay, color: T.text, margin: '0 0 0.5rem 0', fontWeight: 700 },
  subtitle: { fontSize: '0.95rem', color: T.textMuted, margin: '0 0 1.5rem 0', lineHeight: 1.6, maxWidth: '600px', fontFamily: T.fontAccent, fontStyle: 'italic' },
  searchBar: { position: 'relative', maxWidth: '500px' },
  searchInput: { width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', backgroundColor: T.bgCard, border: `1px solid ${T.border}`, borderRadius: '0.5rem', color: T.text, fontSize: '1rem', fontFamily: T.fontBody, outline: 'none', transition: 'all 0.2s ease' },
  searchIcon: { position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: T.textMuted, pointerEvents: 'none' },
  statsRow: { display: 'flex', gap: '12px', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '4px' },
  statChip: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', padding: '12px 20px', borderRadius: '8px', border: `1px solid ${T.border}`, minWidth: '100px', transition: 'all 0.2s ease' },
  tabsSection: { marginBottom: '2rem', overflowX: 'auto' },
  resultCount: { fontSize: '0.875rem', color: T.textMuted, marginBottom: '1.5rem', fontWeight: 500 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' },
  memberCard: { padding: '1.5rem', backgroundColor: T.bgCard, border: `1px solid ${T.border}`, borderRadius: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', transition: 'all 0.2s ease', cursor: 'pointer' },
  cardHeader: { display: 'flex', gap: '1rem', alignItems: 'center' },
  avatarContainer: { flexShrink: 0, width: '56px', height: '56px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${T.primary}` },
  avatarImage: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' },
  avatarFallback: { width: '100%', height: '100%', background: T.gradientPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '700', color: T.black, fontFamily: T.fontDisplay },
  memberInfo: { flex: 1 },
  memberName: { fontSize: '1.125rem', fontFamily: T.fontDisplay, color: T.text, margin: '0 0 0.25rem 0', fontWeight: 600 },
  memberLocation: { fontSize: '0.875rem', color: T.primary, margin: 0 },
  workSection: { paddingTop: '0.5rem', borderTop: `1px solid ${T.border}` },
  workLabel: { fontSize: '0.75rem', color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.5rem 0' },
  workValue: { fontSize: '0.95rem', color: T.text, margin: 0 },
  bioPreview: { fontSize: '0.8rem', color: T.textBody, lineHeight: 1.6, margin: 0, fontFamily: T.fontAccent, fontStyle: 'italic' },
  tagsSection: { paddingTop: '0.5rem' },
  tagsLabel: { fontSize: '0.75rem', color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.5rem 0' },
  tags: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem' },
  viewButton: { marginTop: 'auto', padding: '0.75rem 1rem', backgroundColor: T.primary, color: T.bg, border: 'none', borderRadius: '0.5rem', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease', fontFamily: T.fontBody },
  noResults: { textAlign: 'center', padding: '3rem 1rem' },
  noResultsText: { fontSize: '1rem', color: T.textMuted, margin: 0 },
};