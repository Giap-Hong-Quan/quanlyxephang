import React, { useEffect, useState } from 'react';
import { useHeaderStore } from '../../store/useHeaderStore';
import { Input, Tooltip, Select, Modal, Form } from 'antd';
import Table from '../../components/TableCustom/AntdTable';
import { useUI } from '../../context/UiProvider';
import { STATUSQUEUE } from '../../constand/Enum';
import { Ticket, PlusCircle, BellRing, CheckCircle, XCircle, Edit3, Search, User, Monitor, Layers } from 'lucide-react';
import {
  useGetAllQueueNumbers,
  useUpdateQueueNumberStatus,
  useCreateQueueNumber,
  useUpdateQueueNumberQuery,
} from '../../hooks/useQueueNumberQuery';
import { useGetAllDeviceQuery } from '../../hooks/deviceQuery';
import { useGetAllServiceQuery } from '../../hooks/serviceQuery';
import dayjs from 'dayjs';
import type { ColumnType } from 'antd/es/table';
import type { queueNumber } from '../../types/queueNumber';
import { useProfile } from '../../hooks/authQuery';

const QueuePage = () => {
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [searchKey, setSearchKey] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingQueue, setEditingQueue] = useState<queueNumber | null>(null);

  const [form] = Form.useForm();
  const { setLoading } = useUI();
  const { data: profile } = useProfile();
  
  const { data, isLoading } = useGetAllQueueNumbers({
    status: statusFilter,
    keyWord: searchKey || undefined,
  });

  const { data: dataDevice } = useGetAllDeviceQuery();
  const { data: dataService } = useGetAllServiceQuery();

  const createMutation = useCreateQueueNumber();
  const updateMutation = useUpdateQueueNumberQuery();
  const { mutate: updateStatus } = useUpdateQueueNumberStatus();

  useEffect(() => {
    useHeaderStore.setState({ title: 'Cấp số', subTitle: 'Danh sách cấp số' });
  }, []);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const roleName = profile?.data?.role?.name || '';
  const isAdmin = roleName === 'admin';
  const isStaff = roleName === 'staff';
  const isDoctor = roleName === 'doctor';

  const handleOpenAddModal = () => {
    setEditingQueue(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (record: queueNumber) => {
    setEditingQueue(record);
    form.setFieldsValue({
      customer_name: record.customer_name,
      deviceId: record.device?._id,
      serviceId: record.service?._id,
      status: record.status,
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (values: any) => {
    setLoading(true);
    try {
      if (editingQueue) {
        await updateMutation.mutateAsync({
          id: editingQueue._id,
          body: values,
        });
      } else {
        await createMutation.mutateAsync(values);
      }
      setIsModalOpen(false);
      setEditingQueue(null);
      form.resetFields();
    } catch (error) {
      console.error('Error saving queue number:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnType<queueNumber>[] = [
    {
      title: 'Mã số',
      dataIndex: 'queueNumber',
      render: (val: string) => <span className="font-extrabold text-orange-600 text-sm">{val}</span>,
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customer_name',
      render: (val: string) => <span className="font-semibold text-slate-700">{val}</span>,
    },
    {
      title: 'Dịch vụ',
      dataIndex: 'service',
      render: (service: any) => <span className="text-slate-600 font-medium">{service?.service_name || '-'}</span>,
    },
    {
      title: 'Thiết bị cấp',
      dataIndex: 'device',
      render: (device: any) => <span className="text-slate-500">{device?.device_name || '-'}</span>,
    },
    {
      title: 'Thời gian cấp',
      dataIndex: 'issue_time',
      render: (val: string) => <span className="text-slate-500">{dayjs(val).format('HH:mm DD/MM/YYYY')}</span>,
    },
    {
      title: 'Hạn sử dụng',
      dataIndex: 'expiry_time',
      render: (val: string) => <span className="text-slate-400">{dayjs(val).format('HH:mm DD/MM/YYYY')}</span>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status: string) => {
        const badgeClass =
          status === 'waiting'
            ? 'clay-badge-waiting'
            : status === 'processing'
            ? 'clay-badge-processing'
            : status === 'completed'
            ? 'clay-badge-completed'
            : 'clay-badge-skipped';
        const label = STATUSQUEUE[status as keyof typeof STATUSQUEUE] || status;
        return <span className={`clay-badge ${badgeClass}`}>{label}</span>;
      },
    },
    {
      title: 'Thao tác',
      render: (record: queueNumber) => {
        return (
          <div className="flex gap-2 items-center">
            {(isAdmin || isStaff) && record.status === 'waiting' && (
              <Tooltip title="Gọi số vào khám">
                <button
                  onClick={() => updateStatus({ id: record._id, status: 'processing' })}
                  className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-500 hover:text-white transition-all shadow-sm flex items-center gap-1 text-xs font-bold cursor-pointer"
                >
                  <BellRing size={14} />
                  <span>Gọi số</span>
                </button>
              </Tooltip>
            )}

            {(isAdmin || isDoctor) && record.status === 'processing' && (
              <Tooltip title="Hoàn thành dịch vụ">
                <button
                  onClick={() => updateStatus({ id: record._id, status: 'completed' })}
                  className="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all shadow-sm flex items-center gap-1 text-xs font-bold cursor-pointer"
                >
                  <CheckCircle size={14} />
                  <span>Hoàn thành</span>
                </button>
              </Tooltip>
            )}

            {(isAdmin || isStaff) && (record.status === 'waiting' || record.status === 'processing') && (
              <Tooltip title="Bỏ qua lượt">
                <button
                  onClick={() => updateStatus({ id: record._id, status: 'skipped' })}
                  className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-all shadow-sm flex items-center gap-1 text-xs font-bold cursor-pointer"
                >
                  <XCircle size={14} />
                  <span>Bỏ qua</span>
                </button>
              </Tooltip>
            )}

            {isAdmin && (
              <Tooltip title="Chỉnh sửa">
                <button
                  onClick={() => handleOpenEditModal(record)}
                  className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-700 hover:text-white transition-all shadow-sm cursor-pointer"
                >
                  <Edit3 size={14} />
                </button>
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full space-y-6 pb-8 select-none">
      {/* Header & Filter Bar */}
      <div className="clay-card p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-orange-100 text-orange-600">
            <Ticket size={22} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">Quản lý Cấp số</h2>
            <p className="text-xs text-slate-400">Danh sách số thứ tự hàng chờ thực tế</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="w-48">
            <Select
              allowClear
              placeholder="Tất cả trạng thái"
              style={{ width: '100%' }}
              value={statusFilter}
              onChange={(val) => setStatusFilter(val)}
              options={[
                { value: 'waiting', label: 'Đang chờ' },
                { value: 'processing', label: 'Đang khám' },
                { value: 'completed', label: 'Đã xong' },
                { value: 'skipped', label: 'Bỏ qua' },
              ]}
            />
          </div>

          <div className="w-64">
            <Input
              placeholder="Tìm theo số / tên khách hàng..."
              prefix={<Search size={16} className="text-slate-400 mr-1" />}
              onChange={(e) => setSearchKey(e.target.value)}
              className="rounded-xl"
            />
          </div>

          {(isAdmin || isStaff) && (
            <button
              onClick={handleOpenAddModal}
              className="clay-btn clay-btn-orange text-xs font-bold py-2.5 px-4 cursor-pointer"
            >
              <PlusCircle size={16} />
              <span>Cấp số mới</span>
            </button>
          )}
        </div>
      </div>

      {/* Data Table */}
      <div className="clay-card p-4 overflow-hidden">
        <Table data={data?.queueNumbers || []} columns={columns} />
      </div>

      {/* Modal Cấp số mới / Chỉnh sửa */}
      <Modal
        title={
          <div className="flex items-center gap-2 text-orange-600 font-bold text-lg">
            <Ticket size={20} />
            <span>{editingQueue ? `Chỉnh sửa vé #${editingQueue.queueNumber}` : 'Cấp số mới'}</span>
          </div>
        }
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingQueue(null);
          form.resetFields();
        }}
        footer={null}
        destroyOnClose
        centered
        className="rounded-2xl overflow-hidden"
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit} className="space-y-4 pt-3">
          {/* Customer Name */}
          <Form.Item
            label={
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <User size={15} className="text-orange-500" /> Tên người cấp số *
              </span>
            }
            name="customer_name"
            rules={[{ required: true, message: 'Vui lòng nhập tên người cấp số!' }]}
          >
            <Input placeholder="Ví dụ: Nguyễn Văn A" className="rounded-xl" />
          </Form.Item>

          {/* Device Selection */}
          <Form.Item
            label={
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Monitor size={15} className="text-orange-500" /> Thiết bị sử dụng *
              </span>
            }
            name="deviceId"
            rules={[{ required: true, message: 'Vui lòng chọn thiết bị!' }]}
          >
            <Select
              placeholder="Chọn thiết bị kiosk phát số"
              className="w-full rounded-xl"
              options={
                dataDevice?.devices.map((device: any) => ({
                  value: device._id,
                  label: device.device_name,
                })) || []
              }
            />
          </Form.Item>

          {/* Service Selection */}
          <Form.Item
            label={
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Layers size={15} className="text-orange-500" /> Dịch vụ cần thực hiện *
              </span>
            }
            name="serviceId"
            rules={[{ required: true, message: 'Vui lòng chọn dịch vụ!' }]}
          >
            <Select
              placeholder="Chọn dịch vụ khám / tư vấn"
              className="w-full rounded-xl"
              options={
                dataService?.services.map((service: any) => ({
                  value: service._id,
                  label: service.service_name,
                })) || []
              }
            />
          </Form.Item>

          {/* Status Selection (When Editing) */}
          {editingQueue && (
            <Form.Item label={<span className="font-semibold text-slate-700">Trạng thái</span>} name="status">
              <Select
                className="w-full rounded-xl"
                options={[
                  { value: 'waiting', label: 'Đang chờ' },
                  { value: 'processing', label: 'Đang khám' },
                  { value: 'completed', label: 'Đã xong' },
                  { value: 'skipped', label: 'Bỏ qua' },
                ]}
              />
            </Form.Item>
          )}

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setEditingQueue(null);
                form.resetFields();
              }}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-sm transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#FF7506] hover:bg-[#E06500] text-white font-bold text-sm transition-colors cursor-pointer shadow-md shadow-orange-500/20"
            >
              {editingQueue ? 'Cập nhật' : 'In số thứ tự'}
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default QueuePage;