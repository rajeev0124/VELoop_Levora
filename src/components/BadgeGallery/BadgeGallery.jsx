import React, { useState } from 'react'
import { Trophy, Medal, Sparkle, Funnel } from '@phosphor-icons/react'
import { badgesData, badgeCategories } from '../../data/badgeData'
import BadgeCard from './BadgeCard'
import BadgeDetailModal from './BadgeDetailModal'
import styles from './BadgeGallery.module.css'

const BadgeGallery = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedBadge, setSelectedBadge] = useState(null)

  const filteredBadges =
    activeCategory === 'all'
      ? badgesData
      : badgesData.filter((b) => b.category === activeCategory)

  const unlockedCount = badgesData.filter((b) => b.status === 'unlocked').length
  const totalCount = badgesData.length
  const completionPct = Math.round((unlockedCount / totalCount) * 100)

  return (
    <section aria-labelledby="badges-heading" className={styles.section}>
      {/* Section Header */}
      <div className={styles.sectionHead}>
        <div className={styles.titleGroup}>
          <div className={styles.headerBadge}>
            <Trophy size={13} weight="duotone" className={styles.badgeIcon} />
            <span>PRESTIGE ACHIEVEMENTS & EMBLEMS</span>
          </div>
          <h2 id="badges-heading" className="section-title">
            Collectible Badge Vault
          </h2>
          <p className="section-subtitle">
            Earn 3D-crafted prestige insignias across level ranks, arcade challenges, and velocity streaks. Click any badge to inspect criteria and unlock perks.
          </p>
        </div>

        {/* Live Collection Progress Telemetry */}
        <div className={styles.statsCard}>
          <div className={styles.statsLeft}>
            <div className={styles.trophyIconWrap}>
              <Trophy size={20} weight="fill" className={styles.trophyGold} />
              <span className={styles.trophyHalo} aria-hidden="true" />
            </div>
            <div className={styles.statsText}>
              <div className={styles.statsValRow}>
                <span className={styles.statsVal}>{String(unlockedCount).padStart(2, '0')}</span>
                <span className={styles.statsDivider}>/</span>
                <span className={styles.statsTotalVal}>{String(totalCount).padStart(2, '0')}</span>
              </div>
              <span className={styles.statsLabel}>Insignias Mastered</span>
            </div>
          </div>
          <div className={styles.statsProgressWrap}>
            <div className={styles.statsProgressBarTrack}>
              <div
                className={styles.statsProgressBarFill}
                style={{ width: `${completionPct}%` }}
              >
                <span className={styles.progressGlint} />
              </div>
            </div>
            <div className={styles.statsMetaRow}>
              <span className={styles.statsPctText}>{completionPct}% Mastered</span>
              <span className={styles.statsRankText}>Level 05 Sovereign</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className={styles.filterBar}>
        <div className={styles.filterTabs} role="tablist" aria-label="Badge Category Filters">
          {badgeCategories.map((cat) => {
            const count =
              cat.id === 'all'
                ? badgesData.length
                : badgesData.filter((b) => b.category === cat.id).length
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`${styles.filterTab} ${
                  activeCategory === cat.id ? styles.filterTabActive : ''
                }`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.label}</span>
                <span className={styles.tabBadgeCount}>{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Badges Grid */}
      <div className={styles.badgesGrid}>
        {filteredBadges.map((badge) => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            onSelect={(b) => setSelectedBadge(b)}
          />
        ))}
      </div>

      {/* Detail Modal */}
      <BadgeDetailModal
        badge={selectedBadge}
        isOpen={Boolean(selectedBadge)}
        onClose={() => setSelectedBadge(null)}
      />
    </section>
  )
}

export default BadgeGallery
