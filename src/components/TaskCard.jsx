export default function TaskCard({ task, onDelete, onToggle, onFavorite }) {
  return (
    <div className="task-card">
      <p
        onClick={() => onToggle(task)}
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          cursor: "pointer"
        }}
      >
        {task.title}
      </p>

      <div>
        <button onClick={() => onFavorite(task)}>
          {task.favorite ? "⭐" : "☆"}
        </button>

        <button onClick={() => onDelete(task._id)}>
          ❌
        </button>
      </div>
    </div>
  );
}