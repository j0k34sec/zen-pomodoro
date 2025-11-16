import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', loading = false, children, disabled, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';

    const variants = {
      default: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700',
      destructive: 'bg-red-600 text-white hover:bg-red-700',
      outline: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800',
      secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700',
      ghost: 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800',
      link: 'text-indigo-600 dark:text-indigo-400 underline-offset-4 hover:underline'
    };

    const sizes = {
      default: 'h-10 py-2 px-4',
      sm: 'h-9 px-3 text-sm',
      lg: 'h-11 px-8',
      icon: 'h-10 w-10'
    };

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };