import React, { useState, useRef, useEffect } from 'react'
import { Check, Crosshair, LockSimple } from '@phosphor-icons/react'
import BespokeHeraldry from './BespokeHeraldry'

/**
 * Authentic metallic color palettes, silhouettes, and heraldry per tier
 */
export const TIER_CONFIGS = {
  1: {
    level: 1,
    name: 'Bronze Initiate',
    silhouette: 'Gladiator Vanguard Buckler with 8 Steel Studs & Crossed Gladius Swords',
    primary: '#CD7F32',
    secondary: '#7A3E10',
    light: '#F5A962',
    highlight: '#FFE3CC',
    glow: 'rgba(205, 127, 50, 0.55)',
    bannerText: 'LVL 01',
    rarity: 'Common',
    assetUrl: '/assets/ranks/rank-lvl-01.png',
  },
  2: {
    level: 2,
    name: 'Silver Scout',
    silhouette: 'Supersonic Falcon Aegis with Polished Silver Wings & Blue Topaz Core',
    primary: '#CBD5E1',
    secondary: '#475569',
    light: '#E2E8F0',
    highlight: '#FFFFFF',
    glow: 'rgba(56, 189, 248, 0.55)',
    bannerText: 'LVL 02',
    rarity: 'Uncommon',
    assetUrl: '/assets/ranks/rank-lvl-02.png',
  },
  3: {
    level: 3,
    name: 'Emerald Ranger',
    silhouette: 'Gothic Obsidian Kite Shield with Emerald Blades & Radioactive Core',
    primary: '#10B981',
    secondary: '#065F46',
    light: '#6EE7B7',
    highlight: '#D1FAE5',
    glow: 'rgba(16, 185, 129, 0.60)',
    bannerText: 'LVL 03',
    rarity: 'Rare',
    assetUrl: '/assets/ranks/rank-lvl-03.png',
  },
  4: {
    level: 4,
    name: 'Sapphire Knight',
    silhouette: 'Hexagonal Titanium Pavise with Crossed Broadswords & Sapphire Reactor',
    primary: '#3B82F6',
    secondary: '#1E3A8A',
    light: '#93C5FD',
    highlight: '#DBEAFE',
    glow: 'rgba(59, 130, 246, 0.65)',
    bannerText: 'LVL 04',
    rarity: 'Epic',
    assetUrl: '/assets/ranks/rank-lvl-04.png',
  },
  5: {
    level: 5,
    name: 'Gold Guardian',
    silhouette: 'Imperial Sovereign Sun-Eagle with 5-Tier Gold Wings & Crown',
    primary: '#FBBF24',
    secondary: '#B45309',
    light: '#FEF08A',
    highlight: '#FFFBEB',
    glow: 'rgba(251, 191, 36, 0.55)',
    bannerText: 'LVL 05',
    rarity: 'Legendary',
    assetUrl: '/assets/ranks/rank-lvl-05.png',
  },
  6: {
    level: 6,
    name: 'Platinum Hero',
    silhouette: 'Cryo-Amethyst Hyper-Disc with Floating Shards & Ultraviolet Singularity',
    primary: '#C084FC',
    secondary: '#6B21A8',
    light: '#F3E8FF',
    highlight: '#FAF5FF',
    glow: 'rgba(192, 132, 252, 0.80)',
    bannerText: 'LVL 06',
    rarity: 'Ascendant',
    assetUrl: '/assets/ranks/rank-lvl-06.png',
  },
  7: {
    level: 7,
    name: 'Diamond Champion',
    silhouette: 'Prismatic Star-Vanguard with 8-Point Diamond Star & Cyan Reticle',
    primary: '#00F5FF',
    secondary: '#0369A1',
    light: '#A5F3FC',
    highlight: '#FFFFFF',
    glow: 'rgba(0, 245, 255, 0.80)',
    bannerText: 'LVL 07',
    rarity: 'Prismatic',
    assetUrl: '/assets/ranks/rank-lvl-07.png',
  },
  8: {
    level: 8,
    name: 'Obsidian Sovereign',
    silhouette: 'Molten Void-Dragon Pavise with Magma Fissures & Dark Matter Core',
    primary: '#F43F5E',
    secondary: '#881337',
    light: '#FDE68A',
    highlight: '#FFF1F2',
    glow: 'rgba(244, 63, 94, 0.85)',
    bannerText: 'LVL 08',
    rarity: 'Sovereign',
    assetUrl: '/assets/ranks/rank-lvl-08.png',
  },
  9: {
    level: 9,
    name: 'Celestial Ascendant',
    silhouette: 'Supernova Corona with Stellar Crown, Gyro Ring & Burning Solar Wings',
    primary: '#F59E0B',
    secondary: '#78350F',
    light: '#38BDF8',
    highlight: '#FEF3C7',
    glow: 'rgba(245, 158, 11, 0.85)',
    bannerText: 'LVL 09',
    rarity: 'Celestial',
    assetUrl: '/assets/ranks/rank-lvl-09.png',
  },
  10: {
    level: 10,
    name: 'Mythic Legend',
    silhouette: 'Transcendent Cosmic Relic with Iridescent Phoenix Wings & Rainbow Aurora',
    primary: '#10B981',
    secondary: '#A855F7',
    light: '#FBBF24',
    highlight: '#FFFFFF',
    glow: 'rgba(16, 185, 129, 0.90)',
    bannerText: 'MYTHIC 10',
    rarity: 'Mythic',
    assetUrl: '/assets/ranks/rank-lvl-10.png',
  },
}

/**
 * AAA Interactive 3D TierMedallion Component
 * Features:
 * - High-definition artisanal vector artwork from public/assets/lvl-*.svg
 * - Interactive pointer-based 3D gyroscopic tilt and parallax
 * - Dynamic cursor-following specular holographic sheen glint
 * - Ambient tier energy corona bloom & floating micro-spark particles
 * - Dedicated non-overlapping die-cast level pill with zero clipping
 * - Dynamic status corner pin (Completed, Active, Next, Locked)
 * - Micro-spring click/touch feedback
 */
const TierMedallion = ({
  level = 5,
  size = 72,
  status = 'completed', // 'completed' | 'current' | 'next' | 'locked'
  showStatusCorner = true,
  showRibbon = false,
  interactive = true,
  className = '',
  style = {},
  onClick,
}) => {
  const tier = TIER_CONFIGS[level] || TIER_CONFIGS[5]
  const isCurrent = status === 'current'
  const isCompleted = status === 'completed'
  const isNext = status === 'next'
  const isLocked = status === 'locked'

  const containerRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [sheen, setSheen] = useState({ x: 50, y: 50, active: false })
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [imgError, setImgError] = useState(false)

  // Handle dynamic pointer tilt & specular glint tracking
  const handleMouseMove = (e) => {
    if (!interactive || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width
    const relY = (e.clientY - rect.top) / rect.height

    const maxTilt = 18 // max degrees
    const tiltY = (relX - 0.5) * maxTilt * 2
    const tiltX = -(relY - 0.5) * maxTilt * 2

    setTilt({ x: tiltX, y: tiltY })
    setSheen({
      x: Math.round(relX * 100),
      y: Math.round(relY * 100),
      active: true,
    })
  }

  const handleMouseEnter = () => {
    if (!interactive) return
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    if (!interactive) return
    setIsHovered(false)
    setIsPressed(false)
    setTilt({ x: 0, y: 0 })
    setSheen({ x: 50, y: 50, active: false })
  }

  const handleTouchStart = () => {
    if (!interactive) return
    setIsHovered(true)
    setTilt({ x: 10, y: -12 })
    setSheen({ x: 65, y: 35, active: true })
  }

  const handleTouchEnd = () => {
    if (!interactive) return
    setTimeout(() => {
      setIsHovered(false)
      setTilt({ x: 0, y: 0 })
      setSheen({ x: 50, y: 50, active: false })
    }, 450)
  }

  // Proportional sizing & Optical Visual Weight Normalization
  const medallionHeight = Math.round(size * 0.92)
  const totalHeight = showRibbon ? Math.round(size * 1.22) : medallionHeight

  // Optical scale normalization: wide winged tiers (L3-L5) vs compact round bucklers (L1)
  const TIER_SCALE_FACTORS = {
    1: 1.05,
    2: 1.05,
    3: 1.05,
    4: 1.05,
    5: 1.05,
    6: 1.05,
    7: 1.05,
    8: 1.05,
    9: 1.05,
    10: 1.05,
  }
  const opticalScale = TIER_SCALE_FACTORS[level] || 1.05

  // Dynamic status glow & filter
  const getFilterStyle = () => {
    if (isCurrent) {
      return `drop-shadow(0 6px 14px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 ${Math.round(size * 0.12)}px ${tier.glow})`
    }
    if (isNext) {
      return `drop-shadow(0 4px 12px rgba(0, 0, 0, 0.65)) drop-shadow(0 0 ${Math.round(size * 0.10)}px ${tier.glow})`
    }
    if (isCompleted) {
      return `drop-shadow(0 6px 16px rgba(0,0,0,0.65))`
    }
    // Locked — smoke-glass preview preserving distinct heraldic crest silhouette
    return isHovered
      ? `grayscale(0.20) brightness(0.95) contrast(1.15) drop-shadow(0 4px 12px rgba(0,0,0,0.75)) drop-shadow(0 0 10px ${tier.glow})`
      : `grayscale(0.35) brightness(0.85) contrast(1.18) drop-shadow(0 3px 8px rgba(0,0,0,0.65))`
  }

  return (
    <div
      ref={containerRef}
      className={`tier-medallion-container ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={() => interactive && setIsPressed(true)}
      onMouseUp={() => interactive && setIsPressed(false)}
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${totalHeight}px`,
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexShrink: 0,
        perspective: '900px',
        cursor: onClick ? 'pointer' : interactive ? 'grab' : 'default',
        userSelect: 'none',
        ...style,
      }}
      role="img"
      aria-label={`${tier.name} Level ${level} Badge, ${status}`}
    >
      {/* 1. Ambient Energy Corona Bloom */}
      {(isCurrent || isHovered) && (
        <div
          style={{
            position: 'absolute',
            top: '4px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: `${Math.round(size * 0.95)}px`,
            height: `${Math.round(medallionHeight * 0.95)}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${tier.glow} 0%, transparent 72%)`,
            filter: 'blur(12px)',
            opacity: isCurrent ? 0.42 : 0.28,
            pointerEvents: 'none',
            animation: isCurrent ? 'pulseSlow 2.4s infinite ease-in-out' : 'none',
            zIndex: 0,
            transition: 'opacity 0.3s ease',
          }}
          aria-hidden="true"
        />
      )}

      {/* 2. Interactive 3D Rotator Stage */}
      <div
        style={{
          position: 'relative',
          width: `${size}px`,
          height: `${medallionHeight}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${
            (isPressed ? 0.95 : isHovered ? 1.08 : 1) * opticalScale
          }) translateZ(${isHovered ? 12 : 0}px)`,
          transition: isHovered
            ? 'transform 0.08s ease-out, filter 0.2s ease'
            : 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease',
          filter: getFilterStyle(),
          zIndex: 1,
        }}
      >
        {/* Floating Idle Elevation for Current Active Rank */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: isCurrent ? 'floatIdle 3.4s infinite ease-in-out' : 'none',
          }}
        >
          {/* Authentic AAA 3D Esports Rank Insignia */}
          {!imgError ? (
            <img
              src={`${tier.assetUrl}?v=3d-insignia`}
              alt={`${tier.name} Rank Insignia`}
              draggable={false}
              onError={() => setImgError(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                pointerEvents: 'none',
                filter: isLocked && !isHovered
                  ? 'grayscale(0.4) brightness(0.75) contrast(1.15) drop-shadow(0 4px 10px rgba(0,0,0,0.8))'
                  : 'drop-shadow(0 8px 18px rgba(0,0,0,0.75))',
                transition: 'filter 0.3s ease, transform 0.3s ease',
              }}
            />
          ) : (
            <BespokeHeraldry
              level={level}
              size={size}
              isLocked={isLocked && !isHovered}
              isCurrent={isCurrent}
            />
          )}

          {/* Interactive Cursor-Tracking Holographic Specular Glint */}
          {interactive && sheen.active && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: `radial-gradient(circle at ${sheen.x}% ${sheen.y}%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.12) 35%, transparent 70%)`,
                mixBlendMode: 'overlay',
                pointerEvents: 'none',
                opacity: 1,
              }}
              aria-hidden="true"
            />
          )}

          {/* Locked Scanline Teaser on Hover */}
          {isLocked && isHovered && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '16px',
                background: 'linear-gradient(180deg, transparent 0%, rgba(0, 245, 255, 0.15) 50%, transparent 100%)',
                animation: 'shimmerSweep 1.5s infinite linear',
                pointerEvents: 'none',
              }}
              aria-hidden="true"
            />
          )}
        </div>
      </div>

      {/* 3. Dedicated Non-Overlapping Die-Cast Level Pill */}
      {showRibbon && (
        <div
          style={{
            marginTop: '6px',
            padding: `${Math.max(2, Math.round(size * 0.03))}px ${Math.max(6, Math.round(size * 0.12))}px`,
            borderRadius: '999px',
            background: isLocked
              ? '#141A24'
              : `linear-gradient(135deg, ${tier.secondary} 0%, ${tier.primary} 50%, ${tier.secondary} 100%)`,
            border: `1px solid ${isLocked ? '#334155' : tier.highlight}`,
            boxShadow: isCurrent
              ? `0 0 10px ${tier.glow}, 0 2px 6px rgba(0,0,0,0.8)`
              : '0 2px 6px rgba(0,0,0,0.7)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
            transform: isHovered ? 'translateY(1px) scale(1.04)' : 'none',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
        >
          <span
            style={{
              color: isLocked ? '#94A3B8' : '#FFFFFF',
              fontSize: `${Math.max(9, Math.round(size * 0.13))}px`,
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textShadow: '0 1px 3px rgba(0,0,0,0.9)',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              lineHeight: 1,
            }}
          >
            {tier.bannerText}
          </span>
        </div>
      )}

      {/* 4. Floating Status Corner Badge Pin */}
      {showStatusCorner && isCompleted && (
        <div
          style={{
            position: 'absolute',
            top: showRibbon ? `${Math.round(medallionHeight * 0.72)}px` : 'auto',
            bottom: showRibbon ? 'auto' : '2px',
            right: '-2px',
            width: `${Math.max(16, Math.round(size * 0.28))}px`,
            height: `${Math.max(16, Math.round(size * 0.28))}px`,
            borderRadius: '50%',
            background: 'var(--state-completed)',
            color: '#07160D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 10px rgba(0, 230, 118, 0.85)',
            border: '2px solid #090B16',
            zIndex: 4,
          }}
          title="Level Milestone Completed"
          aria-label="Completed"
        >
          <Check size={Math.round(size * 0.16)} weight="bold" />
        </div>
      )}



      {showStatusCorner && isNext && (
        <div
          style={{
            position: 'absolute',
            top: showRibbon ? `${Math.round(medallionHeight * 0.72)}px` : 'auto',
            bottom: showRibbon ? 'auto' : '2px',
            right: '-2px',
            width: `${Math.max(16, Math.round(size * 0.28))}px`,
            height: `${Math.max(16, Math.round(size * 0.28))}px`,
            borderRadius: '50%',
            background: 'var(--state-next)',
            color: '#1A072E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 12px rgba(192, 132, 252, 0.85)',
            border: '2px solid #090B16',
            zIndex: 4,
          }}
          title="Next Promotion Target"
          aria-label="Target Goal"
        >
          <Crosshair size={Math.round(size * 0.16)} weight="bold" />
        </div>
      )}

      {showStatusCorner && isLocked && (
        <div
          style={{
            position: 'absolute',
            top: showRibbon ? `${Math.round(medallionHeight * 0.72)}px` : 'auto',
            bottom: showRibbon ? 'auto' : '2px',
            right: '-2px',
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
          aria-label="Locked"
        >
          <LockSimple size={Math.round(size * 0.15)} weight="bold" />
        </div>
      )}
    </div>
  )
}

export default TierMedallion