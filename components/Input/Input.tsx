import { InputProps } from './Input.props'
import cn from 'classnames'
import styles from './Input.module.css'
import { ForwardedRef, forwardRef } from 'react'

export const Input = forwardRef(({ className, error, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
  return (
    <div className={cn(styles.inputWrapper)}>
      <input
        className={cn(styles.input, className, {
          [styles.error]: error
        })}
        {...props}
        ref={ref}
      />
      {error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}
    </div>

  )
})