import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppHeader } from '../AppHeader/AppHeader'
import classes from '../../Styles/index.module.scss'
import { Sorter } from '../Sorter/Sorter'
import { Filter } from '../Filter/Filter'
import { TicketsList } from '../TicketsList/TicketsList'
import { fetchSearchID, fetchTickets } from '../../Store/rootSlice'

const App = () => {
  const dispatch = useDispatch()
  const rootReducer = useSelector((state) => state.rootReducer)
  const flag = rootReducer.flag
  const searchID = rootReducer.searchID
  const error = rootReducer.error
  const tickets = rootReducer.tickets

  useEffect(() => {
    dispatch(fetchSearchID())
  }, [])

  useEffect(() => {
    if (!flag && searchID) {
      dispatch(fetchTickets(searchID))
    }
  }, [searchID, error, tickets])

  return (
    <div className={classes.app}>
      <AppHeader />
      <main className={classes['app-main']}>
        <Filter />
        <div className={classes.container}>
          <Sorter />
          <TicketsList />
        </div>
      </main>
    </div>
  )
}

export default App
