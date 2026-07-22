import React, { useEffect, useState } from 'react';
import { useHeaderStore } from '../../store/useHeaderStore';
import Table from '../../components/TableCustom/AntdTable';
import { DatePicker, Select } from 'antd';
import { useGetAllQueueNumbers } from '../../hooks/useQueueNumberQuery';
import { useUI } from '../../context/UiProvider';
import dayjs from 'dayjs';
import type { ColumnType } from 'antd/es/table';
import type { queueNumber } from '../../types/queueNumber';
import { STATUSQUEUE } from '../../constand/Enum';
import * as XLSX from 'xlsx';
import { Download, FileText, Calendar } from 'lucide-react';

const { RangePicker } = DatePicker;

const ReportPage = () => {
  const { setLoading } = useUI();
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    useHeaderStore.setState({ title: "Báo cáo", subTitle: "Danh sách báo cáo cấp số" });
  }, []);

  const { data, isLoading } = useGetAllQueueNumbers({
    page: 1,
    fromDate: dateRange ? dateRange[0] : undefined,
    toDate: dateRange ? dateRange[1] : undefined,
    pageSize: 1000
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
      'Trạng thái': STATUSQUEUE[item.status as keyof typeof STATUSQUEUE] || item.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "BaoCao");
    XLSX.writeFile(workbook, `BaoCao_CapSo_${dayjs().format('DDMMYYYY')}.xlsx`);
  };

  const columns: ColumnType<queueNumber>[] = [
    { 
      title: 'STT', 
      render: (_text: any, _record: any, index: number) => (
        <span className="font-bold text-slate-500">{index + 1}</span>
      ) 
    },
    { 
      title: 'Số thứ tự', 
      dataIndex: 'queueNumber',
      render: (val: string) => <span className="font-bold text-orange-600">{val}</span>
    },
    { 
      title: 'Tên khách hàng', 
      dataIndex: 'customer_name',
      render: (val: string) => <span className="font-semibold text-slate-700">{val}</span>
    },
    { 
      title: 'Tên dịch vụ', 
      dataIndex: 'service', 
      render: (service: any) => <span className="text-slate-600">{service?.service_name}</span> 
    },
    { 
      title: 'Thời gian cấp', 
      dataIndex: 'issue_time', 
      render: (val: string) => <span className="text-slate-500">{dayjs(val).format('DD/MM/YYYY HH:mm:ss')}</span> 
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
    }
  ];

  return (
    <div className="w-full space-y-6 pb-8">
      {/* Filter Clay Header Card */}
      <div className="clay-card p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-orange-100 text-orange-600">
            <FileText size={22} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">Lập Báo cáo Cấp số</h2>
            <p className="text-xs text-slate-400">Lọc danh sách và xuất dữ liệu ra file Excel</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-slate-400" />
            <Select
              value={filterType}
              onChange={handleFilterChange}
              style={{ width: 220 }}
              options={[
                { value: 'all', label: 'Tất cả mốc thời gian' },
                { value: 'today', label: 'Hôm nay' },
                { value: 'thisWeek', label: 'Tuần này' },
                { value: 'thisMonth', label: 'Tháng này' },
                { value: 'lastMonth', label: 'Tháng trước' },
                { value: 'thisYear', label: 'Năm nay' },
                { value: 'custom', label: 'Tùy chỉnh (Từ ngày - Đến ngày)' }
              ]}
            />
          </div>

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

          <button
            onClick={exportToExcel}
            className="clay-btn clay-btn-orange text-xs font-bold py-2.5 px-4"
          >
            <Download size={16} />
            <span>Xuất file Excel</span>
          </button>
        </div>
      </div>

      {/* Clay Table Container */}
      <div className="clay-card p-4 overflow-hidden">
        <Table data={data?.queueNumbers} columns={columns} />
      </div>
    </div>
  );
};

export default ReportPage;