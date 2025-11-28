'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { CheckCircle, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const validate = () => {
    const newErrors = {};

    if (!formData.emailOrUsername) {
      newErrors.emailOrUsername = 'Email or username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    await login(formData);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your TaskApp account</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="emailOrUsername"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email or Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="emailOrUsername"
                  name="emailOrUsername"
                  value={formData.emailOrUsername}
                  onChange={handleChange}
                  className={`input pl-10 ${errors.emailOrUsername ? 'border-red-500' : ''}`}
                  placeholder="john@example.com or johndoe"
                />
              </div>
              {errors.emailOrUsername && (
                <p className="mt-1 text-sm text-red-600">{errors.emailOrUsername}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input pl-10 ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full">
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
