import { Download, FileText, AlertTriangle } from 'lucide-react';
import { Badge, GhostBtn } from '../../components/ui';
import { EMPLOYEES } from '../../mockData';
import { toast } from 'sonner';

const NOW_MS = Date.now();

export default function MyContract() {
  const me = EMPLOYEES[0];
  const daysLeft = me.contractEnd
    ? Math.ceil((new Date(me.contractEnd).getTime() - NOW_MS) / (1000 * 60 * 60 * 24))
    : null;

  const contracts = [
    { id: 'c1', type: me.contractType, start: me.startDate, end: me.contractEnd || 'Không xác định', status: 'active', label: 'Hợp đồng lao động số 01/2021' },
    { id: 'c2', type: 'full_time', start: '2019-03-15', end: '2021-03-14', status: 'inactive', label: 'Hợp đồng thử việc 2019' },
  ];

  return (
    <div className="max-w-2xl space-y-5">
      <h1 className="display font-bold text-2xl" style={{ color: 'var(--ink)' }}>Hợp đồng lao động</h1>

      {/* Alert: expiring soon */}
      {daysLeft !== null && daysLeft <= 180 && (
        <div className="rounded-2xl p-4 flex items-start gap-3" style={{ background: 'var(--warning-bg)' }}>
          <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--warning)' }} />
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--warning)' }}>Hợp đồng sắp hết hạn</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--warning)' }}>
              Hợp đồng của bạn sẽ hết hạn vào {me.contractEnd} ({daysLeft > 0 ? `còn ${daysLeft} ngày` : 'đã hết hạn'}).
              Vui lòng liên hệ HR để gia hạn.
            </p>
          </div>
        </div>
      )}

      {/* Contracts list */}
      <div className="space-y-3">
        {contracts.map(c => (
          <div
            key={c.id}
            className="rounded-2xl border overflow-hidden"
            style={{ background: 'var(--surface-strong)', borderColor: 'var(--border)' }}
          >
            <div className="h-1" style={{ background: c.status === 'active' ? 'var(--success)' : 'var(--subtle)' }} />
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: c.status === 'active' ? 'var(--accent-light)' : 'var(--surface-muted)', color: 'var(--accent)' }}>
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{c.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{c.start} → {c.end}</p>
                  </div>
                </div>
                <Badge status={c.status} />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  ['Loại hợp đồng', c.type === 'full_time' ? 'Toàn thời gian' : 'Bán thời gian'],
                  ['Bắt đầu', c.start],
                  ['Kết thúc', c.end],
                  ['Trạng thái', c.status === 'active' ? 'Đang hiệu lực' : 'Đã hết hạn'],
                ].map(([k, v]) => (
                  <div key={k} className="p-2.5 rounded-xl" style={{ background: 'var(--surface-muted)' }}>
                    <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--subtle)' }}>{k}</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{v}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-end">
                <GhostBtn onClick={() => toast.success('Đang tải hợp đồng PDF...')}>
                  <Download size={14} /> Tải PDF
                </GhostBtn>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
