import { createContext, useCallback, useEffect, useState } from "react"
import { getLocalStroage, removeLocalStroage } from "../utils/localStorage.service";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);

    useEffect(() => {
        setUser(getLocalStroage('user'));
    },[]);

    const logout = useCallback(() => {
        removeLocalStroage('user');
        setUser(null);
    },[])

    return (
        <AuthContext.Provider value={{user, setUser, logout}}>{children}</AuthContext.Provider>
    )
}