import {
  LayoutDashboard,
  BarChart3,
  Building2,
  CalendarCheck,
  Users,
  UserCheck,
  DollarSign,
  MessageSquare,
  Bell,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

export interface AdminNavItem {
  label: string;
  to: string;
  icon: typeof LayoutDashboard;
  badge?: number;
}

export const adminNav: AdminNavItem[] = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
  { label: "Properties", to: "/admin/properties", icon: Building2 },
  { label: "Bookings", to: "/admin/bookings", icon: CalendarCheck, badge: 5 },
  { label: "Customers", to: "/admin/customers", icon: Users },
  { label: "Hosts", to: "/admin/hosts", icon: UserCheck },
  { label: "Revenue", to: "/admin/revenue", icon: DollarSign },
  { label: "Messages", to: "/admin/messages", icon: MessageSquare, badge: 3 },
  { label: "Notifications", to: "/admin/notifications", icon: Bell, badge: 3 },
  { label: "Reports", to: "/admin/reports", icon: FileText },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

export const logoutItem: AdminNavItem = { label: "Logout", to: "/", icon: LogOut };
