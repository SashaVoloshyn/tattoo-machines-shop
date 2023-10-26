import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import { ICatalogFiltersProps } from '@/types/catalog'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'
import { getQueryParamOnFirstRender } from '@/utils/common'
import {
  checkQueryParams,
  updateParamsAndFilters,
  updateParamsAndFiltersFromQuery,
} from '@/utils/catalog'
import { $countryManufacturers,
  $machineManufacturers,
  setCountryManufacturersFromQuery,
  setMachineManufacturersFromQuery
} from "@/context/tattooMachines";
import CatalogFiltersMobile from "@/components/modules/CatalogPage/CatalogFiltersMobile";

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  resetFilters,
  isPriceRangeChanged,
  currentPage,
  setIsFilterInQuery,
  closePopup,
  filtersMobileOpen,
}: ICatalogFiltersProps) => {
  const isMobile = useMediaQuery(820)
  const [spinner, setSpinner] = useState(false)
  const machineManufacturers = useStore($machineManufacturers)
  const countryManufacturers = useStore($countryManufacturers)
  const router = useRouter()

  useEffect(() => {
    applyFiltersFromQuery()
  }, [])

  const applyFiltersFromQuery = async () => {
    try {
      const {
        isValidMachineQuery,
        isValidCountryQuery,
        isValidPriceQuery,
        machineQueryValue,
        priceFromQueryValue,
        countryQueryValue,
        priceToQueryValue,
      } = checkQueryParams(router)

      const machineQuery = `&machine=${getQueryParamOnFirstRender(
        'machine',
        router
      )}`
      const countryQuery = `&country=${getQueryParamOnFirstRender('country', router)}`
      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`

      if (isValidMachineQuery && isValidCountryQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setMachineManufacturersFromQuery(machineQueryValue)
          setCountryManufacturersFromQuery(countryQueryValue)
        }, `${currentPage}${priceQuery}${machineQuery}${countryQuery}`)
        return
      }

      if (isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
        }, `${currentPage}${priceQuery}`)
      }

      if (isValidMachineQuery && isValidCountryQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setMachineManufacturersFromQuery(machineQueryValue)
          setCountryManufacturersFromQuery(countryQueryValue)
        }, `${currentPage}${machineQuery}${countryQuery}`)
        return
      }

      if (isValidMachineQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setMachineManufacturersFromQuery(machineQueryValue)
        }, `${currentPage}${machineQuery}`)
      }

      if (isValidCountryQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setCountryManufacturersFromQuery(countryQueryValue)
        }, `${currentPage}${countryQuery}`)
      }

      if (isValidCountryQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setCountryManufacturersFromQuery(countryQueryValue)
        }, `${currentPage}${priceQuery}${countryQuery}`)
      }

      if (isValidMachineQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setMachineManufacturersFromQuery(machineQueryValue)
        }, `${currentPage}${priceQuery}${machineQuery}`)
      }
    } catch (error) {
      const err = error as Error

      if (err.message === 'URI malformed') {
        toast.warning('Невірний url для фільтрів')
        return
      }

      toast.error(err.message)
    }
  }

  const updatePriceFromQuery = (priceFrom: number, priceTo: number) => {
    setIsFilterInQuery(true)
    setPriceRange([+priceFrom, +priceTo])
    setIsPriceRangeChanged(true)
  }

  const applyFilters = async () => {
    setIsFilterInQuery(true)
    try {
      setSpinner(true)
      const priceFrom = Math.ceil(priceRange[0])
      const priceTo = Math.ceil(priceRange[1])
      const priceQuery = isPriceRangeChanged
        ? `&priceFrom=${priceFrom}&priceTo=${priceTo}`
        : ''
      const machines = machineManufacturers
        .filter((item) => item.checked)
        .map((item) => item.title)
      const country = countryManufacturers
        .filter((item) => item.checked)
        .map((item) => item.title)
      const encodedMachineQuery = encodeURIComponent(JSON.stringify(machines))
      const encodedCountryQuery = encodeURIComponent(JSON.stringify(country))
      const machineQuery = `&machine=${encodedMachineQuery}`
      const countryQuery = `&country=${encodedCountryQuery}`
      const initialPage = currentPage > 0 ? 0 : currentPage

      if (machines.length && country.length && isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            machine: encodedMachineQuery,
            country: encodedCountryQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${priceQuery}${machineQuery}${countryQuery}`,
          router
        )
        return
      }

      if (isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${priceQuery}`,
          router
        )
      }

      if (machines.length && country.length) {
        updateParamsAndFilters(
          {
            machine: encodedMachineQuery,
            country: encodedCountryQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${machineQuery}${countryQuery}`,
          router
        )
        return
      }

      if (machines.length) {
        updateParamsAndFilters(
          {
            machine: encodedMachineQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${machineQuery}`,
          router
        )
      }

      if (country.length) {
        updateParamsAndFilters(
          {
            country: encodedCountryQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${countryQuery}`,
          router
        )
      }

      if (machines.length && isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            machine: encodedMachineQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${machineQuery}${priceQuery}`,
          router
        )
      }

      if (country.length && isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            country: encodedCountryQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${countryQuery}${priceQuery}`,
          router
        )
      }
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <>
      {isMobile ? (
        <CatalogFiltersMobile
          closePopup={closePopup}
          spinner={spinner}
          applyFilters={applyFilters}
          priceRange={priceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          setPriceRange={setPriceRange}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetFilters}
          filtersMobileOpen={filtersMobileOpen}
        />
      ) : (
        <CatalogFiltersDesktop
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          spinner={spinner}
          resetFilters={resetFilters}
          applyFilters={applyFilters}
        />
      )}
    </>
  )
}

export default CatalogFilters
