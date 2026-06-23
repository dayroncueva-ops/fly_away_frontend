import { useState } from "react"
import { register } from "../service/auth";



export default function Register() {
    const [email,setEmail] = useState("");
    const[firstname, setFirstname] =useState("");
    const[lastname, setLastname] = useState("");
    const[password,setPassword] =useState("");

    const[error,setError] = useState("");
    const[success,setSuccess] = useState("");
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault; // el usuario no recargue la pagina al enviar formulario
        setError("");
        setSuccess("");
        //validaciones
        if (!email || !firstname || !lastname || !password) {
            setError("Es obligatorio completar todo")
            return;
        }
        // validaciones del backend
        try {
            await register ({
                email, firstname, lastname, password,
            });
            setSuccess("Buena causa");
            setFirstname("");
            setLastname("");
            setEmail("");
            setPassword("");
        } catch(err:any) {
            const message = err.response?.data?.detail || "Error al registrar bb";
            setError(message);
        }


    };
    //placeholder: es lo q aparece en el fondo como ejemplo
    return (
        <div> 
            <h1>Registroo!!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email" placeholder="dayron.cueva@utec.edu.pe" 
                    value={email} onChange={(e)=>setEmail(e.target.value)} />
                    
                </div>
                <div>
                    <label>Firstname</label>
                    <input type="text" placeholder="Dayron" 
                    value={firstname} onChange={(e)=>setFirstname(e.target.value)} />
                </div>
                <div>
                    <label>Lastname</label>
                    <input type="text" placeholder="Cueva" 
                    value={lastname} onChange={(e)=>setLastname(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" 
                    value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <button type="submit">Registrarse</button>
                 {error && <p style={{ color: "red" }}>{error}</p>}
                 {success && <p style={{ color: "green" }}>{success}</p>}
            </form>
        </div>
    );
}
