import React from 'react'
import {
  LockSimple,
  Sparkle,
  Key,
  CheckCircle,
  CaretRight,
} from '@phosphor-icons/react'
import { mysteryBoxRarities } from '../../data/mysteryBoxData'
import styles from './MysteryBox.module.css'

const MysteryBoxCard = ({ box, onOpen }) => {
  const isReady = box.status === 'ready'
  const isLocked = box.status === 'locked'
  const isOpened = box.status === 'opened'
  const rarity = mysteryBoxRarities[box.rarity] || mysteryBoxRarities.common

  return (
    <div
      className={`${styles.boxCard} ${isReady ? styles.boxReady : ''} ${
        isLocked ? styles.boxLocked : ''
      } ${box.isFeatured ? styles.boxFeatured : ''}`}
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
            ? `radial-gradient(circle at 50% 30%, ${rarity.glow} 0%, transparent 65%)`
            : 'none',
        }}
        aria-hidden="true"
      />

      {/* Top Header: Rarity & Tag */}
      <div className={styles.cardHeader}>
        <span
          className={styles.rarityPill}
          style={{
            color: rarity.color,
            borderColor: rarity.border,
            boxShadow: isReady ? `0 0 10px ${rarity.glow}` : 'none',
          }}
        >
          {rarity.label.toUpperCase()}
        </span>

        {isReady && (
          <span className={styles.readyPill}>
            <Key size={11} weight="duotone" />
            <span>READY TO CRACK</span>
          </span>
        )}

        {isLocked && (
          <span className={styles.lockedPill}>
            <LockSimple size={11} weight="duotone" />
            <span>LOCKED</span>
          </span>
        )}

        {isOpened && (
          <span className={styles.openedPill}>
            <CheckCircle size={11} weight="fill" />
            <span>CLAIMED</span>
          </span>
        )}
      </div>

      {/* 3D Vault Illustration Stage */}
      <div className={styles.artworkStage}>
        <div className={styles.artworkShadow} />
        <img
          src={box.artwork}
          alt={box.name}
          className={`${styles.vaultImg} ${isReady ? styles.vaultImgReady : ''}`}
          loading="lazy"
        />
        {isReady && <div className={styles.pulseSparkle} />}
      </div>

      {/* Name & Requirement */}
      <div className={styles.boxInfo}>
        <span className={styles.vaultCategoryTag}>{box.tag}</span>
        <h3 className={styles.boxTitle}>{box.name}</h3>
        <p className={styles.boxRequirement}>{box.requirement}</p>
      </div>

      {/* Rewards Preview Pill */}
      <div className={styles.rewardPreviewRow}>
        <span className={styles.rewardSummaryText}>
          <Sparkle size={12} weight="fill" className={styles.previewSparkle} />
          {box.rewardSummary}
        </span>
      </div>

      {/* Footer / Interaction CTA */}
      <div className={styles.cardFooter}>
        {isReady ? (
          <button
            type="button"
            className={`${styles.actionBtnReady} ve-btn-gold`}
            tabIndex={-1}
          >
            <span>Crack Vault Now</span>
            <CaretRight size={14} weight="bold" />
          </button>
        ) : (
          <div className={styles.lockedFooter}>
            <div className={styles.lockedProgressRow}>
              <span className={styles.lockedRequirementText}>{box.progressLabel || 'Milestone locked'}</span>
              <span className={styles.lockedPctText}>{box.progressPct}%</span>
            </div>
            <div className={styles.lockedProgressTrack}>
              <div
                className={styles.lockedProgressFill}
                style={{ width: `${box.progressPct}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MysteryBoxCard
