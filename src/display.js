export default (() => {
  const appWindowNode = document.getElementById("app-window");
  const projectsNode = document.querySelector(".projects");
  const newProjectNode = document.querySelector(".new-project");
  const editProjectModal = document.querySelector(".modal#project-prompt");
  const editProjectForm = document.querySelector("#edit-project");
  const editProjectHeader = document.querySelector(".modal#project-prompt .form-heading");
  const editProjectIdNode = document.querySelector("#project-id");
  const editProjectColorNode = document.querySelector("#color");
  const editProjectIconNode = document.querySelector("#icon");
  const editProjectTitleNode = document.querySelector("#project-title");
  const projectTitleHeaderNode = document.querySelector(".header>.project-title");
  const editProjectBtn = document.querySelector(".project-edit-btn");
  const deleteProjectBtn = document.querySelector(".project-delete-btn");
  const todoListNode = document.querySelector(".todo-list");
  const newTodoNode = document.querySelector(".new-todo");
  const editTodoFormNode = document.querySelector("#edit-todo");
  const editTodoIdNode = document.querySelector("#todo-id");
  const editTodoTitleNode = document.querySelector("#title");
  const editTodoDueDateNode = document.querySelector("#due");
  const selectTodoPrioNode = document.querySelector("#prio");
  const editTodoDescNode = document.querySelector("#desc");

  const PRIORITIES = {
    low: {
      class: "prio-low",
      icon: "keyboard_double_arrow_down",
    },
    med: {
      class: "prio-med",
      icon: "drag_handle",
    },
    high: {
      class: "prio-high",
      icon: "keyboard_double_arrow_up",
    },
  };

  const DATEOPTIONS = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  };

  const createElemWithParam = (tag, className, innerText = "") => {
    const element = document.createElement(tag);
    element.classList.add(className);
    element.innerText = innerText;
    return element;
  };

  const addProject = (id, title, icon, bgColor, fontColor, todoCount, insertPosition = newProjectNode) => {
    const projectNode = createElemWithParam("div", "project");
    projectNode.dataset.id = id;
    const projectIconWrap = createElemWithParam("div", "project-icon");
    projectIconWrap.style.backgroundColor = bgColor;
    const projectIconNode = createElemWithParam("span", "material-symbols-rounded", icon);
    projectIconNode.style.color = fontColor;
    projectIconWrap.appendChild(projectIconNode);
    projectNode.appendChild(projectIconWrap);

    const projectTitleNode = createElemWithParam("div", "project-title", title);
    projectNode.appendChild(projectTitleNode);

    const todoCountNode = createElemWithParam("div", "todo-count", todoCount);
    projectNode.appendChild(todoCountNode);

    projectsNode.insertBefore(projectNode, insertPosition);
  };

  const startNewProject = () => {
    editProjectHeader.innerText = "New Project";
    editProjectModal.style.display = "block";
  };

  const finishNewProject = () => {
    editProjectModal.style.display = "none";
    editProjectForm.reset();
  };

  const startEditProject = (id, title, icon, color) => {
    editProjectHeader.innerText = "Edit Project";
    editProjectModal.style.display = "block";
    editProjectIdNode.value = id;
    editProjectTitleNode.value = title;
    editProjectIconNode.value = icon;
    editProjectColorNode.value = color;
  };

  const removeProject = (id) => {
    const projectToBeRemoved = document.querySelector(`.project[data-id="${id}"]`);
    projectToBeRemoved.remove();
  };

  const selectProject = (id, title) => {
    const curSelectedProjectNode = document.querySelector(".project.selected");
    curSelectedProjectNode && curSelectedProjectNode.classList.remove("selected");
    const newSelectedProjectNode = document.querySelector(`.project[data-id="${id}"]`);
    newSelectedProjectNode.classList.add("selected");

    projectTitleHeaderNode.innerText = title;
    editProjectBtn.hidden = false;
    deleteProjectBtn.hidden = false;
  };

  const updateProject = (id, title, icon, bgColor, fontColor, todoCount) => {
    const siblingNode = document.querySelector(`.project[data-id="${id}"]`).nextElementSibling ?? newProjectNode;
    removeProject(id);
    addProject(id, title, icon, bgColor, fontColor, todoCount, siblingNode);
    selectProject(id, title);
  };

  const updateProjectTodoCount = (id, count) => {
    const countNode = document.querySelector(`.project[data-id="${id}"]>.todo-count`);
    countNode.innerText = count;
  };

  const clearHeader = () => {
    projectTitleHeaderNode.innerText = "";
    editProjectBtn.hidden = true;
    deleteProjectBtn.hidden = true;
  };

  const addTodo = (id, title, dueDate, priority, done, insertPosition = newTodoNode) => {
    const todoNode = createElemWithParam("div", "todo");
    done && todoNode.classList.add("done");
    todoNode.dataset.id = id;
    const todoDoneBtn = createElemWithParam("button", "todo-done-btn");
    const todoDoneIcon = createElemWithParam("span", "material-symbols-rounded");
    todoDoneIcon.classList.add("no-fill");
    todoDoneBtn.appendChild(todoDoneIcon);
    todoNode.appendChild(todoDoneBtn);

    const todoTitleNode = createElemWithParam("div", "todo-title", title);
    todoNode.appendChild(todoTitleNode);

    const todoDateWrap = createElemWithParam("div", "todo-date");
    const dateFormatted = dueDate instanceof Date ? dueDate.toLocaleDateString(undefined, DATEOPTIONS) : "";
    const todoDateNode = createElemWithParam("div", "date", dateFormatted);
    todoDateWrap.appendChild(todoDateNode);
    todoNode.appendChild(todoDateWrap);

    const todoPrioWrap = createElemWithParam("div", "todo-priority");
    const prioIcon = Object.prototype.hasOwnProperty.call(PRIORITIES, priority) ? PRIORITIES[priority].icon : "";
    const todoPrioIconNode = createElemWithParam("span", "material-symbols-rounded", prioIcon);
    prioIcon !== "" && todoPrioIconNode.classList.add(PRIORITIES[priority].class);
    todoPrioWrap.appendChild(todoPrioIconNode);
    todoNode.appendChild(todoPrioWrap);

    const todoEditBtn = createElemWithParam("button", "todo-edit-btn");
    const todoEditIconNode = createElemWithParam("span", "material-symbols-rounded", "edit");
    todoEditBtn.appendChild(todoEditIconNode);
    todoNode.appendChild(todoEditBtn);

    const todoDeleteBtn = createElemWithParam("button", "todo-delete-btn");
    const todoDeleteIconNode = createElemWithParam("span", "material-symbols-rounded", "delete");
    todoDeleteBtn.appendChild(todoDeleteIconNode);
    todoNode.appendChild(todoDeleteBtn);

    todoListNode.insertBefore(todoNode, insertPosition);
  };

  const removeTodo = (id) => {
    const todoToBeRemoved = document.querySelector(`.todo[data-id="${id}"]`);
    todoToBeRemoved && todoToBeRemoved.remove();
  };

  const clearTodoList = () => {
    const list = Array.from(todoListNode.childNodes);
    list.forEach((node) => {
      node.classList?.contains("new-todo") || node.remove();
    });
  };

  const updateTodo = (id, title, dueDate, priority, done) => {
    const siblingNode = document.querySelector(`.todo[data-id="${id}"]`).nextElementSibling ?? newTodoNode;
    removeTodo(id);
    addTodo(id, title, dueDate, priority, done, siblingNode);
  };

  const startEditTodo = (id, title, dueDate, priority, desc) => {
    appWindowNode.classList.add("edit-active");
    editTodoIdNode.value = id;
    editTodoTitleNode.value = title;
    const dateValue = dueDate instanceof Date ? dueDate.toISOString().slice(0, -1) : "";
    editTodoDueDateNode.value = dateValue;
    selectTodoPrioNode.value = priority;
    editTodoDescNode.value = desc;
  };

  const finishEditTodo = () => {
    appWindowNode.classList.remove("edit-active");
    editTodoFormNode.reset();
  };

  const toggleTodoDone = (id) => {
    const todo = document.querySelector(`.todo[data-id="${id}"]`);
    todo.classList.toggle("done");
  };

  return {
    addProject,
    startNewProject,
    finishNewProject,
    startEditProject,
    removeProject,
    updateProject,
    updateProjectTodoCount,
    clearHeader,
    selectProject,
    addTodo,
    removeTodo,
    clearTodoList,
    updateTodo,
    startEditTodo,
    finishEditTodo,
    toggleTodoDone,
  };
})();
