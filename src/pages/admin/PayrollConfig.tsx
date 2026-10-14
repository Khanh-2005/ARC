import { useState } from 'react';
import { Save } from 'lucide-react';
import { SectionHeader, Card, PrimaryBtn } from '../../components/ui';
import { toast } from 'sonner';

type Config = {
  incomeTax: number;
  socialInsurance: number;
  healthInsurance: number;
  unemploymentInsurance: number;
  mealAllowance: number;
  transportAllowance: number;
  phoneAllowance: number;
};

const DEFAULT_CONFIG: Config = {
  incomeTax: 10,
  socialInsurance: 8,
  healthInsurance: 1.5,
  unemploymentInsurance: 1,
  mealAllowance: 730000,
  transportAllowance: 500000,
  phoneAllowance: 300000,
};

const SENIORITY_LEVELS = [
  { level: 'Junior (0-2 năm)', multiplier: 1.0 },
  { level: 'Mid (2-5 năm)', multiplier: 1.3 },
  { level: 'Senior (5-8 năm)', multiplier: 1.6 },
  { level: 'Lead (8+ năm)', multiplier: 2.0 },
];

export default function PayrollConfig() {
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);

  const updateField = (field: keyof Config, value: number) => {
    setConfig(c => ({ ...c, [field]: value }));
  };

  const save = () => toast.success('Đã lưu cấu hình lương');

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Cấu hình lương"
        action={<PrimaryBtn onClick={save}><Save size={16} /> Lưu thay đổi</PrimaryBtn>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Deductions */}
        <Card>
          <h3 className="font-bold text-base mb-4" style={{ color: 'var(--ink)' }}>Khấu trừ bắt buộc</h3>
          <p className="text-xs mb-4" style={{ color: 'var(--muted)' }}>Tỷ lệ tính trên lương cơ bản</p>
          <div className="space-y-4">
            {[
              { label: 'Thuế TNCN', key: 'incomeTax' as keyof Config, suffix: '%' },
              { label: 'BHXH (Người LĐ)', key: 'socialInsurance' as keyof Config, suffix: '%' },
              { label: 'BHYT (Người LĐ)', key: 'healthInsurance' as keyof Config, suffix: '%' },
              { label: 'BHTN (Người LĐ)', key: 'unemploymentInsurance' as keyof Config, suffix: '%' },
            ].map(({ label, key, suffix }) => (
              <div key={key} className="flex items-center justify-between gap-4">
                <label className="text-sm flex-1" style={{ color: 'var(--ink-2)' }}>{label}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={config[key]}
                    onChange={e => updateField(key, parseFloat(e.target.value) || 0)}
                    min={0}
                    max={100}
                    step={0.5}
                    className="w-20 px-3 py-2 text-sm rounded-xl border text-right outline-none tabular-nums"
                    style={{ borderColor: 'var(--border)', background: 'var(--surface-muted)', color: 'var(--ink)' }}
                  />
                  <span className="text-sm w-4" style={{ color: 'var(--muted)' }}>{suffix}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--muted)' }}>Tổng khấu trừ</span>
              <span className="font-bold tabular-nums" style={{ color: 'var(--danger)' }}>
                {(config.incomeTax + config.socialInsurance + config.healthInsurance + config.unemploymentInsurance).toFixed(1)}%
              </span>
            </div>
          </div>
        </Card>

        {/* Allowances */}
        <Card>
          <h3 className="font-bold text-base mb-4" style={{ color: 'var(--ink)' }}>Phụ cấp cố định</h3>
          <p className="text-xs mb-4" style={{ color: 'var(--muted)' }}>Áp dụng cho toàn bộ nhân viên</p>
          <div className="space-y-4">
            {[
              { label: 'Phụ cấp ăn trưa', key: 'mealAllowance' as keyof Config },
              { label: 'Phụ cấp đi lại', key: 'transportAllowance' as keyof Config },
              { label: 'Phụ cấp điện thoại', key: 'phoneAllowance' as keyof Config },
            ].map(({ label, key }) => (
              <div key={key} className="flex items-center justify-between gap-4">
                <label className="text-sm flex-1" style={{ color: 'var(--ink-2)' }}>{label}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={config[key]}
                    onChange={e => updateField(key, parseInt(e.target.value) || 0)}
                    step={50000}
                    className="w-28 px-3 py-2 text-sm rounded-xl border text-right outline-none tabular-nums"
                    style={{ borderColor: 'var(--border)', background: 'var(--surface-muted)', color: 'var(--ink)' }}
                  />
                  <span className="text-xs w-8" style={{ color: 'var(--muted)' }}>VND</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--muted)' }}>Tổng phụ cấp</span>
              <span className="font-bold tabular-nums" style={{ color: 'var(--success)' }}>
                {new Intl.NumberFormat('vi-VN').format(config.mealAllowance + config.transportAllowance + config.phoneAllowance)} VND
              </span>
            </div>
          </div>
        </Card>

        {/* Seniority */}
        <Card className="lg:col-span-2">
          <h3 className="font-bold text-base mb-4" style={{ color: 'var(--ink)' }}>Hệ số lương theo cấp bậc</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SENIORITY_LEVELS.map(s => (
              <div key={s.level} className="p-4 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--surface-muted)' }}>
                <p className="text-xs font-semibold mb-2" style={{ color: 'var(--muted)' }}>{s.level}</p>
                <p className="display font-bold text-2xl tabular-nums" style={{ color: 'var(--ink)' }}>x{s.multiplier}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
