import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type UserRole = 'student' | 'company' | 'university';

interface User {
  id: number;
  email: string;
  name?: string;
  role: UserRole;
  [key: string]: any;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  expiresAt: number | null;
  login: (data: { user: User; token: string; expiresAt?: number }) => void;
  logout: () => void;
  checkSession: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      expiresAt: null,

      login: (data) => {
        const { user, token, expiresAt } = data;
        set({
          user,
          token,
          // If expiresAt is provided, use it. Otherwise default to 24h from now (matches API default)
          expiresAt: expiresAt || Date.now() + 24 * 60 * 60 * 1000, 
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          expiresAt: null,
        });
        localStorage.removeItem('auth-storage'); // Clean up the specific key used by persist
      },

      checkSession: () => {
        const { token, expiresAt, logout } = get();
        if (!token || !expiresAt) {
            // Only logout if we initially thought we were authenticated to avoid loops
            if (get().isAuthenticated) logout();
            return false;
        }
        
        if (Date.now() > expiresAt) {
            logout();
            return false;
        }

        return true;
      }
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
