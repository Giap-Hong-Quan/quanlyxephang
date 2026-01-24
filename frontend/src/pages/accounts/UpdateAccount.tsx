import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Form, FormProps, Input, message, Select } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';
const {Option}=Select
type FieldType = {
  fullName: string;
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
  email: string;
  role: string;
  status: string;
};

const UpdateAccount = () => {
    const navigate = useNavigate();
    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
            try {
                console.log("Submit data:", values);

                // values đã có type an toàn
                // await deviceService.create(values);

                message.success("Câp nhật khoản thành công");
                navigate("/accounts");
            } catch (error) {
                 message.error("Câp nhật khoản thất bại");
            }
        };
  return (
     <div className="page-container">
          <h2 className="page-title">Quản lý tài khoản</h2>
            <div className="form-card">
                <h3 className="form-title">Thông tin tài khoản</h3>
                 <Form layout="vertical" onFinish={onFinish}>
                    <div className="form-grid">
                        {/* left */}
                         <div className="form-column">
                            <Form.Item
                                label="Họ tên"
                                name="fullName"
                                rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
                            >
                                <Input placeholder="Nhập họ tên" />
                            </Form.Item>
                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
                            >
                                <Input placeholder="Nhập số điện thoại" />
                            </Form.Item>
                             <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                { required: true, message: "Vui lòng nhập email" },
                                { type: "email", message: "Email không hợp lệ" },
                                ]}
                            >
                                <Input placeholder="Nhập email" />
                            </Form.Item>
                             <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                { required: true, message: "Vui lòng nhập email" },
                                { type: "email", message: "Email không hợp lệ" },
                                ]}
                            >
                                <Input placeholder="Nhập email" />
                            </Form.Item>
                         </div>
                         {/* right */}
                         <div className="form-column">
                             <Form.Item
                                label="Tên đăng nhập"
                                name="username"
                                rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
                            >
                                <Input placeholder="Nhập tên đăng nhập" />
                            </Form.Item>
                             <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
                            >
                                <Input.Password
                                placeholder="Nhập mật khẩu"
                                iconRender={(visible) =>
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                                />
                            </Form.Item>
                            <Form.Item
                                label="Nhập lại mật khẩu"
                                name="confirmPassword"
                                dependencies={["password"]}
                                rules={[
                                { required: true, message: "Vui lòng nhập lại mật khẩu" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject("Mật khẩu không khớp");
                                    },
                                }),
                                ]}
                            >
                                <Input.Password
                                placeholder="Nhập lại mật khẩu"
                                iconRender={(visible) =>
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                                />
                            </Form.Item>
                              <Form.Item
                label="Tình trạng"
                name="status"
                rules={[{ required: true, message: "Vui lòng chọn tình trạng" }]}
              >
                <Select defaultValue="active">
                  <Option value="active">Hoạt động</Option>
                  <Option value="inactive">Ngưng hoạt động</Option>
                </Select>
              </Form.Item>
                         </div>
                    </div>
   <p className="form-note">
            <span>*</span> Là trường thông tin bắt buộc
          </p>
            <div className="form-actions">
            <Button className="btn-cancel" onClick={() => navigate("/accounts")}>
              Hủy bỏ
            </Button>
            <Button type="primary" htmlType="submit" className="btn-submit">
              Cập nhật
            </Button>
          </div>
                 </Form>
                 
            </div>
     </div>
  )
}

export default UpdateAccount