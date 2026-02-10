import React from 'react';
import FormLogin from '../../components/FormLogin';
import './login.css';
import anh2login from '../../assets/image/image1.png'; 
import logo from '../../assets/image/logoalta.png';
const Login = () => {
  return (
   <div className="login">
  <div className="col1">
    <div className="form">
      <img src={logo} alt="Logo" className="imgLogo" />
      <FormLogin />
    </div>
  </div>

  <div className="col2">
    <img src={anh2login} alt="login" className="img" />
    <div className="hero-text">
      <p className="hero-sub">Hệ thống</p>
      <p className="hero-title">QUẢN LÝ XẾP HÀNG</p>
    </div>
  </div>
</div>

  );
};

export default Login;
