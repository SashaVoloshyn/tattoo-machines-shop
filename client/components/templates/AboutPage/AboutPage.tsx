/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import styles from '@/styles/about/index.module.scss'

const AboutPage = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <section className={styles.about}>
      <div className="container">
        <h2 className={`${styles.about__title} ${darkModeClass}`}>
          Про компанію
        </h2>
        <div className={styles.about__inner}>
          <div className={`${styles.about__info} ${darkModeClass}`}>
            <p>
              Компанія &quot;My TattooMachines SHOP&quot; пропонує Вам круті та сучасні
              технологічні рішення для набиття таттуюванью.
              99% товарів представлених на сайті постійно
              підтримуються у наявності на нашому складі.
            </p>
            <p>
              Асортимент інтернет-магазину &quot;My TattooMachines SHOP&quot; включає в
              себе татту машинки таких брендів : DEFENDERR, Bronc ,Bishop ,Ambition Machine,
              Kwadron ,FK Irons ,Cheyenne ,ATOMUS ,MUST , Hawk.
            </p>
          </div>
          <div className={`${styles.about__img} ${styles.about__img__top}`}>
            <img src="/img/about-img-1.PNG" alt="image-1" />
          </div>
          <div className={`${styles.about__img} ${styles.about__img__bottom}`}>
            <img src="/img/about-img-2.PNG" alt="image-2" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
