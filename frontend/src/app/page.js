'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { CheckCircle, Lock, Users, Zap } from 'lucide-react';

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">TaskApp</span>
          </div>
          <div className="space-x-4">
            <button
              onClick={() => router.push('/login')}
              className="btn-secondary"
            >
              Login
            </button>
            <button
              onClick={() => router.push('/register')}
              className="btn-primary"
            >
              Get Started
            </button>
          </div>
        </nav>

        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Manage Your Tasks
            <span className="text-primary-600"> Effortlessly</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A modern, secure, and scalable task management application built with Next.js and Express
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => router.push('/register')}
              className="btn-primary text-lg px-8 py-3"
            >
              Start Free Today
            </button>
            <button
              onClick={() => router.push('/login')}
              className="btn-secondary text-lg px-8 py-3"
            >
              Sign In
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <div className="card text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
              <Lock className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Authentication</h3>
            <p className="text-gray-600 text-sm">
              JWT-based authentication with password hashing and secure token management
            </p>
          </div>

          <div className="card text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
              <CheckCircle className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Task Management</h3>
            <p className="text-gray-600 text-sm">
              Create, update, delete, and organize your tasks with ease
            </p>
          </div>

          <div className="card text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
              <Zap className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Fast & Responsive</h3>
            <p className="text-gray-600 text-sm">
              Built with modern technologies for optimal performance
            </p>
          </div>

          <div className="card text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">User Friendly</h3>
            <p className="text-gray-600 text-sm">
              Intuitive interface designed for productivity
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Built With Modern Technology</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {['Next.js', 'React', 'TailwindCSS', 'Express.js', 'MongoDB', 'JWT'].map((tech) => (
              <div key={tech} className="px-6 py-3 bg-white rounded-lg shadow-md">
                <span className="font-semibold text-gray-700">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          
        </div>
      </footer>
    </div>
  );
}
