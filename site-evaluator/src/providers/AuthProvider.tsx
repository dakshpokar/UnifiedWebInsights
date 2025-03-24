import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginRequest, User, authService } from '../api/services/authService';

// Enhanced user interface matching our auth service

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
  loading: boolean;
  login: (credentials: LoginRequest) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user is logged in on component mount
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setIsAuthenticated(true);
      try {
        setUser(JSON.parse(storedUser));
      } catch  {
        // If parsing fails, clear storage
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
      }
    }
  }, []);

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    
    try {
        const response = await authService.login(credentials);
        const userData = response.data.user;
        
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('authToken', response.data.accessToken);
        
        setUser(userData);
        setIsAuthenticated(true);
        
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Login failed';
        setError(message);
        setIsAuthenticated(false);
        throw err;
    } finally {
        setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, error, loading: isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};
