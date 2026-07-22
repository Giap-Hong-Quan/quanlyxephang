import React, { useEffect, useState } from 'react';
import { useHeaderStore } from '../../store/useHeaderStore';
import { 
  useOverviewStats, 
  useServiceStats, 
  useTimeStats 
} from '../../hooks/useStatsQuery';
import { useGetAllQueueNumbers, useUpdateQueueNumberStatus } from '../../hooks/useQueueNumberQuery';
import { 
  Ticket, 
  Clock, 
  Activity, 
  CheckCircle2, 
  XCircle, 
  Monitor, 
  Layers, 
  Users, 
  PlusCircle, 
  FileText,
  Calendar,
  RefreshCw,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { DatePicker, Select, Button, Spin } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const { RangePicker } = DatePicker;

// Color palettes for Donut chart slices
const COLORS = ['#FF7506', '#3182CE', '#38B2AC', '#9F7AEA', '#ED8936', '#48BB78'];

const DashboardPage = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState<string>('today');
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [period, setPeriod] = useState<string>('day');

  useEffect(() => {
    useHeaderStore.setState({ title: "Trang chủ", subTitle: "Thống kê & Tổng quan hệ thống" });
  }, []);

  // Update dateRange when filterType changes
  const handleFilterChange = (val: string) => {
    setFilterType(val);
    const today = dayjs();
    let start: string | undefined;
    let end: string | undefined;

    if (val === 'today') {
      start = today.startOf('day').toISOString();
      end = today.endOf('day').toISOString();
      setDateRange([start, end]);
    } else if (val === 'thisWeek') {
      start = today.startOf('week').toISOString();
      end = today.endOf('week').toISOString();
      setDateRange([start, end]);
    } else if (val === 'thisMonth') {
      start = today.startOf('month').toISOString();
      end = today.endOf('month').toISOString();
      setDateRange([start, end]);
    } else if (val === 'thisYear') {
      start = today.startOf('year').toISOString();
      end = today.endOf('year').toISOString();
      setDateRange([start, end]);
    } else {
      setDateRange(null);
    }
  };

  // Queries
  const params = {
    fromDate: dateRange ? dateRange[0] : undefined,
    toDate: dateRange ? dateRange[1] : undefined
  };

  const { data: overview, isLoading: isOverviewLoading, refetch: refetchOverview } = useOverviewStats(params);
  const { data: serviceStats, isLoading: isServiceLoading } = useServiceStats(params);
  const { data: timeStats, isLoading: isTimeLoading } = useTimeStats({ ...params, period });
  const { data: queueData, isLoading: isQueueLoading } = useGetAllQueueNumbers({ page: 1, pageSize: 6 });

  const updateStatusMutation = useUpdateQueueNumberStatus();

  const handleStatusChange = (id: string, newStatus: string) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  // Calculate completion rate
  const total = overview?.totalQueue || 0;
  const completed = overview?.completedCount || 0;
  const completionRate = total > 0 ? ((completed / total) * 100).toFixed(1) : "0.0";

  return (
    <div className="w-full space-y-6 pb-8">
      {/* Header Controls & Filter Bar */}
      <div className="clay-card p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-orange-100 text-orange-600 font-bold">
            <Calendar size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">Bộ lọc thời gian</h2>
            <p className="text-xs text-slate-500">Xem số liệu thống kê theo mốc thời gian</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Select
            value={filterType}
            onChange={handleFilterChange}
            style={{ width: 180 }}
            className="rounded-xl shadow-sm"
            options={[
              { value: 'all', label: 'Tất cả thời gian' },
              { value: 'today', label: 'Hôm nay' },
              { value: 'thisWeek', label: 'Tuần này' },
              { value: 'thisMonth', label: 'Tháng này' },
              { value: 'thisYear', label: 'Năm nay' },
              { value: 'custom', label: 'Tùy chỉnh khoảng ngày' },
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

          <button
            onClick={() => refetchOverview()}
            className="clay-btn bg-white text-slate-700 hover:text-orange-500 py-2 px-3 text-xs"
            title="Làm mới dữ liệu"
          >
            <RefreshCw size={14} className={isOverviewLoading ? "animate-spin text-orange-500" : ""} />
            <span>Làm mới</span>
          </button>
        </div>
      </div>

      {/* 4 Clay Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Queue */}
        <div className="clay-card-orange p-5 relative overflow-hidden flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider opacity-90">Đã cấp</span>
            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md">
              <Ticket size={22} className="text-white" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold tracking-tight">
              {isOverviewLoading ? <Spin size="small" /> : (overview?.totalQueue || 0).toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs opacity-90 mt-1">
              <TrendingUp size={14} />
              <span>Tổng số thứ tự phát ra</span>
            </div>
          </div>
        </div>

        {/* Card 2: Waiting */}
        <div className="clay-card-blue p-5 relative overflow-hidden flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider opacity-90">Đang chờ</span>
            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md">
              <Clock size={22} className="text-white" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold tracking-tight">
              {isOverviewLoading ? <Spin size="small" /> : (overview?.waitingCount || 0).toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs opacity-90 mt-1">
              <span>Đang xếp hàng chờ đến lượt</span>
            </div>
          </div>
        </div>

        {/* Card 3: Processing */}
        <div className="clay-card-green p-5 relative overflow-hidden flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider opacity-90">Đang sử dụng</span>
            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md">
              <Activity size={22} className="text-white" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold tracking-tight">
              {isOverviewLoading ? <Spin size="small" /> : (overview?.processingCount || 0).toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs opacity-90 mt-1">
              <span>Đang được phục vụ tại quầy</span>
            </div>
          </div>
        </div>

        {/* Card 4: Completed & Skipped */}
        <div className="clay-card-purple p-5 relative overflow-hidden flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider opacity-90">Đã xong / Bỏ qua</span>
            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md flex gap-1">
              <CheckCircle2 size={18} className="text-white" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-3 text-white">
              <span className="text-2xl font-extrabold">{overview?.completedCount || 0}</span>
              <span className="text-xs opacity-80">xong</span>
              <span className="text-xl font-bold opacity-90">/ {overview?.skippedCount || 0}</span>
              <span className="text-xs opacity-80">bỏ qua</span>
            </div>
            <div className="text-xs opacity-90 mt-1">
              Tỷ lệ hoàn thành: <span className="font-bold text-yellow-300">{completionRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* System Infrastructure Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="clay-card p-4 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-orange-50 text-orange-500">
            <Layers size={22} />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Dịch vụ hoạt động</span>
            <div className="text-xl font-bold text-slate-800">{overview?.totalServices || 0} Dịch vụ</div>
          </div>
        </div>

        <div className="clay-card p-4 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-blue-50 text-blue-500">
            <Monitor size={22} />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Thiết bị cấp số/quầy</span>
            <div className="text-xl font-bold text-slate-800">{overview?.totalDevices || 0} Thiết bị</div>
          </div>
        </div>

        <div className="clay-card p-4 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-purple-50 text-purple-500">
            <Users size={22} />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Nhân sự vận hành</span>
            <div className="text-xl font-bold text-slate-800">{overview?.totalUsers || 0} Tài khoản</div>
          </div>
        </div>
      </div>

      {/* Charts Section: Line Trend Chart & Donut Service Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Time Trend Chart */}
        <div className="lg:col-span-2 clay-card p-6 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <TrendingUp size={18} className="text-orange-500" />
                Diễn biến lượng cấp số theo thời gian
              </h3>
              <p className="text-xs text-slate-400">Biểu đồ tổng hợp lượng số thứ tự phát ra</p>
            </div>

            <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl">
              {[
                { key: 'hour', label: 'Giờ' },
                { key: 'day', label: 'Ngày' },
                { key: 'month', label: 'Tháng' },
                { key: 'year', label: 'Năm' },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setPeriod(item.key)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    period === item.key
                      ? "bg-white text-orange-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-72 w-full">
            {isTimeLoading ? (
              <div className="h-full flex items-center justify-center">
                <Spin tip="Đang tải dữ liệu biểu đồ..." />
              </div>
            ) : timeStats && timeStats.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF7506" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#FF7506" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorWaiting" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3182CE" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3182CE" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '1rem',
                      border: 'none',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      fontSize: '12px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    name="Tổng cấp"
                    stroke="#FF7506"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorTotal)"
                  />
                  <Area
                    type="monotone"
                    dataKey="waiting"
                    name="Đang chờ"
                    stroke="#3182CE"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorWaiting)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm">
                <span>Không có dữ liệu trong khoảng thời gian này</span>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Donut Service Distribution Chart */}
        <div className="clay-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800 mb-1">Tỷ lệ theo Dịch vụ</h3>
            <p className="text-xs text-slate-400 mb-4">Phân bổ lượt cấp số cho từng dịch vụ</p>
          </div>

          <div className="h-56 w-full relative flex items-center justify-center">
            {isServiceLoading ? (
              <Spin />
            ) : serviceStats && serviceStats.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="total"
                  >
                    {serviceStats.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any, _name: any, item: any) => [
                      `${value} lượt`,
                      item.payload.service_name || 'Dịch vụ'
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <span className="text-slate-400 text-xs">Chưa có dữ liệu dịch vụ</span>
            )}
          </div>

          {/* Custom Legend */}
          <div className="space-y-2 mt-2 max-h-28 overflow-y-auto pr-1">
            {serviceStats?.map((s, idx) => (
              <div key={s._id} className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  ></span>
                  <span className="text-slate-700 truncate max-w-[130px]">{s.service_name || "Dịch vụ"}</span>
                </div>
                <span className="text-slate-900 font-bold">{s.total} lượt</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Monitoring & Quick Actions Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Real-time Queue Feed */}
        <div className="lg:col-span-2 clay-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-800">Cấp số mới nhất</h3>
              <p className="text-xs text-slate-400">Theo dõi trực tiếp danh sách lượt cấp gần đây</p>
            </div>
            <button
              onClick={() => navigate('/queues')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              <span>Xem tất cả</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          {isQueueLoading ? (
            <div className="py-8 text-center"><Spin /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase">
                    <th className="py-2.5 px-3">STT / Số</th>
                    <th className="py-2.5 px-3">Khách hàng</th>
                    <th className="py-2.5 px-3">Dịch vụ</th>
                    <th className="py-2.5 px-3">Thời gian cấp</th>
                    <th className="py-2.5 px-3">Trạng thái</th>
                    <th className="py-2.5 px-3 text-right">Đổi trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {queueData?.queueNumbers?.map((q: any) => {
                    const statusClass = 
                      q.status === 'waiting' ? 'clay-badge-waiting' :
                      q.status === 'processing' ? 'clay-badge-processing' :
                      q.status === 'completed' ? 'clay-badge-completed' : 'clay-badge-skipped';
                    const statusLabel = 
                      q.status === 'waiting' ? 'Đang chờ' :
                      q.status === 'processing' ? 'Đang khám' :
                      q.status === 'completed' ? 'Đã xong' : 'Bỏ qua';

                    return (
                      <tr key={q._id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 font-bold text-orange-600">{q.queueNumber}</td>
                        <td className="py-3 px-3 font-semibold text-slate-700">{q.customer_name}</td>
                        <td className="py-3 px-3 text-slate-600">{q.service?.service_name || '-'}</td>
                        <td className="py-3 px-3 text-slate-500">{dayjs(q.issue_time).format('HH:mm DD/MM')}</td>
                        <td className="py-3 px-3">
                          <span className={`clay-badge ${statusClass}`}>{statusLabel}</span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <Select
                            size="small"
                            value={q.status}
                            onChange={(val) => handleStatusChange(q._id, val)}
                            style={{ width: 110 }}
                            options={[
                              { value: 'waiting', label: 'Đang chờ' },
                              { value: 'processing', label: 'Đang khám' },
                              { value: 'completed', label: 'Đã xong' },
                              { value: 'skipped', label: 'Bỏ qua' }
                            ]}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right 1 Col: Quick Clay Action Shortcuts */}
        <div className="clay-card p-6 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-800">Thao tác nhanh</h3>
            <p className="text-xs text-slate-400">Các lối tắt quản trị thường dùng</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/queues/create')}
              className="clay-btn clay-btn-orange w-full justify-start py-3 text-sm font-bold"
            >
              <PlusCircle size={18} />
              <span>Cấp số mới ngay</span>
            </button>

            <button
              onClick={() => navigate('/services/create')}
              className="clay-btn bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 w-full justify-start py-3 text-sm font-bold"
            >
              <Layers size={18} className="text-orange-500" />
              <span>Tạo thêm Dịch vụ</span>
            </button>

            <button
              onClick={() => navigate('/devices/create')}
              className="clay-btn bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 w-full justify-start py-3 text-sm font-bold"
            >
              <Monitor size={18} className="text-blue-500" />
              <span>Thêm Thiết bị cấp số</span>
            </button>

            <button
              onClick={() => navigate('/reports')}
              className="clay-btn bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 w-full justify-start py-3 text-sm font-bold"
            >
              <FileText size={18} className="text-purple-500" />
              <span>Xuất Báo cáo & Excel</span>
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-100 text-xs text-orange-700 font-medium">
            💡 <strong>Mẹo:</strong> Hệ thống tự động cập nhật danh sách qua Socket.IO khi có khách hàng cấp số mới.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;