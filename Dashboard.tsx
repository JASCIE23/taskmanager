import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../lib/api';
import { Task } from '../types/database';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import { toast } from 'react-hot-toast';
import { LogOut, Plus } from 'lucide-react';

type DashboardProps = {
  onLogout: () => void;
};

export function Dashboard({ onLogout }: DashboardProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<Task['status']>('todo');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch tasks';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      toast.success('Task deleted successfully!');
      fetchTasks();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete task';
      toast.error(message);
    }
  };

  const filteredTasks = tasks.filter((task) => task.status === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
            <button
              onClick={onLogout}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('todo')}
              className={`px-4 py-2 rounded-md ${
                filter === 'todo'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              To Do
            </button>
            <button
              onClick={() => setFilter('in_progress')}
              className={`px-4 py-2 rounded-md ${
                filter === 'in_progress'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-md ${
                filter === 'completed'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              Completed
            </button>
          </div>
          <button
            onClick={() => {
              setSelectedTask(null);
              setShowForm(true);
            }}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </button>
        </div>

        {showForm ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <TaskForm
              task={selectedTask}
              onSuccess={() => {
                setShowForm(false);
                setSelectedTask(null);
                fetchTasks();
              }}
              onCancel={() => {
                setShowForm(false);
                setSelectedTask(null);
              }}
            />
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onEdit={(task) => {
              setSelectedTask(task);
              setShowForm(true);
            }}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}