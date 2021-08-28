import { useEffect, useState } from 'react'

export const useScroll = ():number => {
  const isBrowser = typeof window !== 'undefined'

  const [scrollY, setScrollY] = useState<number>(0)

  const hundleScroll = () => {
    const currentScrollY = isBrowser ? window.scrollY : 0
    setScrollY(currentScrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', hundleScroll, {passive: true})

    return () => window.removeEventListener('scroll', hundleScroll)
  }, [])
  return scrollY
}