import React, { useState, useEffect } from 'react';
import { T } from '../theme';
import { S } from '../styles';
import { Avatar, Button, Tag, Card, Modal, TabBar } from '../components/UI';
import Icon from '../components/Icons';
import { api } from '../api';
import { NEED_HELP_OPTS } from '../constants';

const mockPosts = [
  {
    id: 1,
    posterId: 'user1',
    posterName: 'Sarah',
    posterAvatar: 'https://via.placeholder.com/40?text=S',
    type: 'seeking',
    title: 'Need prayer partner for Chapter 3 deep dive',
    description: 'Looking for someone to join weekly prayer sessions while we go through Chapter 3 of the book. Preferably evenings or weekends.',
    category: ['Prayer', 'Study'],
    date: '2 days ago',
    responseCount: 3,
  },
  {
    id: 2,
    posterId: 'user2',
    posterName: 'Marcus',
    posterAvatar: 'https://via.placeholder.com/40?text=M',
    type: 'offering',
    title: 'Offering rides to Baton Rouge book meetup',
    description: 'I have space for 2-3 people in my car for the upcoming book meetup in Baton Rouge next Saturday. Happy to help with transportation!',
    category: ['Transportation', 'Meetup'],
    date: '1 day ago',
    responseCount: 5,
  },
  {
    id: 3,
    posterId: 'user3',
    posterName: 'Jennifer',
    posterAvatar: 'https://via.placeholder.com/40?text=J',
    type: 'seeking',
    title: 'Help with hosting a local chapter meeting',
    description: 'Our small group is growing and we need advice on organizing a regular meeting space and agenda. Any tips from experienced hosts?',
    category: ['Leadership', 'Organization'],
    date: '5 days ago',
    responseCount: 2,
  },
  {
    id: 4,
    posterId: 'user4',
    posterName: 'David',
    posterAvatar: 'https://via.placeholder.com/40?text=D',
    type: 'offering',
    title: 'Offering free editing for community announcements',
    description: 'I work as a professional editor and would love to help polish any newsletters, announcements, or promotional materials for the community.',
    category: ['Writing', 'Admin'],
    date: '1 week ago',
    responseCount: 1,
  },
  {
    id: 5,
    posterId: 'user5',
    posterName: 'Lisa',
    posterAvatar: 'https://via.placeholder.com/40?text=L',
    type: 'seeking',
    title: 'Accountability buddy for daily reading goal',
    description: 'Want to stay accountable to reading one chapter daily. Looking for someone to check in with each evening. Must be willing to share progress!',
    category: ['Reading', 'Accountability'],
    date: '3 days ago',
    responseCount: 4,
  },
];

const ConnectionsPage = ({ members }) => {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    type: 'seeking',
    title: '',
    description: '',
    categories: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const data = await api.getConnections();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching connections:', error);
      setPosts(mockPosts);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (activeTab === 'offering') return post.type === 'offering';
    if (activeTab === 'seeking') return post.type === 'seeking';
    return true;
  });

  const handleCreatePost = () => {
    if (formData.title && formData.description && formData.categories.length > 0) {
      const newPost = {
        id: posts.length + 1,
        posterId: 'currentUser',
        posterName: 'You',
        posterAvatar: 'https://via.placeholder.com/40?text=U',
        type: formData.type,
        title: formData.title,
        description: formData.description,
        category: formData.categories,
        date: 'just now',
        responseCount: 0,
      };
      setPosts([newPost, ...posts]);
      setFormData({ type: 'seeking', title: '', description: '', categories: [] });
      setShowModal(false);
    }
  };

  const handleCategoryToggle = (category) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const getPostColor = (type) => {
    return type === 'offering' ? T.success : T.warning;
  };

  const getPostLabel = (type) => {
    return type === 'offering' ? 'Offering Help' : 'Seeking Help';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: T.bg, padding: '24px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
        }}
      >
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: T.text, margin: 0 }}>
          Community Support
        </h1>
        <Button
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: T.primary,
            color: T.bg,
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
          }}
        >
          Post a Need
        </Button>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: '24px' }}>
        <TabBar
          tabs={[
            { id: 'all', label: 'All Needs', count: posts.length },
            { id: 'offering', label: 'Offering Help', count: posts.filter((p) => p.type === 'offering').length },
            { id: 'seeking', label: 'Seeking Help', count: posts.filter((p) => p.type === 'seeking').length },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          style={{
            display: 'flex',
            gap: '8px',
            borderBottom: `1px solid rgba(201,166,136,0.2)`,
            paddingBottom: '12px',
          }}
          tabStyle={(isActive) => ({
            padding: '8px 16px',
            borderRadius: '6px',
            backgroundColor: isActive ? T.primary : 'transparent',
            color: isActive ? T.bg : T.textMuted,
            border: 'none',
            cursor: 'pointer',
            fontWeight: isActive ? '600' : '500',
            fontSize: '14px',
            transition: 'all 0.2s ease',
          })}
        />
      </div>

      {/* Posts List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {loading ? (
          <div style={{ color: T.textMuted, textAlign: 'center', padding: '40px' }}>
            Loading connections...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div style={{ color: T.textMuted, textAlign: 'center', padding: '40px' }}>
            No posts found in this category.
          </div>
        ) : (
          filteredPosts.map((post) => (
            <Card
              key={post.id}
              style={{
                backgroundColor: T.bgCard,
                border: `1px solid rgba(201,166,136,0.15)`,
                borderRadius: '12px',
                padding: '20px',
                transition: 'all 0.2s ease',
              }}
            >
              {/* Post Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '16px',
                }}
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flex: 1 }}>
                  <Avatar
                    src={post.posterAvatar}
                    alt={post.posterName}
                    size={40}
                    style={{ borderRadius: '50%', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ color: T.text, fontWeight: '600', fontSize: '14px' }}>
                        {post.posterName}
                      </span>
                      <span style={{ color: T.textMuted, fontSize: '12px' }}>{post.date}</span>
                    </div>
                    <Tag
                      label={getPostLabel(post.type)}
                      style={{
                        backgroundColor: getPostColor(post.type),
                        color: T.bg,
                        padding: '4px 12px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'inline-block',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Post Title & Description */}
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ color: T.text, fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0' }}>
                  {post.title}
                </h3>
                <p style={{ color: T.textMuted, fontSize: '14px', margin: '0', lineHeight: '1.5' }}>
                  {post.description}
                </p>
              </div>

              {/* Category Tags */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {post.category.map((cat) => (
                  <Tag
                    key={cat}
                    label={cat}
                    style={{
                      backgroundColor: `rgba(201,166,136,0.15)`,
                      color: T.primary,
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                    }}
                  />
                ))}
              </div>

              {/* Action Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Button
                  onClick={() => {}}
                  style={{
                    backgroundColor: T.primary,
                    color: T.bg,
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '13px',
                  }}
                >
                  {post.type === 'offering' ? 'Respond' : 'I Can Help'}
                </Button>
                <span style={{ color: T.textMuted, fontSize: '13px' }}>
                  {post.responseCount} response{post.responseCount !== 1 ? 's' : ''}
                </span>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Modal for Creating New Post */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        style={{
          backgroundColor: T.bgCard,
          borderRadius: '12px',
          border: `1px solid rgba(201,166,136,0.2)`,
          padding: '24px',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <h2 style={{ color: T.text, fontSize: '20px', fontWeight: '700', margin: '0 0 20px 0' }}>
          Post a Need
        </h2>

        {/* Type Select */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: T.text, fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
            Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            style={{
              width: '100%',
              backgroundColor: T.bg,
              color: T.text,
              border: `1px solid rgba(201,166,136,0.2)`,
              borderRadius: '6px',
              padding: '10px',
              fontSize: '14px',
            }}
          >
            <option value="seeking">Seeking Help</option>
            <option value="offering">Offering Help</option>
          </select>
        </div>

        {/* Title Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: T.text, fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="What do you need help with?"
            style={{
              width: '100%',
              backgroundColor: T.bg,
              color: T.text,
              border: `1px solid rgba(201,166,136,0.2)`,
              borderRadius: '6px',
              padding: '10px',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Description Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: T.text, fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Tell us more details..."
            style={{
              width: '100%',
              backgroundColor: T.bg,
              color: T.text,
              border: `1px solid rgba(201,166,136,0.2)`,
              borderRadius: '6px',
              padding: '10px',
              fontSize: '14px',
              minHeight: '100px',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Category Multi-Select */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: T.text, fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
            Categories
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Prayer', 'Study', 'Transportation', 'Leadership', 'Writing', 'Reading', 'Accountability', 'Organization', 'Admin', 'Meetup'].map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                style={{
                  backgroundColor: formData.categories.includes(category)
                    ? T.primary
                    : `rgba(201,166,136,0.1)`,
                  color: formData.categories.includes(category) ? T.bg : T.primary,
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: `1px solid ${formData.categories.includes(category) ? T.primary : 'rgba(201,166,136,0.2)'}`,
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <Button
            onClick={() => setShowModal(false)}
            style={{
              backgroundColor: 'transparent',
              color: T.primary,
              padding: '10px 20px',
              borderRadius: '6px',
              border: `1px solid rgba(201,166,136,0.3)`,
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreatePost}
            style={{
              backgroundColor: T.primary,
              color: T.bg,
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
            }}
          >
            Post
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ConnectionsPage;
