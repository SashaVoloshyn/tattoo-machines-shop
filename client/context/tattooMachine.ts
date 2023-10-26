import { createDomain } from 'effector-next'
import { ITattooMachine } from "@/types/tattoomachines";

const tattooMachine = createDomain()

export const setTattooMachine = tattooMachine.createEvent<ITattooMachine>()

export const $tattooMachine = tattooMachine
  .createStore<ITattooMachine>({} as ITattooMachine)
  .on(setTattooMachine, (_, machine) => machine)
