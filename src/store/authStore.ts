import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserInfo {
  username: string;
  [key: string]: any;
}

interface AuthState {
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo | null) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (info) => set({ userInfo: info }),
      logout: () => set({ userInfo: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
