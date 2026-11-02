import React, { useState } from 'react'
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

  return (
    <div className="page-wrapper">
      {/* Top Navbar */}
      <header className={styles.navbar} role="banner">
        <div className="content-container">
          <div className={styles.navInner}>
            <a href="#hero" className={styles.brand}>
              <img src="/assets/logo.svg" alt="VELOOP Logo" className={styles.brandLogoImg} />
              <span className={styles.brandName}>VELOOP</span>
              <span className={styles.brandSub}>REWARDS</span>
            </a>

            <nav className={styles.navLinks} aria-label="Desktop Primary Navigation">
              <a href="#hero" className={`${styles.navLink} ${activeTab === 'home' ? styles.navLinkActive : ''}`} onClick={() => setActiveTab('home')}>
                Level Hub
              </a>
              <a href="#roadmap" className={`${styles.navLink} ${activeTab === 'roadmap' ? styles.navLinkActive : ''}`} onClick={() => setActiveTab('roadmap')}>
                Roadmap
              </a>
              <a href="#vaults" className={`${styles.navLink} ${activeTab === 'vaults' ? styles.navLinkActive : ''}`} onClick={() => setActiveTab('vaults')}>
                Mystery Vaults
              </a>
              <a href="#badges" className={`${styles.navLink} ${activeTab === 'badges' ? styles.navLinkActive : ''}`} onClick={() => setActiveTab('badges')}>
                Badges
              </a>
              <a href="#arcade" className={`${styles.navLink} ${activeTab === 'arcade' ? styles.navLinkActive : ''}`} onClick={() => setActiveTab('arcade')}>
                Arcade
              </a>
              <a href="#activity" className={`${styles.navLink} ${activeTab === 'activity' ? styles.navLinkActive : ''}`} onClick={() => setActiveTab('activity')}>
                Ledger
              </a>
              <a href="#earn" className={`${styles.navLink} ${activeTab === 'earn' ? styles.navLinkActive : ''}`} onClick={() => setActiveTab('earn')}>
                Earn XP
              </a>
            </nav>

            <div className={styles.navRight}>
              {data && (
                <div
                  className={styles.walletPill}
                  onClick={triggerLevelUp}
                  title="Your Current XP Balance — Click to inspect"
                  role="button"
                  tabIndex={0}
                >
                  <div className={styles.walletIconWrap}>
                    <img src="/assets/xp-1.svg" alt="" aria-hidden="true" className={styles.walletSvg} />
                  </div>
                  <span className={styles.walletVal}>{data.currentXP?.toLocaleString()}</span>
                  <span className={styles.walletUnit}>XP</span>
                </div>
              )}
              <button
                type="button"
                className={styles.navNotifBtn}
                onClick={triggerLevelUp}
                title="Level-Up Notification"
                aria-label="Level-Up Notification"
              >
                <BellSimpleRinging size={17} weight="duotone" />
                <span className={styles.navNotifDot} />
              </button>
              <div
                className={styles.userAvatar}
                onClick={triggerLevelUp}
                title="Preview Level Up Celebration"
                role="button"
                tabIndex={0}
                aria-label="User Profile"
              >
                <UserCircle size={22} weight="duotone" color="#FFFFFF" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content (Section 39 Desktop Layout & Page 33 Mobile screens) */}
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
            {/* FULL-WIDTH DASHBOARD GREETING CARD */}
            <div className={`${styles.greetingCard} animate-fadeInUp`} style={{ animationDelay: '50ms' }}>
              <div className={styles.greetingCardAura} aria-hidden="true" />
              <div className={styles.greetingTextWrap}>
                <h1 className={styles.greetingTitle}>
                  Good Morning, VeLooper!
                </h1>
                <p className={styles.greetingSub}>
                  Level up your journey and unlock epic rewards every day.
                </p>
              </div>
              <div className={styles.greetingActions}>
                <button
                  type="button"
                  className={styles.notificationBtn}
                  onClick={triggerLevelUp}
                  title="Preview Level Up Celebration"
                  aria-label="1 Unread Notification - Preview Level Up"
                >
                  <BellSimpleRinging size={18} weight="duotone" className={styles.bellIcon} />
                  <span className={styles.notifBadge} aria-hidden="true">1</span>
                </button>
              </div>
            </div>

            {/* ROW 1: Current Level + XP Progress | Next Reward (Locked Reward Vault Card) */}
            <div id="hero" className={`${styles.heroRewardGrid} animate-fadeInUp`} style={{ animationDelay: '120ms' }}>
              <section aria-label="Current Level & Daily Boost" className={styles.heroCol}>
                <LevelHero data={data} onTriggerLevelUp={triggerLevelUp} />
              </section>
              <div className={styles.rewardCol}>
                <NextLevelReward data={data} onTriggerLevelUp={triggerLevelUp} />
              </div>
            </div>

            {/* SECTION 26: Personalized Recommendation Action Banner */}
            <div className="animate-fadeInUp" style={{ animationDelay: '190ms' }}>
              <RecommendationBanner data={data} />
            </div>

            {/* ROW 2: Level Progression Roadmap */}
            <div id="roadmap" className={`${styles.roadmapSection} animate-fadeInUp`} style={{ animationDelay: '260ms' }}>
              <LevelRoadmap data={data} />
            </div>

            {/* ROW 3: MYSTERY BOX & MILESTONE VAULTS */}
            <div id="vaults" className={`${styles.vaultsSection} animate-fadeInUp`} style={{ animationDelay: '310ms' }}>
              <MysteryBoxGallery />
            </div>

            {/* ROW 4: COLLECTIBLE BADGES & ACHIEVEMENTS */}
            <div id="badges" className={`${styles.badgesSection} animate-fadeInUp`} style={{ animationDelay: '360ms' }}>
              <BadgeGallery />
            </div>

            {/* ROW 5: ARCADE & RECENT ACTIVITY LEDGER */}
            <div className={`${styles.row3Section} animate-fadeInUp`} style={{ animationDelay: '410ms' }}>
              <div className={styles.row3SectionHead}>
                <div className={styles.row3HeaderBadge}>
                  <Lightning size={12} weight="fill" className={styles.row3BadgeIcon} />
                  <span>INTERACTIVE HUBS & TRANSACTIONS</span>
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

            {/* ROW 6: EARN MORE XP & REWARDS */}
            <div id="earn" className={`${styles.earnSection} animate-fadeInUp`} style={{ animationDelay: '460ms' }}>
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

      {/* Screen 1 Mobile Bottom Navigation Bar */}
      <nav className={styles.mobileBottomNav}>
        {[
          { id: 'home', label: 'Home', icon: House, href: '#hero' },
          { id: 'roadmap', label: 'Roadmap', icon: Sparkle, href: '#roadmap' },
          { id: 'vaults', label: 'Vaults', icon: TreasureChest, href: '#vaults' },
          { id: 'badges', label: 'Badges', icon: Trophy, href: '#badges' },
          { id: 'earn', label: 'Earn', icon: Coins, href: '#earn' },
          { id: 'profile', label: 'Profile', icon: UserCircle, onClick: triggerLevelUp },
        ].map((item) => {
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
                <img src="/assets/logo.svg" alt="VELOOP Logo" className={styles.brandLogoImg} />
                <span className={styles.brandName}>VELOOP</span>
                <span className={styles.brandSub}>REWARDS</span>
              </div>
              <p className={styles.footerText}>
                Tap. Earn. Loop. Transform digital screen time into real value through gamified progression and interactive micro-tasks.
              </p>
            </div>
            <div className={styles.footerLinks}>
              <span>Privacy Policy</span>
              <span>Terms & Conditions</span>
              <span>Withdrawal Policy</span>
              <span>Support</span>
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
