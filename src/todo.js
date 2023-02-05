import IdGenerator from "./idGenerator";

export default (title, description, dueDate, priority) => {
  const id = IdGenerator.getUniqueID("todo");
  let done = false;

  const getID = () => id;
  const getDone = () => done;
  const toggleDone = () => {
    done = !done;
  };

  return { title, description, dueDate, priority, getID, getDone, toggleDone };
};