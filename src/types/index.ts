import { z } from "zod";
import type { LoaderFunction, ActionFunction } from "react-router-dom";

const walletAddr = z.string().startsWith("0x").length(42);

export interface ITask {
  projectId: number;
  status?: "TODO" | "DOING" | "DONE";
  title?: string;
  description?: string;
  duration?: number[];
  assignee?: z.infer<typeof walletAddr>;
  PR?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  comments?: string[];
}

export interface IProject {
  name: string;
  owner: z.infer<typeof walletAddr>;
  open: boolean;
}

export interface IInput {
  fn:
    | "TODO"
    | "DOING"
    | "DONE"
    | "ARCHIVE"
    | "UPDATE"
    | "REMOVE"
    | "COMMENT"
    | "CREATE"
    | "CREATE_PROJECT"
    | "TOGGLE_PROJECT";
  index?: number;
  data?: ITask;
}

export interface IPage {
  default: any;
  loader?: LoaderFunction;
  action?: ActionFunction;
  ErrorBoundary?: any;
}

export interface IDappState {
  validity: boolean | null;
  setValidity: (validity: boolean) => void;

  projects: IProject[];
  setProjects: (projects: IProject[]) => void;

  tasks: { [key: number]: ITask[] };
  setTasks: (tasks: { [key: number]: ITask[] }) => void;
}
