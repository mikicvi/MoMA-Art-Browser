import { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(() => {
		const savedUser = localStorage.getItem('user');
		return savedUser ? JSON.parse(savedUser) : null;
	});
	const [token, setToken] = useState(localStorage.getItem('token'));

	const login = (userData, authToken) => {
		setUser(userData);
		setToken(authToken);
		localStorage.setItem('user', JSON.stringify(userData));
		localStorage.setItem('token', authToken);
	};

	const logout = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem('user');
		localStorage.removeItem('token');
	};

	// Verify token on mount and periodically
	useEffect(() => {
		if (token && user) {
			// Could add token validation here if needed
			const tokenExp = JSON.parse(atob(token.split('.')[1])).exp;
			if (tokenExp * 1000 < Date.now()) {
				logout();
			}
		}
	}, [token, user]);

	return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
