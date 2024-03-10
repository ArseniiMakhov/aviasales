import React from 'react'
import { Radio } from 'antd'

import classes from '../../index.module.scss'

export const Filter = () => {
  return (
    <Radio.Group className={classes.filter} defaultValue="a" buttonStyle="solid">
      <Radio.Button className={classes['filter-item']} value="a">
        Самый дешевый
      </Radio.Button>
      <Radio.Button className={classes['filter-item']} value="b">
        Самый быстрый
      </Radio.Button>
      <Radio.Button className={classes['filter-item']} value="c">
        Оптимальный
      </Radio.Button>
    </Radio.Group>
  )
}
