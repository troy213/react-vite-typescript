import React from 'react'
import { Col, Row } from 'react-bootstrap'
import _storeItems from '../../data/items.json'
import { StoreItemInterface } from '../../model'
import { StoreItem } from '../../components'

const Store: React.FC = () => {
  const storeItems: StoreItemInterface[] = _storeItems

  return (
    <>
      <h1>Store Page</h1>
      <Row md={2} xs={1} lg={3} className='g-3'>
        {storeItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Store
