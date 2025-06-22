import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type User = {
  username: string;
  tipo: '0' | '1'; // 0 = admin, 1 = comum
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  const [user, setUser] = useState<User | null>(null);

useEffect(() => {
  const raw = localStorage.getItem('user');
  const tok = localStorage.getItem('token');
  if (raw && raw !== 'undefined' && raw !== 'null' && tok) {
    try {
      setUser(JSON.parse(raw));
      setToken(tok);
    } catch {
      logout();
    }
  }
}, [])

  const login = (token: string, user: User) => {
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAdmin: user?.tipo === '0' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

