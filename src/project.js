import IdGenerator from "./idGenerator";

export default (title, icon, initialColor) => {
  const id = IdGenerator.getUniqueID("project");
  const toDoList = [];
  let color = initialColor;

  const getID = () => id;

  const addTodo = (toDo) => {
    toDoList.push(toDo);
  };

  const removeToDo = (todoId) => {
    const index = toDoList.findIndex((todo) => todo.getID() === todoId);
    if (index > -1) {
      toDoList.splice(index, 1);
    }
  };

  const getToDoList = () => toDoList;

  const calcFontColor = (bgColor, lightColor, darkColor) => {
    const fontColor = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
    const r = parseInt(fontColor.substring(0, 2), 16);
    const g = parseInt(fontColor.substring(2, 4), 16);
    const b = parseInt(fontColor.substring(4, 6), 16);
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? darkColor : lightColor;
  };

  const getColor = () => color;

  const setColor = (newColor) => {
    color = newColor;
  };

  const getFontColor = () => calcFontColor(color, "#FFFFFF", "#000000");

  return { title, icon, getColor, setColor, getFontColor, getID, addTodo, removeToDo, getToDoList };
};
