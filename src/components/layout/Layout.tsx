'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

interface LayoutProps {
  children: React.ReactNode;
}

const getPageTitle = (pathname: string): string => {
  if (pathname === '/dashboard') return 'Dashboard';
  if (pathname.startsWith('/tasks')) return 'Tasks';
  if (pathname.startsWith('/community')) return 'Community';
  if (pathname.startsWith('/leaderboard')) return 'Leaderboard';
  if (pathname.startsWith('/profile')) return 'Profile';
  if (pathname.startsWith('/settings')) return 'Settings';
  return 'Dashboard';
};

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

        <div className="lg:pl-64">
          <Header
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
            title={getPageTitle(pathname)}
          />

          <main className="p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}