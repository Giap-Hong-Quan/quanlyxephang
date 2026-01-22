import React from 'react'
import MainContent from '../../components/mainContent'
import RightSidebar from '../../components/rightSidebar'

const DashboardPage = () => {
  return (
    <div style={{display:"flex",alignItems:"center"}}>
      <MainContent/>
      <RightSidebar/>
    </div>
  )
}

export default DashboardPage