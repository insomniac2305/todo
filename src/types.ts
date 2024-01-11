export type Priority = "none" | "low" | "med" | "high";

export interface Todo {
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: Priority;
  done: boolean;
  getID: () => number;
}

export interface Project {
  title: string;
  icon: string;
  getColor: () => string;
  setColor: (newColor: string) => void;
  getFontColor: () => string;
  getID: () => number;
  addTodo: (toDo: Todo) => void;
  removeToDo: (todoId: number) => void;
  getToDoList: () => Todo[];
}

export interface StorableProject {
  title: Project["title"];
  icon: Project["icon"];
  color: ReturnType<Project["getColor"]>;
  toDoList: ReturnType<Project["getToDoList"]>;
}
