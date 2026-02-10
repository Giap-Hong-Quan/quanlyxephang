import React, { useEffect } from 'react'
import { useHeaderStore } from '../../store/useHeaderStore';

const ReportPage = () => {
   useEffect(() => {
       useHeaderStore.setState({title:"Báo cáo",subTitle:"Danh sách báo cáo"})
      }, []);
  
  return (
    <div>ReportPage</div>
  )
}

export default ReportPage