import { useState, useEffect, useCallback } from 'react'
import { userData, levels } from '../data/levelData'

const getCalculatedData = () => {
  const xpPercent = Math.round((userData.currentXP / userData.requiredXP) * 100)
  const xpRemaining = userData.requiredXP - userData.currentXP
  const currentLevelData = levels.find(l => l.level === userData.currentLevel)
  const nextLevelData = levels.find(l => l.level === userData.nextLevel)
  return { ...userData, xpPercent, xpRemaining, currentLevelData, nextLevelData, allLevels: levels.slice(0, 7) }
}

const useLevelData = () => {
  const [data, setData] = useState(getCalculatedData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showLevelUp, setShowLevelUp] = useState(false)

  const load = useCallback(() => {
    try {
      setData(getCalculatedData())
      setLoading(false)
    } catch (err) {
      setError('Unable to load level data')
      setLoading(false)
    }
  }, [])

  return {
    data, loading, error, showLevelUp,
    triggerLevelUp: () => setShowLevelUp(true),
    closeLevelUp: () => setShowLevelUp(false),
    retryLoad: load,
  }
}

export default useLevelData
