import { ITattooMachine } from "@/types/tattoomachines";

export interface IDashboardSlider {
  items: ITattooMachine[]
  spinner: boolean
  goToMachinePage?: boolean
}

export interface ICartAlertProps {
  count: number
  closeAlert: VoidFunction
}
