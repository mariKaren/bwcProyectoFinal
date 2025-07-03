import { createContext } from "react";
import type { User } from "../types/User";

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);