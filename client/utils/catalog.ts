import { NextRouter } from 'next/router'
import { getQueryParamOnFirstRender, idGenerator } from './common'
import { getTattooMachinesFx } from "@/app/api/tattooMachines";
import { setFilteredTattooMachines } from "@/context/tattooMachines";

const createManufacturerCheckboxObj = (title: string) => ({
  title,
  checked: false,
  id: idGenerator(),
})

export const machineManufacturers = [
  'DEFENDERR',
  'Bronc',
  'Bishop',
  'Ambition Machine',
  'Kwadron',
  'FK Irons',
  'Cheyenne',
  'ATOMUS',
  'MUST',
  'Dragon Hawk'
].map(createManufacturerCheckboxObj)

export const countryManufacturers = [
  'США',
  'Китай',
  'Україна',
  'Японія'
].map(createManufacturerCheckboxObj)

const checkPriceFromQuery = (price: number) =>
  price && !isNaN(price) && price >= 0 && price <= 10000

export const checkQueryParams = (router: NextRouter) => {
  const priceFromQueryValue = getQueryParamOnFirstRender(
    'priceFrom',
    router
  ) as string
  const priceToQueryValue = getQueryParamOnFirstRender(
    'priceTo',
    router
  ) as string
  const machineQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('machine', router) as string)
  )
  const countryQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('country', router) as string)
  )
  const isValidMachineQuery =
    Array.isArray(machineQueryValue) && !!machineQueryValue?.length
  const isValidCountryQuery =
    Array.isArray(countryQueryValue) && !!countryQueryValue?.length
  const isValidPriceQuery =
    checkPriceFromQuery(+priceFromQueryValue) &&
    checkPriceFromQuery(+priceToQueryValue)

  return {
    isValidMachineQuery,
    isValidCountryQuery,
    isValidPriceQuery,
    priceFromQueryValue,
    priceToQueryValue,
    machineQueryValue,
    countryQueryValue,
  }
}

export const updateParamsAndFiltersFromQuery = async (
  callback: VoidFunction,
  path: string
) => {
  callback()

  const data = await getTattooMachinesFx(`/tattoo-machines?limit=20&offset=${path}`)

  setFilteredTattooMachines(data)
}

export async function updateParamsAndFilters<T>(
  updatedParams: T,
  path: string,
  router: NextRouter
) {
  const params = router.query

  delete params.machine
  delete params.contry
  delete params.priceFrom
  delete params.priceTo

  router.push(
    {
      query: {
        ...params,
        ...updatedParams,
      },
    },
    undefined,
    { shallow: true }
  )

  const data = await getTattooMachinesFx(`/tattoo-machines?limit=20&offset=${path}`)

  setFilteredTattooMachines(data)
}
