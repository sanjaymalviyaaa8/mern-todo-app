import {
    createContext,
    useContext,
    useState,
} from "react";

import {
    registerUser,
    loginUser,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");

        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [loading, setLoading] = useState(false);

    // LOGIN
    const login = async (credentials) => {
        setLoading(true);

        try {
            const data = await loginUser(credentials);

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            setUser(data.user);

            return data;
        } finally {
            setLoading(false);
        }
    };

    // REGISTER
    const register = async (userData) => {
        setLoading(true);

        try {
            await registerUser(userData);

            // Automatically login after successful registration
            const data = await loginUser({
                email: userData.email,
                password: userData.password,
            });

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            setUser(data.user);

            return data;
        } finally {
            setLoading(false);
        }
    };

    // LOGOUT
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
    };

    const value = {
        user,
        loading,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook
export const useAuth = () => {
    return useContext(AuthContext);
};