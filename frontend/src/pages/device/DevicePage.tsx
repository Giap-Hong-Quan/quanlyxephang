import React, { useEffect, useState } from 'react';
import { useHeaderStore } from '../../store/useHeaderStore';
import { useDeleteDeviceQuery, useGetAllDeviceQuery, usePostDeviceQuery, usePutDeviceQuery } from '../../hooks/deviceQuery';
import { PlusCircle, Edit3, Trash2, Monitor, Search } from 'lucide-react';
import type { ColumnsType } from 'antd/es/table';
import type { Device } from '../../types/deviceTypes';
import { Input, Select, Tooltip, Popconfirm, Modal, Form } from 'antd';
import useDebounce from '../../hooks/custom/useDebounce';
import Table from '../../components/TableCustom/AntdTable';
import { useUI } from '../../context/UiProvider';

const STATUS = [
  { value: 'active', label: 'Hoạt động' },
  { value: 'inactive', label: 'Ngưng hoạt động' },
];

const DevicePage = () => {
  const [limit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchInput, setSearchInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);

  const [form] = Form.useForm();
  const { setLoading } = useUI();
  const [filter, setFilter] = useState<{ status: string | undefined; search: string }>({
    status: undefined,
    search: ''
  });

  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    setPage(1);
    setFilter((prev) => ({ ...prev, search: debouncedSearch }));
  }, [debouncedSearch]);

  useEffect(() => {
    useHeaderStore.setState({ title: "Thiết bị", subTitle: "Danh sách thiết bị" });
  }, []);

  const params = {
    pageSize: limit,
    page: page,
    ...(filter.search && { search: filter.search }),
    ...(filter.status && { status: filter.status }),
  };

  const { data, isLoading } = useGetAllDeviceQuery(params);
  const createMutation = usePostDeviceQuery();
  const updateMutation = usePutDeviceQuery();
  const deleteMutation = useDeleteDeviceQuery();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const handleOpenAddModal = () => {
    setEditingDevice(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (device: Device) => {
    setEditingDevice(device);
    form.setFieldsValue({
      device_code: device.device_code,
      device_name: device.device_name,
      ip_address: device.ip_address,
      status: device.status || 'active'
    });
    setIsModalOpen(true);
  };

  const handleModalSubmit = (values: any) => {
    if (editingDevice) {
      updateMutation.mutate(
        { id: editingDevice._id, params: values },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            form.resetFields();
          }
        }
      );
    } else {
      createMutation.mutate(values, {
        onSuccess: () => {
          setIsModalOpen(false);
          form.resetFields();
        }
      });
    }
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const columns: ColumnsType<Device> = [
    {
      title: 'Mã thiết bị',
      dataIndex: 'device_code',
      render: (val: string) => <span className="font-bold text-orange-600">{val}</span>
    },
    {
      title: 'Tên thiết bị',
      dataIndex: 'device_name',
      render: (val: string) => <span className="font-semibold text-slate-700">{val}</span>
    },
    {
      title: 'Địa chỉ IP',
      dataIndex: 'ip_address',
      render: (val: string) => <span className="text-slate-500 font-mono">{val}</span>
    },
    {
      title: 'Trạng thái hoạt động',
      dataIndex: 'status',
      render: (status: string) => {
        const isActive = status === 'active';
        return (
          <span className={`clay-badge ${isActive ? 'clay-badge-completed' : 'clay-badge-skipped'}`}>
            <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
            {isActive ? "Hoạt động" : "Ngưng hoạt động"}
          </span>
        );
      }
    },
    {
      title: 'Thao tác',
      render: (record) => (
        <div className="flex items-center gap-2">
          <Tooltip title="Cập nhật">
            <button
              onClick={() => handleOpenEditModal(record)}
              className="p-2 rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white transition-all shadow-sm"
            >
              <Edit3 size={15} />
            </button>
          </Tooltip>

          <Popconfirm
            title="Xóa thiết bị"
            description="Bạn có chắc chắn muốn xóa thiết bị này không?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Xóa">
              <button className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                <Trash2 size={15} />
              </button>
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    }
  ];

  return (
    <div className="w-full space-y-6 pb-8 select-none">
      {/* Header & Filter Clay Bar */}
      <div className="clay-card p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-orange-100 text-orange-600">
            <Monitor size={22} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">Quản lý Thiết bị</h2>
            <p className="text-xs text-slate-400">Danh sách tất cả các thiết bị kiosk / cây cấp số</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="w-48">
            <Select
              allowClear
              placeholder="Trạng thái hoạt động"
              style={{ width: '100%' }}
              value={filter.status}
              options={STATUS}
              onChange={(value) => {
                setPage(1);
                setFilter((prev) => ({ ...prev, status: value }));
              }}
            />
          </div>

          <div className="w-64">
            <Input
              placeholder="Tìm kiếm thiết bị..."
              prefix={<Search size={16} className="text-slate-400 mr-1" />}
              onChange={(e) => setSearchInput(e.target.value)}
              className="rounded-xl"
            />
          </div>

          <button
            onClick={handleOpenAddModal}
            className="clay-btn clay-btn-orange text-xs font-bold py-2.5 px-4"
          >
            <PlusCircle size={16} />
            <span>Thêm thiết bị mới</span>
          </button>
        </div>
      </div>

      {/* Clay Data Table Container */}
      <div className="clay-card p-4 overflow-hidden">
        <Table
          data={data?.devices || []}
          columns={columns}
          pagination={{
            current: data?.currentPage,
            total: data?.totalDevices,
            pageSize: data?.limit,
            showSizeChanger: false,
          }}
          onChange={(paginationConfig) => setPage(paginationConfig.current ?? 1)}
        />
      </div>

      {/* Add / Edit Device Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title={null}
        centered
        className="clay-modal"
      >
        <div className="p-2 space-y-6 select-none">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-3 rounded-2xl bg-orange-100 text-orange-600">
              <Monitor size={22} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-800">
                {editingDevice ? "Cập nhật Thông tin Thiết bị" : "Thêm Thiết bị Mới"}
              </h3>
              <p className="text-xs text-slate-400">
                {editingDevice ? "Chỉnh sửa thông số cây Kiosk / thiết bị cấp số" : "Tạo thiết bị Kiosk mới vào hệ thống xếp hàng"}
              </p>
            </div>
          </div>

          <Form form={form} layout="vertical" onFinish={handleModalSubmit} initialValues={{ status: 'active' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label={<span className="font-bold text-slate-700">Mã thiết bị *</span>}
                name="device_code"
                rules={[{ required: true, message: 'Vui lòng nhập mã thiết bị' }]}
              >
                <Input placeholder="Ví dụ: KIOSK-01" />
              </Form.Item>

              <Form.Item
                label={<span className="font-bold text-slate-700">Tên thiết bị *</span>}
                name="device_name"
                rules={[{ required: true, message: 'Vui lòng nhập tên thiết bị' }]}
              >
                <Input placeholder="Ví dụ: Cây cấp số sảnh A" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label={<span className="font-bold text-slate-700">Địa chỉ IP *</span>}
                name="ip_address"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ IP' }]}
              >
                <Input placeholder="Ví dụ: 192.168.1.10" />
              </Form.Item>

              <Form.Item
                label={<span className="font-bold text-slate-700">Trạng thái hoạt động *</span>}
                name="status"
                rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
              >
                <Select
                  placeholder="Chọn trạng thái"
                  options={[
                    { value: 'active', label: 'Hoạt động' },
                    { value: 'inactive', label: 'Ngưng hoạt động' },
                  ]}
                />
              </Form.Item>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="clay-btn clay-btn-glass text-xs font-bold py-2.5 px-5"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="clay-btn clay-btn-orange text-xs font-extrabold py-2.5 px-6 shadow-md"
              >
                {editingDevice ? "Cập nhật thiết bị" : "Lưu thiết bị"}
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default DevicePage;