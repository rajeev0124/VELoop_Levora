import React, { useEffect } from 'react'
import {
  X,
  Check,
  LockSimple,
  Sparkle,
  Trophy,
  CaretRight,
  ShieldCheck,
} from '@phosphor-icons/react'
import BadgeEmblem from './BadgeEmblem'
import { rarityConfig } from '../../data/badgeData'
import styles from './BadgeGallery.module.css'

const BadgeDetailModal = ({ badge, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !badge) return null

  const isUnlocked = badge.status === 'unlocked'
  const isInProgress = badge.status === 'in_progress'
  const isLocked = badge.status === 'locked'
  const rarity = rarityConfig[badge.rarity] || rarityConfig.common

  return (
    <div className={styles.modalOverlay} onClick={onClose} role="dialog" aria-modal="true">
      <div
        className={`${styles.modalCard} animate-scaleIn`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          className={styles.modalCloseBtn}
          onClick={onClose}
          aria-label="Close Badge Details"
        >
          <X size={18} weight="bold" />
        </button>

        {/* Ambient Glow */}
        <div
          className={styles.modalBackGlow}
          style={{
            background: `radial-gradient(circle, ${rarity.glow} 0%, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Top Badges */}
        <div className={styles.modalHeaderRow}>
          <span
            className={styles.modalRarityPill}
            style={{
              color: rarity.color,
              background: rarity.bg,
              borderColor: rarity.border,
            }}
          >
            {rarity.label.toUpperCase()} ACHIEVEMENT
          </span>

          {isUnlocked ? (
            <span className={styles.modalClaimedPill}>
              <ShieldCheck size={14} weight="duotone" /> Claimed on {badge.earnedDate}
            </span>
          ) : isInProgress ? (
            <span className={styles.modalProgressPill}>
              <Sparkle size={13} weight="fill" /> Active Progress: {badge.progressPct}%
            </span>
          ) : (
            <span className={styles.modalLockedPill}>
              <LockSimple size={13} weight="duotone" /> Locked Tier
            </span>
          )}
        </div>

        {/* Centerpiece 3D Stage */}
        <div className={styles.pedestalStage}>
          <div className={styles.podiumRing}>
            <BadgeEmblem
              rarity={badge.rarity}
              badgeUrl={badge.badgeUrl}
              tierLevel={badge.tierLevel}
              size={110}
              isUnlocked={isUnlocked}
              accentColor={badge.accentColor}
            />
          </div>
          <div className={styles.stagePlatform} />
        </div>

        {/* Title & Lore */}
        <div className={styles.modalTitleBlock}>
          <h3 className={styles.modalBadgeName}>{badge.name}</h3>
          <p className={styles.modalBadgeLore}>{badge.description}</p>
        </div>

        {/* Criteria & Milestone Box */}
        <div className={styles.criteriaBox}>
          <div className={styles.criteriaBoxHeader}>
            <Trophy size={14} weight="duotone" className={styles.criteriaIcon} />
            <span>CRITERIA FOR UNLOCK</span>
          </div>
          <p className={styles.criteriaBoxText}>{badge.criteria}</p>
          {isInProgress && (
            <div className={styles.modalProgressBarWrap}>
              <div className={styles.modalProgressBarTrack}>
                <div
                  className={styles.modalProgressBarFill}
                  style={{ width: `${badge.progressPct}%` }}
                />
              </div>
              <span className={styles.modalProgressNote}>{badge.progressLabel}</span>
            </div>
          )}
        </div>

        {/* Perks / Privileges */}
        {badge.perks && badge.perks.length > 0 && (
          <div className={styles.perksBox}>
            <span className={styles.perksBoxTitle}>ASSOCIATED PRIVILEGES & GRANTS</span>
            <ul className={styles.perksList}>
              {badge.perks.map((perk, idx) => (
                <li key={idx} className={styles.perkItem}>
                  <Check size={12} weight="bold" className={styles.perkCheck} />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Modal Action CTA */}
        <div className={styles.modalActionRow}>
          {isUnlocked ? (
            <button
              type="button"
              className="ve-btn ve-btn-gold"
              onClick={onClose}
              style={{ width: '100%', padding: '14px' }}
            >
              Badge Equipped to Profile ✓
            </button>
          ) : (
            <button
              type="button"
              className="ve-btn ve-btn-purple"
              onClick={() => {
                onClose()
                const el = document.getElementById('earn') || document.getElementById('arcade')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{ width: '100%', padding: '14px' }}
            >
              <span>Pursue This Achievement</span>
              <CaretRight size={15} weight="bold" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default BadgeDetailModal
