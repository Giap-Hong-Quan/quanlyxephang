// import Table from "./Table"
// import WrapTable from "./WrapTable"
// // interface DataTableProps<T> {
// //     data:T[],
// //     columns:Column[]
// //     pagination: Record<string,any> 
// // }
// // interface Column {
// //   title: string;
// //   value: string;
// //   className?: string;
// //   render?: (row: any) => React.ReactNode;
// // }
// function TableCustom<T>({ RenderRows, columns, pagination }: { RenderRows:React.ComponentType, columns: any[], pagination: Record<string,any> }) {
  
//   return (
//     <div className="w-full">
//       <WrapTable
//         className=""
//         style={{ height: 'calc(100vh - 300px)' }}
//       >
//         <Table
//           className=""
//         >
//           {}
//         </Table>
//       </WrapTable>
//     </div>
//   )
// }
// export default TableCustom