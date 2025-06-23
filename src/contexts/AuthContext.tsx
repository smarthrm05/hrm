import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  userId: string | null;
  username: string | null;
}

const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  userId: null,
  username: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook untuk menggunakan context dengan pengecekan aman
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  // Cek status login saat aplikasi dimuat
  useEffect(() => {
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('user_id');
    const uname = localStorage.getItem('username');
    const expires = localStorage.getItem('token_expires');

    const isValidSession = token && uid && expires && Date.now() < Number(expires);

    if (isValidSession) {
      setIsAuthenticated(true);
      setUserId(uid);
      setUsername(uname);
    } else {
      logout(); // Token expired atau tidak valid
    }
  }, []);

  const login = useCallback((usernameInput: string, password: string) => {
    // Validasi sederhana
    if (!usernameInput.trim() || !password.trim()) {
      toast({
        title: 'Login Gagal',
        description: 'Username dan password wajib diisi.',
        variant: 'destructive',
      });
      return;
    }

    // Simulasi login
    const fakeToken = uuidv4();
    const fakeUserId = uuidv4();
    const expiresAt = Date.now() + 60 * 60 * 1000; // 1 jam

    // Simpan ke localStorage
    localStorage.setItem('token', fakeToken);
    localStorage.setItem('user_id', fakeUserId);
    localStorage.setItem('username', usernameInput);
    localStorage.setItem('token_expires', expiresAt.toString());

    // Update state
    setIsAuthenticated(true);
    setUserId(fakeUserId);
    setUsername(usernameInput);

    toast({
      title: 'Berhasil Login',
      description: `Selamat datang, ${usernameInput}`,
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('token_expires');

    setIsAuthenticated(false);
    setUserId(null);
    setUsername(null);

    toast({
      title: 'Logout Berhasil',
      description: 'Sesi telah diakhiri',
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        userId,
        username,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
