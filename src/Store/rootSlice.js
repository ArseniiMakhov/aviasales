import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchSearchID = createAsyncThunk('apiReducer/fetchSearchID', async function () {
  const response = await fetch('https://aviasales-test-api.kata.academy/search')
  const searchID = await response.json()
  return searchID.searchId
})

export const fetchTickets = createAsyncThunk('apiReducer/fetchTickets', async function (searchID) {
  const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchID}`)
  if (!response.ok) {
    throw new Error({ name: 'error', message: 'tickets loading error' })
  }
  const data = await response.json()
  const tickets = data.tickets
  const flag = data.stop
  return { tickets, flag }
})

const rootSlice = createSlice({
  name: 'rootReducer',
  initialState: {
    status: null,
    error: null,
    loading: null,
    flag: null,
    searchID: null,
    tickets: null,
    ticketsCounter: 5,
    allChecked: true,
    filters: [
      {
        stops: 0,
        label: 'Без пересадок',
        checked: true,
      },
      {
        stops: 1,
        label: '1 пересадка',
        checked: true,
      },
      {
        stops: 2,
        label: '2 пересадки',
        checked: true,
      },
      {
        stops: 3,
        label: '3 пересадки',
        checked: true,
      },
    ],
    sorters: [
      {
        value: 'cheapest',
        label: 'Самый дешевый',
        checked: true,
      },
      {
        value: 'fastest',
        label: 'Самый быстрый',
        checked: false,
      },
      {
        value: 'optimal',
        label: 'Оптимальный',
        checked: false,
      },
    ],
  },
  reducers: {
    toggleFilter(state, action) {
      const stops = action.payload.stops
      const updatedFiltersToggle = state.filters.map((el) => {
        if (el.stops === stops) {
          return { ...el, checked: !el.checked }
        }
        return el
      })
      const allFiltersChecked = updatedFiltersToggle.every((el) => el.checked)
      return {
        ...state,
        allChecked: allFiltersChecked,
        filters: updatedFiltersToggle,
        ticketsCounter: 5,
      }
    },
    toggleAllFilters(state) {
      const allChecked = !state.allChecked
      const updatedFilters = state.filters.map((el) => {
        return { ...el, checked: allChecked }
      })
      return {
        ...state,
        allChecked,
        filters: updatedFilters,
        ticketsCounter: 5,
      }
    },
    onSorterChange(state, action) {
      const value = action.payload.value
      const updatedSortersToggle = state.sorters.map((el) => {
        if (el.value === value) {
          return { ...el, checked: true }
        }
        return { ...el, checked: false }
      })
      return {
        ...state,
        sorters: updatedSortersToggle,
        ticketsCounter: 5,
      }
    },
    onLoadMore(state) {
      state.ticketsCounter += 5
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchID.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSearchID.fulfilled, (state, action) => {
        state.status = 'ok'
        state.searchID = action.payload
      })
      .addCase(fetchSearchID.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload
      })
      .addCase(fetchTickets.pending, (state) => {
        state.error = null
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        if (state.tickets === null) {
          state.tickets = action.payload.tickets
          state.loading = false
        } else {
          state.tickets.push(action.payload.tickets)
        }
        state.status = 'ok'
        state.flag = action.payload.flag
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export const { toggleAllFilters, toggleFilter, onLoadMore, onSorterChange } = rootSlice.actions
export default rootSlice.reducer
