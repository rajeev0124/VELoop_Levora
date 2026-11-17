import React, { useState, useEffect } from 'react'
import {
  House,
  Sparkle,
  TreasureChest,
  Trophy,
  Coins,
  UserCircle,
  BellSimpleRinging,
  Lightning,
} from '@phosphor-icons/react'
import useLevelData from '../../hooks/useLevelData'
import LevelHero from '../../components/LevelHero/LevelHero'
import NextLevelReward from '../../components/NextLevelReward/NextLevelReward'
import RecommendationBanner from '../../components/RecommendationBanner/RecommendationBanner'
import LevelRoadmap from '../../components/LevelRoadmap/LevelRoadmap'
import MysteryBoxGallery from '../../components/MysteryBox/MysteryBoxGallery'
import BadgeGallery from '../../components/BadgeGallery/BadgeGallery'
import PlayAndEarn from '../../components/PlayAndEarn/PlayAndEarn'
import XPActivity from '../../components/XPActivity/XPActivity'
import EarnMoreXP from '../../components/EarnMoreXP/EarnMoreXP'
import LevelUpModal from '../../components/LevelUpModal/LevelUpModal'
import SkeletonLoader from '../../components/shared/SkeletonLoader'
import ErrorState from '../../components/shared/ErrorState'
import styles from './LevelDashboard.module.css'

// Animated XP count-up for Sticky Header Chip
const HeaderXPChip = ({ xp = 6420, onClick }) => {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = null
    const duration = 1200
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setVal(Math.floor(p * xp))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [xp])

  return (
    <div
      className={styles.walletPill}
      onClick={onClick}
      title="Your Current XP Balance — Click to inspect"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      aria-label={`XP Balance: ${xp} XP`}
    >
      <div className={styles.walletIconWrap}>
        <img src="/assets/coin-ve-3d.png" alt="" aria-hidden="true" className={styles.walletSvg} />
      </div>
      <span className={`${styles.walletVal} tabular-nums`}>{val.toLocaleString()}</span>
      <span className={styles.walletUnit}>XP</span>
      <span className={styles.walletGlint} aria-hidden="true" />
    </div>
  )
}

const LevelDashboard = () => {
  const {
    data,
    loading,
    error,
    showLevelUp,
    triggerLevelUp,
    closeLevelUp,
    retryLoad,
  } = useLevelData()

  const [activeTab, setActiveTab] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  // Track window scroll to increase blur and shadow on sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Unified consistent navigation items: [Home, Roadmap, Vaults, Badges, Earn, Profile]
  const navItems = [
    { id: 'home', label: 'Home', icon: House, href: '#hero' },
    { id: 'roadmap', label: 'Roadmap', icon: Sparkle, href: '#roadmap' },
    { id: 'vaults', label: 'Vaults', icon: TreasureChest, href: '#vaults' },
    { id: 'badges', label: 'Badges', icon: Trophy, href: '#badges' },
    { id: 'earn', label: 'Earn', icon: Coins, href: '#earn' },
    { id: 'profile', label: 'Profile', icon: UserCircle, onClick: triggerLevelUp },
  ]

  return (
    <div className="page-wrapper">
      {/* 1. Sticky Header: logo, Rewards pill, XP chip (animated count-up), bell, avatar */}
      <header className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`} role="banner">
        <div className="content-container">
          <div className={styles.navInner}>
            {/* Brand Logo & Rewards Pill */}
            <a href="#hero" className={styles.brand} aria-label="VELoop Rewards Home">
              <img src="/assets/logo.svg" alt="" aria-hidden="true" className={styles.brandLogoImg} />
              <span className={styles.brandName}>VELOOP</span>
              <span className={styles.brandSub}>REWARDS</span>
            </a>

            {/* Desktop Navigation (Consistent [Home, Roadmap, Vaults, Badges, Earn, Profile]) */}
            <nav className={styles.navLinks} aria-label="Primary Navigation">
              {navItems.map((item) => {
                const isActive = activeTab === item.id
                return (
                  <a
                    key={item.id}
                    href={item.href || '#'}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault()
                        item.onClick()
                      } else {
                        setActiveTab(item.id)
                      }
                    }}
                  >
                    {item.label}
                  </a>
                )
              })}
            </nav>

            {/* Right Controls: Animated XP Chip, Notification Bell, User Avatar */}
            <div className={styles.navRight}>
              {data && (
                <HeaderXPChip xp={data.currentXP} onClick={triggerLevelUp} />
              )}

              <button
                type="button"
                className={styles.navNotifBtn}
                onClick={triggerLevelUp}
                title="Level-Up Celebration Preview"
                aria-label="Level-Up Notification"
              >
                <BellSimpleRinging size={17} weight="duotone" />
                <span className={styles.navNotifDot} />
              </button>

              <div
                className={styles.userAvatar}
                onClick={triggerLevelUp}
                title="Preview Gold Guardian Profile & Level Up"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    triggerLevelUp()
                  }
                }}
                aria-label="User Profile"
              >
                <UserCircle size={22} weight="duotone" color="#FFFFFF" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className={`content-container ${styles.mainContent}`} id="main-content">
        {loading && (
          <div className={styles.loadingContainer}>
            <SkeletonLoader type="hero" />
            <div className={styles.gridTwoCol}>
              <SkeletonLoader type="progress" />
              <SkeletonLoader type="reward" />
            </div>
            <SkeletonLoader type="roadmap" />
            <SkeletonLoader type="game" />
          </div>
        )}

        {error && (
          <div style={{ padding: '60px 0' }}>
            <ErrorState onRetry={retryLoad} />
          </div>
        )}

        {!loading && !error && data && (
          <>
            {/* ROW 1: Hero Level Card + Next Milestone Vault */}
            <div id="hero" className={`${styles.heroRewardGrid} animate-fadeInUp`} style={{ animationDelay: '80ms' }}>
              <section aria-label="Current Level & Daily Boost" className={styles.heroCol}>
                <LevelHero data={data} onTriggerLevelUp={triggerLevelUp} />
              </section>
              <div className={styles.rewardCol}>
                <NextLevelReward data={data} onTriggerLevelUp={triggerLevelUp} />
              </div>
            </div>

            {/* Personalized Recommendation Banner */}
            <div className="animate-fadeInUp" style={{ animationDelay: '180ms' }}>
              <RecommendationBanner data={data} />
            </div>

            {/* ROW 2: Level Progression Roadmap & Level Detail Panel */}
            <div id="roadmap" className={`${styles.roadmapSection} animate-fadeInUp`} style={{ animationDelay: '250ms' }}>
              <LevelRoadmap data={data} />
            </div>

            {/* ROW 3: Mystery Box & Milestone Vaults */}
            <div id="vaults" className={`${styles.vaultsSection} animate-fadeInUp`} style={{ animationDelay: '300ms' }}>
              <MysteryBoxGallery />
            </div>

            {/* ROW 4: Collectible Badges & Achievements */}
            <div id="badges" className={`${styles.badgesSection} animate-fadeInUp`} style={{ animationDelay: '350ms' }}>
              <BadgeGallery />
            </div>

            {/* ROW 5: Arcade XP Catcher Blitz & Activity Ledger */}
            <div className={`${styles.row3Section} animate-fadeInUp`} style={{ animationDelay: '400ms' }}>
              <div className={styles.row3SectionHead}>
                <div className={styles.row3HeaderBadge}>
                  <Lightning size={12} weight="fill" className={styles.row3BadgeIcon} />
                  <span>ACTIVITY & INSTANT YIELD</span>
                </div>
                <h2 id="arcade-heading" className="section-title">
                  Arcade & Yield Ledger
                </h2>
                <p className="section-subtitle">
                  Engage reflex micro-games for instant XP multipliers and audit daily reward deposits in real time.
                </p>
              </div>

              <div className={styles.arcadeActivityGrid}>
                <div id="arcade" className={styles.arcadeCol}>
                  <PlayAndEarn />
                </div>
                <div id="activity" className={styles.activityCol}>
                  <XPActivity />
                </div>
              </div>
            </div>

            {/* ROW 6: Earn More XP & Missions */}
            <div id="earn" className={`${styles.earnSection} animate-fadeInUp`} style={{ animationDelay: '450ms' }}>
              <EarnMoreXP data={data} />
            </div>
          </>
        )}
      </main>

      {/* Screen 5: "LEVEL UP!" Celebration Modal */}
      {data && (
        <LevelUpModal
          isOpen={showLevelUp}
          onClose={closeLevelUp}
          data={data}
        />
      )}

      {/* 8. Bottom Navigation (Mobile): [Home, Roadmap, Vaults, Badges, Earn, Profile] */}
      <nav className={styles.mobileBottomNav} aria-label="Mobile Bottom Navigation">
        {navItems.map((item) => {
          const IconComp = item.icon
          const isActive = activeTab === item.id
          return (
            <a
              key={item.id}
              href={item.href || '#'}
              className={`${styles.bottomNavItem} ${isActive ? styles.bottomNavItemActive : ''}`}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault()
                  item.onClick()
                } else {
                  setActiveTab(item.id)
                }
              }}
              aria-label={item.label}
            >
              <IconComp
                size={20}
                weight={isActive ? 'fill' : 'duotone'}
                className={styles.bottomNavIcon}
                color={isActive ? 'var(--gold)' : 'var(--text-muted)'}
              />
              <span className={styles.bottomNavLabel}>{item.label}</span>
            </a>
          )
        })}
      </nav>

      {/* Desktop Footer */}
      <footer className={styles.footer}>
        <div className="content-container">
          <div className={styles.footerInner}>
            <div className={styles.footerBrand}>
              <div className={styles.brand}>
                <img src="/assets/logo.svg" alt="" aria-hidden="true" className={styles.brandLogoImg} />
                <span className={styles.brandName}>VELOOP</span>
                <span className={styles.brandSub}>REWARDS</span>
              </div>
              <p className={styles.footerText}>
                Tap. Earn. Loop. Transform digital screen time into sovereign value through gamified progression, milestone vaults, and interactive micro-tasks.
              </p>
            </div>
            <div className={styles.footerLinks}>
              <a href="#main-content" className={styles.footerLink}>Privacy Policy</a>
              <a href="#main-content" className={styles.footerLink}>Terms & Conditions</a>
              <a href="#main-content" className={styles.footerLink}>Withdrawal Policy</a>
              <a href="#main-content" className={styles.footerLink}>Support Hub</a>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© {new Date().getFullYear()} VELOOP Rewards. All balances are virtual platform-managed credits. Not an investment, banking service, or gambling platform.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LevelDashboard
