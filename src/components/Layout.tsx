import { useState } from 'react';
import {
  LayoutDashboard, Users, Calendar, DollarSign, Briefcase,
  Settings, UserCog, ChevronRight, Bell, Search,
  Menu, X, FileText, User, ClipboardList, Building2
} from 'lucide-react';
import type { Role } from '../types';
import { CURRENT_USERS } from '../mockData';

type NavItem = { id: string; label: string; icon: React.ReactNode; roles: Role[] };

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} />, roles: ['admin', 'hr_manager'] },
  { id: 'employees', label: 'Nhân viên', icon: <Users size={18} />, roles: ['admin', 'hr_manager'] },
  { id: 'leave', label: 'Nghỉ phép', icon: <Calendar size={18} />, roles: ['admin', 'hr_manager'] },
  { id: 'payroll', label: 'Bảng lương', icon: <DollarSign size={18} />, roles: ['admin', 'hr_manager'] },
  { id: 'recruitment', label: 'Tuyển dụng', icon: <Briefcase size={18} />, roles: ['admin', 'hr_manager'] },
  { id: 'user_management', label: 'Quản lý tài khoản', icon: <UserCog size={18} />, roles: ['admin'] },
  { id: 'departments', label: 'Phòng ban', icon: <Building2 size={18} />, roles: ['admin'] },
  { id: 'payroll_config', label: 'Cấu hình lương', icon: <Settings size={18} />, roles: ['admin'] },
  // Employee
  { id: 'my_profile', label: 'Hồ sơ của tôi', icon: <User size={18} />, roles: ['employee'] },
  { id: 'my_leave', label: 'Nghỉ phép', icon: <Calendar size={18} />, roles: ['employee'] },
  { id: 'my_payslip', label: 'Bảng lương', icon: <FileText size={18} />, roles: ['employee'] },
  { id: 'my_contract', label: 'Hợp đồng', icon: <ClipboardList size={18} />, roles: ['employee'] },
];

const ROLE_LABELS: Record<Role, string> = {
  admin: 'Admin',
  hr_manager: 'HR Manager',
  employee: 'Nhân viên',
};

const ROLE_COLORS: Record<Role, string> = {
  admin: 'bg-purple-100 text-purple-800',
  hr_manager: 'bg-blue-100 text-blue-700',
  employee: 'bg-gray-100 text-gray-600',
};

type Props = {
  role: Role;
  onRoleChange: (r: Role) => void;
  activePage: string;
  onNavigate: (page: string) => void;
  children: React.ReactNode;
};

export default function Layout({ role, onRoleChange, activePage, onNavigate, children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const currentUser = CURRENT_USERS[role];
  const navItems = NAV_ITEMS.filter(n => n.roles.includes(role));

  return (
    <div className="flex min-h-dvh" style={{ background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex flex-col transition-all duration-200 ${sidebarOpen ? 'w-60' : 'w-16'}`}
        style={{ background: 'var(--accent)', boxShadow: '2px 0 16px rgba(18,45,69,0.10)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10 min-h-[64px]">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
            <Building2 size={16} className="text-white" />
          </div>
          {sidebarOpen && (
            <span className="display font-bold text-white text-base tracking-tight truncate">HRMS</span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-150 group relative
                ${activePage === item.id
                  ? 'bg-white/15 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/8'
                }`}
              title={!sidebarOpen ? item.label : undefined}
            >
              {activePage === item.id && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-white rounded-r" />
              )}
              <span className="flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="truncate">{item.label}</span>}
              {sidebarOpen && activePage === item.id && (
                <ChevronRight size={14} className="ml-auto opacity-60" />
              )}
            </button>
          ))}
        </nav>

        {/* User info + toggle */}
        <div className="border-t border-white/10 p-3">
          {sidebarOpen ? (
            <div className="flex items-center gap-2.5 px-1">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">{currentUser.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold truncate">{currentUser.name}</p>
                <p className="text-white/50 text-[11px] truncate">{currentUser.email}</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white text-xs font-bold">{currentUser.avatar}</span>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className={`flex-1 flex flex-col transition-all duration-200 ${sidebarOpen ? 'ml-60' : 'ml-16'}`}>
        {/* Header */}
        <header
          className="sticky top-0 z-20 flex items-center gap-3 px-5 border-b"
          style={{
            height: 64,
            background: 'var(--surface-strong)',
            borderColor: 'var(--border)',
            boxShadow: '0 1px 4px rgba(18,45,69,0.06)'
          }}
        >
          <button
            onClick={() => setSidebarOpen(v => !v)}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100 text-gray-500"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Search */}
          <div className="flex-1 max-w-sm relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border outline-none transition-colors"
              style={{ borderColor: 'var(--border)', background: 'var(--surface-muted)', color: 'var(--ink)' }}
            />
          </div>

          <div className="flex-1" />

          {/* Role switcher (demo only) */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ background: 'var(--surface-muted)', color: 'var(--muted)' }}>
            <span>Demo:</span>
            {(['admin', 'hr_manager', 'employee'] as Role[]).map(r => (
              <button
                key={r}
                onClick={() => { onRoleChange(r); }}
                className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-colors ${role === r ? ROLE_COLORS[r] : 'text-gray-400 hover:text-gray-600'}`}
              >
                {ROLE_LABELS[r]}
              </button>
            ))}
          </div>

          {/* Notif */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(v => !v)}
              className="w-9 h-9 rounded-lg flex items-center justify-center relative transition-colors hover:bg-gray-100"
            >
              <Bell size={18} className="text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
            {notifOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-72 rounded-xl shadow-xl border py-2 z-50"
                style={{ background: 'var(--surface-strong)', borderColor: 'var(--border)' }}
              >
                <p className="text-xs font-semibold px-4 py-1.5" style={{ color: 'var(--muted)' }}>THÔNG BÁO</p>
                {[
                  '2 đơn nghỉ phép chờ duyệt',
                  '3 hợp đồng sắp hết hạn',
                  'Bảng lương tháng 10 chưa duyệt',
                ].map((n, i) => (
                  <button key={i} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors" style={{ color: 'var(--ink-2)' }}>
                    {n}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: 'var(--accent)' }}>
            {currentUser.avatar}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
