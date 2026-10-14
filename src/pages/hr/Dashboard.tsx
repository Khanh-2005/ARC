import { Users, UserCheck, Clock, Briefcase, TrendingUp } from 'lucide-react';
import { StatCard, Card, SectionHeader, Badge } from '../../components/ui';
import { Avatar, formatVND } from '../../components/ui';
import { EMPLOYEES, LEAVE_REQUESTS, JOB_OPENINGS } from '../../mockData';

export default function Dashboard() {
  const active = EMPLOYEES.filter(e => e.status === 'active').length;
  const onLeave = EMPLOYEES.filter(e => e.status === 'on_leave').length;
  const pending = LEAVE_REQUESTS.filter(l => l.status === 'pending');
  const openJobs = JOB_OPENINGS.filter(j => j.status === 'open').length;

  const deptCounts: Record<string, number> = {};
  EMPLOYEES.forEach(e => { deptCounts[e.department] = (deptCounts[e.department] || 0) + 1; });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="display font-bold text-2xl mb-1" style={{ color: 'var(--ink)' }}>Dashboard</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>Tổng quan nhân sự tháng 10/2026</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Tổng nhân viên" value={EMPLOYEES.length} sub="+2 so với tháng trước" icon={<Users size={18} />} trend="up" />
        <StatCard label="Đang làm việc" value={active} sub={`${Math.round(active / EMPLOYEES.length * 100)}% tổng số`} icon={<UserCheck size={18} />} />
        <StatCard label="Đang nghỉ phép" value={onLeave} sub={`${pending.length} chờ duyệt`} icon={<Clock size={18} />} />
        <StatCard label="Đang tuyển dụng" value={openJobs} sub="3 vị trí mở" icon={<Briefcase size={18} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Headcount by dept */}
        <Card className="lg:col-span-2">
          <SectionHeader title="Nhân viên theo phòng ban" />
          <div className="space-y-3">
            {Object.entries(deptCounts).map(([dept, count]) => (
              <div key={dept} className="flex items-center gap-3">
                <span className="text-sm w-28 flex-shrink-0" style={{ color: 'var(--ink-2)' }}>{dept}</span>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface-muted)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${(count / EMPLOYEES.length) * 100}%`, background: 'var(--accent)' }}
                  />
                </div>
                <span className="text-sm font-semibold tabular-nums w-6 text-right" style={{ color: 'var(--ink)' }}>{count}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending leaves */}
        <Card>
          <SectionHeader title="Chờ duyệt nghỉ phép" />
          {pending.length === 0 ? (
            <p className="text-sm text-center py-6" style={{ color: 'var(--muted)' }}>Không có đơn nào chờ duyệt</p>
          ) : (
            <div className="space-y-3">
              {pending.map(l => (
                <div key={l.id} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'var(--surface-muted)' }}>
                  <Avatar initials={l.avatar} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: 'var(--ink)' }}>{l.employeeName}</p>
                    <p className="text-xs truncate" style={{ color: 'var(--muted)' }}>{l.days} ngày · {l.from}</p>
                  </div>
                  <Badge status={l.type} />
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Recent employees & salary chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <SectionHeader title="Nhân viên mới nhất" />
          <div className="space-y-3">
            {EMPLOYEES.slice(0, 4).map(e => (
              <div key={e.id} className="flex items-center gap-3">
                <Avatar initials={e.avatar} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: 'var(--ink)' }}>{e.name}</p>
                  <p className="text-xs truncate" style={{ color: 'var(--muted)' }}>{e.position} · {e.department}</p>
                </div>
                <Badge status={e.status} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Tổng quỹ lương tháng này" />
          <div className="mb-4">
            <p className="display text-3xl font-bold tabular-nums" style={{ color: 'var(--ink)', letterSpacing: '-0.03em' }}>
              {formatVND(EMPLOYEES.filter(e => e.status !== 'inactive').reduce((s, e) => s + e.salary, 0))}
            </p>
            <p className="text-xs mt-1 flex items-center gap-1" style={{ color: 'var(--success)' }}>
              <TrendingUp size={12} /> +2.4% so với tháng trước
            </p>
          </div>
          <div className="space-y-2">
            {Object.entries(deptCounts).map(([dept]) => {
              const sum = EMPLOYEES.filter(e => e.department === dept && e.status !== 'inactive').reduce((s, e) => s + e.salary, 0);
              return (
                <div key={dept} className="flex items-center justify-between py-1.5 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                  <span className="text-sm" style={{ color: 'var(--ink-2)' }}>{dept}</span>
                  <span className="text-sm font-semibold tabular-nums" style={{ color: 'var(--ink)' }}>{formatVND(sum)}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
