import { useState } from 'react';
import { Plus, Edit2, PowerOff } from 'lucide-react';
import { SectionHeader, Table, Tr, Td, Badge, Avatar, PrimaryBtn, GhostBtn } from '../../components/ui';
import { USERS } from '../../mockData';
import type { User, Role } from '../../types';
import { toast } from 'sonner';

type ModalState = { open: boolean; user: Partial<User> };

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(USERS);
  const [modal, setModal] = useState<ModalState>({ open: false, user: {} });

  const openCreate = () => setModal({ open: true, user: { role: 'employee', status: 'active' } });
  const openEdit = (u: User) => setModal({ open: true, user: { ...u } });
  const closeModal = () => setModal({ open: false, user: {} });

  const toggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
    toast.success('Đã cập nhật trạng thái tài khoản');
  };

  const saveUser = () => {
    if (!modal.user.name || !modal.user.email) { toast.error('Vui lòng điền đầy đủ thông tin'); return; }
    if (modal.user.id) {
      setUsers(prev => prev.map(u => u.id === modal.user.id ? { ...u, ...modal.user } : u));
      toast.success('Đã cập nhật tài khoản');
    } else {
      const newUser: User = { id: 'u' + Date.now(), name: modal.user.name, email: modal.user.email, role: modal.user.role || 'employee', department: modal.user.department || '', status: 'active', createdAt: new Date().toISOString().split('T')[0], avatar: modal.user.name.split(' ').map(w => w[0]).slice(-2).join('').toUpperCase() };
      setUsers(prev => [...prev, newUser]);
      toast.success('Đã tạo tài khoản mới');
    }
    closeModal();
  };

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Quản lý tài khoản"
        action={<PrimaryBtn onClick={openCreate}><Plus size={16} /> Tạo tài khoản</PrimaryBtn>}
      />

      <Table headers={['Người dùng', 'Email', 'Vai trò', 'Phòng ban', 'Ngày tạo', 'Trạng thái', '']}>
        {users.map(u => (
          <Tr key={u.id}>
            <Td>
              <div className="flex items-center gap-2.5">
                <Avatar initials={u.avatar} size="sm" />
                <span className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{u.name}</span>
              </div>
            </Td>
            <Td><span className="text-sm">{u.email}</span></Td>
            <Td><Badge status={u.role} /></Td>
            <Td>{u.department}</Td>
            <Td><span className="tabular-nums text-sm">{u.createdAt}</span></Td>
            <Td><Badge status={u.status} /></Td>
            <Td>
              <div className="flex items-center gap-1">
                <GhostBtn onClick={() => openEdit(u)}><Edit2 size={14} /></GhostBtn>
                <GhostBtn onClick={() => toggleStatus(u.id)} danger={u.status === 'active'}>
                  <PowerOff size={14} />
                </GhostBtn>
              </div>
            </Td>
          </Tr>
        ))}
      </Table>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="w-full max-w-md rounded-2xl p-6 shadow-2xl" style={{ background: 'var(--surface-strong)' }}>
            <h3 className="display font-bold text-lg mb-5" style={{ color: 'var(--ink)' }}>
              {modal.user.id ? 'Chỉnh sửa tài khoản' : 'Tạo tài khoản mới'}
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Họ và tên', field: 'name' as const, type: 'text' },
                { label: 'Email', field: 'email' as const, type: 'email' },
                { label: 'Phòng ban', field: 'department' as const, type: 'text' },
              ].map(({ label, field, type }) => (
                <div key={field}>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>{label}</label>
                  <input
                    type={type}
                    value={modal.user[field] as string || ''}
                    onChange={e => setModal(m => ({ ...m, user: { ...m.user, [field]: e.target.value } }))}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border outline-none"
                    style={{ borderColor: 'var(--border)', background: 'var(--surface-muted)', color: 'var(--ink)' }}
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>Vai trò</label>
                <select
                  value={modal.user.role || 'employee'}
                  onChange={e => setModal(m => ({ ...m, user: { ...m.user, role: e.target.value as Role } }))}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border outline-none"
                  style={{ borderColor: 'var(--border)', background: 'var(--surface-muted)', color: 'var(--ink)' }}
                >
                  <option value="admin">Admin</option>
                  <option value="hr_manager">HR Manager</option>
                  <option value="employee">Nhân viên</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <PrimaryBtn onClick={saveUser}>Lưu</PrimaryBtn>
              <GhostBtn onClick={closeModal}>Hủy</GhostBtn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
