'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CheckCircle, LayoutDashboard, User, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <CheckCircle className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">TaskApp</span>
            </Link>

            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">{user?.fullName || user?.username}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
