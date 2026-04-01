import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import EmptyState from "../components/EmptyState";
import Sidebar from "../components/Sidebar";

import "../styles/dashboard.css";

export default function Dashboard() {
  // ============================
  // 🧠 STATES
  // ============================
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("all");

  const token = localStorage.getItem("token");

  // ============================
  // 📥 BUSCAR TAREFAS
  // ============================
  const getTasks = async () => {
    try {
      const res = await api.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ============================
  // ➕ CRIAR TAREFA
  // ============================
  const createTask = async (title) => {
    try {
      await api.post(
        "/tasks",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ============================
  // ❌ DELETAR
  // ============================
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ============================
  // ✅ TOGGLE COMPLETED
  // ============================
  const toggleTask = async (task) => {
    try {
      await api.put(
        `/tasks/${task._id}`,
        { completed: !task.completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ============================
  // ⭐ FAVORITAR
  // ============================
  const toggleFavorite = async (task) => {
    try {
      await api.put(
        `/tasks/${task._id}`,
        { favorite: !task.favorite },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ============================
  // 🚪 LOGOUT
  // ============================
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // ============================
  // 🔍 FILTRO DE BUSCA
  // ============================
  const filteredTasks = tasks
  .filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  )
  .filter((task) => {
    if (view === "favorites") return task.favorite;
    return true;
  });

  // ============================
  // 📊 ESTATÍSTICAS
  // ============================
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;

  // ============================
  // 🔄 LOAD INICIAL
  // ============================
  useEffect(() => {
    getTasks();
  }, []);

  // ============================
  // 🎨 RENDER
  // ============================
  return (
    <div className="layout">
      {/* Sidebar */}
      <Sidebar setView={setView} view={view} />

      {/* Conteúdo */}
      <div className="dashboard">
        <Navbar onLogout={logout} />

        {/* Estatísticas */}
        <div className="stats">
          <p>Total: {total}</p>
          <p>Concluídas: {completed}</p>
        </div>

        {/* Criar tarefa */}
        <TaskForm onCreate={createTask} />

        {/* Busca */}
        <input
          className="search-input"
          placeholder="Buscar tarefas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Lista */}
        {filteredTasks.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="task-list">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={deleteTask}
                onToggle={toggleTask}
                onFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}