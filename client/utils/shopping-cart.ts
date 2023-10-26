import { addToCartFx, removeFromCartFx, updateCartItemFx } from "@/app/api/shopping-cart";
import { toast } from 'react-toastify'
import {
  removeShoppingCartItem, updateCartItemTotalPrice,
  updateShoppingCart
} from "@/context/shopping-cart";

export const toggleCartItem = async (
  username: string,
  machineId: number,
  isInCart: boolean
) => {
  try {
    if (isInCart) {
      await removeFromCartFx(`/shopping-cart/one/${machineId}`)
      removeShoppingCartItem(machineId)
      return
    }

    const data = await addToCartFx({
      url: '/shopping-cart/add',
      username,
      machineId,
    })

    updateShoppingCart(data)
  } catch (error) {
    toast.error((error as Error).message)
  }
}






export const removeItemFromCart = async (machineId: number) => {
  try {
    await removeFromCartFx(`/shopping-cart/one/${machineId}`)
    removeShoppingCartItem(machineId)
  } catch (error) {
    toast.error((error as Error).message)
  }
}

export const updateTotalPrice = async (total_price: number, machineId: number) => {
  const data = await updateCartItemFx({
    url: `/shopping-cart/total-price/${machineId}`,
    payload: { total_price },
  })

  updateCartItemTotalPrice({ machineId, total_price: data.total_price })
}
