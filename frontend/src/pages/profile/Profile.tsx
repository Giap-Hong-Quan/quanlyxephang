import React, { useEffect, useState } from 'react'
import "./profile.css"
import { ProfileResponse } from '../../types/authTypes'
import { getProfile } from '../../services/authService'
import { toast } from 'sonner'
const Profile = () => {
      const [profile,setprofile]=useState<ProfileResponse>()
      const handleGetProfile =async()=>{
  try {
    const res= await getProfile();
    setprofile(res)
    console.log(res)
  }catch (error: any) {
        console.error(error?.response?.data?.message);
      }
  }
  useEffect(()=>{
    handleGetProfile()
  },[])
  let displayRole = "";

switch (profile?.data.role.name) {
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
// if(!profile)return <div>is Loading</div>
  return (
    <div>
     <div className='profile-container'>
    <div className='profile-row'>
        {/* Cột trái: Avatar & Tên */}
        <div className='profile-col-left'>
            <div className='avatar-wrapper'>
                <img src={profile?.data.avatar_url} alt="avatar" />
               
            </div>
            <h2>{profile?.data.full_name}</h2>
        </div>

        {/* Cột phải: Chứa 2 cụm thông tin */}
        <div className='profile-info-grid'>
            <div className='profile-col-center'>
                <div className='profile-col-center-group'>
                    <label className='profile-col-label'>Tên người dùng</label>
                    <p className='profile-col-input'>{profile?.data.full_name}</p>
                </div>
                <div className='profile-col-center-group'>
                    <label className='profile-col-label'>Email</label>
                    <p className='profile-col-input'>{profile?.data.email}</p>
                </div>
          
            </div>
            <div className='profile-col-right'>
                            <div className='profile-col-center'>
                <div className='profile-col-center-group'>
                    <label className='profile-col-label'>Tên đăng nhập</label>
                    <p className='profile-col-input'>{profile?.data.username}</p>
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