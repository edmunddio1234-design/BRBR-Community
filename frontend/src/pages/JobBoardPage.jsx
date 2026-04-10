import React from 'react';
import { T } from '../theme';

export default function JobBoardPage() {
  return (
    <div style={{
      backgroundColor: T.bg,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: T.fontBody,
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: '64px',
        marginBottom: '24px',
      }}>
        &#x1F6A7;
      </div>
      <h1 style={{
        fontFamily: T.fontDisplay,
        fontSize: '36px',
        fontWeight: '700',
        color: T.primary,
        margin: '0 0 16px 0',
        letterSpacing: '1px',
      }}>
        Under Construction
      </h1>
      <p style={{
        fontSize: '16px',
        color: T.textMuted,
        maxWidth: '480px',
        lineHeight: '1.7',
        margin: '0 0 32px 0',
      }}>
        The Opportunities board is being built out with exciting features.
        Check back soon for job postings, volunteer opportunities, and community collaborations.
      </p>
      <div style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {['Job Board', 'Volunteer', 'Collaborations'].map((feature) => (
          <span
            key={feature}
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              border: `1px solid ${T.primary}`,
              color: T.primary,
              fontSize: '13px',
              fontWeight: '500',
              opacity: 0.7,
            }}
          >
            {feature}
          </span>
        ))}
      </div>
      <p style={{
        fontSize: '13px',
        color: T.textMuted,
        marginTop: '48px',
        opacity: 0.5,
        fontStyle: 'italic',
        fontFamily: T.fontAccent,
      }}>
        &ldquo;Great things take time.&rdquo;
      </p>
    </div>
  );
}
