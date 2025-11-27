import { useState, useEffect } from 'react';

const Analytics = () => {
  const [stats, setStats] = useState({ total: 0, todo: 0, progress: 0, done: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('kanbanTasks');
    if (saved) {
      const tasks = JSON.parse(saved);
      setStats({
        total: Object.values(tasks).flat().length,
        todo: tasks.todo.length,
        progress: tasks.inprogress.length,
        done: tasks.done.length
      });
    }
  }, []);

  const chartData = [
    { label: 'To Do', value: stats.todo, color: '#e74c3c' },
    { label: 'In Progress', value: stats.progress, color: '#f39c12' },
    { label: 'Done', value: stats.done, color: '#27ae60' }
  ];

  return (
    <div className="analytics-container">
      <h1>Analytics Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <div className="stat-number">{stats.total}</div>
        </div>
        <div className="stat-card">
          <h3>Completion Rate</h3>
          <div className="stat-number">
            {stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0}%
          </div>
        </div>
      </div>

      <div className="chart-container">
        <h3>Task Distribution</h3>
        <div className="bar-chart">
          {chartData.map((item, index) => (
            <div key={index} className="bar-group">
              <div className="bar-label">{item.label}</div>
              <div className="bar-container">
                <div
                  className="bar"
                  style={{
                    width: `${Math.max(item.value * 20, 10)}px`,
                    backgroundColor: item.color
                  }}
                >
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;