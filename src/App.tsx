import { useState } from 'react';
import type { Role } from './types';
import Layout from './components/Layout';

// HR Manager pages
import Dashboard from './pages/hr/Dashboard';
import Employees from './pages/hr/Employees';
import Leave from './pages/hr/Leave';
import Payroll from './pages/hr/Payroll';
import Recruitment from './pages/hr/Recruitment';

// Admin pages
import UserManagement from './pages/admin/UserManagement';
import Departments from './pages/admin/Departments';
import PayrollConfig from './pages/admin/PayrollConfig';

// Employee pages
import MyProfile from './pages/employee/MyProfile';
import MyLeave from './pages/employee/MyLeave';
import MyPayslip from './pages/employee/MyPayslip';
import MyContract from './pages/employee/MyContract';

const DEFAULT_PAGE: Record<Role, string> = {
  admin: 'dashboard',
  hr_manager: 'dashboard',
  employee: 'my_profile',
};

function PageRouter({ page }: { role: Role; page: string }) {
  // HR Manager + Admin shared pages
  if (page === 'dashboard') return <Dashboard />;
  if (page === 'employees') return <Employees />;
  if (page === 'leave') return <Leave />;
  if (page === 'payroll') return <Payroll />;
  if (page === 'recruitment') return <Recruitment />;

  // Admin-only pages
  if (page === 'user_management') return <UserManagement />;
  if (page === 'departments') return <Departments />;
  if (page === 'payroll_config') return <PayrollConfig />;

  // Employee pages
  if (page === 'my_profile') return <MyProfile />;
  if (page === 'my_leave') return <MyLeave />;
  if (page === 'my_payslip') return <MyPayslip />;
  if (page === 'my_contract') return <MyContract />;

  return (
    <div className="flex items-center justify-center h-64">
      <p className="text-sm" style={{ color: 'var(--muted)' }}>Trang không tồn tại</p>
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState<Role>('hr_manager');
  const [page, setPage] = useState<string>(DEFAULT_PAGE['hr_manager']);

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    setPage(DEFAULT_PAGE[newRole]);
  };

  return (
    <Layout role={role} onRoleChange={handleRoleChange} activePage={page} onNavigate={setPage}>
      <PageRouter role={role} page={page} />
    </Layout>
  );
}
