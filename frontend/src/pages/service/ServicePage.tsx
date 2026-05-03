import React, { useEffect, useState } from 'react'
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useHeaderStore } from '../../store/useHeaderStore';
import { useDeleteServiceQuery, useGetAllServiceQuery } from '../../hooks/serviceQuery';
import { CirclePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';

import { Input, Select, Tooltip } from 'antd';
import useDebounce from '../../hooks/custom/useDebounce';
import Table from '../../components/TableCustom/AntdTable';
import { useUI } from '../../context/UiProvider';
import type { Service } from '../../types/seviceTypes';

const STATUS = [
  { value: 'active', label: 'Hoạt động' },
  { value: 'inactive', label: 'Ngưng hoạt động' },
]

const ServicePage = () => {
  const navigate = useNavigate();

  const [limit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchInput, setSearchInput] = useState('');

  const { setLoading } = useUI();

  const [filter, setFilter] = useState<{
    status: string | undefined,
    search: string
  }>({
    status: undefined,
    search: ''
  });

  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    setPage(1);
    setFilter((prev) => ({ ...prev, search: debouncedSearch }))
  }, [debouncedSearch]);

  const columns: ColumnsType<Service> = [
    {
      title: 'Mã dịch vụ',
      dataIndex: 'service_code',
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'service_name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status: string) => (
        <span className={`flex items-center gap-2 ${
          status === 'active' ? "text-green-600" : "text-red-600"
        }`}>
          <span className={`w-2 h-2 rounded-full ${
            status === 'active' ? "bg-green-500" : "bg-red-500"
          }`} />
          {status === 'active' ? "Hoạt động" : "Ngưng hoạt động"}
        </span>
      )
    },
    {
      title: 'Thao tác',
      render: (record) => (
        <div className="flex gap-3 text-xl">
          <Tooltip title="Cập nhật">
            <EditOutlined
              onClick={() => navigate(`/services/update/${record._id}`)}
              className="text-green-600 cursor-pointer"
            />
          </Tooltip>

          <Tooltip title="Xóa">
            <DeleteOutlined
              onClick={() => handleDelete(record._id)}
              className="text-red-600 cursor-pointer"
            />
          </Tooltip>
        </div>
      )
    }
  ];

  useEffect(() => {
    useHeaderStore.setState({
      title: "Dịch vụ",
      subTitle: "Danh sách dịch vụ"
    })
  }, []);

  const params = {
    pageSize: limit,
    page,
    ...(filter.search && { search: filter.search }),
    ...(filter.status && { status: filter.status }),
  }

  const { data, isLoading, error } = useGetAllServiceQuery(params);
  const deleteMutation = useDeleteServiceQuery();

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id)
  }

  const dataService: Service[] = data?.services || [];

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  if (error) return <p>Error</p>;

  return (
    <div className='w-full'>
      <h2 className='text-2xl text-[#FF7506] font-bold'>
        Danh sách dịch vụ
      </h2>

      <div className='flex gap-5'>
        <div className='pt-3 flex-[93%]'>

          <div className='flex items-center justify-between gap-3'>
            <Select
              allowClear
              placeholder="Trạng thái"
              style={{ width: '100%' }}
              value={filter.status}
              options={STATUS}
              onChange={(value) => {
                setPage(1);
                setFilter(prev => ({ ...prev, status: value }))
              }}
            />

            <Input
              placeholder='Nhập tên, mã dịch vụ...'
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          <div className="w-full overflow-hidden rounded-t-xl border border-gray-200 mt-4">
            <Table
              data={dataService}
              columns={columns}
              pagination={{
                current: data?.currentPage,
                total: data?.totalServices,
                pageSize: data?.limit,
                showSizeChanger: false,
              }}
              onChange={(pagination) =>
                setPage(pagination.current ?? 1)
              }
            />
          </div>

        </div>

        <div className='flex-[7%] flex items-center'>
          <button
            onClick={() => navigate("/services/create")}
            className='text-[#FF7506] font-medium bg-[#FFF2E7] rounded-l-2xl p-3 flex flex-col items-center'
          >
            <CirclePlus />
            Thêm dịch vụ
          </button>
        </div>

      </div>
    </div>
  )
}

export default ServicePage