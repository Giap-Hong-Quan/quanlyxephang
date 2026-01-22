import { Button, Select } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./style.css"
const {Option}=Select
const CreateQueue = () => {
    const navigate = useNavigate();
    const handlePrint = () => {
        // FIX CỨNG – sau này call API cấp số
        console.log("In số");
        navigate("/queues/detail"); // hoặc popup in số
    };
  return (
    <div className="page-container">
      <h2 className="page-title">Quản lý cấp số</h2>

      <div className="center-card">
        <h1 className="queue-title">CẤP SỐ MỚI</h1>

        <p className="queue-subtitle">Dịch vụ khách hàng lựa chọn</p>

        <Select
          placeholder="Chọn dịch vụ"
          style={{ width: 400, height: 44 }}
        >
          <Option value="tim-mach">Khám tim mạch</Option>
          <Option value="san-phu-khoa">Khám sản - phụ khoa</Option>
          <Option value="rang-ham-mat">Khám răng hàm mặt</Option>
          <Option value="tai-mui-hong">Khám tai mũi họng</Option>
        </Select>

        <div className="queue-actions">
          <Button className="btn-cancel" onClick={() => navigate("/queues")}>
            Hủy bỏ
          </Button>
          <Button className="btn-submit" onClick={handlePrint}>
            In số
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateQueue