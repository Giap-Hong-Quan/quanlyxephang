import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, Table } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';
const { RangePicker } = DatePicker;
const ReportPage = () => {
  const navigate =useNavigate()
  // colums
  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "number",
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
      title: "Tình trạng",
      dataIndex: "status",
      render: (value: string) => {
        const color =
          value === "Đang chờ"
            ? "#4277FF"
            : value === "Đã sử dụng"
            ? "#7E7D88"
            : "#E73F3F";

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
  ];
  //fake data
  const data = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    number: 2010001 + i,
    service:
      i % 2 === 0 ? "Khám tim mạch" : "Khám răng hàm mặt",
    createdAt: "07:20 - 07/10/2021",
    status:
      i % 3 === 0
        ? "Đang chờ"
        : i % 3 === 1
        ? "Đã sử dụng"
        : "Bỏ qua",
    source: i % 2 === 0 ? "Kiosk" : "Hệ thống",
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
          {/* ASIDE */}
        <div className="page-aside">
          <Button className="btn-add" icon={<DownloadOutlined />}>
            Tải về
          </Button>
        </div>
       </div>
     </div>
  )
}

export default ReportPage