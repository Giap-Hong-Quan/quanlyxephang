import React, { useEffect, useState } from 'react';
import { useHeaderStore } from '../../../store/useHeaderStore';
import { useGetAllUserQuery } from '../../../hooks/userQuery';
import Table from '../../../components/TableCustom/AntdTable';
import type { ColumnType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useUI } from '../../../context/UiProvider';
import { Input } from 'antd';
import { History, Search } from 'lucide-react';

const LogPage = () => {
  const { setLoading } = useUI();
  const { data, isLoading } = useGetAllUserQuery();
  const [searchKey, setSearchKey] = useState<string>('');

  useEffect(() => {
    useHeaderStore.setState({ title: "Nhật ký người dùng", subTitle: "Danh sách hoạt động cuối" });
  }, []);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const filteredLogs = data?.users?.filter((u) => {
    if (!searchKey) return true;
    return u.full_name.toLowerCase().includes(searchKey.toLowerCase()) || u.email.toLowerCase().includes(searchKey.toLowerCase());
  }) || [];

  const columns: ColumnType<any>[] = [
    {
      title: 'Tên người dùng',
      dataIndex: 'full_name',
      render: (text) => <span className="font-bold text-slate-800">{text}</span>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (val) => <span className="text-slate-600 font-medium">{val}</span>
    },
    {
      title: 'Chức vụ',
      dataIndex: 'role',
      render: (role: any) => {
        const roleLabel = role?.name === 'admin' ? 'Quản trị viên' : role?.name === 'doctor' ? 'Bác sĩ' : role?.name === 'staff' ? 'Nhân viên' : role?.name;
        return (
          <span className="bg-orange-50 text-orange-600 border border-orange-200 px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase">
            {roleLabel}
          </span>
        );
      }
    },
    {
      title: 'Thời gian hoạt động cuối',
      dataIndex: 'lastLogin',
      render: (val: string) => (
        <span className="text-slate-500 font-mono">
          {val ? dayjs(val).format('DD/MM/YYYY HH:mm:ss') : 'Vừa đăng nhập'}
        </span>
      )
    }
  ];

  return (
    <div className="w-full space-y-6 pb-8">
      {/* Header Clay Bar */}
      <div className="clay-card p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-orange-100 text-orange-600">
            <History size={22} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">Nhật ký Hoạt động</h2>
            <p className="text-xs text-slate-400">Lịch sử đăng nhập và thao tác gần nhất của người dùng</p>
          </div>
        </div>

        <div className="w-72">
          <Input
            placeholder="Tìm kiếm người dùng..."
            prefix={<Search size={16} className="text-slate-400 mr-1" />}
            onChange={(e) => setSearchKey(e.target.value)}
            className="rounded-xl"
          />
        </div>
      </div>

      {/* Clay Table Container */}
      <div className="clay-card p-4 overflow-hidden">
        <Table data={filteredLogs} columns={columns} />
      </div>
    </div>
  );
};

export default LogPage;