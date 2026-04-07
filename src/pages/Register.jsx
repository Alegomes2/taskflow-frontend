import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/api/auth/register", {
        email,
        password,
      });

      alert("Conta criada com sucesso 🚀");

      // redireciona pro login
      navigate("/");
    } catch (err) {
      alert("Erro ao criar conta");
      console.log(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Criar conta</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Cadastrar</button>

      <p onClick={() => navigate("/")}>
        Já tem conta? Fazer login
      </p>
    </div>
  );
}