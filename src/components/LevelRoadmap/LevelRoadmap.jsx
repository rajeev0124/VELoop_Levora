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
} from '@phosphor-icons/react'
import styles from './LevelRoadmap.module.css'
import { levelStateConfig } from '../../data/levelData'
import TierMedallion from '../shared/TierMedallion'

// Clean concise reward string formatting (guaranteed no ++ and no clipping)
const formatCardReward = (lvl) => {
  if (!lvl?.reward) return ''
  const { amount, type } = lvl.reward
  const amountStr = String(amount || '').trim()

  if (lvl.level === 6) {
    return '+500 VEs • +25 Gems'
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
  const allLevels = data?.allLevels || []
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
            Level Progression Roadmap
          </h2>
          <p className="section-subtitle">
            Visual milestone ladder — click any tier node to inspect criteria, perks, and reward vaults.
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
              const isApex = lvl.level === 10

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

      {/* SECTION 5: LEVEL DETAIL PANEL (Desktop Side Panel / Integrated Dock) */}
      <div className={styles.inspectorDock} aria-labelledby="detail-panel-title">
        <div className={styles.dockGlowAura} aria-hidden="true" />

        <div className={styles.dockGrid}>
          {/* Col 1: Badge Showcase & Tier Lore */}
          <div className={styles.dockTierCol}>
            <div className={styles.dockBadgeWrapper}>
              <TierMedallion
                level={activeLevelData.level}
                size={92}
                status={isCompleted ? 'completed' : isCurrent ? 'current' : isNext ? 'next' : 'locked'}
                showStatusCorner={false}
              />
            </div>

            <div className={styles.dockTierInfo}>
              <div className={styles.dockHeadingRow}>
                <span className={styles.dockLevelPill}>
                  LEVEL {String(activeLevelData.level).padStart(2, '0')}
                </span>
                {isCompleted && (
                  <span className={styles.dockStatusCompleted}>
                    <CheckCircle size={13} weight="fill" /> COMPLETED
                  </span>
                )}
                {isCurrent && (
                  <span className={styles.dockStatusActive}>
                    <Sparkle size={13} weight="fill" /> ACTIVE RANK
                  </span>
                )}
                {isNext && (
                  <span className={styles.dockStatusNext}>
                    <Crosshair size={13} weight="bold" /> TARGET GOAL
                  </span>
                )}
                {isLocked && (
                  <span className={styles.dockStatusLocked}>
                    <LockSimple size={13} weight="bold" /> LOCKED TIER
                  </span>
                )}
              </div>

              <h3 id="detail-panel-title" className={styles.dockTierTitle}>
                {activeLevelData.name}
              </h3>
              <div className={styles.dockCodexMeta}>
                <span className={styles.dockRarityBadge}>
                  {activeLevelData.rarity}
                </span>
                <span className={styles.dockMaterialText}>{activeLevelData.material}</span>
              </div>
              <p className={styles.dockTierLore}>{activeLevelData.lore}</p>
            </div>
          </div>

          {/* Col 2: Flight-Deck Telemetry Console with 2x2 Matrix */}
          <div className={styles.dockGaugeCol}>
            <div className={styles.gaugeHeader}>
              <span className={styles.gaugeLead}>
                {isCurrent
                  ? 'PROMOTION PROGRESSION TO L06'
                  : isCompleted
                  ? 'HISTORIC MILESTONE STATUS'
                  : isNext
                  ? 'TARGET QUALIFICATION GOAL'
                  : 'LOCKED TIER REQUIREMENT'}
              </span>
              <span className={`${styles.gaugeTargetVal} tabular-nums`}>
                {isCurrent
                  ? `${(nextTargetXP - currentXP).toLocaleString()} XP to L06`
                  : isCompleted
                  ? `${activeLevelData.xpRequired.toLocaleString()} XP Met ✓`
                  : isNext
                  ? `${(activeLevelData.xpRequired - currentXP).toLocaleString()} XP Remaining`
                  : `${xpDifference.toLocaleString()} XP Needed`}
              </span>
            </div>

            <div
              className={styles.gaugeBarTrack}
              role="progressbar"
              aria-valuenow={isCurrent ? Math.round((currentXP / nextTargetXP) * 100) : percentToLevel}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Progress to Level ${activeLevelData.level}`}
            >
              <div
                className={isCompleted ? styles.gaugeBarFillCompleted : styles.gaugeBarFill}
                style={{
                  width: `${isCurrent ? Math.round((currentXP / nextTargetXP) * 100) : percentToLevel}%`,
                }}
              />
              <div
                className={styles.gaugeBarIndicator}
                style={{
                  left: `${isCurrent ? Math.round((currentXP / nextTargetXP) * 100) : percentToLevel}%`,
                }}
              />
            </div>

            <div className={styles.gaugeStatusRow}>
              {isCompleted ? (
                <span className={styles.gaugeSuccessText}>
                  <CheckCircle size={13} weight="fill" /> Milestone Satisfied & Ledger Recorded
                </span>
              ) : isCurrent ? (
                <span className={styles.gaugeCurrentText}>
                  <Fire size={13} weight="fill" /> Active Rank • {currentXP.toLocaleString()} / {nextTargetXP.toLocaleString()} XP ({Math.round((currentXP / nextTargetXP) * 100)}%)
                </span>
              ) : isNext ? (
                <span className={styles.gaugeNextText}>
                  <Crosshair size={13} weight="bold" /> Target Goal • {currentXP.toLocaleString()} / {activeLevelData.xpRequired.toLocaleString()} XP
                </span>
              ) : (
                <span className={styles.gaugeRemainingText}>
                  <LockSimple size={13} weight="bold" /> Requires Level 0{activeLevelData.level - 1} Completion
                </span>
              )}
            </div>

            {/* 2×2 Live Telemetry Matrix */}
            <div className={styles.telemetryMatrix}>
              {isCurrent ? (
                <>
                  <div className={styles.telemetryCard}>
                    <span className={styles.telemetryLabel}>DAILY YIELD PACE</span>
                    <span className={styles.telemetryValue}>+{dailyVelocity} XP / Day</span>
                    <span className={styles.telemetryHint}>Current Velocity</span>
                  </div>
                  <div className={styles.telemetryCard}>
                    <span className={styles.telemetryLabel}>ESTIMATED UNLOCK</span>
                    <span className={`${styles.telemetryValue} ${styles.telemetryValueHighlight}`}>
                      ~{Math.max(1, Math.ceil((nextTargetXP - currentXP) / dailyVelocity))} Days
                    </span>
                    <span className={styles.telemetryHint}>{(nextTargetXP - currentXP).toLocaleString()} XP to L06</span>
                  </div>
                  <div className={styles.telemetryCard}>
                    <span className={styles.telemetryLabel}>ACTIVE STREAK</span>
                    <span className={styles.telemetryValue}>{streakDays} Days Active</span>
                    <span className={styles.telemetryHint}>{streakMultiplier}x Score Boost 🔥</span>
                  </div>
                  <div className={styles.telemetryCard}>
                    <span className={styles.telemetryLabel}>NEXT VAULT PAYLOAD</span>
                    <span className={`${styles.telemetryValue} ${styles.telemetryValueGold}`}>+500 VEs • +25 Gems</span>
                    <span className={styles.telemetryHint}>Unlocks at Level 06</span>
                  </div>
                </>
              ) : isCompleted ? (
                <>
                  <div className={styles.telemetryCard}>
                    <span className={styles.telemetryLabel}>TIER STATUS</span>
                    <span className={`${styles.telemetryValue} ${styles.telemetryValueGreen}`}>Mastered ✓</span>
                    <span className={styles.telemetryHint}>Historic Milestone</span>
                  </div>
                  <div className={styles.telemetryCard}>
                    <span className={styles.telemetryLabel}>XP CRITERIA</span>
                    <span className={styles.telemetryValue}>{activeLevelData.xpRequired.toLocaleString()} XP Met</span>
                    <span className={styles.telemetryHint}>Permanent Record</span>
                  </div>
                  <div className={styles.telemetryCard}>
                    <span className={styles.telemetryLabel}>VAULT BOUNTY</span>
                    <span className={`${styles.telemetryValue} ${styles.telemetryValueGold}`}>{formatCardReward(activeLevelData)}</span>
                    <span className={styles.telemetryHint}>Granted to Wallet</span>
                  </div>
                  <div className={styles.telemetryCard}>
                    <span className={styles.telemetryLabel}>ACTIVE PRIVILEGES</span>
                    <span className={styles.telemetryValue}>{activeLevelData.perks?.length || 4} Privileges</span>
                    <span className={styles.telemetryHint}>Permanent Access</span>
                  </div>
                </>
              ) : isNext ? (
                <>
                  <div className={styles.telemetryCard}>
                    <span className={styles.telemetryLabel}>TARGET REQUIREMENT</span>
                    <span className={`${styles.telemetryValue} ${styles.telemetryValuePurple}`}>{activeLevelData.xpRequired.toLocaleString()} XP</span>
                    <span className={styles.telemetryHint}>Qualification Goal</span>
                  </div>
                  <div className={styles.telemetryCard}>
                    <span className={styles.telemetryLabel}>XP DEFICIT</span>
                    <span className={styles.telemetryValue}>{(activeLevelData.xpRequired - currentXP).toLocaleString()} XP</span>
                    <span className={styles.telemetryHint}>Remaining Balance</span>
                  </div>
                  <div className={styles.telemetryCard}>
                    <span className={styles.telemetryLabel}>ESTIMATED HORIZON</span>
                    <span className={styles.telemetryValue}>~{Math.max(1, Math.ceil((activeLevelData.xpRequired - currentXP) / dailyVelocity))} Days</span>
                    <span className={styles.telemetryHint}>At +{dailyVelocity} XP/day</span>
                  </div>
                  <div className={styles.telemetryCard}>
                    <span className={styles.telemetryLabel}>VAULT UNLOCK</span>
                    <span className={`${styles.telemetryValue} ${styles.telemetryValueGold}`}>{formatCardReward(activeLevelData)}</span>
                    <span className={styles.telemetryHint}>Pending Safe Vault</span>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.telemetryCard}>
                    <span className={styles.telemetryLabel}>TARGET THRESHOLD</span>
                    <span className={styles.telemetryValue}>{activeLevelData.xpRequired.toLocaleString()} XP</span>
                    <span className={styles.telemetryHint}>Milestone Target</span>
                  </div>
                  <div className={styles.telemetryCard}>
                    <span className={styles.telemetryLabel}>XP REMAINING</span>
                    <span className={styles.telemetryValue}>{xpDifference.toLocaleString()} XP Needed</span>
                    <span className={styles.telemetryHint}>From 6,420 XP</span>
                  </div>
                  <div className={styles.telemetryCard}>
                    <span className={styles.telemetryLabel}>PREREQUISITE</span>
                    <span className={styles.telemetryValue}>Level 0{activeLevelData.level - 1} Mastery</span>
                    <span className={styles.telemetryHint}>Sequential Chain</span>
                  </div>
                  <div className={styles.telemetryCard}>
                    <span className={styles.telemetryLabel}>LOCKED VAULT</span>
                    <span className={`${styles.telemetryValue} ${styles.telemetryValueGold}`}>{formatCardReward(activeLevelData)}</span>
                    <span className={styles.telemetryHint}>Cryptographic Lock</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Col 3: Vault Reward Chip, Tier Privileges & CTA */}
          <div className={styles.dockPerksCol}>
            <div className={styles.dockRewardVault}>
              <span className={styles.vaultLabel}>MILESTONE VAULT REWARD</span>
              <div className={styles.vaultPill}>
                {activeLevelData.reward?.icon && (
                  <img
                    src={activeLevelData.reward.icon}
                    alt=""
                    aria-hidden="true"
                    className={styles.vaultRewardImg}
                  />
                )}
                <span className={styles.vaultRewardText}>
                  {formatCardReward(activeLevelData)}
                </span>
              </div>
            </div>

            <div className={styles.perksListWrap}>
              <span className={styles.perksListLabel}>TIER PRIVILEGES</span>
              <ul className={styles.perksList}>
                {activeLevelData.perks?.map((perk, pIdx) => (
                  <li key={pIdx} className={styles.perkItem}>
                    <span className={styles.perkCheckCircle}>
                      <Check size={9} weight="bold" className={styles.perkCheck} />
                    </span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.dockActionRow}>
              {isCompleted ? (
                <button type="button" className="ve-btn ve-btn-outline" disabled>
                  Milestone Mastered ✓
                </button>
              ) : isCurrent ? (
                <a href="#earn" className="ve-btn ve-btn-gold">
                  <span>Earn XP for Next Tier</span>
                  <ArrowRight size={14} weight="bold" />
                </a>
              ) : isNext ? (
                <a href="#earn" className="ve-btn ve-btn-purple">
                  <span>Boost to L{activeLevelData.level}</span>
                  <ArrowRight size={14} weight="bold" />
                </a>
              ) : (
                <a href="#earn" className="ve-btn ve-btn-ghost">
                  <span>View XP Missions</span>
                  <ArrowRight size={14} weight="bold" />
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

            {/* Reward Pill */}
            <div className={styles.dockRewardVault}>
              <span className={styles.vaultLabel}>MILESTONE VAULT REWARD</span>
              <div className={styles.vaultPill}>
                {activeLevelData.reward?.icon && (
                  <img
                    src={activeLevelData.reward.icon}
                    alt=""
                    aria-hidden="true"
                    className={styles.vaultRewardImg}
                  />
                )}
                <span className={styles.vaultRewardText}>
                  {formatCardReward(activeLevelData)}
                </span>
              </div>
            </div>

            {/* Privileges */}
            <div className={styles.perksListWrap}>
              <span className={styles.perksListLabel}>TIER PRIVILEGES</span>
              <ul className={styles.perksList}>
                {activeLevelData.perks?.map((perk, pIdx) => (
                  <li key={pIdx} className={styles.perkItem}>
                    <Check size={12} weight="bold" className={styles.perkCheck} />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
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
