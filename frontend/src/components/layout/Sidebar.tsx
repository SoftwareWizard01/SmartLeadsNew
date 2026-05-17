import { useAuthStore } from '../../store/authStore';
import { NavLink } from 'react-router-dom';
import { LogOut, LayoutDashboard, Users, Activity } from 'lucide-react';
import { cn } from '../ui/Input';

const Sidebar = () => {
  const { user, logout } = useAuthStore();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Leads', href: '/leads', icon: Users },
  ];

  return (
    <div className="flex h-full w-64 flex-col border-r border-surface-800 bg-surface-900 shadow-2xl z-10">
      {/* Logo Area */}
      <div className="flex h-16 items-center gap-2 px-6 border-b border-surface-800">
        <Activity className="h-6 w-6 text-blue-500" />
        <span className="text-lg font-bold tracking-tight text-white">Smart Leads</span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-500/10 text-blue-500'
                    : 'text-surface-300 hover:bg-surface-800 hover:text-white'
                )
              }
            >
              <Icon
                className="mr-3 h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile / Logout */}
      <div className="border-t border-surface-800 p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-surface-700 flex items-center justify-center text-blue-400 font-bold border border-surface-600 shadow-glow-sm">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white truncate max-w-[130px]">{user?.name}</span>
            <span className="text-xs text-surface-400 capitalize">{user?.role}</span>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center justify-center rounded-md border border-surface-700 bg-surface-800 px-4 py-2 text-sm font-medium text-surface-200 transition-colors hover:bg-surface-700 hover:text-white"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
