'use client';

import { Layout } from '@/components/layout/Layout';
import { Timer } from '@/components/timer/TimerDisplay';
import { StatsOverview } from '@/components/dashboard/StatsOverview';

export default function DashboardPage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="text-center py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to Zen Pomodoro
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Stay focused, be productive, achieve your goals
          </p>
        </div>

        {/* Timer Section */}
        <div className="flex justify-center">
          <Timer />
        </div>

        {/* Stats Overview */}
        <StatsOverview />
      </div>
    </Layout>
  );
}