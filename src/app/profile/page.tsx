'use client';

import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useState } from 'react';
import { Camera, Award, Target, TrendingUp, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    username: user?.email?.split('@')[0] || '',
    bio: 'Productivity enthusiast focused on mindful work and consistent progress.',
    location: 'San Francisco, CA',
    website: '',
  });

  const stats = {
    totalSessions: 247,
    totalFocusTime: 6175, // minutes
    currentStreak: 12,
    longestStreak: 45,
    tasksCompleted: 183,
    productivityScore: 87,
  };

  const achievements = [
    { id: '1', name: 'First Timer', description: 'Complete your first Pomodoro session', icon: '🎯', earned: true },
    { id: '2', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', earned: true },
    { id: '3', name: 'Focus Master', description: 'Complete 100 sessions', icon: '⚡', earned: true },
    { id: '4', name: 'Marathon Runner', description: 'Focus for 4 hours straight', icon: '🏃', earned: false },
    { id: '5', name: 'Task Champion', description: 'Complete 500 tasks', icon: '🏆', earned: false },
  ];

  const handleSave = () => {
    // Save profile to Firestore
    setIsEditing(false);
  };

  if (!user) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your account and view your progress
            </p>
          </div>

          <Button
            variant={isEditing ? 'default' : 'outline'}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto flex items-center justify-center">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={profileData.displayName}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                        {profileData.displayName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    )}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Display Name
                  </label>
                  <Input
                    value={profileData.displayName}
                    onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Username
                  </label>
                  <Input
                    value={profileData.username}
                    onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <Input
                    value={user.email || ''}
                    disabled
                    className="bg-gray-50 dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats and Achievements */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {stats.totalSessions}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Total Sessions
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {Math.floor(stats.totalFocusTime / 60)}h {stats.totalFocusTime % 60}m
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Total Focus Time
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {stats.currentStreak}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Current Streak
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {stats.longestStreak}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Longest Streak
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.tasksCompleted}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Tasks Completed
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {stats.productivityScore}%
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Productivity Score
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Achievements
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-center space-x-4 p-4 rounded-lg border ${
                      achievement.earned
                        ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20'
                        : 'border-gray-200 dark:border-gray-700 opacity-60'
                    }`}
                  >
                    <div className="text-2xl">
                      {achievement.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {achievement.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}