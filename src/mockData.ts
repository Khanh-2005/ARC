import type { Employee, LeaveRequest, PayrollRecord, User, Department, JobOpening } from './types';

export const EMPLOYEES: Employee[] = [
  { id: 'e1', name: 'Nguyễn Văn An', email: 'an.nguyen@company.vn', avatar: 'NA', department: 'Kỹ thuật', position: 'Senior Engineer', status: 'active', startDate: '2021-03-15', salary: 28000000, role: 'employee', phone: '0901234567', contractType: 'full_time', contractEnd: '2025-03-14' },
  { id: 'e2', name: 'Trần Thị Bình', email: 'binh.tran@company.vn', avatar: 'TB', department: 'Marketing', position: 'Marketing Lead', status: 'active', startDate: '2020-07-01', salary: 22000000, role: 'employee', phone: '0912345678', contractType: 'full_time', contractEnd: '2024-12-31' },
  { id: 'e3', name: 'Lê Minh Cường', email: 'cuong.le@company.vn', avatar: 'LC', department: 'Kỹ thuật', position: 'Frontend Developer', status: 'on_leave', startDate: '2022-01-10', salary: 18000000, role: 'employee', phone: '0923456789', contractType: 'full_time', contractEnd: '2025-01-09' },
  { id: 'e4', name: 'Phạm Thu Dung', email: 'dung.pham@company.vn', avatar: 'PD', department: 'Nhân sự', position: 'HR Specialist', status: 'active', startDate: '2019-05-20', salary: 15000000, role: 'hr_manager', phone: '0934567890', contractType: 'full_time' },
  { id: 'e5', name: 'Hoàng Văn Em', email: 'em.hoang@company.vn', avatar: 'HE', department: 'Tài chính', position: 'Accountant', status: 'active', startDate: '2022-09-05', salary: 17000000, role: 'employee', phone: '0945678901', contractType: 'full_time', contractEnd: '2025-09-04' },
  { id: 'e6', name: 'Vũ Thị Phương', email: 'phuong.vu@company.vn', avatar: 'VP', department: 'Kinh doanh', position: 'Sales Manager', status: 'active', startDate: '2020-11-15', salary: 25000000, role: 'employee', phone: '0956789012', contractType: 'full_time' },
  { id: 'e7', name: 'Đặng Quốc Tuấn', email: 'tuan.dang@company.vn', avatar: 'DT', department: 'Kỹ thuật', position: 'Backend Developer', status: 'active', startDate: '2023-02-01', salary: 20000000, role: 'employee', phone: '0967890123', contractType: 'full_time', contractEnd: '2025-01-31' },
  { id: 'e8', name: 'Ngô Thị Hoa', email: 'hoa.ngo@company.vn', avatar: 'NH', department: 'Marketing', position: 'Content Creator', status: 'inactive', startDate: '2021-08-20', salary: 12000000, role: 'employee', phone: '0978901234', contractType: 'part_time' },
];

export const LEAVE_REQUESTS: LeaveRequest[] = [
  { id: 'l1', employeeId: 'e1', employeeName: 'Nguyễn Văn An', avatar: 'NA', department: 'Kỹ thuật', type: 'annual', from: '2026-10-20', to: '2026-10-22', days: 3, reason: 'Du lịch gia đình', status: 'pending', appliedAt: '2026-10-14' },
  { id: 'l2', employeeId: 'e3', employeeName: 'Lê Minh Cường', avatar: 'LC', department: 'Kỹ thuật', type: 'sick', from: '2026-10-13', to: '2026-10-15', days: 3, reason: 'Sốt, cần nghỉ ngơi', status: 'approved', appliedAt: '2026-10-12' },
  { id: 'l3', employeeId: 'e6', employeeName: 'Vũ Thị Phương', avatar: 'VP', department: 'Kinh doanh', type: 'personal', from: '2026-10-18', to: '2026-10-18', days: 1, reason: 'Việc cá nhân khẩn cấp', status: 'pending', appliedAt: '2026-10-13' },
  { id: 'l4', employeeId: 'e5', employeeName: 'Hoàng Văn Em', avatar: 'HE', department: 'Tài chính', type: 'annual', from: '2026-11-01', to: '2026-11-05', days: 5, reason: 'Nghỉ lễ', status: 'approved', appliedAt: '2026-10-10' },
  { id: 'l5', employeeId: 'e2', employeeName: 'Trần Thị Bình', avatar: 'TB', department: 'Marketing', type: 'annual', from: '2026-10-25', to: '2026-10-26', days: 2, reason: 'Việc cá nhân', status: 'rejected', appliedAt: '2026-10-08' },
];

export const PAYROLL: PayrollRecord[] = [
  { id: 'p1', employeeId: 'e1', name: 'Nguyễn Văn An', department: 'Kỹ thuật', position: 'Senior Engineer', base: 28000000, allowance: 3000000, deduction: 4500000, net: 26500000, month: '2026-10', status: 'draft' },
  { id: 'p2', employeeId: 'e2', name: 'Trần Thị Bình', department: 'Marketing', position: 'Marketing Lead', base: 22000000, allowance: 2000000, deduction: 3600000, net: 20400000, month: '2026-10', status: 'draft' },
  { id: 'p3', employeeId: 'e3', name: 'Lê Minh Cường', department: 'Kỹ thuật', position: 'Frontend Developer', base: 18000000, allowance: 1500000, deduction: 2900000, net: 16600000, month: '2026-10', status: 'draft' },
  { id: 'p4', employeeId: 'e5', name: 'Hoàng Văn Em', department: 'Tài chính', position: 'Accountant', base: 17000000, allowance: 1200000, deduction: 2800000, net: 15400000, month: '2026-10', status: 'draft' },
  { id: 'p5', employeeId: 'e6', name: 'Vũ Thị Phương', department: 'Kinh doanh', position: 'Sales Manager', base: 25000000, allowance: 5000000, deduction: 4500000, net: 25500000, month: '2026-10', status: 'draft' },
  { id: 'p6', employeeId: 'e7', name: 'Đặng Quốc Tuấn', department: 'Kỹ thuật', position: 'Backend Developer', base: 20000000, allowance: 1800000, deduction: 3300000, net: 18500000, month: '2026-10', status: 'draft' },
];

export const USERS: User[] = [
  { id: 'u1', name: 'Admin Hệ Thống', email: 'admin@company.vn', role: 'admin', department: 'Quản trị', status: 'active', createdAt: '2019-01-01', avatar: 'AH' },
  { id: 'u2', name: 'Phạm Thu Dung', email: 'dung.pham@company.vn', role: 'hr_manager', department: 'Nhân sự', status: 'active', createdAt: '2019-05-20', avatar: 'PD' },
  { id: 'u3', name: 'Nguyễn Văn An', email: 'an.nguyen@company.vn', role: 'employee', department: 'Kỹ thuật', status: 'active', createdAt: '2021-03-15', avatar: 'NA' },
  { id: 'u4', name: 'Trần Thị Bình', email: 'binh.tran@company.vn', role: 'employee', department: 'Marketing', status: 'active', createdAt: '2020-07-01', avatar: 'TB' },
  { id: 'u5', name: 'Lê Minh Cường', email: 'cuong.le@company.vn', role: 'employee', department: 'Kỹ thuật', status: 'inactive', createdAt: '2022-01-10', avatar: 'LC' },
];

export const DEPARTMENTS: Department[] = [
  { id: 'd1', name: 'Kỹ thuật', head: 'Nguyễn Văn An', headcount: 3 },
  { id: 'd2', name: 'Marketing', head: 'Trần Thị Bình', headcount: 2 },
  { id: 'd3', name: 'Nhân sự', head: 'Phạm Thu Dung', headcount: 1 },
  { id: 'd4', name: 'Tài chính', head: 'Hoàng Văn Em', headcount: 1 },
  { id: 'd5', name: 'Kinh doanh', head: 'Vũ Thị Phương', headcount: 1 },
];

export const JOB_OPENINGS: JobOpening[] = [
  { id: 'j1', title: 'Fullstack Developer', department: 'Kỹ thuật', type: 'full_time', applicants: 12, openDate: '2026-10-01', status: 'open' },
  { id: 'j2', title: 'Digital Marketing Specialist', department: 'Marketing', type: 'full_time', applicants: 8, openDate: '2026-09-20', status: 'open' },
  { id: 'j3', title: 'Sales Executive', department: 'Kinh doanh', type: 'full_time', applicants: 5, openDate: '2026-10-05', status: 'open' },
  { id: 'j4', title: 'UX Designer', department: 'Kỹ thuật', type: 'contract', applicants: 3, openDate: '2026-09-15', status: 'paused' },
];

// Current logged-in user (for demo switching)
export const CURRENT_USERS = {
  admin: USERS[0],
  hr_manager: USERS[1],
  employee: USERS[2],
};
