import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select, Table } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';
const {Option}=Select;
const AccountPage = () => {
    const navigate = useNavigate();
    // colums
      const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
    },
    {
      title: "Họ tên",
      dataIndex: "fullname",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "status",
      render: (value: string) => {
        const color = value === "Hoạt động" ? "#00A32E" : "#E73F3F";
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
      title: "",
      render: () => (
        <a onClick={()=>navigate("/settings/accounts/update")}>
          Cập nhật
        </a>
      )
    },
  ];
  //fake data
   const data = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    username: `tuyetnguyen@${12 + i}`,
    fullname: `Nguyễn Văn ${String.fromCharCode(65 + i)}`,
    phone: `0919${Math.floor(100000 + Math.random() * 899999)}`,
    email: `tuyetnguyen${120 + i}@gmail.com`,
    role: "Kế toán",
    status: i % 3 === 0 ? "Ngưng hoạt động" : "Hoạt động",
  }));

  return (
   <div className="page-container">
       <div className="page-layout">
          {/* main */}
          <div className="page-main">
           <h2 className="page-title">Danh sách tài khoản</h2>
            {/* filter */}
         <div className="filter-bar">
        <div className="filter-bar-row">
          <div className="filter-bar-column">
            <label className="column-label">Tên vai trò</label>
            <Select defaultValue="all" style={{ width: 300, height: 44 }}>
              <Option value="all">Tất cả</Option>
              <Option value="admin">Admin</Option>
              <Option value="accountant">Kế toán</Option>
              <Option value="doctor">Bác sĩ</Option>
            </Select>
          </div>

          <div className="filter-bar-column" style={{ marginLeft: "auto" }}>
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
         <div className="page-aside">
          <Button
            className="btn-add"
            icon={<PlusOutlined />}
            onClick={() => navigate("/settings/accounts/create")}
          >
            Thêm tài khoản
          </Button>
        </div>
       </div>
     </div>
  )
}

export default AccountPage