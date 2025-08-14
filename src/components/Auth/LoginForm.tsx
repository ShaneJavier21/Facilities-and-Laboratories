import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { UserRole } from '../../types';

interface LoginFormProps {
  onLogin: (email: string, role: UserRole) => void;
}

const demoAccounts = [
  {
    role: 'system_admin' as UserRole,
    label: 'System Administrator',
    name: 'Dr. Juan Dela Cruz',
    email: 'admin@essu.edu.ph',
    password: 'admin123',
    department: 'ICT Office'
  },
  {
    role: 'facility_manager' as UserRole,
    label: 'Facility Manager',
    name: 'Engr. Maria Santos',
    email: 'facilities@essu.edu.ph',
    password: 'facilities123',
    department: 'Physical Plant Office'
  },
  {
    role: 'maintenance_personnel' as UserRole,
    label: 'Maintenance Personnel',
    name: 'Mr. Roberto Garcia',
    email: 'maintenance@essu.edu.ph',
    password: 'maintenance123',
    department: 'Maintenance Unit'
  },
  {
    role: 'vp_admin' as UserRole,
    label: 'VP for Administration',
    name: 'Dr. Carmen Reyes',
    email: 'vpadmin@essu.edu.ph',
    password: 'vpadmin123',
    department: 'Office of VP for Administration'
  },
  {
    role: 'office_requester' as UserRole,
    label: 'Requester (Regular User)',
    name: 'Prof. Ana Villanueva',
    email: 'requester@essu.edu.ph',
    password: 'requester123',
    department: 'College of Engineering'
  }
];

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<string>('admin@essu.edu.ph');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const account = demoAccounts.find(acc => acc.email === selectedAccount);
    if (account) {
      onLogin(account.email, account.role);
    }
  };

  const handleAccountSelect = (accountEmail: string) => {
    const account = demoAccounts.find(acc => acc.email === accountEmail);
    if (account) {
      setSelectedAccount(accountEmail);
      setEmail(account.email);
      setPassword(account.password);
    }
  };

  // Auto-select first account on component mount
  React.useEffect(() => {
    if (demoAccounts.length > 0) {
      handleAccountSelect(demoAccounts[0].email);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-essu-green-600 via-essu-green-500 to-essu-green-700 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-essu-green-600 to-essu-gold-600 rounded-full flex items-center justify-center shadow-lg">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Eastern Samar State University
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Facilities Management System
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Demo Account Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Demo Account
            </label>
            <select
              value={selectedAccount}
              onChange={(e) => handleAccountSelect(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essu-green-500 focus:border-essu-green-500 bg-white"
            >
              {demoAccounts.map((account) => (
                <option key={account.email} value={account.email}>
                  {account.label} - {account.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Select a demo account to explore different user roles
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-essu-green-500 focus:border-essu-green-500"
                placeholder="Enter your ESSU email"
                readOnly
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-essu-green-500 focus:border-essu-green-500"
                placeholder="Password"
                readOnly
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-essu-green-600 to-essu-gold-600 hover:from-essu-green-700 hover:to-essu-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-essu-green-500 transition-all duration-200 shadow-lg"
            >
              Sign In
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            Demo System - Use the dropdown above to switch between different user roles
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};