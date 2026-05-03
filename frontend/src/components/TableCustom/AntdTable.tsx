import { Table as AntTable } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
interface TableDataProps<T> {
  data: T[];
  columns: ColumnsType<T>
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
        index % 2 === 0 ? "!bg-white" : "!bg-orange-50"
      }
     scroll={{ y: 'calc(100vh - 300px)', x: '100%' }}
   className="
   w-full
        [&_.ant-table-thead_.ant-table-cell]:!bg-orange-500
        [&_.ant-table-thead_.ant-table-cell]:!text-white
        [&_.ant-table-thead_.ant-table-cell]:py-3
        [&_.ant-table-tbody>tr>td]:py-3
         [&_.ant-table-container]:!rounded-t-xl
  [&_.ant-table-body]:overflow-x-auto
        [&_.ant-table-body]:![scrollbar-width:thin]
        [&_.ant-table-thead>tr>th]:!border-r
        [&_.ant-table-thead>tr>th]:!border-orange-300
        [&_.ant-table-tbody>tr>td]:!border-r
        [&_.ant-table-tbody>tr>td]:!border-orange-100
        [&_.ant-table-tbody>tr]:!border-b
        [&_.ant-table-tbody>tr>td]:!border-b
        [&_.ant-table-tbody>tr>td]:!border-orange-100
        [&_.ant-table-thead>tr>th:last-child]:!border-r-0
        [&_.ant-table-tbody>tr>td:last-child]:!border-r-0
        [&_.ant-table-thead>tr>th::before]:!hidden
      "
    />
  )
}
export default Table