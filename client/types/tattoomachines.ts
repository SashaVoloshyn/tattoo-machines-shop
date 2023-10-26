export interface ITattooMachine {
  id: number
  machine_manufacturer: string
  price: number
  country_manufacturer: string
  vendor_code: string
  name: string
  description: string
  images: string
  in_stock: number
  color:string
  weight:number
  material:string
  bestseller: boolean
  new: boolean
  popularity: number
  needle_stroke:number
  compatibility: string
  type:string
}

export interface ITattooMachines {
  count: number
  rows: ITattooMachine[]
}
