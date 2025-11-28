'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { toast } from 'sonner';
import { User, Mail, Edit2, Save, X } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    fullName: user?.fullName || '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (formData.username && formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (formData.username && !/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
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

    setIsSubmitting(true);

    try {
      const response = await api.put('/api/auth/profile', formData);
      updateUser(response.data.data.user);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      const message = error.response?.data?.message || 'Failed to update profile';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: user?.username || '',
      fullName: user?.fullName || '',
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-1">Manage your account information</p>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="btn-primary">
              <Edit2 className="w-4 h-4 inline mr-2" />
              Edit Profile
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Username
            </label>
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`input ${errors.username ? 'border-red-500' : ''}`}
                  placeholder="Enter username"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                )}
              </>
            ) : (
              <p className="text-gray-900 text-lg">{user?.username}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </label>
            <p className="text-gray-900 text-lg">{user?.email}</p>
            <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="input"
                placeholder="Enter full name"
              />
            ) : (
              <p className="text-gray-900 text-lg">{user?.fullName || 'Not set'}</p>
            )}
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Account ID:</span> {user?.id}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Created:</span>{' '}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'N/A'}
              </p>
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-3 pt-4">
              <button type="submit" disabled={isSubmitting} className="btn-primary">
                <Save className="w-4 h-4 inline mr-2" />
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="btn-secondary"
              >
                <X className="w-4 h-4 inline mr-2" />
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
