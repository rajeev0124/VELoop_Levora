import React from 'react'

/**
 * AAA Bespoke Heraldic Crests & Gaming Achievement Badges
 * Designed to replace basic icon-in-circle graphics with true gaming heraldry.
 * Each tier has a 100% unique geometric silhouette, distinct metallic material,
 * and high-end gaming aesthetic (Rockstar / PlayStation / Riot standard).
 */

export const HeraldryBronze = ({ size = 72, isLocked = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: isLocked ? 'grayscale(0.7) brightness(0.7)' : 'drop-shadow(0 6px 14px rgba(205, 127, 50, 0.45))' }}
  >
    <defs>
      <linearGradient id="bronzeRim" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F5A962" />
        <stop offset="25%" stopColor="#CD7F32" />
        <stop offset="50%" stopColor="#8C4A15" />
        <stop offset="75%" stopColor="#E2924E" />
        <stop offset="100%" stopColor="#4A2609" />
      </linearGradient>
      <radialGradient id="bronzeCore" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#E2924E" />
        <stop offset="40%" stopColor="#CD7F32" />
        <stop offset="75%" stopColor="#5C2E0B" />
        <stop offset="100%" stopColor="#2D1504" />
      </radialGradient>
      <linearGradient id="bronzeIron" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#78716C" />
        <stop offset="50%" stopColor="#44403C" />
        <stop offset="100%" stopColor="#1C1917" />
      </linearGradient>
      <linearGradient id="bronzeGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFBEB" />
        <stop offset="50%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>

    {/* Crossed Gladius Blades Behind Shield */}
    <path d="M18 18 L34 34 M18 18 L22 14 L36 30 L32 34 Z" fill="url(#bronzeIron)" stroke="#A8A29E" strokeWidth="0.5" />
    <path d="M82 18 L66 34 M82 18 L78 14 L64 30 L68 34 Z" fill="url(#bronzeIron)" stroke="#A8A29E" strokeWidth="0.5" />
    <path d="M24 82 L38 68 M24 82 L20 78 L34 64 L38 68 Z" fill="url(#bronzeIron)" stroke="#A8A29E" strokeWidth="0.5" />
    <path d="M76 82 L62 68 M76 82 L80 78 L66 64 L62 68 Z" fill="url(#bronzeIron)" stroke="#A8A29E" strokeWidth="0.5" />

    {/* Outer Heavy Studded Bronze Buckler Rim */}
    <circle cx="50" cy="50" r="42" fill="url(#bronzeRim)" stroke="#FFE3CC" strokeWidth="1" />
    <circle cx="50" cy="50" r="38" fill="url(#bronzeIron)" stroke="#292524" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="32" fill="url(#bronzeCore)" stroke="#F5A962" strokeWidth="1.2" />

    {/* 8 Steel Rivet Studs */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
      const rad = (angle * Math.PI) / 180
      const cx = 50 + 35 * Math.cos(rad)
      const cy = 50 + 35 * Math.sin(rad)
      return (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="2.4"
          fill="#E7E5E4"
          stroke="#44403C"
          strokeWidth="0.75"
        />
      )
    })}

    {/* Inner Heraldic Spike Star Emblem */}
    <path
      d="M50 26 L53 43 L70 43 L56 53 L61 70 L50 59 L39 70 L44 53 L30 43 L47 43 Z"
      fill="url(#bronzeGold)"
      stroke="#7A3E10"
      strokeWidth="1"
      filter="drop-shadow(0 2px 4px rgba(0,0,0,0.6))"
    />
    <circle cx="50" cy="50" r="4.5" fill="#FFFBEB" stroke="#B45309" strokeWidth="1" />
  </svg>
)

export const HeraldrySilver = ({ size = 72, isLocked = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: isLocked ? 'grayscale(0.7) brightness(0.7)' : 'drop-shadow(0 6px 16px rgba(56, 189, 248, 0.5))' }}
  >
    <defs>
      <linearGradient id="silverWingL" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="40%" stopColor="#CBD5E1" />
        <stop offset="80%" stopColor="#64748B" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
      <linearGradient id="silverPlate" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F8FAFC" />
        <stop offset="35%" stopColor="#E2E8F0" />
        <stop offset="70%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
      <radialGradient id="silverTopaz" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#E0F2FE" />
        <stop offset="40%" stopColor="#38BDF8" />
        <stop offset="80%" stopColor="#0284C7" />
        <stop offset="100%" stopColor="#0C4A6E" />
      </radialGradient>
    </defs>

    {/* Left Flared Raptor Wing Feathers */}
    <path d="M22 28 C12 32 4 44 6 56 C14 54 22 48 26 42 Z" fill="url(#silverWingL)" stroke="#E2E8F0" strokeWidth="0.8" />
    <path d="M24 38 C14 44 8 56 12 68 C20 62 26 54 28 48 Z" fill="url(#silverWingL)" stroke="#E2E8F0" strokeWidth="0.8" />
    <path d="M26 50 C18 58 14 70 20 78 C26 70 30 62 32 56 Z" fill="url(#silverWingL)" stroke="#E2E8F0" strokeWidth="0.8" />

    {/* Right Flared Raptor Wing Feathers */}
    <path d="M78 28 C88 32 96 44 94 56 C86 54 78 48 74 42 Z" fill="url(#silverWingL)" stroke="#E2E8F0" strokeWidth="0.8" />
    <path d="M76 38 C86 44 92 56 88 68 C80 62 74 54 72 48 Z" fill="url(#silverWingL)" stroke="#E2E8F0" strokeWidth="0.8" />
    <path d="M74 50 C82 58 86 70 80 78 C74 70 70 62 68 56 Z" fill="url(#silverWingL)" stroke="#E2E8F0" strokeWidth="0.8" />

    {/* Central Winged Aegis Shield Face */}
    <path
      d="M50 16 L72 26 C72 50 64 74 50 86 C36 74 28 50 28 26 Z"
      fill="url(#silverPlate)"
      stroke="#FFFFFF"
      strokeWidth="1.5"
      filter="drop-shadow(0 4px 10px rgba(0,0,0,0.5))"
    />
    <path
      d="M50 22 L66 30 C66 48 59 68 50 78 C41 68 34 48 34 30 Z"
      fill="#0F172A"
      stroke="#38BDF8"
      strokeWidth="1"
    />

    {/* Inset Glowing Blue Topaz Gem */}
    <polygon
      points="50,34 60,48 50,66 40,48"
      fill="url(#silverTopaz)"
      stroke="#BAE6FD"
      strokeWidth="1.2"
      filter="drop-shadow(0 0 8px rgba(56, 189, 248, 0.8))"
    />
    <polygon points="50,38 56,48 50,52 44,48" fill="#FFFFFF" opacity="0.8" />
  </svg>
)

export const HeraldryEmerald = ({ size = 72, isLocked = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: isLocked ? 'grayscale(0.7) brightness(0.7)' : 'drop-shadow(0 6px 16px rgba(16, 185, 129, 0.55))' }}
  >
    <defs>
      <linearGradient id="emGoldBevel" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="40%" stopColor="#EAB308" />
        <stop offset="80%" stopColor="#A16207" />
        <stop offset="100%" stopColor="#713F12" />
      </linearGradient>
      <radialGradient id="emCrystalCore" cx="40%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#A7F3D0" />
        <stop offset="35%" stopColor="#34D399" />
        <stop offset="70%" stopColor="#059669" />
        <stop offset="100%" stopColor="#022C22" />
      </radialGradient>
      <linearGradient id="emLaurel" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6EE7B7" />
        <stop offset="60%" stopColor="#059669" />
        <stop offset="100%" stopColor="#064E3B" />
      </linearGradient>
    </defs>

    {/* Laurel Filigree Wreaths Flanking the Shield */}
    <path d="M22 36 C16 42 16 52 20 62 C22 56 26 50 26 44 Z" fill="url(#emLaurel)" stroke="#A7F3D0" strokeWidth="0.6" />
    <path d="M18 48 C14 56 16 66 22 74 C24 66 28 60 26 54 Z" fill="url(#emLaurel)" stroke="#A7F3D0" strokeWidth="0.6" />
    <path d="M78 36 C84 42 84 52 80 62 C78 56 74 50 74 44 Z" fill="url(#emLaurel)" stroke="#A7F3D0" strokeWidth="0.6" />
    <path d="M82 48 C86 56 84 66 78 74 C76 66 72 60 74 54 Z" fill="url(#emLaurel)" stroke="#A7F3D0" strokeWidth="0.6" />

    {/* Elongated Gothic Kite Shield Silhouette */}
    <path
      d="M50 14 L74 22 C74 44 64 74 50 90 C36 74 26 44 26 22 Z"
      fill="url(#emGoldBevel)"
      stroke="#FEF08A"
      strokeWidth="1.5"
      filter="drop-shadow(0 4px 12px rgba(0,0,0,0.6))"
    />
    <path
      d="M50 19 L68 26 C68 44 60 68 50 82 C40 68 32 44 32 26 Z"
      fill="#06251C"
      stroke="#10B981"
      strokeWidth="1"
    />

    {/* Faceted Forest Emerald Crystal Centerpiece */}
    <polygon
      points="50,28 64,42 50,72 36,42"
      fill="url(#emCrystalCore)"
      stroke="#A7F3D0"
      strokeWidth="1.2"
      filter="drop-shadow(0 0 10px rgba(52, 211, 153, 0.75))"
    />
    <polygon points="50,28 58,42 50,48 42,42" fill="#FFFFFF" opacity="0.6" />
  </svg>
)

export const HeraldrySapphire = ({ size = 72, isLocked = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: isLocked ? 'grayscale(0.7) brightness(0.7)' : 'drop-shadow(0 6px 18px rgba(59, 130, 246, 0.6))' }}
  >
    <defs>
      <linearGradient id="saphBlade" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
      <linearGradient id="saphRim" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#93C5FD" />
        <stop offset="35%" stopColor="#3B82F6" />
        <stop offset="70%" stopColor="#1D4ED8" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
      <radialGradient id="saphCore" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#BFDBFE" />
        <stop offset="35%" stopColor="#60A5FA" />
        <stop offset="70%" stopColor="#1E40AF" />
        <stop offset="100%" stopColor="#09122C" />
      </radialGradient>
    </defs>

    {/* Crossed Titanium Knight Broadswords Behind Shield */}
    <path d="M12 14 L42 44 M12 14 L16 10 L44 38 L40 42 Z" fill="url(#saphBlade)" stroke="#CBD5E1" strokeWidth="0.8" />
    <path d="M88 14 L58 44 M88 14 L84 10 L56 38 L60 42 Z" fill="url(#saphBlade)" stroke="#CBD5E1" strokeWidth="0.8" />
    {/* Sword Guards and Pommels */}
    <circle cx="14" cy="12" r="3.5" fill="#FBBF24" stroke="#B45309" strokeWidth="0.8" />
    <circle cx="86" cy="12" r="3.5" fill="#FBBF24" stroke="#B45309" strokeWidth="0.8" />

    {/* Hexagonal Adamantine Knight's Pavise Shield */}
    <polygon
      points="50,18 78,28 78,64 50,88 22,64 22,28"
      fill="url(#saphRim)"
      stroke="#DBEAFE"
      strokeWidth="1.5"
      filter="drop-shadow(0 4px 14px rgba(0,0,0,0.65))"
    />
    <polygon
      points="50,23 72,31 72,61 50,81 28,61 28,31"
      fill="#091836"
      stroke="#38BDF8"
      strokeWidth="1.2"
    />

    {/* Inset Deep Cobalt Sapphire Hex Core */}
    <polygon
      points="50,32 64,42 64,60 50,70 36,60 36,42"
      fill="url(#saphCore)"
      stroke="#93C5FD"
      strokeWidth="1.5"
      filter="drop-shadow(0 0 12px rgba(59, 130, 246, 0.85))"
    />
    <polygon points="50,34 60,42 50,48 40,42" fill="#FFFFFF" opacity="0.75" />
    <polygon points="50,48 60,42 60,58 50,66" fill="#1D4ED8" opacity="0.6" />
  </svg>
)

export const HeraldryGold = ({ size = 72, isLocked = false, isCurrent = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      filter: isLocked
        ? 'grayscale(0.7) brightness(0.7)'
        : 'drop-shadow(0 0 16px rgba(251, 191, 36, 0.75)) drop-shadow(0 8px 24px rgba(0, 0, 0, 0.8))',
    }}
  >
    <defs>
      <linearGradient id="goldWingGrand" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFBEB" />
        <stop offset="25%" stopColor="#FDE68A" />
        <stop offset="55%" stopColor="#F59E0B" />
        <stop offset="85%" stopColor="#B45309" />
        <stop offset="100%" stopColor="#78350F" />
      </linearGradient>
      <linearGradient id="goldCrownBar" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#92400E" />
      </linearGradient>
      <radialGradient id="goldSolarCore" cx="45%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="25%" stopColor="#FEF08A" />
        <stop offset="60%" stopColor="#F59E0B" />
        <stop offset="85%" stopColor="#9A3412" />
        <stop offset="100%" stopColor="#451A03" />
      </radialGradient>
      <linearGradient id="goldRimSweep" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFBEB" />
        <stop offset="35%" stopColor="#FBBF24" />
        <stop offset="70%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#451A03" />
      </linearGradient>
    </defs>

    {/* Grand Sprawling Left Eagle Wings (5 Tiers of Feathers) */}
    <path d="M30 32 C18 24 6 30 2 40 C10 42 20 40 28 42 Z" fill="url(#goldWingGrand)" stroke="#FEF08A" strokeWidth="0.8" />
    <path d="M30 40 C16 36 6 46 4 56 C14 54 22 50 28 50 Z" fill="url(#goldWingGrand)" stroke="#FEF08A" strokeWidth="0.8" />
    <path d="M30 48 C18 48 8 60 8 70 C18 64 24 58 28 58 Z" fill="url(#goldWingGrand)" stroke="#FEF08A" strokeWidth="0.8" />
    <path d="M32 56 C22 62 14 74 16 82 C24 74 28 66 30 64 Z" fill="url(#goldWingGrand)" stroke="#FEF08A" strokeWidth="0.8" />

    {/* Grand Sprawling Right Eagle Wings (5 Tiers of Feathers) */}
    <path d="M70 32 C82 24 94 30 98 40 C90 42 80 40 72 42 Z" fill="url(#goldWingGrand)" stroke="#FEF08A" strokeWidth="0.8" />
    <path d="M70 40 C84 36 94 46 96 56 C86 54 78 50 72 50 Z" fill="url(#goldWingGrand)" stroke="#FEF08A" strokeWidth="0.8" />
    <path d="M70 48 C82 48 92 60 92 70 C82 64 76 58 72 58 Z" fill="url(#goldWingGrand)" stroke="#FEF08A" strokeWidth="0.8" />
    <path d="M68 56 C78 62 86 74 84 82 C76 74 72 66 70 64 Z" fill="url(#goldWingGrand)" stroke="#FEF08A" strokeWidth="0.8" />

    {/* Imperial Coronet Crown on Apex */}
    <path
      d="M36 24 L42 30 L50 20 L58 30 L64 24 L60 34 L40 34 Z"
      fill="url(#goldCrownBar)"
      stroke="#FFFBEB"
      strokeWidth="1"
      filter="drop-shadow(0 2px 6px rgba(0,0,0,0.6))"
    />
    <circle cx="50" cy="18" r="2.5" fill="#FFFFFF" filter="drop-shadow(0 0 4px #FEF08A)" />
    <circle cx="36" cy="22" r="1.8" fill="#FFFFFF" />
    <circle cx="64" cy="22" r="1.8" fill="#FFFFFF" />

    {/* Central Royal Medallion Shield */}
    <polygon
      points="50,28 72,38 72,68 50,90 28,68 28,38"
      fill="url(#goldRimSweep)"
      stroke="#FFFBEB"
      strokeWidth="1.8"
      filter="drop-shadow(0 4px 16px rgba(0,0,0,0.7))"
    />
    <polygon
      points="50,33 67,41 67,65 50,84 33,65 33,41"
      fill="#1A0D00"
      stroke="#FBBF24"
      strokeWidth="1.2"
    />

    {/* Radiant 8-Point Solar Star Core */}
    <path
      d="M50 38 L53 47 L62 44 L56 51 L64 56 L55 58 L57 67 L50 61 L43 67 L45 58 L36 56 L44 51 L38 44 L47 47 Z"
      fill="url(#goldSolarCore)"
      stroke="#FEF08A"
      strokeWidth="1.2"
      filter="drop-shadow(0 0 10px rgba(251, 191, 36, 0.9))"
    />
    <circle cx="50" cy="53" r="4.5" fill="#FFFFFF" filter="drop-shadow(0 0 6px #FFFFFF)" />
  </svg>
)

export const HeraldryPlatinum = ({ size = 72, isLocked = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      filter: isLocked
        ? 'grayscale(0.7) brightness(0.7)'
        : 'drop-shadow(0 0 18px rgba(192, 132, 252, 0.75)) drop-shadow(0 8px 24px rgba(0, 0, 0, 0.8))',
    }}
  >
    <defs>
      <linearGradient id="platChrome" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="35%" stopColor="#E2E8F0" />
        <stop offset="65%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#3B0764" />
      </linearGradient>
      <radialGradient id="platEnergy" cx="40%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#F5F3FF" />
        <stop offset="35%" stopColor="#C084FC" />
        <stop offset="70%" stopColor="#7E22CE" />
        <stop offset="100%" stopColor="#1E1B4B" />
      </radialGradient>
      <linearGradient id="platSpikes" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="50%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
    </defs>

    {/* Interlocking Platinum Blade Ring Spikes */}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
      return (
        <g key={i} transform={`rotate(${angle} 50 50)`}>
          <polygon points="50,8 55,22 45,22" fill="url(#platSpikes)" stroke="#E0E7FF" strokeWidth="0.8" />
        </g>
      )
    })}

    {/* Orbiting Amethyst Gem Satellites */}
    <circle cx="20" cy="30" r="3" fill="#C084FC" stroke="#FFFFFF" strokeWidth="0.8" filter="drop-shadow(0 0 6px #C084FC)" />
    <circle cx="80" cy="30" r="3" fill="#C084FC" stroke="#FFFFFF" strokeWidth="0.8" filter="drop-shadow(0 0 6px #C084FC)" />
    <circle cx="50" cy="88" r="3.5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="0.8" filter="drop-shadow(0 0 6px #38BDF8)" />

    {/* Central Octagonal Platinum Sol-Disc */}
    <polygon
      points="50,18 72,26 84,48 76,74 50,84 24,74 16,48 28,26"
      fill="url(#platChrome)"
      stroke="#FAF5FF"
      strokeWidth="1.8"
      filter="drop-shadow(0 6px 16px rgba(0,0,0,0.75))"
    />
    <polygon
      points="50,24 68,30 78,48 70,70 50,78 30,70 22,48 32,30"
      fill="#130826"
      stroke="#A855F7"
      strokeWidth="1.2"
    />

    {/* Radiant Violet/Amethyst Core */}
    <polygon
      points="50,30 64,40 68,58 50,72 32,58 36,40"
      fill="url(#platEnergy)"
      stroke="#F5F3FF"
      strokeWidth="1.5"
      filter="drop-shadow(0 0 12px rgba(192, 132, 252, 0.95))"
    />
    <circle cx="50" cy="51" r="5" fill="#FFFFFF" filter="drop-shadow(0 0 8px #FFFFFF)" />
  </svg>
)

export const HeraldryDiamond = ({ size = 72, isLocked = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      filter: isLocked
        ? 'grayscale(0.7) brightness(0.7)'
        : 'drop-shadow(0 0 22px rgba(0, 245, 255, 0.9)) drop-shadow(0 8px 24px rgba(0, 0, 0, 0.85))',
    }}
  >
    <defs>
      <linearGradient id="diaFacetA" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="40%" stopColor="#A5F3FC" />
        <stop offset="80%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#083344" />
      </linearGradient>
      <linearGradient id="diaFacetB" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="30%" stopColor="#C4B5FD" />
        <stop offset="70%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
      <radialGradient id="diaSummitCore" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="30%" stopColor="#67E8F9" />
        <stop offset="60%" stopColor="#00F5FF" />
        <stop offset="85%" stopColor="#0369A1" />
        <stop offset="100%" stopColor="#082F49" />
      </radialGradient>
    </defs>

    {/* Radiant Prismatic Spire Rays */}
    <line x1="50" y1="4" x2="50" y2="96" stroke="#00F5FF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
    <line x1="4" y1="50" x2="96" y2="50" stroke="#00F5FF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

    {/* Outer 8-Point Diamond Star Facets */}
    <polygon
      points="50,6 62,32 94,38 70,60 78,92 50,76 22,92 30,60 6,38 38,32"
      fill="url(#diaFacetA)"
      stroke="#FFFFFF"
      strokeWidth="1.8"
      filter="drop-shadow(0 4px 18px rgba(0, 245, 255, 0.7))"
    />

    {/* Inset Rhombus Facets for Prismatic 3D Depth */}
    <polygon points="50,16 68,36 50,56 32,36" fill="url(#diaFacetB)" stroke="#A5F3FC" strokeWidth="1" />
    <polygon points="50,56 68,36 82,62 50,78" fill="url(#diaFacetA)" opacity="0.85" />
    <polygon points="50,56 32,36 18,62 50,78" fill="url(#diaFacetB)" opacity="0.85" />

    {/* Brilliant Center Diamond Prism */}
    <polygon
      points="50,28 66,46 50,68 34,46"
      fill="url(#diaSummitCore)"
      stroke="#FFFFFF"
      strokeWidth="1.5"
      filter="drop-shadow(0 0 14px #FFFFFF)"
    />
    <polygon points="50,30 62,46 50,52 38,46" fill="#FFFFFF" opacity="0.8" />
  </svg>
)

/**
 * Master Heraldry Dispatcher
 */
export const BespokeHeraldry = ({ level = 5, size = 72, isLocked = false, isCurrent = false }) => {
  switch (Number(level)) {
    case 1:
      return <HeraldryBronze size={size} isLocked={isLocked} />
    case 2:
      return <HeraldrySilver size={size} isLocked={isLocked} />
    case 3:
      return <HeraldryEmerald size={size} isLocked={isLocked} />
    case 4:
      return <HeraldrySapphire size={size} isLocked={isLocked} />
    case 5:
      return <HeraldryGold size={size} isLocked={isLocked} isCurrent={isCurrent} />
    case 6:
      return <HeraldryPlatinum size={size} isLocked={isLocked} />
    case 7:
    default:
      return <HeraldryDiamond size={size} isLocked={isLocked} />
  }
}

export default BespokeHeraldry
