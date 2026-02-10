import React, { useEffect } from 'react'
import { useHeaderStore } from '../../../store/useHeaderStore';

const UserPage = () => {
   useEffect(() => {
       useHeaderStore.setState({title:"Tài khoản",subTitle:"Danh sách tài khoản"})
      }, []);
  return (
    <div>
      <table>
        <tr>
          <th>Tên người dùng</th>
          <th>Email</th>
          <th>Số điện thoại</th>
          <th>Trang thái</th>
        </tr>
      </table>
    </div>
  )
}

export default UserPage