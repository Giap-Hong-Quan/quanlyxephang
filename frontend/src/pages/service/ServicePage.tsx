import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Select, Tag,DatePicker, Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;
const { RangePicker } = DatePicker;
const ServicePage = () => {
  const navigate = useNavigate();
   /* ===== TABLE COLUMNS  ===== */
  const columns = [
    {
      title: "Mã dịch vụ",
      dataIndex: "code",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
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
      title: "",
      render: () => (
        <a onClick={() => navigate("/services/detail")}>
          Chi tiết
        </a>
      ),
    },
    {
      title: "",
      render: () => (
        <a onClick={() => navigate("/services/update")}>
          Cập nhật
        </a>
      ),
    },
  ];

  /* ===== FAKE DATA ===== */
  const data = Array.from({ length: 16 }).map((_, i) => ({
  id: i,
  code: "KIO_01",
  name: "Kiosk",
  description: "Hoạt động",
  status: i % 3 === 0 ? "inactive" : "active",
  }));
  return (
     <div className="page-container">
       <div className="page-layout">
          {/* main */}
          <div className="page-main">
            <h2 className="page-title">Quản lý dịch vụ</h2>
            {/* filter */}
            <div className="filter-bar">
            <div className="filter-bar-row">
              <div className="filter-bar-row-small">
                <div className="filter-bar-column">
                  <label className="column-label">Trạng thái hoạt động</label>
                  <Select defaultValue="all" style={{ width: 300, height: 44 }}>
                    <Option value="all">Tất cả</Option>
                    <Option value="active">Hoạt động</Option>
                    <Option value="inactive">Ngưng hoạt động</Option>
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
          <div className="page-aside">
          <Button
            className="btn-add"
            icon={<PlusOutlined />}
            onClick={() => navigate("/services/create")}
          >
            Thêm dịch vụ
          </Button>
          </div>
       </div>
     </div>
  )
}

export default ServicePage