import { useState } from "react";
import { getCurrent, login } from '../service/auth';

export default function Login () {
    const [email, setEmail] = useState("");
    const[password,setPassword]=useState("");
    const[error, setError] =useState("");
    const[success, setSuccess] = useState("");
    const[userName,setUserName] = useState("");
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (!email || !password) {
            setError("Obligatorio completar :<")
            return;
        }
        try {
            const response = await login ({
                email,
                password,
            });
            const token = response.data.token;
            localStorage.setItem("token",token);
            const currentUserResponse = await getCurrent();
            setUserName(currentUserResponse.data.firstname);
            setSuccess("Excelente");
        } catch(err:any) {
            const message = err.response?.data?.detail || "Incorrectooo";
            setError(message)
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label >Email</label>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div>
                    <label >Password</label>
                    <input type="passsword" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                 
                  <button type="submit">Iniciar Sesion</button>
            </form>
             {error && <p style={{ color: "red" }}>{error}</p>}
             {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
    );
};