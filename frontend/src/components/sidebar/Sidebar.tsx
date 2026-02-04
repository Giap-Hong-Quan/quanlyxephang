import Sider from 'antd/es/layout/Sider';
import { handleMenu, MenuItem } from '../../libs/MenuConfig';
import { useNavigate, useLocation} from 'react-router-dom';
import logo from "../../assets/image/logoalta.png";
import { Button, Menu, MenuProps } from 'antd';
import "./sidebar.css"
import {ReactComponent as Logout} from "../../assets/icon/logout.svg";
import { useEffect, useState } from 'react';
const Sidebar = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      const result = await handleMenu();
      if (result) setMenu(result);
    };
    fetchMenu();
  }, []);
    // Convert MenuItem -> AntD items
   // Map đơn giản
  const items = menu.map((m) => ({
    key: m.path || m.label,
    label: m.label,
    icon: m.icon ? <m.icon /> : undefined
  }));
    
  return (
    <>
      <Sider  width={200} theme='light' >
        <div className="sider-content">
          <div>

          <img src={logo} alt="Alta Media" className='imglogo' />
         <Menu
            className="sidebar-menu"
            mode="vertical"
            triggerSubMenuAction="hover"
            selectedKeys={[location.pathname]}
            items={items}
            onClick={({ key }) => {
              if (typeof key === "string" && key.startsWith("/")) {
                navigate(key);
              }
            }}
          />
          </div>
            <Button
              className="logout-button"
              icon={<Logout />}
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Đăng xuất
            </Button>
      
        </div>

      </Sider>
    </>
  );
}

export default Sidebar