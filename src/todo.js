import IdGenerator from "./idGenerator";

export default (title, description, dueDate, priority, done = false) => {
  const id = IdGenerator.getUniqueID("todo");
  const getID = () => id;
  

  return { title, description, dueDate, priority, done, getID };
};