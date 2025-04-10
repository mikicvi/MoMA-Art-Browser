import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(localStorage.getItem('token'));

	const login = (userData, authToken) => {
		setUser(userData);
		setToken(authToken);
		localStorage.setItem('token', authToken);
	};

	const logout = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem('token');
	};

	return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
