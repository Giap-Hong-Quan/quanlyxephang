import { useEffect } from 'react';
import { useHeaderStore } from '../../store/useHeaderStore';
import { Form, Input, Select } from 'antd';
import { usePostDeviceQuery } from '../../hooks/deviceQuery';
import type { Device } from '../../types/deviceTypes';
import { useUI } from '../../context/UiProvider';
import { Monitor, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddDevicePage = () => {
  const navigate = useNavigate();
  const { setLoading } = useUI();
  const [form] = Form.useForm();
  const post = usePostDeviceQuery();

  useEffect(() => {
    useHeaderStore.setState({ title: "Thiết bị", subTitle: "Thêm thiết bị mới" });
  }, []);

  const handleSubmit = async (value: Device) => {
    setLoading(true);
    try {
      await post.mutateAsync(value);
      navigate("/devices");
    } catch (error) {
      console.log("Lỗi API:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    navigate("/devices");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-8">
      {/* Clay Form Header Card */}
      <div className="clay-card p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-orange-100 text-orange-600">
            <Monitor size={22} />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-800">Thêm Thiết Bị Mới</h2>
            <p className="text-xs text-slate-400">Tạo mới thông tin thiết bị cấp số hoặc quầy phục vụ</p>
          </div>
        </div>
      </div>

      {/* Clay Form Body */}
      <div className="clay-card p-8">
        <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={{ status: 'active' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              label={<span className="font-bold text-slate-700">Mã Thiết bị *</span>}
              name="device_code"
              rules={[{ required: true, message: "Vui lòng nhập mã thiết bị" }]}
            >
              <Input placeholder="Ví dụ: KIOSK_01" className="rounded-xl py-2.5" />
            </Form.Item>

            <Form.Item
              label={<span className="font-bold text-slate-700">Tên Thiết bị *</span>}
              name="device_name"
              rules={[{ required: true, message: "Vui lòng nhập tên thiết bị" }]}
            >
              <Input placeholder="Ví dụ: Cây cấp số sảnh A" className="rounded-xl py-2.5" />
            </Form.Item>

            <Form.Item
              label={<span className="font-bold text-slate-700">Địa chỉ IP *</span>}
              name="ip_address"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ IP" }]}
            >
              <Input placeholder="Ví dụ: 192.168.1.100" className="rounded-xl py-2.5" />
            </Form.Item>

            <Form.Item
              label={<span className="font-bold text-slate-700">Trạng thái hoạt động</span>}
              name="status"
            >
              <Select
                placeholder="Chọn trạng thái"
                className="rounded-xl"
                options={[
                  { value: 'active', label: 'Hoạt động' },
                  { value: 'inactive', label: 'Ngưng hoạt động' },
                ]}
              />
            </Form.Item>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="clay-btn bg-white text-slate-600 hover:bg-slate-50 py-2.5 px-5 text-sm"
            >
              <X size={16} />
              <span>Hủy bỏ</span>
            </button>

            <button
              type="submit"
              className="clay-btn clay-btn-orange py-2.5 px-6 text-sm font-bold"
            >
              <Save size={16} />
              <span>Thêm thiết bị</span>
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddDevicePage;