import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Select,DatePicker, Input, Table, Button } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';
const { Option } = Select;
const { RangePicker } = DatePicker;
const QueuePage = () => {
   const navigate = useNavigate();
//colums
   const columns = [
    {
      title: "STT",
      dataIndex: "number",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customer",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "service",
    },
    {
      title: "Thời gian cấp",
      dataIndex: "createdAt",
    },
    {
      title: "Hạn sử dụng",
      dataIndex: "expiredAt",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (value: string) => {
        const color =
          value === "Đang chờ"
            ? "blue"
            : value === "Đã sử dụng"
            ? "gray"
            : "red";

        return (
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: color,
              }}
            />
            {value}
          </span>
        );
      },
    },
    {
      title: "Nguồn cấp",
      dataIndex: "source",
    },
    {
      title: "",
      render: () => (
       <a onClick={() => navigate("/queues/detail")}>
          Chi tiết
        </a>
      )
    },
  ];
// fake data
  const data = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    number: 201000 + i,
    customer: "Lê Huỳnh Ái Vân",
    service: "Khám tim mạch",
    createdAt: "14:35 - 07/11/2021",
    expiredAt: "14:35 - 12/11/2021",
    status: i % 3 === 0 ? "Đang chờ" : i % 3 === 1 ? "Đã sử dụng" : "Bỏ qua",
    source: i % 2 === 0 ? "Kiosk" : "Hệ thống",
  }));
  return (
   <div className="page-container">
       <div className="page-layout">
          {/* main */}
          <div className="page-main">
         <h2 className="page-title">Quản lý cấp số</h2>
           {/* FILTER */}
      <div className="filter-bar">
        <div className="filter-bar-row">
          <div className="filter-bar-row-small">
            <div className="filter-bar-column">
              <label className="column-label">Tên dịch vụ</label>
              <Select defaultValue="all" style={{ width: 200, height: 44 }}>
                <Option value="all">Tất cả</Option>
                <Option value="waiting">Khám sản phụ khoa</Option>
                <Option value="used">Khám răng hàm mặt</Option>
                <Option value="skip">Khám tai mũi họng</Option>
              </Select>
            </div>

            <div className="filter-bar-column">
              <label className="column-label">Tình trạng</label>
              <Select defaultValue="all" style={{ width: 200, height: 44 }}>
                <Option value="all">Tất cả</Option>
                <Option value="waiting">Đang chờ</Option>
                <Option value="used">Đã sử dụng</Option>
                <Option value="skip">Bỏ qua</Option>
              </Select>
            </div>

            <div className="filter-bar-column">
              <label className="column-label">Nguồn cấp</label>
              <Select defaultValue="all" style={{ width: 200, height: 44 }}>
                <Option value="all">Tất cả</Option>
                <Option value="kiosk">Kiosk</Option>
                <Option value="system">Hệ thống</Option>
              </Select>
            </div>

            <div className="filter-bar-column">
              <label className="column-label">Chọn thời gian</label>
              <RangePicker style={{ height: 44 }} />
            </div>
          </div>

          <div className="filter-bar-column">
            <label className="column-label">Từ khóa</label>
            <Input
              placeholder="Nhập từ khóa"
              suffix={<SearchOutlined />}
              style={{ width: 300, height: 44 }}
            />
          </div>
        </div>
      </div>

          <Table
            rowKey="id"
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 9 }}
          />
          </div>
          {/* asdie */}
          {/* ASIDE */}
        <div className="page-aside">
          <Button
            className="btn-add"
            icon={<PlusOutlined />}
            onClick={() => navigate("/queues/create")}
          >
            Cấp số mới
          </Button>
        </div>
       </div>
     </div>
  )
}

export default QueuePage