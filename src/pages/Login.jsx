import { useState } from "react";
import api from "../services/api";
import "../styles/login.css";
import "../styles/auth.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch (err) {
      alert("Erro no login");
    }
  };

  return (
    <div className="auth-container">
      <h2>Taskflow</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Entrar
      </button>

      <p onClick={() => navigate("/register")}>
        Não tem conta? Criar conta
      </p>
    </div>
  );
}