import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Calendar, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/authStore';
import { IMAGES } from '../../constants/images';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/appointments', label: 'Lịch hẹn', icon: Calendar },
];

export default function AdminLayout() {
  const { user, loading, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-accent">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-[#f4f9fd]">
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 transform bg-primary-dark text-white shadow-2xl transition-transform lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="border-b border-white/10 p-6">
          <img src={IMAGES.logoWhite} alt="iSmile Admin" className="h-9" />
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-light">Admin Portal</p>
        </div>

        <nav className="p-4">
          <div className="space-y-1">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-white text-primary-dark shadow-lg shadow-black/10'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {label}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">
          <div className="rounded-lg bg-white/10 p-4">
            <p className="truncate text-sm font-black text-white">{user?.fullName || user?.email}</p>
            <p className="mt-1 text-xs text-white/60">Quản trị hệ thống</p>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 flex items-center gap-2 text-sm font-bold text-primary-light transition-colors hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-ink/45 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-primary/10 bg-white/90 px-4 py-3 shadow-sm backdrop-blur lg:hidden">
          <button type="button" onClick={() => setSidebarOpen(true)} className="rounded-lg border border-slate-200 p-2 text-primary">
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-black text-ink">Admin</span>
          <button type="button" onClick={() => setSidebarOpen(false)} className="rounded-lg p-2 lg:hidden">
            <X className="h-6 w-6 opacity-0" />
          </button>
        </header>
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
