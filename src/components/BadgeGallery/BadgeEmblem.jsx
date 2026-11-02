import React from 'react'

/**
 * Custom metallic SVG Badge Emblem with rich 3D cyber styling
 */
const BadgeEmblem = ({
  rarity = 'common',
  badgeUrl,
  tierLevel,
  size = 64,
  isUnlocked = true,
  accentColor = '#FBBF24',
}) => {
  const glowColors = {
    common: '#94A3B8',
    rare: '#00F5FF',
    epic: '#C084FC',
    legendary: '#FBBF24',
    exclusive: '#00E676',
  }

  const primaryGlow = glowColors[rarity] || accentColor

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {/* Ambient Radial Backlight */}
      <div
        style={{
          position: 'absolute',
          inset: -6,
          borderRadius: '50%',
          background: isUnlocked
            ? `radial-gradient(circle, ${primaryGlow}40 0%, transparent 70%)`
            : 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)',
          filter: 'blur(8px)',
          pointerEvents: 'none',
        }}
      />

      {/* Outer Hex/Octagon Bezel */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: 0 }}
      >
        <defs>
          <linearGradient id={`bezel-grad-${rarity}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isUnlocked ? primaryGlow : '#3A3F60'} />
            <stop offset="50%" stopColor={isUnlocked ? '#1E1838' : '#141224'} />
            <stop offset="100%" stopColor={isUnlocked ? primaryGlow : '#25203A'} />
          </linearGradient>
          <linearGradient id={`inner-grad-${rarity}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isUnlocked ? '#1A1434' : '#0B0916'} />
            <stop offset="100%" stopColor={isUnlocked ? '#0B0718' : '#07050E'} />
          </linearGradient>
        </defs>

        {/* Outer Shield Hexagon */}
        <polygon
          points="50,4 92,26 92,74 50,96 8,74 8,26"
          fill={`url(#inner-grad-${rarity})`}
          stroke={`url(#bezel-grad-${rarity})`}
          strokeWidth="3.5"
          filter={isUnlocked ? `drop-shadow(0 0 6px ${primaryGlow}50)` : 'none'}
        />

        {/* Inner Engraved Accent Track */}
        <polygon
          points="50,11 85,29 85,71 50,89 15,71 15,29"
          fill="none"
          stroke={isUnlocked ? `${primaryGlow}50` : 'rgba(255, 255, 255, 0.08)'}
          strokeWidth="1.2"
          strokeDasharray="4 2"
        />

        {/* Corner Cyber Accents */}
        <circle cx="50" cy="11" r="2" fill={isUnlocked ? primaryGlow : '#555'} />
        <circle cx="85" cy="29" r="2" fill={isUnlocked ? primaryGlow : '#555'} />
        <circle cx="85" cy="71" r="2" fill={isUnlocked ? primaryGlow : '#555'} />
        <circle cx="50" cy="89" r="2" fill={isUnlocked ? primaryGlow : '#555'} />
        <circle cx="15" cy="71" r="2" fill={isUnlocked ? primaryGlow : '#555'} />
        <circle cx="15" cy="29" r="2" fill={isUnlocked ? primaryGlow : '#555'} />
      </svg>

      {/* Foreground Artwork (SVG or Fallback) */}
      {badgeUrl ? (
        <img
          src={badgeUrl}
          alt=""
          aria-hidden="true"
          style={{
            width: size * 0.58,
            height: size * 0.58,
            objectFit: 'contain',
            position: 'relative',
            zIndex: 2,
            filter: isUnlocked
              ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))'
              : 'grayscale(90%) opacity(45%)',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
          {tierLevel ? `L${tierLevel}` : '★'}
        </span>
      )}
    </div>
  )
}

export default BadgeEmblem
