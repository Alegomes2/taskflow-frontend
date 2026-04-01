export default function Navbar({ onLogout }) {
  return (
    <div className="navbar">
      <h2 className="logo">Taskflow</h2>

      <button className="logout-btn" onClick={onLogout}>
        🚪 Sair
      </button>
    </div>
  );
}