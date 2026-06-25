// Mock data for the admin dashboard

export const revenueMonthly = [
  { month: "Jan", revenue: 42000, profit: 18000, lastYear: 32000 },
  { month: "Feb", revenue: 48000, profit: 21000, lastYear: 36000 },
  { month: "Mar", revenue: 55000, profit: 24000, lastYear: 40000 },
  { month: "Apr", revenue: 51000, profit: 22500, lastYear: 43000 },
  { month: "May", revenue: 67000, profit: 31000, lastYear: 48000 },
  { month: "Jun", revenue: 72000, profit: 34000, lastYear: 52000 },
  { month: "Jul", revenue: 81000, profit: 39000, lastYear: 58000 },
  { month: "Aug", revenue: 78000, profit: 37000, lastYear: 61000 },
  { month: "Sep", revenue: 88000, profit: 42000, lastYear: 64000 },
  { month: "Oct", revenue: 95000, profit: 46000, lastYear: 70000 },
  { month: "Nov", revenue: 102000, profit: 50000, lastYear: 75000 },
  { month: "Dec", revenue: 125430, profit: 61000, lastYear: 88000 },
];

export const bookingAnalytics = [
  { month: "Jan", bookings: 210, cancelled: 18 },
  { month: "Feb", bookings: 245, cancelled: 22 },
  { month: "Mar", bookings: 290, cancelled: 19 },
  { month: "Apr", bookings: 275, cancelled: 25 },
  { month: "May", bookings: 340, cancelled: 21 },
  { month: "Jun", bookings: 380, cancelled: 28 },
  { month: "Jul", bookings: 425, cancelled: 30 },
  { month: "Aug", bookings: 410, cancelled: 24 },
];

export const categoryDistribution = [
  { name: "Apartments", value: 420 },
  { name: "Villas", value: 280 },
  { name: "Cabins", value: 180 },
  { name: "Beachfront", value: 240 },
  { name: "Others", value: 160 },
];

export const userGrowth = [
  { month: "Jan", users: 8200 },
  { month: "Feb", users: 9100 },
  { month: "Mar", users: 10400 },
  { month: "Apr", users: 11200 },
  { month: "May", users: 12500 },
  { month: "Jun", users: 13400 },
  { month: "Jul", users: 14300 },
  { month: "Aug", users: 15240 },
];

export const sparkline = (seed: number) =>
  Array.from({ length: 12 }, (_, i) => ({
    x: i,
    y: Math.round(40 + Math.sin(i / 1.8 + seed) * 18 + i * (2 + (seed % 3))),
  }));

export type BookingStatus = "Confirmed" | "Pending" | "Cancelled";

export interface Booking {
  id: string;
  customer: string;
  property: string;
  checkIn: string;
  checkOut: string;
  amount: number;
  status: BookingStatus;
}

export const bookings: Booking[] = [
  { id: "BK-1042", customer: "Olivia Bennett", property: "Azure Bay Villa", checkIn: "2026-07-02", checkOut: "2026-07-08", amount: 1840, status: "Confirmed" },
  { id: "BK-1043", customer: "Liam Carter", property: "Mountain Pine Cabin", checkIn: "2026-07-04", checkOut: "2026-07-07", amount: 620, status: "Pending" },
  { id: "BK-1044", customer: "Sophia Nguyen", property: "Downtown Loft 5B", checkIn: "2026-07-05", checkOut: "2026-07-12", amount: 2100, status: "Confirmed" },
  { id: "BK-1045", customer: "Noah Patel", property: "Sunset Beach House", checkIn: "2026-07-06", checkOut: "2026-07-09", amount: 980, status: "Cancelled" },
  { id: "BK-1046", customer: "Emma Wilson", property: "Lakeside Retreat", checkIn: "2026-07-08", checkOut: "2026-07-15", amount: 2650, status: "Confirmed" },
  { id: "BK-1047", customer: "James Müller", property: "Tuscan Olive Farm", checkIn: "2026-07-09", checkOut: "2026-07-13", amount: 1320, status: "Pending" },
  { id: "BK-1048", customer: "Ava Rossi", property: "Glass Treehouse", checkIn: "2026-07-10", checkOut: "2026-07-14", amount: 1550, status: "Confirmed" },
  { id: "BK-1049", customer: "William Chen", property: "Desert Mirage Dome", checkIn: "2026-07-11", checkOut: "2026-07-16", amount: 1990, status: "Confirmed" },
  { id: "BK-1050", customer: "Mia Johnson", property: "Coastal Cliff Suite", checkIn: "2026-07-12", checkOut: "2026-07-18", amount: 2380, status: "Pending" },
  { id: "BK-1051", customer: "Lucas Silva", property: "Urban Garden Flat", checkIn: "2026-07-13", checkOut: "2026-07-17", amount: 1120, status: "Cancelled" },
  { id: "BK-1052", customer: "Isabella Costa", property: "Snow Peak Chalet", checkIn: "2026-07-14", checkOut: "2026-07-21", amount: 3100, status: "Confirmed" },
  { id: "BK-1053", customer: "Henry Adams", property: "Riverside Cottage", checkIn: "2026-07-15", checkOut: "2026-07-19", amount: 1400, status: "Pending" },
  { id: "BK-1054", customer: "Charlotte Kim", property: "Skyline Penthouse", checkIn: "2026-07-16", checkOut: "2026-07-22", amount: 4200, status: "Confirmed" },
  { id: "BK-1055", customer: "Daniel Brown", property: "Forest Eco Lodge", checkIn: "2026-07-17", checkOut: "2026-07-20", amount: 870, status: "Confirmed" },
];

export type PropertyStatus = "Active" | "Pending" | "Inactive";

export interface Property {
  id: string;
  name: string;
  location: string;
  host: string;
  price: number;
  rating: number;
  status: PropertyStatus;
  hue: number;
}

export const properties: Property[] = [
  { id: "P-01", name: "Azure Bay Villa", location: "Santorini, Greece", host: "Elena Marchetti", price: 320, rating: 4.9, status: "Active", hue: 200 },
  { id: "P-02", name: "Mountain Pine Cabin", location: "Aspen, USA", host: "Robert King", price: 180, rating: 4.7, status: "Active", hue: 130 },
  { id: "P-03", name: "Downtown Loft 5B", location: "New York, USA", host: "Priya Sharma", price: 240, rating: 4.6, status: "Pending", hue: 280 },
  { id: "P-04", name: "Sunset Beach House", location: "Bali, Indonesia", host: "Made Wijaya", price: 290, rating: 4.8, status: "Active", hue: 30 },
  { id: "P-05", name: "Lakeside Retreat", location: "Queenstown, NZ", host: "Sarah Lee", price: 410, rating: 5.0, status: "Active", hue: 190 },
  { id: "P-06", name: "Tuscan Olive Farm", location: "Tuscany, Italy", host: "Marco Bianchi", price: 220, rating: 4.5, status: "Inactive", hue: 90 },
  { id: "P-07", name: "Glass Treehouse", location: "Bavaria, Germany", host: "Hans Weber", price: 350, rating: 4.9, status: "Active", hue: 150 },
  { id: "P-08", name: "Skyline Penthouse", location: "Dubai, UAE", host: "Amir Khan", price: 720, rating: 4.8, status: "Pending", hue: 320 },
];

export type UserRole = "Customer" | "Host" | "Admin";
export type UserStatus = "Active" | "Suspended" | "Pending";

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joined: string;
  status: UserStatus;
  hue: number;
}

export const users: PlatformUser[] = [
  { id: "U-201", name: "Olivia Bennett", email: "olivia@mail.com", role: "Customer", joined: "2025-01-12", status: "Active", hue: 10 },
  { id: "U-202", name: "Elena Marchetti", email: "elena@mail.com", role: "Host", joined: "2024-11-03", status: "Active", hue: 200 },
  { id: "U-203", name: "Liam Carter", email: "liam@mail.com", role: "Customer", joined: "2025-03-21", status: "Suspended", hue: 130 },
  { id: "U-204", name: "Priya Sharma", email: "priya@mail.com", role: "Host", joined: "2024-08-17", status: "Active", hue: 280 },
  { id: "U-205", name: "Noah Patel", email: "noah@mail.com", role: "Customer", joined: "2025-05-09", status: "Pending", hue: 40 },
  { id: "U-206", name: "Sarah Lee", email: "sarah@mail.com", role: "Host", joined: "2024-06-28", status: "Active", hue: 190 },
  { id: "U-207", name: "Marco Bianchi", email: "marco@mail.com", role: "Host", joined: "2025-02-14", status: "Suspended", hue: 90 },
  { id: "U-208", name: "Mia Johnson", email: "mia@mail.com", role: "Customer", joined: "2025-04-30", status: "Active", hue: 320 },
];

export interface Host {
  id: string;
  name: string;
  properties: number;
  earnings: number;
  score: number;
  verified: "Verified" | "Pending" | "Rejected";
  hue: number;
}

export const hosts: Host[] = [
  { id: "H-01", name: "Elena Marchetti", properties: 6, earnings: 48200, score: 96, verified: "Verified", hue: 200 },
  { id: "H-02", name: "Robert King", properties: 4, earnings: 31500, score: 91, verified: "Verified", hue: 130 },
  { id: "H-03", name: "Priya Sharma", properties: 8, earnings: 62100, score: 88, verified: "Pending", hue: 280 },
  { id: "H-04", name: "Made Wijaya", properties: 3, earnings: 27800, score: 84, verified: "Verified", hue: 30 },
  { id: "H-05", name: "Amir Khan", properties: 5, earnings: 71000, score: 79, verified: "Pending", hue: 320 },
  { id: "H-06", name: "Hans Weber", properties: 2, earnings: 19400, score: 72, verified: "Rejected", hue: 150 },
];

export interface Conversation {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread: number;
  hue: number;
}

export const conversations: Conversation[] = [
  { id: "C-1", name: "Olivia Bennett", preview: "Is early check-in possible for my villa booking?", time: "2m", unread: 2, hue: 10 },
  { id: "C-2", name: "Elena Marchetti", preview: "I've uploaded the new property photos.", time: "18m", unread: 0, hue: 200 },
  { id: "C-3", name: "Robert King", preview: "When is the next payout scheduled?", time: "1h", unread: 1, hue: 130 },
  { id: "C-4", name: "Priya Sharma", preview: "Thanks for approving my listing!", time: "3h", unread: 0, hue: 280 },
  { id: "C-5", name: "Noah Patel", preview: "I need to cancel my reservation.", time: "5h", unread: 0, hue: 40 },
];

export const chatMessages = [
  { id: 1, from: "them", text: "Hi! Is early check-in possible for my villa booking?", time: "09:41" },
  { id: 2, from: "me", text: "Hello Olivia! Let me check with the host for you.", time: "09:43" },
  { id: 3, from: "them", text: "That would be amazing, thank you!", time: "09:44" },
  { id: 4, from: "me", text: "The host confirmed a 1pm check-in. All set!", time: "09:52" },
];

export type NotifType = "Bookings" | "Payments" | "New Users" | "Host Requests" | "System Alerts";

export interface AdminNotification {
  id: string;
  type: NotifType;
  title: string;
  detail: string;
  time: string;
  unread: boolean;
}

export const notifications: AdminNotification[] = [
  { id: "N-1", type: "Bookings", title: "New booking confirmed", detail: "Azure Bay Villa booked by Olivia Bennett", time: "2m ago", unread: true },
  { id: "N-2", type: "Payments", title: "Payout processed", detail: "$4,820 sent to Elena Marchetti", time: "25m ago", unread: true },
  { id: "N-3", type: "Host Requests", title: "New host application", detail: "Amir Khan submitted verification documents", time: "1h ago", unread: true },
  { id: "N-4", type: "New Users", title: "120 new signups today", detail: "User growth up 12% this week", time: "3h ago", unread: false },
  { id: "N-5", type: "System Alerts", title: "Scheduled maintenance", detail: "Database optimization at 02:00 UTC", time: "6h ago", unread: false },
  { id: "N-6", type: "Payments", title: "Refund issued", detail: "$980 refunded to Noah Patel", time: "8h ago", unread: false },
];

export interface Activity {
  id: string;
  text: string;
  time: string;
  type: "booking" | "user" | "payment" | "host" | "system";
}

export const activityFeed: Activity[] = [
  { id: "A-1", text: "Olivia Bennett booked Azure Bay Villa", time: "2 min ago", type: "booking" },
  { id: "A-2", text: "Payout of $4,820 sent to Elena Marchetti", time: "25 min ago", type: "payment" },
  { id: "A-3", text: "Amir Khan applied to become a host", time: "1 hour ago", type: "host" },
  { id: "A-4", text: "Liam Carter created an account", time: "2 hours ago", type: "user" },
  { id: "A-5", text: "System backup completed successfully", time: "4 hours ago", type: "system" },
  { id: "A-6", text: "Mia Johnson left a 5-star review", time: "5 hours ago", type: "user" },
];

export const aiInsights = [
  { title: "Revenue Prediction", text: "Revenue is forecast to reach $148K next month, a 15% increase.", tone: "positive" as const },
  { title: "User Growth Forecast", text: "Expect ~1,300 new signups in the coming 30 days.", tone: "positive" as const },
  { title: "Booking Trend Analysis", text: "Beachfront properties are trending +22% in demand.", tone: "neutral" as const },
  { title: "Smart Suggestion", text: "Approve 3 pending hosts to unlock 18 new listings.", tone: "warning" as const },
];

export const topProperties = properties
  .slice()
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 5);

export const activeUsers = users.filter((u) => u.status === "Active").slice(0, 5);
