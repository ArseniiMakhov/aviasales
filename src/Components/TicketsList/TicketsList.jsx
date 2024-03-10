import React from 'react'
import { List, Spin, Button } from 'antd'

import classes from '../../index.module.scss'
import { Ticket } from '../Ticket/Ticket'

export const TicketsList = () => {
  const tickets = [{ price: 14000 }, { price: 15000 }]

  const loadMore = (
    <Button type="primary" className={classes['list-btn']}>
      Показать еще 5 билетов!
    </Button>
  )

  return (
    <List
      className={classes['tickets-list']}
      loadingindicator={<Spin />}
      bordered={false}
      loadMore={loadMore}
      dataSource={tickets}
      renderItem={(item) => (
        <List.Item className={classes['list-item']}>
          <Ticket price={item.price} />
        </List.Item>
      )}
    />
  )
}
