import React, { useEffect } from 'react'
import { useHeaderStore } from '../../store/useHeaderStore';

const ServicePage = () => {
   useEffect(() => {
       useHeaderStore.setState({title:"Dịch vụ",subTitle:"Danh sách dịch vụ"})
      }, []);
  return (
    <div>ServicePage</div>
  )
}

export default ServicePage