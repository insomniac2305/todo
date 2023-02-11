import Display from "./display";
import Project from "./project";
import Todo from "./todo";

export default (() => {
  const projects = [];
  let selectedProjectId;

  const findProjectById = (id) => projects.find((project) => project.getID() === id);
  const findTodoById = (projectId, id) =>
    findProjectById(projectId)
      .getToDoList()
      .find((todo) => todo.getID() === id);

  const selectProject = (id) => {
    const project = findProjectById(id);
    selectedProjectId = id;
    Display.selectProject(id, project.title);
    Display.clearTodoList();
    for (let i = project.getToDoList().length - 1; i >= 0; i -= 1) {
      const todo = project.getToDoList()[i];
      Display.addTodo(todo.getID(), todo.title, todo.dueDate, todo.priority, todo.done);
    }
  };

  const getSelectedProjectId = () => selectedProjectId;

  const addProject = (title, icon, color) => {
    const newProject = Project(title, icon, color);
    projects.push(newProject);
    Display.addProject(
      newProject.getID(),
      newProject.title,
      newProject.icon,
      newProject.getColor(),
      newProject.getFontColor(),
      newProject.getToDoList().length
    );
    selectProject(newProject.getID());
  };

  const startNewProject = () => Display.startNewProject();
  const finishNewProject = () => Display.finishNewProject();
  const startEditProject = (id) => {
    const project = findProjectById(id);
    Display.startEditProject(id, project.title, project.icon, project.getColor());
  };

  const updateProject = (id, title, icon, color) => {
    const project = findProjectById(id);
    project.title = title;
    project.icon = icon;
    project.setColor(color);
    Display.updateProject(id, title, icon, color, project.getFontColor(), project.getToDoList().length);
  };

  const removeProject = (id) => {
    const pIndex = projects.findIndex((project) => project.getID() === id);
    projects.splice(pIndex, 1);
    Display.removeProject(id);
    if (projects.length === 0) {
      Display.clearTodoList();
      Display.clearHeader();
      selectedProjectId = undefined;
    } else {
      selectProject(projects[0].getID());
    }
  };

  const getOpenTodoCount = (id) => {
    const project = findProjectById(id);
    return project.getToDoList().filter((todo) => !todo.done).length;
  };

  const addTodo = (projectId, title, description, dueDate, priority) => {
    const newTodo = Todo(title, description, dueDate, priority);
    const project = findProjectById(projectId);
    project.addTodo(newTodo);
    Display.addTodo(newTodo.getID(), newTodo.title, newTodo.dueDate, newTodo.priority, newTodo.done);
    Display.updateProjectTodoCount(projectId, getOpenTodoCount(projectId));
  };

  const updateTodo = (projectId, id, title, description, dueDate, priority, done) => {
    const updatedTodo = findTodoById(projectId, id);
    updatedTodo.title = title;
    updatedTodo.description = description;
    updatedTodo.dueDate = dueDate;
    updatedTodo.priority = priority;
    updatedTodo.done = done;
    Display.updateTodo(id, title, dueDate, priority, done);
  };

  const removeTodo = (projectId, id) => {
    const project = findProjectById(projectId);
    const tIndex = project.getToDoList().findIndex((todo) => todo.getID() === id);
    project.getToDoList().splice(tIndex, 1);
    Display.removeTodo(id);
    Display.updateProjectTodoCount(projectId, getOpenTodoCount(projectId));
  };

  const startEditTodo = (projectId, id) => {
    const todo = findTodoById(projectId, id);
    Display.startEditTodo(id, todo.title, todo.dueDate, todo.priority, todo.description);
  };

  const finishEditTodo = (projectId, id, title, description, dueDate, priority) => {
    const todoDone = findTodoById(projectId, id).done;
    updateTodo(projectId, id, title, description, dueDate, priority, todoDone);
    Display.finishEditTodo();
  };

  const cancelEditTodo = () => {
    Display.finishEditTodo();
  };

  const toggleTodoDone = (projectId, id) => {
    const todo = findTodoById(projectId, id);
    todo.done = !todo.done;
    Display.toggleTodoDone(id);
    Display.updateProjectTodoCount(projectId, getOpenTodoCount(projectId));
  };

  return {
    addProject,
    startNewProject,
    finishNewProject,
    startEditProject,
    updateProject,
    removeProject,
    selectProject,
    getSelectedProjectId,
    addTodo,
    updateTodo,
    removeTodo,
    startEditTodo,
    finishEditTodo,
    cancelEditTodo,
    toggleTodoDone,
  };
})();
