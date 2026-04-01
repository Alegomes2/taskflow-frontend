import { useState } from "react";

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!title) return alert("Digite uma tarefa");

    onCreate(title);
    setTitle("");
  };

  return (
    <div className="task-input">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nova tarefa..."
      />
      <button onClick={handleSubmit}>Adicionar</button>
    </div>
  );
}