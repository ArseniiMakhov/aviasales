import { AppHeader } from '../AppHeader/AppHeader'
import classes from '../../index.module.scss'
import FilterSteps from '../FilterSteps/FilterSteps'
import { Filter } from '../Filter/Filter'
import { TicketsList } from '../TicketsList/TicketsList'
import store from '../../store.js'

const App = () => {
  return (
    <div className={classes.app}>
      <AppHeader />
      <main className={classes['app-main']}>
        <FilterSteps store={store} />
        <div className={classes.container}>
          <Filter />
          <TicketsList />
        </div>
      </main>
    </div>
  )
}

export default App
