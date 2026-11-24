// Type Imports
import type { OverviewDashboardData } from '@/types/dashboards/overview-types'

export const overviewDashboard: OverviewDashboardData = {
  kpis: [
    { id: 'revenue', label: 'Total revenue', value: '$45,231.89', change: 20.1, period: 'from last month' },
    { id: 'subscriptions', label: 'Subscriptions', value: '+2,350', change: 18.1, period: 'from last month' },
    { id: 'sales', label: 'Sales', value: '+12,234', change: 19, period: 'from last month' },
    { id: 'active-now', label: 'Active now', value: '573', change: -4.2, period: 'since last hour' }
  ],

  revenueByMonth: [
    { month: 'Jan', revenue: 4120, lastYear: 3350 },
    { month: 'Feb', revenue: 3680, lastYear: 3410 },
    { month: 'Mar', revenue: 5240, lastYear: 3890 },
    { month: 'Apr', revenue: 4710, lastYear: 4020 },
    { month: 'May', revenue: 5580, lastYear: 4310 },
    { month: 'Jun', revenue: 2970, lastYear: 4180 },
    { month: 'Jul', revenue: 4390, lastYear: 4470 },
    { month: 'Aug', revenue: 5810, lastYear: 4620 },
    { month: 'Sep', revenue: 3460, lastYear: 4510 },
    { month: 'Oct', revenue: 5120, lastYear: 4880 },
    { month: 'Nov', revenue: 5930, lastYear: 5040 },
    { month: 'Dec', revenue: 4480, lastYear: 5210 }
  ],

  salesThisMonth: 265,

  recentSales: [
    {
      id: 'sale-1',
      name: 'Olivia Martin',
      email: 'olivia.martin@email.com',
      amount: 1999,
      avatar: '/images/avatars/avatar-12.webp'
    },
    {
      id: 'sale-2',
      name: 'Jackson Lee',
      email: 'jackson.lee@email.com',
      amount: 39,
      avatar: '/images/avatars/avatar-13.webp'
    },
    {
      id: 'sale-3',
      name: 'Isabella Nguyen',
      email: 'isabella.nguyen@email.com',
      amount: 299,
      avatar: '/images/avatars/avatar-14.webp'
    },
    {
      id: 'sale-4',
      name: 'William Kim',
      email: 'will@email.com',
      amount: 99,
      avatar: '/images/avatars/avatar-15.webp'
    },
    {
      id: 'sale-5',
      name: 'Sofia Davis',
      email: 'sofia.davis@email.com',
      amount: 39,
      avatar: '/images/avatars/avatar-16.webp'
    }
  ],

  analyticsKpis: [
    { id: 'clicks', label: 'Total clicks', value: '1,248', change: 12.4, period: 'vs last week' },
    { id: 'visitors', label: 'Unique visitors', value: '832', change: 5.8, period: 'vs last week' },
    { id: 'bounce-rate', label: 'Bounce rate', value: '42%', change: -3.2, period: 'vs last week', invert: true },
    { id: 'session', label: 'Avg. session', value: '3m 24s', change: 9.7, period: 'vs last week' }
  ],

  traffic: [
    { day: 'Mon', clicks: 640, uniques: 410 },
    { day: 'Tue', clicks: 720, uniques: 455 },
    { day: 'Wed', clicks: 910, uniques: 520 },
    { day: 'Thu', clicks: 860, uniques: 560 },
    { day: 'Fri', clicks: 980, uniques: 610 },
    { day: 'Sat', clicks: 540, uniques: 380 },
    { day: 'Sun', clicks: 470, uniques: 330 }
  ],

  referrers: [
    { label: 'Direct', value: 512 },
    { label: 'Product Hunt', value: 238 },
    { label: 'Twitter', value: 174 },
    { label: 'Blog', value: 104 }
  ],

  devices: [
    { label: 'Desktop', value: 74 },
    { label: 'Mobile', value: 22 },
    { label: 'Tablet', value: 4 }
  ]
}
