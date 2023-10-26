import { IShoppingCartItem } from '@/types/shopping-cart'
import { createDomain } from 'effector-next'

const shoppingCart = createDomain()

export const setShoppingCart = shoppingCart.createEvent<IShoppingCartItem[]>()
export const updateShoppingCart = shoppingCart.createEvent<IShoppingCartItem>()
export const removeShoppingCartItem = shoppingCart.createEvent<number>()
export const setTotalPrice = shoppingCart.createEvent<number>()
export const setDisableCart = shoppingCart.createEvent<boolean>()
export const updateCartItemTotalPrice = shoppingCart.createEvent<{
  machineId: number
  total_price: number
}>()
export const updateCartItemCount = shoppingCart.createEvent<{
  machineId: number
  count: number
}>()

const remove = (cartItems: IShoppingCartItem[], machineId: number) =>
  cartItems.filter((item) => item.machineId !== machineId)

function updateCartItem<T>(
  cartItems: IShoppingCartItem[],
  machineId: number,
  payload: T
) {
  return cartItems.map((item) => {
    if (item.machineId === machineId) {
      return {
        ...item,
        ...payload,
      }
    }

    return item
  })
}

export const $shoppingCart = shoppingCart
  .createStore<IShoppingCartItem[]>([])
  .on(setShoppingCart, (_, shoppingCart) => shoppingCart)
  .on(updateShoppingCart, (state, cartItem) => [...state, cartItem])
  .on(removeShoppingCartItem, (state, machineId) => [...remove(state, machineId)])
  .on(updateCartItemTotalPrice, (state, { machineId, total_price }) => [
    ...updateCartItem(state, machineId, { total_price }),
  ])
  .on(updateCartItemCount, (state, { machineId, count }) => [
    ...updateCartItem(state, machineId, { count }),
  ])

export const $totalPrice = shoppingCart
  .createStore<number>(0)
  .on(setTotalPrice, (_, value) => value)

export const $disableCart = shoppingCart
  .createStore<boolean>(false)
  .on(setDisableCart, (_, value) => value)
