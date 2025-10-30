import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [auth, setAuth] = useState({
        token: window.localStorage.getItem("token"),
        userId: window.localStorage.getItem("userId")
    });

    const updateAuth = (newAuth) => {
        if (newAuth.token) {
            window.localStorage.setItem("token", newAuth.token);
            window.localStorage.setItem("userId", newAuth.userId);
        } else {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("userId");
        }

        setAuth(newAuth);
    }

return (
    <AuthContext.Provider value={{ 
        auth,
        setAuth: updateAuth,
        isLoggedIN: Boolean(auth.token),
        isOwner: (ownerId) => auth.userId ===ownerId
     }}>
        {props.children}
    </AuthContext.Provider>
    );
};