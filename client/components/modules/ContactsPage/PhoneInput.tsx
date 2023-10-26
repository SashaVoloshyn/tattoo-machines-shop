import { IFeedbackInput } from '@/types/feedbackForm'
import styles from '@/styles/feedbackForm/index.module.scss'

const PhoneInput = ({ register, errors, darkModeClass }: IFeedbackInput) => (
  <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
    <span>Телефон *</span>
    <input
      className={styles.feedback_form__form__input}
      placeholder="Введіть номер без + "
      type="tel"
      {...register('phone', {
        required: 'Введіть телефон!',
        pattern: {
          value: /^\d*[1-9]\d*$/,
          message: 'Недопустиме значення',
        },
        minLength: 10,
        maxLength: 15,
      })}
    />
    {errors.phone && (
      <span className={styles.error_alert}>{errors.phone?.message}</span>
    )}
    {errors.phone && errors.phone.type === 'minLength' && (
      <span className={styles.error_alert}>Минимум 10 цифр!</span>
    )}
    {errors.phone && errors.phone.type === 'maxLength' && (
      <span className={styles.error_alert}>Не более 15 цифр!</span>
    )}
  </label>
)

export default PhoneInput
