import { useState } from 'react';
import { Download, Play, CheckCircle } from 'lucide-react';
import { SectionHeader, Table, Tr, Td, Badge, PrimaryBtn, GhostBtn, StatCard, formatVND } from '../../components/ui';
import { PAYROLL } from '../../mockData';
import type { PayrollRecord } from '../../types';
import { toast } from 'sonner';

export default function Payroll() {
  const [records, setRecords] = useState<PayrollRecord[]>(PAYROLL);
  const [month, setMonth] = useState('2026-10');

  const filtered = records.filter(r => r.month === month);
  const totalNet = filtered.reduce((s, r) => s + r.net, 0);
  const totalBase = filtered.reduce((s, r) => s + r.base, 0);
  const totalDeduction = filtered.reduce((s, r) => s + r.deduction, 0);

  const processAll = () => {
    setRecords(prev => prev.map(r => r.month === month && r.status === 'draft' ? { ...r, status: 'processing' } : r));
    toast.success('Đang xử lý bảng lương...');
    setTimeout(() => {
      setRecords(prev => prev.map(r => r.month === month && r.status === 'processing' ? { ...r, status: 'paid' } : r));
      toast.success('Đã hoàn tất thanh toán lương tháng ' + month);
    }, 2000);
  };

  const allPaid = filtered.every(r => r.status === 'paid');
  const hasDraft = filtered.some(r => r.status === 'draft');

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Bảng lương"
        action={
          <div className="flex items-center gap-2">
            <input
              type="month"
              value={month}
              onChange={e => setMonth(e.target.value)}
              className="px-3 py-2 text-sm rounded-xl border outline-none"
              style={{ borderColor: 'var(--border)', background: 'var(--surface-strong)', color: 'var(--ink)' }}
            />
            <GhostBtn onClick={() => toast.success('Xuất PDF bảng lương')}>
              <Download size={15} /> Xuất PDF
            </GhostBtn>
            {hasDraft && (
              <PrimaryBtn onClick={processAll}>
                <Play size={15} /> Xử lý lương
              </PrimaryBtn>
            )}
            {allPaid && (
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
                <CheckCircle size={15} /> Đã thanh toán
              </div>
            )}
          </div>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Tổng lương cơ bản" value={formatVND(totalBase)} />
        <StatCard label="Tổng khấu trừ" value={formatVND(totalDeduction)} />
        <StatCard label="Tổng thực chi" value={formatVND(totalNet)} sub="Tháng 10/2026" />
      </div>

      <Table headers={['Nhân viên', 'Phòng ban', 'Lương cơ bản', 'Phụ cấp', 'Khấu trừ', 'Thực nhận', 'Trạng thái']}>
        {filtered.map(r => (
          <Tr key={r.id}>
            <Td>
              <div>
                <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{r.name}</p>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>{r.position}</p>
              </div>
            </Td>
            <Td>{r.department}</Td>
            <Td><span className="tabular-nums">{formatVND(r.base)}</span></Td>
            <Td><span className="tabular-nums text-green-700">+{formatVND(r.allowance)}</span></Td>
            <Td><span className="tabular-nums text-red-600">-{formatVND(r.deduction)}</span></Td>
            <Td>
              <span className="tabular-nums font-bold" style={{ color: 'var(--ink)' }}>{formatVND(r.net)}</span>
            </Td>
            <Td><Badge status={r.status} /></Td>
          </Tr>
        ))}
      </Table>
    </div>
  );
}
