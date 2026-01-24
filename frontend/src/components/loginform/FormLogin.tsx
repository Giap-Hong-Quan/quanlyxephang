import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./formlogin.css";

import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { loginService } from '../../services/authService';
type FieldType = {
  username: string;
  password: string;
};

const FormLogin: React.FC = () => {
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const result = await loginService(values);
      if(!result) console.log("lỗi")
      toast.success("Đăng nhập thành công");
      navigate("/"); 
      console.log("USER:", result);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      style={{ width: "100%" }}
      onFinish={onFinish}
      autoComplete="off"
      requiredMark={false}
    >
      
      <Form.Item<FieldType>
        label="Tên đăng nhập"
        name="username"
        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
      >
        <Input className="custom-input" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
      >
        <Input.Password
          className="custom-input"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Form.Item>

      <div className="forgot">
        <a href="#">Quên mật khẩu?</a>
      </div>

      <Form.Item>
        <Button className="btn-login" htmlType="submit">
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormLogin;
