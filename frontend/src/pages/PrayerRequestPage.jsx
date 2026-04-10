import React, { useState, useEffect } from 'react';
import { T } from '../theme';
import { S } from '../styles';
import { Avatar, Button, Tag, Card, Modal, TabBar } from '../components/UI';
import Icon from '../components/Icons';
import { api } from '../api';
import { PRAYER_CATS } from '../constants';

const mockReflections = [
  {
    id: 1,
    author: 'Nikki',
    avatar: 'https://via.placeholder.com/40?text=NK',
    date: '2 days ago',
    category: 'Healing',
    title: 'Strength in Stillness',
    body: 'Today I found peace in the quiet moments. The stillness allowed me to hear the whispers of hope within my heart. Grateful for the strength that comes from resting in faith.',
    prayers: 12,
    hasPrayed: false,
  },
  {
    id: 2,
    author: 'Sierra',
    avatar: 'https://via.placeholder.com/40?text=SI',
    date: '1 week ago',
    category: 'Growth',
    title: 'New Beginnings',
    body: 'This season has taught me so much about resilience. Every challenge is an opportunity to grow closer to God and to myself. I am becoming the woman I was meant to be.',
    prayers: 18,
    hasPrayed: false,
  },
  {
    id: 3,
    author: 'Destiny',
    avatar: 'https://via.placeholder.com/40?text=DE',
    date: '3 days ago',
    category: 'Gratitude',
    title: 'Blessings Overflow',
    body: 'Counting the small blessings today: warm coffee, a child\'s laughter, the presence of community. These simple moments are where God\'s love truly shines. I am overflowing with thankfulness.',
    prayers: 8,
    hasPrayed: false,
  },
  {
    id: 4,
    author: 'Gloria',
    avatar: 'https://via.placeholder.com/40?text=GL',
    date: '5 days ago',
    category: 'Prayer Request',
    title: 'Prayers for Wisdom',
    body: 'Seeking prayers for clarity as I navigate important decisions ahead. I trust in God\'s guidance and the support of this beautiful community. Thank you for holding me in your hearts.',
    prayers: 24,
    hasPrayed: false,
  },
  {
    id: 5,
    author: 'Nikki',
    avatar: 'https://via.placeholder.com/40?text=NK',
    date: '1 week ago',
    category: 'Healing',
    title: 'Walking Forward',
    body: 'The journey of healing is not linear, but I am learning to celebrate every step. Some days are harder than others, but I am reminded that I am never alone in this walk.',
    prayers: 15,
    hasPrayed: false,
  },
];

export default function PrayerRequestPage({ members }) {
  const [reflections, setReflections] = useState([]);
  const [filteredReflections, setFilteredReflections] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    category: PRAYER_CATS[0] || 'Prayer Request',
    title: '',
    body: '',
  });

  // Fetch reflections on mount
  useEffect(() => {
    const fetchReflections = async () => {
      try {
        const data = await api.getPrayers();
        setReflections(data);
      } catch (error) {
        console.log('Using mock data');
        setReflections(mockReflections);
      } finally {
        setLoading(false);
      }
    };
    fetchReflections();
  }, []);

  // Filter reflections by active tab
  useEffect(() => {
    if (activeTab === 'All') {
      setFilteredReflections(reflections);
    } else {
      setFilteredReflections(
        reflections.filter((r) => r.category === activeTab)
      );
    }
  }, [reflections, activeTab]);

  const handleSubmitReflection = () => {
    if (formData.title.trim() && formData.body.trim()) {
      const newReflection = {
        id: reflections.length + 1,
        author: members?.[0]?.name || 'Anonymous',
        avatar: members?.[0]?.avatar || 'https://via.placeholder.com/40?text=ME',
        date: 'now',
        category: formData.category,
        title: formData.title,
        body: formData.body,
        prayers: 0,
        hasPrayed: false,
      };
      setReflections([newReflection, ...reflections]);
      setFormData({
        category: PRAYER_CATS[0] || 'Prayer Request',
        title: '',
        body: '',
      });
      setShowModal(false);
    }
  };

  const handlePray = (id) => {
    setReflections(
      reflections.map((r) =>
        r.id === id
          ? { ...r, prayers: r.prayers + (r.hasPrayed ? -1 : 1), hasPrayed: !r.hasPrayed }
          : r
      )
    );
  };

  const tabs = ['All', ...PRAYER_CATS];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: T.bg,
        color: T.text,
        padding: '20px',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
        }}
      >
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 600,
            margin: 0,
            color: T.text,
          }}
        >
          Reflections & Prayers
        </h1>
        <Button
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: T.primary,
            color: T.bg,
            padding: '12px 24px',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = T.primaryLight)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = T.primary)}
        >
          + Share a Reflection
        </Button>
      </div>

      {/* Tab Filters */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '30px',
          flexWrap: 'wrap',
          paddingBottom: '15px',
          borderBottom: `1px solid ${T.bgCard}`,
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 16px',
              backgroundColor: activeTab === tab ? T.primary : 'transparent',
              color: activeTab === tab ? T.bg : T.text,
              border: `1px solid ${activeTab === tab ? T.primary : T.bgCard}`,
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab) {
                e.target.style.borderColor = T.primary;
                e.target.style.color = T.primary;
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab) {
                e.target.style.borderColor = T.bgCard;
                e.target.style.color = T.text;
              }
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Reflections List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <p style={{ fontSize: '14px', color: T.text }}>Loading reflections...</p>
        </div>
      ) : filteredReflections.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <p style={{ fontSize: '14px', color: T.text }}>
            No reflections in this category yet. Be the first to share!
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredReflections.map((reflection) => (
            <Card
              key={reflection.id}
              style={{
                backgroundColor: T.bgCard,
                border: `1px solid ${T.bgCard}`,
                borderRadius: '8px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1F1F1F';
                e.currentTarget.style.borderColor = T.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = T.bgCard;
                e.currentTarget.style.borderColor = T.bgCard;
              }}
              onClick={() =>
                setExpandedId(expandedId === reflection.id ? null : reflection.id)
              }
            >
              {/* Card Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                }}
              >
                <Avatar
                  src={reflection.avatar}
                  alt={reflection.author}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      margin: '0 0 4px 0',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: T.text,
                    }}
                  >
                    {reflection.author}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '12px',
                      color: T.text,
                      opacity: 0.6,
                    }}
                  >
                    {reflection.date}
                  </p>
                </div>
                <Tag
                  style={{
                    backgroundColor: T.primaryLight,
                    color: T.bg,
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {reflection.category}
                </Tag>
              </div>

              {/* Title */}
              <h3
                style={{
                  margin: '0 0 8px 0',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: T.text,
                  fontFamily: T.fontAccent,
                  lineHeight: 1.3,
                }}
              >
                {reflection.title}
              </h3>

              {/* Body Text (Truncated or Full) */}
              <p
                style={{
                  margin: '0 0 16px 0',
                  fontSize: '14px',
                  lineHeight: 1.5,
                  color: T.text,
                  opacity: 0.85,
                  fontFamily: T.fontAccent,
                  maxHeight: expandedId === reflection.id ? 'none' : '60px',
                  overflow: 'hidden',
                  textOverflow: expandedId === reflection.id ? 'clip' : 'ellipsis',
                  display: expandedId === reflection.id ? 'block' : '-webkit-box',
                  WebkitLineClamp: expandedId === reflection.id ? 'unset' : 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {reflection.body}
              </p>

              {/* Pray Button */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePray(reflection.id);
                }}
              >
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    backgroundColor: reflection.hasPrayed ? T.primaryLight : 'transparent',
                    color: reflection.hasPrayed ? T.bg : T.text,
                    border: `1px solid ${reflection.hasPrayed ? T.primaryLight : T.bgCard}`,
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!reflection.hasPrayed) {
                      e.currentTarget.style.borderColor = T.primary;
                      e.currentTarget.style.color = T.primary;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!reflection.hasPrayed) {
                      e.currentTarget.style.borderColor = T.bgCard;
                      e.currentTarget.style.color = T.text;
                    }
                  }}
                >
                  <Icon name="heart" size={16} />
                  Pray for this
                </button>
                <span
                  style={{
                    fontSize: '13px',
                    color: T.text,
                    opacity: 0.7,
                  }}
                >
                  {reflection.prayers}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal for Creating Reflection */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        style={{
          backgroundColor: T.bgCard,
          color: T.text,
          padding: '30px',
          borderRadius: '8px',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <h2
          style={{
            margin: '0 0 20px 0',
            fontSize: '24px',
            fontWeight: 600,
            color: T.text,
          }}
        >
          Share Your Reflection
        </h2>

        {/* Category Select */}
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: T.text,
            }}
          >
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            style={{
              width: '100%',
              padding: '10px 12px',
              backgroundColor: T.bg,
              color: T.text,
              border: `1px solid ${T.bgCard}`,
              borderRadius: '6px',
              fontSize: '14px',
              fontFamily: 'inherit',
              cursor: 'pointer',
            }}
          >
            {PRAYER_CATS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Title Input */}
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: T.text,
            }}
          >
            Title
          </label>
          <input
            type="text"
            placeholder="Give your reflection a meaningful title..."
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            style={{
              width: '100%',
              padding: '10px 12px',
              backgroundColor: T.bg,
              color: T.text,
              border: `1px solid ${T.bgCard}`,
              borderRadius: '6px',
              fontSize: '14px',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
              outline: 'none',
            }}
            onFocus={(e) => (e.target.style.borderColor = T.primary)}
            onBlur={(e) => (e.target.style.borderColor = T.bgCard)}
          />
        </div>

        {/* Body Textarea */}
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: T.text,
            }}
          >
            Your Reflection
          </label>
          <textarea
            placeholder="Share your prayer, healing moment, or spiritual insight..."
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            style={{
              width: '100%',
              minHeight: '150px',
              padding: '12px',
              backgroundColor: T.bg,
              color: T.text,
              border: `1px solid ${T.bgCard}`,
              borderRadius: '6px',
              fontSize: '14px',
              fontFamily: T.fontAccent,
              boxSizing: 'border-box',
              resize: 'vertical',
              outline: 'none',
            }}
            onFocus={(e) => (e.target.style.borderColor = T.primary)}
            onBlur={(e) => (e.target.style.borderColor = T.bgCard)}
          />
        </div>

        {/* Button Group */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={() => setShowModal(false)}
            style={{
              padding: '10px 20px',
              backgroundColor: 'transparent',
              color: T.text,
              border: `1px solid ${T.bgCard}`,
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = T.text;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = T.bgCard;
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitReflection}
            style={{
              padding: '10px 20px',
              backgroundColor: T.primary,
              color: T.bg,
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = T.primaryLight)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = T.primary)}
          >
            Share Reflection
          </button>
        </div>
      </Modal>
    </div>
  );
}
