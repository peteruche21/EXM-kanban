import { z } from "zod";
import type { LoaderFunction, ActionFunction } from "react-router-dom";

const walletAddr = z.string().startsWith("0x").length(42);

export interface ITask {
  id: string;
  projectId: string;
  status: "TODO" | "DOING" | "DONE";
  title?: string;
  description?: string;
  duration?: number[];
  assignee?: z.infer<typeof walletAddr>;
  PR?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  comments?: string[];
}

export interface IProject {
  id: string;
  name: string;
  owner: z.infer<typeof walletAddr>;
  open: boolean;
}

export interface IDBResponse {
  projects: IProject[];
  tasks: ITask[];
  archive: ITask[];
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
  valid: boolean | null;
  setValid: (valid: boolean) => void;
}

export interface IActionButton {
  text: string;
  type: "button" | "submit" | "reset" | undefined;
  classname?: string;
  callback?: () => void;
}

export interface ITaskCardProps {
  data: ITask;
  id:  string;
  open?: boolean;
  callback?: () => Promise<void>;
}

export interface ITaskFormProps {
  data?: ITask;
  type: "new" | "update";
  id: string;
  onUpdate?: () => Promise<void>;
}
