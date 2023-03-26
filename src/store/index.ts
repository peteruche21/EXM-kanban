import { create } from "zustand";
import { IDappState } from "../types";

export const useDappStore = create<IDappState>()((set) => ({
  valid: null,
  setValid: (valid) => set({ valid }),

  projects: [],
  setProjects: (projects) => set({ projects }),
  addProject: (project) =>
    set((state) => ({
      projects: {
        ...state.projects,
        project,
      },
    })),

  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (key, task) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        [key]: {
          ...state.tasks[key],
          task,
        },
      },
    })),
}));
