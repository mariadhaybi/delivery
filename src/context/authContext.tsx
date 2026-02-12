import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

type User = {
  id: number;
  name: string;
  email: string;
  role: "company" | "driver" | "admin";
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(true);

  // Fetch user when token is available
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedUser: User = {
          ...res.data,
          role: res.data.roles?.[0] || "company",
        };
        setUser(fetchedUser);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const login = async (email: string, password: string) => {
    await api.get("/sanctum/csrf-cookie");
    const res = await api.post("/api/login", { email, password });

    const receivedToken = res.data.token;
    localStorage.setItem("token", receivedToken);
    setToken(receivedToken);

    // Set user immediately if backend returns it
    if (res.data.user) {
      setUser({
        ...res.data.user,
        role: res.data.user.roles?.[0] || "company",
      });
    } else {
      // fallback: fetch user
      const userRes = await api.get("/api/user", {
        headers: { Authorization: `Bearer ${receivedToken}` },
      });
      setUser({
        ...userRes.data,
        role: userRes.data.roles?.[0] || "company",
      });
    }
  };

  const register = async (data: any) => {
    await api.get("/sanctum/csrf-cookie");
    const res = await api.post("/api/register", data);

    const receivedToken = res.data.token;
    localStorage.setItem("token", receivedToken);
    setToken(receivedToken);

    if (res.data.user) {
      setUser({
        ...res.data.user,
        role: res.data.user.roles?.[0] || "company",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
