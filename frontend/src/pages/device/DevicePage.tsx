import React, { useEffect } from 'react'
import { useHeaderStore } from '../../store/useHeaderStore';

const DevicePage = () => {
    useEffect(() => {
     useHeaderStore.setState({title:"Thiết bị",subTitle:"Danh sách thiết bị"})
    }, []);
  return (
    <div>DevicePage</div>
  )
}

export default DevicePage 