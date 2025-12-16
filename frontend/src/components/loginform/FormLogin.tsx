import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./formlogin.css";
import { loginService } from '../../services/authService';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/storeHook';
import { setUser } from '../../stores/slices/authSlice';

type FieldType = {
  email: string;
  password: string;
};

const FormLogin: React.FC = () => {
  const navigate = useNavigate(); // ✅ ĐÚNG CHỖ
 const dispatch = useAppDispatch(); 
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const user = await loginService(values);
      dispatch(setUser(user));
      toast.success("Đăng nhập thành công");
      navigate("/"); // ✅ OK
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
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
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
