import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Card, Badge, PrimaryBtn, GhostBtn, formatVND } from '../../components/ui';
import { EMPLOYEES } from '../../mockData';
import { toast } from 'sonner';

export default function MyProfile() {
  const me = EMPLOYEES[0]; // Nguyễn Văn An
  const [tab, setTab] = useState<'personal' | 'emergency' | 'bank'>('personal');
  const [editMode, setEditMode] = useState(false);
  const [phone, setPhone] = useState(me.phone);

  const requestUpdate = () => {
    toast.success('Đã gửi yêu cầu cập nhật thông tin. HR sẽ xem xét và phê duyệt.');
    setEditMode(false);
  };

  return (
    <div className="max-w-2xl space-y-5">
      <h1 className="display font-bold text-2xl" style={{ color: 'var(--ink)' }}>Hồ sơ của tôi</h1>

      {/* Hero card */}
      <Card>
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold display flex-shrink-0"
            style={{ background: 'var(--accent)' }}>
            {me.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="display font-bold text-xl" style={{ color: 'var(--ink)' }}>{me.name}</h2>
              <Badge status={me.status} />
            </div>
            <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>{me.position} · {me.department}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--subtle)' }}>Ngày vào: {me.startDate}</p>
          </div>
          {!editMode ? (
            <GhostBtn onClick={() => setEditMode(true)}>Yêu cầu cập nhật</GhostBtn>
          ) : (
            <div className="flex gap-2">
              <PrimaryBtn onClick={requestUpdate}>Gửi yêu cầu</PrimaryBtn>
              <GhostBtn onClick={() => setEditMode(false)}>Hủy</GhostBtn>
            </div>
          )}
        </div>
        {editMode && (
          <div className="mt-4 px-4 py-3 rounded-xl flex items-start gap-2" style={{ background: 'var(--warning-bg)' }}>
            <AlertCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--warning)' }} />
            <p className="text-xs" style={{ color: 'var(--warning)' }}>Thay đổi sẽ được gửi cho HR để xem xét và phê duyệt trước khi cập nhật.</p>
          </div>
        )}
      </Card>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: 'var(--surface-muted)' }}>
        {(['personal', 'emergency', 'bank'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t ? 'text-white shadow-sm' : ''}`}
            style={tab === t ? { background: 'var(--accent)' } : { color: 'var(--muted)' }}
          >
            {{ personal: 'Cá nhân', emergency: 'Khẩn cấp', bank: 'Ngân hàng' }[t]}
          </button>
        ))}
      </div>

      {tab === 'personal' && (
        <Card>
          <div className="space-y-0">
            {[
              { label: 'Họ và tên', value: me.name, editable: false },
              { label: 'Email', value: me.email, editable: false },
              { label: 'Số điện thoại', value: phone, editable: true },
              { label: 'Phòng ban', value: me.department, editable: false },
              { label: 'Vị trí', value: me.position, editable: false },
              { label: 'Loại hợp đồng', value: me.contractType, editable: false },
            ].map(({ label, value, editable }) => (
              <div key={label} className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                <span className="text-sm" style={{ color: 'var(--muted)' }}>{label}</span>
                {editMode && editable ? (
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="px-3 py-1.5 text-sm rounded-xl border outline-none text-right"
                    style={{ borderColor: 'var(--accent)', background: 'var(--surface-muted)', color: 'var(--ink)' }}
                  />
                ) : (
                  <span className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{value}</span>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'emergency' && (
        <Card>
          <p className="text-sm text-center py-4" style={{ color: 'var(--muted)' }}>Chưa có thông tin liên hệ khẩn cấp. Nhấn "Yêu cầu cập nhật" để thêm.</p>
        </Card>
      )}

      {tab === 'bank' && (
        <Card>
          <div className="space-y-0">
            {[
              ['Ngân hàng', 'Vietcombank'],
              ['Số tài khoản', '••••••••8901'],
              ['Tên chủ tài khoản', me.name.toUpperCase()],
              ['Chi nhánh', 'Hà Nội'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-3 border-b last:border-0 text-sm" style={{ borderColor: 'var(--border)' }}>
                <span style={{ color: 'var(--muted)' }}>{k}</span>
                <span className="font-medium" style={{ color: 'var(--ink)' }}>{v}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Salary summary */}
      <Card>
        <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--ink)' }}>Thông tin lương</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: 'var(--muted)' }}>Lương cơ bản</span>
          <span className="display font-bold text-2xl tabular-nums" style={{ color: 'var(--ink)' }}>
            {formatVND(me.salary)}
          </span>
        </div>
      </Card>
    </div>
  );
}
