/* eslint-disable indent */
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { $mode } from '@/context/mode'
import {
  controlStyles,
  menuStyles,
  selectStyles,
} from '@/styles/catalog/select'
import { optionStyles } from '@/styles/searchInput'
import { IOption, SelectOptionType } from '@/types/common'
import { createSelectOption } from '@/utils/common'

import { useRouter } from 'next/router'
import { $tattooMachines,
  setTattooMachinesByPopularity,
  setTattooMachinesCheapFirst,
  setTattooMachinesExpensiveFirst } from "@/context/tattooMachines";
import { categoriesOptions } from "@/utils/selectContents";

const FilterSelect = ({
  setSpinner,
}: {
  setSpinner: (arg0: boolean) => void
}) => {
  const mode = useStore($mode)
  const tattooMachines = useStore($tattooMachines)
  const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null)
  const router = useRouter()

  useEffect(() => {
    if (tattooMachines.rows) {
      switch (router.query.first) {
      case 'cheap':
        updateCategoryOption('Зпочатку дешеві')
        setTattooMachinesCheapFirst()
        break
      case 'expensive':
        updateCategoryOption('Зпочатку дорогі')
        setTattooMachinesExpensiveFirst()
        break
      case 'popular':
        updateCategoryOption('За популярністю')
        setTattooMachinesByPopularity()
        break
      default:
        updateCategoryOption('Зпочатку дешеві')
        setTattooMachinesCheapFirst()
        break
      }
    }
  }, [tattooMachines.rows, router.query.first])

  const updateCategoryOption = (value: string) =>
    setCategoryOption({ value, label: value })

  const updateRoteParam = (first: string) =>
    router.push(
      {
        query: {
          ...router.query,
          first,
        },
      },
      undefined,
      { shallow: true }
    )

  const handleSortOptionChange = (selectedOption: SelectOptionType) => {
    setSpinner(true)
    setCategoryOption(selectedOption)

    switch ((selectedOption as IOption).value) {
    case 'Зпочатку дешеві':
      setTattooMachinesCheapFirst()
      updateRoteParam('cheap')
      break
    case 'Зпочатку дорогі':
      setTattooMachinesExpensiveFirst()
      updateRoteParam('expensive')
      break
    case 'За популярністю':
      setTattooMachinesByPopularity()
      updateRoteParam('popular')
      break
    }

    setTimeout(() => setSpinner(false), 1000)
  }

  return (
    <Select
      placeholder="Я шукаю..."
      value={categoryOption || createSelectOption('Зпочатку дешеві')}
      onChange={handleSortOptionChange}
      styles={{
        ...selectStyles,
        control: (defaultStyles) => ({
          ...controlStyles(defaultStyles, mode),
        }),
        input: (defaultStyles) => ({
          ...defaultStyles,
          color: mode === 'dark' ? '#f2f2f2' : '#222222',
        }),
        menu: (defaultStyles) => ({
          ...menuStyles(defaultStyles, mode),
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state, mode),
        }),
      }}
      isSearchable={false}
      options={categoriesOptions}
    />
  )
}

export default FilterSelect
