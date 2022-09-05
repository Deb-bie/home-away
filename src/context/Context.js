import React, { createContext, useEffect, useState, useContext} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/Firebase';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

    }, []);

    if (loading) {
        return "Loading.....";
    }

    return <AuthContext.Provider value={user}>
        {children}
    </AuthContext.Provider>

}

export default AuthProvider;