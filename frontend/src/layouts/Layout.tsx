
import Sidebar from '../components/sidebar/Sidebar'
import { Outlet } from "react-router-dom";
import Header from '../components/header/Header';
import './layout.css'
import { useAppDispatch, useAppSelector } from '../hooks/storeHook';
import { clearUser, setUser } from '../stores/slices/authSlice';
import { useEffect } from 'react';
import apiClient from '../services/apiClient';
const Layout = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (!user && token) {
      apiClient
        .get("/user/profile")
        .then((res) => {
          dispatch(setUser(res.data.user));
        })
        .catch(() => {
          localStorage.removeItem("accessToken");
          dispatch(clearUser());
        });
    }
  }, [user, token, dispatch]);

  // 3️⃣ Đang hydrate user
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <Sidebar />
      </aside>

      <div className="main">
        <header className="header">
          <Header />
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};


export default Layout