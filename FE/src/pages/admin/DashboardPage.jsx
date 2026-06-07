import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Calendar, Clock, DollarSign, Users } from 'lucide-react';
import { api } from '../../api/client';

const STATUS_COLORS = {
  pending: '#f5b84b',
  confirmed: '#0678c9',
  completed: '#10b981',
  cancelled: '#ef4444',
};

const STATUS_LABELS = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
};

const STAT_TONES = {
  primary: 'bg-primary shadow-primary/20',
  lagoon: 'bg-lagoon shadow-lagoon/20',
  gold: 'bg-gold shadow-gold/20',
  emerald: 'bg-emerald-500 shadow-emerald-500/20',
};

function formatMoney(value) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}tr`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
  return value.toString();
}

function StatCard({ icon: Icon, label, value, tone = 'primary' }) {
  return (
    <div className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          <p className="mt-1 text-3xl font-black text-ink">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg text-white shadow-lg ${STAT_TONES[tone]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDashboardStats()
      .then((res) => setData(res.data))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const summary = data?.summary || {};
  const monthlyStats = data?.monthlyStats || [];
  const statusCounts = (data?.statusCounts || []).map((s) => ({
    name: STATUS_LABELS[s.status] || s.status,
    value: s.count,
    color: STATUS_COLORS[s.status] || '#94a3b8',
  }));

  const chartData = monthlyStats.map((m) => ({
    month: m.month?.slice(5) || m.month,
    patients: m.patients,
    revenue: m.revenue,
  }));

  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-primary/10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Tổng quan</p>
        <h1 className="mt-2 text-3xl font-black text-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Theo dõi hoạt động phòng khám và hiệu quả lịch hẹn.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Calendar} label="Tổng lịch hẹn" value={summary.total_appointments || 0} tone="primary" />
        <StatCard icon={Clock} label="Hôm nay" value={summary.today || 0} tone="lagoon" />
        <StatCard icon={Users} label="Chờ xác nhận" value={summary.pending || 0} tone="gold" />
        <StatCard
          icon={DollarSign}
          label="Doanh thu hoàn thành"
          value={formatMoney(summary.total_revenue || 0)}
          tone="emerald"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-primary/10 bg-white p-6 shadow-sm">
          <h2 className="mb-6 font-black text-ink">Số lượng bệnh nhân theo tháng</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2edf5" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#8aa1b2" />
              <YAxis tick={{ fontSize: 12 }} stroke="#8aa1b2" />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #dbeafe', boxShadow: '0 18px 50px rgba(3,92,156,.12)' }}
                formatter={(value) => [value, 'Bệnh nhân']}
              />
              <Bar dataKey="patients" fill="#0678c9" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-primary/10 bg-white p-6 shadow-sm">
          <h2 className="mb-6 font-black text-ink">Doanh thu theo tháng (VNĐ)</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2edf5" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#8aa1b2" />
              <YAxis tick={{ fontSize: 12 }} stroke="#8aa1b2" tickFormatter={formatMoney} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #dbeafe', boxShadow: '0 18px 50px rgba(3,92,156,.12)' }}
                formatter={(value) => [new Intl.NumberFormat('vi-VN').format(value) + 'đ', 'Doanh thu']}
              />
              <Line type="monotone" dataKey="revenue" stroke="#0678c9" strokeWidth={3} dot={{ fill: '#0678c9', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {statusCounts.length > 0 && (
        <div className="max-w-md rounded-lg border border-primary/10 bg-white p-6 shadow-sm">
          <h2 className="mb-6 font-black text-ink">Phân bổ trạng thái lịch hẹn</h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={statusCounts}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {statusCounts.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
