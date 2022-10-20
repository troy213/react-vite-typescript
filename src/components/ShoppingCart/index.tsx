import React from 'react'
import { Offcanvas, Stack } from 'react-bootstrap'
import { CartItem } from '../'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import { StoreItemInterface, ShoppingCartInterface } from '../../model'
import formatCurrency from '../../utilities/formatCurrency'
import _storeItems from '../../data/items.json'

const ShoppingCart: React.FC<ShoppingCartInterface> = (
  props: ShoppingCartInterface
) => {
  const { isCartOpen } = props
  const { closeCart, cartItems } = useShoppingCart()
  const storeItems: StoreItemInterface[] = _storeItems

  return (
    <Offcanvas show={isCartOpen} onHide={closeCart} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className='ms-auto fw-bold fs-5'>
            Total{' '}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find((item) => item.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default ShoppingCart
