import React, { useEffect } from 'react'
import { useHeaderStore } from '../../store/useHeaderStore'
// import Table from '../../components/TableCustom/TableCustom';
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
      {/* <Table data={[{ id: 1, name: "Test" }]} /> */}
    </div>
  )
}

export default DashboardPage