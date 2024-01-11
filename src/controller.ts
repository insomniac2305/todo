import Display from "./display";
import createProject from "./project";
import createTodo from "./todo";
import { Project, Todo, Priority, StorableProject } from "./types";

export default (() => {
  const projects: Project[] = [];
  let selectedProjectId: number | undefined;

  const storage = (() => {
    try {
      const x = "__storage_test__";
      window.localStorage.setItem(x, x);
      window.localStorage.removeItem(x);
      return window.localStorage;
    } catch (e) {
      return undefined;
    }
  })();

  const storeData = () => {
    if (storage) {
      let storableProjects: StorableProject[] = [];
      projects.forEach((project) => {
        const storableProject: StorableProject = {
          title: project.title,
          icon: project.icon,
          color: project.getColor(),
          toDoList: project.getToDoList(),
        };
        storableProjects.push(storableProject);
      });
      const projectsJSON = JSON.stringify(storableProjects);
      storage.setItem("projects", projectsJSON);
    }
  };

  const findProjectById = (id: number) => projects.find((project) => project.getID() === id);
  const findTodoById = (projectId: number, id: number) =>
    findProjectById(projectId)
      ?.getToDoList()
      .find((todo) => todo.getID() === id);

  const selectProject = (id: number) => {
    const project = findProjectById(id);
    if (project) {
      selectedProjectId = id;
      Display.selectProject(id, project.title);
      Display.clearTodoList();
      for (let i = project.getToDoList().length - 1; i >= 0; i -= 1) {
        const todo = project.getToDoList()[i];
        Display.addTodo(todo.getID(), todo.title, todo.dueDate, todo.priority, todo.done);
      }
    }
  };

  const getSelectedProjectId = () => selectedProjectId;

  const addProject = (title: string, icon: string, color: string, store = true) => {
    const newProject = createProject(title, icon, color);
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
    store && storeData();
    return newProject;
  };

  const startNewProject = () => Display.startNewProject();
  const finishNewProject = () => Display.finishNewProject();
  const startEditProject = (id: number) => {
    const project = findProjectById(id);
    if (project) {
      Display.startEditProject(id, project.title, project.icon, project.getColor());
    }
  };

  const updateProject = (id: number, title: string, icon: string, color: string) => {
    const project = findProjectById(id);
    if (project) {
      project.title = title;
      project.icon = icon;
      project.setColor(color);
      Display.updateProject(id, title, icon, color, project.getFontColor(), project.getToDoList().length);
      storeData();
    }
  };

  const removeProject = (id: number) => {
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
    storeData();
  };

  const getOpenTodoCount = (id: number) => {
    const project = findProjectById(id);
    return project?.getToDoList().filter((todo) => !todo.done).length || 0;
  };

  const addTodo = (
    projectId: number,
    title: string,
    description?: string,
    dueDate?: Date,
    priority?: Priority,
    done = false,
    store = true
  ) => {
    const newTodo = createTodo(title, description, dueDate, priority, done);
    const project = findProjectById(projectId);
    if (project) {
      project.addTodo(newTodo);
      Display.addTodo(newTodo.getID(), newTodo.title, newTodo.dueDate, newTodo.priority, newTodo.done);
      Display.updateProjectTodoCount(projectId, getOpenTodoCount(projectId));
      store && storeData();
    }
  };

  const updateTodo = (
    projectId: number,
    id: number,
    title: string,
    description?: string,
    dueDate?: Date,
    priority?: Priority,
    done = false
  ) => {
    const updatedTodo = findTodoById(projectId, id);
    if (updatedTodo) {
      updatedTodo.title = title;
      updatedTodo.description = description;
      updatedTodo.dueDate = dueDate;
      updatedTodo.priority = priority;
      updatedTodo.done = done;
      Display.updateTodo(id, title, dueDate, priority, done);
      storeData();
    }
  };

  const removeTodo = (projectId: number, id: number) => {
    const project = findProjectById(projectId);
    if (project) {
      const tIndex = project.getToDoList().findIndex((todo) => todo.getID() === id);
      project.getToDoList().splice(tIndex, 1);
      Display.removeTodo(id);
      Display.updateProjectTodoCount(projectId, getOpenTodoCount(projectId));
      storeData();
    }
  };

  const startEditTodo = (projectId: number, id: number) => {
    const todo = findTodoById(projectId, id);
    if (todo) {
      Display.startEditTodo(id, todo.title, todo.dueDate, todo.priority, todo.description);
    }
  };

  const finishEditTodo = (
    projectId: number,
    id: number,
    title: string,
    description?: string,
    dueDate?: Date,
    priority?: Priority
  ) => {
    const todo = findTodoById(projectId, id);
    if (todo) {
      updateTodo(projectId, id, title, description, dueDate, priority, todo.done);
    }
    Display.finishEditTodo();
  };

  const cancelEditTodo = () => {
    Display.finishEditTodo();
  };

  const toggleTodoDone = (projectId: number, id: number) => {
    const todo = findTodoById(projectId, id);
    if (todo) {
      todo.done = !todo.done;
      Display.toggleTodoDone(id);
      Display.updateProjectTodoCount(projectId, getOpenTodoCount(projectId));
      storeData();
    }
  };

  const loadData = () => {
    if (storage) {
      let projectStorage = storage.getItem("projects");

      if (projectStorage) {
        const restoredProjects: StorableProject[] = JSON.parse(projectStorage);

        restoredProjects.forEach((project) => {
          const newProject = addProject(project.title, project.icon, project.color, false);
          const projectId = newProject.getID();

          project.toDoList.forEach((todo) => {
            const dueDate = todo.dueDate ? new Date(todo.dueDate) : undefined;
            addTodo(projectId, todo.title, todo.description, dueDate, todo.priority, todo.done, false);
          });
        });
      } else {
        addProject("General", "checklist", "#f35f4c");
      }
      selectProject(projects[0].getID());
    } else {
      addProject("General", "checklist", "#f35f4c");
    }
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
    loadData,
  };
})();
