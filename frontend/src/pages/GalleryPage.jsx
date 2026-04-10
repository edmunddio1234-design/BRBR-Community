import React, { useState } from 'react';
import { T } from '../theme';
import { S } from '../styles';

const BASE = 'https://raw.githubusercontent.com/edmunddio1234-design/BR-Collectionn/main/';

const GALLERY_ITEMS = [
  // Gemini AI Portraits (actual filenames from repo)
  { src: BASE + 'Gemini_Generated_Image_3j8oz43j8oz43j8o.jpeg', title: 'Portrait I', cat: 'portrait' },
  { src: BASE + 'Gemini_Generated_Image_3vylow3vylow3vyl.jpeg', title: 'Portrait II', cat: 'portrait' },
  { src: BASE + 'Gemini_Generated_Image_4pv4cl4pv4cl4pv4.jpeg', title: 'Portrait III', cat: 'portrait' },
  { src: BASE + 'Gemini_Generated_Image_4vn63m4vn63m4vn6.jpeg', title: 'Portrait IV', cat: 'portrait' },
  { src: BASE + 'Gemini_Generated_Image_5huckz5huckz5huc.jpeg', title: 'Portrait V', cat: 'portrait' },
  { src: BASE + 'Gemini_Generated_Image_6del666del666del.jpeg', title: 'Portrait VI', cat: 'portrait' },
  { src: BASE + 'Gemini_Generated_Image_6yijf86yijf86yij.jpeg', title: 'Portrait VII', cat: 'portrait' },
  { src: BASE + 'Gemini_Generated_Image_9xavtz9xavtz9xav.jpeg', title: 'Portrait VIII', cat: 'portrait' },
  { src: BASE + 'Gemini_Generated_Image_b83024b83024b830.jpeg', title: 'Portrait IX', cat: 'portrait' },
  { src: BASE + 'Gemini_Generated_Image_d9ha4qd9ha4qd9ha.jpeg', title: 'Portrait X', cat: 'portrait' },
  { src: BASE + 'Gemini_Generated_Image_dx6k6vdx6k6vdx6k.jpeg', title: 'Portrait XI', cat: 'portrait' },
  { src: BASE + 'Gemini_Generated_Image_ex3fepex3fepex3f.jpeg', title: 'Portrait XII', cat: 'portrait' },
  { src: BASE + 'Gemini_Generated_Image_fhb95ffhb95ffhb9.jpeg', title: 'Portrait XIII', cat: 'portrait' },
  { src: BASE + 'Gemini_Generated_Image_ios6wzios6wzios6.jpeg', title: 'Portrait XIV', cat: 'portrait' },
  { src: BASE + 'Gemini_Generated_Image_m8cf35m8cf35m8cf.jpeg', title: 'Portrait XV', cat: 'portrait' },
  { src: BASE + 'Gemini_Generated_Image_mxzj8cmxzj8cmxzj.jpeg', title: 'Portrait XVI', cat: 'portrait' },
  { src: BASE + 'Gemini_Generated_Image_ot6axhot6axhot6a.jpeg', title: 'Portrait XVII', cat: 'portrait' },
  { src: BASE + 'Gemini_Generated_Image_r2bl1jr2bl1jr2bl.jpeg', title: 'Portrait XVIII', cat: 'portrait' },
  { src: BASE + 'Gemini_Generated_Image_xmcitrxmcitrxmci.jpeg', title: 'Portrait XIX', cat: 'portrait' },
  { src: BASE + 'Gemini_Generated_Image_y5ncjty5ncjty5nc.jpeg', title: 'Portrait XX', cat: 'portrait' },
  { src: BASE + 'Gemini_Generated_Image_yevefkyevefkyeve.jpeg', title: 'Portrait XXI', cat: 'portrait' },
  { src: BASE + 'Gemini_Generated_Image_z44ui3z44ui3z44u.jpeg', title: 'Portrait XXII', cat: 'portrait' },
  { src: BASE + 'Gemini_Generated_Image_zdgpy9zdgpy9zdgp.jpeg', title: 'Portrait XXIII', cat: 'portrait' },
  // Creative images
  { src: BASE + 'Creative_image_9.png', title: 'Creative Vision', cat: 'creative' },
  { src: BASE + 'creative_image_9_16_0408%20(3).png', title: 'Creative IV', cat: 'creative' },
];

const TABS = ['All', 'Portraits', 'Creative'];

export function GalleryPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = GALLERY_ITEMS.filter(item => {
    if (activeTab === 'Portraits') return item.cat === 'portrait';
    if (activeTab === 'Creative') return item.cat === 'creative';
    return true;
  });

  const portraits = GALLERY_ITEMS.filter(i => i.cat === 'portrait');
  const creative = GALLERY_ITEMS.filter(i => i.cat === 'creative');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: T.bg, padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontFamily: T.fontDisplay, fontSize: '32px', fontWeight: '700',
          color: T.text, margin: '0 0 8px 0',
        }}>
          Gallery
        </h1>
        <p style={{ color: T.textMuted, fontSize: '14px', margin: 0 }}>
          {portraits.length} portraits &middot; {creative.length} creative works
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: `1px solid rgba(201,166,136,0.2)`, paddingBottom: '12px' }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer',
              fontWeight: activeTab === tab ? '600' : '500', fontSize: '14px',
              backgroundColor: activeTab === tab ? T.primary : 'transparent',
              color: activeTab === tab ? T.bg : T.textMuted,
              transition: 'all 0.2s ease', fontFamily: T.fontBody,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '16px',
      }}>
        {filtered.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setLightbox(item)}
            style={{
              position: 'relative', borderRadius: '10px', overflow: 'hidden',
              cursor: 'pointer', backgroundColor: T.bgCard,
              border: `1px solid ${T.border}`,
              aspectRatio: '1',
              transition: 'transform 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.borderColor = T.primary; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = T.border; }}
          >
            <img
              src={item.src}
              alt={item.title}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={e => {
                e.target.style.display = 'none';
                e.target.parentElement.style.display = 'flex';
                e.target.parentElement.style.alignItems = 'center';
                e.target.parentElement.style.justifyContent = 'center';
                const fallback = document.createElement('span');
                fallback.textContent = item.title;
                fallback.style.color = T.textMuted;
                fallback.style.fontSize = '13px';
                e.target.parentElement.appendChild(fallback);
              }}
            />
            {/* Title overlay */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '8px 12px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
              pointerEvents: 'none',
            }}>
              <span style={{ color: '#fff', fontSize: '12px', fontWeight: '500' }}>{item.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.92)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', zIndex: 9999,
            padding: '24px', cursor: 'pointer',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '90vh', position: 'relative', cursor: 'default' }}
          >
            {/* Close button */}
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: 'absolute', top: '-40px', right: 0,
                background: 'none', border: 'none', color: '#fff',
                fontSize: '28px', cursor: 'pointer', padding: '4px 8px',
              }}
            >
              &times;
            </button>
            <img
              src={lightbox.src}
              alt={lightbox.title}
              style={{ maxWidth: '90vw', maxHeight: '80vh', borderRadius: '8px', objectFit: 'contain' }}
            />
            <p style={{ color: '#fff', textAlign: 'center', marginTop: '12px', fontFamily: T.fontDisplay, fontSize: '16px' }}>
              {lightbox.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
