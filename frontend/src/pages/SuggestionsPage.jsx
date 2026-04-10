import React, { useState, useEffect } from 'react';
import { T } from '../theme';
import { S } from '../styles';
import { Avatar, Button, Tag, Card, Modal } from '../components/UI';
import Icon from '../components/Icons';
import { api } from '../api';

const MOCK_SUGGESTIONS = [
  {
    id: 1,
    title: "Add a monthly virtual book club meetup",
    description: "Organize monthly virtual meetings where members can discuss selected books. Could include author Q&A sessions and book recommendations.",
    author: { id: 1, name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?img=1" },
    createdAt: "2026-03-28",
    votes: 24,
    hasVoted: false,
    comments: 8,
    status: "Open",
    category: "Events"
  },
  {
    id: 2,
    title: "Chapter discussion guides",
    description: "Create downloadable discussion guides for each chapter of featured books. Include thought-provoking questions and themes to explore.",
    author: { id: 2, name: "Marcus Johnson", avatar: "https://i.pravatar.cc/150?img=2" },
    createdAt: "2026-03-25",
    votes: 18,
    hasVoted: false,
    comments: 5,
    status: "In Progress",
    category: "Resources"
  },
  {
    id: 3,
    title: "Local meetup coordination",
    description: "Add a feature to help coordinate in-person meetups in different cities. Include location-based groups and event scheduling.",
    author: { id: 3, name: "Emma Rodriguez", avatar: "https://i.pravatar.cc/150?img=3" },
    createdAt: "2026-03-20",
    votes: 32,
    hasVoted: false,
    comments: 12,
    status: "Open",
    category: "Features"
  },
  {
    id: 4,
    title: "Reading challenge tracker",
    description: "Gamify reading with challenges like 'read 12 books in a year' or 'explore 3 different genres.' Track progress and earn badges.",
    author: { id: 4, name: "David Kim", avatar: "https://i.pravatar.cc/150?img=4" },
    createdAt: "2026-03-15",
    votes: 28,
    hasVoted: true,
    comments: 9,
    status: "In Progress",
    category: "Gamification"
  },
  {
    id: 5,
    title: "Integrated book recommendations feed",
    description: "Personalized feed showing book recommendations from members you follow. Include filtering by genre, rating, and read status.",
    author: { id: 5, name: "Lisa Wang", avatar: "https://i.pravatar.cc/150?img=5" },
    createdAt: "2026-03-10",
    votes: 15,
    hasVoted: false,
    comments: 6,
    status: "Implemented",
    category: "Features"
  }
];

const STATUS_COLORS = {
  'Open': T.warning,
  'In Progress': '#7B68EE',
  'Implemented': T.success
};

export function SuggestionsPage({ members }) {
  const [suggestions, setSuggestions] = useState([]);
  const [sortBy, setSortBy] = useState('votes');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newSuggestion, setNewSuggestion] = useState({
    title: '',
    description: '',
    category: 'Features'
  });

  useEffect(() => {
    loadSuggestions();
  }, []);

  const loadSuggestions = async () => {
    try {
      setLoading(true);
      const data = await api.getSuggestions();
      setSuggestions(data || MOCK_SUGGESTIONS);
    } catch (error) {
      console.error('Failed to load suggestions:', error);
      setSuggestions(MOCK_SUGGESTIONS);
    } finally {
      setLoading(false);
    }
  };

  const getSortedSuggestions = () => {
    const sorted = [...suggestions];
    switch (sortBy) {
      case 'votes':
        return sorted.sort((a, b) => b.votes - a.votes);
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'discussed':
        return sorted.sort((a, b) => b.comments - a.comments);
      default:
        return sorted;
    }
  };

  const handleVote = (suggestionId) => {
    setSuggestions(suggestions.map(s => {
      if (s.id === suggestionId) {
        return {
          ...s,
          votes: s.hasVoted ? s.votes - 1 : s.votes + 1,
          hasVoted: !s.hasVoted
        };
      }
      return s;
    }));
  };

  const handleSubmitSuggestion = () => {
    if (!newSuggestion.title.trim() || !newSuggestion.description.trim()) {
      return;
    }

    const suggestion = {
      id: suggestions.length + 1,
      title: newSuggestion.title,
      description: newSuggestion.description,
      author: members?.[0] || { id: 0, name: "You", avatar: "https://i.pravatar.cc/150?img=0" },
      createdAt: new Date().toISOString().split('T')[0],
      votes: 0,
      hasVoted: false,
      comments: 0,
      status: "Open",
      category: newSuggestion.category
    };

    setSuggestions([suggestion, ...suggestions]);
    setNewSuggestion({ title: '', description: '', category: 'Features' });
    setShowModal(false);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const daysAgo = Math.floor((today - date) / (1000 * 60 * 60 * 24));

    if (daysAgo === 0) return 'Today';
    if (daysAgo === 1) return 'Yesterday';
    if (daysAgo < 7) return `${daysAgo} days ago`;
    if (daysAgo < 30) return `${Math.floor(daysAgo / 7)} weeks ago`;
    return `${Math.floor(daysAgo / 30)} months ago`;
  };

  const sortedSuggestions = getSortedSuggestions();

  return (
    <div style={{ backgroundColor: T.bg, minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ color: T.text, fontSize: '32px', fontWeight: '700', margin: '0 0 8px 0' }}>
              Community Ideas
            </h1>
            <p style={{ color: T.textMuted, fontSize: '14px', margin: '0' }}>
              Share and vote on ideas to shape our community
            </p>
          </div>
          <Button
            onClick={() => setShowModal(true)}
            style={{
              backgroundColor: T.primary,
              color: T.bg,
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            Share an Idea
          </Button>
        </div>

        {/* Sort Options */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <span style={{ color: T.textMuted, fontSize: '13px', lineHeight: '36px' }}>Sort by:</span>
          {['votes', 'newest', 'discussed'].map(option => (
            <button
              key={option}
              onClick={() => setSortBy(option)}
              style={{
                backgroundColor: sortBy === option ? T.primary : T.bgCard,
                color: sortBy === option ? T.bg : T.text,
                border: sortBy === option ? 'none' : `1px solid ${T.bgCard}`,
                padding: '10px 16px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {option === 'votes' && 'Most Votes'}
              {option === 'newest' && 'Newest'}
              {option === 'discussed' && 'Most Discussed'}
            </button>
          ))}
        </div>

        {/* Suggestions List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: T.textMuted }}>
              Loading suggestions...
            </div>
          ) : sortedSuggestions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: T.textMuted }}>
              No suggestions yet. Be the first to share an idea!
            </div>
          ) : (
            sortedSuggestions.map(suggestion => (
              <Card
                key={suggestion.id}
                style={{
                  backgroundColor: T.bgCard,
                  padding: '20px',
                  borderRadius: '8px',
                  display: 'flex',
                  gap: '16px',
                  border: `1px solid ${T.bgCard}`,
                  transition: 'border-color 0.2s ease'
                }}
              >
                {/* Vote Section */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  minWidth: '60px'
                }}>
                  <button
                    onClick={() => handleVote(suggestion.id)}
                    style={{
                      backgroundColor: 'transparent',
                      border: `2px solid ${suggestion.hasVoted ? T.primary : T.textMuted}`,
                      color: suggestion.hasVoted ? T.primary : T.textMuted,
                      width: '40px',
                      height: '40px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    ★
                  </button>
                  <span style={{
                    color: T.text,
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    {suggestion.votes}
                  </span>
                </div>

                {/* Content Section */}
                <div style={{ flex: 1 }}>
                  {/* Title and Description */}
                  <div style={{ marginBottom: '12px' }}>
                    <h3 style={{
                      color: T.text,
                      fontSize: '16px',
                      fontWeight: '600',
                      margin: '0 0 6px 0'
                    }}>
                      {suggestion.title}
                    </h3>
                    <p style={{
                      color: T.textMuted,
                      fontSize: '14px',
                      margin: '0',
                      lineHeight: '1.5'
                    }}>
                      {suggestion.description}
                    </p>
                  </div>

                  {/* Author and Meta */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px',
                    fontSize: '13px'
                  }}>
                    <Avatar
                      src={suggestion.author.avatar}
                      size={24}
                      style={{ borderRadius: '4px' }}
                    />
                    <span style={{ color: T.text, fontWeight: '500' }}>
                      {suggestion.author.name}
                    </span>
                    <span style={{ color: T.textMuted }}>•</span>
                    <span style={{ color: T.textMuted }}>
                      {formatDate(suggestion.createdAt)}
                    </span>
                  </div>

                  {/* Tags and Actions */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    flexWrap: 'wrap'
                  }}>
                    <Tag
                      label={suggestion.category}
                      style={{
                        backgroundColor: T.bgCard,
                        color: T.textMuted,
                        padding: '4px 10px',
                        fontSize: '12px',
                        borderRadius: '4px'
                      }}
                    />
                    <Tag
                      label={suggestion.status}
                      style={{
                        backgroundColor: `${STATUS_COLORS[suggestion.status]}20`,
                        color: STATUS_COLORS[suggestion.status],
                        padding: '4px 10px',
                        fontSize: '12px',
                        borderRadius: '4px',
                        fontWeight: '500'
                      }}
                    />
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: T.textMuted, fontSize: '13px' }}>
                        💬 {suggestion.comments}
                      </span>
                      <Button
                        style={{
                          backgroundColor: 'transparent',
                          color: T.primary,
                          border: `1px solid ${T.primary}`,
                          padding: '6px 14px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        Discuss
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* New Suggestion Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        style={{
          backgroundColor: T.bgCard,
          borderRadius: '8px',
          padding: '32px',
          maxWidth: '500px',
          maxHeight: '90vh',
          overflow: 'auto'
        }}
      >
        <h2 style={{
          color: T.text,
          fontSize: '20px',
          fontWeight: '700',
          margin: '0 0 24px 0'
        }}>
          Share Your Idea
        </h2>

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            color: T.text,
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '8px'
          }}>
            Idea Title
          </label>
          <input
            type="text"
            value={newSuggestion.title}
            onChange={(e) => setNewSuggestion({ ...newSuggestion, title: e.target.value })}
            placeholder="What's your idea?"
            style={{
              width: '100%',
              padding: '10px 12px',
              backgroundColor: T.bg,
              border: `1px solid ${T.bgCard}`,
              borderRadius: '6px',
              color: T.text,
              fontSize: '14px',
              boxSizing: 'border-box',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            color: T.text,
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '8px'
          }}>
            Description
          </label>
          <textarea
            value={newSuggestion.description}
            onChange={(e) => setNewSuggestion({ ...newSuggestion, description: e.target.value })}
            placeholder="Provide more details about your idea..."
            style={{
              width: '100%',
              padding: '10px 12px',
              backgroundColor: T.bg,
              border: `1px solid ${T.bgCard}`,
              borderRadius: '6px',
              color: T.text,
              fontSize: '14px',
              fontFamily: 'inherit',
              minHeight: '100px',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            color: T.text,
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '8px'
          }}>
            Category
          </label>
          <select
            value={newSuggestion.category}
            onChange={(e) => setNewSuggestion({ ...newSuggestion, category: e.target.value })}
            style={{
              width: '100%',
              padding: '10px 12px',
              backgroundColor: T.bg,
              border: `1px solid ${T.bgCard}`,
              borderRadius: '6px',
              color: T.text,
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          >
            <option value="Features">Features</option>
            <option value="Events">Events</option>
            <option value="Resources">Resources</option>
            <option value="Gamification">Gamification</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <Button
            onClick={() => setShowModal(false)}
            style={{
              backgroundColor: 'transparent',
              color: T.text,
              border: `1px solid ${T.bgCard}`,
              padding: '10px 20px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitSuggestion}
            disabled={!newSuggestion.title.trim() || !newSuggestion.description.trim()}
            style={{
              backgroundColor: newSuggestion.title.trim() && newSuggestion.description.trim() ? T.primary : T.textMuted,
              color: T.bg,
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: newSuggestion.title.trim() && newSuggestion.description.trim() ? 'pointer' : 'not-allowed',
              opacity: newSuggestion.title.trim() && newSuggestion.description.trim() ? 1 : 0.5,
              transition: 'all 0.2s ease'
            }}
          >
            Submit Idea
          </Button>
        </div>
      </Modal>
    </div>
  );
}
