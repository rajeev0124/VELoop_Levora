// ============================================================
// MYSTERY BOX DATA — VELoop Rewards
// 3D-inspired rewards discovery vaults with multi-tier rarities
// ============================================================

export const mysteryBoxRarities = {
  common: {
    label: 'Common',
    color: '#94A3B8',
    gradient: 'linear-gradient(135deg, rgba(148, 163, 184, 0.15) 0%, rgba(30, 41, 59, 0.4) 100%)',
    border: 'rgba(148, 163, 184, 0.35)',
    glow: 'rgba(148, 163, 184, 0.3)',
  },
  rare: {
    label: 'Rare',
    color: '#00F5FF',
    gradient: 'linear-gradient(135deg, rgba(0, 245, 255, 0.15) 0%, rgba(8, 40, 60, 0.4) 100%)',
    border: 'rgba(0, 245, 255, 0.45)',
    glow: 'rgba(0, 245, 255, 0.4)',
  },
  epic: {
    label: 'Epic',
    color: '#C084FC',
    gradient: 'linear-gradient(135deg, rgba(192, 132, 252, 0.16) 0%, rgba(60, 15, 90, 0.4) 100%)',
    border: 'rgba(192, 132, 252, 0.50)',
    glow: 'rgba(192, 132, 252, 0.45)',
  },
  legendary: {
    label: 'Legendary',
    color: '#FBBF24',
    gradient: 'linear-gradient(135deg, rgba(251, 191, 36, 0.18) 0%, rgba(80, 45, 5, 0.45) 100%)',
    border: 'rgba(251, 191, 36, 0.55)',
    glow: 'rgba(251, 191, 36, 0.5)',
  },
  exclusive: {
    label: 'Sovereign',
    color: '#00E676',
    gradient: 'linear-gradient(135deg, rgba(0, 230, 118, 0.18) 0%, rgba(10, 60, 30, 0.45) 100%)',
    border: 'rgba(0, 230, 118, 0.55)',
    glow: 'rgba(0, 230, 118, 0.5)',
  },
}

export const mysteryBoxesData = [
  {
    id: 'box-bronze',
    name: 'Bronze Cipher Casket',
    rarity: 'common',
    status: 'ready', // ready to open
    artwork: '/assets/low.svg',
    tag: 'Daily Streak Vault',
    requirement: 'Claimed via 7-Day Active Login Streak',
    rewardSummary: '+35 XP & 10 VEs',
    rewardDetails: {
      xp: 35,
      ve: 10,
      gems: 0,
      bonus: '1.05x Streak Boost',
    },
    progressPct: 100,
    lore: 'A secure cipher container awarded to active daily operatives. Cracks instantly upon engagement.',
  },
  {
    id: 'box-amethyst',
    name: 'Amethyst Vault Crate',
    rarity: 'rare',
    status: 'ready', // ready to open
    artwork: '/assets/medium.svg',
    tag: 'Level 04 Milestone',
    requirement: 'Unlocked at Silver Scout (Level 04)',
    rewardSummary: '+75 XP & 15 Gems',
    rewardDetails: {
      xp: 75,
      ve: 0,
      gems: 15,
      bonus: 'Rare Gem Multiplier',
    },
    progressPct: 100,
    lore: 'Forged from compressed purple obsidian. Emits a high-frequency resonance upon unlocking.',
  },
  {
    id: 'box-gold-vault',
    name: 'Cyber Gold Sovereign Safe',
    rarity: 'epic',
    status: 'ready', // ready to open
    artwork: '/assets/safe-1.svg',
    tag: 'Active Rank Vault',
    requirement: 'Awarded at Level 05 (Gold Guardian)',
    rewardSummary: '+500 VEs & 25 Gems',
    rewardDetails: {
      xp: 150,
      ve: 500,
      gems: 25,
      bonus: 'VIP Profile Flare',
    },
    progressPct: 100,
    isFeatured: true,
    lore: 'The executive Level 05 Milestone Safe. Features high-security cyber deadbolts packed with token yield.',
  },
  {
    id: 'box-diamond-crate',
    name: 'Prismatic SVE Safe',
    rarity: 'legendary',
    status: 'locked',
    artwork: '/assets/safe-2.svg',
    tag: 'Next Major Tier',
    requirement: 'Requires Level 07 (Diamond Legend)',
    rewardSummary: '+100 SVEs Safe Grant',
    rewardDetails: {
      xp: 500,
      ve: 0,
      sve: 100,
      gems: 50,
      bonus: 'Permanent Streak Armor',
    },
    progressPct: 25,
    progressLabel: '6,420 / 25,000 XP (25%)',
    lore: 'Crystalline safe encased in diamond-grade magnetic shielding. Accessible exclusively to Level 07 legends.',
  },
  {
    id: 'box-celestial-summit',
    name: 'Celestial Sovereign Vault',
    rarity: 'exclusive',
    status: 'locked',
    artwork: '/assets/cart-top.svg',
    tag: 'Apex Horizon',
    requirement: 'Requires Level 10 (Apex Sovereign)',
    rewardSummary: '1 Tier 1 Safe Vault + 2.0x Multiplier',
    rewardDetails: {
      xp: 2000,
      ve: 5000,
      gems: 100,
      bonus: 'Permanent 2.0x Reward Multiplier',
    },
    progressPct: 4,
    progressLabel: '6,420 / 150,000 XP (4%)',
    lore: 'The ultimate summit vault of VELoop Rewards. Contains the legendary master core and lifetime sovereign status.',
  },
]
