
export interface PermissionRoute {
  permission: string;
  path: string;
  label?: string;
}

export const PERMISSION_ROUTES: PermissionRoute[] = [
  { permission: "view_dashboard", path: "/dashboard", label: "Dashboard" },
  { permission: "manage_devices", path: "/devices", label: "Thiết bị" },
  { permission: "manage_services", path: "/services", label: "Dịch vụ" },
  { permission: "issue_queue_number", path: "/queue", label: "Cấp số" },
  { permission: "view_reports", path: "/reports", label: "Báo cáo" },
  { permission: "system_settings", path: "/settings", label: "Cài đặt" },
];

