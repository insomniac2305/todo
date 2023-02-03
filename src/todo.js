let uniqueID = 0;
const getUniqueID = () => {
  uniqueID += 1;
  return uniqueID;
};

export default (title, description, dueDate, priority) => {
  const id = getUniqueID();
  let done = false;

  const getID = () => id;
  const getDone = () => done;
  const toggleDone = () => {
    done = !done;
  };

  return { title, description, dueDate, priority, getID, getDone, toggleDone };
};