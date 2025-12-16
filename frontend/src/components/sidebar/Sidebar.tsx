import React from 'react'
import { useAppSelector } from '../../hooks/storeHook'
import { PERMISSION_ROUTES } from '../../libs/MenuConfig';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const user =useAppSelector((state)=>state.auth.user)
    if (!user) return null;
  const menus = PERMISSION_ROUTES.filter(r =>
  user.permissions.includes(r.permission)
);
  return (
    <div className="sidebar">
      {menus.map((menu) => (
        <NavLink key={menu.path} to={menu.path}>
          {menu.label}
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar