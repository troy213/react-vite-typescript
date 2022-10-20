import { ReactNode } from 'react'

export interface StoreItemInterface {
  id: number
  name: string
  price: number
  imgUrl: string
}

export interface CartItemInterface {
  id: number
  quantity: number
}

export interface ShoppingCartInterface {
  isCartOpen: boolean
}

export interface ShoppingCartProviderInterface {
  children: ReactNode
}

export interface ShoppingCartContextInterface {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: CartItemInterface[]
}
