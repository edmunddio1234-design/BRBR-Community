import React, { useState } from 'react';
import { T } from '../theme';
import { S } from '../styles';
import { Avatar, Tag, Card } from '../components/UI';
import Icon from '../components/Icons';
import { READING_GROUPS } from '../constants';

export function ConnectionTree({ members }) {
  const [expandedGroups, setExpandedGroups] = useState({});
  const [hoveredMember, setHoveredMember] = useState(null);

  // Toggle group expansion
  const toggleGroup = (groupName) => {
    setExpandedGroups(prev => ({ ...prev, [groupName]: !prev[groupName] }));
  };

  // Get members in a specific group
  const getMembersInGroup = (groupName) => {
    return members.filter(m => m.currentGroups && m.currentGroups.includes(groupName));
  };

  // Calculate stats
  const totalMembers = members.length;
  const activeGroups = READING_GROUPS.filter(g => getMembersInGroup(g).length > 0);
  const mostActiveGroup = activeGroups.reduce((max, group) => {
    const count = getMembersInGroup(group).length;
    const maxCount = getMembersInGroup(max).length;
    return count > maxCount ? group : max;
  }, activeGroups[0]);
  const mostActiveCount = getMembersInGroup(mostActiveGroup).length;

  // Find shared groups between members
  const getSharedGroups = (member1, member2) => {
    if (!member1.currentGroups || !member2.currentGroups) return [];
    return member1.currentGroups.filter(g => member2.currentGroups.includes(g));
  };

  return (
    <div style={{
      background: T.bg,
      minHeight: '100vh',
      padding: '40px 20px',
      fontFamily: T.fontBody,
    }}>
      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ fontSize: '28px' }}>
            {Icon({ name: 'tree', size: 32, color: T.primary })}
          </div>
          <h1 style={{ ...S.h1, fontSize: '32px', margin: 0 }}>Community Network</h1>
        </div>
        <p style={{ ...S.body, color: T.textMuted, margin: '0 0 24px 0', maxWidth: '600px' }}>
          Explore our connected reading groups and the beautiful community weaving together through shared faith, growth, and healing. See how members are linked through groups, interests, and meaningful relationships.
        </p>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '24px' }}>
          {/* Total Members */}
          <div style={{
            background: T.bgCard,
            border: `1px solid ${T.border}`,
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: T.primary, marginBottom: '8px' }}>
              {totalMembers}
            </div>
            <div style={{ ...S.label, opacity: 0.7 }}>Total Members</div>
          </div>

          {/* Total Groups */}
          <div style={{
            background: T.bgCard,
            border: `1px solid ${T.border}`,
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: T.primary, marginBottom: '8px' }}>
              {activeGroups.length}
            </div>
            <div style={{ ...S.label, opacity: 0.7 }}>Active Groups</div>
          </div>

          {/* Most Active Group */}
          <div style={{
            background: T.bgCard,
            border: `1px solid ${T.border}`,
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '24px', fontWeight: '600', color: T.primary, marginBottom: '4px' }}>
              {mostActiveGroup}
            </div>
            <div style={{ ...S.label, opacity: 0.7 }}>{mostActiveCount} Members</div>
          </div>
        </div>
      </div>

      {/* Central Hub Visualization */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '48px' }}>
        <div style={{
          background: T.gradientCard,
          border: `2px solid ${T.primary}`,
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          marginBottom: '40px',
        }}>
          <div style={{
            background: T.gradientPrimary,
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            margin: '0 auto 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: '700',
            color: T.black,
          }}>
            BRBR
          </div>
          <h2 style={{ ...S.h2, fontSize: '24px', marginBottom: '12px' }}>BRBR Community Hub</h2>
          <p style={{ ...S.body, color: T.textMuted, marginBottom: '0' }}>
            A network of {totalMembers} souls connected through reading, prayer, healing, and shared growth
          </p>
        </div>

        {/* Connection Explanation */}
        <div style={{
          background: T.primaryFaint,
          border: `1px solid ${T.border}`,
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '40px',
        }}>
          <p style={{ ...S.body, margin: '0', color: T.text }}>
            <span style={{ color: T.primary, fontWeight: '600' }}>How to read this network:</span> Each reading group below represents a branch of our community. Click a group to see its members. Members connected through multiple groups share deeper community ties.
          </p>
        </div>
      </div>

      {/* Reading Groups as Expandable Cards */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h3 style={{ ...S.h2, fontSize: '18px', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Reading Groups
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {READING_GROUPS.map((groupName) => {
            const groupMembers = getMembersInGroup(groupName);
            const isExpanded = expandedGroups[groupName];

            return (
              <Card
                key={groupName}
                hoverable
                onClick={() => toggleGroup(groupName)}
                style={{
                  cursor: 'pointer',
                  background: isExpanded ? T.bgCardHover : T.bgCard,
                  borderColor: groupMembers.length > 0 ? T.borderHover : T.border,
                }}
              >
                {/* Group Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px',
                }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ ...S.h3, fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                      {groupName}
                    </h4>
                    <Tag style={{ marginRight: '8px' }}>
                      {groupMembers.length} {groupMembers.length === 1 ? 'Member' : 'Members'}
                    </Tag>
                  </div>
                  <div style={{
                    fontSize: '18px',
                    color: T.primary,
                    transition: 'transform 0.3s ease',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}>
                    ▼
                  </div>
                </div>

                {/* Member Avatars Preview */}
                {groupMembers.length > 0 && (
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap',
                    marginBottom: isExpanded ? '20px' : '0',
                  }}>
                    {groupMembers.slice(0, 4).map((member) => (
                      <div
                        key={member.id}
                        style={{ position: 'relative', cursor: 'pointer' }}
                        onMouseEnter={() => setHoveredMember(member.id)}
                        onMouseLeave={() => setHoveredMember(null)}
                      >
                        <Avatar name={member.name} size={36} />
                        {hoveredMember === member.id && (
                          <div style={{
                            position: 'absolute',
                            bottom: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: T.bgCard,
                            border: `1px solid ${T.border}`,
                            padding: '8px 12px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            whiteSpace: 'nowrap',
                            marginBottom: '8px',
                            zIndex: 10,
                            color: T.text,
                          }}>
                            {member.name}
                          </div>
                        )}
                      </div>
                    ))}
                    {groupMembers.length > 4 && (
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: T.primaryFaint,
                        border: `1px solid ${T.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: T.primary,
                      }}>
                        +{groupMembers.length - 4}
                      </div>
                    )}
                  </div>
                )}

                {/* Expanded Member List */}
                {isExpanded && groupMembers.length > 0 && (
                  <div style={{
                    borderTop: `1px solid ${T.border}`,
                    paddingTop: '16px',
                    marginTop: '16px',
                  }}>
                    <div style={{ ...S.label, marginBottom: '12px' }}>Members in this group</div>
                    {groupMembers.map((member) => (
                      <div
                        key={member.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '10px 0',
                          borderBottom: `1px solid ${T.borderLight}`,
                        }}
                      >
                        <Avatar name={member.name} size={28} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ ...S.body, fontWeight: '500', fontSize: '13px' }}>
                            {member.name}
                          </div>
                          <div style={{ fontSize: '11px', color: T.textMuted }}>
                            {member.work}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Empty State */}
                {groupMembers.length === 0 && (
                  <div style={{
                    padding: '20px 0',
                    textAlign: 'center',
                    color: T.textMuted,
                    fontSize: '13px',
                  }}>
                    No members yet
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Member Connections Section */}
      {members.length > 0 && (
        <div style={{ maxWidth: '1200px', margin: '0 auto', marginTop: '64px' }}>
          <h3 style={{ ...S.h2, fontSize: '18px', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Member Connections
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
          }}>
            {members.map((member) => {
              // Find other members who share groups with this member
              const connectedMembers = members.filter(other =>
                other.id !== member.id && getSharedGroups(member, other).length > 0
              );

              return (
                <Card key={member.id} style={{ minHeight: '240px' }}>
                  {/* Member Header */}
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    <Avatar name={member.name} size={40} />
                    <div style={{ flex: 1 }}>
                      <div style={{ ...S.h3, fontSize: '14px', fontWeight: '600' }}>
                        {member.name}
                      </div>
                      <div style={{ fontSize: '11px', color: T.textMuted }}>
                        {member.work}
                      </div>
                      {member.location && (
                        <div style={{ fontSize: '11px', color: T.textMuted }}>
                          {member.location}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Groups */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ ...S.label, marginBottom: '8px' }}>In {member.currentGroups?.length || 0} Groups</div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {member.currentGroups?.slice(0, 2).map((group, idx) => (
                        <Tag key={idx} style={{ fontSize: '9px', padding: '3px 8px' }}>
                          {group}
                        </Tag>
                      ))}
                      {member.currentGroups?.length > 2 && (
                        <Tag style={{ fontSize: '9px', padding: '3px 8px' }}>
                          +{member.currentGroups.length - 2}
                        </Tag>
                      )}
                    </div>
                  </div>

                  {/* Connected Members */}
                  <div style={{
                    borderTop: `1px solid ${T.border}`,
                    paddingTop: '12px',
                  }}>
                    <div style={{ ...S.label, marginBottom: '8px' }}>
                      Connected with {connectedMembers.length}
                    </div>
                    {connectedMembers.length > 0 ? (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {connectedMembers.slice(0, 3).map((connected) => {
                          const sharedGroups = getSharedGroups(member, connected);
                          return (
                            <div
                              key={connected.id}
                              style={{
                                position: 'relative',
                              }}
                              onMouseEnter={() => setHoveredMember(connected.id)}
                              onMouseLeave={() => setHoveredMember(null)}
                            >
                              <Avatar name={connected.name} size={28} />
                              {hoveredMember === connected.id && (
                                <div style={{
                                  position: 'absolute',
                                  bottom: '100%',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  background: T.bgCard,
                                  border: `1px solid ${T.border}`,
                                  padding: '6px 10px',
                                  borderRadius: '4px',
                                  fontSize: '9px',
                                  whiteSpace: 'nowrap',
                                  marginBottom: '8px',
                                  zIndex: 10,
                                  color: T.text,
                                }}>
                                  {sharedGroups.length} shared
                                </div>
                              )}
                            </div>
                          );
                        })}
                        {connectedMembers.length > 3 && (
                          <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: T.primaryFaint,
                            border: `1px solid ${T.border}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            fontWeight: '600',
                            color: T.primary,
                          }}>
                            +{connectedMembers.length - 3}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={{ fontSize: '12px', color: T.textMuted }}>
                        Build connections by joining groups
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {members.length === 0 && (
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          padding: '60px 20px',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌱</div>
          <h3 style={{ ...S.h2, marginBottom: '8px' }}>Community Network</h3>
          <p style={{ ...S.body, color: T.textMuted }}>
            No members yet. The community will begin to take shape as members join reading groups.
          </p>
        </div>
      )}
    </div>
  );
}
