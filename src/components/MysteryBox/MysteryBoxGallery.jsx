import React, { useState, useRef } from 'react'
import { TreasureChest, Key, CaretLeft, CaretRight, Sparkle } from '@phosphor-icons/react'
import { mysteryBoxesData } from '../../data/mysteryBoxData'
import MysteryBoxCard from './MysteryBoxCard'
import MysteryBoxOpeningModal from './MysteryBoxOpeningModal'
import styles from './MysteryBox.module.css'

const MysteryBoxGallery = () => {
  const [boxes, setBoxes] = useState(mysteryBoxesData)
  const [selectedBox, setSelectedBox] = useState(null)
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'milestones' | 'claimed'
  const swipeScrollRef = useRef(null)

  const readyCount = boxes.filter((b) => b.status === 'ready').length
  const readyBox = boxes.find((b) => b.status === 'ready')

  const handleClaimSuccess = (boxId) => {
    setBoxes((prev) =>
      prev.map((b) =>
        b.id === boxId
          ? { ...b, status: 'opened', progressLabel: 'Milestone Claimed ✓' }
          : b
      )
    )
  }

  // Filtered carousel list (excludes readyBox when featured in the Hero Chamber)
  const carouselBoxes = boxes.filter((box) => {
    if (readyBox && box.id === readyBox.id) {
      return false
    }
    if (activeTab === 'milestones') {
      return (
        (box.id.includes('vault') ||
          box.id.includes('crate') ||
          box.id.includes('summit')) &&
        box.status === 'locked'
      )
    }
    if (activeTab === 'claimed') {
      return box.status === 'opened'
    }
    return true
  })

  // Swipe / scroll arrows
  const handleScrollLeft = () => {
    if (swipeScrollRef.current) {
      swipeScrollRef.current.scrollBy({ left: -320, behavior: 'smooth' })
    }
  }

  const handleScrollRight = () => {
    if (swipeScrollRef.current) {
      swipeScrollRef.current.scrollBy({ left: 320, behavior: 'smooth' })
    }
  }

  return (
    <section aria-labelledby="mystery-boxes-heading" className={styles.section}>
      {/* Section Header */}
      <div className={styles.sectionHead}>
        <div className={styles.titleGroup}>
          <div className={styles.headerBadge}>
            <TreasureChest size={13} weight="duotone" className={styles.badgeIcon} />
            <span>REWARDS DISCOVERY & MILESTONE SAFES</span>
          </div>
          <h2 id="mystery-boxes-heading" className="section-title">
            Mystery Box & Milestone Vaults
          </h2>
          <p className="section-subtitle">
            Discover high-yield treasure vaults and milestone safes unlocked through rank promotions, streaks, and arcade achievements. Level 05 is ready to crack; Level 06 unlocks at 8,000 XP.
          </p>
        </div>

        {/* Ready Vaults Status & Portfolio Telemetry */}
        <div className={styles.headActionGroup}>
          <div className={styles.portfolioStatsCard}>
            <span className={styles.portfolioStatsLabel}>ACCUMULATED VALUE</span>
            <span className={styles.portfolioStatsVal}>1,110 VEs • 40 Gems</span>
            <span className={styles.portfolioStatsSub}>Claimed & Active Vaults</span>
          </div>

          <div className={styles.readyVaultsCard}>
            <div className={styles.keyIconWrap}>
              <Key size={18} weight="fill" color="#FBBF24" />
            </div>
            <div className={styles.readyVaultsText}>
              <span className={styles.readyVaultsVal}>
                {readyCount} {readyCount === 1 ? 'Vault' : 'Vaults'} Ready
              </span>
              <span className={styles.readyVaultsSub}>Awaiting Cipher Decryption</span>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED ACTIVE DECRYPTION CHAMBER (HERO BANNER) */}
      {readyBox && (
        <div className={styles.decryptionHeroChamber}>
          <div className={styles.chamberAura} aria-hidden="true" />

          <div className={styles.chamberStage}>
            {/* Volumetric ambient back-rays */}
            <div className={styles.chamberBackRays} aria-hidden="true" />
            <div className={styles.chamberOrbitContainer} aria-hidden="true">
              <span className={`${styles.orbitParticle} ${styles.orbitP1}`} />
              <span className={`${styles.orbitParticle} ${styles.orbitP2}`} />
              <span className={`${styles.orbitParticle} ${styles.orbitP3}`} />
            </div>
            <div className={styles.chamberContactShadow} aria-hidden="true" />
            <div className={styles.chamberVaultWrapper}>
              <img
                src={readyBox.artwork}
                alt=""
                aria-hidden="true"
                className={styles.chamberVaultImg}
              />
            </div>
          </div>

          <div className={styles.chamberDossier}>
            <div className={styles.chamberHeaderRow}>
              <span className={styles.chamberRarityPill}>
                ★ {readyBox.rarity.toUpperCase()} MILESTONE VAULT
              </span>
              <span className={styles.chamberReadyBeacon}>
                <Key size={13} weight="fill" className={styles.beaconKeyIcon} />
                <span>READY FOR CIPHER DECRYPTION</span>
              </span>
            </div>

            <h3 className={styles.chamberTitle}>{readyBox.name}</h3>
            <p className={styles.chamberRequirement}>
              {readyBox.requirement} — {readyBox.lore}
            </p>

            {/* Payload Breakdown Chips */}
            <div className={styles.chamberPayloadRow}>
              <span className={styles.chamberPayloadLabel}>GUARANTEED VAULT PAYLOAD:</span>
              <div className={styles.chamberPayloadChips}>
                <div className={styles.payloadChip}>
                  <img
                    src="/assets/coin-ve-3d.png"
                    alt=""
                    aria-hidden="true"
                    className={styles.payloadChipImg}
                  />
                  <span>+{readyBox.rewardDetails.ve} VE Coins</span>
                </div>
                <div className={styles.payloadChip}>
                  <img
                    src="/assets/gem-3d.png"
                    alt=""
                    aria-hidden="true"
                    className={styles.payloadChipImg}
                  />
                  <span>+{readyBox.rewardDetails.gems} Rare Gems</span>
                </div>
                <div className={`${styles.payloadChip} ${styles.payloadChipHighlight}`}>
                  <Sparkle size={13} weight="fill" />
                  <span>{readyBox.rewardDetails.bonus}</span>
                </div>
              </div>
            </div>

            <div className={styles.chamberActionRow}>
              <button
                type="button"
                className={styles.chamberCrackBtn}
                onClick={() => setSelectedBox(readyBox)}
              >
                <Key size={16} weight="fill" />
                <span>Crack & Decrypt Vault Now</span>
                <CaretRight size={16} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Milestone Armory Track Subheader & Filters */}
      <div className={styles.filterBarRow}>
        <div className={styles.filterTabs} role="tablist" aria-label="Vault Categories">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'all'}
            className={`${styles.filterTab} ${activeTab === 'all' ? styles.filterTabActive : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Vaults ({boxes.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'milestones'}
            className={`${styles.filterTab} ${activeTab === 'milestones' ? styles.filterTabActive : ''}`}
            onClick={() => setActiveTab('milestones')}
          >
            <Sparkle size={12} weight="fill" />
            <span>Milestone Horizon ({boxes.filter((b) => (b.id.includes('vault') || b.id.includes('crate') || b.id.includes('summit')) && b.status === 'locked').length})</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'claimed'}
            className={`${styles.filterTab} ${activeTab === 'claimed' ? styles.filterTabActive : ''}`}
            onClick={() => setActiveTab('claimed')}
          >
            Claimed Archive ({boxes.filter((b) => b.status === 'opened').length})
          </button>
        </div>

        {/* Carousel Prev/Next for swipeable cards */}
        <div className={styles.carouselNavButtons}>
          <button
            type="button"
            className={styles.carouselChevronBtn}
            onClick={handleScrollLeft}
            aria-label="Scroll vaults left"
          >
            <CaretLeft size={16} weight="bold" />
          </button>
          <button
            type="button"
            className={styles.carouselChevronBtn}
            onClick={handleScrollRight}
            aria-label="Scroll vaults right"
          >
            <CaretRight size={16} weight="bold" />
          </button>
        </div>
      </div>

      {/* Swipeable Grid / Carousel Container */}
      <div
        className={styles.swipeScrollContainer}
        ref={swipeScrollRef}
        tabIndex={0}
        aria-label="Milestone Vaults Track"
      >
        <div className={styles.boxesGrid}>
          {carouselBoxes.map((box) => (
            <MysteryBoxCard
              key={box.id}
              box={box}
              onOpen={(b) => setSelectedBox(b)}
            />
          ))}
        </div>
      </div>

      {/* Interactive Unboxing Modal */}
      <MysteryBoxOpeningModal
        box={selectedBox}
        isOpen={Boolean(selectedBox)}
        onClose={() => setSelectedBox(null)}
        onClaimSuccess={handleClaimSuccess}
      />
    </section>
  )
}

export default MysteryBoxGallery
