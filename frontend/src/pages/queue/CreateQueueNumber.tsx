import { Form, Select, Input } from 'antd';
import { useCreateQueueNumber } from '../../hooks/useQueueNumberQuery';
import { useUI } from '../../context/UiProvider';
import { useGetAllDeviceQuery } from '../../hooks/deviceQuery';
import { useGetAllServiceQuery } from '../../hooks/serviceQuery';
import { Ticket, User, Monitor, Layers, Printer, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateQueueNumber = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { setLoading } = useUI();
  const { data: dataDevice } = useGetAllDeviceQuery();
  const { data: dataService } = useGetAllServiceQuery();
  const createQueueNumber = useCreateQueueNumber();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await createQueueNumber.mutateAsync(values);
      form.resetFields();
      navigate('/queues');
    } catch (error) {
      console.log("Lỗi API:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 pb-8">
      {/* Clay Card Container */}
      <div className="clay-card p-10 text-center space-y-8">
        <div className="space-y-2">
          <div className="inline-flex p-3 rounded-3xl bg-orange-100 text-orange-600 mb-2">
            <Ticket size={36} />
          </div>
          <h1 className="text-3xl font-black text-orange-600 tracking-wider">CẤP SỐ MỚI</h1>
          <p className="text-sm font-semibold text-slate-500">
            Vui lòng nhập tên khách hàng, chọn thiết bị kiosk và dịch vụ tương ứng
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="max-w-lg mx-auto text-left space-y-5"
        >
          {/* Customer Name */}
          <Form.Item
            label={<span className="font-bold text-slate-700 flex items-center gap-1.5"><User size={16} className="text-orange-500" /> Tên người cấp số *</span>}
            name="customer_name"
            rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]}
          >
            <Input
              size="large"
              placeholder="Ví dụ: Nguyễn Văn A"
              className="rounded-xl py-2.5"
            />
          </Form.Item>

          {/* Device Selection */}
          <Form.Item
            label={<span className="font-bold text-slate-700 flex items-center gap-1.5"><Monitor size={16} className="text-orange-500" /> Thiết bị sử dụng *</span>}
            name="deviceId"
            rules={[{ required: true, message: 'Vui lòng chọn thiết bị!' }]}
          >
            <Select
              size="large"
              placeholder="Chọn thiết bị kiosk phát số"
              className="rounded-xl w-full"
              options={dataDevice?.devices.map((device) => ({
                value: device._id,
                label: device.device_name,
              })) || []}
            />
          </Form.Item>

          {/* Service Selection */}
          <Form.Item
            label={<span className="font-bold text-slate-700 flex items-center gap-1.5"><Layers size={16} className="text-orange-500" /> Dịch vụ cần thực hiện *</span>}
            name="serviceId"
            rules={[{ required: true, message: 'Vui lòng chọn dịch vụ!' }]}
          >
            <Select
              size="large"
              placeholder="Chọn dịch vụ khám / tư vấn"
              className="rounded-xl w-full"
              options={dataService?.services.map((service: any) => ({
                value: service._id,
                label: service.service_name,
              })) || []}
            />
          </Form.Item>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                form.resetFields();
                navigate('/queues');
              }}
              className="clay-btn bg-white text-slate-600 hover:bg-slate-50 py-3 px-6 text-sm font-bold"
            >
              <X size={18} />
              <span>Hủy bỏ</span>
            </button>

            <button
              type="submit"
              className="clay-btn clay-btn-orange py-3 px-8 text-sm font-black flex items-center gap-2"
            >
              <Printer size={18} />
              <span>IN SỐ THỨ TỰ</span>
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateQueueNumber;