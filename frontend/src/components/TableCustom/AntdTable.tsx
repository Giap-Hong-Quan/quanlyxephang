import { Table as AntTable } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";

interface TableDataProps<T> {
  data: T[];
  columns: ColumnsType<T>;
  pagination?: boolean | TablePaginationConfig;
  onChange?: (pagination: TablePaginationConfig) => void;
}

const Table = <T,>({ data, columns, pagination = false, onChange }: TableDataProps<T>) => {
  return (
    <AntTable
      columns={columns}
      dataSource={data}
      pagination={pagination === true ? {} : pagination}
      onChange={(paginationConfig) => onChange?.(paginationConfig)}
      rowClassName={(_, index) =>
        index % 2 === 0 ? "!bg-white" : "!bg-slate-50/70 hover:!bg-orange-50/80 transition-colors"
      }
      scroll={{ y: 'calc(100vh - 310px)', x: '100%' }}
      className="
        w-full
        [&_.ant-table-container]:!rounded-2xl
        [&_.ant-table-container]:!overflow-hidden
        [&_.ant-table-container]:!border-none
        [&_.ant-table-thead_.ant-table-cell]:!bg-gradient-to-r
        [&_.ant-table-thead_.ant-table-cell]:!from-orange-500
        [&_.ant-table-thead_.ant-table-cell]:!to-orange-600
        [&_.ant-table-thead_.ant-table-cell]:!text-white
        [&_.ant-table-thead_.ant-table-cell]:!font-bold
        [&_.ant-table-thead_.ant-table-cell]:!text-xs
        [&_.ant-table-thead_.ant-table-cell]:!uppercase
        [&_.ant-table-thead_.ant-table-cell]:!py-3.5
        [&_.ant-table-tbody>tr>td]:!py-3.5
        [&_.ant-table-tbody>tr>td]:!text-xs
        [&_.ant-table-tbody>tr>td]:!border-slate-100
        [&_.ant-table-thead>tr>th::before]:!hidden
        [&_.ant-pagination]:!my-4
        [&_.ant-pagination-item-active]:!border-orange-500
        [&_.ant-pagination-item-active_a]:!text-orange-500
      "
    />
  );
};

export default Table;