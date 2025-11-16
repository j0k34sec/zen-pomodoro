'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { playNotificationSound } from '@/lib/timerUtils';

export type SessionType = 'work' | 'shortBreak' | 'longBreak';
export type TimerState = 'idle' | 'running' | 'paused' | 'completed';

interface TimerSettings {
  workDuration: number; // minutes
  shortBreakDuration: number; // minutes
  longBreakDuration: number; // minutes
  longBreakInterval: number; // number of work sessions before long break
  autoStartNextSession: boolean;
  soundEnabled: boolean;
  soundType: 'bell' | 'chime' | 'gentle' | 'digital';
  volume: number;
}

export interface TimerSession {
  type: SessionType;
  duration: number; // seconds
  completedAt?: Date;
  taskId?: string;
  notes?: string;
}

const DEFAULT_SETTINGS: TimerSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  autoStartNextSession: false,
  soundEnabled: true,
  soundType: 'bell',
  volume: 0.5,
};

export function useTimer(initialSettings?: Partial<TimerSettings>) {
  const [settings, setSettings] = useState<TimerSettings>({
    ...DEFAULT_SETTINGS,
    ...initialSettings,
  });

  const [state, setState] = useState<TimerState>('idle');
  const [sessionType, setSessionType] = useState<SessionType>('work');
  const [timeRemaining, setTimeRemaining] = useState(settings.workDuration * 60);
  const [sessionCount, setSessionCount] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(0);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('pomodoro-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      } catch (error) {
        console.error('Failed to load timer settings:', error);
      }
    }

    const savedState = localStorage.getItem('pomodoro-state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setState(parsed.state || 'idle');
        setSessionType(parsed.sessionType || 'work');
        setSessionCount(parsed.sessionCount || 0);
        setTotalSessions(parsed.totalSessions || 0);
        setCurrentTaskId(parsed.currentTaskId || null);

        if (parsed.state === 'running' && parsed.timeRemaining) {
          setTimeRemaining(parsed.timeRemaining);
        }
      } catch (error) {
        console.error('Failed to load timer state:', error);
      }
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('pomodoro-settings', JSON.stringify(settings));
  }, [settings]);

  // Save state to localStorage
  useEffect(() => {
    const stateToSave = {
      state,
      sessionType,
      sessionCount,
      totalSessions,
      currentTaskId,
      timeRemaining: state === 'running' ? timeRemaining : undefined,
    };
    localStorage.setItem('pomodoro-state', JSON.stringify(stateToSave));
  }, [state, sessionType, sessionCount, totalSessions, currentTaskId, timeRemaining, settings]);

  // Get current session duration
  const getSessionDuration = useCallback((type: SessionType): number => {
    switch (type) {
      case 'work':
        return settings.workDuration * 60;
      case 'shortBreak':
        return settings.shortBreakDuration * 60;
      case 'longBreak':
        return settings.longBreakDuration * 60;
      default:
        return settings.workDuration * 60;
    }
  }, [settings]);

  // Start timer
  const start = useCallback(() => {
    if (state === 'completed') {
      reset();
      return;
    }

    setState('running');
    startTimeRef.current = Date.now() - pausedTimeRef.current * 1000;

    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current!) / 1000);
      const duration = getSessionDuration(sessionType);
      const remaining = Math.max(0, duration - elapsed);

      setTimeRemaining(remaining);

      if (remaining === 0) {
        complete();
      }
    }, 100);
  }, [state, sessionType, getSessionDuration]);

  // Pause timer
  const pause = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    pausedTimeRef.current = Math.floor((Date.now() - (startTimeRef.current || 0)) / 1000);
    setState('paused');
  }, []);

  // Reset timer
  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    startTimeRef.current = null;
    pausedTimeRef.current = 0;
    setTimeRemaining(getSessionDuration(sessionType));
    setState('idle');
  }, [sessionType, getSessionDuration]);

  // Skip to next session
  const skip = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const nextSessionType = getNextSessionType(sessionType, sessionCount);
    setSessionType(nextSessionType);
    setTimeRemaining(getSessionDuration(nextSessionType));
    startTimeRef.current = null;
    pausedTimeRef.current = 0;
    setState('idle');

    if (sessionType === 'work') {
      setSessionCount(prev => prev + 1);
      setTotalSessions(prev => prev + 1);
    }
  }, [sessionType, sessionCount, getSessionDuration]);

  // Complete current session
  const complete = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setState('completed');

    // Play notification sound
    if (settings.soundEnabled) {
      playNotificationSound(settings.soundType, settings.volume);
    }

    // Auto-start next session if enabled
    if (settings.autoStartNextSession) {
      setTimeout(() => {
        skip();
        start();
      }, 3000);
    }

    // Update session count
    if (sessionType === 'work') {
      setSessionCount(prev => prev + 1);
      setTotalSessions(prev => prev + 1);
    }
  }, [settings, skip, start, sessionType]);

  // Get next session type
  const getNextSessionType = (current: SessionType, count: number): SessionType => {
    if (current === 'work') {
      return (count + 1) % settings.longBreakInterval === 0 ? 'longBreak' : 'shortBreak';
    }
    return 'work';
  };

  // Update settings
  const updateSettings = useCallback((newSettings: Partial<TimerSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));

    // Update current time if duration changed and timer is idle
    if (state === 'idle' || state === 'completed') {
      const newDuration = getSessionDuration(newSettings.workDuration ? 'work' : sessionType);
      setTimeRemaining(newDuration);
    }
  }, [state, sessionType, getSessionDuration]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Get progress percentage
  const getProgress = useCallback(() => {
    const duration = getSessionDuration(sessionType);
    return ((duration - timeRemaining) / duration) * 100;
  }, [sessionType, timeRemaining, getSessionDuration]);

  return {
    // State
    state,
    sessionType,
    timeRemaining,
    sessionCount,
    totalSessions,
    isMinimized,
    settings,
    currentTaskId,

    // Actions
    start,
    pause,
    reset,
    skip,
    complete,
    updateSettings,
    setIsMinimized,
    setCurrentTaskId,

    // Computed values
    progress: getProgress(),
    isRunning: state === 'running',
    isPaused: state === 'paused',
    isCompleted: state === 'completed',
    isIdle: state === 'idle',

    // Session info
    sessionDuration: getSessionDuration(sessionType),
    nextSessionType: getNextSessionType(sessionType, sessionCount),
  };
}