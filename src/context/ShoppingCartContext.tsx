import { createContext, useContext, useState } from 'react'
import { ShoppingCart } from '../components'
import { useLocalStorage } from '../hooks/useLocalStorage'
import {
  ShoppingCartContextInterface,
  ShoppingCartProviderInterface,
  CartItemInterface,
} from '../model'

const ShoppingCartContext = createContext({} as ShoppingCartContextInterface)

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext)
}

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderInterface) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItemInterface[]>(
    'shopping-cart',
    []
  )
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0
  }

  const increaseCartQuantity = (id: number) => {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) == null) {
        return [...currentItems, { id, quantity: 1 }]
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            }
          } else {
            return item
          }
        })
      }
    })
  }

  const decreaseCartQuantity = (id: number) => {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.quantity === 1) {
        return currentItems.filter((item) => item.id !== id)
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            }
          } else {
            return item
          }
        })
      }
    })
  }

  const removeFromCart = (id: number) => {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id)
    })
  }

  const openCart = () => {
    setIsCartOpen(true)
  }

  const closeCart = () => {
    setIsCartOpen(false)
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isCartOpen={isCartOpen} />
    </ShoppingCartContext.Provider>
  )
}
