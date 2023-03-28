import { create } from "zustand";
import { IDappState } from "../types";

export const useDappStore = create<IDappState>()((set) => ({
  valid: null,
  setValid: (valid) => set({ valid }),
}));
