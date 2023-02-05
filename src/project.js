import IdGenerator from "./idGenerator";

export default (title, icon) => {
  const id = IdGenerator.getUniqueID("project");
  const toDoList = [];

  const getID = () => id;

  const addToDo = (toDo) => {
    toDoList.push(toDo);
  };

  const removeToDo = (todoId) => {
    const index = toDoList.findIndex(todo => todo.getID() === todoId);
    if (index > -1) {
      toDoList.splice(index, 1);
    }
  }

  const getToDoList = () => toDoList;

  return { title, icon, getID, addToDo, removeToDo, getToDoList };
};
