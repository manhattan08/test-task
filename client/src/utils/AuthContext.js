import {createContext, useState} from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isAuth,setIsAuth] = useState(window.localStorage.getItem("username") ? true:false)

    const handleLogin = () => {
        setIsAuth(true)
    }
    const handleLogout = () => {
        setIsAuth(false)
    }

    return (
        <AuthContext.Provider value={{isAuth,handleLogin,handleLogout}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };