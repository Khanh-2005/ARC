export type Role = 'admin' | 'hr_manager' | 'employee';

export type NavItem = {
  id: string;
  label: string;
  icon: string;
  roles: Role[];
};

export type Employee = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  department: string;
  position: string;
  status: 'active' | 'inactive' | 'on_leave';
  startDate: string;
  salary: number;
  role: Role;
  phone: string;
  contractType: 'full_time' | 'part_time' | 'contract';
  contractEnd?: string;
};

export type LeaveRequest = {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: string;
  department: string;
  type: 'annual' | 'sick' | 'personal' | 'maternity';
  from: string;
  to: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
};

export type PayrollRecord = {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  position: string;
  base: number;
  allowance: number;
  deduction: number;
  net: number;
  month: string;
  status: 'draft' | 'processing' | 'paid';
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  status: 'active' | 'inactive';
  createdAt: string;
  avatar: string;
};

export type Department = {
  id: string;
  name: string;
  head: string;
  headcount: number;
};

export type JobOpening = {
  id: string;
  title: string;
  department: string;
  type: 'full_time' | 'part_time' | 'contract';
  applicants: number;
  openDate: string;
  status: 'open' | 'closed' | 'paused';
};
