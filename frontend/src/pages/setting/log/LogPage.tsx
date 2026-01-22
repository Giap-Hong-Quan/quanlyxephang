import { SearchOutlined } from '@ant-design/icons';
import { DatePicker, Input, Table } from 'antd';
import React from 'react'
const {RangePicker}= DatePicker;
const LogPage = () => {
  // colums
   const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
    },
    {
      title: "Thời gian tác động",
      dataIndex: "time",
    },
    {
      title: "IP thực hiện",
      dataIndex: "ip",
    },
    {
      title: "Thao tác thực hiện",
      dataIndex: "action",
    },
  ];
// fake data
  const data = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    username: "tuyetnguyen@12",
    time: "01/12/2021 15:12:17",
    ip: "192.168.3.1",
    action: "Cập nhật thông tin dịch vụ DV_01",
  }));
  return (
      <div className="page-container">
       <div className="page-layout">
          {/* main */}
          <div className="page-main">
            {/* filter */}
         <div className="filter-bar">
        <div className="filter-bar-row">
          <div className="filter-bar-column">
            <label className="column-label">Chọn thời gian</label>
            <RangePicker style={{ height: 44 }} />
          </div>

          <div
            className="filter-bar-column"
            style={{ marginLeft: "auto" }}
          >
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
       </div>
     </div>
  )
}

export default LogPage