import { createContext } from "react";
import type { User } from "../types/user";

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
    loading:boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);