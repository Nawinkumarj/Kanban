import { useState, useEffect } from 'react';

const STORAGE_KEY = 'kanbanTasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inprogress: [],
    done: []
  });
  const [loading, setLoading] = useState(true);

  // Load once on first mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTasks({
          todo: parsed.todo || [],
          inprogress: parsed.inprogress || [],
          done: parsed.done || []
        });
      } catch {
        setTasks({ todo: [], inprogress: [], done: [] });
      }
    }
    setLoading(false);
  }, []);

  // Persist every change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, loading]);

  const addTask = (text) => {
    if (!text.trim()) return;
    const task = { id: Date.now(), text: text.trim() };
    setTasks(prev => ({
      ...prev,
      todo: [...prev.todo, task]
    }));
  };

  const deleteTask = (column, id) => {
    setTasks(prev => ({
      ...prev,
      [column]: prev[column].filter(t => t.id !== id)
    }));
  };

  const moveTask = (id, from, to) => {
    if (from === to) return;
    setTasks(prev => {
      const source = prev[from];
      const task = source.find(t => t.id === id);
      if (!task) return prev;
      return {
        ...prev,
        [from]: source.filter(t => t.id !== id),
        [to]: [...prev[to], task]
      };
    });
  };

  return { tasks, loading, addTask, deleteTask, moveTask };
};