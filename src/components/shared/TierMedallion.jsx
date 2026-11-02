import React from 'react'
import { Check, Crosshair, LockSimple, Sparkle } from '@phosphor-icons/react'

/**
 * Tier metadata with authentic metallic colorways, gradients, and heraldry
 */
const TIER_THEMES = {
  1: {
    name: 'Bronze Starter',
    primary: '#CD7F32',
    secondary: '#7A3E10',
    light: '#F5A962',
    highlight: '#FFE3CC',
    glow: 'rgba(205, 127, 50, 0.50)',
    symbol: 'Swords & Star',
  },
  2: {
    name: 'Iron Climber',
    primary: '#94A3B8',
    secondary: '#334155',
    light: '#E2E8F0',
    highlight: '#FFFFFF',
    glow: 'rgba(148, 163, 184, 0.50)',
    symbol: 'Twin Silver Wings',
  },
  3: {
    name: 'Steel Achiever',
    primary: '#38BDF8',
    secondary: '#075985',
    light: '#BAE6FD',
    highlight: '#E0F2FE',
    glow: 'rgba(56, 189, 248, 0.55)',
    symbol: 'Compass Star',
  },
  4: {
    name: 'Silver Scout',
    primary: '#CBD5E1',
    secondary: '#64748B',
    light: '#F8FAFC',
    highlight: '#FFFFFF',
    glow: 'rgba(203, 213, 225, 0.55)',
    symbol: 'Platinum Aegis',
  },
  5: {
    name: 'Gold Guardian',
    primary: '#FBBF24',
    secondary: '#B45309',
    light: '#FEF08A',
    highlight: '#FFFBEB',
    glow: 'rgba(251, 191, 36, 0.75)',
    symbol: 'Imperial Phoenix Crown',
  },
  6: {
    name: 'Platinum Hero',
    primary: '#C084FC',
    secondary: '#6B21A8',
    light: '#F3E8FF',
    highlight: '#FAF5FF',
    glow: 'rgba(192, 132, 252, 0.70)',
    symbol: 'Heroic Violet Wings',
  },
  7: {
    name: 'Diamond Legend',
    primary: '#00F5FF',
    secondary: '#0369A1',
    light: '#A5F3FC',
    highlight: '#FFFFFF',
    glow: 'rgba(0, 245, 255, 0.75)',
    symbol: 'Prismatic Diamond',
  },
  8: {
    name: 'Master Vanguard',
    primary: '#F43F5E',
    secondary: '#881337',
    light: '#FECDD3',
    highlight: '#FFF1F2',
    glow: 'rgba(244, 63, 94, 0.70)',
    symbol: 'Crimson War Crest',
  },
  9: {
    name: 'Grand Champion',
    primary: '#F59E0B',
    secondary: '#78350F',
    light: '#FDE68A',
    highlight: '#FEF3C7',
    glow: 'rgba(245, 158, 11, 0.75)',
    symbol: 'Grandmaster Archon',
  },
  10: {
    name: 'Apex Sovereign',
    primary: '#10B981',
    secondary: '#064E3B',
    light: '#6EE7B7',
    highlight: '#ECFDF5',
    glow: 'rgba(16, 185, 129, 0.85)',
    symbol: 'Sovereign Emperor Crown',
  },
}

/**
 * Render level-specific central heraldic vector symbols
 */
const renderTierHeraldry = (lvl, uid, tier, isLocked) => {
  const p = isLocked ? '#64748B' : tier.primary
  const l = isLocked ? '#94A3B8' : tier.light
  const s = isLocked ? '#334155' : tier.secondary
  const h = isLocked ? '#CBD5E1' : tier.highlight

  switch (lvl) {
    case 1: // Bronze Swords & 4-Point Star
      return (
        <g id={`${uid}-heraldry-1`}>
          {/* Crossed Blades */}
          <path d="M 44 40 L 76 72 M 76 40 L 44 72" stroke={s} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 44 40 L 76 72 M 76 40 L 44 72" stroke={p} strokeWidth="2" strokeLinecap="round" />
          {/* Central Star */}
          <polygon points="60,45 64,53 72,56 64,59 60,67 56,59 48,56 56,53" fill={h} stroke={p} strokeWidth="1" />
          <circle cx="60" cy="56" r="2.5" fill={s} />
        </g>
      )

    case 2: // Silver Winged Blades
      return (
        <g id={`${uid}-heraldry-2`}>
          {/* Left Wing */}
          <path d="M 57 56 Q 42 46 36 36 Q 44 46 48 58 Q 54 60 57 56 Z" fill={p} stroke={l} strokeWidth="1" />
          <path d="M 57 60 Q 40 56 34 48 Q 44 56 50 63 Z" fill={s} />
          {/* Right Wing */}
          <path d="M 63 56 Q 78 46 84 36 Q 76 46 72 58 Q 66 60 63 56 Z" fill={p} stroke={l} strokeWidth="1" />
          <path d="M 63 60 Q 80 56 86 48 Q 76 56 70 63 Z" fill={s} />
          {/* Central Diamond Blade */}
          <polygon points="60,38 67,56 60,74 53,56" fill={h} stroke={p} strokeWidth="1.2" />
          <line x1="60" y1="40" x2="60" y2="72" stroke={s} strokeWidth="1" />
        </g>
      )

    case 3: // Steel Compass Star
      return (
        <g id={`${uid}-heraldry-3`}>
          {/* Outer Orbital Bezel */}
          <circle cx="60" cy="56" r="16" fill="none" stroke={s} strokeWidth="2" strokeDasharray="6 3" />
          {/* 8-Point Compass Star */}
          <polygon points="60,36 63,52 79,56 63,60 60,76 57,60 41,56 57,52" fill={p} stroke={h} strokeWidth="1.2" />
          <polygon points="60,44 62,53 71,56 62,59 60,68 58,59 49,56 58,53" fill={h} />
          <circle cx="60" cy="56" r="3" fill="#0C4A6E" stroke={h} strokeWidth="1" />
        </g>
      )

    case 4: // Platinum Aegis Shield
      return (
        <g id={`${uid}-heraldry-4`}>
          {/* Layered Platinum Chevrons */}
          <path d="M 42 48 L 60 38 L 78 48 L 78 58 L 60 70 L 42 58 Z" fill={s} stroke={p} strokeWidth="1.5" />
          <path d="M 46 50 L 60 42 L 74 50 L 74 56 L 60 66 L 46 56 Z" fill={p} stroke={l} strokeWidth="1" />
          <polygon points="60,46 68,54 60,64 52,54" fill={h} />
          <circle cx="60" cy="54" r="2.5" fill="#1E293B" />
        </g>
      )

    case 5: // Gold Guardian Imperial Crown & Phoenix Wings
      return (
        <g id={`${uid}-heraldry-5`}>
          {/* Grand Phoenix Wings */}
          <path
            d="M 58 58 Q 40 42 26 30 Q 34 46 42 56 Q 30 52 24 44 Q 32 58 46 64 Q 54 66 58 58 Z"
            fill={p}
            stroke={l}
            strokeWidth="1.2"
          />
          <path
            d="M 62 58 Q 80 42 94 30 Q 86 46 78 56 Q 90 52 96 44 Q 88 58 74 64 Q 66 66 62 58 Z"
            fill={p}
            stroke={l}
            strokeWidth="1.2"
          />
          {/* Triple-Point Imperial Crown */}
          <path
            d="M 48 46 L 50 36 L 56 42 L 60 32 L 64 42 L 70 36 L 72 46 Z"
            fill={h}
            stroke={p}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Solar Energy Core */}
          <circle cx="60" cy="56" r="9" fill={s} stroke={h} strokeWidth="1.8" />
          <polygon points="60,49 63,54 68,56 63,58 60,63 57,58 52,56 57,54" fill={h} />
          <circle cx="60" cy="56" r="2.2" fill="#78350F" />
        </g>
      )

    case 6: // Platinum Hero Angelic Wings & Amethyst Gem
      return (
        <g id={`${uid}-heraldry-6`}>
          {/* Sweeping Hero Wings */}
          <path
            d="M 58 56 Q 38 38 24 24 Q 34 42 42 54 Q 28 50 20 40 Q 30 58 48 64 Z"
            fill={s}
            stroke={p}
            strokeWidth="1.2"
          />
          <path
            d="M 62 56 Q 82 38 96 24 Q 86 42 78 54 Q 92 50 100 40 Q 90 58 72 64 Z"
            fill={s}
            stroke={p}
            strokeWidth="1.2"
          />
          {/* Faceted Amethyst Gemstone */}
          <polygon points="60,38 72,48 68,66 60,74 52,66 48,48" fill={p} stroke={h} strokeWidth="1.5" />
          <polygon points="60,42 67,49 64,62 60,68 56,62 53,49" fill={h} fillOpacity="0.85" />
          <polygon points="60,47 63,52 60,60 57,52" fill="#3B0764" />
        </g>
      )

    case 7: // Diamond Legend Celestial Gem & Dragon Crest
      return (
        <g id={`${uid}-heraldry-7`}>
          {/* Celestial Crystalline Halo */}
          <polygon points="60,26 68,36 60,40 52,36" fill={p} stroke={h} strokeWidth="1" />
          {/* Brilliant Cut Diamond */}
          <polygon points="46,44 74,44 82,54 60,76 38,54" fill={p} stroke={h} strokeWidth="1.8" />
          <polygon points="50,44 70,44 75,52 60,54 45,52" fill={h} fillOpacity="0.75" />
          <polygon points="45,52 60,54 60,72 38,54" fill={s} />
          <polygon points="75,52 60,54 60,72 82,54" fill="#0284C7" />
          <polygon points="52,46 68,46 72,50 60,52 48,50" fill="#FFFFFF" />
        </g>
      )

    case 8: // Master Vanguard Jagged War Crest & Ruby Sigil
      return (
        <g id={`${uid}-heraldry-8`}>
          {/* Double Jagged War Horns/Wings */}
          <path d="M 56 60 L 32 34 L 40 48 L 24 44 L 38 64 Z" fill={s} stroke={p} strokeWidth="1.2" />
          <path d="M 64 60 L 88 34 L 80 48 L 96 44 L 82 64 Z" fill={s} stroke={p} strokeWidth="1.2" />
          {/* Master War Shield */}
          <polygon points="60,34 76,46 72,66 60,78 48,66 44,46" fill="#1C050B" stroke={p} strokeWidth="2" />
          <polygon points="60,40 70,48 68,62 60,70 52,62 50,48" fill={p} />
          {/* Central Burning Rune */}
          <polygon points="60,46 64,54 60,62 56,54" fill={h} />
          <circle cx="60" cy="54" r="2" fill="#4C0519" />
        </g>
      )

    case 9: // Grand Champion Archon Wings & Floating Crown
      return (
        <g id={`${uid}-heraldry-9`}>
          {/* Quad Archon Wings */}
          <path d="M 58 56 Q 34 36 18 20 Q 30 42 42 56 Q 26 58 16 52 Q 30 68 50 66 Z" fill={p} stroke={l} strokeWidth="1.2" />
          <path d="M 62 56 Q 86 36 102 20 Q 90 42 78 56 Q 94 58 104 52 Q 90 68 70 66 Z" fill={p} stroke={l} strokeWidth="1.2" />
          {/* Floating Grandmaster Crown */}
          <path d="M 46 36 L 50 26 L 56 32 L 60 22 L 64 32 L 70 26 L 74 36 Z" fill={h} stroke={p} strokeWidth="1.2" />
          {/* Sovereign Core Diamond */}
          <polygon points="60,38 72,54 60,72 48,54" fill="#3B0764" stroke={h} strokeWidth="1.8" />
          <polygon points="60,44 67,54 60,64 53,54" fill={p} />
          <circle cx="60" cy="54" r="3" fill={h} />
        </g>
      )

    case 10: // Apex Sovereign Supreme Pinnacle Crest
    default:
      return (
        <g id={`${uid}-heraldry-10`}>
          {/* Majestic Celestial Wings */}
          <path
            d="M 58 56 Q 30 32 12 14 Q 26 40 40 54 Q 22 54 10 46 Q 26 66 50 66 Z"
            fill="url(#gold-wing-grad)"
            stroke="#FEF08A"
            strokeWidth="1.2"
          />
          <path
            d="M 62 56 Q 90 32 108 14 Q 94 40 80 54 Q 98 54 110 46 Q 94 66 70 66 Z"
            fill="url(#gold-wing-grad)"
            stroke="#FEF08A"
            strokeWidth="1.2"
          />
          {/* Emperor Apex Crown with Emerald Jewels */}
          <path
            d="M 42 34 L 46 20 L 54 28 L 60 16 L 66 28 L 74 20 L 78 34 Z"
            fill="#FBBF24"
            stroke="#FEF08A"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="46" cy="22" r="1.5" fill="#10B981" />
          <circle cx="60" cy="18" r="2" fill="#10B981" />
          <circle cx="74" cy="22" r="1.5" fill="#10B981" />
          {/* Emerald Cosmic Core */}
          <polygon points="60,36 74,52 60,72 46,52" fill="#064E3B" stroke="#6EE7B7" strokeWidth="2" />
          <polygon points="60,42 69,52 60,64 51,52" fill="#10B981" stroke="#ECFDF5" strokeWidth="1" />
          {/* Radiant Nova Sparkle */}
          <polygon points="60,46 62,51 67,52 62,53 60,58 58,53 53,52 58,51" fill="#FFFFFF" />
        </g>
      )
  }
}

/**
 * TierMedallion
 * World-class AAA Gaming Emblem system for all 10 VELoop progression tiers.
 */
const TierMedallion = ({
  level = 5,
  size = 68,
  status = 'completed', // 'completed' | 'current' | 'next' | 'locked'
  showStatusCorner = true,
  className = '',
}) => {
  const tier = TIER_THEMES[level] || TIER_THEMES[5]
  const levelNum = String(level).padStart(2, '0')
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
        height: `${Math.round(size * 1.07)}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        filter: isCurrent
          ? `drop-shadow(0 0 ${Math.round(size * 0.24)}px ${tier.glow})`
          : isNext
          ? `drop-shadow(0 0 ${Math.round(size * 0.16)}px ${tier.glow})`
          : isCompleted
          ? `drop-shadow(0 6px 14px rgba(0,0,0,0.7))`
          : `drop-shadow(0 2px 6px rgba(0,0,0,0.5)) opacity(0.6)`,
        transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.35s ease',
      }}
    >
      {/* Outer Ambient Corona Glow for Active Rank */}
      {isCurrent && (
        <div
          style={{
            position: 'absolute',
            inset: -6,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${tier.glow} 0%, transparent 70%)`,
            filter: 'blur(10px)',
            pointerEvents: 'none',
            animation: 'pulseSlow 2.5s infinite ease-in-out',
          }}
          aria-hidden="true"
        />
      )}

      {/* High-DPI Vector Artwork */}
      <svg
        width={size}
        height={Math.round(size * 1.07)}
        viewBox="0 0 120 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          {/* Metallic Frame Gradient */}
          <linearGradient id={`${uid}-border`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isLocked ? '#64748B' : tier.highlight} />
            <stop offset="35%" stopColor={isLocked ? '#475569' : tier.primary} />
            <stop offset="100%" stopColor={isLocked ? '#1E293B' : tier.secondary} />
          </linearGradient>

          {/* Deep Core Obsidian Void */}
          <radialGradient id={`${uid}-core`} cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor={isLocked ? '#1E2330' : isCurrent ? '#2E1A04' : '#17122A'} />
            <stop offset="100%" stopColor={isLocked ? '#0A0D14' : '#080710'} />
          </radialGradient>

          {/* Upper Specular Glaze */}
          <linearGradient id={`${uid}-glaze`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.75)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.08)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>

          {/* Banner Gradient */}
          <linearGradient id={`${uid}-banner`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isLocked ? '#1E293B' : tier.secondary} />
            <stop offset="50%" stopColor={isLocked ? '#334155' : tier.primary} />
            <stop offset="100%" stopColor={isLocked ? '#1E293B' : tier.secondary} />
          </linearGradient>

          {/* Gold Wing Gradient for Apex */}
          <linearGradient id="gold-wing-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="60%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>

        {/* Outer Shield Hull */}
        <polygon
          points="60,6 106,28 106,86 60,114 14,86 14,28"
          fill={`url(#${uid}-core)`}
          stroke={`url(#${uid}-border)`}
          strokeWidth="3.6"
          strokeLinejoin="round"
        />

        {/* Inner Engraved Bezel */}
        <polygon
          points="60,12 100,32 100,82 60,108 20,82 20,32"
          fill="none"
          stroke={`url(#${uid}-border)`}
          strokeWidth="1.2"
          strokeOpacity={isLocked ? '0.3' : '0.55'}
          strokeDasharray="4 2"
        />

        {/* Specular Light Reflection */}
        <polygon
          points="60,12 100,32 100,58 60,66 20,58 20,32"
          fill={`url(#${uid}-glaze)`}
        />

        {/* Tier Unique Central Heraldry */}
        {renderTierHeraldry(level, uid, tier, isLocked)}

        {/* Bottom Integrated Metallic Level Banner */}
        <g id={`${uid}-banner-group`}>
          {/* Banner Ribbons Background */}
          <path
            d="M 28 92 L 60 98 L 92 92 L 88 108 L 60 114 L 32 108 Z"
            fill={`url(#${uid}-banner)`}
            stroke={`url(#${uid}-border)`}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Inner Banner Highlight Line */}
          <line
            x1="36"
            y1="96"
            x2="84"
            y2="96"
            stroke={isLocked ? '#94A3B8' : tier.highlight}
            strokeWidth="0.8"
            strokeOpacity="0.8"
          />

          {/* Banner Text Label */}
          <text
            x="60"
            y="107"
            textAnchor="middle"
            fill={isLocked ? '#E2E8F0' : '#FFFFFF'}
            fontSize="10"
            fontWeight="900"
            letterSpacing="0.08em"
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.95)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            {isApex ? 'APEX 10' : `LVL ${levelNum}`}
          </text>
        </g>
      </svg>

      {/* Floating Status Corner Badge */}
      {showStatusCorner && isCompleted && (
        <div
          style={{
            position: 'absolute',
            bottom: '0px',
            right: '-3px',
            width: `${Math.max(16, Math.round(size * 0.28))}px`,
            height: `${Math.max(16, Math.round(size * 0.28))}px`,
            borderRadius: '50%',
            background: '#00E676',
            color: '#07160D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 10px rgba(0, 230, 118, 0.75)',
            border: '2px solid #090B16',
            zIndex: 4,
          }}
          title="Level Milestone Completed"
        >
          <Check size={Math.round(size * 0.16)} weight="bold" />
        </div>
      )}

      {showStatusCorner && isCurrent && (
        <div
          style={{
            position: 'absolute',
            bottom: '0px',
            right: '-3px',
            width: `${Math.max(16, Math.round(size * 0.28))}px`,
            height: `${Math.max(16, Math.round(size * 0.28))}px`,
            borderRadius: '50%',
            background: '#FBBF24',
            color: '#0E0B02',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 12px rgba(251, 191, 36, 0.9)',
            border: '2px solid #090B16',
            zIndex: 4,
            animation: 'pulseSlow 1.8s infinite ease-in-out',
          }}
          title="Current Active Rank"
        >
          <Sparkle size={Math.round(size * 0.16)} weight="fill" />
        </div>
      )}

      {showStatusCorner && isNext && (
        <div
          style={{
            position: 'absolute',
            bottom: '0px',
            right: '-3px',
            width: `${Math.max(16, Math.round(size * 0.28))}px`,
            height: `${Math.max(16, Math.round(size * 0.28))}px`,
            borderRadius: '50%',
            background: '#C084FC',
            color: '#1A072E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 12px rgba(192, 132, 252, 0.8)',
            border: '2px solid #090B16',
            zIndex: 4,
          }}
          title="Next Promotion Target"
        >
          <Crosshair size={Math.round(size * 0.16)} weight="bold" />
        </div>
      )}

      {showStatusCorner && isLocked && (
        <div
          style={{
            position: 'absolute',
            bottom: '0px',
            right: '-3px',
            width: `${Math.max(16, Math.round(size * 0.28))}px`,
            height: `${Math.max(16, Math.round(size * 0.28))}px`,
            borderRadius: '50%',
            background: '#1F2937',
            color: '#9CA3AF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.6)',
            border: '2px solid #090B16',
            zIndex: 4,
          }}
          title="Locked Rank"
        >
          <LockSimple size={Math.round(size * 0.15)} weight="bold" />
        </div>
      )}
    </div>
  )
}

export default TierMedallion
