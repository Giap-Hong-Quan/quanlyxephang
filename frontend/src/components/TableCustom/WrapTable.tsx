import type React from "react";

function WrapTable({ children, className = '', style = {} }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) {
  return (
    <div style={style} className={`p-0 overflow-auto ${className} `}>
      {children}
    </div>
  )
}
export default WrapTable;