import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [stats, setStats] = useState({ total: 0, todo: 0, progress: 0, done: 0 });
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const saved = localStorage.getItem('kanbanTasks');
    if (saved) {
      const tasks = JSON.parse(saved);
      const flatTasks = Object.values(tasks).flat();
      setStats({
        total: flatTasks.length,
        todo: tasks.todo?.length || 0,
        progress: tasks.inprogress?.length || 0,
        done: tasks.done?.length || 0
      });
    }
  }, []);

  const completionRate = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

  return (
    <div className="home-container">
      <div className="welcome-header">
        <h1>Welcome to TweetDeck Dashboard</h1>
        <p>Manage your tasks efficiently across all boards</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card todo">
          <h3>To Do</h3>
          <div className="stat-number">{stats.todo}</div>
        </div>
        <div className="stat-card progress">
          <h3>In Progress</h3>
          <div className="stat-number">{stats.progress}</div>
        </div>
        <div className="stat-card done">
          <h3>Completed</h3>
          <div className="stat-number">{stats.done}</div>
        </div>
        <div className="stat-card total">
          <h3>Total Tasks</h3>
          <div className="stat-number">{stats.total}</div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button 
            className="action-btn primary"
            onClick={() => navigate('/kanban')}
          >
            Go to Kanban Board →
          </button>
          <button 
            className="action-btn secondary"
            onClick={() => navigate('/analytics')}
          >
            View Analytics →
          </button>
        </div>
      </div>

      <div className="completion-metric">
        <div className="metric-circle" style={{ '--completion': `${completionRate}%` }}>
          <span>{completionRate}%</span>
          <p>Completion Rate</p>
        </div>
      </div>
    </div>
  );
};

export default Home;