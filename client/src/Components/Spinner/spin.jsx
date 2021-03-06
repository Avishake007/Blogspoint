import React from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const Spinner = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  return (
    <Spin indicator={antIcon} style={{marginLeft:"8px"}} />
  )
}

export default Spinner