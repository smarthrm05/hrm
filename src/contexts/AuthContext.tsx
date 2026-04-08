import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';

// TYPE ROLE
type Role = "HR" | "KARYAWAN" | "ATASAN";

// CONTEXT TYPE
interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string, role?: Role) => void; 
  logout: () => void;
  userId: string | null;
  username: string | null;
  role: Role | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// HOOK
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return context;
};

// PROVIDER
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<Role | null>(null);

  // CEK SESSION SAAT LOAD
  useEffect(() => {
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('user_id');
    const uname = localStorage.getItem('username');
    const expires = localStorage.getItem('token_expires');
    const storedRole = localStorage.getItem('role') as Role | null;

    const isValidSession =
      token && uid && expires && Date.now() < Number(expires);

    if (isValidSession) {
      setIsAuthenticated(true);
      setUserId(uid);
      setUsername(uname);
      if (storedRole) setRole(storedRole);
    } else {
      logout();
    }
  }, []);

  // LOGIN (MENERIMA PARAMETER ROLE)
  const login = useCallback(
    (usernameInput: string, password: string, userRole?: Role) => { 
      if (!usernameInput.trim() || !password.trim()) {
        toast({
          title: 'Login Gagal',
          description: 'Username dan password wajib diisi.',
          variant: 'destructive',
        });
        return;
      }

      // AUTO DETECT ROLE DARI EMAIL (FALLBACK)
      let detectedRole: Role = "KARYAWAN";

      if (usernameInput.includes("hrd")) {
        detectedRole = "HR";
      } else if (usernameInput.includes("atasan")) {
        detectedRole = "ATASAN";
      }


      const finalRole = userRole || detectedRole;

      const fakeToken = uuidv4();
      const fakeUserId = uuidv4();
      const expiresAt = Date.now() + 60 * 60 * 1000;

      // SIMPAN KE LOCAL STORAGE
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('user_id', fakeUserId);
      localStorage.setItem('username', usernameInput);
      localStorage.setItem('token_expires', expiresAt.toString());
      localStorage.setItem('role', finalRole); 

      // SET STATE
      setIsAuthenticated(true);
      setUserId(fakeUserId);
      setUsername(usernameInput);
      setRole(finalRole); 

      toast({
        title: 'Berhasil Login',
        description: `Selamat datang, ${usernameInput}`,
      });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('token_expires');
    localStorage.removeItem('role');

    setIsAuthenticated(false);
    setUserId(null);
    setUsername(null);
    setRole(null);

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
        role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};