import React, { useState, useEffect } from 'react'
import {
  X,
  Sparkle,
  Coins,
  Diamond,
  Lightning,
  CheckCircle,
  ShieldCheck,
  CaretRight,
  LockSimple,
} from '@phosphor-icons/react'
import { mysteryBoxRarities } from '../../data/mysteryBoxData'
import styles from './MysteryBox.module.css'

const MysteryBoxOpeningModal = ({ box, isOpen, onClose, onClaimSuccess }) => {
  const [openingState, setOpeningState] = useState('inspect') // 'inspect' | 'cracking' | 'revealed'

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      setOpeningState('inspect')
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !box) return null

  const isReady = box.status === 'ready'
  const isLocked = box.status === 'locked'
  const rarity = mysteryBoxRarities[box.rarity] || mysteryBoxRarities.common

  const handleCrackVault = () => {
    setOpeningState('cracking')
    setTimeout(() => {
      setOpeningState('revealed')
    }, 1400)
  }

  const handleClaim = () => {
    if (onClaimSuccess) onClaimSuccess(box.id)
    onClose()
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose} role="dialog" aria-modal="true">
      <div
        className={`${styles.openingModalCard} animate-scaleIn`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          className={styles.modalCloseBtn}
          onClick={onClose}
          aria-label="Close Mystery Box"
        >
          <X size={18} />
        </button>

        {/* Ambient Glow */}
        <div
          className={styles.modalBackGlow}
          style={{
            background: `radial-gradient(circle, ${rarity.glow} 0%, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Header Tag */}
        <div className={styles.modalHeaderRow}>
          <span
            className={styles.modalRarityPill}
            style={{
              color: rarity.color,
              borderColor: rarity.border,
            }}
          >
            {rarity.label.toUpperCase()} VAULT
          </span>

          <span className={styles.modalTagText}>{box.tag}</span>
        </div>

        {/* 3D Interactive Stage */}
        <div className={styles.unboxingStage}>
          {openingState === 'cracking' && (
            <div className={styles.energyBeams} aria-hidden="true" />
          )}

          <div
            className={`${styles.vaultArtworkWrap} ${
              openingState === 'cracking' ? styles.vaultCrackingShake : ''
            } ${openingState === 'revealed' ? styles.vaultOpenedGlow : ''}`}
          >
            <img
              src={box.artwork}
              alt={box.name}
              className={styles.modalVaultImg}
            />
          </div>

          <div className={styles.podiumPlatformGlow} />
        </div>

        {/* Dynamic State Content */}
        {openingState === 'inspect' && (
          <div className={styles.stageInspect}>
            <h3 className={styles.modalVaultTitle}>{box.name}</h3>
            <p className={styles.modalVaultLore}>{box.lore}</p>

            <div className={styles.modalRewardPreviewBox}>
              <div className={styles.rewardPreviewHeader}>
                <Sparkle size={13} weight="fill" className={styles.sparkleGold} />
                <span>ESTIMATED VAULT CONTENT</span>
              </div>
              <div className={styles.previewSummaryVal}>{box.rewardSummary}</div>
              <span className={styles.verifiedClaimText}>
                <ShieldCheck size={12} weight="duotone" className={styles.shieldIcon} />
                {box.requirement}
              </span>
            </div>

            <div className={styles.modalActionArea}>
              {isReady ? (
                <button
                  type="button"
                  className="ve-btn ve-btn-gold"
                  onClick={handleCrackVault}
                  style={{ width: '100%', padding: '16px', fontSize: '15px' }}
                >
                  <Sparkle size={16} weight="fill" />
                  <span>Initiate Vault Unlock</span>
                </button>
              ) : (
                <div className={styles.modalLockedNotice}>
                  <div className={styles.lockedNoticeText}>
                    <LockSimple size={14} weight="duotone" />
                    <span>{box.requirement}</span>
                  </div>
                  <button
                    type="button"
                    className="ve-btn ve-btn-outline"
                    onClick={onClose}
                    style={{ width: '100%', marginTop: '8px' }}
                  >
                    Return to Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {openingState === 'cracking' && (
          <div className={styles.stageCracking}>
            <h3 className={styles.crackingTitle}>DECRYPTING MAGNETIC LOCKS...</h3>
            <p className={styles.crackingSub}>Bypassing cyber deadbolts and generating verifiable token block</p>
            <div className={styles.cyberProgressBar}>
              <div className={styles.cyberProgressBarFill} />
            </div>
          </div>
        )}

        {openingState === 'revealed' && (
          <div className={styles.stageRevealed}>
            <div className={styles.revealedSuccessTag}>
              <CheckCircle size={14} weight="fill" />
              <span>VAULT BREACH SUCCESSFUL!</span>
            </div>

            <h3 className={styles.revealedTitle}>VAULT REWARDS UNLOCKED</h3>
            <p className={styles.revealedSub}>
              Congratulations! Your verified rewards have been minted and are ready for deposit.
            </p>

            {/* Revealed Payout Cards */}
            <div className={styles.revealedCardsGrid}>
              {box.rewardDetails.ve > 0 && (
                <div className={styles.rewardPayoutPillVE}>
                  <Coins size={18} weight="duotone" className={styles.payoutIconGold} />
                  <span className={styles.payoutAmountGold}>+{box.rewardDetails.ve} VEs</span>
                  <span className={styles.payoutLabel}>Token Payout</span>
                </div>
              )}

              {box.rewardDetails.gems > 0 && (
                <div className={styles.rewardPayoutPillGem}>
                  <Diamond size={18} weight="duotone" className={styles.payoutIconPurple} />
                  <span className={styles.payoutAmountPurple}>+{box.rewardDetails.gems} Gems</span>
                  <span className={styles.payoutLabel}>Rare Currency</span>
                </div>
              )}

              {box.rewardDetails.xp > 0 && (
                <div className={styles.rewardPayoutPillXP}>
                  <Lightning size={18} weight="fill" className={styles.payoutIconCyan} />
                  <span className={styles.payoutAmountCyan}>+{box.rewardDetails.xp} XP</span>
                  <span className={styles.payoutLabel}>Progression Energy</span>
                </div>
              )}
            </div>

            <button
              type="button"
              className="ve-btn ve-btn-gold"
              onClick={handleClaim}
              style={{ width: '100%', padding: '15px', fontSize: '15px', fontWeight: 800 }}
            >
              <span>Deposit Rewards to Wallet</span>
              <CaretRight size={16} weight="bold" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MysteryBoxOpeningModal
