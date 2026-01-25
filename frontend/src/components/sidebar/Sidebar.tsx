import Sider from 'antd/es/layout/Sider';
import { MENU } from '../../libs/MenuConfig';
import { useNavigate, useLocation} from 'react-router-dom';
import logo from "../../assets/image/logoalta.png";
import { Button, Menu, MenuProps } from 'antd';
import "./sidebar.css"
import {ReactComponent as Logout} from "../../assets/icon/logout.svg";
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const getSelectedKey = (pathname: string) => {
  const parts = pathname.split("/").filter(Boolean);
  return "/" + parts[0];
};
  const items: MenuProps["items"]=MENU.map((menu)=>{
    if(menu.children&&menu.children.length>0){
      return {
        key:menu.label,
        icon:menu.icon?<menu.icon/>:undefined,
        label:menu.label,
      }
    }
    return {
     key: menu.path!,
        icon:menu.icon?<menu.icon/>:undefined,
        label:menu.label,
    }
  })
  return (
    <>
      <Sider  width={200} theme='light' >
        <div className="sider-content">
          <img src={logo} alt="Alta Media" className='imglogo' />
          <div>
          <Menu
            className="sidebar-menu"
            mode="vertical"  
              triggerSubMenuAction="hover"   
               selectedKeys={[getSelectedKey(location.pathname)]}
              items={items}
              onClick={({ key }) => {
                if (typeof key === "string" && key.startsWith("/")) {
                  navigate(key);
                }
              }}
          />
          </div>
       <div>
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
          
        </div>

      </Sider>
    </>
  );
}

export default Sidebar