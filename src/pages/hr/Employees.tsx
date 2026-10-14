import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';

import { SectionHeader, Table, Tr, Td, Badge, Avatar, PrimaryBtn, GhostBtn, Card, formatVND } from '../../components/ui';
import { EMPLOYEES } from '../../mockData';
import type { Employee } from '../../types';

import { toast } from 'sonner';

const NOW_MS = Date.now();

export default function Employees() {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [selected, setSelected] = useState<Employee | null>(null);

  const depts = ['all', ...Array.from(new Set(EMPLOYEES.map(e => e.department)))];
  const filtered = EMPLOYEES.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.position.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === 'all' || e.department === deptFilter;
    return matchSearch && matchDept;
  });

  if (selected) {
    return <EmployeeDetail employee={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Danh sách nhân viên"
        action={
          <PrimaryBtn onClick={() => toast.success('Chức năng thêm nhân viên mới')}>
            <Plus size={16} /> Thêm nhân viên
          </PrimaryBtn>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48 max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm nhân viên..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border outline-none"
            style={{ borderColor: 'var(--border)', background: 'var(--surface-strong)', color: 'var(--ink)' }}
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter size={14} style={{ color: 'var(--muted)' }} />
          {depts.map(d => (
            <button
              key={d}
              onClick={() => setDeptFilter(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${deptFilter === d ? 'text-white' : 'hover:bg-gray-100'}`}
              style={deptFilter === d ? { background: 'var(--accent)', color: 'white' } : { color: 'var(--muted)' }}
            >
              {d === 'all' ? 'Tất cả' : d}
            </button>
          ))}
        </div>
        <span className="text-xs ml-auto" style={{ color: 'var(--muted)' }}>{filtered.length} nhân viên</span>
      </div>

      <Table headers={['Nhân viên', 'Phòng ban', 'Vị trí', 'Loại HĐ', 'Lương cơ bản', 'Trạng thái', '']}>
        {filtered.map(e => (
          <Tr key={e.id} onClick={() => setSelected(e)}>
            <Td>
              <div className="flex items-center gap-2.5">
                <Avatar initials={e.avatar} size="sm" />
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{e.name}</p>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>{e.email}</p>
                </div>
              </div>
            </Td>
            <Td>{e.department}</Td>
            <Td>{e.position}</Td>
            <Td><Badge status={e.contractType} /></Td>
            <Td><span className="tabular-nums font-medium">{formatVND(e.salary)}</span></Td>
            <Td><Badge status={e.status} /></Td>
            <Td>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                <GhostBtn onClick={() => { toast.success('Chỉnh sửa: ' + e.name); }}>Sửa</GhostBtn>
              </div>
            </Td>
          </Tr>
        ))}
      </Table>
    </div>
  );
}

function EmployeeDetail({ employee: e, onBack }: { employee: Employee; onBack: () => void }) {
  const [tab, setTab] = useState<'info' | 'contract' | 'leave'>('info');
  const leaveHistory = [
    { type: 'annual', from: '2026-08-15', to: '2026-08-17', days: 3, status: 'approved' },
    { type: 'sick', from: '2026-06-10', to: '2026-06-10', days: 1, status: 'approved' },
  ];
  return (
    <div className="space-y-5">
      <button onClick={onBack} className="text-sm flex items-center gap-1 hover:underline" style={{ color: 'var(--accent)' }}>
        ← Quay lại danh sách
      </button>
      {/* Hero */}
      <Card>
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold display flex-shrink-0"
            style={{ background: 'var(--accent)' }}>
            {e.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="display font-bold text-xl" style={{ color: 'var(--ink)' }}>{e.name}</h2>
              <Badge status={e.status} />
              <Badge status={e.role} />
            </div>
            <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>{e.position} · {e.department}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--subtle)' }}>Ngày vào: {e.startDate} · {e.phone}</p>
          </div>
          <PrimaryBtn onClick={() => toast.success('Chỉnh sửa hồ sơ')}>Chỉnh sửa</PrimaryBtn>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: 'var(--surface-muted)' }}>
        {(['info', 'contract', 'leave'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t ? 'text-white shadow-sm' : ''}`}
            style={tab === t ? { background: 'var(--accent)' } : { color: 'var(--muted)' }}
          >
            {{ info: 'Thông tin', contract: 'Hợp đồng', leave: 'Nghỉ phép' }[t]}
          </button>
        ))}
      </div>

      {tab === 'info' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Thông tin cơ bản</h3>
            {[
              ['Họ và tên', e.name], ['Email', e.email], ['Điện thoại', e.phone],
              ['Phòng ban', e.department], ['Vị trí', e.position], ['Ngày vào làm', e.startDate],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2.5 border-b last:border-0 text-sm" style={{ borderColor: 'var(--border)' }}>
                <span style={{ color: 'var(--muted)' }}>{k}</span>
                <span className="font-medium" style={{ color: 'var(--ink)' }}>{v}</span>
              </div>
            ))}
          </Card>
          <Card>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Thông tin lương</h3>
            {[
              ['Lương cơ bản', formatVND(e.salary)],
              ['Loại hợp đồng', e.contractType],
              ['Hết hạn HĐ', e.contractEnd || 'Không xác định'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2.5 border-b last:border-0 text-sm" style={{ borderColor: 'var(--border)' }}>
                <span style={{ color: 'var(--muted)' }}>{k}</span>
                <span className="font-medium tabular-nums" style={{ color: 'var(--ink)' }}>{v}</span>
              </div>
            ))}
          </Card>
        </div>
      )}
      {tab === 'contract' && (
        <Card>
          <h3 className="font-semibold mb-4" style={{ color: 'var(--ink)' }}>Lịch sử hợp đồng</h3>
          {[{ type: e.contractType, start: e.startDate, end: e.contractEnd || 'Không xác định', status: e.contractEnd && new Date(e.contractEnd).getTime() > NOW_MS ? 'active' : 'inactive' }].map((c, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl mb-3" style={{ background: 'var(--surface-muted)' }}>
              <div className="flex-1">
                <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{e.contractType === 'full_time' ? 'Hợp đồng toàn thời gian' : 'Hợp đồng bán thời gian'}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{c.start} → {c.end}</p>
              </div>
              <Badge status={c.status} />
            </div>
          ))}
        </Card>
      )}
      {tab === 'leave' && (
        <Card>
          <h3 className="font-semibold mb-4" style={{ color: 'var(--ink)' }}>Lịch sử nghỉ phép</h3>
          {leaveHistory.map((l, i) => (
            <div key={i} className="flex items-center gap-4 py-3 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
              <Badge status={l.type} />
              <div className="flex-1 text-sm" style={{ color: 'var(--ink-2)' }}>{l.from} → {l.to} ({l.days} ngày)</div>
              <Badge status={l.status} />
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
