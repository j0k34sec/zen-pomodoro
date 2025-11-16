'use client';

import { useState, useEffect } from 'react';
import { Target, Clock, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface StatsData {
  todayFocus: number; // minutes
  weekFocus: number; // minutes
  currentStreak: number; // days
  totalSessions: number; // count
  completedTasks: number; // count
}

export function StatsOverview() {
  const [stats, setStats] = useState<StatsData>({
    todayFocus: 0,
    weekFocus: 0,
    currentStreak: 0,
    totalSessions: 0,
    completedTasks: 0,
  });

  useEffect(() => {
    // Load stats from localStorage or fetch from Firebase
    const loadStats = () => {
      try {
        const savedStats = localStorage.getItem('pomodoro-stats');
        if (savedStats) {
          setStats(JSON.parse(savedStats));
        } else {
          // Demo data for now
          setStats({
            todayFocus: 125,
            weekFocus: 480,
            currentStreak: 3,
            totalSessions: 24,
            completedTasks: 18,
          });
        }
      } catch (error) {
        console.error('Failed to load stats:', error);
      }
    };

    loadStats();
  }, []);

  const statCards = [
    {
      title: 'Today Focus',
      value: `${stats.todayFocus}m`,
      subtitle: `${Math.round(stats.todayFocus / 25)} sessions`,
      icon: Clock,
      color: 'from-blue-500 to-cyan-600',
    },
    {
      title: 'Week Focus',
      value: `${stats.weekFocus}m`,
      subtitle: `${Math.round(stats.weekFocus / 25)} sessions`,
      icon: Target,
      color: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Current Streak',
      value: `${stats.currentStreak} days`,
      subtitle: 'Keep it up!',
      icon: TrendingUp,
      color: 'from-green-500 to-teal-600',
    },
    {
      title: 'Completed Tasks',
      value: stats.completedTasks.toString(),
      subtitle: 'This week',
      icon: Award,
      color: 'from-orange-500 to-red-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {card.value}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
              {card.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {card.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Quick Actions */}
      <div className="col-span-full lg:col-span-4">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Ready to be productive?
              </h3>
              <p className="text-white/80 text-sm">
                Start a focus session and track your progress
              </p>
            </div>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
              Start Timer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}