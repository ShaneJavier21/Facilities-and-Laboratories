import { useState, useEffect } from 'react';
import { User, UserRole } from '../types';

// Mock user data - in a real app, this would come from an API
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Juan Dela Cruz',
    email: 'admin@essu.edu.ph',
    role: 'system_admin',
    department: 'ICT Office'
  },
  {
    id: '2',
    name: 'Engr. Maria Santos',
    email: 'facilities@essu.edu.ph',
    role: 'facility_manager',
    department: 'Physical Plant Office'
  },
  {
    id: '3',
    name: 'Mr. Roberto Garcia',
    email: 'maintenance@essu.edu.ph',
    role: 'maintenance_personnel',
    department: 'Maintenance Unit'
  },
  {
    id: '4',
    name: 'Dr. Carmen Reyes',
    email: 'vpadmin@essu.edu.ph',
    role: 'vp_admin',
    department: 'Office of VP for Administration'
  },
  {
    id: '5',
    name: 'Prof. Ana Villanueva',
    email: 'requester@essu.edu.ph',
    role: 'office_requester',
    department: 'College of Engineering'
  }
];

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check
    const savedUser = localStorage.getItem('essu_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email: string, role: UserRole) => {
    const foundUser = mockUsers.find(u => u.email === email) || {
      id: Date.now().toString(),
      name: email.split('@')[0],
      email,
      role,
      department: 'General'
    };
    setUser(foundUser);
    localStorage.setItem('essu_user', JSON.stringify(foundUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('essu_user');
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('essu_user', JSON.stringify(updatedUser));
    }
  };

  return { user, loading, login, logout, switchRole };
};