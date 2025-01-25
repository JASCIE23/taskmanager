import React from 'react';
import { Task } from '../types/database';
import { format, isWithinInterval, subHours } from 'date-fns';
import { Clock, Edit2, Trash2 } from 'lucide-react';

type TaskListProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
};

export function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  const isNearDeadline = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    return isWithinInterval(due, {
      start: now,
      end: subHours(due, 24),
    });
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No tasks found. Create your first task!</p>
        </div>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                <div className="mt-2 flex items-center space-x-4">
                  <span
                    className={`text-sm font-medium ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}{' '}
                    Priority
                  </span>
                  <span className="text-sm text-gray-500">
                    Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                  </span>
                  {isNearDeadline(task.dueDate) && (
                    <span className="flex items-center text-amber-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">Due soon</span>
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(task)}
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(task._id)}
                  className="p-2 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}