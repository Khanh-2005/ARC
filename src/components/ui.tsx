import type { ReactNode } from 'react';

// Avatar initials
export function Avatar({ initials, size = 'md', color }: { initials: string; size?: 'sm' | 'md' | 'lg'; color?: string }) {
  const sizes = { sm: 'w-7 h-7 text-[10px]', md: 'w-9 h-9 text-xs', lg: 'w-12 h-12 text-sm' };
  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}
      style={{ background: color || 'var(--accent)' }}
    >
      {initials}
    </div>
  );
}

// Status badge
const STATUS_STYLES: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-500',
  on_leave: 'bg-amber-100 text-amber-700',
  pending: 'bg-amber-100 text-amber-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-600',
  draft: 'bg-gray-100 text-gray-600',
  processing: 'bg-blue-100 text-blue-700',
  paid: 'bg-green-100 text-green-700',
  open: 'bg-green-100 text-green-700',
  closed: 'bg-gray-100 text-gray-500',
  paused: 'bg-amber-100 text-amber-700',
  full_time: 'bg-blue-100 text-blue-700',
  part_time: 'bg-purple-100 text-purple-700',
  contract: 'bg-orange-100 text-orange-700',
  admin: 'bg-purple-100 text-purple-800',
  hr_manager: 'bg-blue-100 text-blue-700',
  employee: 'bg-gray-100 text-gray-600',
};

const STATUS_LABELS: Record<string, string> = {
  active: 'Đang làm', inactive: 'Nghỉ việc', on_leave: 'Đang nghỉ',
  pending: 'Chờ duyệt', approved: 'Đã duyệt', rejected: 'Từ chối',
  draft: 'Nháp', processing: 'Đang xử lý', paid: 'Đã trả',
  open: 'Đang tuyển', closed: 'Đã đóng', paused: 'Tạm dừng',
  full_time: 'Toàn thời gian', part_time: 'Bán thời gian', contract: 'Hợp đồng',
  admin: 'Admin', hr_manager: 'HR Manager', employee: 'Nhân viên',
  annual: 'Phép năm', sick: 'Phép ốm', personal: 'Cá nhân', maternity: 'Thai sản',
};

export function Badge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold ${STATUS_STYLES[status] || 'bg-gray-100 text-gray-600'}`}>
      {STATUS_LABELS[status] || status}
    </span>
  );
}

// Card
export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border p-5 ${className}`}
      style={{ background: 'var(--surface-strong)', borderColor: 'var(--border)' }}
    >
      {children}
    </div>
  );
}

// Stat card
export function StatCard({ label, value, sub, icon, trend }: {
  label: string; value: string | number; sub?: string; icon?: ReactNode; trend?: 'up' | 'down';
}) {
  return (
    <div
      className="rounded-2xl border p-5 flex flex-col gap-3"
      style={{ background: 'var(--surface-strong)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)', letterSpacing: '0.08em' }}>{label}</span>
        {icon && (
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
            {icon}
          </div>
        )}
      </div>
      <div>
        <p className="display text-3xl font-bold tabular-nums" style={{ color: 'var(--ink)', letterSpacing: '-0.03em' }}>{value}</p>
        {sub && <p className="text-xs mt-1" style={{ color: trend === 'up' ? 'var(--success)' : trend === 'down' ? 'var(--danger)' : 'var(--muted)' }}>{sub}</p>}
      </div>
    </div>
  );
}

// Section header
export function SectionHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="display font-bold text-xl" style={{ color: 'var(--ink)' }}>{title}</h2>
      {action}
    </div>
  );
}

// Primary button
export function PrimaryBtn({ children, onClick, disabled, type = 'button' }: {
  children: ReactNode; onClick?: () => void; disabled?: boolean; type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-150 disabled:opacity-40"
      style={{ background: disabled ? 'var(--muted)' : 'var(--accent)', minHeight: 44 }}
      onMouseEnter={e => { if (!disabled) (e.currentTarget).style.background = 'var(--accent-hover)'; }}
      onMouseLeave={e => { if (!disabled) (e.currentTarget).style.background = 'var(--accent)'; }}
    >
      {children}
    </button>
  );
}

// Ghost button
export function GhostBtn({ children, onClick, danger }: { children: ReactNode; onClick?: () => void; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100"
      style={{ color: danger ? 'var(--danger)' : 'var(--ink-2)', minHeight: 36 }}
    >
      {children}
    </button>
  );
}

// Table
export function Table({ headers, children }: { headers: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: 'var(--border)' }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-muted)' }}>
            {headers.map(h => (
              <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)', letterSpacing: '0.08em' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody style={{ background: 'var(--surface-strong)' }}>
          {children}
        </tbody>
      </table>
    </div>
  );
}

export function Tr({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <tr
      onClick={onClick}
      className={`border-b last:border-0 transition-colors ${onClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
      style={{ borderColor: 'var(--border)' }}
    >
      {children}
    </tr>
  );
}

export function Td({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <td className={`px-4 py-3 ${className}`} style={{ color: 'var(--ink-2)' }}>{children}</td>;
}

// Format currency
export function formatVND(n: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n);
}
