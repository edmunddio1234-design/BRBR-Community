import React, { useState } from 'react';
import { T } from '../theme';
import { S } from '../styles';
import { Button, Card } from '../components/UI';
import Icon from '../components/Icons';
import { api } from '../api';
import {
  READING_GROUPS,
  DESIRED_GROUPS,
  GROWTH_AREAS,
  AVAIL_OPTS,
  HOBBY_OPTS,
  NEED_HELP_OPTS,
} from '../constants';

export default function ProfileEdit({ user, setUser, setPage }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    location: user?.location || '',
    work: user?.work || '',
    bio: user?.bio || '',
    age: user?.age || '',
    maritalStatus: user?.maritalStatus || '',
    birthday: user?.birthday || '',
    languages: user?.languages || '',
    phone: user?.phone || '',
    social: user?.social || '',
    currentGroups: user?.currentGroups || [],
    desiredGroups: user?.desiredGroups || [],
    spiritualGifts: user?.spiritualGifts || [],
    hobbies: user?.hobbies || [],
    available: user?.available || [],
    needHelpWith: user?.needHelpWith || [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (field, option) => {
    setFormData((prev) => {
      const currentArray = prev[field] || [];
      const isChecked = currentArray.includes(option);
      return {
        ...prev,
        [field]: isChecked
          ? currentArray.filter((item) => item !== option)
          : [...currentArray, option],
      };
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.updateProfile(formData);
      if (response?.success || response?.data) {
        setUser({
          ...user,
          ...formData,
        });
        setPage('profile-me');
      } else {
        setError(response?.error || 'Failed to update profile');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while saving your profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setPage('profile-me');
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button
          onClick={handleCancel}
          style={styles.backButtonSmall}
          aria-label="Cancel editing"
        >
          <Icon name="x" size={20} color={T.primary} />
        </button>
        <h1 style={styles.title}>Edit Profile</h1>
        <div style={styles.spacer} />
      </div>

      {error && (
        <div style={styles.errorBanner}>
          <Icon name="alert-circle" size={16} color="#FF6B6B" />
          <span style={styles.errorText}>{error}</span>
        </div>
      )}

      <Card style={styles.formCard}>
        {/* Basic Information */}
        <div style={styles.formSection}>
          <h2 style={styles.formSectionTitle}>Basic Information</h2>

          <div style={styles.formGroup}>
            <label style={styles.label}>Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Your full name"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your.email@example.com"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="City, State or Country"
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Tell us about yourself..."
              style={styles.textarea}
              rows={4}
            />
          </div>
        </div>

        {/* Work & Personal Details */}
        <div style={styles.formSection}>
          <h2 style={styles.formSectionTitle}>Work & Personal Details</h2>

          <div style={styles.twoColumnGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Work / Occupation</label>
              <input
                type="text"
                value={formData.work}
                onChange={(e) => handleInputChange('work', e.target.value)}
                placeholder="e.g., Software Engineer, Teacher"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Age</label>
              <input
                type="text"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder="e.g., 35"
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.twoColumnGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Marital Status</label>
              <input
                type="text"
                value={formData.maritalStatus}
                onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                placeholder="e.g., Married, Single"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Birthday</label>
              <input
                type="date"
                value={formData.birthday}
                onChange={(e) => handleInputChange('birthday', e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Languages</label>
            <input
              type="text"
              value={formData.languages}
              onChange={(e) => handleInputChange('languages', e.target.value)}
              placeholder="e.g., English, Spanish, French"
              style={styles.input}
            />
          </div>
        </div>

        {/* Contact Information */}
        <div style={styles.formSection}>
          <h2 style={styles.formSectionTitle}>Contact Information</h2>

          <div style={styles.twoColumnGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(123) 456-7890"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Social Media</label>
              <input
                type="text"
                value={formData.social}
                onChange={(e) => handleInputChange('social', e.target.value)}
                placeholder="LinkedIn, Instagram, etc."
                style={styles.input}
              />
            </div>
          </div>
        </div>

        {/* Reading Groups */}
        <div style={styles.formSection}>
          <h2 style={styles.formSectionTitle}>Reading Groups</h2>

          <div style={styles.checkboxGroup}>
            <p style={styles.checkboxGroupLabel}>Currently Participating</p>
            {READING_GROUPS.map((group) => (
              <label key={group} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.currentGroups.includes(group)}
                  onChange={() => handleCheckboxChange('currentGroups', group)}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>{group}</span>
              </label>
            ))}
          </div>

          <div style={styles.checkboxGroup}>
            <p style={styles.checkboxGroupLabel}>Interested in Joining</p>
            {DESIRED_GROUPS.map((group) => (
              <label key={group} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.desiredGroups.includes(group)}
                  onChange={() => handleCheckboxChange('desiredGroups', group)}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>{group}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Spiritual Gifts & Growth Areas */}
        <div style={styles.formSection}>
          <h2 style={styles.formSectionTitle}>Spiritual Gifts & Growth Areas</h2>

          <div style={styles.checkboxGroup}>
            <p style={styles.checkboxGroupLabel}>My Spiritual Gifts</p>
            {GROWTH_AREAS.map((area) => (
              <label key={area} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.spiritualGifts.includes(area)}
                  onChange={() => handleCheckboxChange('spiritualGifts', area)}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>{area}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Hobbies & Interests */}
        <div style={styles.formSection}>
          <h2 style={styles.formSectionTitle}>Hobbies & Interests</h2>

          <div style={styles.checkboxGroup}>
            {HOBBY_OPTS.map((hobby) => (
              <label key={hobby} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.hobbies.includes(hobby)}
                  onChange={() => handleCheckboxChange('hobbies', hobby)}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>{hobby}</span>
              </label>
            ))}
          </div>
        </div>

        {/* How You Can Help */}
        <div style={styles.formSection}>
          <h2 style={styles.formSectionTitle}>How You Can Help Others</h2>

          <div style={styles.checkboxGroup}>
            <p style={styles.checkboxGroupLabel}>Available to Help With</p>
            {AVAIL_OPTS.map((opt) => (
              <label key={opt} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.available.includes(opt)}
                  onChange={() => handleCheckboxChange('available', opt)}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>{opt}</span>
              </label>
            ))}
          </div>

          <div style={styles.checkboxGroup}>
            <p style={styles.checkboxGroupLabel}>I Need Help With</p>
            {NEED_HELP_OPTS.map((opt) => (
              <label key={opt} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.needHelpWith.includes(opt)}
                  onChange={() => handleCheckboxChange('needHelpWith', opt)}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={styles.buttonGroup}>
          <Button
            onClick={handleSave}
            variant="primary"
            disabled={loading}
            style={styles.saveButton}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button
            onClick={handleCancel}
            variant="secondary"
            style={styles.cancelButton}
          >
            Cancel
          </Button>
        </div>
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
    maxWidth: 900,
    margin: '0 auto',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 8,
  },

  title: {
    fontSize: 24,
    fontWeight: 600,
    color: T.text,
    margin: 0,
    fontFamily: T.fontDisplay,
    flex: 1,
  },

  backButtonSmall: {
    background: 'none',
    border: 'none',
    padding: 8,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },

  spacer: {
    width: 36,
  },

  errorBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    background: 'rgba(255, 107, 107, 0.1)',
    border: '1px solid rgba(255, 107, 107, 0.3)',
    borderRadius: 8,
    marginBottom: 16,
  },

  errorText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: 500,
  },

  formCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    padding: 32,
    background: T.bgCard,
    border: `1px solid ${T.border}`,
    borderRadius: 12,
  },

  formSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    paddingBottom: 24,
    borderBottom: `1px solid ${T.border}`,
  },

  formSectionTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: T.primary,
    margin: 0,
    fontFamily: T.fontAccent,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  twoColumnGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 20,
  },

  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },

  label: {
    fontSize: 13,
    fontWeight: 600,
    color: T.text,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  input: {
    padding: '10px 12px',
    background: T.bgSoft,
    border: `1px solid ${T.border}`,
    borderRadius: 6,
    color: T.text,
    fontSize: 14,
    fontFamily: T.fontBody,
    transition: 'all 0.2s ease',
    outline: 'none',
  },

  textarea: {
    padding: '10px 12px',
    background: T.bgSoft,
    border: `1px solid ${T.border}`,
    borderRadius: 6,
    color: T.text,
    fontSize: 14,
    fontFamily: T.fontBody,
    transition: 'all 0.2s ease',
    outline: 'none',
    resize: 'vertical',
  },

  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },

  checkboxGroupLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: T.text,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    margin: 0,
  },

  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: 8,
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    borderRadius: 6,
  },

  checkbox: {
    width: 18,
    height: 18,
    cursor: 'pointer',
    accentColor: T.primary,
  },

  checkboxText: {
    fontSize: 14,
    color: T.text,
    fontWeight: 400,
  },

  buttonGroup: {
    display: 'flex',
    gap: 12,
    marginTop: 8,
  },

  saveButton: {
    flex: 1,
  },

  cancelButton: {
    flex: 1,
  },
};
