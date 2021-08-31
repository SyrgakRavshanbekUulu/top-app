import { RatingProps } from './Rating.props';
import cn from 'classnames'
import styles from './Rating.module.css'
import StarIcon from './star.svg'
import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef } from 'react';

export const Rating = forwardRef((
  { className, isEditable = false, rating, error, setRating, tabIndex, ...props }: RatingProps,
  ref: ForwardedRef<HTMLDivElement>) => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>))
  const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([])

  const computeFocus = (r: number, i: number): number => {
    if (!isEditable) {
      return -1
    }
    if (!rating && i == 0) {
      return tabIndex ?? 0
    }
    if (r == i + 1) {
      return tabIndex ?? 0
    }
    return -1
  }

  const constructRating = (currentRating: number) => {
    const updateArray = ratingArray.map((r: JSX.Element, i: number) => {
      return (
        <span
          className={cn(styles.star, className, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable
          })}
          onMouseEnter={() => changeDisplay(i + 1)}
          onMouseLeave={() => changeDisplay(rating)}
          onClick={() => onClick(i + 1)}
          tabIndex={computeFocus(rating, i)}
          onKeyDown={hundleKey}
          ref={r => ratingArrayRef.current?.push(r)}
          role={isEditable ? 'slider' : ''}
          aria-label={isEditable ? 'укажите рейтинг' : ('рейтинг' + rating)}
          aria-valuenow={rating}
          aria-valuemax={5}
          aria-valuemin={1}
          aria-invalid={error ? true : false}
        >
          <StarIcon />
        </span>

      )
    })
    setRatingArray(updateArray)
  }

  const changeDisplay = (i: number) => {
    if (!isEditable) {
      return
    }
    constructRating(i)
  }

  const onClick = (i: number) => {
    if (!isEditable || !setRating) {
      return
    }
    setRating(i)
  }

  const hundleKey = (e: KeyboardEvent) => {
    if (!isEditable || !setRating) {
      return
    }
    if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
      if (!rating) {
        setRating(1)
      } else {
        e.preventDefault()
        setRating(rating < 5 ? rating + 1 : 5)
      }
      ratingArrayRef.current[rating]?.focus()

    }
    if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
      e.preventDefault()
      setRating(rating > 1 ? rating - 1 : 1)
      ratingArrayRef.current[rating - 2]?.focus()
    }
  }

  useEffect(() => {
    constructRating(rating)
  }, [rating, tabIndex])

  return (
    <div {...props} ref={ref} className={cn(styles.ratingWrapper, {
      [styles.error]: error
    })}>
      {ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
      {error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}
    </div>
  )
})