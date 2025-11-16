'use client';

import { useTimer } from '@/hooks/useTimer';
import { TimerControls } from './TimerControls';
import { Play, Pause, RotateCcw, SkipForward, Minimize2, Maximize2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function Timer() {
  const {
    state,
    sessionType,
    timeRemaining,
    sessionCount,
    totalSessions,
    progress,
    isRunning,
    isPaused,
    isCompleted,
    isIdle,
    sessionDuration,
    nextSessionType,
    isMinimized,
    setIsMinimized,
  } = useTimer();

  const getSessionColor = () => {
    switch (sessionType) {
      case 'work':
        return 'from-indigo-500 to-purple-600';
      case 'shortBreak':
        return 'from-green-500 to-teal-600';
      case 'longBreak':
        return 'from-blue-500 to-cyan-600';
      default:
        return 'from-indigo-500 to-purple-600';
    }
  };

  const getSessionLabel = () => {
    switch (sessionType) {
      case 'work':
        return 'Focus Time';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
      default:
        return 'Focus Time';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getSessionStatus = () => {
    if (isCompleted) return 'Session Complete! 🎉';
    if (isPaused) return 'Paused';
    if (isRunning) return 'In Progress';
    return 'Ready to Focus';
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 border border-gray-200 dark:border-gray-700 z-50 max-w-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getSessionColor()}`} />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {getSessionLabel()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatTime(timeRemaining)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsMinimized(false)}
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Timer Card */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${getSessionColor()} px-8 py-6`}>
          <div className="flex items-center justify-between text-white">
            <div>
              <h2 className="text-2xl font-bold">{getSessionLabel()}</h2>
              <p className="text-white/80">{getSessionStatus()}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">
                Session {sessionCount + 1} of 4
              </span>
            </div>
          </div>
        </div>

        {/* Timer Display */}
        <div className="p-8">
          <div className="relative">
            {/* Circular Progress */}
            <div className="relative w-64 h-64 mx-auto">
              <svg
                className="transform -rotate-90 w-64 h-64"
                viewBox="0 0 200 200"
              >
                {/* Background circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                {/* Progress circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 90}`}
                  strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-linear"
                />
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" className="text-indigo-500" stopColor="currentColor" />
                    <stop offset="100%" className="text-purple-600" stopColor="currentColor" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Time Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-6xl font-mono font-bold text-gray-900 dark:text-white tabular-nums">
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {Math.round((timeRemaining / sessionDuration) * 100)}% complete
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            {!isIdle && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => {/* reset function from timer hook */}}
                className="h-12 w-12"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            )}

            <Button
              size="lg"
              className={cn(
                "h-16 px-8 text-lg font-medium",
                isRunning ? "bg-red-500 hover:bg-red-600" : `bg-gradient-to-r ${getSessionColor()}`
              )}
              onClick={() => {/* play/pause function from timer hook */}}
            >
              {isRunning ? (
                <>
                  <Pause className="w-6 h-6 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-6 h-6 mr-2" />
                  {isIdle ? 'Start' : 'Resume'}
                </>
              )}
            </Button>

            {!isIdle && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => {/* skip function from timer hook */}}
                className="h-12 w-12"
              >
                <SkipForward className="w-5 h-5" />
              </Button>
            )}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalSessions}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Total Sessions
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {sessionCount + 1}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Current Set
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {nextSessionType === 'work' ? 'Focus' : 'Break'}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Next Session
              </div>
            </div>
          </div>

          {/* Minimize Button */}
          <div className="flex justify-end mt-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(true)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Minimize2 className="w-4 h-4 mr-1" />
              Minimize
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}