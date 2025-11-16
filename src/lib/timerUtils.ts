export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function calculateProgress(remaining: number, total: number): number {
  if (total === 0) return 0;
  return ((total - remaining) / total) * 100;
}

export function getSoundUrl(soundType: string): string {
  const soundMap: { [key: string]: string } = {
    bell: '/sounds/bell.mp3',
    chime: '/sounds/chime.mp3',
    gentle: '/sounds/gentle.mp3',
    digital: '/sounds/digital.mp3',
  };
  return soundMap[soundType] || soundMap.bell;
}

export async function playNotificationSound(soundType: string, volume: number): Promise<void> {
  try {
    // Create audio context for better browser support
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Create audio element
    const audio = new Audio(getSoundUrl(soundType));
    audio.volume = Math.max(0, Math.min(1, volume));

    // Play the sound
    await audio.play();

    // Also trigger system notification if permitted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Session Complete!', {
        body: 'Your Pomodoro session has ended. Take a break!',
        icon: '/favicon.ico',
      });
    }
  } catch (error) {
    console.warn('Failed to play notification sound:', error);
  }
}

export function saveTimerSettings(settings: any): void {
  try {
    localStorage.setItem('pomodoro-settings', JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save timer settings:', error);
  }
}

export function loadTimerSettings(): any {
  try {
    const saved = localStorage.getItem('pomodoro-settings');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load timer settings:', error);
    return null;
  }
}

export function requestNotificationPermission(): Promise<boolean> {
  return new Promise((resolve) => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        resolve(permission === 'granted');
      });
    } else {
      resolve(false);
    }
  });
}

export function showBrowserNotification(title: string, body: string, icon?: string): void {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: icon || '/favicon.ico',
    });
  }
}