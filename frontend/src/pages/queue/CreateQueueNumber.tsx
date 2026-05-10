
import { Form, Select, Button, Typography, Input } from 'antd';
import { CaretDownOutlined, UserOutlined } from '@ant-design/icons';
import { useCreateQueueNumber } from '../../hooks/useQueueNumberQuery';
import { useUI } from '../../context/UiProvider';
import { useGetAllDeviceQuery } from '../../hooks/deviceQuery';
import { useGetAllServiceQuery } from '../../hooks/serviceQuery';

const { Title, Text } = Typography;

const CreateQueueNumber = () => {
  const [form] = Form.useForm();
  const { setLoading } = useUI();
  const { data:dataDevice} = useGetAllDeviceQuery();
  const { data:dataService }  = useGetAllServiceQuery();
  const createQueueNumber = useCreateQueueNumber();
  const onFinish = (values: any) => {
    setLoading(true);
    try {
      createQueueNumber.mutate(values);
    } catch (error) {
      console.log("Lỗi API:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full flex flex-col justify-center items-center max-w-[1100px] bg-white rounded-3xl p-16 text-center shadow-[0px_4px_40px_rgba(0,0,0,0.05)]">
        <Title level={1} className="!text-[#FF7506] !text-4xl !font-black !mb-4 tracking-wider">
          CẤP SỐ MỚI
        </Title>
        <Text className="text-xl font-bold text-[#282739] block mb-12">
          Vui lòng điền thông tin và chọn dịch vụ
        </Text>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="max-w-[540px] mx-auto"
        >
          {/* Ô nhập tên người sử dụng */}
          <Form.Item
            name="customer_name"
            rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
          >
            <Input 
              size="large"
              placeholder="Nhập tên người cấp số" 
              prefix={<UserOutlined className="text-gray-400 mr-2" />}
              className="h-12 rounded-lg border-[#D4D4D4] hover:border-[#FF7506] focus:border-[#FF7506]"
            />
          </Form.Item>

          {/* Ô chọn thiết bị */}
          <Form.Item
            name="deviceId"
            rules={[{ required: true, message: 'Vui lòng chọn thiết bị!' }]}
            className="mt-6"
          >
            <Select
              size="large"
              placeholder="Chọn thiết bị sử dụng"
              className="text-left w-full custom-select"
              suffixIcon={<CaretDownOutlined className="text-[#FF7506] text-lg" />}
              options={dataDevice?.devices.map((device) => ({
                value: device._id,
                label: device.device_name,
              }))}
            />
          </Form.Item>

          {/* Ô chọn dịch vụ */}
          <Form.Item
            name="serviceId"
            rules={[{ required: true, message: 'Vui lòng chọn dịch vụ!' }]}
            className="mt-6"
          >
            <Select
              size="large"
              placeholder="Chọn dịch vụ cần thực hiện"
              className="text-left w-full custom-select"
              suffixIcon={<CaretDownOutlined className="text-[#FF7506] text-lg" />}
              options={dataService?.services.map((service:any) => ({
                value: service._id,
                label: service.service_name,
              })) || []}
            />
          </Form.Item>

          {/* Group Nút bấm */}
          <div className="flex justify-center gap-8 mt-16">
            <Button
              size="large"
              onClick={() => form.resetFields()}
              className="w-40 h-12 border-[#FF9138] text-[#FF9138] bg-[#FFF2E7] font-bold rounded-lg hover:!text-[#FF7506] hover:!border-[#FF7506] transition-all"
            >
              Hủy bỏ
            </Button>

            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="w-40 h-12 bg-[#FF9138] border-[#FF9138] font-bold rounded-lg hover:!bg-[#FF7506] shadow-md transition-all"
            >
              In số
            </Button>
          </div>
        </Form>
      </div>
      <style>{`
        .custom-select .ant-select-selector {
          height: 48px !important;
          display: flex !important;
          align-items: center !important;
          border-radius: 8px !important;
        }
        .ant-select-focused:not(.ant-select-disabled).ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
          border-color: #FF7506 !important;
          box-shadow: 0 0 0 2px rgba(255, 117, 6, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default CreateQueueNumber;