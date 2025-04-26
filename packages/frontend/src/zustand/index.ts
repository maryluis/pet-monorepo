import { create } from 'zustand';

type Store = {
  token: string | null;
  id: string | null;
  addId: (id: string) => void;
  addToken: (newToken: string) => void;
  removeId: () => void;
  removeToken: () => void;
};

export const useStore = create<Store>((set) => ({
  token: null,
  id: null,
  addToken: (newToken: string) => set(() => {
    return { token: newToken };
  }),
  addId: (newId: string) => set(() => {
    return { id: newId };
  }),
  removeToken: () => set({ token: null }),
  removeId: () => set({ id: null }),
}));
