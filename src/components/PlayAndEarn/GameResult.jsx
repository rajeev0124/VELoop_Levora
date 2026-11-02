import React from 'react'
import {
  CaretLeft,
  ShareNetwork,
  ArrowsCounterClockwise,
  CaretRight,
  ShieldCheck,
  Lightning,
  Coins,
  Sparkle,
} from '@phosphor-icons/react'
import LaurelMedal from '../shared/LaurelMedal'
import styles from './PlayAndEarn.module.css'

const GameResult = ({ score, reward, onPlayAgain }) => {
  const xpEarned = reward?.xp || 30
  const veEarned = reward?.ves || 12
  const currentXP = 6420 + xpEarned
  const targetXP = 8000
  const progressPct = Math.min(100, Math.round((currentXP / targetXP) * 100))

  return (
    <div className={`${styles.gameResultScreen} animate-scaleIn`}>
      {/* Top Header Bar */}
      <div className={styles.resultTopBar}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={onPlayAgain}
          title="Play Again"
          aria-label="Back to Arcade"
        >
          <CaretLeft size={16} weight="bold" />
        </button>
        <div className={styles.verifiedHeaderBadge}>
          <ShieldCheck size={13} weight="duotone" className={styles.shieldIcon} />
          <span>Fair-Play Certified Audit</span>
        </div>
        <button
          type="button"
          className={styles.shareBtn}
          title="Share Victory"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'VELoop XP Catcher Score',
                text: `I just scored ${score} in VELoop XP Catcher and earned +${xpEarned} XP!`,
                url: window.location.href,
              }).catch(() => {})
            }
          }}
        >
          <ShareNetwork size={16} weight="duotone" />
        </button>
      </div>

      <div className={styles.resultTitleGroup}>
        <div className={styles.performanceTag}>
          <Sparkle size={12} weight="fill" />
          <span>PERFORMANCE AUDIT</span>
        </div>
        <h3 className={styles.resultTitle}>BLITZ COMPLETE!</h3>
        <p className={styles.resultSubtitle}>
          {reward?.label || 'Outstanding Reflex Execution • Rewards Verified'}
        </p>
      </div>

      {/* Golden Laurel Trophy Centerpiece */}
      <div className={styles.trophyWrapper}>
        <LaurelMedal size={96} />
      </div>

      {/* Executive Score & Rewards Matrix Card */}
      <div className={styles.resultCard}>
        {/* Final Score Row */}
        <div className={styles.finalScoreRow}>
          <span className={styles.scoreLead}>FINAL BLITZ SCORE</span>
          <div className={styles.scoreValueRow}>
            <span className={styles.scoreNumber}>{score}</span>
            <span className={styles.newBestBadge}>Verified Result</span>
          </div>
        </div>

        {/* Dual Payout Cards */}
        <div className={styles.rewardPillsGrid}>
          <div className={styles.rewardPillItemXP}>
            <div className={styles.rewardPillHeader}>
              <Lightning size={14} weight="fill" className={styles.pillIconXPColor} />
              <span className={styles.rewardPillLabel}>XP MINTED</span>
            </div>
            <span className={styles.rewardPillValueXP}>+{xpEarned} XP</span>
            <span className={styles.rewardPillSub}>Progression yield</span>
          </div>

          <div className={styles.rewardPillItemVE}>
            <div className={styles.rewardPillHeader}>
              <Coins size={14} weight="duotone" className={styles.pillIconVEColor} />
              <span className={styles.rewardPillLabel}>VE TOKENS</span>
            </div>
            <span className={styles.rewardPillValueVE}>+{veEarned} VEs</span>
            <span className={styles.rewardPillSub}>Direct deposit</span>
          </div>
        </div>

        {/* Tier Multiplier Callout */}
        <div className={styles.tierMultiplierCallout}>
          <span className={styles.tierDot} />
          <span>Includes <strong>1.15x Gold Guardian Rank Multiplier</strong></span>
        </div>

        {/* Dynamic Progression Bar */}
        <div className={styles.resultProgressSection}>
          <div className={styles.resultProgressLabels}>
            <span>Level 05 (Gold Guardian)</span>
            <span className={styles.progressPctText}>{progressPct}%</span>
            <span>Level 06 (Platinum)</span>
          </div>
          <div className={styles.resultProgressBarTrack}>
            <div
              className={styles.resultProgressBarFill}
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className={styles.resultProgressText}>
            {currentXP.toLocaleString()} / {targetXP.toLocaleString()} XP ({targetXP - currentXP} XP to Level 06)
          </div>
        </div>

        {/* Symmetrical Action Buttons */}
        <div className={styles.resultActions}>
          <button
            type="button"
            className="ve-btn ve-btn-gold"
            onClick={onPlayAgain}
            style={{ width: '100%', padding: '12px 18px' }}
          >
            <ArrowsCounterClockwise size={15} weight="bold" />
            <span>Play Another Round</span>
          </button>
          <button
            type="button"
            className="ve-btn ve-btn-outline"
            onClick={() => {
              const el = document.getElementById('earn')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{ width: '100%', padding: '10px 18px', fontSize: '12px' }}
          >
            <span>Explore Acceleration Hub</span>
            <CaretRight size={14} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameResult
