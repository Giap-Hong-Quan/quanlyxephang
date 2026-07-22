import React, { useEffect, useState } from 'react';
import { useHeaderStore } from '../../store/useHeaderStore';
import Select from 'antd/es/select';
import Table from '../../components/TableCustom/AntdTable';
import { Input, Tooltip } from 'antd';
import { useUI } from '../../context/UiProvider';
import { useNavigate } from 'react-router-dom';
import { STATUSQUEUE } from '../../constand/Enum';
import { Ticket, PlusCircle, BellRing, CheckCircle, XCircle, Edit3, Search } from 'lucide-react';
import { useGetAllQueueNumbers, useUpdateQueueNumberStatus } from '../../hooks/useQueueNumberQuery';
import dayjs from 'dayjs';
import type { ColumnType } from 'antd/es/table';
import type { queueNumber } from '../../types/queueNumber';
import { useProfile } from '../../hooks/authQuery';

const QueuePage = () => {
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [searchKey, setSearchKey] = useState<string>('');
  
  const { data, isLoading } = useGetAllQueueNumbers({
    status: statusFilter,
    keyWord: searchKey || undefined
  });
  
  const { data: profile } = useProfile();
  const { mutate: updateStatus } = useUpdateQueueNumberStatus();
  const navigate = useNavigate();
  const { setLoading } = useUI();

  useEffect(() => {
    useHeaderStore.setState({ title: "Cấp số", subTitle: "Danh sách cấp số" });
  }, []);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const roleName = profile?.data?.role?.name || '';
  const isAdmin = roleName === 'admin';
  const isStaff = roleName === 'staff';
  const isDoctor = roleName === 'doctor';

  const columns: ColumnType<queueNumber>[] = [
    {
      title: 'Mã số',
      dataIndex: 'queueNumber',
      render: (val: string) => <span className="font-extrabold text-orange-600 text-sm">{val}</span>
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customer_name',
      render: (val: string) => <span className="font-semibold text-slate-700">{val}</span>
    },
    {
      title: 'Dịch vụ',
      dataIndex: 'service',
      render: (service: any) => <span className="text-slate-600 font-medium">{service?.service_name || '-'}</span>
    },
    {
      title: 'Thiết bị cấp',
      dataIndex: 'device',
      render: (device: any) => <span className="text-slate-500">{device?.device_name || '-'}</span>
    },
    {
      title: 'Thời gian cấp',
      dataIndex: 'issue_time',
      render: (val: string) => <span className="text-slate-500">{dayjs(val).format('HH:mm DD/MM/YYYY')}</span>
    },
    {
      title: 'Hạn sử dụng',
      dataIndex: 'expiry_time',
      render: (val: string) => <span className="text-slate-400">{dayjs(val).format('HH:mm DD/MM/YYYY')}</span>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status: string) => {
        const badgeClass = 
          status === 'waiting' ? 'clay-badge-waiting' :
          status === 'processing' ? 'clay-badge-processing' :
          status === 'completed' ? 'clay-badge-completed' : 'clay-badge-skipped';
        const label = STATUSQUEUE[status as keyof typeof STATUSQUEUE] || status;
        return <span className={`clay-badge ${badgeClass}`}>{label}</span>;
      }
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
                  className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-500 hover:text-white transition-all shadow-sm flex items-center gap-1 text-xs font-bold"
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
                  className="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all shadow-sm flex items-center gap-1 text-xs font-bold"
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
                  className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-all shadow-sm flex items-center gap-1 text-xs font-bold"
                >
                  <XCircle size={14} />
                  <span>Bỏ qua</span>
                </button>
              </Tooltip>
            )}

            {isAdmin && (
              <Tooltip title="Chỉnh sửa">
                <button
                  onClick={() => navigate(`/queues/update/${record._id}`)}
                  className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-700 hover:text-white transition-all shadow-sm"
                >
                  <Edit3 size={14} />
                </button>
              </Tooltip>
            )}
          </div>
        );
      }
    }
  ];

  return (
    <div className="w-full space-y-6 pb-8 select-none">
      {/* Header & Filter Clay Bar */}
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
              onClick={() => navigate("/queues/create")}
              className="clay-btn clay-btn-orange text-xs font-bold py-2.5 px-4"
            >
              <PlusCircle size={16} />
              <span>Cấp số mới</span>
            </button>
          )}
        </div>
      </div>

      {/* Clay Data Table Container */}
      <div className="clay-card p-4 overflow-hidden">
        <Table data={data?.queueNumbers || []} columns={columns} />
      </div>
    </div>
  );
};

export default QueuePage;