import React from 'react'
import { List, Spin, Button, Alert } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { onLoadMore } from '../../Store/rootSlice'
import classes from '../../Styles/index.module.scss'
import { Ticket } from '../Ticket/Ticket'

export const TicketsList = () => {
  const rootReducer = useSelector((state) => state.rootReducer)
  const dispatch = useDispatch()
  const tickets = rootReducer.tickets
  const ticketsCounter = rootReducer.ticketsCounter
  const filters = rootReducer.filters
  const sorters = rootReducer.sorters
  const loading = rootReducer.loading
  const flag = rootReducer.flag

  const filterTickets = (tickets, filters) => {
    const spreadTickets = [].concat(...tickets)
    return spreadTickets.filter((ticket) => {
      return filters.some(
        (filter) =>
          (filter.checked && filter.stops === ticket.segments[0].stops.length) ||
          (filter.checked && filter.stops === ticket.segments[1].stops.length)
      )
    })
  }

  const sortTickets = (tickets, sorters) => {
    const sorter = sorters.find((obj) => obj.checked === true)
    switch (sorter.value) {
      case 'cheapest':
        return tickets.sort((a, b) => a.price - b.price)

      case 'fastest':
        return tickets.sort((a, b) => a.segments[0].duration - b.segments[0].duration)

      case 'optimal':
        return tickets.sort((a, b) => {
          if (a.price === b.price) {
            return a.segments[0].duration - b.segments[0].duration
          } else {
            return a.price - b.price
          }
        })
    }
  }

  const loadMore = (
    <Button type="primary" className={classes['list-btn']} onClick={() => dispatch(onLoadMore())}>
      Показать еще 5 билетов!
    </Button>
  )

  const ticketsLoading = (flag) => {
    if (!flag) {
      return (
        <div className={classes['tickets-loader']}>
          <Spin />
        </div>
      )
    }
  }

  const ticketsToShow = tickets ? sortTickets(filterTickets(tickets, filters), sorters).slice(0, ticketsCounter) : []

  const ticketsList = (tickets) => {
    if (!tickets.length) {
      return (
        <Alert className={classes.alert} message="Рейсов, подходящих под заданные фильтры, не найдено" type="info" />
      )
    } else {
      return (
        <List
          className={classes['tickets-list']}
          loadingindicator={<Spin />}
          loading={loading}
          bordered={false}
          loadMore={loadMore}
          dataSource={ticketsToShow}
          renderItem={(item) => (
            <List.Item className={classes['list-item']}>
              <Ticket item={item} />
            </List.Item>
          )}
        />
      )
    }
  }

  return (
    <>
      {ticketsLoading(flag)}
      {ticketsList(ticketsToShow)}
    </>
  )
}
