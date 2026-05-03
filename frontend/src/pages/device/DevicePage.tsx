import React, { useEffect, useState } from 'react'
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useHeaderStore } from '../../store/useHeaderStore';
import { useDeleteDeviceQuery, useGetAllDeviceQuery } from '../../hooks/deviceQuery';
import { CirclePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import type { Device } from '../../types/deviceTypes';
import { Input, Select, Tooltip } from 'antd';
import useDebounce from '../../hooks/custom/useDebounce';
import Table from '../../components/TableCustom/AntdTable';
import { useUI } from '../../context/UiProvider';

const STATUS = [
  { value: 'active', label: 'Hoạt động' },
  { value: 'inactive', label: 'Ngưng hoạt động' },
]
const DevicePage = () => {

  const navigate = useNavigate();
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1)
  const [searchInput, setSearchInput] = useState('')
  const { setLoading } = useUI();
  const [filter, setFilter] = useState<{ status: string | undefined, search: string }>(
    {
      status: undefined,
      search: ''
    }
  )
  const debouncedSearch = useDebounce(searchInput, 500);
  useEffect(() => {
    setPage(1);
    setFilter((prev) => ({ ...prev, search: debouncedSearch }))
  }, [debouncedSearch])
  const columns: ColumnsType<Device> = [
    {
      title: 'Mã thiết bị',
      dataIndex: 'device_code'
    },
    {
      title: 'Tên thiết bị',
      dataIndex: 'device_name'
    },
    {
      title: 'Địa chỉ IP',
      dataIndex: 'ip_address'
    },
    {
      title: 'Trạng thái hoạt động',
      dataIndex: 'status',
      render: (status: string) => {
        return (
          <span
            className={`flex items-center gap-2 ${status === 'active' ? "text-green-600" : "text-red-600"
              }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${status === 'active' ? "bg-green-500" : "bg-red-500"
                }`}
            ></span>
            {status === 'active' ? "Hoạt động" : "Không hoạt động"}
          </span>
        )
      }
    },
    {
      title: 'Thao tác',
      render: (record) => (
        <div className="flex gap-4">
          <div className="flex items-center gap-3 text-xl">
            <Tooltip title="Cập nhật">
              <EditOutlined onClick={() => navigate(`/devices/update/${record._id}`)} className="text-green-600 cursor-pointer" />
            </Tooltip>

            <Tooltip title="Xóa">
              <DeleteOutlined  onClick={()=>handleDele(record._id)}  className="text-red-600 cursor-pointer" />
            </Tooltip>
          </div>
        </div>
      ),
    }
  ]
  useEffect(() => {
    useHeaderStore.setState({ title: "Thiết bị", subTitle: "Danh sách thiết bị" })
  }, []);
  const params = {
    pageSize: limit,
    page: page,
    ...(filter.search && { search: filter.search }),
    ...(filter.status && { status: filter.status }),
  }
  const { data, isLoading, error } = useGetAllDeviceQuery(params);
  const deleteMutation = useDeleteDeviceQuery();
  const handleDele=(id:string)=>{
    deleteMutation.mutate(id)
  }
  const dataDevice: Device[] = data?.devices || []
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);
  if (error) return <p>Error</p>;

  return (
    <div className='w-full'>
      <h2 className='text-2xl text-[#FF7506] font-bold'>Danh sách thiết bị</h2>
      <div className='flex gap-5'>
        <div className='pt-3 flex-[93%]'>
          <div className='flex items-center justify-between '>
            <Select
              allowClear
              placeholder="Trạng thái hoạt động"
              style={{ width: '100%' }}
              value={filter.status}
              options={STATUS}
              // dropdownMatchSelectWidth={false}
              optionLabelProp="value"
              onChange={(value) => {
                setPage(1);
                setFilter((prev) => ({
                  ...prev,
                  status: value
                }))
              }}
            />
            <Input
              placeholder='Nhập tên, mã thiết bị...'
              onChange={(e) =>
                setSearchInput(e.target.value)
              }
            />
          </div>
          <div className="w-full overflow-hidden rounded-t-xl border border-gray-200 mt-4">
            <Table data={dataDevice} columns={columns}
              pagination={{
                current: data?.currentPage,
                total: data?.totalDevices,
                pageSize: data?.limit,
                showSizeChanger: false,
              }}
              onChange={(paginationConfig) => setPage(paginationConfig.current ?? 1)}
            />
          </div>
        </div>
        <div className='flex-[7%] flex items-center'>
          <button onClick={() => navigate("/devices/create")} className=' text-[#FF7506] font-medium bg-[#FFF2E7] justify-center items-center rounded-l-2xl  p-3 h-fit flex flex-col'>
            <CirclePlus className='' />
            Thêm tài khoản
          </button>

        </div>
      </div>

    </div>
  )
}

export default DevicePage 