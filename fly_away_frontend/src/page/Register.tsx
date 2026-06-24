import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../service/auth";

function getErrorMessage(err: any) {
  const backendMessage = err.response?.data?.detail || err.response?.data?.message;

  if (backendMessage) return backendMessage;
  if (err.response?.status === 400) {
    return "No se pudo registrar. El correo puede estar en uso o algun dato no cumple las reglas.";
  }

  return "No se pudo registrar. Verifica que el backend este activo.";
}

export default function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !firstName || !lastName || !password) {
      setError("Es obligatorio completar todos los campos.");
      return;
    }

    try {
      await register({
        email,
        firstName,
        lastName,
        password,
      });

      setSuccess("Registro creado correctamente. Redirigiendo al login...");
      setTimeout(() => navigate("/login"), 700);
    } catch (err: any) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <section className="panel narrow-panel">
      <h2>Registro</h2>

      <form onSubmit={handleSubmit} className="form-grid">
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="dayron.cueva@utec.edu.pe"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Dayron"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div>
          <label>Apellido</label>
          <input
            type="text"
            placeholder="Cueva"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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

        <button type="submit">Registrarse</button>
      </form>

      {error && <p className="message error">{error}</p>}
      {success && <p className="message success">{success}</p>}
    </section>
  );
}

