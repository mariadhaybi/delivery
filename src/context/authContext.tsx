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
  login: (email: string, password: string) => Promise<{ user: User }>;
  register: (data: any) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Function la tal2it el role kif ma kenet el structure mn el backend
  const extractRole = (data: any): "company" | "driver" | "admin" => {
    if (!data) return "company";

    const findRaw = (val: any): string | null => {
      if (!val) return null;
      if (typeof val === "string") return val;
      if (typeof val === "number") return String(val);
      if (typeof val === "object") {
        return val.name || val.slug || val.title || val.role_name || val.role || val.key || null;
      }
      return null;
    };

    // Check all possible nesting levels + name/email hints (ESSENTIAL since backend is missing 'role' field)
    const candidates = [
      data.role,
      data.roles?.[0],
      data.role_name,
      data.user?.role,
      data.user?.roles?.[0],
      data.data?.role,
      data.data?.user?.role,
      data.name, // Hinting from name (e.g. "Admin")
      data.email // Hinting from email
    ];

    let raw: string | null = null;
    for (const c of candidates) {
      raw = findRaw(c);
      if (raw) break;
    }

    const role = (raw ? String(raw) : "").toLowerCase().trim() || "company";

    if (role.includes("admin")) return "admin";
    if (role.includes("driver")) return "driver";
    if (role.includes("company") || role.includes("restaurant") || role.includes("vendor") || role.includes("business")) {
      return "company";
    }

    return "company";
  };


  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get("/api/me");
        const userDataRaw = res.data.user || res.data.data || res.data;
        const userData: User = {
          ...userDataRaw,
          role: extractRole(userDataRaw),
        };
        setUser(userData);
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
    localStorage.removeItem("token");
    await api.get("/sanctum/csrf-cookie");
    const res = await api.post("/api/login", { email, password });

    const receivedToken = res.data.token || res.data.access_token || res.data.data?.token;
    if (receivedToken) {
      localStorage.setItem("token", receivedToken);
      setToken(receivedToken);
    }

    let userData: User;
    const responseUserRaw = res.data.user || res.data.data || res.data;

    // Process user data immediately if ID/Email exists, even if role tags are missing
    if (responseUserRaw && (responseUserRaw.id || responseUserRaw.email)) {
      userData = {
        ...responseUserRaw,
        role: extractRole(responseUserRaw),
      };
      setUser(userData);
    } else {
      const userRes = await api.get("/api/me");
      const userDataRaw = userRes.data.user || userRes.data.data || userRes.data;
      userData = {
        ...userDataRaw,
        role: extractRole(userDataRaw),
      };
      setUser(userData);
    }

    return { user: userData };
  };

  const register = async (data: any) => {
    await api.get("/sanctum/csrf-cookie");
    const res = await api.post("/api/register", data);
    const receivedToken = res.data.token;
    localStorage.setItem("token", receivedToken);
    setToken(receivedToken);

    if (res.data.user) {
      setUser({ ...res.data.user, role: extractRole(res.data.user) });
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