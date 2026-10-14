import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { SectionHeader, Card, Badge, Avatar, GhostBtn } from '../../components/ui';
import { LEAVE_REQUESTS } from '../../mockData';
import type { LeaveRequest } from '../../types';
import { toast } from 'sonner';

type Tab = 'pending' | 'approved' | 'rejected';

export default function Leave() {
  const [tab, setTab] = useState<Tab>('pending');
  const [requests, setRequests] = useState<LeaveRequest[]>(LEAVE_REQUESTS);

  const filtered = requests.filter(r => r.status === tab);

  const handle = (id: string, action: 'approved' | 'rejected') => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
    toast.success(action === 'approved' ? 'Đã duyệt đơn nghỉ phép' : 'Đã từ chối đơn nghỉ phép');
  };

  const counts = {
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  };

  return (
    <div className="space-y-5">
      <SectionHeader title="Quản lý nghỉ phép" />

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: 'var(--surface-muted)' }}>
        {(['pending', 'approved', 'rejected'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${tab === t ? 'text-white shadow-sm' : ''}`}
            style={tab === t ? { background: 'var(--accent)' } : { color: 'var(--muted)' }}
          >
            {{ pending: 'Chờ duyệt', approved: 'Đã duyệt', rejected: 'Từ chối' }[t]}
            {counts[t] > 0 && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${tab === t ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700'}`}>
                {counts[t]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <Card>
          <p className="text-sm text-center py-8" style={{ color: 'var(--muted)' }}>Không có đơn nào trong mục này</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(r => (
            <LeaveCard key={r.id} request={r} onApprove={() => handle(r.id, 'approved')} onReject={() => handle(r.id, 'rejected')} />
          ))}
        </div>
      )}
    </div>
  );
}

function LeaveCard({ request: r, onApprove, onReject }: { request: LeaveRequest; onApprove: () => void; onReject: () => void }) {
  const LEAVE_COLORS: Record<string, string> = {
    annual: '#3b82f6', sick: '#f59e0b', personal: '#8b5cf6', maternity: '#ec4899',
  };
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--surface-strong)', borderColor: 'var(--border)' }}>
      {/* Top stripe */}
      <div className="h-1" style={{ background: LEAVE_COLORS[r.type] || 'var(--accent)' }} />
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Avatar initials={r.avatar} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate" style={{ color: 'var(--ink)' }}>{r.employeeName}</p>
            <p className="text-xs truncate" style={{ color: 'var(--muted)' }}>{r.department}</p>
          </div>
          <Badge status={r.type} />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl" style={{ background: 'var(--surface-muted)' }}>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--subtle)' }}>Từ ngày</p>
            <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{r.from}</p>
          </div>
          <div className="p-2.5 rounded-xl" style={{ background: 'var(--surface-muted)' }}>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--subtle)' }}>Đến ngày</p>
            <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{r.to}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="display font-bold text-2xl tabular-nums" style={{ color: 'var(--ink)' }}>
            {r.days} <span className="text-sm font-normal" style={{ color: 'var(--muted)' }}>ngày</span>
          </span>
          <Badge status={r.status} />
        </div>

        {r.reason && (
          <p className="text-xs px-3 py-2 rounded-lg text-pretty" style={{ background: 'var(--surface-muted)', color: 'var(--ink-2)' }}>
            "{r.reason}"
          </p>
        )}

        {r.status === 'pending' && (
          <div className="flex gap-2 pt-1">
            <button
              onClick={onApprove}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
              style={{ background: 'var(--success)', minHeight: 44 }}
            >
              <CheckCircle size={15} /> Duyệt
            </button>
            <button
              onClick={onReject}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              style={{ background: 'var(--danger-bg)', color: 'var(--danger)', minHeight: 44 }}
            >
              <XCircle size={15} /> Từ chối
            </button>
          </div>
        )}
        {r.status !== 'pending' && (
          <GhostBtn onClick={() => toast.info('Chi tiết đơn')}>Xem chi tiết</GhostBtn>
        )}
      </div>
    </div>
  );
}
