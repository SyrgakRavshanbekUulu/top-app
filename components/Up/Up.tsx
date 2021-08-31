import { useAnimation, motion } from 'framer-motion'
import { useEffect } from 'react'
import { useScroll } from '../../hooks/useScroll'
import { IconButton } from '../IconButton/IconButton'
import styles from './Up.module.css'

export const Up = (): JSX.Element => {
  const y = useScroll()
  const controls = useAnimation()

  useEffect(() => {
    controls.start({opacity: y / document.body.scrollHeight})
  },[y, controls])
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  return (
    <motion.div
      className={styles.up}
      animate={controls}
      initial={{opacity: 0}}
    >
      <IconButton icon='up' appearance='primary' onClick={scrollToTop} aria-label='на верх'/>
    </motion.div>
  )
}