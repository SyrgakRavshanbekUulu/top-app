import { ReviewFormProps } from './ReviewForm.props'
import cn from 'classnames'
import styles from './ReviewForm.module.css'
import CloseIcon from './close.svg'
import { Input } from '../Input/Input'
import { Rating } from '../Rating/Rating'
import { Textarea } from '../TextArea/Textarea'
import { Button } from '../Button/Button'
import { Controller, useForm } from 'react-hook-form'
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface'
import axios from 'axios'
import { Api } from '../../helpers/api'
import { useState } from 'react'

export const ReviewForm = ({ className, productId, isOpened, ...props }: ReviewFormProps): JSX.Element => {
  const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IReviewForm>()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isError, setIsError] = useState<string>()

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(Api.review.createDemo, { ...formData, productId })
      if (data.message) {
        setIsSuccess(true)
        reset()
      } else {
        setIsError('something wrong')
      }
    } catch (error: any) {
      setIsError(error.message)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className={cn(styles.reviewForm, className)}
        {...props}
      >
        <Input
          placeholder='Имя'
          {
          ...register('name',
            { required: { value: true, message: 'Заполните поле' } })
          }
          error={errors.name}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.name ? true : false}
        />
        <Input
          className={styles.title}
          placeholder='Заголовок отзыва'
          {...register('title', { required: { value: true, message: 'Заполните поле' } })}
          error={errors.title}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.title ? true : false}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name='rating'
            rules={{ required: { value: true, message: 'Заполните поле' } }}
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                setRating={field.onChange}
                ref={field.ref}
                error={errors.rating}
                tabIndex={isOpened ? 0 : -1}
              />
            )}
          />
        </div>
        <Textarea
          className={styles.description}
          placeholder='Текст отзыва'
          {...register('description', { required: { value: true, message: 'Заполните поле' } })}
          error={errors.description}
          tabIndex={isOpened ? 0 : -1}
          aria-label='Текст отзыва'
          aria-invalid={errors.description ? true : false}
        />

        <div className={styles.submit}>
          <Button appearance='primary' tabIndex={isOpened ? 0 : -1} onClick={() => clearErrors()}>Отправить</Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {isSuccess && <div role='alert' className={styles.success}>
        <div className={styles.successTitle}>Ваш отзыв отправлен</div>
        <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
        <button 
          onClick={() => setIsSuccess(false)} 
          className={styles.close}
          aria-label='Закрыть оповешение'
        >
          <CloseIcon />
        </button>
      </div>}
      {isError && <div className={styles.error} role='alert'>
        Что то пошло не так, обнавите станицу!
        <button 
          onClick={() => setIsError(undefined)} 
          className={styles.close}
          aria-label='Закрыть оповешение'
        >
        <CloseIcon />
        </button>
      </div>}
    </form>
  )
}