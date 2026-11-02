import React, { useEffect, useState } from 'react'
import {
  Sparkle,
  CheckCircle,
  Fire,
  Lightning,
  TrendUp,
  ShieldCheck,
} from '@phosphor-icons/react'
import TierMedallion from '../shared/TierMedallion'
import InfoTooltip from '../InfoTooltip/InfoTooltip'
import styles from './LevelHero.module.css'

const useCountUp = (target, duration = 1200, start = false) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start || !target) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

const LevelHero = ({ data, onTriggerLevelUp }) => {
  const [animStart, setAnimStart] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimStart(true), 150)
    return () => clearTimeout(timer)
  }, [])

  const currentLvl = data?.currentLevel || 5
  const currentLvlName = data?.currentLevelData?.name || 'Gold Guardian'
  const nextLvl = data?.nextLevel || 6
  const nextLvlName = data?.nextLevelName || 'Platinum Hero'
  const xpCount = useCountUp(data?.currentXP || 6420, 1200, animStart)
  const pct = data?.xpPercent || 80
  const xpRemaining = data?.xpRemaining || 1580
  const reqXP = data?.requiredXP || 8000

  return (
    <article aria-labelledby="current-level-heading" className={styles.masterCard}>
      {/* Ambient background energy aura */}
      <div className={styles.cardAura} aria-hidden="true" />
      <div className={styles.specularShimmer} aria-hidden="true" />

      {/* Top Status Capsule Bar */}
      <div className={styles.cockpitTopBar}>
        <div className={styles.statusPillsRow}>
          <div className={styles.greetingPill}>
            <Sparkle size={12} weight="fill" className={styles.greetingSparkle} />
            <span>Good Morning, VeLooper!</span>
          </div>
          <div className={styles.activeRankBadge} onClick={onTriggerLevelUp} role="button" tabIndex={0} title="Preview Sovereign Rank">
            <ShieldCheck size={13} weight="duotone" />
            <span>LEVEL {String(currentLvl).padStart(2, '0')} ACTIVE RANK</span>
          </div>
        </div>
        <InfoTooltip text="XP fuels your VELOOP rank promotions. Higher levels unlock sovereign milestone vaults, cashout bonuses, and arcade score multipliers." />
      </div>

      {/* Main Identity Row: Grand 3D Emblem + Live Counter */}
      <div className={styles.heroIdentityRow}>
        <div className={styles.emblemContainer} onClick={onTriggerLevelUp} title="Inspect Active Sovereign Emblem" role="button" tabIndex={0}>
          <TierMedallion level={currentLvl} size={92} status="current" showStatusCorner={true} />
        </div>

        <div className={styles.heroStatsCol}>
          <div className={styles.tierRankLabel}>
            <span className={styles.tierRankPrefix}>CURRENT SOVEREIGN RANK</span>
            <h3 className={styles.tierRankName}>{currentLvlName}</h3>
          </div>

          <div id="current-level-heading" className={styles.xpBigCounter}>
            <span className={styles.xpNumber}>{animStart ? xpCount.toLocaleString() : '0'}</span>
            <span className={styles.xpUnit}>XP</span>
          </div>

          <div className={styles.xpTargetHorizon}>
            <span className={styles.xpRemainingHighlight}>{xpRemaining.toLocaleString()} XP remaining</span>
            <span className={styles.horizonDivider}>•</span>
            <span className={styles.nextTargetText}>Next Target: Level {String(nextLvl).padStart(2, '0')} ({nextLvlName})</span>
          </div>
        </div>
      </div>

      {/* High-Tech Segmented Energy Conduit XP Progress Bar */}
      <div className={styles.conduitProgressArea}>
        <div className={styles.conduitLabelsRow}>
          <span className={styles.conduitCurrentVal}>
            {data?.currentXP?.toLocaleString()} / {reqXP.toLocaleString()} XP
          </span>
          <div className={styles.velocityCapsule}>
            <Lightning size={11} weight="fill" className={styles.velocityIcon} />
            <span>+215 XP/day • ~8 Days Remaining</span>
          </div>
          <span className={styles.conduitPctText}>{pct}%</span>
        </div>

        {/* Segmented Conduit Trench */}
        <div
          className={styles.conduitTrack}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progress to Level ${nextLvl}: ${pct}%`}
        >
          {/* Milestone Ticks */}
          <div className={styles.conduitTicksWrap} aria-hidden="true">
            <span className={styles.tickPip} style={{ left: '25%' }} title="25% Milestone" />
            <span className={styles.tickPip} style={{ left: '50%' }} title="50% Milestone" />
            <span className={styles.tickPip} style={{ left: '75%' }} title="75% Milestone" />
          </div>

          {/* Plasma Beam Fill */}
          <div
            className={styles.conduitFill}
            style={{
              width: animStart ? `${pct}%` : '0%',
              transition: animStart ? 'width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
            }}
          >
            {/* Pulsing Capacitor Pip on Leading Edge */}
            <span className={styles.capacitorSpark} />
          </div>
        </div>
      </div>

      {/* Today's Boost Telemetry Chips */}
      <div className={styles.boostTelemetrySection}>
        <div className={styles.boostSectionHead}>
          <div className={styles.boostTitleWrap}>
            <Lightning size={13} weight="fill" className={styles.boostZap} aria-hidden="true" />
            <span className={styles.boostTitle}>TODAY'S MOMENTUM & MULTIPLIERS</span>
          </div>
          <span className={styles.boostAuditStatus}>Real-Time Telemetry</span>
        </div>

        <div className={styles.boostGrid}>
          {/* XP Velocity */}
          <div className={styles.boostChip}>
            <div className={`${styles.boostIconBadge} ${styles.iconGold}`}>
              <Sparkle size={15} weight="fill" />
            </div>
            <div className={styles.boostTextWrap}>
              <span className={styles.boostVal}>+215 XP</span>
              <span className={styles.boostLabel}>Today's Yield</span>
            </div>
          </div>

          {/* Daily Quests */}
          <div className={styles.boostChip}>
            <div className={`${styles.boostIconBadge} ${styles.iconCyan}`}>
              <CheckCircle size={15} weight="duotone" />
            </div>
            <div className={styles.boostTextWrap}>
              <span className={styles.boostVal}>4 / 8 Tasks</span>
              <span className={styles.boostLabel}>Daily Quotas</span>
            </div>
          </div>

          {/* Streak Multiplier */}
          <div className={styles.boostChip}>
            <div className={`${styles.boostIconBadge} ${styles.iconRose}`}>
              <Fire size={15} weight="fill" />
            </div>
            <div className={styles.boostTextWrap}>
              <span className={styles.boostVal}>5-Day Flame</span>
              <span className={styles.boostLabel}>1.15x Score Multiplier</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default LevelHero
