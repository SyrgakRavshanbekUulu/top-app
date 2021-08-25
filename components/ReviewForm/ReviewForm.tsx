import { ReviewFormProps } from './ReviewForm.props'
import cn from 'classnames'
import styles from './ReviewForm.module.css'
import CloseIcon from './close.svg'
import { Input } from '../Input/Input'
import { Rating } from '../Rating/Rating'
import { Textarea } from '../TextArea/Textarea'
import { Button } from '../Button/Button'

export const ReviewForm = ({ className, productId, ...props }: ReviewFormProps): JSX.Element => {
  return (
    <>
      <div
        className={cn(styles.reviewForm, className)}
        {...props}
      >
        <Input placeholder='Имя'/>
        <Input className={styles.title} placeholder='Заголовок отзыва' />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Rating rating={0} />
        </div>
        <Textarea className={styles.description} placeholder='Текст отзыва' />
        <div className={styles.submit}>
          <Button appearance='primary'>Отправить</Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      <div className={styles.success}>
        <div className={styles.successTitle}>Ваш отзыв отправлен</div>
        <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
        <CloseIcon className={styles.close} />
      </div>
    </>
  )
}