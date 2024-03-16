import React from 'react'
import { Radio } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { onSorterChange } from '../../Store/rootSlice'
import classes from '../../Styles/index.module.scss'

export const Sorter = () => {
  const dispatch = useDispatch()
  const rootReducer = useSelector((state) => state.rootReducer)
  const sorters = rootReducer.sorters

  const sortersToShow = sorters.map((sorter) => {
    return (
      <Radio.Button
        key={sorter.value}
        className={classes['sorter-item']}
        value={sorter.value}
        checked={sorter.checked}
        onClick={() => dispatch(onSorterChange({ value: sorter.value }))}
      >
        {sorter.label}
      </Radio.Button>
    )
  })

  return (
    <Radio.Group className={classes.sorter} buttonStyle="solid" defaultValue={'cheapest'}>
      {sortersToShow}
    </Radio.Group>
  )
}
