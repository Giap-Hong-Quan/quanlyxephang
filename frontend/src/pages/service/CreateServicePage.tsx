import { useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import { useUI } from '../../context/UiProvider';
import { useHeaderStore } from '../../store/useHeaderStore';
import { usePostServiceQuery } from '../../hooks/serviceQuery';
import type { Service } from '../../types/seviceTypes';
import { Layers, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateServicePage = () => {
  const navigate = useNavigate();
  const { setLoading } = useUI();
  const [form] = Form.useForm();
  const post = usePostServiceQuery();

  useEffect(() => {
    useHeaderStore.setState({ title: "Dịch vụ", subTitle: "Thêm dịch vụ mới" });
  }, []);

  const handleSubmit = async (value: Service) => {
    setLoading(true);
    try {
      await post.mutateAsync(value);
      form.resetFields();
      navigate("/services");
    } catch (error) {
      console.log("Lỗi API:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    navigate("/services");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-8">
      {/* Clay Form Header Card */}
      <div className="clay-card p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-orange-100 text-orange-600">
            <Layers size={22} />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-800">Thêm Dịch Vụ Mới</h2>
            <p className="text-xs text-slate-400">Tạo dịch vụ cấp số mới trong hệ thống xếp hàng</p>
          </div>
        </div>
      </div>

      {/* Clay Form Body */}
      <div className="clay-card p-8">
        <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={{ status: 'active' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              label={<span className="font-bold text-slate-700">Mã Dịch vụ *</span>}
              name="service_code"
              rules={[{ required: true, message: "Vui lòng nhập mã dịch vụ" }]}
            >
              <Input placeholder="Ví dụ: KHAM_TONG_QUAT" className="rounded-xl py-2.5" />
            </Form.Item>

            <Form.Item
              label={<span className="font-bold text-slate-700">Tên Dịch vụ *</span>}
              name="service_name"
              rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ" }]}
            >
              <Input placeholder="Ví dụ: Khám bệnh tổng quát" className="rounded-xl py-2.5" />
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

            <Form.Item
              label={<span className="font-bold text-slate-700">Mô tả dịch vụ</span>}
              name="description"
            >
              <Input.TextArea
                placeholder="Nhập mô tả về quy trình hoặc thông tin dịch vụ..."
                rows={3}
                className="rounded-xl"
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
              <span>Thêm dịch vụ</span>
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateServicePage;