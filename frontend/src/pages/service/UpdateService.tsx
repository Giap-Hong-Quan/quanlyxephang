import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./style.css";

type FieldType = {
  code: string;
  name: string;
  description?: string;
  autoIncrease?: boolean;
  from?: string;
  to?: string;
  prefix?: string;
  suffix?: string;
  resetDaily?: boolean;
};

const UpdateService = () => {
  const navigate = useNavigate();

  const onFinish = async (values: FieldType) => {
    try {
      console.log("Submit service:", values);
      // TODO: call API create service
      message.success("Thêm dịch vụ thành công");
      navigate("/services");
    } catch (err) {
      message.error("Thêm dịch vụ thất bại");
    }
  };

  return (
    <div className="create-service-page">
      <h2 className="page-title">Quản lý dịch vụ</h2>

      <div className="form-card">
        <h3 className="form-title">Thông tin dịch vụ</h3>

        <Form layout="vertical" onFinish={onFinish}>
          {/* GRID */}
          <div className="form-grid">
            {/* LEFT */}
            <div className="form-column">
              <Form.Item
                label="Mã dịch vụ"
                name="code"
                rules={[{ required: true, message: "Vui lòng nhập mã dịch vụ" }]}
              >
                <Input placeholder="Nhập mã dịch vụ" />
              </Form.Item>

              <Form.Item
                label="Tên dịch vụ"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ" }]}
              >
                <Input placeholder="Nhập tên dịch vụ" />
              </Form.Item>
            </div>

            {/* RIGHT */}
            <div className="form-column">
              <Form.Item label="Mô tả" name="description">
                <Input.TextArea
                  rows={4}
                  placeholder="Mô tả dịch vụ"
                />
              </Form.Item>
            </div>
          </div>

          {/* RULE */}
          <h3 className="rule-title">Quy tắc cấp số</h3>

          <div className="rule-block">
            <div className="rule-row">

            <Form.Item name="autoIncrease" valuePropName="checked">
              <Checkbox>Tăng tự động từ:</Checkbox>
            </Form.Item>

              <Form.Item name="from">
                <Input placeholder="0001" style={{ width: 80 }} />
              </Form.Item>
              <span className="rule-text">đến</span>
              <Form.Item name="to">
                <Input placeholder="9999" style={{ width: 80 }} />
              </Form.Item>
            </div>
 <div className="rule-row">

            <Form.Item name="prefix" valuePropName="checked">
              <Checkbox>Prefix:</Checkbox>
            </Form.Item>
            <Input placeholder="0001" style={{ width: 80 }} />
 </div>
 <div className="rule-row">
            <Form.Item name="suffix" valuePropName="checked">
              <Checkbox>Suffix:</Checkbox>
            </Form.Item>
            <Input placeholder="0001" style={{ width: 80 }} />

 </div>
 <div className="rule-row">

            <Form.Item name="resetDaily" valuePropName="checked">
              <Checkbox>Reset mỗi ngày</Checkbox>
            </Form.Item>
 </div>
          </div>

          <p className="form-note">
            <span>*</span> Là trường thông tin bắt buộc
          </p>

          {/* ACTION */}
          <div className="form-actions">
            <Button className="btn-cancel" onClick={() => navigate("/services")}>
              Hủy bỏ
            </Button>
            <Button type="primary" htmlType="submit" className="btn-submit">
              Cập nhật
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UpdateService;
