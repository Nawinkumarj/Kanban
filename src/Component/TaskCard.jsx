import { useState, useEffect } from 'react';

const TaskCard = ({ task, column, onDelete, onDragStart }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  useEffect(() => {
    setEditText(task.text);
  }, [task.text]);

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      setIsEditing(false);
    } else {
      setIsEditing(!isEditing);
    }
  };
  const handleDragStart = (e) => {
    onDragStart(e, task, column);
  };

  return (
    <div 
      className={`task-card ${isEditing ? 'editing' : ''}`}
      draggable 
      onDragStart={handleDragStart}
    >
      {isEditing ? (
        <input 
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleEdit();
            if (e.key === 'Escape') {
              setIsEditing(false);
              setEditText(task.text);
            }
          }}
          autoFocus
          className="task-edit-input"
        />
      ) : (
        <>
          <div className="task-content">
            <span className="task-text">{task.text}</span>
          </div>
          <div className="task-actions">
            <button 
              onClick={handleEdit}
              className="edit-btn"
              title="Edit (Click to edit)"
            >
              ✏️
            </button>
            <button 
              onClick={() => onDelete(column, task.id)}
              className="delete-btn"
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;