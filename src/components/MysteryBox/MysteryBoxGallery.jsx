import React, { useState } from 'react'
import { TreasureChest, Key } from '@phosphor-icons/react'
import { mysteryBoxesData } from '../../data/mysteryBoxData'
import MysteryBoxCard from './MysteryBoxCard'
import MysteryBoxOpeningModal from './MysteryBoxOpeningModal'
import styles from './MysteryBox.module.css'

const MysteryBoxGallery = () => {
  const [boxes, setBoxes] = useState(mysteryBoxesData)
  const [selectedBox, setSelectedBox] = useState(null)

  const readyCount = boxes.filter((b) => b.status === 'ready').length

  const handleClaimSuccess = (boxId) => {
    setBoxes((prev) =>
      prev.map((b) => (b.id === boxId ? { ...b, status: 'opened' } : b))
    )
  }

  return (
    <section aria-labelledby="mystery-boxes-heading" className={styles.section}>
      {/* Section Header */}
      <div className={styles.sectionHead}>
        <div className={styles.titleGroup}>
          <div className={styles.headerBadge}>
            <TreasureChest size={13} weight="duotone" className={styles.badgeIcon} />
            <span>REWARDS DISCOVERY & VAULTS</span>
          </div>
          <h2 id="mystery-boxes-heading" className="section-title">
            Mystery Box & Milestone Vaults
          </h2>
          <p className="section-subtitle">
            Discover high-yield treasure vaults and milestone safes unlocked through daily streaks, rank promotions, and arcade triumphs. Tap any ready vault to engage the unboxing sequence.
          </p>
        </div>

        {/* Ready Vaults Status Telemetry */}
        <div className={styles.readyVaultsCard}>
          <div className={styles.keyIconWrap}>
            <Key size={20} weight="duotone" color="#FBBF24" />
          </div>
          <div className={styles.readyVaultsText}>
            <span className={styles.readyVaultsVal}>
              {readyCount} {readyCount === 1 ? 'Vault' : 'Vaults'} Ready
            </span>
            <span className={styles.readyVaultsSub}>Awaiting Unlock Decryption</span>
          </div>
        </div>
      </div>

      {/* Grid of Mystery Boxes */}
      <div className={styles.boxesGrid}>
        {boxes.map((box) => (
          <MysteryBoxCard
            key={box.id}
            box={box}
            onOpen={(b) => setSelectedBox(b)}
          />
        ))}
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
