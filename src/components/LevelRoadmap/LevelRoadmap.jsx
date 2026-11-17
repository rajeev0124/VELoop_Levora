import React, { useState, useRef, useEffect } from 'react'
import {
  CheckCircle,
  Sparkle,
  Crosshair,
  LockSimple,
  CaretLeft,
  CaretRight,
  Crown,
  Fire,
  Check,
  MapPin,
  X,
  ArrowRight,
  Lightning,
  Timer,
  ShieldCheck,
  Coins,
  LockKey,
  TrendUp,
} from '@phosphor-icons/react'
import styles from './LevelRoadmap.module.css'
import { levelStateConfig } from '../../data/levelData'
import TierMedallion from '../shared/TierMedallion'

// 3D Asset Resolution per Level for the Milestone Vault Hologram Pod
const getVaultAssetForLevel = (lvl) => {
  if (lvl === 5) return '/assets/vault-gold-guardian.png'
  if (lvl === 6) return '/assets/vault-platinum-hero.png'
  if (lvl === 7) return '/assets/vault-prismatic-diamond.png'
  if (lvl === 2 || lvl === 4) return '/assets/gem-3d.png'
  return '/assets/coin-ve-3d.png'
}

// RPG Perk Shard Classification (Transforms SaaS bullet checklist into AAA RPG equipment shards)
const getPerkShardMeta = (perkText) => {
  const text = String(perkText || '').toLowerCase()
  if (text.includes('ve') || text.includes('coin') || text.includes('grant') || text.includes('gem') || text.includes('vault') || text.includes('deposit')) {
    return {
      category: 'ECONOMIC BOUNTY',
      type: 'bounty',
      icon: Coins,
      accentClass: styles.shardGold,
      badge: 'VAULT GRANT',
    }
  }
  if (text.includes('multiplier') || text.includes('boost') || text.includes('arcade') || text.includes('velocity') || text.includes('xp') || text.includes('speed')) {
    return {
      category: 'TACTICAL CATALYST',
      type: 'catalyst',
      icon: Lightning,
      accentClass: styles.shardCyan,
      badge: 'MULTIPLIER',
    }
  }
  if (text.includes('shield') || text.includes('armor') || text.includes('streak') || text.includes('freeze')) {
    return {
      category: 'DEFENSIVE PROTOCOL',
      type: 'defense',
      icon: ShieldCheck,
      accentClass: styles.shardOrange,
      badge: 'STREAK ARMOR',
    }
  }
  return {
    category: 'SOVEREIGN PRESTIGE',
    type: 'prestige',
    icon: Crown,
    accentClass: styles.shardPurple,
    badge: 'VIP ACCESS',
  }
}

// Clean concise reward string formatting (guaranteed no ++ and no clipping)
const formatCardReward = (lvl) => {
  if (!lvl?.reward) return ''
  const { amount, type } = lvl.reward
  const amountStr = String(amount || '').trim()

  if (lvl.level === 6) {
    return '+500 VEs • +25 Gems'
  }
  if (lvl.level === 7) {
    return '100 SVEs Safe Vault'
  }
  if (lvl.level === 10) {
    return 'Tier 1 Safe Vault'
  }

  if (amountStr.includes('VEs') || amountStr.includes('Gems') || amountStr.includes('Safe') || amountStr.includes('SVEs')) {
    return amountStr.replace(/^\++/, '+')
  }

  const cleanAmount = amountStr.replace(/^\++/, '')
  const num = Number(cleanAmount)
  const displayAmount = !isNaN(num) ? num.toLocaleString() : cleanAmount
  return `+${displayAmount} ${type || ''}`.trim()
}

const LevelRoadmap = ({ data }) => {
  const currentLvl = data?.currentLevel || 5
  // Exactly all 7 levels as defined in VELoop task requirements
  const allLevels = (data?.allLevels || []).slice(0, 7)
  const currentXP = data?.currentXP || 6420
  const dailyVelocity = data?.dailyVelocity || 215
  const streakDays = data?.streakDays || 7
  const streakMultiplier = data?.streakMultiplier || 1.15
  const nextTargetXP = data?.requiredXP || 8000
  const nextTierName = data?.nextLevelName || 'Platinum Hero'

  // Active selected level for the Level Detail Panel
  const [selectedLevel, setSelectedLevel] = useState(
    () => allLevels.find((l) => l.level === currentLvl) || allLevels[4] || null
  )

  // Mobile Slide-up Sheet Open state
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false)
  const touchStartY = useRef(0)

  const scrollRef = useRef(null)
  const nodeRefs = useRef({})

  // Close sheet with Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileSheetOpen(false)
    }
    if (isMobileSheetOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileSheetOpen])

  // Smooth scroll helper to center any level node
  const scrollToLevel = (lvlNum, smooth = true) => {
    const nodeEl = nodeRefs.current[lvlNum]
    const container = scrollRef.current
    if (nodeEl && container) {
      const containerWidth = container.offsetWidth
      const nodeLeft = nodeEl.offsetLeft
      const nodeWidth = nodeEl.offsetWidth
      const targetScroll = nodeLeft - containerWidth / 2 + nodeWidth / 2
      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: smooth ? 'smooth' : 'auto',
      })
    }
  }

  // Smooth wheel horizontal scroll
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        container.scrollLeft += e.deltaY * 0.95
      }
    }
    container.addEventListener('wheel', onWheel, { passive: false })
    return () => container.removeEventListener('wheel', onWheel)
  }, [])

  // Auto-center current level on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToLevel(currentLvl, false)
    }, 180)
    return () => clearTimeout(timer)
  }, [currentLvl])

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' })
    }
  }

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' })
    }
  }

  const handleNodeSelect = (lvl) => {
    setSelectedLevel(lvl)
    // On small screens, trigger mobile slide-up sheet
    if (window.innerWidth < 992) {
      setIsMobileSheetOpen(true)
    }
  }

  const handleCycleTier = (direction) => {
    const currentIndex = allLevels.findIndex((l) => l.level === activeLevelData.level)
    if (currentIndex === -1) return
    const newIndex = direction === 'next'
      ? Math.min(allLevels.length - 1, currentIndex + 1)
      : Math.max(0, currentIndex - 1)
    const nextLvl = allLevels[newIndex]
    setSelectedLevel(nextLvl)
    scrollToLevel(nextLvl.level, true)
  }

  // Touch swipe-down on bottom sheet
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    const deltaY = e.changedTouches[0].clientY - touchStartY.current
    if (deltaY > 60) {
      setIsMobileSheetOpen(false)
    }
  }

  const activeLevelData = selectedLevel || allLevels.find((l) => l.level === currentLvl) || allLevels[4]

  // Status determinations
  const isCompleted = activeLevelData.level < currentLvl
  const isCurrent = activeLevelData.level === currentLvl
  const isNext = activeLevelData.level === currentLvl + 1
  const isLocked = activeLevelData.level > currentLvl + 1

  // Percentage & XP difference calculation
  const percentToLevel = Math.min(
    100,
    Math.max(0, Math.round((currentXP / activeLevelData.xpRequired) * 100))
  )
  const xpDifference = activeLevelData.xpRequired - currentXP

  return (
    <section aria-labelledby="roadmap-heading" className={styles.section}>
      {/* Section Header with Dynamic Legend & Controls */}
      <div className={styles.sectionHead}>
        <div className={styles.titleWrap}>
          <div className={styles.headerBadge}>
            <Sparkle size={12} weight="fill" className={styles.sparkleIcon} />
            <span>PROGRESSION PIPELINE</span>
          </div>
          <h2 id="roadmap-heading" className="section-title">
            Level Journey (All 7 Levels)
          </h2>
          <p className="section-subtitle">
            Visual 7-tier milestone progression — click any tier node to inspect criteria, perks, and reward vaults.
          </p>
        </div>

        <div className={styles.headActions}>
          {/* Clean Unified Legend */}
          <div className={styles.legend} role="list" aria-label="Roadmap Legend">
            <span className={styles.legendItem} role="listitem">
              <span className={styles.legendDotCompleted} /> Completed
            </span>
            <span className={styles.legendItem} role="listitem">
              <span className={styles.legendDotCurrent} /> Active Rank
            </span>
            <span className={styles.legendItem} role="listitem">
              <span className={styles.legendDotNext} /> Next Target
            </span>
            <span className={styles.legendItem} role="listitem">
              <span className={styles.legendDotLocked} /> Locked
            </span>
          </div>

          {/* Quick Jump & Scroll Controls */}
          <div className={styles.controlGroup}>
            <button
              type="button"
              className={styles.jumpBtn}
              onClick={() => {
                const current = allLevels.find((l) => l.level === currentLvl)
                if (current) handleNodeSelect(current)
                scrollToLevel(currentLvl, true)
              }}
              title="Jump to Current Level"
            >
              <MapPin size={14} weight="fill" className={styles.jumpPinIcon} />
              <span>Current (L{String(currentLvl).padStart(2, '0')})</span>
            </button>
            <div className={styles.chevronGroup}>
              <button
                type="button"
                className={styles.chevronBtn}
                onClick={handleScrollLeft}
                aria-label="Scroll roadmap left"
              >
                <CaretLeft size={16} weight="bold" />
              </button>
              <button
                type="button"
                className={styles.chevronBtn}
                onClick={handleScrollRight}
                aria-label="Scroll roadmap right"
              >
                <CaretRight size={16} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Milestone Conduit Rail with Edge Fade Overlays */}
      <div className={styles.roadmapScrollContainer}>
        {/* Subtle Edge Fades for Seamless Mobile Edge Overflow */}
        <div className={styles.edgeFadeLeft} aria-hidden="true" />
        <div className={styles.edgeFadeRight} aria-hidden="true" />

        <div
          className={styles.roadmapScroll}
          ref={scrollRef}
          tabIndex={0}
          aria-label="Horizontal Level Progression Track"
        >
          <div className={styles.roadmapTrack}>
            {allLevels.map((lvl, idx) => {
              const isNodeSelected = activeLevelData.level === lvl.level
              const nodeCompleted = lvl.level < currentLvl
              const nodeCurrent = lvl.level === currentLvl
              const nodeNext = lvl.level === currentLvl + 1
              const nodeLocked = lvl.level > currentLvl + 1
              const isApex = lvl.level === 7

              let nodeStateClass = styles.nodeLocked
              if (nodeCompleted) nodeStateClass = styles.nodeCompleted
              if (nodeCurrent) nodeStateClass = styles.nodeCurrent
              if (nodeNext) nodeStateClass = styles.nodeNext

              return (
                <div
                  key={lvl.level}
                  ref={(el) => (nodeRefs.current[lvl.level] = el)}
                  className={`${styles.nodeWrapper} ${isNodeSelected ? styles.nodeWrapperSelected : ''}`}
                  onClick={() => handleNodeSelect(lvl)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleNodeSelect(lvl)
                    }
                    if (e.key === 'ArrowRight' && idx < allLevels.length - 1) {
                      e.preventDefault()
                      handleNodeSelect(allLevels[idx + 1])
                      scrollToLevel(allLevels[idx + 1].level, true)
                    }
                    if (e.key === 'ArrowLeft' && idx > 0) {
                      e.preventDefault()
                      handleNodeSelect(allLevels[idx - 1])
                      scrollToLevel(allLevels[idx - 1].level, true)
                    }
                  }}
                  aria-label={`Level ${lvl.level}: ${lvl.name}, ${lvl.status}`}
                >
                  {/* Symmetrical Micro-Vault Node Card */}
                  <div
                    className={`${styles.nodeCard} ${nodeStateClass} ${
                      isNodeSelected ? styles.nodeCardSelected : ''
                    } ${isApex ? styles.nodeCardApex : ''}`}
                  >
                    {/* Active Crown Spotlight */}
                    {nodeCurrent && <div className={styles.activeSpotlight} aria-hidden="true" />}

                    {/* Edge Docking Ports (Connects to the Laser Conduit Rail) */}
                    <span
                      className={`${styles.dockPort} ${styles.dockPortLeft} ${
                        nodeCompleted ? styles.dockPortCompleted : nodeCurrent ? styles.dockPortCurrent : nodeNext ? styles.dockPortNext : ''
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`${styles.dockPort} ${styles.dockPortRight} ${
                        nodeCompleted ? styles.dockPortCompleted : nodeCurrent ? styles.dockPortCurrent : nodeNext ? styles.dockPortNext : ''
                      }`}
                      aria-hidden="true"
                    />

                    {/* Top Uniform Status Pill */}
                    <div className={styles.statusPillSlot}>
                      {nodeCompleted && (
                        <span className={styles.pillCompleted}>
                          <CheckCircle size={11} weight="fill" /> COMPLETED
                        </span>
                      )}
                      {nodeCurrent && (
                        <span className={styles.pillCurrent}>
                          <span className={styles.radarDot} /> ACTIVE RANK
                        </span>
                      )}
                      {nodeNext && (
                        <span className={styles.pillNext}>
                          <Crosshair size={11} weight="bold" /> TARGET GOAL
                        </span>
                      )}
                      {nodeLocked && (
                        <span className={styles.pillLocked}>
                          <LockSimple size={11} weight="bold" /> LOCKED
                        </span>
                      )}
                    </div>

                    {/* Standardized Circular Medallion Pedestal (Guarantees Consistent Visual Scale) */}
                    <div
                      className={`${styles.pedestalStage} ${
                        nodeCurrent ? styles.pedestalCurrent : nodeNext ? styles.pedestalNext : nodeCompleted ? styles.pedestalCompleted : styles.pedestalLocked
                      }`}
                    >
                      <div className={styles.pedestalAura} aria-hidden="true" />
                      <TierMedallion
                        level={lvl.level}
                        size={52}
                        status={nodeCompleted ? 'completed' : nodeCurrent ? 'current' : nodeNext ? 'next' : 'locked'}
                        showStatusCorner={false}
                      />
                    </div>

                    {/* Level Tag & Tier Name */}
                    <div className={styles.nodeTypography}>
                      <span className={styles.nodeLevelNum}>
                        LVL {String(lvl.level).padStart(2, '0')}
                      </span>
                      <h4 className={styles.nodeTierName} title={lvl.name}>
                        {lvl.name}
                      </h4>
                      <span
                        className={`${styles.nodeXPTarget} ${
                          nodeCompleted
                            ? styles.xpCompleted
                            : nodeCurrent
                            ? styles.xpCurrent
                            : nodeNext
                            ? styles.xpNext
                            : styles.xpLocked
                        } tabular-nums`}
                      >
                        {lvl.xpRequired.toLocaleString()} XP
                      </span>
                    </div>

                    {/* Bottom Milestone Reward Capsule (Clean text, no truncation or ++) */}
                    <div
                      className={`${styles.rewardCapsule} ${
                        nodeCompleted ? styles.rewardCapsuleCompleted : ''
                      } ${nodeCurrent ? styles.rewardCapsuleCurrent : ''} ${
                        nodeNext ? styles.rewardCapsuleNext : ''
                      } ${nodeLocked ? styles.rewardCapsuleLocked : ''}`}
                      title={lvl.reward ? `Reward: ${lvl.reward.type || lvl.reward.amount}` : ''}
                    >
                      {lvl.reward?.icon && (
                        <img
                          src={lvl.reward.icon}
                          alt=""
                          aria-hidden="true"
                          className={styles.rewardIconImg}
                        />
                      )}
                      <span className={styles.rewardCapsuleText}>
                        {formatCardReward(lvl)}
                      </span>
                    </div>
                  </div>

                  {/* Connecting Line Segment with Laser Flow Fill (Runs AFTER the node) */}
                  {idx < allLevels.length - 1 && (
                    <div
                      className={`${styles.conduitSegment} ${
                        lvl.level < currentLvl
                          ? styles.conduitCompleted
                          : lvl.level === currentLvl
                          ? styles.conduitActiveCharging
                          : styles.conduitLocked
                      }`}
                      aria-hidden="true"
                    >
                      {lvl.level === currentLvl && <div className={styles.chargingBeam} />}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* SECTION 5: LEVEL DETAIL PANEL (Desktop Flight-Deck Tactical HUD & 3D Vault Holo-Stage) */}
      <div className={styles.inspectorDock} aria-labelledby="detail-panel-title">
        <div className={styles.dockGlowAura} aria-hidden="true" />
        <div className={styles.dockScanlineOverlay} aria-hidden="true" />

        <div className={styles.dockGrid}>
          {/* Col 1: Monumental 3D Holo-Pedestal Stage & Tier Codex */}
          <div className={styles.dockTierCol}>
            <div className={styles.holoStageContainer}>
              <div className={styles.holoFloorRing} aria-hidden="true" />
              <div className={styles.holoLightShaft} aria-hidden="true" />

              {/* Quick-Cycle Prev Button */}
              <button
                type="button"
                className={`${styles.dockPedestalNavBtn} ${styles.dockPedestalNavPrev}`}
                onClick={() => handleCycleTier('prev')}
                disabled={activeLevelData.level === 1}
                title="Previous Sector Tier"
                aria-label="Previous Sector Tier"
              >
                <CaretLeft size={16} weight="bold" />
              </button>

              <div className={styles.dockBadgeWrapper}>
                <TierMedallion
                  level={activeLevelData.level}
                  size={98}
                  status={isCompleted ? 'completed' : isCurrent ? 'current' : isNext ? 'next' : 'locked'}
                  showStatusCorner={false}
                />
              </div>

              {/* Quick-Cycle Next Button */}
              <button
                type="button"
                className={`${styles.dockPedestalNavBtn} ${styles.dockPedestalNavNext}`}
                onClick={() => handleCycleTier('next')}
                disabled={activeLevelData.level === allLevels.length}
                title="Next Sector Tier"
                aria-label="Next Sector Tier"
              >
                <CaretRight size={16} weight="bold" />
              </button>

              <span className={styles.holoStageBaseText}>HOLO-CONTAINMENT DAIS // LVL 0{activeLevelData.level}</span>
            </div>

            <div className={styles.dockTierInfo}>
              <div className={styles.dockHeadingRow}>
                <div className={styles.tacticalSectorTag}>
                  <span
                    className={
                      isCompleted
                        ? styles.sectorLedGreen
                        : isCurrent
                        ? styles.sectorLedGold
                        : isNext
                        ? styles.sectorLedPurple
                        : styles.sectorLedGray
                    }
                  />
                  <span className={styles.sectorCode}>SECTOR L0{activeLevelData.level}</span>
                  <span className={styles.sectorDivider}>//</span>
                  <span className={styles.sectorStatusText}>
                    {isCompleted
                      ? 'HISTORIC MILESTONE'
                      : isCurrent
                      ? 'SOVEREIGN ACTIVE'
                      : isNext
                      ? 'TARGET GOAL'
                      : 'SECTOR ENCRYPTED'}
                  </span>
                </div>
              </div>

              <h3 id="detail-panel-title" className={styles.dockTierTitle}>
                {activeLevelData.name}
              </h3>
              <div className={styles.dockCodexMeta}>
                <span className={styles.dockRarityBadge}>
                  {activeLevelData.rarity}
                </span>
                <span className={styles.dockDotDivider}>•</span>
                <span className={styles.dockMaterialText}>{activeLevelData.material}</span>
              </div>
              <p className={styles.dockTierLore}>{activeLevelData.lore}</p>
            </div>
          </div>

          {/* Col 2: Cybernetic Tactical Flight-Deck HUD Matrix */}
          <div className={styles.dockGaugeCol}>
            <div className={styles.gaugeHeader}>
              <div className={styles.hudHeaderLeft}>
                <span className={styles.hudPulseBeacon} />
                <span className={styles.gaugeLead}>
                  {isCurrent
                    ? 'TACTICAL FLIGHT-DECK TELEMETRY // SECTOR L05'
                    : isCompleted
                    ? `HISTORIC REPLAY ARCHIVE // SECTOR L0${activeLevelData.level}`
                    : isNext
                    ? `TARGET QUALIFICATION PROTOCOL // SECTOR L0${activeLevelData.level}`
                    : `ENCRYPTED SECTOR TELEMETRY // L0${activeLevelData.level}`}
                </span>
              </div>
              <span className={`${styles.gaugeTargetVal} tabular-nums`}>
                {isCurrent
                  ? `${(nextTargetXP - currentXP).toLocaleString()} XP TO PROMOTION`
                  : isCompleted
                  ? `${activeLevelData.xpRequired.toLocaleString()} XP RECORDED ✓`
                  : isNext
                  ? `${(activeLevelData.xpRequired - currentXP).toLocaleString()} XP TO QUALIFY`
                  : `${xpDifference.toLocaleString()} XP DEFICIT`}
              </span>
            </div>

            {/* High-Tech Segmented Plasma Conduit Track */}
            <div
              className={styles.plasmaConduitTrack}
              role="progressbar"
              aria-valuenow={isCurrent ? Math.round((currentXP / nextTargetXP) * 100) : percentToLevel}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Progress to Level ${activeLevelData.level}`}
            >
              <div className={styles.conduitScanlines} aria-hidden="true" />
              <div className={styles.conduitNotch} style={{ left: '25%' }} aria-hidden="true" />
              <div className={styles.conduitNotch} style={{ left: '50%' }} aria-hidden="true" />
              <div className={styles.conduitNotch} style={{ left: '75%' }} aria-hidden="true" />

              <div
                className={isCompleted ? styles.plasmaFillCompleted : styles.plasmaFillActive}
                style={{
                  width: `${isCurrent ? Math.round((currentXP / nextTargetXP) * 100) : percentToLevel}%`,
                }}
              >
                <div className={styles.plasmaCoreGlow} />
                <div className={styles.plasmaPulseHead} />
              </div>
            </div>

            <div className={styles.conduitStatusRow}>
              <div className={styles.conduitDiagGroup}>
                <span className={styles.conduitDiagCode}>SYS.DIAG // NOMINAL</span>
                <span className={styles.conduitReadout}>
                  {isCompleted ? (
                    <span className={styles.gaugeSuccessText}>
                      <CheckCircle size={12} weight="fill" /> Permanent Record • {activeLevelData.xpRequired.toLocaleString()} XP Reached
                    </span>
                  ) : isCurrent ? (
                    <span className={styles.gaugeCurrentText}>
                      <Fire size={12} weight="fill" /> Active Rank • {currentXP.toLocaleString()} / {nextTargetXP.toLocaleString()} XP
                    </span>
                  ) : isNext ? (
                    <span className={styles.gaugeNextText}>
                      <Crosshair size={12} weight="bold" /> Target Horizon • {currentXP.toLocaleString()} / {activeLevelData.xpRequired.toLocaleString()} XP
                    </span>
                  ) : (
                    <span className={styles.gaugeRemainingText}>
                      <LockSimple size={12} weight="bold" /> Sequential Dependency • Level 0{activeLevelData.level - 1} Required
                    </span>
                  )}
                </span>
              </div>
              <span className={styles.conduitCapacitorBadge}>
                {isCurrent ? `${Math.round((currentXP / nextTargetXP) * 100)}% CHARGED` : `${percentToLevel}% CHARGED`}
              </span>
            </div>

            {/* 2×2 Cybernetic Avionics Modules */}
            <div className={styles.telemetryMatrix}>
              {isCurrent ? (
                <>
                  <div className={`${styles.telemetryCard} ${styles.hudCardCyan}`}>
                    <div className={styles.hudCardTop}>
                      <span className={styles.hudCardTag}><Lightning size={12} weight="fill" /> CADENCE</span>
                      <span className={styles.hudCardStatus}>OPTIMAL</span>
                    </div>
                    <span className={`${styles.telemetryValue} ${styles.valCyan}`}>+{dailyVelocity} XP / Day</span>
                    <span className={styles.telemetryHint}>Current Velocity (+18% avg)</span>
                  </div>
                  <div className={`${styles.telemetryCard} ${styles.hudCardAmber}`}>
                    <div className={styles.hudCardTop}>
                      <span className={styles.hudCardTag}><Timer size={12} weight="bold" /> HORIZON</span>
                      <span className={styles.hudCardStatus}>PROJECTED</span>
                    </div>
                    <span className={`${styles.telemetryValue} ${styles.valAmber}`}>
                      ~{Math.max(1, Math.ceil((nextTargetXP - currentXP) / dailyVelocity))} Solar Days
                    </span>
                    <span className={styles.telemetryHint}>{(nextTargetXP - currentXP).toLocaleString()} XP to L06 Promotion</span>
                  </div>
                  <div className={`${styles.telemetryCard} ${styles.hudCardOrange}`}>
                    <div className={styles.hudCardTop}>
                      <span className={styles.hudCardTag}><Fire size={12} weight="fill" /> STREAK</span>
                      <span className={styles.hudCardStatus}>OVERDRIVE</span>
                    </div>
                    <span className={`${styles.telemetryValue} ${styles.valOrange}`}>{streakDays}-Day Combo</span>
                    <span className={styles.telemetryHint}>{streakMultiplier}x Multiplier Boost 🔥</span>
                  </div>
                  <div className={`${styles.telemetryCard} ${styles.hudCardGold}`}>
                    <div className={styles.hudCardTop}>
                      <span className={styles.hudCardTag}><LockKey size={12} weight="fill" /> NEXT VAULT</span>
                      <span className={styles.hudCardStatus}>CIPHER</span>
                    </div>
                    <span className={`${styles.telemetryValue} ${styles.valGold}`}>+500 VE • +25 Gems</span>
                    <span className={styles.telemetryHint}>Unlocks at Level 06 Vault</span>
                  </div>
                </>
              ) : isCompleted ? (
                <>
                  <div className={`${styles.telemetryCard} ${styles.hudCardGreen}`}>
                    <div className={styles.hudCardTop}>
                      <span className={styles.hudCardTag}><CheckCircle size={12} weight="fill" /> STATUS</span>
                      <span className={styles.hudCardStatus}>MASTERED</span>
                    </div>
                    <span className={`${styles.telemetryValue} ${styles.valGreen}`}>Tier Mastered ✓</span>
                    <span className={styles.telemetryHint}>Archival Ledger Entry</span>
                  </div>
                  <div className={`${styles.telemetryCard} ${styles.hudCardCyan}`}>
                    <div className={styles.hudCardTop}>
                      <span className={styles.hudCardTag}><Lightning size={12} weight="fill" /> CRITERIA</span>
                      <span className={styles.hudCardStatus}>VERIFIED</span>
                    </div>
                    <span className={`${styles.telemetryValue} ${styles.valCyan}`}>{activeLevelData.xpRequired.toLocaleString()} XP Met</span>
                    <span className={styles.telemetryHint}>Permanent Achievement</span>
                  </div>
                  <div className={`${styles.telemetryCard} ${styles.hudCardGold}`}>
                    <div className={styles.hudCardTop}>
                      <span className={styles.hudCardTag}><Coins size={12} weight="fill" /> BOUNTY</span>
                      <span className={styles.hudCardStatus}>CLAIMED</span>
                    </div>
                    <span className={`${styles.telemetryValue} ${styles.valGold}`}>{formatCardReward(activeLevelData)}</span>
                    <span className={styles.telemetryHint}>Deposited to Sovereign Ledger</span>
                  </div>
                  <div className={`${styles.telemetryCard} ${styles.hudCardPurple}`}>
                    <div className={styles.hudCardTop}>
                      <span className={styles.hudCardTag}><Crown size={12} weight="fill" /> PRIVILEGES</span>
                      <span className={styles.hudCardStatus}>PERMANENT</span>
                    </div>
                    <span className={`${styles.telemetryValue} ${styles.valPurple}`}>{activeLevelData.perks?.length || 4} Active Perks</span>
                    <span className={styles.telemetryHint}>Unconditional Lifetime Access</span>
                  </div>
                </>
              ) : isNext ? (
                <>
                  <div className={`${styles.telemetryCard} ${styles.hudCardPurple}`}>
                    <div className={styles.hudCardTop}>
                      <span className={styles.hudCardTag}><Crosshair size={12} weight="bold" /> TARGET</span>
                      <span className={styles.hudCardStatus}>HORIZON</span>
                    </div>
                    <span className={`${styles.telemetryValue} ${styles.valPurple}`}>{activeLevelData.xpRequired.toLocaleString()} XP</span>
                    <span className={styles.telemetryHint}>Sovereign Qualification Target</span>
                  </div>
                  <div className={`${styles.telemetryCard} ${styles.hudCardCyan}`}>
                    <div className={styles.hudCardTop}>
                      <span className={styles.hudCardTag}><Lightning size={12} weight="fill" /> DEFICIT</span>
                      <span className={styles.hudCardStatus}>REMAINING</span>
                    </div>
                    <span className={`${styles.telemetryValue} ${styles.valCyan}`}>{(activeLevelData.xpRequired - currentXP).toLocaleString()} XP</span>
                    <span className={styles.telemetryHint}>Needed from 6,420 XP</span>
                  </div>
                  <div className={`${styles.telemetryCard} ${styles.hudCardAmber}`}>
                    <div className={styles.hudCardTop}>
                      <span className={styles.hudCardTag}><Timer size={12} weight="bold" /> PROJECTION</span>
                      <span className={styles.hudCardStatus}>SPEED</span>
                    </div>
                    <span className={`${styles.telemetryValue} ${styles.valAmber}`}>~{Math.max(1, Math.ceil((activeLevelData.xpRequired - currentXP) / dailyVelocity))} Solar Days</span>
                    <span className={styles.telemetryHint}>At +{dailyVelocity} XP/day velocity</span>
                  </div>
                  <div className={`${styles.telemetryCard} ${styles.hudCardGold}`}>
                    <div className={styles.hudCardTop}>
                      <span className={styles.hudCardTag}><LockKey size={12} weight="fill" /> SAFE VAULT</span>
                      <span className={styles.hudCardStatus}>LOCKED</span>
                    </div>
                    <span className={`${styles.telemetryValue} ${styles.valGold}`}>{formatCardReward(activeLevelData)}</span>
                    <span className={styles.telemetryHint}>Unlocks on Tier Qualification</span>
                  </div>
                </>
              ) : (
                <>
                  <div className={`${styles.telemetryCard} ${styles.hudCardGray}`}>
                    <div className={styles.hudCardTop}>
                      <span className={styles.hudCardTag}><Crosshair size={12} weight="bold" /> THRESHOLD</span>
                      <span className={styles.hudCardStatus}>LOCKED</span>
                    </div>
                    <span className={styles.telemetryValue}>{activeLevelData.xpRequired.toLocaleString()} XP</span>
                    <span className={styles.telemetryHint}>Milestone Target</span>
                  </div>
                  <div className={`${styles.telemetryCard} ${styles.hudCardGray}`}>
                    <div className={styles.hudCardTop}>
                      <span className={styles.hudCardTag}><Timer size={12} weight="bold" /> XP GAP</span>
                      <span className={styles.hudCardStatus}>LOCKED</span>
                    </div>
                    <span className={styles.telemetryValue}>{xpDifference.toLocaleString()} XP Needed</span>
                    <span className={styles.telemetryHint}>From Current 6,420 XP</span>
                  </div>
                  <div className={`${styles.telemetryCard} ${styles.hudCardGray}`}>
                    <div className={styles.hudCardTop}>
                      <span className={styles.hudCardTag}><LockSimple size={12} weight="bold" /> CHAIN</span>
                      <span className={styles.hudCardStatus}>DEPENDENCY</span>
                    </div>
                    <span className={styles.telemetryValue}>L0{activeLevelData.level - 1} Mastery</span>
                    <span className={styles.telemetryHint}>Sequential Chain Protocol</span>
                  </div>
                  <div className={`${styles.telemetryCard} ${styles.hudCardGray}`}>
                    <div className={styles.hudCardTop}>
                      <span className={styles.hudCardTag}><LockKey size={12} weight="fill" /> PAYLOAD</span>
                      <span className={styles.hudCardStatus}>ENCRYPTED</span>
                    </div>
                    <span className={`${styles.telemetryValue} ${styles.valGold}`}>{formatCardReward(activeLevelData)}</span>
                    <span className={styles.telemetryHint}>Cryptographic Cipher Locked</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Col 3: 3D Vault Hologram Pod, Tactical RPG Perk Shards & Actuator */}
          <div className={styles.dockPerksCol}>
            {/* Milestone 3D Vault Hologram Pod */}
            <div className={styles.dockVaultPod}>
              <div className={styles.vaultPodGlow} aria-hidden="true" />
              <div className={styles.vaultPodVisual}>
                <img
                  src={getVaultAssetForLevel(activeLevelData.level)}
                  alt=""
                  aria-hidden="true"
                  className={styles.vaultPod3DImage}
                />
                <div className={styles.vaultPodRing} aria-hidden="true" />
              </div>
              <div className={styles.vaultPodContent}>
                <span className={styles.vaultPodSubhead}>[ MILESTONE VAULT PAYLOAD ]</span>
                <span className={styles.vaultPodRewardTitle}>
                  {formatCardReward(activeLevelData)}
                </span>
                <span className={styles.vaultPodStatusPill}>
                  {isCompleted ? (
                    <><CheckCircle size={10} weight="fill" /> CLAIMED TO WALLET</>
                  ) : isCurrent ? (
                    <><Sparkle size={10} weight="fill" /> ACTIVE TIER BOUNTY</>
                  ) : isNext ? (
                    <><LockKey size={10} weight="fill" /> READY AT LEVEL 06</>
                  ) : (
                    <><LockSimple size={10} weight="bold" /> CIPHER ENCRYPTED</>
                  )}
                </span>
              </div>
            </div>

            {/* RPG Tactical Perk Shards */}
            <div className={styles.perksListWrap}>
              <div className={styles.perksListHeader}>
                <span className={styles.perksListLabel}>TACTICAL TIER LOADOUT & PRIVILEGES</span>
                <span className={styles.perksCountTag}>{activeLevelData.perks?.length || 0} PERKS</span>
              </div>

              <div className={styles.rpgShardsContainer}>
                {(activeLevelData.perks || []).slice(0, 3).map((perk, pIdx) => {
                  const meta = getPerkShardMeta(perk)
                  const ShardIcon = meta.icon
                  return (
                    <div key={pIdx} className={`${styles.rpgPerkShard} ${meta.accentClass}`}>
                      <div className={styles.shardIconBadge}>
                        <ShardIcon size={14} weight="fill" />
                      </div>
                      <div className={styles.shardInfo}>
                        <span className={styles.shardCategoryText}>{meta.category}</span>
                        <span className={styles.shardTitleText}>{perk}</span>
                      </div>
                      <span className={styles.shardActiveBadge}>
                        {isCompleted || isCurrent ? 'ACTIVE' : 'LOCKED'}
                      </span>
                    </div>
                  )
                })}
                {(activeLevelData.perks?.length || 0) > 3 && (
                  <div className={styles.additionalPerksNote}>
                    <Sparkle size={11} weight="fill" />
                    <span>+{(activeLevelData.perks.length - 3)} additional sovereign perks active on this tier</span>
                  </div>
                )}
              </div>
            </div>

            {/* Cybernetic Action Actuator */}
            <div className={styles.dockActionRow}>
              {isCompleted ? (
                <button type="button" className={`${styles.tacticalCtaBtn} ve-btn ve-btn-outline`} disabled>
                  <span>MILESTONE ARCHIVED & RECORDED ✓</span>
                </button>
              ) : isCurrent ? (
                <a href="#earn" className={`${styles.tacticalCtaBtn} ve-btn ve-btn-gold`}>
                  <Lightning size={16} weight="fill" className={styles.ctaGlowIcon} />
                  <span>ACCELERATE TO LEVEL 06</span>
                  <ArrowRight size={15} weight="bold" className={styles.ctaArrow} />
                </a>
              ) : isNext ? (
                <a href="#earn" className={`${styles.tacticalCtaBtn} ve-btn ve-btn-purple`}>
                  <Crosshair size={16} weight="bold" className={styles.ctaGlowIcon} />
                  <span>BOOST TO LEVEL 0{activeLevelData.level}</span>
                  <ArrowRight size={15} weight="bold" className={styles.ctaArrow} />
                </a>
              ) : (
                <a href="#earn" className={`${styles.tacticalCtaBtn} ve-btn ve-btn-ghost`}>
                  <LockSimple size={16} weight="bold" className={styles.ctaGlowIcon} />
                  <span>VIEW XP EXPEDITIONS</span>
                  <ArrowRight size={15} weight="bold" className={styles.ctaArrow} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE SLIDE-UP DETAIL SHEET (opens when tapping node on mobile, close via X, overlay, Esc, swipe down) */}
      {isMobileSheetOpen && (
        <div
          className={styles.mobileSheetOverlay}
          onClick={() => setIsMobileSheetOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-sheet-title"
        >
          <div
            className={`${styles.mobileSheetCard} animate-slideUp`}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className={styles.sheetDragHandle} />
            <button
              type="button"
              className={styles.sheetCloseBtn}
              onClick={() => setIsMobileSheetOpen(false)}
              aria-label="Close tier details sheet"
            >
              <X size={18} weight="bold" />
            </button>

            {/* Sheet Badge Header */}
            <div className={styles.sheetHeader}>
              <TierMedallion
                level={activeLevelData.level}
                size={84}
                status={isCompleted ? 'completed' : isCurrent ? 'current' : isNext ? 'next' : 'locked'}
                showStatusCorner={false}
              />
              <div className={styles.sheetTitleGroup}>
                <span className={styles.dockLevelPill}>
                  LEVEL {String(activeLevelData.level).padStart(2, '0')}
                </span>
                <h3 id="mobile-sheet-title" className={styles.sheetTitle}>
                  {activeLevelData.name}
                </h3>
                <div className={styles.dockCodexMeta}>
                  <span className={styles.dockRarityBadge}>
                    {activeLevelData.rarity}
                  </span>
                  <span className={styles.dockDotDivider}>•</span>
                  <span className={styles.dockMaterialText}>{activeLevelData.material}</span>
                </div>
              </div>
            </div>

            <p className={styles.sheetLore}>{activeLevelData.lore}</p>

            {/* Criteria Progress */}
            <div className={styles.sheetProgressBlock}>
              <div className={styles.gaugeHeader}>
                <span className={styles.gaugeLead}>XP REQUIREMENT</span>
                <span className={`${styles.gaugeTargetVal} tabular-nums`}>
                  {activeLevelData.xpRequired.toLocaleString()} XP
                </span>
              </div>
              <div className={styles.gaugeBarTrack}>
                <div className={styles.gaugeBarFill} style={{ width: `${percentToLevel}%` }} />
              </div>
              <span className={styles.sheetProgressDiff}>
                {isCompleted
                  ? 'Milestone claimed ✓'
                  : xpDifference > 0
                  ? `${xpDifference.toLocaleString()} XP remaining`
                  : 'Milestone requirement reached'}
              </span>
            </div>

            {/* 3D Vault Reward Pod */}
            <div className={styles.dockVaultPod}>
              <div className={styles.vaultPodVisual}>
                <img
                  src={getVaultAssetForLevel(activeLevelData.level)}
                  alt=""
                  aria-hidden="true"
                  className={styles.vaultPod3DImage}
                />
              </div>
              <div className={styles.vaultPodContent}>
                <span className={styles.vaultPodSubhead}>[ MILESTONE VAULT REWARD ]</span>
                <span className={styles.vaultPodRewardTitle}>
                  {formatCardReward(activeLevelData)}
                </span>
              </div>
            </div>

            {/* RPG Perks */}
            <div className={styles.perksListWrap}>
              <span className={styles.perksListLabel}>TIER PRIVILEGES</span>
              <div className={styles.rpgShardsContainer}>
                {(activeLevelData.perks || []).slice(0, 3).map((perk, pIdx) => {
                  const meta = getPerkShardMeta(perk)
                  const ShardIcon = meta.icon
                  return (
                    <div key={pIdx} className={`${styles.rpgPerkShard} ${meta.accentClass}`}>
                      <div className={styles.shardIconBadge}>
                        <ShardIcon size={14} weight="fill" />
                      </div>
                      <div className={styles.shardInfo}>
                        <span className={styles.shardCategoryText}>{meta.category}</span>
                        <span className={styles.shardTitleText}>{perk}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Action Button */}
            <div className={styles.sheetActionArea}>
              <button
                type="button"
                className="ve-btn ve-btn-gold"
                onClick={() => {
                  setIsMobileSheetOpen(false)
                  const el = document.getElementById('earn')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                style={{ width: '100%' }}
              >
                <span>Accelerate with Tasks</span>
                <ArrowRight size={14} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default LevelRoadmap
