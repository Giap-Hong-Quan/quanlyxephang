import React, { useEffect } from 'react'
import { useHeaderStore } from '../../../store/useHeaderStore';

const LogPage = () => {
     useEffect(() => {
         useHeaderStore.setState({title:"Nhật ký người dùng",subTitle:"Danh sách hoạt động"})
        }, []);
  return (
    <div>LogPage</div>
  )
}

export default LogPage