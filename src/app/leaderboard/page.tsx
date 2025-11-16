'use client';

import { Layout } from '@/components/layout/Layout';
import { useState } from 'react';
import { Trophy, TrendingUp, Clock, Target, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function LeaderboardPage() {
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly' | 'all-time'>('weekly');
  const [category, setCategory] = useState<'focus-time' | 'sessions' | 'streaks' | 'tasks'>('focus-time');

  const mockLeaderboard = {
    'focus-time': [
      { rank: 1, name: 'Alex Chen', value: 580, trend: 'up', avatar: 'AC' },
      { rank: 2, name: 'Sarah Johnson', value: 520, trend: 'up', avatar: 'SJ' },
      { rank: 3, name: 'Mike Wilson', value: 490, trend: 'same', avatar: 'MW' },
      { rank: 4, name: 'Emily Davis', value: 470, trend: 'down', avatar: 'ED' },
      { rank: 5, name: 'You', value: 450, trend: 'up', avatar: 'YU', isCurrentUser: true },
    ],
    'sessions': [
      { rank: 1, name: 'Alex Chen', value: 23, trend: 'up', avatar: 'AC' },
      { rank: 2, name: 'Sarah Johnson', value: 21, trend: 'up', avatar: 'SJ' },
      { rank: 3, name: 'Mike Wilson', value: 20, trend: 'same', avatar: 'MW' },
      { rank: 4, name: 'Emily Davis', value: 19, trend: 'down', avatar: 'ED' },
      { rank: 5, name: 'You', value: 18, trend: 'up', avatar: 'YU', isCurrentUser: true },
    ],
    'streaks': [
      { rank: 1, name: 'Mike Wilson', value: 45, trend: 'up', avatar: 'MW' },
      { rank: 2, name: 'Sarah Johnson', value: 38, trend: 'up', avatar: 'SJ' },
      { rank: 3, name: 'Alex Chen', value: 32, trend: 'same', avatar: 'AC' },
      { rank: 4, name: 'Emily Davis', value: 28, trend: 'down', avatar: 'ED' },
      { rank: 5, name: 'You', value: 25, trend: 'up', avatar: 'YU', isCurrentUser: true },
    ],
    'tasks': [
      { rank: 1, name: 'Sarah Johnson', value: 47, trend: 'up', avatar: 'SJ' },
      { rank: 2, name: 'Alex Chen', value: 42, trend: 'up', avatar: 'AC' },
      { rank: 3, name: 'Mike Wilson', value: 39, trend: 'same', avatar: 'MW' },
      { rank: 4, name: 'Emily Davis', value: 35, trend: 'down', avatar: 'ED' },
      { rank: 5, name: 'You', value: 32, trend: 'up', avatar: 'YU', isCurrentUser: true },
    ],
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'focus-time':
        return <Clock className="w-5 h-5" />;
      case 'sessions':
        return <Target className="w-5 h-5" />;
      case 'streaks':
        return <TrendingUp className="w-5 h-5" />;
      case 'tasks':
        return <Award className="w-5 h-5" />;
      default:
        return <Trophy className="w-5 h-5" />;
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'focus-time':
        return 'Focus Time';
      case 'sessions':
        return 'Sessions';
      case 'streaks':
        return 'Day Streaks';
      case 'tasks':
        return 'Tasks Completed';
      default:
        return 'Unknown';
    }
  };

  const getUnitLabel = (cat: string) => {
    switch (cat) {
      case 'focus-time':
        return 'minutes';
      case 'sessions':
        return 'sessions';
      case 'streaks':
        return 'days';
      case 'tasks':
        return 'tasks';
      default:
        return '';
    }
  };

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-500';
      case 2:
        return 'text-gray-400';
      case 3:
        return 'text-orange-600';
      default:
        return 'text-gray-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '📈';
      case 'down':
        return '📉';
      default:
        return '➡️';
    }
  };

  const currentLeaderboard = mockLeaderboard[category];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Leaderboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Compete with others and track your progress
            </p>
          </div>

          <Button className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Invite Friends</span>
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time Range
              </label>
              <div className="flex space-x-2">
                {['daily', 'weekly', 'monthly', 'all-time'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      timeRange === range
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <div className="flex space-x-2">
                {Object.keys(mockLeaderboard).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                      category === cat
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {getCategoryIcon(cat)}
                    <span>{getCategoryLabel(cat)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {getCategoryLabel(category)} - {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}
              </h2>
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {currentLeaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                  entry.isCurrentUser ? 'bg-indigo-50 dark:bg-indigo-900/10' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-8 text-center">
                    {entry.rank <= 3 ? (
                      <div className={`text-2xl font-bold ${getMedalColor(entry.rank)}`}>
                        {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                      </div>
                    ) : (
                      <div className="text-lg font-bold text-gray-500">
                        {entry.rank}
                      </div>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${
                      entry.isCurrentUser
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                    }`}>
                      {entry.avatar}
                    </div>
                  </div>

                  {/* Name and Stats */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <h3 className={`text-lg font-medium ${
                        entry.isCurrentUser
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {entry.name}
                      </h3>

                      {entry.trend && (
                        <div className="flex items-center space-x-1">
                          <span className="text-sm">{getTrendIcon(entry.trend)}</span>
                        </div>
                      )}

                      {entry.isCurrentUser && (
                        <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400 rounded-full">
                          You
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {entry.value} {getUnitLabel(category)}
                    </div>
                  </div>

                  {/* Value */}
                  <div className="flex-shrink-0 text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {entry.value}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {getUnitLabel(category)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your Stats Summary */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">
              Your {getCategoryLabel(category)} Ranking
            </h3>
            <div className="text-4xl font-bold mb-2">
              #{currentLeaderboard.find(e => e.isCurrentUser)?.rank || 'N/A'}
            </div>
            <p className="text-white/80">
              {currentLeaderboard.find(e => e.isCurrentUser)?.value || 0} {getUnitLabel(category)} this {timeRange.slice(0, -1)}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}