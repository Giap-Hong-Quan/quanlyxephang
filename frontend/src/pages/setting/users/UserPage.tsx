import React, { useEffect } from 'react'
import { useHeaderStore } from '../../../store/useHeaderStore';
import { useGetAllUserQuery } from '../../../hooks/userQuery';
import { useUserSocket } from '../../../hooks/useUserSocket';
import { CirclePlus } from 'lucide-react';

const UserPage = () => {
  useEffect(() => {
       useHeaderStore.setState({title:"Tài khoản",subTitle:"Danh sách tài khoản"})
  }, []);
  useUserSocket();
  const {data,isLoading,error} = useGetAllUserQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <div className='w-full'>
      <h2 className='text-2xl text-[#FF7506] font-bold'>Danh sách tài khoản</h2>
      <div className='flex gap-5'>
        <div className='pt-3 flex-[93%]'>
        <div className='flex items-center justify-between '>
          <div className='flex flex-col gap-1 w-[25%] '>
            <label htmlFor="role" className='text-[#282739] font-normal text-md'>Vai trò</label>
            <select name="role" id="role" className='bg-white py-3 px-1 rounded-lg'>
              <option value="volvo">Tất cả</option>
              <option value="volvo">Admin</option>
              <option value="saab">Doctor</option>
              <option value="opel">Staff</option>
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
        <th className="px-4 py-3 font-semibold border-r border-white/20">Ảnh đại điện</th>
        <th className="px-4 py-3 font-semibold border-r border-white/20">Họ tên</th>
        <th className="px-4 py-3 font-semibold border-r border-white/20">Email</th>
        <th className="px-4 py-3 font-semibold border-r border-white/20">Số điện thoại</th>
        <th className="px-4 py-3 font-semibold border-r border-white/20">Vai trò</th>
        <th className="px-4 py-3 font-semibold border-r border-white/20">Trạng thái</th>
        <th className="px-4 py-3 font-semibold text-center">Thao tác</th>
      </tr>
        </thead>
        <tbody>
          {data?.users.map((item,index)=>(
          <tr 
          key={item._id} 
          className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#FFF2E7]'} transition-colors border-b border-gray-100`}
        >
              <td className="px-4 py-1 text-[#535261]"> <img className='h-12' src={item.avatar_url} alt="" /> </td>
              <td className="px-4 py-1 text-[#535261]">{item.full_name}</td>
              <td className="px-4 py-1 text-[#535261]">{item.email}</td>
              <td className="px-4 py-1 text-[#535261]">{item.phone}</td>
              <td className="px-4 py-1 text-[#535261]">{item.role.name}</td>
              <td className="px-4 py-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${item.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className="text-[#535261]">
                    {item.isActive ? "Hoạt động" : "Ngưng hoạt động"}
                  </span>
                </div>
              </td>
              <td className="px-4 py-1 text-[#4277FF] underline cursor-pointer">Cập nhật</td>
            </tr>

          ))}
        </tbody>
        </table>

        </div>
        </div>
        <div className='flex-[7%] flex items-center'>
        <button className=' text-[#FF7506] font-medium bg-[#FFF2E7] justify-center items-center border p-3 h-fit flex flex-col'>
          <CirclePlus className='' />
          Thêm tài khoản
        </button>

        </div>
      </div>
      
    </div>
  )
}

export default UserPage