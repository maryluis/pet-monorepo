import { create } from 'zustand';

type Store = {
  token: string | null;
  addToken: (newToken: string) => void;
  removeToken: () => void;
};

export const useStore = create<Store>((set) => ({
  token: null,
  addToken: (newToken) => set(() => {
    return { token: newToken };
  }),
  removeToken: () => set({ token: null }),
}));
