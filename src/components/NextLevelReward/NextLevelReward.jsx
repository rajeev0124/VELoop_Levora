import React, { useState } from 'react'
import {
  CaretRight,
  LockKey,
  ShieldCheck,
  Crown,
} from '@phosphor-icons/react'
import styles from './NextLevelReward.module.css'
import InfoTooltip from '../InfoTooltip/InfoTooltip'

/**
 * AAA Dimensional 3D Astral Spin / Lucky Wheel Token Asset
 * Engineered with metallic bevels, concentric energy grooves, specular arc, and 8-point faceted star
 */
const AstralSpinToken3D = ({ size = 32, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ filter: 'drop-shadow(0 4px 10px rgba(14, 165, 233, 0.6)) drop-shadow(0 0 14px rgba(56, 189, 248, 0.45))' }}
  >
    <defs>
      <linearGradient id="astralRimBevel" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E0F2FE" />
        <stop offset="35%" stopColor="#38BDF8" />
        <stop offset="70%" stopColor="#0284C7" />
        <stop offset="100%" stopColor="#082F49" />
      </linearGradient>
      <radialGradient id="astralCoreDisc" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#0284C7" />
        <stop offset="45%" stopColor="#075985" />
        <stop offset="85%" stopColor="#082F49" />
        <stop offset="100%" stopColor="#031525" />
      </radialGradient>
      <linearGradient id="astralStarBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="35%" stopColor="#BAE6FD" />
        <stop offset="75%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
      <linearGradient id="astralGlint" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
        <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="22" fill="url(#astralRimBevel)" />
    <circle cx="24" cy="24" r="18" fill="url(#astralCoreDisc)" />
    <circle cx="24" cy="24" r="18" stroke="#38BDF8" strokeWidth="0.75" strokeOpacity="0.6" />
    <circle cx="24" cy="24" r="14" stroke="#7DD3FC" strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.75" />
    <path d="M7 20 C9 12 16 7 24 7 C32 7 39 12 41 20" stroke="url(#astralGlint)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.9" />
    <path
      d="M24 10 L26.5 19.5 L35 17 L29 23 L37 26 L28.5 28 L31 36.5 L24 30.5 L17 36.5 L19.5 28 L11 26 L19 23 L13 17 L21.5 19.5 Z"
      fill="url(#astralStarBody)"
      filter="drop-shadow(0 0 5px rgba(224, 242, 254, 0.95))"
    />
    <circle cx="24" cy="24" r="3" fill="#FFFFFF" filter="drop-shadow(0 0 4px #FFFFFF)" />
  </svg>
)

const NextLevelReward = ({ data, onTriggerLevelUp }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glintX: 50, glintY: 50, active: false })
  const [activeReward, setActiveReward] = useState(null)

  const targetLevel = data?.nextLevel || 6
  const targetLevelName = data?.nextLevelName || 'Platinum Hero'
  const pct = data?.xpPercent || 80
  const xpRemaining = data?.xpRemaining || 1580

  // 3D Gyroscopic pointer physics
  const handleVaultPointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rx = (0.5 - y) * 16 // -8 to +8 deg
    const ry = (x - 0.5) * 20 // -10 to +10 deg
    setTilt({
      rx: Number(rx.toFixed(2)),
      ry: Number(ry.toFixed(2)),
      glintX: Math.round(x * 100),
      glintY: Math.round(y * 100),
      active: true,
    })
  }

  const handleVaultPointerLeave = () => {
    setTilt({ rx: 0, ry: 0, glintX: 50, glintY: 50, active: false })
  }

  return (
    <aside
      aria-labelledby="reward-vault-heading"
      className={`${styles.card} animate-fadeInUp`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient background glow */}
      <div className={styles.glowAura} aria-hidden="true" />

      {/* Header — Symmetric Luxury Capsule Architecture */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.statusPillsRow}>
            <div className={styles.rewardTierPill}>
              <Crown size={12} weight="fill" className={styles.crownViolet} />
              <span>LEVEL {String(targetLevel).padStart(2, '0')} UNLOCK</span>
            </div>
            <div className={styles.lockedPill}>
              <LockKey size={12} weight="bold" />
              <span>MILESTONE VAULT</span>
            </div>
          </div>
          <div className={styles.milestoneHeadingCol}>
            <span className={styles.milestoneKicker}>
              TIER {String(targetLevel).padStart(2, '0')} CLASSIFIED MILESTONE
            </span>
            <h2 id="reward-vault-heading" className={styles.mainHeading}>
              {targetLevelName} Milestone Vault
            </h2>
          </div>
        </div>
        <InfoTooltip text={`Achieve Level ${String(targetLevel).padStart(2, '0')} at 8,000 XP (1,580 XP remaining) to crack this milestone safe. Rewards credit automatically upon promotion.`} />
      </div>

      {/* Grand 3D Vault Stage Centerpiece */}
      <div
        className={styles.vaultStageCenter}
        onMouseMove={handleVaultPointerMove}
        onMouseLeave={handleVaultPointerLeave}
        onTouchMove={(e) => {
          if (e.touches && e.touches[0]) {
            const touch = e.touches[0]
            const rect = e.currentTarget.getBoundingClientRect()
            const x = (touch.clientX - rect.left) / rect.width
            const y = (touch.clientY - rect.top) / rect.height
            setTilt({
              rx: Number(((0.5 - y) * 14).toFixed(2)),
              ry: Number(((x - 0.5) * 18).toFixed(2)),
              glintX: Math.round(x * 100),
              glintY: Math.round(y * 100),
              active: true,
            })
          }
        }}
        onTouchEnd={handleVaultPointerLeave}
      >
        {/* Volumetric Radial Backlight Beam */}
        <div className={styles.radialSpotlight} aria-hidden="true" />

        {/* Orbiting Spark Particles */}
        <div className={styles.orbitPipsWrap} aria-hidden="true">
          <span className={styles.orbitSpark1} />
          <span className={styles.orbitSpark2} />
          <span className={styles.orbitSpark3} />
        </div>

        {/* Floating Transparent 3D Vault with Gyroscopic Tilt */}
        <div className={styles.vaultFloatAnchor}>
          <div
            className={styles.vaultArtworkWrap}
            style={{
              transform: tilt.active
                ? `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(16px)`
                : undefined,
              transition: tilt.active ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <img
              src="/assets/reward-vault-chest-hero.png"
              alt={`Level ${targetLevel} Milestone Reward Chest`}
              className={styles.vaultLargeImg}
              onClick={onTriggerLevelUp}
              role="button"
              tabIndex={0}
              title="Inspect Level 06 Milestone Chest Rewards"
            />
          </div>
        </div>

        {/* Contact Shadow & Holographic Dais Base */}
        <div
          className={styles.pedestalReflection}
          style={{
            transform: tilt.active
              ? `scale(${1 - Math.abs(tilt.rx) * 0.01}) translateX(${tilt.ry * 0.8}px)`
              : undefined,
          }}
          aria-hidden="true"
        >
          <span className={styles.hologramRingOuter} />
          <span className={styles.hologramRingInner} />
          <span className={styles.contactShadowGlow} />
          <span className={styles.contactShadowCore} />
        </div>

        {/* High-Fidelity 3D Interactive Loot Cards Constellation (3 Symmetrical 3D Tiles) */}
        <div className={styles.rewardSummaryRow}>
          {/* Card 1: 3D VE Coin Token Grant */}
          <div
            className={`${styles.rewardLootCard} ${styles.lootCardGold} ${activeReward === 've' ? styles.lootCardActive : ''}`}
            onMouseEnter={() => setActiveReward('ve')}
            onMouseLeave={() => setActiveReward(null)}
            tabIndex={0}
            role="region"
            aria-label="Milestone Reward: +500 VE Coins Token Grant"
          >
            <div className={styles.token3dStage}>
              <img
                src="/assets/coin-ve-3d.png"
                alt="VE Coins 3D Token"
                className={styles.token3dImg}
              />
              <span className={styles.tokenHaloGold} aria-hidden="true" />
            </div>
            <div className={styles.lootTextCol}>
              <span className={styles.lootAmountGold}>+500 VEs</span>
              <span className={styles.lootLabel}>Token Grant</span>
            </div>
            <div className={styles.cardHoverGlint} aria-hidden="true" />
          </div>

          {/* Card 2: 3D Prismatic Emerald Gem */}
          <div
            className={`${styles.rewardLootCard} ${styles.lootCardEmerald} ${activeReward === 'gem' ? styles.lootCardActive : ''}`}
            onMouseEnter={() => setActiveReward('gem')}
            onMouseLeave={() => setActiveReward(null)}
            tabIndex={0}
            role="region"
            aria-label="Milestone Reward: +25 Gems Rare Currency"
          >
            <div className={styles.token3dStage}>
              <img
                src="/assets/gem-3d.png"
                alt="Prismatic Gem 3D Token"
                className={styles.token3dImg}
              />
              <span className={styles.tokenHaloEmerald} aria-hidden="true" />
            </div>
            <div className={styles.lootTextCol}>
              <span className={styles.lootAmountEmerald}>+25 Gems</span>
              <span className={styles.lootLabel}>Rare Gems</span>
            </div>
            <div className={styles.cardHoverGlint} aria-hidden="true" />
          </div>

          {/* Card 3: 3D Astral Spin Token / Lucky Wheel Bonus */}
          <div
            className={`${styles.rewardLootCard} ${styles.lootCardCyan} ${activeReward === 'bonus' ? styles.lootCardActive : ''}`}
            onMouseEnter={() => setActiveReward('bonus')}
            onMouseLeave={() => setActiveReward(null)}
            tabIndex={0}
            role="region"
            aria-label="Milestone Reward: +2 Lucky Wheel Bonus Spins"
          >
            <div className={styles.token3dStage}>
              <AstralSpinToken3D size={34} className={styles.token3dImg} />
              <span className={styles.tokenHaloCyan} aria-hidden="true" />
            </div>
            <div className={styles.lootTextCol}>
              <span className={styles.lootAmountCyan}>+2 Spins</span>
              <span className={styles.lootLabel}>Wheel Bonus</span>
            </div>
            <div className={styles.cardHoverGlint} aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Unified Grounded Vault Clearance Console */}
      <div className={styles.vaultConsole}>
        <div className={styles.consoleHeader}>
          <div className={styles.consoleStatusLeft}>
            <div className={styles.consoleShieldWrap}>
              <ShieldCheck size={15} weight="fill" className={styles.shieldIconGreen} />
            </div>
            <div className={styles.consoleTextWrap}>
              <span className={styles.consoleTitle}>Every XP counts</span>
              <span className={styles.consoleSubtitle}>Level 06 Milestone • Clearly recorded</span>
            </div>
          </div>
          <span className={styles.consoleBadge}>
            <LockKey size={12} weight="bold" />
            {pct}% CHARGED
          </span>
        </div>

        {/* Micro Charging Energy Conduit */}
        <div className={styles.consoleBarRow}>
          <div
            className={styles.consoleTrack}
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Vault charge: ${pct}%`}
          >
            <div className={styles.consoleFill} style={{ width: `${pct}%` }}>
              <span className={styles.consoleGlow} />
            </div>
          </div>
          <span className={styles.consoleRemainingText}>{xpRemaining.toLocaleString()} XP to unlock</span>
        </div>

        {/* Console Action & Requirement Row */}
        <div className={styles.consoleFooterRow}>
          <span className={styles.consoleReqText}>
            Requires <strong>Level 06 Sovereign Promotion</strong>
          </span>
          <button
            type="button"
            className={styles.consolePreviewBtn}
            onClick={onTriggerLevelUp}
            aria-label="View Rewards Preview modal"
          >
            <span className={styles.previewBtnLabel}>Preview Vault</span>
            <CaretRight size={13} weight="bold" aria-hidden="true" />
            <span className={styles.btnSheenSweep} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Shimmer overlay */}
      <div className={`${styles.shimmer} ${isHovered ? styles.shimmerActive : ''}`} aria-hidden="true" />
    </aside>
  )
}

export default NextLevelReward
