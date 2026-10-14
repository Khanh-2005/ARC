import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card, Badge, PrimaryBtn, GhostBtn } from '../../components/ui';
import { LEAVE_REQUESTS } from '../../mockData';
import type { LeaveRequest } from '../../types';
import { toast } from 'sonner';

const LEAVE_BALANCES = [
  { type: 'annual', label: 'Phép năm', total: 12, used: 5, color: '#3b82f6' },
  { type: 'sick', label: 'Phép ốm', total: 6, used: 1, color: '#f59e0b' },
  { type: 'personal', label: 'Cá nhân', total: 3, used: 0, color: '#8b5cf6' },
];

export default function MyLeave() {
  const myRequests = LEAVE_REQUESTS.filter(r => r.employeeId === 'e1');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: 'annual', from: '', to: '', reason: '' });
  const [requests, setRequests] = useState<LeaveRequest[]>(myRequests);

  const submit = () => {
    if (!form.from || !form.to || !form.reason) { toast.error('Vui lòng điền đầy đủ thông tin'); return; }
    const from = new Date(form.from);
    const to = new Date(form.to);
    const days = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const newReq: LeaveRequest = {
      id: 'l' + Date.now(), employeeId: 'e1', employeeName: 'Nguyễn Văn An', avatar: 'NA',
      department: 'Kỹ thuật', type: form.type as LeaveRequest['type'],
      from: form.from, to: form.to, days,
      reason: form.reason, status: 'pending', appliedAt: new Date().toISOString().split('T')[0]
    };
    setRequests(prev => [newReq, ...prev]);
    setShowForm(false);
    setForm({ type: 'annual', from: '', to: '', reason: '' });
    toast.success('Đã gửi đơn xin nghỉ phép. Đang chờ phê duyệt.');
  };

  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="display font-bold text-2xl" style={{ color: 'var(--ink)' }}>Nghỉ phép</h1>
        <PrimaryBtn onClick={() => setShowForm(v => !v)}>
          <Plus size={16} /> Xin nghỉ phép
        </PrimaryBtn>
      </div>

      {/* Leave balances */}
      <div className="grid grid-cols-3 gap-3">
        {LEAVE_BALANCES.map(b => (
          <Card key={b.type} className="text-center">
            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--muted)' }}>{b.label}</p>
            <p className="display font-bold text-3xl tabular-nums mb-2" style={{ color: 'var(--ink)' }}>
              {b.total - b.used}
            </p>
            <p className="text-xs mb-3" style={{ color: 'var(--subtle)' }}>Còn lại / {b.total}</p>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--surface-muted)' }}>
              <div className="h-full rounded-full" style={{ width: `${(b.used / b.total) * 100}%`, background: b.color }} />
            </div>
          </Card>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <Card>
          <h3 className="font-bold text-base mb-4" style={{ color: 'var(--ink)' }}>Đơn xin nghỉ phép</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>Loại nghỉ phép</label>
              <select
                value={form.type}
                onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                className="w-full px-3 py-2.5 text-sm rounded-xl border outline-none"
                style={{ borderColor: 'var(--border)', background: 'var(--surface-muted)', color: 'var(--ink)' }}
              >
                <option value="annual">Phép năm</option>
                <option value="sick">Phép ốm</option>
                <option value="personal">Cá nhân</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[{ label: 'Từ ngày', field: 'from' as const }, { label: 'Đến ngày', field: 'to' as const }].map(({ label, field }) => (
                <div key={field}>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>{label}</label>
                  <input
                    type="date"
                    value={form[field]}
                    onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border outline-none"
                    style={{ borderColor: 'var(--border)', background: 'var(--surface-muted)', color: 'var(--ink)' }}
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>Lý do</label>
              <textarea
                value={form.reason}
                onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}
                rows={3}
                placeholder="Mô tả lý do nghỉ phép..."
                className="w-full px-3 py-2.5 text-sm rounded-xl border outline-none resize-none"
                style={{ borderColor: 'var(--border)', background: 'var(--surface-muted)', color: 'var(--ink)' }}
              />
            </div>
            <div className="flex gap-2">
              <PrimaryBtn onClick={submit}>Gửi đơn</PrimaryBtn>
              <GhostBtn onClick={() => setShowForm(false)}>Hủy</GhostBtn>
            </div>
          </div>
        </Card>
      )}

      {/* History */}
      <Card>
        <h3 className="font-bold text-base mb-4" style={{ color: 'var(--ink)' }}>Lịch sử đơn nghỉ phép</h3>
        {requests.length === 0 ? (
          <p className="text-sm text-center py-4" style={{ color: 'var(--muted)' }}>Chưa có đơn nào</p>
        ) : (
          <div className="space-y-3">
            {requests.map(r => (
              <div key={r.id} className="flex items-center gap-4 py-3 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                <Badge status={r.type} />
                <div className="flex-1 text-sm" style={{ color: 'var(--ink-2)' }}>
                  {r.from} → {r.to}
                  <span className="ml-2 text-xs" style={{ color: 'var(--muted)' }}>({r.days} ngày)</span>
                </div>
                <Badge status={r.status} />
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
