import { Plus, Users } from 'lucide-react';
import { SectionHeader, Card, Badge, PrimaryBtn } from '../../components/ui';
import { JOB_OPENINGS } from '../../mockData';
import { toast } from 'sonner';

const TYPE_LABELS: Record<string, string> = {
  full_time: 'Toàn thời gian',
  part_time: 'Bán thời gian',
  contract: 'Hợp đồng',
};

export default function Recruitment() {
  return (
    <div className="space-y-5">
      <SectionHeader
        title="Tuyển dụng"
        action={
          <PrimaryBtn onClick={() => toast.success('Tạo vị trí tuyển dụng mới')}>
            <Plus size={16} /> Đăng tin tuyển dụng
          </PrimaryBtn>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {JOB_OPENINGS.map(job => (
          <Card key={job.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <Badge status={job.status} />
              <span className="text-xs" style={{ color: 'var(--subtle)' }}>{job.openDate}</span>
            </div>
            <h3 className="display font-bold text-lg mb-1" style={{ color: 'var(--ink)' }}>{job.title}</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>{job.department} · {TYPE_LABELS[job.type]}</p>

            <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-1.5" style={{ color: 'var(--ink-2)' }}>
                <Users size={14} />
                <span className="text-sm tabular-nums font-semibold">{job.applicants} ứng viên</span>
              </div>
              <button
                onClick={() => toast.info('Xem danh sách ứng viên: ' + job.title)}
                className="text-sm font-medium transition-colors hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                Xem chi tiết →
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
