import { useEffect } from 'react';
import { useHeaderStore } from '../../store/useHeaderStore';
import { Form, Input, Select } from 'antd';
import { useGetDeviceByIdQuery, usePutDeviceQuery } from '../../hooks/deviceQuery';
import type { Device } from '../../types/deviceTypes';
import { useUI } from '../../context/UiProvider';
import { useParams, useNavigate } from 'react-router-dom';
import { Monitor, Save, X } from 'lucide-react';

const UpdateDevicePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setLoading } = useUI();
  const [form] = Form.useForm();
  const put = usePutDeviceQuery();

  useEffect(() => {
    useHeaderStore.setState({ title: "Thiết bị", subTitle: "Cập nhật thiết bị" });
  }, []);

  const { data, isLoading } = useGetDeviceByIdQuery(id ?? "");

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        device_code: data.device_code,
        device_name: data.device_name,
        ip_address: data.ip_address,
        status: data.status,
      });
    }
  }, [data, form]);

  const handleSubmit = async (value: Device) => {
    if (!id) return;
    setLoading(true);
    try {
      await put.mutateAsync({
        id,
        params: value
      });
      navigate("/devices");
    } catch (error) {
      console.log("Lỗi API:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
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
            <h2 className="text-lg font-extrabold text-slate-800">Cập Nhật Thiết Bị</h2>
            <p className="text-xs text-slate-400">Chỉnh sửa thông tin thiết bị #{data?.device_code || id}</p>
          </div>
        </div>
      </div>

      {/* Clay Form Body */}
      <div className="clay-card p-8">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              label={<span className="font-bold text-slate-700">Mã Thiết bị *</span>}
              name="device_code"
              rules={[{ required: true, message: "Vui lòng nhập mã thiết bị" }]}
            >
              <Input placeholder="Nhập mã thiết bị" className="rounded-xl py-2.5" />
            </Form.Item>

            <Form.Item
              label={<span className="font-bold text-slate-700">Tên Thiết bị *</span>}
              name="device_name"
              rules={[{ required: true, message: "Vui lòng nhập tên thiết bị" }]}
            >
              <Input placeholder="Nhập tên thiết bị" className="rounded-xl py-2.5" />
            </Form.Item>

            <Form.Item
              label={<span className="font-bold text-slate-700">Địa chỉ IP *</span>}
              name="ip_address"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ IP" }]}
            >
              <Input placeholder="Nhập địa chỉ IP" className="rounded-xl py-2.5" />
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
              <span>Cập nhật thiết bị</span>
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UpdateDevicePage;