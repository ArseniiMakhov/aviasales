import React from 'react'
import { Card } from 'antd'
import { add } from 'date-fns'

import classes from '../../Styles/index.module.scss'

const { Meta } = Card

export const Ticket = ({ item }) => {
  const infoTo = item.segments[0]
  const infoFrom = item.segments[1]

  const stopsCheck = (stops) => {
    switch (stops) {
      case 0:
        return 'Прямой рейс'
      case 1:
        return '1 Пересадка'
      default:
        return `${stops} Пересадки`
    }
  }

  const durationTransform = (duration) => {
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60
    return `${hours}ч ${minutes}м`
  }

  const dateTransform = (date, duration) => {
    const startDate = new Date(date)
    const startHoours = startDate.getHours()
    const startMinutes = startDate.getMinutes()
    const finishDate = add(startDate, { minutes: duration })
    const finishHours = finishDate.getHours()
    const finishMinutes = finishDate.getMinutes()
    return `${startHoours}:${startMinutes} - ${finishHours}:${finishMinutes}`
  }

  return (
    <Card className={classes.ticket} bordered={false}>
      <Meta
        title={
          <div className={classes['ticket-header']}>
            <p className={classes['ticket-price']}>{item.price} P</p>
            <img className={classes['ticket-logo']} src={`https://pics.avs.io/110/36/${item.carrier}.png`}></img>
          </div>
        }
        description={
          <>
            <div className={classes['ticket-description']}>
              <div className={classes['description-item']}>
                <p className={classes['item-header']}>
                  {infoTo.origin} - {infoTo.destination}
                </p>
                <p className={classes['item-body']}>{dateTransform(infoTo.date, infoTo.duration)}</p>
              </div>
              <div className={classes['description-item']}>
                <p className={classes['item-header']}>В пути</p>
                <p className={classes['item-body']}>{durationTransform(infoTo.duration)}</p>
              </div>
              <div className={classes['description-item']}>
                <p className={classes['item-header']}>{stopsCheck(infoTo.stops.length)}</p>
                <p className={classes['item-body']}>{infoTo.stops.join(', ')}</p>
              </div>
            </div>
            <div className={classes['ticket-description']}>
              <div className={classes['description-item']}>
                <p className={classes['item-header']}>
                  {infoFrom.origin} - {infoFrom.destination}
                </p>
                <p className={classes['item-body']}>{dateTransform(infoFrom.date, infoFrom.duration)}</p>
              </div>
              <div className={classes['description-item']}>
                <p className={classes['item-header']}>В пути</p>
                <p className={classes['item-body']}>{durationTransform(infoFrom.duration)}</p>
              </div>
              <div className={classes['description-item']}>
                <p className={classes['item-header']}>{stopsCheck(infoFrom.stops.length)}</p>
                <p className={classes['item-body']}>{infoFrom.stops.join(', ')}</p>
              </div>
            </div>
          </>
        }
      />
    </Card>
  )
}
