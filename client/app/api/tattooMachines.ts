import { createEffect } from 'effector-next'
import { toast } from 'react-toastify'

import api from '../axiosClient'

export const getBestsellersOrNewMachinesFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

export const getTattooMachinesFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})


export const getTattooMachineFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

export const searchMachinesFx = createEffect(
  async ({ url, search }: { url: string; search: string }) => {
    const { data } = await api.post(url, { search })

    return data.rows
  }
)

export const getMachineByNameFx = createEffect(
  async ({ url, name }: { url: string; name: string }) => {
    try {
      const { data } = await api.post(url, { name })

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)
