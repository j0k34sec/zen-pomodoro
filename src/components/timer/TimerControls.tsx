'use client';

import { useTimer } from '@/hooks/useTimer';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

export function TimerControls() {
  const {
    state,
    start,
    pause,
    reset,
    skip,
    isRunning,
    isIdle,
  } = useTimer();

  return (
    <div className="flex items-center justify-center space-x-4">
      {!isIdle && (
        <Button
          variant="outline"
          size="icon"
          onClick={reset}
          className="h-12 w-12"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      )}

      <Button
        size="lg"
        className={cn(
          "h-16 px-8 text-lg font-medium",
          isRunning ? "bg-red-500 hover:bg-red-600" : "bg-gradient-to-r from-indigo-500 to-purple-600"
        )}
        onClick={isRunning ? pause : start}
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
          onClick={skip}
          className="h-12 w-12"
        >
          <SkipForward className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}