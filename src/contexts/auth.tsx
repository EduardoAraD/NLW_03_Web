import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

import api from '../services/api'

interface Props {
    children: ReactNode;
}

interface User {
    name: string;
    email: string;
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
    signIn(email: string, password: string, remind: boolean): Promise<boolean>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        function loadingStorage() {
            const storageUser = localStorage.getItem('@Happy:user')
            const storageToken = localStorage.getItem('@Happy:token')

            if (storageUser && storageToken) {
                api.defaults.headers.Authorization = `Bearer ${storageToken}`;

                setUser(JSON.parse(storageUser));
            }
        }

        loadingStorage();
    }, []);

    async function signIn(email: string, password: string, remind: boolean) {

        try {
            const response = await api.post('/login', { email, password })

            const { token, user } = response.data;

            setUser(user)

            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            if (remind) {
                localStorage.setItem('@Happy:user', JSON.stringify(user))
                localStorage.setItem('@Happy:token', token);
            }

            return true;
        } catch (e) {
            console.log(e)
            return false;
        }
    }

    function signOut() {
        localStorage.clear()
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext)

    return context;
}