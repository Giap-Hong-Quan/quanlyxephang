import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import HeaderAlta from "../components/header/Header";


const { Content } = Layout;

const AdminLayout = () => {
  return (
    <Layout style={{ height: "100vh", overflow: "hidden"  }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Right layout */}
      <Layout>
        <HeaderAlta   />
        <Content  style={{
                    padding: 24,
                    background: "#f6f6f6",
                    overflowY: "auto",
                    flex: 1,
                  }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
