import styles from './IconButton.module.css'
import { IconButtonProps, icons } from './IconButton.props'
import cn from 'classnames'

export const IconButton = ({appearance, icon, className, ...props}: IconButtonProps): JSX.Element => {
  const IconComponent = icons[icon]
  return (
    <button className={cn(styles.button, className, {
      [styles.primary]: appearance == 'primary',
      [styles.white]: appearance == 'white'
    })}
      {...props}
    >
      <IconComponent />
    </button>
  )
}