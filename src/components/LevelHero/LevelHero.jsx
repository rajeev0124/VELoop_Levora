import React, { useEffect, useState } from 'react'
import {
  Sparkle,
  CheckCircle,
  Fire,
  Lightning,
  ShieldCheck,
  Play,
  ArrowRight,
  Timer,
  TrendUp,
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
    const timer = setTimeout(() => setAnimStart(true), 120)
    return () => clearTimeout(timer)
  }, [])

  const currentLvl = data?.currentLevel || 5
  const currentLvlName = data?.currentLevelData?.name || 'Gold Guardian'
  const nextLvl = data?.nextLevel || 6
  const nextLvlName = data?.nextLevelName || 'Platinum Hero'
  const xpCount = useCountUp(data?.currentXP || 6420, 1100, animStart)
  const pct = data?.xpPercent || 80
  const xpRemaining = data?.xpRemaining || 1580
  const reqXP = data?.requiredXP || 8000
  const dailyVelocity = data?.dailyVelocity || 215
  const etaDays = Math.max(1, Math.ceil(xpRemaining / dailyVelocity))
  const streakDays = data?.streakDays || 7
  const tasksDone = data?.tasksDone || 4
  const tasksTotal = data?.tasksTotal || 8

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <article aria-labelledby="current-level-heading" className={styles.masterCard}>
      {/* Ambient Energy Aura */}
      <div className={styles.cardAura} aria-hidden="true" />
      <div className={styles.specularShimmer} aria-hidden="true" />

      {/* Top Status Bar */}
      <div className={styles.cockpitTopBar}>
        <div className={styles.statusPillsRow}>
          <div className={styles.greetingPill}>
            <span className={styles.greetingPingDot} aria-hidden="true" />
            <span>Active Member Profile</span>
          </div>
          <div
            className={styles.activeRankBadge}
            onClick={onTriggerLevelUp}
            role="button"
            tabIndex={0}
            title="Inspect Level 05 Sovereign Privileges"
          >
            <ShieldCheck size={14} weight="duotone" />
            <span>LEVEL {String(currentLvl).padStart(2, '0')} ACTIVE RANK</span>
          </div>
        </div>
        <InfoTooltip text="XP fuels your VELoop rank promotions. Level 06 unlocks at 8,000 XP granting the Platinum Milestone Safe (+500 VEs & +25 Gems)." />
      </div>

      {/* Main Identity Row: Grand 3D Badge + Live Tabular Counter */}
      <div className={styles.heroIdentityRow}>
        <div
          className={styles.emblemContainer}
          onClick={onTriggerLevelUp}
          title="Inspect Sovereign Gold Guardian Badge"
          role="button"
          tabIndex={0}
        >
          {/* Rotating Light Sheen Sweep Overlay */}
          <div className={styles.emblemSheenSweep} aria-hidden="true" />
          <TierMedallion
            level={currentLvl}
            size={114}
            status="current"
            showStatusCorner={false}
            showRibbon={false}
          />
        </div>

        <div className={styles.heroStatsCol}>
          <div className={styles.tierRankLabel}>
            <span className={styles.tierRankPrefix}>CURRENT MEMBER RANK</span>
            <h1 className={styles.tierRankName}>{currentLvlName}</h1>
          </div>

          <div id="current-level-heading" className={styles.xpBigCounter}>
            <span className={`${styles.xpNumber} tabular-nums`}>
              {animStart ? xpCount.toLocaleString() : '0'}
            </span>
            <span className={styles.xpUnit}>XP</span>
          </div>

          {/* Fix misleading wording: crystal clear "1,580 XP to Level 06" + ETA Chip */}
          <div className={styles.xpTargetHorizon}>
            <span className={styles.xpRemainingHighlight}>
              <strong>{xpRemaining.toLocaleString()} XP</strong> to Level {String(nextLvl).padStart(2, '0')}
            </span>
            <span className={styles.horizonDivider}>•</span>
            <div className={styles.etaChip} title="Estimated days to promote based on current pace">
              <Timer size={12} weight="duotone" className={styles.etaIcon} />
              <span>~{etaDays} Days Remaining</span>
            </div>
          </div>
        </div>
      </div>

      {/* High-Tech Shimmering Energy Conduit XP Progress Bar */}
      <div className={styles.conduitProgressArea}>
        <div className={styles.conduitLabelsRow}>
          <span className={`${styles.conduitCurrentVal} tabular-nums`}>
            {data?.currentXP?.toLocaleString()} / {reqXP.toLocaleString()} XP
          </span>
          <div className={styles.velocityCapsule}>
            <Lightning size={12} weight="fill" className={styles.velocityIcon} />
            <span>+{dailyVelocity} XP/day pace</span>
          </div>
          <span className={`${styles.conduitPctText} tabular-nums`}>{pct}%</span>
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

          {/* Plasma Beam Fill with Shimmer */}
          <div
            className={styles.conduitFill}
            style={{
              width: animStart ? `${pct}%` : '0%',
              transition: animStart ? 'width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
            }}
          >
            <div className={styles.conduitShimmerBeam} />
            <span className={styles.capacitorSpark} />
          </div>
        </div>
      </div>

      {/* Hero CTA Action Row (Play XP Catcher / Explore Tasks) */}
      <div className={styles.heroCtaRow}>
        <button
          type="button"
          className="ve-btn ve-btn-gold"
          onClick={() => scrollToSection('arcade')}
          aria-label="Launch XP Catcher Arcade game"
        >
          <Play size={14} weight="fill" aria-hidden="true" />
          <span>Play XP Catcher</span>
        </button>
        <button
          type="button"
          className="ve-btn ve-btn-outline"
          onClick={() => scrollToSection('earn')}
          aria-label="Explore daily tasks to earn XP"
        >
          <span>Explore Tasks</span>
          <ArrowRight size={14} weight="bold" aria-hidden="true" />
        </button>
      </div>

      {/* SECTION 3: Today's Boost (3 Stat Tiles with mini progress indicators & hover lift) */}
      <div className={styles.boostTelemetrySection}>
        <div className={styles.boostSectionHead}>
          <div className={styles.boostTitleWrap}>
            <Lightning size={13} weight="fill" className={styles.boostZap} aria-hidden="true" />
            <span className={styles.boostTitle}>DAILY MOMENTUM & YIELD</span>
          </div>
          <span className={styles.boostAuditStatus}>Real-Time Velocity</span>
        </div>

        <div className={styles.boostGrid}>
          {/* Tile 1: XP Earned Today */}
          <div className={styles.boostTile}>
            <div className={styles.boostTileTop}>
              <div className={`${styles.boostIconBadge} ${styles.iconGold}`}>
                <Sparkle size={16} weight="fill" />
              </div>
              <div className={styles.boostTextWrap}>
                <span className={`${styles.boostVal} tabular-nums`}>+{dailyVelocity} XP</span>
                <span className={styles.boostLabel}>Today's Yield</span>
              </div>
            </div>
            <div className={styles.miniProgressWrap}>
              <div className={styles.miniProgressTrack}>
                <div className={`${styles.miniProgressFill} ${styles.fillGold}`} style={{ width: '72%' }} />
              </div>
              <span className={styles.miniProgressCaption}>Daily target: 300 XP</span>
            </div>
          </div>

          {/* Tile 2: Tasks Done — Emerald Jade (Quotas/Vitality) */}
          <div className={styles.boostTile}>
            <div className={styles.boostTileTop}>
              <div className={`${styles.boostIconBadge} ${styles.iconEmerald}`}>
                <CheckCircle size={16} weight="duotone" />
              </div>
              <div className={styles.boostTextWrap}>
                <span className={`${styles.boostVal} tabular-nums`}>{tasksDone} / {tasksTotal} Tasks</span>
                <span className={styles.boostLabel}>Daily Quotas</span>
              </div>
            </div>
            <div className={styles.miniProgressWrap}>
              <div className={styles.miniProgressTrack}>
                <div className={`${styles.miniProgressFill} ${styles.fillEmerald}`} style={{ width: `${(tasksDone / tasksTotal) * 100}%` }} />
              </div>
              <span className={styles.miniProgressCaption}>50% tasks completed</span>
            </div>
          </div>

          {/* Tile 3: 7-Day Streak — Cosmic Royal Violet (Multiplier Telemetry) */}
          <div className={styles.boostTile}>
            <div className={styles.boostTileTop}>
              <div className={`${styles.boostIconBadge} ${styles.iconViolet}`}>
                <Fire size={16} weight="fill" />
              </div>
              <div className={styles.boostTextWrap}>
                <span className={`${styles.boostVal} tabular-nums`}>{streakDays}-Day Streak</span>
                <span className={styles.boostLabel}>1.15x Multiplier</span>
              </div>
            </div>
            <div className={styles.miniProgressWrap}>
              <div className={styles.miniProgressTrack}>
                <div className={`${styles.miniProgressFill} ${styles.fillViolet}`} style={{ width: '100%' }} />
              </div>
              <span className={styles.miniProgressCaption}>Active • Next tier in 3 days</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default LevelHero
