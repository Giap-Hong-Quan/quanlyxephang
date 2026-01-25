import React, { useEffect, useState } from 'react';
import './header.css';
import { BellFilled } from "@ant-design/icons";
import nextIcon from '../../assets/icon/next.svg';
import { getProfile } from '../../services/authService';
import { toast } from 'sonner';
import { ProfileResponse } from '../../types/authTypes';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';
// Định nghĩa kiểu dữ liệu cho Props
interface RouteHandle {
  parent?: string;
  current: string;
}

const HeaderAlta: React.FC = () => {
  const location = useLocation();
  const matches = useMatches();
  // Tìm handle của route hiện tại
  // Chúng ta lấy match cuối cùng có chứa dữ liệu handle
  const currentMatch = [...matches].reverse().find((m) => m.handle);
  const titleData = currentMatch?.handle as RouteHandle | undefined;
  
  const [profile,setprofile]=useState<ProfileResponse>()
  const navigate=useNavigate()
  const handleGetProfile =async()=>{
  try {
    const res= await getProfile();
    setprofile(res)
    console.log(res)
  }catch (error: any) {
        toast.error(error?.response?.data?.message || "Lấy dữ liệu cá nhân thất bại");
      }
  }
  useEffect(()=>{
    handleGetProfile()
  },[])
  return (
    <header className="header-alta">
      {/* LEFT - Breadcrumb */}
      <div className="breadcrumb-wrapper">
        {/* Chỉ hiển thị parentTitle và dấu > nếu có dữ liệu truyền vào */}
        {titleData?.parent && (
          <>
            <span className="breadcrumb-item-parent">{titleData?.parent}</span>
          {titleData.parent&&titleData.current?
          <img 
              className="breadcrumb-separator" 
              src={nextIcon} 
              alt="separator" 
            />:""
}
          </>
        )}
        <span className="breadcrumb-item-active">{titleData?.current}</span>
      </div>

      {/* RIGHT - User */}
      <div className="header-right">
        <div className="bell-icon-wrapper">
           <div className="bell-icon">
             <BellFilled style={{ fontSize: '20px' }} />
             {/* Nếu có thông báo có thể thêm dấu chấm đỏ ở đây */}
             <span className="bell-badge"></span>
           </div>
        </div>
        
        <div className="user-info" onClick={() => navigate("/profile")}>
          <img 
            src={profile?.data?.avatar_url} 
            alt="avatar" 
            className="user-avatar" 
          />
          <div className="user-text">
            <span className="hello-text">Xin chào</span>
            <span className="user-name">{profile?.data?.full_name}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAlta;