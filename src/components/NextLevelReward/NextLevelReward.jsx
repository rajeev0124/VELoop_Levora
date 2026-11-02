import React, { useState } from 'react'
import { Coins, Gem, ArrowRight, Sparkles, Lock, ShieldCheck } from 'lucide-react'
import styles from './NextLevelReward.module.css'
import InfoTooltip from '../InfoTooltip/InfoTooltip'

const NextLevelReward = ({ data, onTriggerLevelUp }) => {
  const [isHovered, setIsHovered] = useState(false)
  const targetLevel = data?.nextLevel || 6
  const targetLevelName = data?.nextLevelName || 'Platinum Hero'
  const pct = data?.xpPercent || 80
  const xpRemaining = data?.xpRemaining || 1580

  // Dynamic reward values from nextLevelData
  const nextReward = data?.nextLevelData?.reward || { type: 'Spins', amount: 2 }

  return (
    <aside
      aria-labelledby="reward-vault-heading"
      className={`${styles.card} animate-fadeInUp`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient background glow */}
      <div className={styles.glowAura} aria-hidden="true" />

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.levelTagRow}>
            <span className={styles.levelTag}>LEVEL {String(targetLevel).padStart(2, '0')} REWARDS</span>
            <span className={styles.lockedPill}>
              <Lock size={10} />
              <span>LOCKED VAULT</span>
            </span>
          </div>
          <h2 id="reward-vault-heading" className={styles.mainHeading}>
            {targetLevelName} Milestone Vault
          </h2>
        </div>
        <InfoTooltip text={`Achieve Level ${String(targetLevel).padStart(2, '0')} to unlock this high-tier milestone vault. Rewards are credited automatically upon reaching the XP requirement.`} />
      </div>

      {/* Grand 3D Vault Stage Centerpiece */}
      <div className={styles.vaultStageCenter}>
        {/* Ambient Backlight Beam */}
        <div className={styles.radialSpotlight} aria-hidden="true" />
        <div className={styles.energyRings} aria-hidden="true" />

        <div className={styles.vaultArtworkWrap}>
          <img
            src="/assets/safe-1.svg"
            alt={`Level ${targetLevel} Reward Vault`}
            className={styles.vaultLargeImg}
          />

          {/* Floating Prismatic Gems Cluster */}
          <div className={styles.prismaticGemCluster} aria-hidden="true">
            <span className={`${styles.floatingGem} ${styles.gemPurple}`}>
              <Gem size={18} />
            </span>
            <span className={`${styles.floatingGem} ${styles.gemGold}`}>
              <Sparkles size={16} />
            </span>
            <span className={`${styles.floatingGem} ${styles.gemCyan}`}>
              <Gem size={14} />
            </span>
          </div>
        </div>

        {/* Illuminated Pedestal Base */}
        <div className={styles.pedestalReflection} aria-hidden="true" />

        {/* High-Contrast Metallic Reward Pills */}
        <div className={styles.rewardSummaryRow}>
          <div className={styles.rewardPillGold}>
            <div className={styles.pillIconWrapGold}>
              <Coins size={14} />
            </div>
            <div className={styles.pillTextCol}>
              <span className={styles.pillAmountGold}>+500 VEs</span>
              <span className={styles.pillLabel}>Token Grant</span>
            </div>
          </div>

          <div className={styles.rewardPillPurple}>
            <div className={styles.pillIconWrapPurple}>
              <Gem size={14} />
            </div>
            <div className={styles.pillTextCol}>
              <span className={styles.pillAmountPurple}>+25 Gems</span>
              <span className={styles.pillLabel}>Rare Currency</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress towards unlock */}
      <div className={styles.progressWrap}>
        <div className={styles.progressText}>
          <span className={styles.unlockedText}>
            <ShieldCheck size={12} className={styles.shieldGreen} />
            {pct}% Unlocked
          </span>
          <span className={styles.remainingText}>{xpRemaining.toLocaleString()} XP remaining</span>
        </div>
        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Reward chest unlock progress: ${pct}%`}
        >
          <div className={styles.progressFill} style={{ width: `${pct}%` }}>
            <span className={styles.progressBarGlow} />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className={styles.ctaRow}>
        <button
          type="button"
          className="ve-btn ve-btn-gold"
          onClick={onTriggerLevelUp}
          style={{ width: '100%', padding: '12px 18px', fontSize: '13px' }}
          aria-label="View Rewards Preview modal"
        >
          <span>View Rewards Preview</span>
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>

      {/* Shimmer overlay */}
      <div className={`${styles.shimmer} ${isHovered ? styles.shimmerActive : ''}`} aria-hidden="true" />
    </aside>
  )
}

export default NextLevelReward
