import React, { useEffect } from 'react'
import { useHeaderStore } from '../../store/useHeaderStore';

const QueuePage = () => {
   useEffect(() => {
       useHeaderStore.setState({title:"Cấp số",subTitle:"Danh sách cấp số"})
      }, []);
  return (
    <div>QueuePage</div>
  )
}

export default QueuePage