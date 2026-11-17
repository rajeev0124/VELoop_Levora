import React, { useState, useEffect, useRef } from 'react'
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
  ArrowsClockwise,
  FastForward,
} from '@phosphor-icons/react'
import { mysteryBoxRarities } from '../../data/mysteryBoxData'
import styles from './MysteryBox.module.css'

const AnimatedCount = ({ target, duration = 800 }) => {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setVal(Math.floor(p * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration])
  return <span>+{val.toLocaleString()}</span>
}

const MysteryBoxOpeningModal = ({ box, isOpen, onClose, onClaimSuccess }) => {
  // Sequence states: 'inspect' | 'shaking' | 'burst' | 'revealed'
  const [sequenceStep, setSequenceStep] = useState('inspect')
  const timersRef = useRef([])

  const clearTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t))
    timersRef.current = []
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      setSequenceStep('inspect')
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
      clearTimers()
    }
  }, [isOpen, onClose])

  if (!isOpen || !box) return null

  const isReady = box.status === 'ready'
  const rarity = mysteryBoxRarities[box.rarity] || mysteryBoxRarities.common

  // Start Cinematic Opening Sequence
  const handleInitiateUnlock = () => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setSequenceStep('revealed')
      return
    }

    clearTimers()
    setSequenceStep('shaking')

    // Step 1 -> Burst after 900ms
    const t1 = setTimeout(() => {
      setSequenceStep('burst')
    }, 900)

    // Step 2 -> Revealed after 1800ms
    const t2 = setTimeout(() => {
      setSequenceStep('revealed')
    }, 1800)

    timersRef.current = [t1, t2]
  }

  // Skip animation directly to revealed state
  const handleSkipAnimation = () => {
    clearTimers()
    setSequenceStep('revealed')
  }

  const handleClaim = () => {
    if (onClaimSuccess) onClaimSuccess(box.id)
    onClose()
  }

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="vault-modal-heading"
    >
      <div
        className={`${styles.openingModalCard} animate-scaleIn`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar: Skip button (if animating) + Close */}
        <div className={styles.modalTopControls}>
          {(sequenceStep === 'shaking' || sequenceStep === 'burst') && (
            <button
              type="button"
              className={styles.skipBtn}
              onClick={handleSkipAnimation}
              title="Skip unlock animation"
              aria-label="Skip animation"
            >
              <FastForward size={14} weight="fill" />
              <span>Skip</span>
            </button>
          )}

          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={onClose}
            aria-label="Close Mystery Box"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Ambient Radial Backlight */}
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
              color: '#FFFFFF',
              borderColor: rarity.border,
            }}
          >
            {rarity.label.toUpperCase()} MILESTONE VAULT
          </span>

          <span className={styles.modalTagText}>{box.tag}</span>
        </div>

        {/* 3D Interactive Stage & Cinematic FX */}
        <div className={styles.unboxingStage}>
          {/* Volumetric Light Burst during crack */}
          {(sequenceStep === 'burst' || sequenceStep === 'revealed') && (
            <div className={styles.lightBurstRing} aria-hidden="true" />
          )}

          {/* Particle Confetti / Gem Flashes */}
          {sequenceStep === 'burst' && (
            <div className={styles.confettiParticlesWrap} aria-hidden="true">
              {[...Array(12)].map((_, i) => (
                <span
                  key={i}
                  className={styles.confettiPip}
                  style={{
                    '--angle': `${i * 30}deg`,
                    '--dist': `${60 + (i % 3) * 20}px`,
                    background: i % 2 === 0 ? 'var(--gold)' : 'var(--cyan)',
                  }}
                />
              ))}
            </div>
          )}

          {/* Floating Transparent Vault with dynamic animations */}
          <div
            className={`${styles.vaultArtworkWrap} ${
              sequenceStep === 'shaking'
                ? styles.vaultShakingAnimation
                : sequenceStep === 'burst'
                ? styles.vaultBurstAnimation
                : sequenceStep === 'revealed'
                ? styles.vaultOpenedGlow
                : styles.vaultIdleFloating
            }`}
          >
            <img
              src={box.artwork}
              alt={box.name}
              className={styles.modalVaultImg}
            />
          </div>

          {/* Pedestal Base Reflection */}
          <div className={styles.podiumPlatformGlow} aria-hidden="true" />
        </div>

        {/* STEP 1: INSPECT (Ready or Locked) */}
        {sequenceStep === 'inspect' && (
          <div className={styles.stageInspect}>
            <h3 id="vault-modal-heading" className={styles.modalVaultTitle}>
              {box.name}
            </h3>
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
                  onClick={handleInitiateUnlock}
                  style={{ width: '100%', padding: '16px', fontSize: '15px' }}
                >
                  <Sparkle size={16} weight="fill" />
                  <span>Crack Vault Now</span>
                </button>
              ) : (
                <div className={styles.modalLockedNotice}>
                  <div className={styles.lockedNoticeText}>
                    <LockSimple size={15} weight="bold" />
                    <span>{box.requirement}</span>
                  </div>
                  <button
                    type="button"
                    className="ve-btn ve-btn-outline"
                    onClick={onClose}
                    style={{ width: '100%', marginTop: '8px' }}
                  >
                    Return to Roadmap
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: SHAKING (Cracking Lock) */}
        {sequenceStep === 'shaking' && (
          <div className={styles.stageCracking}>
            <div className={styles.lockBreakPill}>
              <LockSimple size={14} weight="bold" />
              <span>CRACKING MAGNETIC BOLTS...</span>
            </div>
            <h3 className={styles.crackingTitle}>OVERCHARGING CYBER DEADBOLTS</h3>
            <p className={styles.crackingSub}>Decoupling security seal and unboxing verified milestone payload</p>
            <div className={styles.cyberProgressBar}>
              <div className={styles.cyberProgressBarFill} />
            </div>
          </div>
        )}

        {/* STEP 3: BURST (Light Flash) */}
        {sequenceStep === 'burst' && (
          <div className={styles.stageBurst}>
            <div className={styles.flashBurstOverlay} aria-hidden="true" />
            <h3 className={styles.burstTitle}>LOCK BROKEN! VAULT BURSTING OPEN...</h3>
          </div>
        )}

        {/* STEP 4: REVEALED (Count-up & Claim) */}
        {sequenceStep === 'revealed' && (
          <div className={styles.stageRevealed}>
            <div className={styles.revealedSuccessTag}>
              <CheckCircle size={14} weight="fill" />
              <span>VAULT BREACH SUCCESSFUL!</span>
            </div>

            <h3 id="vault-modal-heading" className={styles.revealedTitle}>
              VAULT REWARDS UNLOCKED
            </h3>
            <p className={styles.revealedSub}>
              Congratulations! Your verified rewards have been decrypted and are ready for instant wallet credit.
            </p>

            {/* Flying & Settling Payout Cards with Animated Count-up */}
            <div className={styles.revealedCardsGrid}>
              {box.rewardDetails.ve > 0 && (
                <div className={styles.rewardPayoutPillVE}>
                  <img src="/assets/coin-ve-3d.png" alt="VE Coins" className={styles.payoutToken3dImg} />
                  <span className={styles.payoutAmountGold}>
                    <AnimatedCount target={box.rewardDetails.ve} duration={900} /> VEs
                  </span>
                  <span className={styles.payoutLabel}>Token Payout</span>
                </div>
              )}

              {box.rewardDetails.gems > 0 && (
                <div className={styles.rewardPayoutPillGem}>
                  <img src="/assets/gem-3d.png" alt="Gems" className={styles.payoutToken3dImg} />
                  <span className={styles.payoutAmountPurple}>
                    <AnimatedCount target={box.rewardDetails.gems} duration={900} /> Gems
                  </span>
                  <span className={styles.payoutLabel}>Rare Currency</span>
                </div>
              )}

              {box.rewardDetails.xp > 0 && (
                <div className={styles.rewardPayoutPillXP}>
                  <Lightning size={20} weight="fill" className={styles.payoutIconCyan} />
                  <span className={styles.payoutAmountCyan}>
                    <AnimatedCount target={box.rewardDetails.xp} duration={900} /> XP
                  </span>
                  <span className={styles.payoutLabel}>Progression Energy</span>
                </div>
              )}

              {box.rewardDetails.spins > 0 && (
                <div className={styles.rewardPayoutPillSpins}>
                  <ArrowsClockwise size={20} weight="bold" className={styles.payoutIconSpins} />
                  <span className={styles.payoutAmountSpins}>
                    +{box.rewardDetails.spins} Wheel Spins
                  </span>
                  <span className={styles.payoutLabel}>Lucky Arcade</span>
                </div>
              )}
            </div>

            {box.rewardDetails.bonus && (
              <div className={styles.bonusGrantedBanner}>
                <Sparkle size={13} weight="fill" className={styles.bonusSparkle} />
                <span>Tier Perk Granted: <strong>{box.rewardDetails.bonus}</strong></span>
              </div>
            )}

            <button
              type="button"
              className="ve-btn ve-btn-gold"
              onClick={handleClaim}
              style={{ width: '100%', padding: '16px', fontSize: '15px', fontWeight: 800 }}
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
