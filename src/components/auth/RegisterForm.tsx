'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, User, Chrome, Github, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const registerSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onToggleMode: () => void;
}

export function RegisterForm({ onToggleMode }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  const { signUp, signInWithGoogle, signInWithGithub } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const username = watch('username');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  // Check password strength
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
    const colors = ['', 'red', 'orange', 'yellow', 'green', 'green'];

    return { strength, label: labels[strength], color: colors[strength] };
  };

  const passwordStrength = getPasswordStrength(password);

  // Check username availability
  useEffect(() => {
    if (username && username.length >= 3) {
      const timer = setTimeout(async () => {
        try {
          setCheckingUsername(true);
          // In a real app, you'd check against your database
          // For now, we'll simulate a check
          await new Promise(resolve => setTimeout(resolve, 500));
          setUsernameAvailable(true);
        } catch {
          setUsernameAvailable(false);
        } finally {
          setCheckingUsername(false);
        }
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setUsernameAvailable(null);
    }
  }, [username]);

  const onSubmit = async (data: RegisterFormData) => {
    if (usernameAvailable === false) {
      setError('Username is not available');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await signUp(data.email, data.password, data.username);
    } catch (error: any) {
      setError(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGoogle();
    } catch (error: any) {
      setError(error.message || 'Failed to sign up with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGithub();
    } catch (error: any) {
      setError(error.message || 'Failed to sign up with GitHub');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Create Account
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Join Zen Pomodoro and boost your productivity
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Input
            label="Username"
            type="text"
            placeholder="Choose a username"
            icon={<User className="w-5 h-5" />}
            error={errors.username?.message}
            {...register('username')}
            disabled={loading}
          />
          {username && (
            <div className="mt-2 flex items-center text-sm">
              {checkingUsername ? (
                <div className="flex items-center text-gray-500">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 mr-2"></div>
                  Checking availability...
                </div>
              ) : usernameAvailable === true ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Username available
                </div>
              ) : usernameAvailable === false ? (
                <div className="flex items-center text-red-600">
                  <XCircle className="w-4 h-4 mr-1" />
                  Username not available
                </div>
              ) : null}
            </div>
          )}
        </div>

        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          icon={<Mail className="w-5 h-5" />}
          error={errors.email?.message}
          {...register('email')}
          disabled={loading}
        />

        <div>
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              icon={<Lock className="w-5 h-5" />}
              error={errors.password?.message}
              {...register('password')}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              disabled={loading}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {password && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-sm">
                <span className={`text-${passwordStrength.color}-600`}>
                  Password strength: {passwordStrength.label}
                </span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-1 w-8 rounded-full ${
                        level <= passwordStrength.strength
                          ? `bg-${passwordStrength.color}-500`
                          : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            icon={<Lock className="w-5 h-5" />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            disabled={loading}
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            disabled={loading}
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            I agree to the{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Privacy Policy
            </a>
          </label>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading || usernameAvailable === false}
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
              Or sign up with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex items-center justify-center"
          >
            <Chrome className="w-4 h-4 mr-2" />
            Google
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleGithubSignIn}
            disabled={loading}
            className="flex items-center justify-center"
          >
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <button
            onClick={onToggleMode}
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            disabled={loading}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}