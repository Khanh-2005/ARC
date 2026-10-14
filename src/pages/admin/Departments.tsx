import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { SectionHeader, Card, PrimaryBtn, GhostBtn } from '../../components/ui';
import { DEPARTMENTS } from '../../mockData';
import type { Department } from '../../types';
import { toast } from 'sonner';

export default function Departments() {
  const [depts, setDepts] = useState<Department[]>(DEPARTMENTS);
  const [form, setForm] = useState<Partial<Department> | null>(null);

  const save = () => {
    if (!form?.name) { toast.error('Vui lòng nhập tên phòng ban'); return; }
    if (form.id) {
      setDepts(prev => prev.map(d => d.id === form.id ? { ...d, ...form } : d));
      toast.success('Đã cập nhật phòng ban');
    } else {
      setDepts(prev => [...prev, { id: 'd' + Date.now(), name: form.name!, head: form.head || '', headcount: 0 }]);
      toast.success('Đã thêm phòng ban mới');
    }
    setForm(null);
  };

  const remove = (id: string) => {
    setDepts(prev => prev.filter(d => d.id !== id));
    toast.success('Đã xóa phòng ban');
  };

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Quản lý phòng ban"
        action={<PrimaryBtn onClick={() => setForm({})}><Plus size={16} /> Thêm phòng ban</PrimaryBtn>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {depts.map(d => (
          <Card key={d.id} className="group">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold display text-base mb-3"
                style={{ background: 'var(--accent)' }}>
                {d.name[0]}
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <GhostBtn onClick={() => setForm({ ...d })}><Edit2 size={14} /></GhostBtn>
                <GhostBtn onClick={() => remove(d.id)} danger><Trash2 size={14} /></GhostBtn>
              </div>
            </div>
            <h3 className="display font-bold text-lg" style={{ color: 'var(--ink)' }}>{d.name}</h3>
            <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>Trưởng phòng: {d.head || 'Chưa xác định'}</p>
            <div className="flex items-center justify-between mt-4 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--subtle)' }}>Nhân viên</span>
              <span className="display font-bold text-2xl tabular-nums" style={{ color: 'var(--ink)' }}>{d.headcount}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal */}
      {form !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="w-full max-w-md rounded-2xl p-6 shadow-2xl" style={{ background: 'var(--surface-strong)' }}>
            <h3 className="display font-bold text-lg mb-5" style={{ color: 'var(--ink)' }}>
              {form.id ? 'Chỉnh sửa phòng ban' : 'Thêm phòng ban mới'}
            </h3>
            <div className="space-y-4">
              {[{ label: 'Tên phòng ban', field: 'name' as const }, { label: 'Trưởng phòng', field: 'head' as const }].map(({ label, field }) => (
                <div key={field}>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>{label}</label>
                  <input
                    type="text"
                    value={form[field] as string || ''}
                    onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border outline-none"
                    style={{ borderColor: 'var(--border)', background: 'var(--surface-muted)', color: 'var(--ink)' }}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-6">
              <PrimaryBtn onClick={save}>Lưu</PrimaryBtn>
              <GhostBtn onClick={() => setForm(null)}>Hủy</GhostBtn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
