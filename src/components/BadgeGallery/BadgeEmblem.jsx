import React, { useState, useRef } from 'react'
import TierMedallion from '../shared/TierMedallion'

/**
 * AAA 3D Badge Emblem Visualizer
 * Supports TierMedallion vector heraldry and high-definition 3D dimensional Insignia assets
 */
const BadgeEmblem = ({
  rarity = 'common',
  badgeUrl,
  tierLevel,
  size = 80,
  isUnlocked = true,
  status = 'completed',
  accentColor = '#FBBF24',
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef(null)

  const glowColors = {
    common: '#94A3B8',
    uncommon: '#38BDF8',
    rare: '#10B981',
    epic: '#818CF8',
    legendary: '#FBBF24',
    ascendant: '#C084FC',
    prismatic: '#00F5FF',
    sovereign: '#F43F5E',
    celestial: '#F59E0B',
    mythic: '#10B981',
  }

  const primaryGlow = glowColors[rarity] || accentColor

  // If this is a progression rank badge, render our AAA heraldic vector medallion directly
  if (tierLevel) {
    return (
      <TierMedallion
        level={tierLevel}
        size={size}
        status={status}
        showStatusCorner={false}
      />
    )
  }

  // Handle pointer tilt physics for bespoke 3D badges
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width
    const relY = (e.clientY - rect.top) / rect.height
    setTilt({
      x: -(relY - 0.5) * 22,
      y: (relX - 0.5) * 22,
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        perspective: '900px',
        userSelect: 'none',
      }}
    >
      {/* Ambient Volumetric Backlight Glow */}
      <div
        style={{
          position: 'absolute',
          inset: -8,
          borderRadius: '50%',
          background: isUnlocked
            ? `radial-gradient(circle, ${primaryGlow}55 0%, transparent 70%)`
            : 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
          filter: 'blur(14px)',
          pointerEvents: 'none',
          transition: 'all 0.3s ease',
        }}
        aria-hidden="true"
      />

      {/* Floating 3D Artwork Anchor */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isHovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.08) translateZ(12px)`
            : 'rotateX(0deg) rotateY(0deg) scale(1) translateZ(0)',
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {badgeUrl ? (
          <img
            src={badgeUrl}
            alt=""
            aria-hidden="true"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              objectFit: 'contain',
              position: 'relative',
              zIndex: 2,
              filter: isUnlocked
                ? `drop-shadow(0 10px 24px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 16px ${primaryGlow}60)`
                : 'grayscale(0.40) brightness(0.85) contrast(1.15) drop-shadow(0 6px 14px rgba(0,0,0,0.75))',
              transition: 'filter 0.3s ease',
            }}
          />
        ) : (
          <span
            style={{
              fontSize: size * 0.35,
              fontWeight: 900,
              color: isUnlocked ? primaryGlow : '#71717A',
              zIndex: 2,
              position: 'relative',
            }}
          >
            ★
          </span>
        )}
      </div>

      {/* Grounding Holographic Dais Base */}
      <div
        style={{
          position: 'absolute',
          bottom: '-6px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${Math.round(size * 0.85)}px`,
          height: '14px',
          borderRadius: '50%',
          background: isUnlocked
            ? `radial-gradient(ellipse, ${primaryGlow}50 0%, rgba(0, 0, 0, 0.7) 45%, transparent 75%)`
            : 'radial-gradient(ellipse, rgba(0, 0, 0, 0.8) 0%, transparent 70%)',
          filter: 'blur(3px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
        aria-hidden="true"
      />
    </div>
  )
}

export default BadgeEmblem
