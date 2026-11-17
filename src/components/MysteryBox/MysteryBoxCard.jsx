import React from 'react'
import {
  LockSimple,
  Sparkle,
  Key,
  CheckCircle,
  CaretRight,
  ShieldCheck,
  Diamond,
  Coins,
} from '@phosphor-icons/react'
import { mysteryBoxRarities } from '../../data/mysteryBoxData'
import styles from './MysteryBox.module.css'

const MysteryBoxCard = ({ box, onOpen }) => {
  const isReady = box.status === 'ready'
  const isLocked = box.status === 'locked'
  const isOpened = box.status === 'opened'
  const rarity = mysteryBoxRarities[box.rarity] || mysteryBoxRarities.common

  return (
    <article
      className={`${styles.boxCard} ${isReady ? styles.boxReady : ''} ${
        isLocked ? styles.boxLocked : ''
      } ${isOpened ? styles.boxClaimed : ''} ${box.isFeatured ? styles.boxFeatured : ''}`}
      onClick={() => onOpen(box)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen(box)
        }
      }}
      aria-label={`${box.name}, ${box.rarity} rarity, status: ${box.status}`}
    >
      {/* Ambient background glow */}
      <div
        className={styles.cardGlowAura}
        style={{
          background: isReady
            ? `radial-gradient(circle at 50% 30%, ${rarity.glow} 0%, transparent 68%)`
            : isLocked
            ? 'radial-gradient(circle at 50% 30%, rgba(168, 85, 247, 0.08) 0%, transparent 60%)'
            : 'radial-gradient(circle at 50% 30%, rgba(0, 230, 118, 0.08) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Top Header: Rarity & Tag */}
      <div className={styles.cardHeader}>
        <span
          className={styles.rarityPill}
          style={{
            color: '#FFFFFF',
            borderColor: rarity.border,
            boxShadow: isReady ? `0 0 10px ${rarity.glow}` : 'none',
          }}
        >
          {rarity.label.toUpperCase()}
        </span>

        {isReady && (
          <span className={styles.readyPill}>
            <Key size={12} weight="fill" />
            <span>READY TO CRACK</span>
          </span>
        )}

        {isLocked && (
          <span className={styles.lockedPill}>
            <LockSimple size={12} weight="bold" />
            <span>LOCKED</span>
          </span>
        )}

        {isOpened && (
          <span className={styles.openedPill}>
            <CheckCircle size={12} weight="fill" />
            <span>CLAIMED</span>
          </span>
        )}
      </div>

      {/* 3D Vault Stage (Floating, Orbiting particles, Volumetric rays, Contact shadow) */}
      <div className={styles.artworkStage}>
        {/* Volumetric Light Rays (from inside/behind) */}
        {isReady && <div className={styles.volumetricLightRays} aria-hidden="true" />}

        {/* Orbiting Gem / Spark Particles */}
        {isReady && (
          <div className={styles.orbitContainer} aria-hidden="true">
            <span className={`${styles.orbitParticle} ${styles.orbitP1}`} />
            <span className={`${styles.orbitParticle} ${styles.orbitP2}`} />
            <span className={`${styles.orbitParticle} ${styles.orbitP3}`} />
          </div>
        )}

        {/* Locked Chain & Padlock Overlay */}
        {isLocked && (
          <div className={styles.lockedShieldOverlay} aria-hidden="true">
            <div className={styles.lockIconBadge}>
              <LockSimple size={13} weight="fill" />
            </div>
          </div>
        )}

        {/* Contact Shadow / Glow on Surface Below */}
        <div
          className={`${styles.contactShadow} ${isReady ? styles.contactShadowBreathing : ''}`}
          aria-hidden="true"
        />

        {/* Floating Transparent 3D Vault Artwork */}
        <div className={styles.cardVaultWrapper}>
          <img
            src={box.artwork}
            alt=""
            aria-hidden="true"
            className={`${styles.vaultImg} ${styles['vaultRarity_' + box.rarity] || ''} ${
              isReady ? styles.vaultImgFloating : ''
            } ${isLocked ? styles.vaultImgLocked : ''}`}
            loading="lazy"
          />
        </div>
      </div>

      {/* Vault Identity */}
      <div className={styles.boxInfo}>
        <span className={styles.vaultCategoryTag}>{box.tag}</span>
        <h3 className={styles.boxTitle}>{box.name}</h3>
        <p className={styles.boxRequirement}>{box.requirement}</p>
      </div>

      {/* Separate Reward Chip (Clean Hierarchy, NEVER overlaps the vault) */}
      <div className={styles.rewardPreviewRow}>
        <div className={styles.rewardSummaryText}>
          <Sparkle size={13} weight="fill" className={styles.previewSparkle} />
          <span>{box.rewardSummary}</span>
        </div>
      </div>

      {/* Footer / Interaction CTA */}
      <div className={styles.cardFooter}>
        {isReady ? (
          <button
            type="button"
            className={`${styles.actionBtnReady} ve-btn-gold`}
            tabIndex={-1}
            aria-label={`Crack ${box.name} now`}
          >
            <span>Crack Vault Now</span>
            <CaretRight size={14} weight="bold" />
          </button>
        ) : isOpened ? (
          <div className={styles.claimedFooter}>
            <CheckCircle size={14} weight="fill" className={styles.claimedIcon} />
            <span>Vault Rewards Claimed</span>
          </div>
        ) : (
          <div className={styles.lockedFooter}>
            <div className={styles.lockedProgressRow}>
              <span className={styles.lockedRequirementText}>
                {box.progressLabel || 'Progression locked'}
              </span>
              <span className={styles.lockedPctText}>{box.progressPct}%</span>
            </div>
            <div
              className={styles.lockedProgressTrack}
              role="progressbar"
              aria-valuenow={box.progressPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Progress to unlock: ${box.progressPct}%`}
            >
              <div
                className={styles.lockedProgressFill}
                style={{ width: `${box.progressPct}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

export default MysteryBoxCard
