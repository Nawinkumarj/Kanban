import TaskCard from './TaskCard';
import { useState, useMemo } from 'react';
import { useTasks } from '../Hooks/useTask';

const KanbanBoard = () => {
  const { tasks, loading, addTask, deleteTask, moveTask } = useTasks();
  const [newTask, setNewTask] = useState('');
  const [search, setSearch] = useState('');

  const filteredTasks = useMemo(() => {
    if (!search.trim()) return tasks;
    const q = search.toLowerCase();
    return {
      todo: tasks.todo.filter(t => t.text.toLowerCase().includes(q)),
      inprogress: tasks.inprogress.filter(t => t.text.toLowerCase().includes(q)),
      done: tasks.done.filter(t => t.text.toLowerCase().includes(q))
    };
  }, [tasks, search]);

  if (loading) return <div className="loading">Loading...</div>;

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    addTask(newTask);
    setNewTask('');
  };

  const handleDragStart = (e, task, column) => {
    e.dataTransfer.setData('taskData', JSON.stringify({ id: task.id, column }));
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    try {
      const { id, column: sourceColumn } = JSON.parse(
        e.dataTransfer.getData('taskData')
      );
      moveTask(id, sourceColumn, targetColumn);
    } catch {
      // do nothing
    }
  };

  const columns = [
    { id: 'todo', title: 'To Do', className: 'column-todo' },
    { id: 'inprogress', title: 'In Progress', className: 'column-inprogress' },
    { id: 'done', title: 'Done', className: 'column-done' }
  ];

  return (
    <div className="kanban-page">
      <div className="kanban-toolbar">
        <input
          type="text"
          className="kanban-search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tasks..."
        />
      </div>
       <div className="kanban-add-column">
          <h2>Add New Task</h2>
          <div className="add-task-form">
            <input
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              placeholder="New task..."
              onKeyDown={e => e.key === 'Enter' && handleAddTask()}
            />
            <button onClick={handleAddTask}>Add Task</button>
          </div>
        </div>

      <div className="kanban-container">
        
        
        {columns.map(col => (
          <div
            key={col.id}
            className={`kanban-column ${col.className}`}
            onDragOver={e => e.preventDefault()}
            onDrop={e => handleDrop(e, col.id)}
          >
            <h2 className="column-title">
              {col.title}{' '}
              <span className="task-count">
                ({filteredTasks[col.id].length})
              </span>
            </h2>

            {filteredTasks[col.id].map(task => (
              <TaskCard
                key={task.id}
                task={task}
                column={col.id}
                onDelete={deleteTask}
                onDragStart={handleDragStart}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
