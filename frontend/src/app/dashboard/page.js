'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { toast } from 'sonner';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import TaskModal from '@/components/TaskModal';

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, 'in-progress': 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [searchQuery, statusFilter, priorityFilter]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (statusFilter) params.append('status', statusFilter);
      if (priorityFilter) params.append('priority', priorityFilter);

      const response = await api.get(`/api/tasks?${params.toString()}`);
      setTasks(response.data.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/api/tasks/stats');
      setStats(response.data.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await api.delete(`/api/tasks/${taskId}`);
      toast.success('Task deleted successfully');
      fetchTasks();
      fetchStats();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  const handleTaskSaved = () => {
    setIsModalOpen(false);
    fetchTasks();
    fetchStats();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-gray-600 mt-1">Manage and organize your tasks</p>
        </div>
        <button onClick={handleCreateTask} className="btn-primary">
          <Plus className="w-4 h-4 inline mr-2" />
          New Task
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <p className="text-sm text-blue-600 font-medium">Total Tasks</p>
          <p className="text-3xl font-bold text-blue-900 mt-2">{stats.total}</p>
        </div>
        <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <p className="text-sm text-yellow-600 font-medium">Pending</p>
          <p className="text-3xl font-bold text-yellow-900 mt-2">{stats.pending}</p>
        </div>
        <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <p className="text-sm text-purple-600 font-medium">In Progress</p>
          <p className="text-3xl font-bold text-purple-900 mt-2">{stats['in-progress']}</p>
        </div>
        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <p className="text-sm text-green-600 font-medium">Completed</p>
          <p className="text-3xl font-bold text-green-900 mt-2">{stats.completed}</p>
        </div>
      </div>

      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input pl-10"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="input pl-10"
            >
              <option value="">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="card text-center py-12">
          <CheckCircle2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || statusFilter || priorityFilter
              ? 'Try adjusting your filters'
              : 'Create your first task to get started'}
          </p>
          {!searchQuery && !statusFilter && !priorityFilter && (
            <button onClick={handleCreateTask} className="btn-primary">
              <Plus className="w-4 h-4 inline mr-2" />
              Create Task
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div key={task._id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(task.status)}
                    <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                  </div>
                  
                  {task.description && (
                    <p className="text-gray-600 mb-3">{task.description}</p>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`badge-${task.status}`}>
                      {task.status.replace('-', ' ')}
                    </span>
                    <span className={`badge-${task.priority}`}>{task.priority}</span>
                    {task.dueDate && (
                      <span className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(task.dueDate)}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEditTask(task)}
                    className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onClose={() => setIsModalOpen(false)}
          onSave={handleTaskSaved}
        />
      )}
    </div>
  );
}
