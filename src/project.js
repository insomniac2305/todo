export default (name, icon) => {
  const toDoList = [];

  const addToDo = (toDo) => {
    toDoList.push(toDo);
  };

  const removeToDo = (id) => {
    const index = toDoList.findIndex(todo => todo.getID() === id);
    if (index > -1) {
      toDoList.splice(index, 1);
    }
  }

  const getToDoList = () => toDoList;

  return { name, icon, addToDo, removeToDo, getToDoList };
};
