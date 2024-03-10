import React from 'react'
import { Checkbox } from 'antd'
import { connect } from 'react-redux'

import { toggleAllFilters, toggleFilter } from '../../actions'
import classes from '../../index.module.scss'

const FilterSteps = ({ filters, allChecked, toggleAllFilters, toggleFilter }) => {
  const elements = filters.map((el, index) => {
    return (
      <Checkbox
        onChange={() => toggleFilter(el.name)}
        key={index}
        checked={el.checked}
        className={classes['filter-checkbox']}
      >
        {el.label}
      </Checkbox>
    )
  })

  return (
    <div className={classes['filter-aside']}>
      <h4 className={classes['filter-title']}>Количество пересадок</h4>
      <Checkbox onChange={toggleAllFilters} checked={allChecked} className={classes['filter-checkbox']}>
        Все
      </Checkbox>
      {elements}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    allChecked: state.allChecked,
    filters: state.filters,
  }
}

export default connect(mapStateToProps, { toggleAllFilters, toggleFilter })(FilterSteps)
