import React from 'react'
import { Card } from 'antd'

import classes from '../../index.module.scss'

const { Meta } = Card

export const Ticket = ({ price }) => {
  return (
    <Card className={classes.ticket} bordered={false}>
      <Meta
        title={
          <div className={classes['ticket-header']}>
            <p className={classes['ticket-price']}>{price} P</p>
            <img className={classes['ticket-logo']} src={'https://api.dicebear.com/7.x/miniavs/svg?seed=1'}></img>
          </div>
        }
        description={
          <>
            <div className={classes['ticket-description']}>
              <div className={classes['description-item']}>
                <p className={classes['item-header']}>Mow - Hkt</p>
                <p className={classes['item-body']}>10:45 - 08.00</p>
              </div>
              <div className={classes['description-item']}>
                <p className={classes['item-header']}>В пути</p>
                <p className={classes['item-body']}>21ч 15м</p>
              </div>
              <div className={classes['description-item']}>
                <p className={classes['item-header']}>2 пересадки</p>
                <p className={classes['item-body']}>Hkg, Jnb</p>
              </div>
            </div>
          </>
        }
      />
    </Card>
  )
}
