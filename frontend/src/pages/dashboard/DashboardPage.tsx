import React, { useEffect } from 'react'
import { useHeaderStore } from '../../store/useHeaderStore'
// import MainContent from '../../components/mainContent'
// import RightSidebar from '../../components/rightSidebar'

const DashboardPage = () => {
  // const setTitle=useHeaderStore((a)=>a.setTitle)
  useEffect(() => {
   useHeaderStore.setState({title:"Trang chủ",subTitle:""})
  }, []);

  return (
    <div style={{display:"flex",alignItems:"center"}}>
      {/* <MainContent/>
      <RightSidebar/> */}
      <h1>Dashboard</h1>
    </div>
  )
}

export default DashboardPage