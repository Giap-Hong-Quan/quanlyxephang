// import React, { useEffect, useState } from 'react'
import { useEffect } from "react";
import { useProfile } from "../../hooks/authQuery"
import "./profile.css"
import { useHeaderStore } from "../../store/useHeaderStore";
// import { ProfileResponse } from '../../types/authTypes'
// import { getProfile } from '../../services/authService'
// import { toast } from 'sonner'
const Profile = () => {
    useEffect(() => {
           useHeaderStore.setState({title:"Thông tin cá nhân",subTitle:""})
          }, []);
    const {data,isLoading,error} =useProfile();
  

    console.log(data)
  let displayRole = "";

switch (data?.data.role.name) {
  case "admin":
    displayRole = "Quản trị viên";
    break;
  case "staff":
    displayRole = "Nhân viên cấp gọi số";
    break;
    case "docter":
    displayRole = "Bác sĩ";
    break;
}
  if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
  return (
    <div>
     <div className='profile-container'>
    <div className='profile-row'>
        {/* Cột trái: Avatar & Tên */}
        <div className='profile-col-left'>
            <div className='avatar-wrapper '>
                <img src={data?.data.avatar_url} alt="avatar" />
            </div>
        </div>

        {/* Cột phải: Chứa 2 cụm thông tin */}
        <div className='profile-info-grid'>
            <div className='profile-col-center'>
                <div className='profile-col-center-group'>
                    <label className='profile-col-label'>Tên người dùng</label>
                    <p className='profile-col-input'>{data?.data.full_name}</p>
                </div>
                <div className='profile-col-center-group'>
                    <label className='profile-col-label'>Email</label>
                    <p className='profile-col-input'>{data?.data.email}</p>
                </div>
          
            </div>
            <div className='profile-col-right'>
                            <div className='profile-col-center'>
                <div className='profile-col-center-group'>
                    <label className='profile-col-label'>Số điện thoại</label>
                    <p className='profile-col-input'>{data?.data?.phone}</p>
                </div>
        
                <div className='profile-col-center-group'>
                    <label className='profile-col-label'>Vai trò</label>
                    <p className='profile-col-input'>{ 
                      displayRole
                            }</p>
                </div>
            
            </div>
            </div>
        </div>
    </div>
</div>
    </div>
  )
}
export default Profile