import { IFeedbackInput } from '@/types/feedbackForm'
import styles from '@/styles/feedbackForm/index.module.scss'

const NameInput = ({ register, errors, darkModeClass }: IFeedbackInput) => (
  <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
    <span>Ім'я *</span>
    <input
      className={styles.feedback_form__form__input}
      type="text"
      placeholder="Введіть ім'я"
      {...register('name', {
        required: "Введіть ім'я",
        pattern: {
          value: /^[а-яА-Яa-zA-ZёЁіІїЇґҐ]*$/,
          message: 'Недопустиме значення',
        },
        minLength: 2,
        maxLength: 15,
      })}
    />
    {errors.name && (
      <span className={styles.error_alert}>{errors.name?.message}</span>
    )}
    {errors.name && errors.name.type === 'minLength' && (
      <span className={styles.error_alert}>Мінімум 2 символа!</span>
    )}
    {errors.name && errors.name.type === 'maxLength' && (
      <span className={styles.error_alert}>Не більше 15 символів</span>
    )}
  </label>
)

export default NameInput
