import React, { useState } from 'react'
import { Info } from '@phosphor-icons/react'
import styles from './InfoTooltip.module.css'

const InfoTooltip = ({ text }) => {
  const [v, setV] = useState(false)
  return (
    <span
      className={styles.wrap}
      onMouseEnter={() => setV(true)}
      onMouseLeave={() => setV(false)}
      onClick={() => setV(x => !x)}
      role="button"
      tabIndex={0}
      aria-label="More information"
    >
      <span className={styles.icon}>
        <Info size={13} weight="bold" />
      </span>
      {v && <span className={styles.tip} role="tooltip">{text}</span>}
    </span>
  )
}

export default InfoTooltip
