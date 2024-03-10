import React from 'react'
import { Checkbox } from 'antd'

import classes from '../../index.module.scss'

export const FilterSteps = () => {
  return (
    <div className={classes['filter-aside']}>
      <h4 className={classes['filter-title']}>Количество пересадок</h4>
      <Checkbox className={classes['filter-checkbox']}>Все</Checkbox>
      <br />
      <Checkbox className={classes['filter-checkbox']}>Без пересадок</Checkbox>
      <br />
      <Checkbox className={classes['filter-checkbox']}>1 пересадка</Checkbox>
      <br />
      <Checkbox className={classes['filter-checkbox']}>2 пересадки</Checkbox>
      <br />
      <Checkbox className={classes['filter-checkbox']}>3 пересадки</Checkbox>
    </div>
  )
}
