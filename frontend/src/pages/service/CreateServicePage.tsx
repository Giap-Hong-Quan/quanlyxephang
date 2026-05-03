import { useEffect } from 'react'
import { Button, Card, Col, Form, Input, Row, Select } from 'antd'
import { useUI } from '../../context/UiProvider'
import { useHeaderStore } from '../../store/useHeaderStore'
import { usePostServiceQuery } from '../../hooks/serviceQuery'
import type { Service } from '../../types/seviceTypes'

const CreateServicePage = () => {
  const { setLoading } = useUI()
  const [form] = Form.useForm()

  useEffect(() => {
    useHeaderStore.setState({
      title: "Dịch vụ",
      subTitle: "Thêm dịch vụ"
    })
  }, [])

  const post = usePostServiceQuery()

  const handleSubmit = async (value: Service) => {
    setLoading(true)
    try {
      await post.mutateAsync(value)
      form.resetFields()
    } catch (error) {
      console.log("Lỗi API:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    form.resetFields()
  }

  return (
    <div className='w-full gap-3 flex flex-col'>
      <h2 className='text-2xl text-[#FF7506] font-bold'>
        Thêm dịch vụ
      </h2>

      <Card style={{ borderWidth: 2 }} bodyStyle={{ padding: 24 }}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Mã dịch vụ"
                name="service_code"
                rules={[
                  { required: true, message: "Vui lòng nhập mã dịch vụ" }
                ]}
              >
                <Input placeholder="Nhập mã dịch vụ" />
              </Form.Item>

              <Form.Item
                label="Tên dịch vụ"
                name="service_name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên dịch vụ" }
                ]}
              >
                <Input placeholder="Nhập tên dịch vụ" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Trạng thái"
                name="status"
              >
                <Select
                  allowClear
                  placeholder="Chọn trạng thái"
                  options={[
                    { value: 'active', label: 'Hoạt động' },
                    { value: 'inactive', label: 'Ngưng hoạt động' },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label="Mô tả"
                name="description"
              >
                <Input.TextArea
                  placeholder="Nhập mô tả dịch vụ"
                  rows={4}
                />
              </Form.Item>
            </Col>
          </Row>

          <div className='w-full flex justify-center gap-3'>
            <Button onClick={handleCancel}>
              Hủy bỏ
            </Button>

            <Button type="primary" htmlType="submit">
              Thêm dịch vụ
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default CreateServicePage