import { createContext, useEffect, useState, type ReactNode} from "react"

type AuthContextType = {

   
    login : (userEmail:string, password:string) => void
    logout: ()=>void
}

export const AuthContext = createContext<AuthContextType|null>(null)

export function AuthProvider ({children} : {children:ReactNode} ){

    const [email, setEmail] = useState<string | null> (null)

    useEffect (()=>{
        const saved = localStorage.getItem("email")
        if (saved) {
            setEmail(email)
        }
    },[])
    const login = (userEmail:string)=> {
        setEmail (userEmail)
        localStorage.getItem("userEmail")
    }
    const logout = () => {
        setEmail(null)
        localStorage.removeItem("email")
    }
    
   

    return (
        <AuthContext.Provider value={{ login ,logout}}>
            {children}
        </AuthContext.Provider>
    )
}