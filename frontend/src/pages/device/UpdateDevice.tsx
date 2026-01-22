import { Button, Form, FormProps, Input, message, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import "./style.css"

    type FieldType = {
    code: string;
    name: string;
    ip: string;
    type: string;
    username: string;
    password: string;
    services: string;
    };

    const UpdateDevice = () => {
        const navigate =useNavigate();
        const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
            try {
                console.log("Submit data:", values);

                // values đã có type an toàn
                // await deviceService.create(values);

                message.success("Cập nhật thiết bị thành công");
                navigate("/devices");
            } catch (error) {
                message.error("Cập nhật thiết bị thất bại");
            }
        };

    return (
        <div className="create-device-page">
            <h2 className="page-title">Quản lý thiết bị</h2>
            <div className="form-card">
                <h3 className="form-title">Thông tin thiết bị</h3>
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <div className="form-grid">
                        {/* cột trái */}
                        <div className="form-column">
                            <Form.Item<FieldType>
                                label="Mã thiết bị"
                                name="code"
                                rules={[{ required: true, message: "Vui lòng nhập mã thiết bị" }]}
                            >
                                <Input placeholder="Nhập mã thiết bị" />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Tên thiết bị"
                                name="name"
                                rules={[{ required: true, message: "Vui lòng nhập tên thiết bị" }]}
                            >
                                <Input placeholder="Nhập tên thiết bị" />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Địa chỉ IP"
                                name="ip"
                                rules={[{ required: true, message: "Vui lòng nhập địa chỉ IP" }]}
                            >
                                <Input placeholder="Nhập địa chỉ IP" />
                            </Form.Item>
                        </div>
                        {/* cột phải */}
                         <div className="form-column">
                            <Form.Item<FieldType>
                                label="Loại thiết bị"
                                name="type"
                                rules={[{ required: true, message: "Vui lòng chọn loại thiết bị" }]}
                            >
                              <Select
                                options={[
                                    { value: "kiosk", label: "Kiosk" },
                                    { value: "display", label: "Display counter" },
                                ]}
                                />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Tên đăng nhập"
                                name="username"
                                rules={[{ required: true, message: "Vui lòng nhập tài khoản" }]}
                            >
                                <Input placeholder="Nhập tài khoản" />
                            </Form.Item>
                              <Form.Item<FieldType>
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
                                >
                                    <Input.Password placeholder="Nhập mật khẩu" />
                                </Form.Item>
                         </div>  
                    </div>
                     {/* FULL WIDTH */}
                    <Form.Item<FieldType>
                        label="Dịch vụ sử dụng"
                        name="services"
                        rules={[{ required: true, message: "Vui lòng nhập dịch vụ sử dụng" }]}
                    >
                        <Input placeholder="Nhập dịch vụ sử dụng" />
                    </Form.Item>
                    <p className="form-note">
                        <span>*</span> Là trường thông tin bắt buộc
                    </p>
                       {/* ACTION */}
                    <div className="form-actions">
                        <Button
                        className="btn-cancel"
                        onClick={() => navigate("/devices")}
                        >
                        Hủy bỏ
                        </Button>
                        <Button type="primary" htmlType="submit" className="btn-submit">
                        Câp nhật
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
        
    )
    }

    export default UpdateDevice