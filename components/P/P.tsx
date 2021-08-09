import { PProps } from './P.props'
import cn from 'classnames'
import styles from './P.module.css'

export const P = ({children, size = 'm', className, ...props}: PProps) => {
  return (
    <p
      className={cn(styles.p, className, {
        [styles.s]: size === 's',
        [styles.m]: size === 'm',
        [styles.l]: size === 'l',
      })}
      {...props}
    >
      {children}
    </p>
  )
}