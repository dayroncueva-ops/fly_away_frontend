import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrent, login } from "../service/auth";

function getErrorMessage(err: any) {
  return err.response?.data?.detail || "Email o contrasena incorrectos.";
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Completa tu email y contrasena.");
      return;
    }

    try {
      const response = await login({ email, password });
      localStorage.setItem("token", response.data.token);

      const currentUserResponse = await getCurrent();
      const user = currentUserResponse.data;
      const name = user.firstName || user.firstname || user.username || user.email || "usuario";
      localStorage.setItem("userName", name);

      setSuccess(`Sesion iniciada${name ? `, ${name}` : ""}.`);
      navigate("/flights");
    } catch (err: any) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <section className="panel narrow-panel">
      <h2>Login</h2>

      <form onSubmit={handleSubmit} className="form-grid">
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Contrasena</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Iniciar sesion</button>
      </form>

      {error && <p className="message error">{error}</p>}
      {success && <p className="message success">{success}</p>}
    </section>
  );
}

