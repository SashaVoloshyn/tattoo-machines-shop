/* eslint-disable @next/next/no-img-element */
import Slider from 'react-slick'
import { useStore } from 'effector-react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { $mode } from '@/context/mode'
import styles from '@/styles/dashboard/index.module.scss'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useEffect } from 'react'
import BrandsSliderNextArrow from '@/components/elements/BrandsSliderNextArrow/BrandsSliderNextArrow'
import BrandsSliderPrevArrow from "@/components/elements/BrandsSliderPrevArrow/BrandsSliderPrevArrow";

const BrandsSlider = () => {
  const isMedia768 = useMediaQuery(768)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const brandItems = [
    { id: 1, img: '/img/brands/Ambition Machine.png', alt: 'Ambition Machine' },
    { id: 2, img: '/img/brands/ATOMUS.png', alt: 'ATOMUS' },
    { id: 3, img: '/img/brands/bishop.png', alt: 'bishop' },
    { id: 4, img: '/img/brands/Cheyenne.png', alt: 'Cheyenne' },
    { id: 5, img: '/img/brands/defenderr.png', alt: 'defenderr' },
    { id: 6, img: '/img/brands/bronc.png', alt: 'bronc' },
    { id: 7, img: '/img/brands/Dragon Hawk.png', alt: 'Dragon Hawk' },
    { id: 8, img: '/img/brands/FK Irons.png', alt: 'FK Irons' },
    { id: 9, img: '/img/brands/Kwadron.png', alt: 'Kwadron' },
    { id: 10, img: '/img/brands/MUST.png', alt: 'MUST' },
  ]

  useEffect(() => {
    const slider = document.querySelector(
      `.${styles.dashboard__brands__slider}`
    )

    const list = slider?.querySelector('.slick-list') as HTMLElement

    list.style.height = isMedia768 ? '60px' : '80px'
  }, [isMedia768])

  const settings = {
    dots: false,
    infinite: true,
    slidesToScroll: 3,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    nextArrow: <BrandsSliderNextArrow modeClass={darkModeClass} />,
    prevArrow: <BrandsSliderPrevArrow modeClass={darkModeClass} />,
  }

  return (
    <Slider {...settings} className={styles.dashboard__brands__slider}>
      {brandItems.map((item) => (
        <div
          className={`${styles.dashboard__brands__slide} ${darkModeClass}`}
          key={item.id}
          style={{ width: isMedia768 ? 200 : 300 }}
        >
          <img src={item.img} alt={item.alt} />
        </div>
      ))}
    </Slider>
  )
}

export default BrandsSlider
