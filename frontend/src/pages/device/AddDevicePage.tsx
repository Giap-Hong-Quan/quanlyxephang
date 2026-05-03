import { useEffect } from 'react'
import { useHeaderStore } from '../../store/useHeaderStore';
import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import { usePostDeviceQuery } from '../../hooks/deviceQuery';
import type { Device } from '../../types/deviceTypes';
import { useUI } from '../../context/UiProvider';

const AddDevicePage = () => {
  const { setLoading } = useUI()
  const [form] = Form.useForm()
  useEffect(() => {
    useHeaderStore.setState({ title: "Thiết bị", subTitle: "Thêm thiết bị" })
  }, []);
  const post = usePostDeviceQuery();
  const handleSubmit = async (value: Device) => {

    setLoading(true)
    try {
      await post.mutateAsync(value);
    } catch (error) {
      console.log("Lỗi API:", error);
    }
    finally {
      setLoading(false)
    }
  }
  // huy 
  const handleCancel = () => {
    form.resetFields()
  }
  return (
    <div className='w-full gap-3 flex flex-col'>
      <h2 className='text-2xl text-[#FF7506] font-bold'>Thêm thiết bị</h2>
      <Card
        style={{ borderWidth: 2 }}
        bodyStyle={{ padding: 24 }}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Mã Thiết bị"
                name="device_code"
                rules={[{ required: true, message: "Vui lòng nhập mã thiết bị" }]}
              >
                <Input placeholder='Nhập mã thiết bị' />
              </Form.Item>
              <Form.Item
                label="Địa chỉ IP"
                name="ip_address"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ IP" }]}
              >
                <Input placeholder='Nhập địa chỉ IP' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tên Thiết bị"
                name="device_name"
                rules={[{ required: true, message: "Vui lòng nhập tên thiết bị" }]}
              >
                <Input placeholder='Nhập tên thiết bị' />
              </Form.Item>
              <Form.Item
                label="Trạng thái"
                name="status"
              >
                <Select
                  allowClear
                  placeholder="Trạng thái hoạt động"
                  options={[
                    { value: 'active', label: 'Hoạt động' },
                    { value: 'inactive', label: 'Ngưng hoạt động' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <div className='w-full flex justify-center'>
            <Button onClick={() => handleCancel()}>huy bỏ</Button>
            <Button type="primary" htmlType="submit">
              Thêm thiết bị
            </Button>

          </div>
        </Form>
      </Card>
    </div>
  )
}

export default AddDevicePage