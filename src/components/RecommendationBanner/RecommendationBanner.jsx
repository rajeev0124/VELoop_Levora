import React from 'react'
import { Sparkle, ArrowRight, Play, Lightning, Timer } from '@phosphor-icons/react'
import TierMedallion from '../shared/TierMedallion'
import styles from './RecommendationBanner.module.css'

const RecommendationBanner = ({ data }) => {
  if (!data) return null

  const currentXP = data.currentXP || 6420
  const requiredXP = data.requiredXP || 8000
  const xpRemaining = data.xpRemaining || Math.max(0, requiredXP - currentXP)
  const pct = data.xpPercent || Math.min(100, Math.round((currentXP / requiredXP) * 100))
  const nextLvlNum = Number(data.nextLevel || 6)
  const nextLvl = String(nextLvlNum).padStart(2, '0')
  const nextLvlName = data.nextLevelName || 'Platinum Hero'
  const dailyVelocity = data.dailyVelocity || 215
  const estDays = Math.max(1, Math.ceil(xpRemaining / dailyVelocity))

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section aria-labelledby="recommendation-heading" className={`${styles.banner} animate-fadeInUp`}>
      {/* Ambient background lighting */}
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.ambientHairline} aria-hidden="true" />

      {/* Left: Floating 3D Horizon Crest (No Boxy Cage) */}
      <div className={styles.crestContainer} title={`Next Milestone: Level ${nextLvl} (${nextLvlName})`}>
        <div className={styles.crestBloom} aria-hidden="true" />
        <TierMedallion
          level={nextLvlNum}
          size={60}
          status="next"
          showStatusCorner={false}
          showRibbon={false}
          interactive={true}
        />
      </div>

      {/* Center: Precision Milestone Content */}
      <div className={styles.bannerBody}>
        {/* Kicker Row: Clean Category & Pace Badge */}
        <div className={styles.kickerRow}>
          <div className={styles.kickerBadge}>
            <Sparkle size={12} weight="fill" className={styles.kickerIcon} aria-hidden="true" />
            <span>PLATINUM HORIZON</span>
          </div>
          <span className={styles.kickerDot} aria-hidden="true">•</span>
          <span className={styles.kickerSub}>Next Milestone</span>
          <div className={styles.velocityBadge} title="Active daily XP earning pace">
            <Lightning size={11} weight="fill" className={styles.lightningIcon} aria-hidden="true" />
            <span>+{dailyVelocity} XP/day pace</span>
          </div>
        </div>

        {/* Clear, Authoritative Headline (No redundant repeats) */}
        <h2 id="recommendation-heading" className={styles.bannerHeading}>
          Only <span className={styles.goldNumber}>{xpRemaining.toLocaleString()} XP</span> to reach Level {nextLvl} ({nextLvlName})
        </h2>

        {/* High-Precision Gauge Bar */}
        <div className={styles.gaugeWrapper}>
          <div
            className={styles.gaugeTrack}
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label={`Milestone progress: ${pct}%`}
          >
            <div className={styles.gaugeFill} style={{ width: `${pct}%` }}>
              <span className={styles.gaugeCap} aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Unified, Harmonious Metadata Line */}
        <div className={styles.metaRow}>
          <div className={styles.xpProgress}>
            <strong className={styles.currentVal}>{currentXP.toLocaleString()}</strong>
            <span className={styles.maxVal}> / {requiredXP.toLocaleString()} XP</span>
            <span className={styles.pctTag}>({pct}%)</span>
          </div>
          <span className={styles.metaDivider} aria-hidden="true">•</span>
          <div className={styles.etaText}>
            <Timer size={12} weight="bold" className={styles.timerIcon} aria-hidden="true" />
            <span>Est. <strong>~{estDays} days</strong> at current pace — or accelerate with <strong>1 Arcade Blitz</strong></span>
          </div>
        </div>
      </div>

      {/* Right: Architectural, Proportional CTAs */}
      <div className={styles.bannerActions}>
        <button
          type="button"
          className={styles.btnPrimary}
          onClick={() => scrollToSection('arcade')}
          aria-label="Launch XP Catcher Blitz in Arcade"
        >
          <Play size={13} weight="fill" aria-hidden="true" />
          <span>Play XP Catcher</span>
        </button>
        <button
          type="button"
          className={styles.btnSecondary}
          onClick={() => scrollToSection('earn')}
          aria-label="Explore Acceleration Tasks"
        >
          <span>Explore Tasks</span>
          <ArrowRight size={13} weight="bold" className={styles.arrowIcon} aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}

export default RecommendationBanner
