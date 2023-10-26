export interface IShoppingCartItem {
  id: number
  name: string
  price: number
  image: string
  in_stock: number
  machine_manufacturer: string
  country_manufacturer: string
  count: number
  total_price: number
  userId: number
  machineId: number
}

export interface IAddToCartFx {
  url: string
  username: string
  machineId: number
}

export interface IUpdateCartItemFx {
  url: string
  payload: {
    total_price?: number
    count?: number
  }
}

export interface ICartItemCounterProps {
  totalCount: number
  machineId: number
  initialCount: number
  increasePrice: VoidFunction
  decreasePrice: VoidFunction
}
