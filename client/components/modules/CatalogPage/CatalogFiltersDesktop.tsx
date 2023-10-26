import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import FilterManufacturerAccordion from './FilterManufacturerAccordion'
import Accordion from '@/components/elements/Accordion/Accordion'
import PriceRange from './PriceRange'
import { ICatalogFilterDesktopProps } from '@/types/catalog'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/catalog/index.module.scss'
import {
  $countryManufacturers,
  $machineManufacturers, setCountryManufacturers,
  setMachinesManufacturers,
  updateCountryManufacturer,
  updateMachineManufacturer
} from "@/context/tattooMachines";

const CatalogFiltersDesktop = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  spinner,
  resetFilters,
  applyFilters,
}: ICatalogFilterDesktopProps) => {
  const mode = useStore($mode)
  const machineManufacturers = useStore($machineManufacturers)
  const countryManufacturers = useStore($countryManufacturers)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div className={`${styles.catalog__bottom__filters} ${darkModeClass}`}>
      <h3
        className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}
      >
        Фильтри
      </h3>
      <div className={styles.filters__boiler_manufacturers}>
        <FilterManufacturerAccordion
          manufacturersList={machineManufacturers}
          title="Виробник татту машинок"
          updateManufacturer={updateMachineManufacturer}
          setManufacturer={setMachinesManufacturers}
        />
      </div>
      <div className={styles.filters__price}>
        <Accordion
          title="Ціна"
          titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
          arrowOpenClass={styles.open}
        >
          <div className={styles.filters__manufacturer__inner}>
            <PriceRange
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
            />
            <div style={{ height: 24 }} />
          </div>
        </Accordion>
      </div>
      <div className={styles.filters__boiler_manufacturers}>
        <FilterManufacturerAccordion
          manufacturersList={countryManufacturers}
          title="Країна виробник"
          updateManufacturer={updateCountryManufacturer}
          setManufacturer={setCountryManufacturers}
        />
      </div>
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          disabled={spinner || resetFilterBtnDisabled}
          onClick={applyFilters}
        >
          {spinner ? (
            <span
              className={spinnerStyles.spinner}
              style={{ top: 6, left: '47%' }}
            />
          ) : (
            'Показати'
          )}
        </button>
        <button
          className={styles.filters__actions__reset}
          disabled={resetFilterBtnDisabled}
          onClick={resetFilters}
        >
          Зкинути
        </button>
      </div>
    </div>
  )
}

export default CatalogFiltersDesktop
