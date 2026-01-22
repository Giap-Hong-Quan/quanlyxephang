import { Button, Input, Select, Space, Table, Tag } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

import "./style.css"
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const DevicePage = () => {
  const navigate = useNavigate();
  // các cột và type dữ liêu render
const columns = [
  
  {
    title: "Mã thiết bị",
    dataIndex: "code",
  },
  {
    title: "Tên thiết bị",
    dataIndex: "name",
  },
  {
    title: "Địa chỉ IP",
    dataIndex: "ip",
  },
  {
    title: "Trạng thái hoạt động",
    dataIndex: "status",
    render: (value: string) =>
      value === "active" ? (
        <Tag color="green">Hoạt động</Tag>
      ) : (
        <Tag color="red">Ngưng hoạt động</Tag>
      ),
  },
  {
    title: "Trạng thái kết nối",
    dataIndex: "connect",
    render: (value: string) =>
      value === "connected" ? (
        <Tag color="green">Kết nối</Tag>
      ) : (
        <Tag color="red">Mất kết nối</Tag>
      ),
  },
  {
    title: "Dịch vụ sử dụng",
    dataIndex: "service",
    render: (text: string) => (
      <>
        {text}
        <br />
        <a>Xem thêm</a>
      </>
    ),
  },
  {
    title: "",
    render: () => (
      <a onClick={() => navigate("/devices/detail")}>
      Chi tiết
    </a>
    ),
  },
  {
    title: "",
    render: () =>(
      <a onClick={() => navigate("/devices/update")}>
      Cập nhật
    </a>
    )
  },
];
//face data
const data = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  code: "KIO_01",
  name: "Kiosk",
  ip: "192.168.1.10",
  status: i % 2 === 0 ? "active" : "inactive",
  connect: i % 3 === 0 ? "connected" : "disconnected",
  service: "Khám tim mạch, Khám mắt...",
}));

  return (
    <div className="page-container">
      <div className="page-layout">
        {/* Cột trái */}
        <div className="page-main">
          <h2 className="page-title">Danh sách thiết bị</h2>
          <div className="filter-bar">
            <div className="filter-bar-row">
              <div className="filter-bar-row-small">
                <div className="filter-bar-column">
                  <label className="column-label">Trạng thái hoạt động</label>
                  <Select defaultValue="all" style={{ width: 300,height:44 }}>
                    <Option value="all">Tất cả</Option>
                    <Option value="active">Hoạt động</Option>
                    <Option value="inactive">Ngưng hoạt động</Option>
                  </Select>
                </div>
               <div className="filter-bar-column">
                  <label className="column-label">Trạng thái kết nối</label>
                  <Select defaultValue="all" style={{ width: 300,height:44 }}>
                    <Option value="all">Tất cả</Option>
                    <Option value="connected">Kết nối</Option>
                    <Option value="disconnected">Mất kết nối</Option>
                  </Select>
                </div>
              </div>
              <div className="filter-bar-column">
                <label className="column-label">Từ khóa</label>
                <Input
                  placeholder="Nhập từ khóa"
                  suffix={<SearchOutlined />}
                  style={{ width: 300,height:44 }}
                />
              </div>
            </div>
          </div>
           <Table  rowKey="id" columns={columns} dataSource={data} pagination={{ pageSize: 9 }} />
        </div>
        {/* CỘT PHẢI */}
        <div className="page-aside">
            <Button   onClick={() => navigate("/devices/create")}  className="btn-add" icon={<PlusOutlined />}>
              Thêm thiết bị
            </Button>
        </div>
      </div>
    </div>
  );
};

export default DevicePage;
