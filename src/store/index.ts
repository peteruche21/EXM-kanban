import { create } from "zustand";
import { IDappState } from "../types";

export const useDappStore = create<IDappState>()((set) => ({
  validity: null,
  setValidity: (validity) => set({ validity }),

  projects: [],
  setProjects: (projects) => set({ projects }),

  tasks: [],
  setTasks: (tasks) => set({ tasks }),
}));
