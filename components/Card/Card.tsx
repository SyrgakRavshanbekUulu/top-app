import { CardProps } from './Card.props'
import cn from 'classnames'
import styles from './Card.module.css'

export const Card = ({children, color = 'white', className, ...props}: CardProps): JSX.Element => {
  return (
    <div
      className={cn(styles.card, className, {
        [styles.blue]: color === 'blue',
      })}
      {...props}
    >
      {children}
    </div>
  )
}