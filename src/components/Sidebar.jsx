export default function Sidebar({ setView, view }) {
  return (
    <div className="sidebar">
      <h2>Taskflow</h2>

      <nav>
        <p
          className={view === "all" ? "active" : ""}
          onClick={() => setView("all")}
        >
          📋 Tarefas
        </p>

        <p
          className={view === "favorites" ? "active" : ""}
          onClick={() => setView("favorites")}
        >
          ⭐ Favoritas
        </p>
      </nav>
    </div>
  );
}