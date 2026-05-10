import React, { useEffect } from 'react';
import { useHeaderStore } from '../../../store/useHeaderStore';
import { useGetAllUserQuery } from '../../../hooks/userQuery';
import Table from '../../../components/TableCustom/AntdTable';
import type { ColumnType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useUI } from '../../../context/UiProvider';
import { Input } from 'antd';

const LogPage = () => {
  const { setLoading } = useUI();
  const { data, isLoading } = useGetAllUserQuery();

  useEffect(() => {
    useHeaderStore.setState({ title: "Nhật ký người dùng", subTitle: "Danh sách hoạt động" })
  }, []);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const columns: ColumnType<any>[] = [
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      render: (text) => <span className="font-medium text-gray-800">{text || 'N/A'}</span>
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'full_name'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Chức vụ',
      dataIndex: 'role',
      render: (role: any) => (
        <span>
          {role?.name === 'admin' ? 'Quản trị viên' : role?.name === 'doctor' ? 'Bác sĩ' : role?.name === 'staff' ? 'Nhân viên' : role?.name}
        </span>
      )
    },
    {
      title: 'Thời gian hoạt động cuối',
      dataIndex: 'lastLogin',
      render: (val: string) => (
        <span className="text-gray-600">
          {val ? dayjs(val).format('DD/MM/YYYY HH:mm:ss') : 'Chưa hoạt động'}
        </span>
      )
    }
  ];

  return (
    <div className='w-full p-4'>
      <div className="mb-4 w-1/3">
        {/* Placeholder for search if needed */}
      </div>
      <div className="w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
        <Table data={data?.users || []} columns={columns} />
      </div>
    </div>
  );
}

export default LogPage;