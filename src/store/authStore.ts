import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create()(
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
