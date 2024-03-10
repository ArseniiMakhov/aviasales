export const toggleAllFilters = () => {
  return {
    type: 'TOGGLE_ALL_FILTERS',
  }
}

export const toggleFilter = (name) => {
  return {
    type: 'TOGGLE_FILTER',
    name,
  }
}
