import React, { useState, useEffect } from 'react';
import { T } from '../theme';
import { S } from '../styles';
import { Button, Tag, Card, Modal, TabBar } from '../components/UI';
import Icon from '../components/Icons';
import { api } from '../api';
import { JOB_TYPES, JOB_CATS } from '../constants';

const MOCK_JOBS = [
  {
    id: 1,
    poster: 'Conscious Wellness Co',
    title: 'Wellness Program Manager',
    type: 'Full-Time',
    category: 'Health & Wellness',
    location: 'Austin, TX',
    description: 'Lead holistic wellness initiatives and community health programs for a mission-driven wellness startup.',
    contact: 'careers@consciouswellness.com'
  },
  {
    id: 2,
    poster: 'Creatives for Change',
    title: 'Community Art Director',
    type: 'Part-Time',
    category: 'Creative',
    location: 'Los Angeles, CA',
    description: 'Curate and direct art programs that uplift underrepresented artists and foster creative expression in underserved communities.',
    contact: 'hello@creativesforchange.org'
  },
  {
    id: 3,
    poster: 'Education Reimagined',
    title: 'Curriculum Developer',
    type: 'Full-Time',
    category: 'Education',
    location: 'Remote',
    description: 'Design innovative, inclusive educational curricula for alternative schools focused on personal growth and community impact.',
    contact: 'jobs@educationreimagined.org'
  },
  {
    id: 4,
    poster: 'Green Earth Nonprofit',
    title: 'Grant Writer & Fundraiser',
    type: 'Contract',
    category: 'Nonprofit',
    location: 'Boston, MA',
    description: 'Write compelling grant proposals and develop fundraising strategies for an environmental justice organization.',
    contact: 'connect@greenearthnonprofit.org'
  },
  {
    id: 5,
    poster: 'Wellness Academy',
    title: 'Yoga & Mindfulness Instructor',
    type: 'Part-Time',
    category: 'Health & Wellness',
    location: 'Portland, OR',
    description: 'Teach mindfulness and yoga classes to diverse populations, specializing in trauma-informed and inclusive practices.',
    contact: 'instructor@wellnessacademy.com'
  }
];

export default function JobBoardPage({ members }) {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedTab, setSelectedTab] = useState('All');
  const [showPostModal, setShowPostModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    type: 'Full-Time',
    category: 'Creative',
    location: '',
    description: '',
    contact: ''
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const data = await api.getJobs();
        setJobs(data || MOCK_JOBS);
        setError(null);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setJobs(MOCK_JOBS);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (selectedTab === 'All') {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter(job => job.type === selectedTab));
    }
  }, [selectedTab, jobs]);

  const handlePostOpportunity = () => {
    if (!formData.title || !formData.company || !formData.location || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    const newJob = {
      id: jobs.length + 1,
      poster: formData.company,
      title: formData.title,
      type: formData.type,
      category: formData.category,
      location: formData.location,
      description: formData.description,
      contact: formData.contact
    };

    setJobs([newJob, ...jobs]);
    setFormData({
      title: '',
      company: '',
      type: 'Full-Time',
      category: 'Creative',
      location: '',
      description: '',
      contact: ''
    });
    setShowPostModal(false);
  };

  const tabBarItems = ['All', ...JOB_TYPES];

  return (
    <div style={{
      backgroundColor: T.bg,
      minHeight: '100vh',
      padding: '20px',
      color: T.text
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '600',
          margin: '0',
          color: T.text
        }}>
          Opportunities
        </h1>
        <Button
          onClick={() => setShowPostModal(true)}
          style={{
            backgroundColor: T.primary,
            color: T.bg,
            padding: '12px 24px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.opacity = '0.9'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          + Post Opportunity
        </Button>
      </div>

      {/* Tab Filter */}
      <div style={{ marginBottom: '30px' }}>
        <TabBar
          items={tabBarItems}
          activeTab={selectedTab}
          onTabChange={setSelectedTab}
          style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '10px'
          }}
        />
        {tabBarItems.map(item => (
          <button
            key={item}
            onClick={() => setSelectedTab(item)}
            style={{
              marginRight: '12px',
              padding: '8px 16px',
              backgroundColor: selectedTab === item ? T.primary : T.bgCard,
              color: selectedTab === item ? T.bg : T.text,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Jobs Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {loading ? (
          <p style={{ color: T.textMuted, gridColumn: '1 / -1' }}>Loading opportunities...</p>
        ) : filteredJobs.length === 0 ? (
          <p style={{ color: T.textMuted, gridColumn: '1 / -1' }}>No opportunities found in this category.</p>
        ) : (
          filteredJobs.map(job => (
            <Card
              key={job.id}
              style={{
                backgroundColor: T.bgCard,
                border: `1px solid rgba(201, 166, 136, 0.2)`,
                borderRadius: '8px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `rgba(201, 166, 136, 0.4)`;
                e.currentTarget.style.boxShadow = `0 4px 12px rgba(201, 166, 136, 0.1)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `rgba(201, 166, 136, 0.2)`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Poster Name */}
              <p style={{
                margin: '0 0 8px 0',
                fontSize: '12px',
                color: T.textMuted,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {job.poster}
              </p>

              {/* Job Title */}
              <h3 style={{
                margin: '0 0 16px 0',
                fontSize: '22px',
                fontWeight: '600',
                color: T.text,
                lineHeight: '1.3'
              }}>
                {job.title}
              </h3>

              {/* Tags */}
              <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '16px',
                flexWrap: 'wrap'
              }}>
                <Tag
                  label={job.type}
                  style={{
                    backgroundColor: `rgba(201, 166, 136, 0.15)`,
                    color: T.primary,
                    padding: '4px 10px',
                    borderRadius: '3px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                />
                <Tag
                  label={job.category}
                  style={{
                    backgroundColor: `rgba(201, 166, 136, 0.08)`,
                    color: T.textMuted,
                    padding: '4px 10px',
                    borderRadius: '3px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                />
              </div>

              {/* Location */}
              <p style={{
                margin: '0 0 12px 0',
                fontSize: '13px',
                color: T.textMuted,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{ color: T.primary }}>📍</span>
                {job.location}
              </p>

              {/* Description */}
              <p style={{
                margin: '0 0 20px 0',
                fontSize: '14px',
                color: T.text,
                lineHeight: '1.5',
                flex: 1
              }}>
                {job.description}
              </p>

              {/* Button */}
              <Button
                onClick={() => {
                  if (job.contact) {
                    window.location.href = `mailto:${job.contact}`;
                  }
                }}
                style={{
                  backgroundColor: 'transparent',
                  color: T.primary,
                  border: `1px solid ${T.primary}`,
                  padding: '10px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  width: '100%',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = T.primary;
                  e.currentTarget.style.color = T.bg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = T.primary;
                }}
              >
                Learn More
              </Button>
            </Card>
          ))
        )}
      </div>

      {/* Post Opportunity Modal */}
      <Modal
        isOpen={showPostModal}
        onClose={() => setShowPostModal(false)}
        title="Post an Opportunity"
        style={{
          backgroundColor: T.bgCard,
          maxWidth: '500px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Title */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '13px',
              color: T.text,
              fontWeight: '600'
            }}>
              Job Title *
            </label>
            <input
              type="text"
              placeholder="e.g., Community Manager"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 12px',
                backgroundColor: T.bg,
                border: `1px solid rgba(201, 166, 136, 0.2)`,
                borderRadius: '4px',
                color: T.text,
                fontSize: '13px',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Company */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '13px',
              color: T.text,
              fontWeight: '600'
            }}>
              Company/Organization *
            </label>
            <input
              type="text"
              placeholder="Your company name"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 12px',
                backgroundColor: T.bg,
                border: `1px solid rgba(201, 166, 136, 0.2)`,
                borderRadius: '4px',
                color: T.text,
                fontSize: '13px',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Type & Category Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {/* Type */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '13px',
                color: T.text,
                fontWeight: '600'
              }}>
                Job Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  backgroundColor: T.bg,
                  border: `1px solid rgba(201, 166, 136, 0.2)`,
                  borderRadius: '4px',
                  color: T.text,
                  fontSize: '13px',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  cursor: 'pointer'
                }}
              >
                {JOB_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '13px',
                color: T.text,
                fontWeight: '600'
              }}>
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  backgroundColor: T.bg,
                  border: `1px solid rgba(201, 166, 136, 0.2)`,
                  borderRadius: '4px',
                  color: T.text,
                  fontSize: '13px',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  cursor: 'pointer'
                }}
              >
                {JOB_CATS.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '13px',
              color: T.text,
              fontWeight: '600'
            }}>
              Location *
            </label>
            <input
              type="text"
              placeholder="e.g., Austin, TX or Remote"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 12px',
                backgroundColor: T.bg,
                border: `1px solid rgba(201, 166, 136, 0.2)`,
                borderRadius: '4px',
                color: T.text,
                fontSize: '13px',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Description */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '13px',
              color: T.text,
              fontWeight: '600'
            }}>
              Job Description *
            </label>
            <textarea
              placeholder="Describe the role, responsibilities, and what makes it a great fit for the BRBR community..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 12px',
                backgroundColor: T.bg,
                border: `1px solid rgba(201, 166, 136, 0.2)`,
                borderRadius: '4px',
                color: T.text,
                fontSize: '13px',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
                minHeight: '100px',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Contact Info */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '13px',
              color: T.text,
              fontWeight: '600'
            }}>
              Contact Email
            </label>
            <input
              type="email"
              placeholder="jobs@yourcompany.com"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 12px',
                backgroundColor: T.bg,
                border: `1px solid rgba(201, 166, 136, 0.2)`,
                borderRadius: '4px',
                color: T.text,
                fontSize: '13px',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Modal Actions */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: `1px solid rgba(201, 166, 136, 0.1)`
          }}>
            <Button
              onClick={() => setShowPostModal(false)}
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                color: T.text,
                border: `1px solid rgba(201, 166, 136, 0.3)`,
                padding: '10px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = T.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `rgba(201, 166, 136, 0.3)`;
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePostOpportunity}
              style={{
                flex: 1,
                backgroundColor: T.primary,
                color: T.bg,
                border: 'none',
                padding: '10px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Post Opportunity
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
