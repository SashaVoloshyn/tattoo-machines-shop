import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { ICatalogFilterMobileProps } from '@/types/catalog'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import FiltersPopupTop from './FiltersPopupTop'
import styles from '@/styles/catalog/index.module.scss'
import FiltersPopup from './FiltersPopup'
import { useState } from 'react'
import Accordion from '@/components/elements/Accordion/Accordion'
import PriceRange from './PriceRange'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  $countryManufacturers,
  $machineManufacturers,
  setCountryManufacturers,
  setMachinesManufacturers, updateCountryManufacturer,
  updateMachineManufacturer
} from "@/context/tattooMachines";

const CatalogFiltersMobile = ({
  spinner,
  resetFilterBtnDisabled,
  resetFilters,
  closePopup,
  applyFilters,
  filtersMobileOpen,
  setIsPriceRangeChanged,
  priceRange,
  setPriceRange,
}: ICatalogFilterMobileProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const machineManufacturers = useStore($machineManufacturers)
  const countryManufacturers = useStore($countryManufacturers)
  const [openMachines, setOpenMachines] = useState(false)
  const [openCountry, setOpenCountry] = useState(false)
  const handleOpenMachines = () => setOpenMachines(true)
  const handleCloseMachines = () => setOpenMachines(false)
  const handleOpenCountry = () => setOpenCountry(true)
  const handleCloseCountry = () => setOpenCountry(false)
  const isAnyMachineManufacturerChecked = machineManufacturers.some(
    (item) => item.checked
  )
  const isAnyCountryManufacturerChecked = countryManufacturers.some(
    (item) => item.checked
  )
  const isMobile = useMediaQuery(820)

  const resetAllMachineManufacturers = () =>
    setMachinesManufacturers(
      machineManufacturers.map((item) => ({ ...item, checked: false }))
    )

  const resetAllCountryManufacturers = () =>
    setCountryManufacturers(
      countryManufacturers.map((item) => ({ ...item, checked: false }))
    )

  const applyFiltersAndClosePopup = () => {
    applyFilters()
    closePopup()
  }

  return (
    <div
      className={`${styles.catalog__bottom__filters} ${darkModeClass} ${
        filtersMobileOpen ? styles.open : ''
      }`}
    >
      <div className={styles.catalog__bottom__filters__inner}>
        <FiltersPopupTop
          resetBtnText="Сбросить все"
          title="Фильтры"
          resetFilters={resetFilters}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          closePopup={closePopup}
        />
        <div className={styles.filters__boiler_manufacturers}>
          <button
            className={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            onClick={handleOpenMachines}
          >
            Виробник татту машинок
          </button>
          <FiltersPopup
            title="Виробник татту машинок"
            resetFilterBtnDisabled={!isAnyMachineManufacturerChecked}
            updateManufacturer={updateMachineManufacturer}
            setManufacturer={setMachinesManufacturers}
            applyFilters={applyFiltersAndClosePopup}
            manufacturersList={machineManufacturers}
            resetAllManufacturers={resetAllMachineManufacturers}
            handleClosePopup={handleCloseMachines}
            openPopup={openMachines}
          />
        </div>
        <div className={styles.filters__boiler_manufacturers}>
          <button
            className={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            onClick={handleOpenCountry}
          >
            Країна виробник
          </button>
          <FiltersPopup
            title="Країна виробник"
            resetFilterBtnDisabled={!isAnyCountryManufacturerChecked}
            updateManufacturer={updateCountryManufacturer}
            setManufacturer={setCountryManufacturers}
            applyFilters={applyFiltersAndClosePopup}
            manufacturersList={countryManufacturers}
            resetAllManufacturers={resetAllCountryManufacturers}
            handleClosePopup={handleCloseCountry}
            openPopup={openCountry}
          />
        </div>
        <div className={styles.filters__price}>
          <Accordion
            title="Ціна"
            titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            hideArrowClass={styles.hide_arrow}
            isMobileForFilters={isMobile}
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
      </div>
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          onClick={applyFiltersAndClosePopup}
          disabled={resetFilterBtnDisabled}
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
      </div>
    </div>
  )
}

export default CatalogFiltersMobile
