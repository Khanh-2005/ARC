import { useState } from 'react';
import { Download, TrendingUp } from 'lucide-react';
import { Card, GhostBtn, formatVND } from '../../components/ui';
import { PAYROLL } from '../../mockData';
import { toast } from 'sonner';

export default function MyPayslip() {
  const [month, setMonth] = useState('2026-10');
  const record = PAYROLL.find(p => p.employeeId === 'e1' && p.month === month);

  const history = [
    { month: '2026-09', net: 26200000 },
    { month: '2026-08', net: 26200000 },
    { month: '2026-07', net: 25800000 },
    { month: '2026-06', net: 25800000 },
  ];

  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="display font-bold text-2xl" style={{ color: 'var(--ink)' }}>Bảng lương</h1>
        <input
          type="month"
          value={month}
          onChange={e => setMonth(e.target.value)}
          className="px-3 py-2 text-sm rounded-xl border outline-none"
          style={{ borderColor: 'var(--border)', background: 'var(--surface-strong)', color: 'var(--ink)' }}
        />
      </div>

      {record ? (
        <>
          {/* Net pay hero */}
          <div className="rounded-2xl p-6" style={{ background: 'var(--accent)' }}>
            <p className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-2">Thực nhận tháng {month.replace('-', '/')}</p>
            <p className="display font-bold text-4xl text-white tabular-nums mb-1">{formatVND(record.net)}</p>
            <p className="text-white/60 text-xs flex items-center gap-1">
              <TrendingUp size={12} /> +1.1% so với tháng trước
            </p>
          </div>

          {/* Breakdown */}
          <Card>
            <h3 className="font-bold text-sm mb-4 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Thu nhập</h3>
            {[
              { label: 'Lương cơ bản', value: record.base, color: 'var(--ink)' },
              { label: 'Phụ cấp', value: record.allowance, color: 'var(--success)' },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex justify-between py-2.5 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-sm" style={{ color: 'var(--muted)' }}>{label}</span>
                <span className="text-sm font-medium tabular-nums" style={{ color }}>{formatVND(value)}</span>
              </div>
            ))}
            <div className="flex justify-between py-2.5 border-b" style={{ borderColor: 'var(--border)' }}>
              <span className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>Tổng thu nhập</span>
              <span className="text-sm font-bold tabular-nums" style={{ color: 'var(--ink)' }}>{formatVND(record.base + record.allowance)}</span>
            </div>

            <h3 className="font-bold text-sm mt-4 mb-2 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Khấu trừ</h3>
            {[
              { label: 'Thuế TNCN + BHXH + BHYT', value: record.deduction },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between py-2.5 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-sm" style={{ color: 'var(--muted)' }}>{label}</span>
                <span className="text-sm font-medium tabular-nums" style={{ color: 'var(--danger)' }}>-{formatVND(value)}</span>
              </div>
            ))}

            <div className="flex justify-between pt-3 mt-1">
              <span className="font-bold text-base" style={{ color: 'var(--ink)' }}>Thực nhận</span>
              <span className="display font-bold text-xl tabular-nums" style={{ color: 'var(--accent)' }}>{formatVND(record.net)}</span>
            </div>
          </Card>

          <GhostBtn onClick={() => toast.success('Đang tải bảng lương PDF...')}>
            <Download size={15} /> Tải PDF bảng lương
          </GhostBtn>
        </>
      ) : (
        <Card>
          <p className="text-sm text-center py-8" style={{ color: 'var(--muted)' }}>Chưa có dữ liệu lương cho tháng này</p>
        </Card>
      )}

      {/* History */}
      <Card>
        <h3 className="font-bold text-base mb-4" style={{ color: 'var(--ink)' }}>Lịch sử lương</h3>
        <div className="space-y-0">
          {history.map(h => (
            <div key={h.month} className="flex items-center justify-between py-3 border-b last:border-0 cursor-pointer hover:bg-gray-50 transition-colors px-1 rounded"
              style={{ borderColor: 'var(--border)' }}
              onClick={() => setMonth(h.month)}>
              <span className="text-sm font-medium" style={{ color: 'var(--ink-2)' }}>{h.month.replace('-', '/')}</span>
              <span className="text-sm font-bold tabular-nums" style={{ color: 'var(--ink)' }}>{formatVND(h.net)}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
