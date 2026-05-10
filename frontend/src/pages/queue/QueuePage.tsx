import React, { useEffect } from 'react'
import { useHeaderStore } from '../../store/useHeaderStore';
import Select from 'antd/es/select';
import Table from '../../components/TableCustom/AntdTable';
import { Form, Input, Tooltip } from 'antd';
import { useUI } from '../../context/UiProvider';
import { data, useNavigate } from 'react-router-dom';
import { STATUSQUEUE } from '../../constand/Enum';
import { CirclePlus } from 'lucide-react';
import { useGetAllQueueNumbers, useUpdateQueueNumberStatus } from '../../hooks/useQueueNumberQuery';
import dayjs from 'dayjs';
import type { ColumnType } from 'antd/es/table';
import type { queueNumber } from '../../types/queueNumber';
import { EditOutlined, NotificationOutlined, CheckOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useProfile } from '../../hooks/authQuery';

const QueuePage = () => {
  const { data, isLoading } = useGetAllQueueNumbers()
  const { data: profile } = useProfile();
  const { mutate: updateStatus } = useUpdateQueueNumberStatus();
  const navigate = useNavigate();
  const { setLoading } = useUI();

  useEffect(() => {
    useHeaderStore.setState({ title: "Cấp số", subTitle: "Danh sách cấp số" })
  }, []);

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  const roleName = profile?.data?.role?.name || '';
  console.log(roleName)
  const isAdmin = roleName === 'admin';
  const isStaff = roleName === 'staff';
  const isDoctor = roleName === 'doctor';

  const columns: ColumnType<queueNumber>[] = [
    {
      title: 'Mã số',
      dataIndex: 'queueNumber'
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'customer_name'
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'service',
      render: (service: any) => {
        return (
          <span>
            {service?.service_name}
          </span>
        )
      }
    },
    {
      title: 'Tên thiết bị',
      dataIndex: 'device',
      render: (device: any) => {
        return (
          <span>
            {device?.device_name}
          </span>
        )
      }
    },
    {
      title: 'Thời gian cấp',
      dataIndex: 'issue_time',
      render: (issue_time: string) => {
        return (
          <span>
            {dayjs(issue_time).format('DD/MM/YYYY HH:mm:ss')}
          </span>
        )
      }
    },
    {
      title: 'Hạn sử dụng',
      dataIndex: 'expiry_time',
      render: (expiry_time: string) => {
        return (
          <span>
            {dayjs(expiry_time).format('DD/MM/YYYY HH:mm:ss')}
          </span>
        )
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status: string) => {
        return (
          <span className={`flex items-center gap-2 ${status === 'waiting' ? "text-yellow-600" : status === 'processing' ? "text-blue-600" : status === 'completed' ? "text-green-600" : "text-red-600"
            }`}
          >
            {STATUSQUEUE[status as keyof typeof STATUSQUEUE]}
          </span>
        )
      }
    },
    {
      title: 'Thao tác',
      render: (record: queueNumber) => {
        return (
          <div className="flex gap-2 items-center">
            {(isAdmin || isStaff) && record.status === 'waiting' && (
              <Tooltip title="Gọi số">
                <NotificationOutlined
                  onClick={() => updateStatus({ id: record._id, status: 'processing' })}
                  className="text-blue-600 text-xl cursor-pointer"
                />
              </Tooltip>
            )}
            {isDoctor && record.status === 'waiting' && (
              <span className="text-gray-400 italic text-sm">Chờ gọi số</span>
            )}
            {(isAdmin || isDoctor) && record.status === 'processing' && (
              <Tooltip title="Hoàn thành khám">
                <CheckOutlined
                  onClick={() => updateStatus({ id: record._id, status: 'completed' })}
                  className="text-green-600 text-xl cursor-pointer"
                />
              </Tooltip>
            )}
            {(isAdmin || isStaff) && (record.status === 'waiting' || record.status === 'processing') && (
              <Tooltip title="Bỏ qua">
                <CloseCircleOutlined
                  onClick={() => updateStatus({ id: record._id, status: 'skipped' })}
                  className="text-red-600 text-xl cursor-pointer"
                />
              </Tooltip>
            )}
            {isAdmin && (
              <Tooltip title="Cập nhật">
                <EditOutlined
                  onClick={() => navigate(`/queues/update/${record._id}`)}
                  className="text-orange-600 text-xl cursor-pointer"
                />
              </Tooltip>
            )}
          </div>
        )
      }
    }

  ]

  return (
    <div className='w-full'>
      <h2 className='text-2xl text-[#FF7506] font-bold'>Danh sách cấp số</h2>
      <div className='flex pt-3'>
        <Form layout='vertical' className='flex items-center '>
          <Form.Item className='mb-0'>
            <Select
              placeholder='Trạng thái hoạt động'
              style={{ width: 200 }}
              options={[]}
            />
          </Form.Item>
        </Form>
      </div>
      <div className='flex gap-5'>
        <div className=' flex-[93%]'>
          {/* <div className='flex items-center justify-between '>
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
          </div> */}
          <div className="w-full overflow-hidden rounded-t-xl border border-gray-200 ">
            <Table data={data?.queueNumbers} columns={columns}
            // pagination={{
            //   current: data?.currentPage,
            //   total: data?.totalDevices,
            //   pageSize: data?.limit,
            //   showSizeChanger: false,
            // }}
            // onChange={(paginationConfig) => setPage(paginationConfig.current ?? 1)}
            />
          </div>
        </div>
        <div className='flex-[7%] flex items-center'>
          {(profile?.data?.role?.name === 'admin' || profile?.data?.role?.name === 'staff') && (
            <button onClick={() => navigate("/queues/create")} className=' text-[#FF7506] font-medium bg-[#FFF2E7] justify-center items-center rounded-l-2xl  p-3 h-fit flex flex-col'>
              <CirclePlus className='' />
              Cấp số mới
            </button>
          )}
        </div>
      </div>

    </div>
  )
}

export default QueuePage