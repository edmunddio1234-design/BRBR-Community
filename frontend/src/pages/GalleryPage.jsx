import React, { useState, useEffect } from 'react';
import { T } from '../theme';
import { S } from '../styles';
import { Avatar, Button, Tag, Card, Modal, TabBar } from '../components/UI';
import Icon from '../components/Icons';
import { api } from '../api';
import { GALLERY_CATS } from '../constants';

const MOCK_GALLERY = [
  {
    id: 1,
    category: 'books',
    caption: 'Our April book discussion was amazing!',
    author: { name: 'Sarah Chen', avatar: 'SC' },
    date: '2026-04-07',
    likes: 24,
    comments: 5,
    gradient: 'linear-gradient(135deg, #C9A688 0%, #D4A0A0 100%)',
  },
  {
    id: 2,
    category: 'events',
    caption: 'Community meetup at the park',
    author: { name: 'Marcus Johnson', avatar: 'MJ' },
    date: '2026-04-05',
    likes: 18,
    comments: 3,
    gradient: 'linear-gradient(135deg, #B5653A 0%, #C9A688 100%)',
  },
  {
    id: 3,
    category: 'creative',
    caption: 'Inspired by our latest read',
    author: { name: 'Alex Rivera', avatar: 'AR' },
    date: '2026-04-03',
    likes: 32,
    comments: 8,
    gradient: 'linear-gradient(135deg, #D4A0A0 0%, #B5653A 100%)',
  },
  {
    id: 4,
    category: 'books',
    caption: 'New arrivals in the community library',
    author: { name: 'Emma Wilson', avatar: 'EW' },
    date: '2026-03-31',
    likes: 15,
    comments: 2,
    gradient: 'linear-gradient(135deg, #8B4513 0%, #C9A688 100%)',
  },
  {
    id: 5,
    category: 'events',
    caption: 'Book signing event with local author',
    author: { name: 'James Lee', avatar: 'JL' },
    date: '2026-03-28',
    likes: 41,
    comments: 12,
    gradient: 'linear-gradient(135deg, #A0522D 0%, #D4A0A0 100%)',
  },
  {
    id: 6,
    category: 'creative',
    caption: 'My illustration of a key character',
    author: { name: 'Sophia Garcia', avatar: 'SG' },
    date: '2026-03-25',
    likes: 28,
    comments: 7,
    gradient: 'linear-gradient(135deg, #CD853F 0%, #B5653A 100%)',
  },
  {
    id: 7,
    category: 'books',
    caption: 'Reading corner setup inspiration',
    author: { name: 'David Kim', avatar: 'DK' },
    date: '2026-03-22',
    likes: 22,
    comments: 4,
    gradient: 'linear-gradient(135deg, #D2B48C 0%, #C9A688 100%)',
  },
  {
    id: 8,
    category: 'events',
    caption: 'Potluck dinner before the discussion',
    author: { name: 'Lisa Zhang', avatar: 'LZ' },
    date: '2026-03-20',
    likes: 19,
    comments: 6,
    gradient: 'linear-gradient(135deg, #B5653A 0%, #A0522D 100%)',
  },
];

const GRADIENTS = [
  'linear-gradient(135deg, #C9A688 0%, #D4A0A0 100%)',
  'linear-gradient(135deg, #B5653A 0%, #C9A688 100%)',
  'linear-gradient(135deg, #D4A0A0 0%, #B5653A 100%)',
  'linear-gradient(135deg, #8B4513 0%, #C9A688 100%)',
  'linear-gradient(135deg, #A0522D 0%, #D4A0A0 100%)',
  'linear-gradient(135deg, #CD853F 0%, #B5653A 100%)',
  'linear-gradient(135deg, #D2B48C 0%, #C9A688 100%)',
  'linear-gradient(135deg, #B5653A 0%, #A0522D 100%)',
];

// Normalize backend gallery data to match frontend shape
const normalizeGalleryItem = (item, index) => ({
  id: item.id,
  category: item.category || 'creative',
  caption: item.caption || '',
  author: item.author || {
    name: item.name || 'Anonymous',
    avatar: item.avatar || (item.name ? item.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '??'),
  },
  date: item.date || (item.created_at ? item.created_at.split('T')[0] : new Date().toISOString().split('T')[0]),
  likes: item.likes ?? item.like_count ?? 0,
  comments: item.comments ?? item.comment_count ?? 0,
  gradient: item.gradient || GRADIENTS[index % GRADIENTS.length],
  url: item.url || null,
});

export function GalleryPage({ members }) {
  const [selectedTab, setSelectedTab] = useState('All');
  const [gallery, setGallery] = useState(MOCK_GALLERY);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    category: 'creative',
    caption: '',
  });
  const [liked, setLiked] = useState(new Set());

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await api.getGallery();
        if (Array.isArray(data) && data.length > 0) {
          setGallery(data.map(normalizeGalleryItem));
        }
        // If data is empty or not an array, keep MOCK_GALLERY
      } catch (error) {
        console.error('Error fetching gallery:', error);
        // Keep MOCK_GALLERY on error
      }
    };

    fetchGallery();
  }, []);

  const filteredGallery =
    selectedTab === 'All'
      ? gallery
      : gallery.filter((item) => item.category === selectedTab.toLowerCase());

  const handleLike = (id) => {
    const newLiked = new Set(liked);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLiked(newLiked);
  };

  const handleUpload = () => {
    if (uploadForm.caption.trim()) {
      const newItem = {
        id: gallery.length + 1,
        category: uploadForm.category,
        caption: uploadForm.caption,
        author: { name: 'You', avatar: 'YO' },
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        comments: 0,
        gradient: 'linear-gradient(135deg, #C9A688 0%, #D4A0A0 100%)',
      };
      setGallery([newItem, ...gallery]);
      setUploadForm({ category: 'creative', caption: '' });
      setIsModalOpen(false);
    }
  };

  const tabOptions = ['All', ...GALLERY_CATS];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Gallery</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          style={styles.uploadButton}
        >
          <Icon name="plus" /> Share a Photo
        </Button>
      </div>

      {/* Tab Filters */}
      <div style={styles.tabBarContainer}>
        <TabBar
          options={tabOptions}
          selected={selectedTab}
          onChange={setSelectedTab}
        />
      </div>

      {/* Masonry Grid */}
      <div style={styles.grid}>
        {filteredGallery.map((item) => (
          <Card key={item.id} style={styles.photoCard}>
            {/* Photo Placeholder */}
            <div style={{ ...styles.photoPlaceholder, background: item.gradient }} />

            {/* Caption */}
            <p style={styles.caption}>{item.caption}</p>

            {/* Author Info */}
            <div style={styles.authorInfo}>
              <Avatar name={item.author.avatar} size="sm" />
              <div style={styles.authorDetails}>
                <p style={styles.authorName}>{item.author.name}</p>
                <p style={styles.date}>{item.date}</p>
              </div>
            </div>

            {/* Interactions */}
            <div style={styles.interactions}>
              <button
                onClick={() => handleLike(item.id)}
                style={{
                  ...styles.likeButton,
                  color: liked.has(item.id) ? T.primary : T.textMuted,
                }}
              >
                <Icon name="heart" />
                <span style={styles.likeCount}>
                  {item.likes + (liked.has(item.id) ? 1 : 0)}
                </span>
              </button>
              <div style={styles.commentCount}>
                <Icon name="message" />
                <span>{item.comments}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Upload Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div style={styles.modalContent}>
          <h2 style={styles.modalTitle}>Share a Photo</h2>

          {/* Category Select */}
          <label style={styles.label}>Category</label>
          <select
            value={uploadForm.category}
            onChange={(e) =>
              setUploadForm({ ...uploadForm, category: e.target.value })
            }
            style={styles.select}
          >
            {GALLERY_CATS.map((cat) => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>

          {/* Caption Input */}
          <label style={styles.label}>Caption</label>
          <textarea
            value={uploadForm.caption}
            onChange={(e) =>
              setUploadForm({ ...uploadForm, caption: e.target.value })
            }
            placeholder="Describe your photo..."
            style={styles.textarea}
          />

          {/* File Upload Placeholder */}
          <div style={styles.fileUploadArea}>
            <Icon name="image" />
            <p style={styles.uploadText}>Click to upload or drag and drop</p>
            <p style={styles.uploadSubtext}>PNG, JPG, GIF up to 10MB</p>
          </div>

          {/* Actions */}
          <div style={styles.modalActions}>
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              style={styles.cancelButton}
            >
              Cancel
            </Button>
            <Button onClick={handleUpload} style={styles.submitButton}>
              Share Photo
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: T.bg,
    padding: '20px',
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: T.text,
    margin: 0,
  },
  uploadButton: {
    backgroundColor: T.primary,
    color: T.bg,
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'background-color 0.2s',
  },
  tabBarContainer: {
    marginBottom: '30px',
    overflowX: 'auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '40px',
  },
  photoCard: {
    backgroundColor: T.bgCard,
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  photoPlaceholder: {
    width: '100%',
    height: '200px',
    backgroundColor: T.bgCard,
  },
  caption: {
    padding: '16px 16px 12px',
    fontSize: '14px',
    color: T.text,
    margin: 0,
    lineHeight: '1.5',
  },
  authorInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '0 16px 12px',
  },
  authorDetails: {
    flex: 1,
  },
  authorName: {
    fontSize: '13px',
    fontWeight: '600',
    color: T.text,
    margin: 0,
  },
  date: {
    fontSize: '12px',
    color: T.textMuted,
    margin: 0,
  },
  interactions: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '12px 16px',
    borderTop: `1px solid ${T.bgCard}`,
  },
  likeButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    transition: 'color 0.2s',
  },
  likeCount: {
    marginLeft: '4px',
  },
  commentCount: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: T.textMuted,
  },
  modalContent: {
    padding: '24px',
    backgroundColor: T.bgCard,
    borderRadius: '12px',
    maxWidth: '500px',
    width: '90%',
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: T.text,
    marginBottom: '20px',
    margin: 0,
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: T.text,
    marginBottom: '8px',
    marginTop: '16px',
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    backgroundColor: T.bg,
    color: T.text,
    border: `1px solid ${T.textMuted}`,
    borderRadius: '6px',
    fontSize: '13px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    backgroundColor: T.bg,
    color: T.text,
    border: `1px solid ${T.textMuted}`,
    borderRadius: '6px',
    fontSize: '13px',
    minHeight: '100px',
    fontFamily: 'inherit',
    resize: 'vertical',
    boxSizing: 'border-box',
    marginTop: '8px',
  },
  fileUploadArea: {
    border: `2px dashed ${T.textMuted}`,
    borderRadius: '8px',
    padding: '40px 20px',
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: '16px',
    transition: 'border-color 0.2s',
  },
  uploadText: {
    fontSize: '14px',
    fontWeight: '500',
    color: T.text,
    margin: '12px 0 4px',
  },
  uploadSubtext: {
    fontSize: '12px',
    color: T.textMuted,
    margin: 0,
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: T.bg,
    color: T.text,
    border: `1px solid ${T.textMuted}`,
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: T.primary,
    color: T.bg,
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
  },
};
