import React from 'react'
import { CheckCircle, LockSimple, Sparkle, CaretRight } from '@phosphor-icons/react'
import BadgeEmblem from './BadgeEmblem'
import { rarityConfig } from '../../data/badgeData'
import styles from './BadgeGallery.module.css'

const BadgeCard = ({ badge, onSelect }) => {
  const isUnlocked = badge.status === 'unlocked'
  const isInProgress = badge.status === 'in_progress'
  const isLocked = badge.status === 'locked'
  const rarity = rarityConfig[badge.rarity] || rarityConfig.common

  return (
    <div
      className={`${styles.badgeCard} ${isUnlocked ? styles.cardUnlocked : ''} ${
        isInProgress ? styles.cardInProgress : ''
      } ${isLocked ? styles.cardLocked : ''} ${
        badge.isCurrentRank ? styles.cardCurrentRank : ''
      }`}
      onClick={() => onSelect(badge)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(badge)
        }
      }}
      aria-label={`${badge.name} badge, ${badge.rarity} rarity, status: ${badge.status}`}
    >
      {/* Ambient aura glow for card */}
      <div
        className={styles.cardAuraGlow}
        style={{
          background: isUnlocked
            ? `radial-gradient(circle at 50% 20%, ${rarity.glow} 0%, transparent 65%)`
            : 'none',
        }}
        aria-hidden="true"
      />

      {/* Top Header: Rarity & Status */}
      <div className={styles.cardHeader}>
        <span
          className={styles.rarityPill}
          style={{
            color: rarity.color,
            background: rarity.bg,
            borderColor: rarity.border,
          }}
        >
          {badge.isCurrentRank ? '★ ACTIVE RANK' : rarity.label}
        </span>

        {isUnlocked && (
          <span className={styles.statusUnlockedPill}>
            <CheckCircle size={11} weight="fill" />
            <span>CLAIMED</span>
          </span>
        )}

        {isInProgress && (
          <span className={styles.statusProgressPill}>
            <Sparkle size={11} weight="fill" />
            <span>IN PROGRESS</span>
          </span>
        )}

        {isLocked && (
          <span className={styles.statusLockedPill}>
            <LockSimple size={11} weight="duotone" />
            <span>LOCKED</span>
          </span>
        )}
      </div>

      {/* Center Emblem Visualizer */}
      <div className={styles.emblemContainer}>
        <BadgeEmblem
          rarity={badge.rarity}
          badgeUrl={badge.badgeUrl}
          tierLevel={badge.tierLevel}
          size={86}
          isUnlocked={isUnlocked}
          status={isUnlocked ? 'completed' : isInProgress ? 'next' : 'locked'}
          accentColor={badge.accentColor}
        />
      </div>

      {/* Title & Criteria */}
      <div className={styles.cardInfo}>
        <h4 className={styles.badgeName} title={badge.name}>
          {badge.name}
        </h4>
        <p className={styles.badgeDesc}>{badge.description}</p>
      </div>

      {/* Bottom Progress or Earned Footer */}
      <div className={styles.cardFooter}>
        <div className={styles.footerStatusArea}>
          {isUnlocked ? (
            <div className={styles.earnedDateRow}>
              <span className={styles.earnedDot} />
              <span className={styles.earnedText}>Unlocked {badge.earnedDate}</span>
            </div>
          ) : isInProgress ? (
            <div className={styles.progressRow}>
              <div className={styles.progressLabels}>
                <span className={styles.progressText}>{badge.progressLabel || 'Progress'}</span>
                <span className={styles.progressPctText}>{badge.progressPct}%</span>
              </div>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${badge.progressPct}%` }}
                />
              </div>
              {badge.progressRemaining && (
                <span className={styles.progressRemainingText}>{badge.progressRemaining}</span>
              )}
            </div>
          ) : (
            <div className={styles.criteriaRow}>
              <LockSimple size={11} weight="bold" className={styles.criteriaLockIcon} />
              <span className={styles.criteriaText}>{badge.criteria}</span>
            </div>
          )}
        </div>

        <div className={styles.inspectBtn}>
          <span>Inspect Insignia</span>
          <CaretRight size={11} weight="bold" />
        </div>
      </div>
    </div>
  )
}

export default BadgeCard
