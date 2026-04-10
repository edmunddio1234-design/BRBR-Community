import { T } from './theme';

export const S = {
  h1: {
    fontFamily: T.fontDisplay,
    fontSize: '28px',
    fontWeight: '600',
    color: T.textDark,
    margin: '0 0 8px 0',
    letterSpacing: '0.5px',
  },
  h2: {
    fontFamily: T.fontDisplay,
    fontSize: '20px',
    fontWeight: '600',
    color: T.textDark,
    margin: '0 0 4px 0',
  },
  h3: {
    fontFamily: T.fontDisplay,
    fontSize: '16px',
    fontWeight: '600',
    color: T.text,
    margin: '0 0 4px 0',
  },
  body: {
    fontFamily: T.fontBody,
    fontSize: '14px',
    color: T.textBody,
    lineHeight: '1.6',
  },
  label: {
    fontFamily: T.fontBody,
    fontSize: '11px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: T.primary,
    opacity: 0.6,
  },
  card: {
    background: T.bgCard,
    border: `1px solid ${T.border}`,
    borderRadius: '8px',
    padding: '24px',
    boxShadow: T.shadow,
    transition: 'all 0.3s ease',
  },
  cardHover: {
    background: T.bgCardHover,
    borderColor: T.borderHover,
    boxShadow: T.shadowLg,
    transform: 'translateY(-2px)',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '14px',
    fontFamily: T.fontBody,
    border: `1px solid ${T.border}`,
    borderRadius: '6px',
    outline: 'none',
    backgroundColor: T.bgSoft,
    color: T.text,
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease',
  },
  inputFocus: {
    borderColor: T.primary,
  },
  accent: {
    fontFamily: T.fontAccent,
    fontStyle: 'italic',
    color: T.primaryLight,
  },
};
