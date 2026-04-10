import React, { useState, useMemo, useRef, useEffect } from 'react';
import { T } from '../theme';
import { S } from '../styles';
import { Avatar, Tag, Card } from '../components/UI';
import Icon from '../components/Icons';
import { READING_GROUPS } from '../constants';
import { MOCK_MEMBERS, READING_GROUPS_LIST } from '../mockMembers';

// ─── COLOR MAP FOR READING GROUPS ───
const GROUP_COLORS = {
  'Healing Through Words': '#D4A0A0',
  'Faith Foundations':     '#C9A688',
  'Growth Mindset':        '#B5653A',
  'Sister Circle':         '#E8C9A8',
  'Purpose & Prayer':      '#A08070',
};

export function ConnectionTree({ members: propMembers }) {
  const members = (propMembers && propMembers.length > 0) ? propMembers : MOCK_MEMBERS;
  const [expandedGroups, setExpandedGroups] = useState({});
  const [hoveredMember, setHoveredMember] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const svgRef = useRef(null);
  const [svgSize, setSvgSize] = useState({ width: 900, height: 600 });

  // Resize SVG to container
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current && svgRef.current.parentElement) {
        const w = svgRef.current.parentElement.offsetWidth;
        setSvgSize({ width: Math.min(w, 1100), height: Math.min(600, Math.max(400, w * 0.55)) });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle group expansion
  const toggleGroup = (groupName) => {
    setExpandedGroups(prev => ({ ...prev, [groupName]: !prev[groupName] }));
  };

  // Get members in a specific group
  const getMembersInGroup = (groupName) => {
    return members.filter(m => m.currentGroups && m.currentGroups.includes(groupName));
  };

  // All reading groups (use READING_GROUPS from constants, fallback to mock list)
  const allGroups = (READING_GROUPS && READING_GROUPS.length > 0) ? READING_GROUPS : READING_GROUPS_LIST;

  // Calculate stats
  const totalMembers = members.length;
  const activeGroups = allGroups.filter(g => getMembersInGroup(g).length > 0);
  const mostActiveGroup = activeGroups.length > 0
    ? activeGroups.reduce((max, group) => {
        const count = getMembersInGroup(group).length;
        const maxCount = getMembersInGroup(max).length;
        return count > maxCount ? group : max;
      }, activeGroups[0])
    : 'None';
  const mostActiveCount = mostActiveGroup !== 'None' ? getMembersInGroup(mostActiveGroup).length : 0;

  // Find shared groups between members
  const getSharedGroups = (member1, member2) => {
    if (!member1.currentGroups || !member2.currentGroups) return [];
    return member1.currentGroups.filter(g => member2.currentGroups.includes(g));
  };

  // ─── NETWORK GRAPH COMPUTATION ───
  // Take first 20 members for the interactive SVG graph (more = too crowded)
  const graphMembers = useMemo(() => {
    if (activeFilter === 'All') return members.slice(0, 24);
    return members.filter(m => m.location === activeFilter).slice(0, 24);
  }, [members, activeFilter]);

  // Compute connections (edges) between graph members
  const connections = useMemo(() => {
    const edges = [];
    for (let i = 0; i < graphMembers.length; i++) {
      for (let j = i + 1; j < graphMembers.length; j++) {
        const shared = getSharedGroups(graphMembers[i], graphMembers[j]);
        if (shared.length > 0) {
          edges.push({
            from: graphMembers[i].id,
            to: graphMembers[j].id,
            groups: shared,
            strength: shared.length,
          });
        }
      }
    }
    return edges;
  }, [graphMembers]);

  // Position nodes in a radial layout
  const nodePositions = useMemo(() => {
    const cx = svgSize.width / 2;
    const cy = svgSize.height / 2;
    const radius = Math.min(cx, cy) - 60;
    const positions = {};
    graphMembers.forEach((member, i) => {
      const angle = (2 * Math.PI * i) / graphMembers.length - Math.PI / 2;
      positions[member.id] = {
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
        member,
      };
    });
    return positions;
  }, [graphMembers, svgSize]);

  // Filter connections for selected member
  const highlightedConnections = useMemo(() => {
    if (!selectedMember) return connections;
    return connections.filter(c => c.from === selectedMember || c.to === selectedMember);
  }, [connections, selectedMember]);

  const cities = ['All', 'Baton Rouge', 'Houston', 'Atlanta', 'Dallas', 'New Orleans'];

  return (
    <div style={{
      background: T.bg,
      minHeight: '100vh',
      padding: '40px 20px',
      fontFamily: T.fontBody,
    }}>
      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ fontSize: '28px' }}>
            {Icon({ name: 'tree', size: 32, color: T.primary })}
          </div>
          <h1 style={{ ...S.h1, fontSize: '32px', margin: 0 }}>Community Network</h1>
        </div>
        <p style={{ ...S.body, color: T.textMuted, margin: '0 0 24px 0', maxWidth: '700px' }}>
          See how {totalMembers} BRBR members are connected through shared reading groups, faith, growth, and sisterhood. Click any node to explore her connections.
        </p>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '20px' }}>
          <div style={statCard}>
            <div style={statNum}>{totalMembers}</div>
            <div style={statLabel}>Total Members</div>
          </div>
          <div style={statCard}>
            <div style={statNum}>{activeGroups.length}</div>
            <div style={statLabel}>Active Groups</div>
          </div>
          <div style={statCard}>
            <div style={{ ...statNum, fontSize: '20px' }}>{mostActiveGroup}</div>
            <div style={statLabel}>{mostActiveCount} Members</div>
          </div>
          <div style={statCard}>
            <div style={statNum}>{connections.length}</div>
            <div style={statLabel}>Connections</div>
          </div>
        </div>
      </div>

      {/* ─── INTERACTIVE NETWORK GRAPH ─── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '48px' }}>
        <div style={{
          background: T.gradientCard,
          border: `1px solid ${T.border}`,
          borderRadius: '12px',
          padding: '24px',
          overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <h3 style={{ ...S.h2, fontSize: '16px', margin: 0, textTransform: 'uppercase', letterSpacing: '2px' }}>
              Dynamic Connection Map
            </h3>
            {/* City Filter */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {cities.map(city => (
                <button
                  key={city}
                  onClick={() => { setActiveFilter(city); setSelectedMember(null); }}
                  style={{
                    padding: '4px 14px',
                    borderRadius: '16px',
                    border: `1px solid ${activeFilter === city ? T.primary : T.border}`,
                    background: activeFilter === city ? T.primary : 'transparent',
                    color: activeFilter === city ? T.black : T.textMuted,
                    fontSize: '11px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: T.fontBody,
                  }}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {Object.entries(GROUP_COLORS).map(([name, color]) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: color }} />
                <span style={{ fontSize: '10px', color: T.textMuted }}>{name}</span>
              </div>
            ))}
          </div>

          {/* SVG Network */}
          <div style={{ width: '100%', overflow: 'auto' }}>
            <svg
              ref={svgRef}
              width={svgSize.width}
              height={svgSize.height}
              viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
              style={{ display: 'block', margin: '0 auto' }}
            >
              {/* Central hub */}
              <circle cx={svgSize.width / 2} cy={svgSize.height / 2} r="32"
                fill={T.bgCard} stroke={T.primary} strokeWidth="2" />
              <text x={svgSize.width / 2} y={svgSize.height / 2 + 5}
                textAnchor="middle" fill={T.primary} fontSize="12" fontWeight="700"
                fontFamily="Inter, sans-serif">BRBR</text>

              {/* Connection lines */}
              {highlightedConnections.map((conn, idx) => {
                const fromPos = nodePositions[conn.from];
                const toPos = nodePositions[conn.to];
                if (!fromPos || !toPos) return null;
                const isActive = selectedMember && (conn.from === selectedMember || conn.to === selectedMember);
                const color = GROUP_COLORS[conn.groups[0]] || T.primary;
                return (
                  <line
                    key={`conn-${idx}`}
                    x1={fromPos.x} y1={fromPos.y}
                    x2={toPos.x} y2={toPos.y}
                    stroke={color}
                    strokeWidth={isActive ? 2.5 : 1}
                    strokeOpacity={selectedMember ? (isActive ? 0.8 : 0.05) : 0.25}
                    strokeDasharray={conn.strength > 1 ? 'none' : '4,3'}
                  />
                );
              })}

              {/* Lines from center hub to each node */}
              {graphMembers.map(member => {
                const pos = nodePositions[member.id];
                if (!pos) return null;
                return (
                  <line
                    key={`hub-${member.id}`}
                    x1={svgSize.width / 2} y1={svgSize.height / 2}
                    x2={pos.x} y2={pos.y}
                    stroke={T.border}
                    strokeWidth={0.5}
                    strokeOpacity={selectedMember ? (selectedMember === member.id ? 0.5 : 0.05) : 0.15}
                  />
                );
              })}

              {/* Member nodes */}
              {graphMembers.map(member => {
                const pos = nodePositions[member.id];
                if (!pos) return null;
                const isSelected = selectedMember === member.id;
                const isConnected = selectedMember && connections.some(c =>
                  (c.from === selectedMember && c.to === member.id) ||
                  (c.to === selectedMember && c.from === member.id)
                );
                const nodeOpacity = selectedMember ? (isSelected || isConnected ? 1 : 0.2) : 1;
                const nodeColor = member.currentGroups && member.currentGroups[0]
                  ? (GROUP_COLORS[member.currentGroups[0]] || T.primary) : T.primary;

                return (
                  <g key={member.id}
                    style={{ cursor: 'pointer', opacity: nodeOpacity, transition: 'opacity 0.3s ease' }}
                    onClick={() => setSelectedMember(isSelected ? null : member.id)}
                    onMouseEnter={() => setHoveredMember(member.id)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    {/* Glow ring for selected */}
                    {isSelected && (
                      <circle cx={pos.x} cy={pos.y} r="24" fill="none"
                        stroke={nodeColor} strokeWidth="2" strokeOpacity="0.5">
                        <animate attributeName="r" values="24;28;24" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="stroke-opacity" values="0.5;0.2;0.5" dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}

                    {/* Node circle */}
                    <circle cx={pos.x} cy={pos.y} r="18"
                      fill={isSelected ? nodeColor : T.bgCard}
                      stroke={nodeColor}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                    />

                    {/* Initials */}
                    <text x={pos.x} y={pos.y + 4}
                      textAnchor="middle" fill={isSelected ? T.black : nodeColor}
                      fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif">
                      {member.initials || member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </text>

                    {/* Name label on hover */}
                    {hoveredMember === member.id && (
                      <g>
                        <rect x={pos.x - 55} y={pos.y - 38} width="110" height="22" rx="4"
                          fill={T.bgCard} stroke={T.border} strokeWidth="1" />
                        <text x={pos.x} y={pos.y - 23}
                          textAnchor="middle" fill={T.text}
                          fontSize="9" fontWeight="500" fontFamily="Inter, sans-serif">
                          {member.name}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Selected member detail card */}
          {selectedMember && (() => {
            const member = graphMembers.find(m => m.id === selectedMember);
            if (!member) return null;
            const connectedMembers = graphMembers.filter(other =>
              other.id !== member.id && getSharedGroups(member, other).length > 0
            );
            return (
              <div style={{
                background: T.bgCard,
                border: `1px solid ${T.borderHover}`,
                borderRadius: '8px',
                padding: '16px',
                marginTop: '16px',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
              }}>
                <img src={member.avatar} alt={member.name}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', border: `2px solid ${T.primary}` }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ ...S.h3, fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>{member.name}</div>
                  <div style={{ fontSize: '12px', color: T.primary, marginBottom: '4px' }}>{member.work} — {member.location}</div>
                  {member.bio && <div style={{ fontSize: '11px', color: T.textBody, lineHeight: 1.5, marginBottom: '8px' }}>{member.bio}</div>}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    {member.currentGroups?.map((g, i) => (
                      <span key={i} style={{
                        padding: '2px 10px', borderRadius: '12px', fontSize: '10px', fontWeight: '600',
                        background: GROUP_COLORS[g] || T.primary, color: T.black,
                      }}>{g}</span>
                    ))}
                  </div>
                  <div style={{ fontSize: '11px', color: T.textMuted }}>
                    Connected with {connectedMembers.length} member{connectedMembers.length !== 1 ? 's' : ''}:&nbsp;
                    {connectedMembers.slice(0, 5).map(c => c.name.split(' ')[0]).join(', ')}
                    {connectedMembers.length > 5 && ` +${connectedMembers.length - 5} more`}
                  </div>
                </div>
                <button onClick={() => setSelectedMember(null)} style={{
                  background: 'none', border: `1px solid ${T.border}`, borderRadius: '4px',
                  color: T.textMuted, padding: '4px 10px', cursor: 'pointer', fontSize: '11px',
                }}>Close</button>
              </div>
            );
          })()}

          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <span style={{ fontSize: '10px', color: T.textMuted }}>
              Click a node to highlight connections • Solid lines = 2+ shared groups • Dashed = 1 shared group
            </span>
          </div>
        </div>
      </div>

      {/* ─── READING GROUP CARDS ─── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h3 style={{ ...S.h2, fontSize: '18px', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Reading Groups
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {allGroups.map((groupName) => {
            const groupMembers = getMembersInGroup(groupName);
            const isExpanded = expandedGroups[groupName];
            const groupColor = GROUP_COLORS[groupName] || T.primary;

            return (
              <Card
                key={groupName}
                hoverable
                onClick={() => toggleGroup(groupName)}
                style={{
                  cursor: 'pointer',
                  background: isExpanded ? T.bgCardHover : T.bgCard,
                  borderColor: groupMembers.length > 0 ? T.borderHover : T.border,
                  borderLeft: `3px solid ${groupColor}`,
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
                    color: groupColor,
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
                    gap: '6px',
                    flexWrap: 'wrap',
                    marginBottom: isExpanded ? '20px' : '0',
                  }}>
                    {groupMembers.slice(0, 6).map((member) => (
                      <div key={member.id} style={{ position: 'relative' }}>
                        <img src={member.avatar} alt={member.name}
                          style={{ width: '32px', height: '32px', borderRadius: '50%', border: `1px solid ${groupColor}` }}
                          onError={e => { e.target.style.display = 'none'; }}
                        />
                      </div>
                    ))}
                    {groupMembers.length > 6 && (
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: T.primaryFaint, border: `1px solid ${T.border}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '11px', fontWeight: '600', color: T.primary,
                      }}>
                        +{groupMembers.length - 6}
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
                    maxHeight: '300px',
                    overflowY: 'auto',
                  }}>
                    <div style={{ ...S.label, marginBottom: '12px' }}>Members in this group</div>
                    {groupMembers.map((member) => (
                      <div
                        key={member.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 0',
                          borderBottom: `1px solid ${T.borderLight}`,
                        }}
                      >
                        <img src={member.avatar} alt={member.name}
                          style={{ width: '28px', height: '28px', borderRadius: '50%', border: `1px solid ${groupColor}` }}
                          onError={e => { e.target.style.display = 'none'; }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ ...S.body, fontWeight: '500', fontSize: '13px' }}>
                            {member.name}
                          </div>
                          <div style={{ fontSize: '11px', color: T.textMuted }}>
                            {member.work} · {member.location}
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

      {/* ─── MEMBER CONNECTION CARDS ─── */}
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
            {members.slice(0, 24).map((member) => {
              const connectedMembers = members.filter(other =>
                other.id !== member.id && getSharedGroups(member, other).length > 0
              );

              return (
                <Card key={member.id} style={{ minHeight: '220px' }}>
                  {/* Member Header */}
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                    <img src={member.avatar} alt={member.name}
                      style={{ width: '40px', height: '40px', borderRadius: '50%', border: `2px solid ${T.primary}`, flexShrink: 0 }}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ ...S.h3, fontSize: '14px', fontWeight: '600' }}>{member.name}</div>
                      <div style={{ fontSize: '11px', color: T.textMuted }}>{member.work}</div>
                      <div style={{ fontSize: '11px', color: T.primary }}>{member.location}</div>
                    </div>
                  </div>

                  {/* Groups */}
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ ...S.label, marginBottom: '6px' }}>In {member.currentGroups?.length || 0} Groups</div>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {member.currentGroups?.map((group, idx) => (
                        <span key={idx} style={{
                          fontSize: '9px', padding: '2px 8px', borderRadius: '10px', fontWeight: '600',
                          background: GROUP_COLORS[group] || T.primaryFaint, color: T.black,
                        }}>
                          {group}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Connected Members */}
                  <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: '10px' }}>
                    <div style={{ ...S.label, marginBottom: '6px' }}>
                      Connected with {connectedMembers.length}
                    </div>
                    {connectedMembers.length > 0 ? (
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {connectedMembers.slice(0, 5).map((connected) => (
                          <img key={connected.id} src={connected.avatar} alt={connected.name}
                            style={{ width: '24px', height: '24px', borderRadius: '50%', border: `1px solid ${T.border}` }}
                            onError={e => { e.target.style.display = 'none'; }}
                          />
                        ))}
                        {connectedMembers.length > 5 && (
                          <div style={{
                            width: '24px', height: '24px', borderRadius: '50%',
                            background: T.primaryFaint, border: `1px solid ${T.border}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '9px', fontWeight: '600', color: T.primary,
                          }}>
                            +{connectedMembers.length - 5}
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
    </div>
  );
}

// ─── Shared stat card styles ───
const statCard = {
  background: T.bgCard,
  border: `1px solid ${T.border}`,
  borderRadius: '8px',
  padding: '16px',
  textAlign: 'center',
};
const statNum = {
  fontSize: '28px',
  fontWeight: '700',
  color: T.primary,
  marginBottom: '4px',
};
const statLabel = {
  ...S.label,
  opacity: 0.7,
  fontSize: '11px',
};