import { BellOutlined, RightOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Flex, Layout, Space, Typography } from "antd";

const { Header } = Layout;
const { Text } = Typography;

const HeaderAlta = () => {
  return (
    <Header className="header-alta">
      <Flex justify="space-between" align="center">
        {/* LEFT - Breadcrumb */}
        <Breadcrumb className="breadcrumb-wrapper"
          separator={
            <RightOutlined style={{ fontSize: 16, color: "#7E7D88" }} />
          }
        >
          <Breadcrumb.Item>
             <span style={{ color: "#7E7D88", fontSize: 20 }}>
                Thiết bị
              </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
              <span style={{ color: "#FF7506", fontSize: 20 }}>
                Danh sách thiết bị
              </span>
          </Breadcrumb.Item>
        </Breadcrumb>

        {/* RIGHT - User */}
        <Space size={24} align="center">
          <BellOutlined className="header-bell" style={{ fontSize: '20px', color: '#FF9138' }} />

          <Space>
            <Avatar
              size={40}
              src="https://i.pravatar.cc/100"
            />
            <div className="header-user">
              <Text className="header-hello">Xin chào</Text>
              <Text className="header-name">Lê Quỳnh Ái Vân</Text>
            </div>
          </Space>
        </Space>
      </Flex>
    </Header>
  );
};

export default HeaderAlta;
