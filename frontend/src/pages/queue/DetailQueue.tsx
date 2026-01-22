import { RollbackOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const DetailQueue = () => {
  const navigate = useNavigate();
      // fake data
  const queue = {
    name: "Nguyễn Thị Dung",
    service: "Khám tim mạch",
    number: "2001201",
    issuedAt: "14:35 - 07/11/2021",
    expiredAt: "18:00 - 07/11/2021",
    source: "Kiosk",
    status: "Đang chờ",
    phone: "0948523623",
    email: "nguyendung@gmail.com",
  };
  return (
      <div className="page-container">
      <h2 className="page-title">Quản lý cấp số</h2>

      <div className="page-layout">
        {/* MAIN */}
        <div className="detail-card">
          <h3 className="card-title">Thông tin cấp số</h3>

          <div className="detail-grid">
            {/* LEFT */}
            <div className="detail-col">
              <DetailItem label="Họ tên" value={queue.name} />
              <DetailItem label="Tên dịch vụ" value={queue.service} />
              <DetailItem label="Số thứ tự" value={queue.number} />
              <DetailItem label="Thời gian cấp" value={queue.issuedAt} />
              <DetailItem label="Hạn sử dụng" value={queue.expiredAt} />
            </div>

            {/* RIGHT */}
            <div className="detail-col">
              <DetailItem label="Nguồn cấp" value={queue.source} />
              <DetailItem
                label="Trạng thái"
                value={
                  <span className="status waiting">
                    <span className="dot" /> {queue.status}
                  </span>
                }
              />
              <DetailItem label="Số điện thoại" value={queue.phone} />
              <DetailItem label="Địa chỉ Email" value={queue.email} />
            </div>
          </div>
        </div>

        {/* ASIDE */}
        <div className="page-aside">
          <Button
            className="btn-back"
            icon={<RollbackOutlined />}
            onClick={() => navigate("/queues")}
          >
            Quay lại
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DetailQueue
const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="detail-item">
    <span className="detail-label">{label}:</span>
    <span className="detail-value">{value}</span>
  </div>
);