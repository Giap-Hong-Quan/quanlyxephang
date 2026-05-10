import React, { useEffect, useState } from 'react';
import { useHeaderStore } from '../../store/useHeaderStore';
import Table from '../../components/TableCustom/AntdTable';
import { DatePicker, Select, Button } from 'antd';
import { useGetAllQueueNumbers } from '../../hooks/useQueueNumberQuery';
import { useUI } from '../../context/UiProvider';
import dayjs from 'dayjs';
import type { ColumnType } from 'antd/es/table';
import type { queueNumber } from '../../types/queueNumber';
import { STATUSQUEUE } from '../../constand/Enum';
import * as XLSX from 'xlsx';
import { DownloadOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const ReportPage = () => {
  const { setLoading } = useUI();
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    useHeaderStore.setState({ title: "Báo cáo", subTitle: "Danh sách báo cáo" })
  }, []);

  const { data, isLoading } = useGetAllQueueNumbers({
    fromDate: dateRange ? dateRange[0] : undefined,
    toDate: dateRange ? dateRange[1] : undefined,
    pageSize: 1000 // Get all for report or just rely on backend ignoring page size if not passed? Wait, we passed pageSize 10 in backend by default. We should probably pass a large pageSize for report export.
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const handleFilterChange = (value: string) => {
    setFilterType(value);
    const today = dayjs();
    let start, end;
    switch (value) {
      case 'today':
        start = today.startOf('day').toISOString();
        end = today.endOf('day').toISOString();
        setDateRange([start, end]);
        break;
      case 'thisWeek':
        start = today.startOf('week').toISOString();
        end = today.endOf('week').toISOString();
        setDateRange([start, end]);
        break;
      case 'thisMonth':
        start = today.startOf('month').toISOString();
        end = today.endOf('month').toISOString();
        setDateRange([start, end]);
        break;
      case 'lastMonth':
        start = today.subtract(1, 'month').startOf('month').toISOString();
        end = today.subtract(1, 'month').endOf('month').toISOString();
        setDateRange([start, end]);
        break;
      case 'thisYear':
        start = today.startOf('year').toISOString();
        end = today.endOf('year').toISOString();
        setDateRange([start, end]);
        break;
      case 'custom':
        setDateRange(null);
        break;
      default:
        setDateRange(null);
        break;
    }
  };

  const exportToExcel = () => {
    if (!data?.queueNumbers) return;
    const excelData = data.queueNumbers.map((item: any, index: number) => ({
      'STT': index + 1,
      'Số thứ tự': item.queueNumber,
      'Tên khách hàng': item.customer_name,
      'Tên dịch vụ': item.service?.service_name || '',
      'Thời gian cấp': dayjs(item.issue_time).format('DD/MM/YYYY HH:mm:ss'),
      'Trạng thái': STATUSQUEUE[item.status as keyof typeof STATUSQUEUE]
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "BaoCao");
    XLSX.writeFile(workbook, `BaoCao_CapSo_${dayjs().format('DDMMYYYY')}.xlsx`);
  };

  const columns: ColumnType<queueNumber>[] = [
    { title: 'STT', render: (_text: any, _record: any, index: number) => <span>{index + 1}</span> },
    { title: 'Số thứ tự', dataIndex: 'queueNumber' },
    { title: 'Tên dịch vụ', dataIndex: 'service', render: (service: any) => <span>{service?.service_name}</span> },
    { title: 'Thời gian cấp', dataIndex: 'issue_time', render: (val: string) => <span>{dayjs(val).format('DD/MM/YYYY HH:mm:ss')}</span> },
    { title: 'Trạng thái', dataIndex: 'status', render: (status: string) => <span>{STATUSQUEUE[status as keyof typeof STATUSQUEUE]}</span> }
  ];

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex gap-4 items-center'>
          <Select
            value={filterType}
            onChange={handleFilterChange}
            style={{ width: 200 }}
            options={[
              { value: 'all', label: 'Tất cả' },
              { value: 'today', label: 'Hôm nay' },
              { value: 'thisWeek', label: 'Tuần này' },
              { value: 'thisMonth', label: 'Tháng này' },
              { value: 'lastMonth', label: 'Tháng trước' },
              { value: 'thisYear', label: 'Năm nay' },
              { value: 'custom', label: 'Tùy chỉnh (Từ ngày - Đến ngày)' }
            ]}
          />
          {filterType === 'custom' && (
            <RangePicker
              onChange={(dates) => {
                if (dates && dates[0] && dates[1]) {
                  setDateRange([dates[0].toISOString(), dates[1].toISOString()]);
                } else {
                  setDateRange(null);
                }
              }}
            />
          )}
        </div>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={exportToExcel}
          style={{ background: '#FF7506', borderColor: '#FF7506' }}
        >
          Xuất file Excel
        </Button>
      </div>
      <div className="w-full overflow-hidden rounded-t-xl border border-gray-200">
        <Table data={data?.queueNumbers} columns={columns} />
      </div>
    </div>
  );
}

export default ReportPage;