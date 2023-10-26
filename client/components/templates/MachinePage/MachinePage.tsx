import { useStore } from 'effector-react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { $mode } from '@/context/mode'
import { formatPrice } from '@/utils/common'
import { $shoppingCart } from '@/context/shopping-cart'
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { toggleCartItem } from '@/utils/shopping-cart'
import { $user } from '@/context/user'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'
import { removeFromCartFx } from '@/app/api/shopping-cart'
import styles from '@/styles/machine/index.module.scss'
import { $tattooMachine } from "@/context/tattooMachine";
import { $tattooMachines, setTattooMachines, setTattooMachinesByPopularity } from "@/context/tattooMachines";
import { getTattooMachinesFx } from "@/app/api/tattooMachines";
import MachineTabs from "@/components/modules/MachinePage/MachineTabs";
import MachineImagesList from "@/components/modules/MachinePage/MachineImagesList";
import MachineAccordion from "@/components/modules/MachinePage/MachineAccordion";

const MachinePage = () => {
  const mode = useStore($mode)
  const user = useStore($user)
  const isMobile = useMediaQuery(850)
  const tattooMachine = useStore($tattooMachine)
  const tattooMachines = useStore($tattooMachines)
  const cartItems = useStore($shoppingCart)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const isInCart = cartItems.some((item) => item.machineId === tattooMachine.id)
  const spinnerToggleCart = useStore(removeFromCartFx.pending)
  const spinnerSlider = useStore(getTattooMachinesFx.pending)

  useEffect(() => {
    loadTattooMachine()
  }, [])

  const loadTattooMachine = async () => {
    try {
      const data = await getTattooMachinesFx('/tattoo-machines?limit=20&offset=0')

      setTattooMachines(data)
      setTattooMachinesByPopularity()
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const toggleToCart = () =>
    toggleCartItem(user.username, tattooMachine.id, isInCart)

  return (
    <section>
      <div className="container">
        <div className={`${styles.part__top} ${darkModeClass}`}>
          <h2 className={`${styles.part__title} ${darkModeClass}`}>
            {tattooMachine.name}
          </h2>
          <div className={styles.part__inner}>
            <MachineImagesList />
            <div className={styles.part__info}>
              <span className={`${styles.part__info__price} ${darkModeClass}`}>
                {formatPrice(tattooMachine.price || 0)} Грн
              </span>
              <span className={styles.part__info__stock}>
                {tattooMachine.in_stock > 0 ? (
                  <span className={styles.part__info__stock__success}>
                    Є на складі
                  </span>
                ) : (
                  <span className={styles.part__info__stock__not}>
                    Немає на складі
                  </span>
                )}
              </span>
              <span className={styles.part__info__code}>
                Артикул: {tattooMachine.vendor_code}
              </span>
              <button
                className={`${styles.part__info__btn} ${
                  isInCart ? styles.in_cart : ''
                }`}
                onClick={toggleToCart}
              >
                {spinnerToggleCart ? (
                  <span
                    className={spinnerStyles.spinner}
                    style={{ top: 10, left: '45%' }}
                  />
                ) : (
                  <>
                    <span className={styles.part__info__btn__icon}>
                      {isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}
                    </span>
                    {isInCart ? (
                      <span>Добавлено до кошика</span>
                    ) : (
                      <span>Добавити до кошика</span>
                    )}
                  </>
                )}
              </button>
              {!isMobile && <MachineTabs />}
            </div>
          </div>
        </div>
        {isMobile && (
          <div className={styles.part__accordion}>
            <div className={styles.part__accordion__inner}>
              <MachineAccordion title="Опис товару">
                <div
                  className={`${styles.part__accordion__content} ${darkModeClass}`}
                >
                  <h3
                    className={`${styles.part__tabs__content__title} ${darkModeClass}`}
                  >
                    {tattooMachine.name}
                  </h3>
                  <p
                    className={`${styles.part__tabs__content__text} ${darkModeClass}`}
                  >
                    {tattooMachine.description}
                  </p>
                </div>
              </MachineAccordion>
            </div>
            <MachineAccordion title="Характеристики">
              <div
                className={`${styles.part__accordion__content} ${darkModeClass}`}
              >
                <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
                  Виробник : <b>{tattooMachine.machine_manufacturer}.</b>
                </p>

                <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
                  Країна виготовлення : <b>{tattooMachine.country_manufacturer}.</b>
                </p>

                <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
                  Матеріал : <b>{tattooMachine.material}.</b>
                </p>

                <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
                  Колір : <b>{tattooMachine.color}.</b>
                </p>

                <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
                  Вага : <b>{tattooMachine.weight} грамм.</b>
                </p>

                <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
                  Хіт голки : <b>{tattooMachine.needle_stroke}мм.</b>
                </p>

                <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
                  Тип :<b> {tattooMachine.type}</b>.
                </p>
              </div>
            </MachineAccordion>
          </div>
        )}
        <div className={styles.part__bottom}>
          <h2 className={`${styles.part__title} ${darkModeClass}`}>
            Вам може сподобатись
          </h2>
          <DashboardSlider
            goToMachinePage
            spinner={spinnerSlider}
            items={tattooMachines.rows || []}
          />
        </div>
      </div>
    </section>
  )
}

export default MachinePage
