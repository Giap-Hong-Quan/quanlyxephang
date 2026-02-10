import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import logo from "../assets/image/logoalta.png"
import DashboardIcon from "../assets/icon/dashboard.svg"
import DeviceIcon from "../assets/icon/device.svg"
import ServiceIcon from "../assets/icon/service.svg"
import QueueIcon from "../assets/icon/queue.svg"
import ReportIcon from "../assets/icon/report.svg"
import SettingIcon from "../assets/icon/setting.svg"
import LogoutIcon from "../assets/icon/logout.svg"
const Sidebar = () => {
    const location = useLocation(); // Lấy thông tin URL hiện tại
    const MENU=[
        {icon:DashboardIcon,name:"Tổng quan",path:"/dashboard"},
        {icon:DeviceIcon,name:"Thiết bị",path:"/devices"},
        {icon:ServiceIcon,name:"Dịch vụ",path:"/services"},
        {icon:QueueIcon,name:"Cấp số",path:"/queues"},
        {icon:ReportIcon,name:"Báo cáo ",path:"/reports"},
        {icon:SettingIcon,name:"Cài đặt hệ thống",path:"/settings",
            submenu:[
                { name: 'Quản lý tài khoản', path: '/settings/users' },
                { name: 'Nhật ký người dùng', path: '/settings/logs' },
            ]
        }
    ]
  return (
    <aside className='flex flex-col bg-white items-start justify-between h-screen w-[16%]'>
        <div className='w-full' >
            <div className='w-full h-[35%] flex justify-center items-center'>
            <img src={logo} alt="" className='w-[40%] ' />
            </div>
            <nav>
                <ul>
                {MENU.map((item,index)=>{
                    const active=location.pathname === item.path
                    return  <li key={index} className={`${active?"bg-[#FF7506] text-white":""} relative group text-[#7E7D88] font-medium py-3 pl-3 `}>
                        <NavLink className={"flex gap-2 items-center "}  to={item?.path}>
                            <img src={item?.icon} alt={item.name} className={`${active?" brightness-0 invert":""}`} />
                            <span>{item.name}</span>
                            {item.submenu&&<span className='font-bold ml-5'>⋮</span>}
                            {/* nếu có subitem */}
                        </NavLink>
                        {/* Submenu */}
            {item.submenu && (
                // 3. Mặc định dùng "hidden", khi hover vào li cha (group) thì hiện ra "group-hover:block"
                // 4. Dùng "absolute" để submenu hiện đè lên hoặc hiện bên cạnh mà không làm nhảy layout sidebar
                <ul className="hidden group-hover:block absolute left-full top-0 w-48 bg-white shadow-lg rounded-md z-50 ">
                    {item.submenu.map((sub, subIndex) => (
                        <li key={subIndex} className="hover:bg-[#FFF2E7]">
                            <NavLink className="block py-2 px-4 text-[#7E7D88] hover:text-[#FF7506]" to={sub.path}>
                                {sub.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
                    </li>
                })
                }   
                </ul>
                
            </nav>
        </div>
            <button className='flex gap-2 mb-6 py-3 w-[80%] justify-center mx-auto  font-semibold text-[#FF7506] rounded-lg bg-[#FFF2E7]'><img src={LogoutIcon} alt="" /> Đăng xuất</button>
    </aside>
  )
}

export default Sidebar