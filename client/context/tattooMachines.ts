import { IFilterCheckboxItem } from '@/types/catalog'
import { countryManufacturers, machineManufacturers} from "@/utils/catalog";
import { createDomain } from 'effector-next'
import { ITattooMachines } from "@/types/tattoomachines";

const tattooMachines = createDomain()

export const setTattooMachines = tattooMachines.createEvent<ITattooMachines>()
export const setTattooMachinesCheapFirst = tattooMachines.createEvent()
export const setTattooMachinesExpensiveFirst = tattooMachines.createEvent()
export const setTattooMachinesByPopularity = tattooMachines.createEvent()
export const setFilteredTattooMachines = tattooMachines.createEvent()
export const setMachinesManufacturers =
  tattooMachines.createEvent<IFilterCheckboxItem[]>()
export const updateMachineManufacturer =
  tattooMachines.createEvent<IFilterCheckboxItem>()
export const setCountryManufacturers =
  tattooMachines.createEvent<IFilterCheckboxItem[]>()
export const updateCountryManufacturer =
  tattooMachines.createEvent<IFilterCheckboxItem>()
export const setMachineManufacturersFromQuery =
  tattooMachines.createEvent<string[]>()
export const setCountryManufacturersFromQuery =
  tattooMachines.createEvent<string[]>()

const updateManufacturer = (
  manufacturers: IFilterCheckboxItem[],
  id: string,
  payload: Partial<IFilterCheckboxItem>
) =>
  manufacturers.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...payload,
      }
    }

    return item
  })

const updateManufacturerFromQuery = (
  manufacturers: IFilterCheckboxItem[],
  manufacturersFromQuery: string[]
) =>
  manufacturers.map((item) => {
    if (manufacturersFromQuery.find((title) => title === item.title)) {
      return {
        ...item,
        checked: true,
      }
    }

    return item
  })

export const $tattooMachines = tattooMachines
  .createStore<ITattooMachines>({} as ITattooMachines)
  .on(setTattooMachines, (_, machines) => machines)
  .on(setTattooMachinesCheapFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => a.price - b.price),
  }))
  .on(setTattooMachinesExpensiveFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.price - a.price),
  }))
  .on(setTattooMachinesByPopularity, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.popularity - a.popularity),
  }))

export const $machineManufacturers = tattooMachines
  .createStore<IFilterCheckboxItem[]>(
    machineManufacturers as IFilterCheckboxItem[]
  )
  .on(setMachinesManufacturers, (_, machines) => machines)
  .on(updateMachineManufacturer, (state, payload) => [
    ...updateManufacturer(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])
  .on(setMachineManufacturersFromQuery, (state, manufacturersFromQuery) => [
    ...updateManufacturerFromQuery(state, manufacturersFromQuery),
  ])

export const $countryManufacturers = tattooMachines
  .createStore<IFilterCheckboxItem[]>(
    countryManufacturers as IFilterCheckboxItem[]
  )
  .on(setCountryManufacturers, (_, country) => country)
  .on(updateCountryManufacturer, (state, payload) => [
    ...updateManufacturer(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])
  .on(setCountryManufacturersFromQuery, (state, manufacturersFromQuery) => [
    ...updateManufacturerFromQuery(state, manufacturersFromQuery),
  ])

export const $filteredTattooMachines = tattooMachines
  .createStore<ITattooMachines>({} as ITattooMachines)
  .on(setFilteredTattooMachines, (_, machines) => machines)
