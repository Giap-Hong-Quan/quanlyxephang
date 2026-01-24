import {ReactComponent as DashboardIcon} from "../assets/icon/dashboard.svg";
import {ReactComponent as DeviceIcon} from "../assets/icon/device.svg";
import {ReactComponent as ServiceIcon} from "../assets/icon/service.svg";
import {ReactComponent as QueueIcon} from "../assets/icon/queue.svg";
import {ReactComponent as ReportIcon} from "../assets/icon/report.svg";
import {ReactComponent as SettingIcon} from "../assets/icon/setting.svg";
import { ComponentType, ReactNode, SVGProps } from "react";
export interface MenuItem {
  path?: string;
  label: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  children?: MenuItem[];
}
export const MENU: MenuItem[] = [
  {icon:DashboardIcon,path: "/dashboard", label: "Dashboard" },
  {icon:DeviceIcon,path: "/devices", label: "Thiết bị" },
  {icon:ServiceIcon,path: "/services", label: "Dịch vụ" },
  {icon:QueueIcon,path: "/queues", label: "Cấp số" },
  {icon:ReportIcon,path: "/reports", label: "Báo cáo" },
  {icon:SettingIcon,path: "/users",label: "Tài khoản"},
];

