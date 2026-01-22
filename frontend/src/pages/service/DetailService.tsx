import { SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, Select, Table, Tag } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom'
const {Option} =Select
const {RangePicker}=DatePicker
const DetailService = () => {
    const navigate=useNavigate()
    //fake data
     const serviceInfo = {
    code: "201",
    name: "Khám tim mạch",
    description: "Chuyên các bệnh lý về tim",
    rule: {
      from: "0001",
      to: "9999",
      prefix: "0001",
      resetDaily: true,
      example: "201-2001",
    },
  };
  //column
   const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "number",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (value: string) => {
        if (value === "done")
          return <Tag color="green">● Đã hoàn thành</Tag>;
        if (value === "doing")
          return <Tag color="blue">● Đang thực hiện</Tag>;
        return <Tag color="default">● Vắng</Tag>;
      },
    },
  ];
  //fake data
    const data = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    number: 2010001 + i,
    status: i % 3 === 0 ? "doing" : i % 2 === 0 ? "done" : "absent",
  }));
  return (
     <div className="page-container">
      <h2 className="page-title">Quản lý dịch vụ</h2>

      <div className="page-layout">
        {/* ===== LEFT INFO ===== */}
        <div className="page-main" style={{ maxWidth: 420 }}>
          <div className="card">
            <h3 className="card-title">Thông tin dịch vụ</h3>

            <div className="info-item">
              <span className="label">Mã dịch vụ:</span>
              <span>{serviceInfo.code}</span>
            </div>

            <div className="info-item">
              <span className="label">Tên dịch vụ:</span>
              <span>{serviceInfo.name}</span>
            </div>

            <div className="info-item">
              <span className="label">Mô tả:</span>
              <span>{serviceInfo.description}</span>
            </div>

            <h4 className="sub-title">Quy tắc cấp số</h4>

            <div className="info-item">
              <span>Tăng tự động:</span>
              <span>
                {serviceInfo.rule.from} đến {serviceInfo.rule.to}
              </span>
            </div>

            <div className="info-item">
              <span>Prefix:</span>
              <span>{serviceInfo.rule.prefix}</span>
            </div>

            <div className="info-item">
              <span>Reset mỗi ngày</span>
            </div>

            <div className="info-item">
              <span>Ví dụ:</span>
              <span>{serviceInfo.rule.example}</span>
            </div>
          </div>
        </div>

        {/* ===== RIGHT TABLE ===== */}
        <div className="page-main">
          {/* FILTER */}
          <div className="filter-bar">
            <div className="filter-bar-row">
              <div className="filter-bar-column">
                <label className="column-label">Trạng thái</label>
                <Select defaultValue="all" style={{ width: 200, height: 44 }}>
                  <Option value="all">Tất cả</Option>
                  <Option value="done">Đã hoàn thành</Option>
                  <Option value="doing">Đang thực hiện</Option>
                  <Option value="absent">Vắng</Option>
                </Select>
              </div>

              <div className="filter-bar-column">
                <label className="column-label">Chọn thời gian</label>
                <RangePicker style={{ height: 44 }} />
              </div>

              <div className="filter-bar-column">
                <label className="column-label">Từ khóa</label>
                <Input
                  placeholder="Nhập từ khóa"
                  suffix={<SearchOutlined />}
                  style={{ width: 240, height: 44 }}
                />
              </div>
            </div>
          </div>

          {/* TABLE */}
          <Table
            rowKey="id"
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 8 }}
          />
        </div>

        {/* ===== ASIDE ===== */}
        <div className="page-aside">
          <Button
            className="btn-add"
            onClick={() => navigate("/services/update")}
          >
            Cập nhật danh sách
          </Button>

          <Button
            className="btn-cancel"
            onClick={() => navigate("/services")}
          >
            Quay lại
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DetailService