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

export const ReviewForm = ({ className, productId, ...props }: ReviewFormProps): JSX.Element => {
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>()
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
    } catch (e) {
      setIsError(e.message)
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

        />
        <Input
          className={styles.title}
          placeholder='Заголовок отзыва'
          {...register('title', { required: { value: true, message: 'Заполните поле' } })}
          error={errors.title}
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
              />
            )}
          />
        </div>
        <Textarea
          className={styles.description}
          placeholder='Текст отзыва'
          {...register('description', { required: { value: true, message: 'Заполните поле' } })}
          error={errors.description}
        />

        <div className={styles.submit}>
          <Button appearance='primary'>Отправить</Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {isSuccess && <div className={styles.success}>
        <div className={styles.successTitle}>Ваш отзыв отправлен</div>
        <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
        <CloseIcon className={styles.close} onClick={() => setIsSuccess(false)}/>
      </div>}
      {isError && <div className={styles.error}>
        Что то пошло не так, обнавите станицу!
        <CloseIcon className={styles.close} onClick={() => setIsError(undefined)}/>
        </div>}
    </form>
  )
}