import IdGenerator from "./idGenerator";
import { Todo, Priority } from "./types";

export default (
  title: string,
  description?: string,
  dueDate?: Date,
  priority?: Priority,
  done = false
): Todo => {
  const id = IdGenerator.getUniqueID("todo");
  const getID = () => id;

  return { title, description, dueDate, priority, done, getID };
};
