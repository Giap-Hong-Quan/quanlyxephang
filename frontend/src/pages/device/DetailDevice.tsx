import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const DetailDevice = () => {
    const navigate = useNavigate();
    // face data
    const device = {
      code: "KIO_01",
      name: "Kiosk",
      type: "Kiosk",
      username: "Linhkyo011",
      ip: "128.172.308",
      password: "CMS",
      services:
        "Khám tim mạch, Khám sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát.",
    };

  return (
     <div className="device-detail-page">
        <h2 className="page-title">Quản lý thiết bị</h2>
          <div className="device-detail-layout">
             <div className="device-detail-card">
               <h3 className="card-title">Thông tin thiết bị</h3>
               <div className="info-grid">
                {/* left */}
                 <div className="info-col">
                  <Info label="Mã thiết bị" value={device.code} />
                  <Info label="Tên thiết bị" value={device.name} />
                  <Info label="Địa chỉ IP" value={device.ip} />
                </div>
                {/* RIGHT */}
                <div className="info-col">
                  <Info label="Loại thiết bị" value={device.type} />
                  <Info label="Tên đăng nhập" value={device.username} />
                  <Info label="Mật khẩu" value={device.password} />
                </div>
               </div>
              <div className="service-block">
                <span className="info-label">Dịch vụ sử dụng:</span>
                <p className="service-text">{device.services}</p>
              </div>
             </div>
            {/* ASIDE */}
          <div className="device-detail-aside">
          <Button
            icon={<EditOutlined />}
            className="btn-update"
            onClick={() => navigate("/devices/update")}
          >
            Cập nhật thiết bị
          </Button>
        </div>
          </div>
     </div>
  )
}

export default DetailDevice
/* component hiển thị label + value */
const Info = ({ label, value }: { label: string; value: string }) => (
  <div className="info-item">
    <span className="info-label">{label}:</span>
    <span className="info-value">{value}</span>
  </div>
);