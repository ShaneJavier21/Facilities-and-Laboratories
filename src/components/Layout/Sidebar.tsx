import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Calendar, 
  Package, 
  Wrench, 
  HeadphonesIcon, 
  FileText, 
  BarChart3, 
  Settings,
  GraduationCap,
  Menu,
  X,
  User,
  Car
} from 'lucide-react';
import { User as UserType } from '../../types';

interface SidebarProps {
  user: UserType;
  isOpen: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, roles: ['all'] },
  { name: 'My Requests', href: '/my-requests', icon: User, roles: ['all'] },
  { name: 'Facilities', href: '/facilities', icon: Building2, roles: ['system_admin', 'facility_manager'] },
  { name: 'Reservations', href: '/reservations', icon: Calendar, roles: ['all'] },
  { name: 'Equipment', href: '/equipment', icon: Package, roles: ['system_admin', 'equipment_custodian', 'facility_manager'] },
  { name: 'Maintenance', href: '/maintenance', icon: Wrench, roles: ['all'] },
  { name: 'Service Requests', href: '/services', icon: HeadphonesIcon, roles: ['all'] },
  { name: 'Transportation', href: '/transportation', icon: Car, roles: ['all'] },
  { name: 'Admin Affairs', href: '/admin-affairs', icon: FileText, roles: ['vp_admin', 'system_admin'] },
  { name: 'Reports', href: '/reports', icon: BarChart3, roles: ['system_admin', 'facility_manager', 'vp_admin'] },
  { name: 'Settings', href: '/settings', icon: Settings, roles: ['system_admin'] },
];

export const Sidebar: React.FC<SidebarProps> = ({ user, isOpen, onToggle }) => {
  const canAccess = (allowedRoles: string[]) => {
    return allowedRoles.includes('all') || allowedRoles.includes(user.role);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-essu-green-700 to-essu-green-800 shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-essu-green-600">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-essu-gold-500 to-essu-gold-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white">ESSU FMS</h1>
              <p className="text-xs text-essu-green-200">Facilities System</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-1 rounded-md hover:bg-essu-green-600 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            if (!canAccess(item.roles)) return null;
            
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-essu-gold-500 to-essu-gold-600 text-white shadow-md'
                      : 'text-essu-green-100 hover:bg-essu-green-600 hover:text-white'
                  }`
                }
                onClick={() => window.innerWidth < 1024 && onToggle()}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* User info */}
        <div className="p-4 border-t border-essu-green-600">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-essu-gold-500 to-essu-gold-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {user.name?.split(' ').map(n => n[0]).join('') || ''}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.name || ''}
              </p>
              <p className="text-xs text-essu-green-200 truncate">
                {user.role.replace('_', ' ').toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};