import { configureStore } from '@reduxjs/toolkit'

const initialState = {
  allChecked: false,
  filters: [
    {
      name: 'none',
      label: 'Без пересадок',
      checked: false,
    },
    {
      name: 'oneStep',
      label: '1 пересадка',
      checked: false,
    },
    {
      name: 'twoSteps',
      label: '2 пересадки',
      checked: false,
    },
    {
      name: 'threeSteps',
      label: '3 пересадки',
      checked: false,
    },
  ],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_ALL_FILTERS': {
      const allChecked = !state.allChecked
      const updatedFilters = state.filters.map((el) => {
        return { ...el, checked: allChecked }
      })
      return {
        ...state,
        allChecked,
        filters: updatedFilters,
      }
    }

    case 'TOGGLE_FILTER': {
      const filterName = action.name
      const updatedFiltersToggle = state.filters.map((el) => {
        if (el.name === filterName) {
          return { ...el, checked: !el.checked }
        }
        return el
      })
      const allFiltersChecked = updatedFiltersToggle.every((el) => el.checked)
      return {
        ...state,
        allChecked: allFiltersChecked,
        filters: updatedFiltersToggle,
      }
    }
    default:
      return state
  }
}

const store = configureStore({ reducer })

export default store
