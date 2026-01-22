import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Table } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const RolePage = () => {
    const navigate = useNavigate();
    // column
    const columns = [
    {
      title: "Tên vai trò",
      dataIndex: "name",
    },
    {
      title: "Số người dùng",
      dataIndex: "userCount",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "",
      render: () => <a onClick={()=>navigate("/settings/roles/update")}>Cập nhật</a>,
    },
  ];
  // fake data

  const data = [
    {
      id: 1,
      name: "Kế toán",
      userCount: 6,
      description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
    },
    {
      id: 2,
      name: "Bác sĩ",
      userCount: 6,
      description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
    },
    {
      id: 3,
      name: "Lễ tân",
      userCount: 6,
      description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
    },
    {
      id: 4,
      name: "Quản lý",
      userCount: 6,
      description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
    },
    {
      id: 5,
      name: "Admin",
      userCount: 6,
      description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
    },
    {
      id: 6,
      name: "Superadmin",
      userCount: 6,
      description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
    },
  ];

  

  return (
    <div className="page-container">
       <div className="page-layout">
          {/* main */}
          <div className="page-main">
            <h2 className="page-title">Danh sách vai trò</h2>
            {/* filter */}
      <div className="filter-bar">
        <div className="filter-bar-row">
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
          {/* ASIDE */}
        <div className="page-aside">
          <Button
            className="btn-add"
            icon={<PlusOutlined />}
            onClick={() => navigate("/settings/roles/create")}
          >
            Thêm vai trò
          </Button>
        </div>
       </div>
     </div>
  )
}

export default RolePage