import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  Briefcase,
  FileSearch,
  GitCompare,
  BarChart3,
  Shield,
  HelpCircle,
} from 'lucide-react';

const navItems = [
  {
    label: 'Case Workspace',
    icon: Briefcase,
    href: '/workspace',
    roles: ['agent', 'manager'],
  },
  {
    label: 'Policy Explorer',
    icon: FileSearch,
    href: '/policy-explorer',
    roles: ['agent', 'manager'],
  },
  {
    label: 'Policy Drift',
    icon: GitCompare,
    href: '/policy-drift',
    roles: ['agent', 'manager'],
  },
  {
    label: 'What-If Checker',
    icon: Shield,
    href: '/what-if',
    roles: ['agent', 'manager'],
  },
  {
    label: 'Analytics',
    icon: BarChart3,
    href: '/analytics',
    roles: ['manager'],
  },
];

export const AppSidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(user?.role || '')
  );

  return (
    <aside className="w-56 bg-sidebar border-r border-sidebar-border flex flex-col">
      <nav className="flex-1 p-3 space-y-1">
        {filteredNavItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all duration-200 w-full">
          <HelpCircle className="w-5 h-5" />
          Help & Support
        </button>
      </div>
    </aside>
  );
};
