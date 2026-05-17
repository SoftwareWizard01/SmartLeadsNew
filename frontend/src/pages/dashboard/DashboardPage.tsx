import { BarChart3, Users, TrendingUp, Activity, Loader2 } from 'lucide-react';
import { useMemo } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useLeads } from '../../hooks/useLeads';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);
  
  // Fetch up to 100 leads to compute dashboard statistics
  const { data, isLoading } = useLeads({ limit: 100, sort: 'latest' });

  // Compute stats and chart data dynamically whenever 'data' changes
  const { stats, chartData } = useMemo(() => {
    const leads = data?.data || [];
    const total = leads.length;
    const qualified = leads.filter((l) => l.status === 'qualified').length;

    // New this week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const newThisWeek = leads.filter((l) => new Date(l.createdAt) >= oneWeekAgo).length;

    // Conversion rate
    const conversionRate = total === 0 ? 0 : Math.round((qualified / total) * 100 * 10) / 10;

    const dynamicStats = [
      { name: 'Total Leads', value: total.toString(), icon: Users, change: 'Live', changeType: 'positive' },
      { name: 'Qualified Leads', value: qualified.toString(), icon: TrendingUp, change: 'Live', changeType: 'positive' },
      { name: 'Conversion Rate', value: `${conversionRate}%`, icon: Activity, change: 'Live', changeType: 'positive' },
      { name: 'New This Week', value: newThisWeek.toString(), icon: BarChart3, change: 'Live', changeType: 'positive' },
    ];

    // Chart Data: Group leads into the last 6 months
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const last6Months: { month: string; year: number; monthNum: number; leads: number }[] = [];
    const now = new Date();

    // Create buckets for the last 6 months
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      last6Months.push({
        month: monthNames[d.getMonth()],
        year: d.getFullYear(),
        monthNum: d.getMonth(),
        leads: 0, // start at 0
      });
    }

    // Fill buckets with actual data
    leads.forEach((lead) => {
      const date = new Date(lead.createdAt);
      const leadMonth = date.getMonth();
      const leadYear = date.getFullYear();

      const bucket = last6Months.find((m) => m.monthNum === leadMonth && m.year === leadYear);
      if (bucket) {
        bucket.leads += 1;
      }
    });

    return { stats: dynamicStats, chartData: last6Months };
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="glass-panel rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 text-blue-500/10">
          <Activity size={250} />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Welcome back, <span className="text-blue-500">{user?.name}</span>!
          </h2>
          <p className="mt-4 text-lg text-surface-300 max-w-2xl">
            Here's what's happening with your leads today. Keep up the momentum.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="glass-panel rounded-xl p-6 transition-all duration-300 hover:shadow-glow-sm hover:border-surface-600"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-surface-400">{stat.name}</p>
                <p className="mt-2 text-3xl font-semibold text-white tracking-tight">{stat.value}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                <stat.icon className="h-6 w-6 text-blue-500" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span
                className={`font-medium ${
                  stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {stat.change}
              </span>
              <span className="ml-2 text-surface-500">updating in real-time</span>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Chart */}
      <div className="glass-panel rounded-xl p-6 h-[400px] flex flex-col">
        <h3 className="text-lg font-medium text-white mb-6">Lead Acquisition (Last 6 Months)</h3>
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
              <XAxis dataKey="month" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '0.5rem', color: '#fff' }}
                itemStyle={{ color: '#60a5fa' }}
              />
              <Area
                type="monotone"
                dataKey="leads"
                stroke="#3b82f6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorLeads)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
