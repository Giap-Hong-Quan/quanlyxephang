import React, { useEffect } from 'react'
import { useHeaderStore } from '../../store/useHeaderStore';
import { useDeleteDeviceQuery, useGetAllDeviceQuery } from '../../hooks/deviceQuery';
import { CirclePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DevicePage = () => {
  const navigate=useNavigate();
    useEffect(() => {
     useHeaderStore.setState({title:"Thiết bị",subTitle:"Danh sách thiết bị"})
    }, []);
    const {data,isLoading,error}=useGetAllDeviceQuery();
    const deleteMutation = useDeleteDeviceQuery();
    console.log(data)
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  
  return (
     <div className='w-full'>
      <h2 className='text-2xl text-[#FF7506] font-bold'>Danh sách thiết bị</h2>
      <div className='flex gap-5'>
        <div className='pt-3 flex-[93%]'>
        <div className='flex items-center justify-between '>
          <div className='flex flex-col gap-1 w-[25%] '>
            <label htmlFor="role" className='text-[#282739] font-normal text-md'>Trạng thái hoạt động</label>
            <select name="role" id="role" className='bg-white py-3 px-1 rounded-lg'>
              <option value="all">Tất cả</option>
              <option value="online">Hoạt động</option>
              <option value="offline">Ngưng hoạt động</option>
            </select>
          </div>
          <div className='flex flex-col gap-1 w-[25%] '>
            <label htmlFor="">Tìm kiếm</label>
            <input type="text" className='bg-white py-3 px-1 rounded-lg pl-2.5' placeholder='Nhập tên,email...' />
          </div>
        </div>
       <div className="overflow-hidden rounded-t-xl border border-gray-200 mt-4">
        <table className="w-full text-left border-collapse">
      <thead className="bg-[#FF7506] text-white">
       <tr>
        <th className="px-4 py-3 font-semibold border-r border-white/20">Mã thiết bị</th>
        <th className="px-4 py-3 font-semibold border-r border-white/20">Tên thiết bị</th>
        <th className="px-4 py-3 font-semibold border-r border-white/20">Địa chỉ IP</th>
        <th className="px-4 py-3 font-semibold border-r border-white/20">Trạng thái</th>
        <th className="px-4 py-3 font-semibold text-center"></th>
         <th className="px-4 py-3 font-semibold text-center"></th>
          <th className="px-4 py-3 font-semibold text-center"></th>
      </tr>
        </thead>
        <tbody>
          {data?.devices.map((item,index)=>(
          <tr 
          key={item._id} 
          className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#FFF2E7]'} transition-colors border-b border-gray-100`}
        >
              <td className="px-4 py-3 text-[#535261]">{item.device_code}</td>
              <td className="px-4 py-3 text-[#535261]">{item.device_name}</td>
              <td className="px-4 py-3 text-[#535261]">{item.ip_address}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${item.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className="text-[#535261]">
                    {item.isActive ? "Hoạt động" : "Ngưng hoạt động"}
                  </span>
                </div>
              </td>
              <td className="px-4 py-1 text-[#4277FF] underline cursor-pointer">Chi tiết</td>
               <td className="px-4 py-1 text-[#4277FF] underline cursor-pointer">Cập nhật</td>
                <td onClick={()=>deleteMutation.mutate(item._id)} className="px-4 py-1 text-[#4277FF] underline cursor-pointer">Xóa</td>
            </tr>

          ))}
        </tbody>
        </table>

        </div>
        </div>
        <div className='flex-[7%] flex items-center'>
        <button onClick={()=>navigate("/devices/create")} className=' text-[#FF7506] font-medium bg-[#FFF2E7] justify-center items-center rounded-l-2xl  p-3 h-fit flex flex-col'>
          <CirclePlus className='' />
          Thêm tài khoản
        </button>

        </div>
      </div>
      
    </div>
  )
}

export default DevicePage 