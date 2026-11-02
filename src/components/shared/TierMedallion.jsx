import React from 'react'
import { Check, Target, Lock, Crown, Sparkles } from 'lucide-react'

/**
 * Tier metadata with authentic metallic colorways & gradients
 */
const TIER_THEMES = {
  1: {
    name: 'Bronze Starter',
    primary: '#CD7F32',
    secondary: '#8C4A15',
    light: '#F5A962',
    border: 'linear-gradient(135deg, #FFD1A4 0%, #CD7F32 50%, #6E360C 100%)',
    core: 'radial-gradient(circle, #2A170A 0%, #120A04 100%)',
    glow: 'rgba(205, 127, 50, 0.45)',
  },
  2: {
    name: 'Iron Climber',
    primary: '#94A3B8',
    secondary: '#475569',
    light: '#CBD5E1',
    border: 'linear-gradient(135deg, #F1F5F9 0%, #94A3B8 50%, #334155 100%)',
    core: 'radial-gradient(circle, #1E2330 0%, #0F1118 100%)',
    glow: 'rgba(148, 163, 184, 0.45)',
  },
  3: {
    name: 'Steel Achiever',
    primary: '#38BDF8',
    secondary: '#0369A1',
    light: '#BAE6FD',
    border: 'linear-gradient(135deg, #E0F2FE 0%, #38BDF8 50%, #0C4A6E 100%)',
    core: 'radial-gradient(circle, #0F2338 0%, #07121D 100%)',
    glow: 'rgba(56, 189, 248, 0.45)',
  },
  4: {
    name: 'Silver Scout',
    primary: '#E2E8F0',
    secondary: '#94A3B8',
    light: '#FFFFFF',
    border: 'linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 50%, #64748B 100%)',
    core: 'radial-gradient(circle, #202738 0%, #0E121B 100%)',
    glow: 'rgba(226, 232, 240, 0.50)',
  },
  5: {
    name: 'Gold Guardian',
    primary: '#FBBF24',
    secondary: '#D97706',
    light: '#FEF08A',
    border: 'linear-gradient(135deg, #FFFBEB 0%, #FBBF24 45%, #B45309 100%)',
    core: 'radial-gradient(circle, #321F06 0%, #150D02 100%)',
    glow: 'rgba(251, 191, 36, 0.65)',
  },
  6: {
    name: 'Platinum Hero',
    primary: '#C084FC',
    secondary: '#7E22CE',
    light: '#F3E8FF',
    border: 'linear-gradient(135deg, #FAF5FF 0%, #C084FC 50%, #581C87 100%)',
    core: 'radial-gradient(circle, #2B1242 0%, #130720 100%)',
    glow: 'rgba(192, 132, 252, 0.55)',
  },
  7: {
    name: 'Diamond Legend',
    primary: '#00F5FF',
    secondary: '#0284C7',
    light: '#E0F7FF',
    border: 'linear-gradient(135deg, #FFFFFF 0%, #00F5FF 45%, #0369A1 100%)',
    core: 'radial-gradient(circle, #08283B 0%, #04141E 100%)',
    glow: 'rgba(0, 245, 255, 0.65)',
  },
  8: {
    name: 'Master Vanguard',
    primary: '#F43F5E',
    secondary: '#9F1239',
    light: '#FFE4E6',
    border: 'linear-gradient(135deg, #FFF1F2 0%, #F43F5E 50%, #881337 100%)',
    core: 'radial-gradient(circle, #380C16 0%, #180509 100%)',
    glow: 'rgba(244, 63, 94, 0.60)',
  },
  9: {
    name: 'Grand Champion',
    primary: '#F59E0B',
    secondary: '#92400E',
    light: '#FDE68A',
    border: 'linear-gradient(135deg, #FEF3C7 0%, #F59E0B 50%, #78350F 100%)',
    core: 'radial-gradient(circle, #341804 0%, #160A01 100%)',
    glow: 'rgba(245, 158, 11, 0.65)',
  },
  10: {
    name: 'Apex Sovereign',
    primary: '#10B981',
    secondary: '#047857',
    light: '#A7F3D0',
    border: 'linear-gradient(135deg, #ECFDF5 0%, #10B981 45%, #064E3B 100%)',
    core: 'radial-gradient(circle, #082F24 0%, #031510 100%)',
    glow: 'rgba(16, 185, 129, 0.70)',
  },
}

/**
 * TierMedallion
 * High-impact 3D metallic gaming emblem supporting all 10 tiers
 */
const TierMedallion = ({
  level = 5,
  size = 68,
  status = 'completed', // 'completed' | 'current' | 'next' | 'locked'
  showStatusCorner = true,
  className = '',
}) => {
  const tier = TIER_THEMES[level] || TIER_THEMES[5]
  const levelStr = String(level).padStart(2, '0')
  const isCurrent = status === 'current'
  const isCompleted = status === 'completed'
  const isNext = status === 'next'
  const isLocked = status === 'locked'
  const isApex = level === 10

  const uid = `medallion-lvl-${level}-${Math.round(size)}`

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size * 1.06}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        filter: isCurrent
          ? `drop-shadow(0 0 ${Math.round(size * 0.22)}px ${tier.glow})`
          : isNext
          ? `drop-shadow(0 0 ${Math.round(size * 0.16)}px ${tier.glow})`
          : isCompleted
          ? `drop-shadow(0 4px 12px rgba(0,0,0,0.6))`
          : `drop-shadow(0 2px 6px rgba(0,0,0,0.5)) opacity(0.65)`,
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {/* Outer Ambient Backlight */}
      {isCurrent && (
        <div
          style={{
            position: 'absolute',
            inset: -4,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${tier.glow} 0%, transparent 70%)`,
            filter: 'blur(8px)',
            pointerEvents: 'none',
            animation: 'pulseSlow 2.5s infinite ease-in-out',
          }}
          aria-hidden="true"
        />
      )}

      {/* SVG 3D Shield Construction */}
      <svg
        width={size}
        height={size * 1.06}
        viewBox="0 0 100 106"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          {/* Outer Metallic Bezel Gradient */}
          <linearGradient id={`${uid}-border`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isLocked ? '#4B5563' : tier.light} />
            <stop offset="35%" stopColor={isLocked ? '#374151' : tier.primary} />
            <stop offset="100%" stopColor={isLocked ? '#1F2937' : tier.secondary} />
          </linearGradient>

          {/* Core Dark Gradient */}
          <radialGradient id={`${uid}-core`} cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor={isLocked ? '#1F2430' : isCurrent ? '#38220A' : '#1F1836'} />
            <stop offset="100%" stopColor={isLocked ? '#0F1218' : '#0B0816'} />
          </radialGradient>

          {/* Upper Glass Specular Highlight */}
          <linearGradient id={`${uid}-specular`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.65)" />
            <stop offset="60%" stopColor="rgba(255, 255, 255, 0.05)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
        </defs>

        {/* Outer Shield Geometry */}
        <polygon
          points="50,3 93,26 93,80 50,103 7,80 7,26"
          fill={`url(#${uid}-core)`}
          stroke={`url(#${uid}-border)`}
          strokeWidth="3.8"
          strokeLinejoin="round"
        />

        {/* Inner Engraved Bezel Ring */}
        <polygon
          points="50,9 87,30 87,76 50,97 13,76 13,30"
          fill="none"
          stroke={`url(#${uid}-border)`}
          strokeWidth="1.2"
          strokeOpacity={isLocked ? '0.3' : '0.6'}
          strokeDasharray="4 2"
        />

        {/* Top Metallic Crown Accent Line */}
        <line
          x1="26"
          y1="16"
          x2="74"
          y2="16"
          stroke={isLocked ? '#4B5563' : tier.light}
          strokeWidth="1"
          strokeOpacity="0.7"
        />

        {/* Specular Light Reflection on Upper Half */}
        <polygon
          points="50,9 87,30 87,54 50,60 13,54 13,30"
          fill={`url(#${uid}-specular)`}
        />

        {/* Subtle Side Wing Accents */}
        <path
          d="M 17 38 L 23 48 L 17 58"
          stroke={isLocked ? '#374151' : tier.primary}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 83 38 L 77 48 L 83 58"
          stroke={isLocked ? '#374151' : tier.primary}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Typography & Crest Identity */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          paddingBottom: `${Math.round(size * 0.04)}px`,
        }}
      >
        <span
          style={{
            fontSize: `${Math.max(8, Math.round(size * 0.12))}px`,
            fontWeight: 800,
            letterSpacing: '0.14em',
            color: isLocked ? '#9CA3AF' : tier.light,
            textTransform: 'uppercase',
            marginBottom: `${Math.round(size * 0.02)}px`,
            textShadow: '0 1px 3px rgba(0,0,0,0.9)',
          }}
        >
          {isApex ? 'APEX' : 'LEVEL'}
        </span>
        <span
          style={{
            fontSize: `${Math.max(14, Math.round(size * 0.36))}px`,
            fontWeight: 900,
            lineHeight: 1,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            textShadow: isCurrent
              ? `0 2px 8px rgba(0,0,0,0.9), 0 0 16px ${tier.glow}`
              : '0 2px 8px rgba(0,0,0,0.9)',
          }}
        >
          {levelStr}
        </span>
      </div>

      {/* Corner Status Badges */}
      {showStatusCorner && isCompleted && (
        <div
          style={{
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            width: `${Math.max(16, Math.round(size * 0.28))}px`,
            height: `${Math.max(16, Math.round(size * 0.28))}px`,
            borderRadius: '50%',
            background: '#00E676',
            color: '#07160D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 10px rgba(0, 230, 118, 0.7)',
            border: '2px solid #090B16',
            zIndex: 3,
          }}
        >
          <Check size={Math.round(size * 0.16)} strokeWidth={3.5} />
        </div>
      )}

      {showStatusCorner && isCurrent && (
        <div
          style={{
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            width: `${Math.max(16, Math.round(size * 0.28))}px`,
            height: `${Math.max(16, Math.round(size * 0.28))}px`,
            borderRadius: '50%',
            background: '#FBBF24',
            color: '#0E0B02',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 10px rgba(251, 191, 36, 0.8)',
            border: '2px solid #090B16',
            zIndex: 3,
            animation: 'pulseSlow 1.8s infinite ease-in-out',
          }}
        >
          <Sparkles size={Math.round(size * 0.16)} />
        </div>
      )}

      {showStatusCorner && isNext && (
        <div
          style={{
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            width: `${Math.max(16, Math.round(size * 0.28))}px`,
            height: `${Math.max(16, Math.round(size * 0.28))}px`,
            borderRadius: '50%',
            background: '#C084FC',
            color: '#1A072E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 10px rgba(192, 132, 252, 0.7)',
            border: '2px solid #090B16',
            zIndex: 3,
          }}
        >
          <Target size={Math.round(size * 0.16)} strokeWidth={2.5} />
        </div>
      )}

      {showStatusCorner && isLocked && !isApex && (
        <div
          style={{
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            width: `${Math.max(16, Math.round(size * 0.26))}px`,
            height: `${Math.max(16, Math.round(size * 0.26))}px`,
            borderRadius: '50%',
            background: 'rgba(28, 20, 50, 0.95)',
            color: '#94A3B8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1.5px solid rgba(148, 163, 184, 0.4)',
            zIndex: 3,
          }}
        >
          <Lock size={Math.round(size * 0.14)} />
        </div>
      )}

      {showStatusCorner && isApex && (
        <div
          style={{
            position: 'absolute',
            top: '-6px',
            right: '-4px',
            width: `${Math.max(18, Math.round(size * 0.3))}px`,
            height: `${Math.max(18, Math.round(size * 0.3))}px`,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)',
            color: '#0E0B02',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 12px rgba(251, 191, 36, 0.9)',
            border: '2px solid #090B16',
            zIndex: 3,
          }}
        >
          <Crown size={Math.round(size * 0.18)} />
        </div>
      )}
    </div>
  )
}

export default TierMedallion
