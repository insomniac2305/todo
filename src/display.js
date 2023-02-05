export default (() => {
  const appWindowNode = document.getElementById("app-window");
  const projectsNode = document.querySelector(".projects");
  const newProjectNode = document.querySelector(".new-project");
  const projectTitleHeaderNode = document.querySelector(".header>.project-title");
  const todoListNode = document.querySelector(".todo-list");
  const newTodoNode = document.querySelector(".new-todo");
  // const editTodoFormNode = document.querySelector("#edit-todo");
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
      icon: "drag-handle",
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

  const addProject = (id, title, icon, color, todoCount) => {
    const projectNode = createElemWithParam("div", "project");
    projectNode.dataset.id = id;
    const projectIconWrap = createElemWithParam("div", "project-icon");
    projectIconWrap.style.backgroundColor = color;
    const projectIconNode = createElemWithParam("span", "material-symbols-rounded", icon);
    projectIconWrap.appendChild(projectIconNode);
    projectNode.appendChild(projectIconWrap);

    const projectTitleNode = createElemWithParam("div", "project-title", title);
    projectNode.appendChild(projectTitleNode);

    const todoCountNode = createElemWithParam("div", "todo-count", todoCount);
    projectNode.appendChild(todoCountNode);

    projectsNode.insertBefore(projectNode, newProjectNode);
  };

  const addTodo = (title, dueDate, priority, done) => {
    const todoNode = createElemWithParam("div", "todo");
    done && todoNode.classList.add("done");
    const todoDoneBtn = createElemWithParam("button", "todo-done-btn");
    const todoDoneIcon = createElemWithParam("span", "material-symbols-rounded");
    todoDoneIcon.classList.add("no-fill");
    todoDoneBtn.appendChild(todoDoneIcon);
    todoNode.appendChild(todoDoneBtn);

    const todoTitleNode = createElemWithParam("div", "todo-title", title);
    todoNode.appendChild(todoTitleNode);

    const todoDateWrap = createElemWithParam("div", "todo-date");
    const todoDateNode = createElemWithParam("div", "date", dueDate.toLocaleDateString(undefined, DATEOPTIONS));
    todoDateWrap.appendChild(todoDateNode);
    todoNode.appendChild(todoDateWrap);

    const todoPrioWrap = createElemWithParam("div", "todo-priority");
    const todoPrioIconNode = createElemWithParam("span", "material-symbols-rounded", PRIORITIES[priority].icon);
    todoPrioIconNode.classList.add(PRIORITIES[priority].class);
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

    todoListNode.insertBefore(todoNode, newTodoNode);
  };

  const selectProject = (id, title) => {
    const curSelectedProjectNode = document.querySelector(".project.selected");
    curSelectedProjectNode.classList.remove("selected");
    const newSelectedProjectNode = document.querySelector(`.project[data-id="${id}"]`);
    newSelectedProjectNode.classList.add("selected");

    projectTitleHeaderNode.innerText = title;
  };

  const toggleEditMode = () => appWindowNode.classList.toggle("edit-active");

  const editTodo = (title, dueDate, priority, desc) => {
    toggleEditMode();
    editTodoTitleNode.value = title;
    editTodoDueDateNode.value = dueDate;
    selectTodoPrioNode.value = priority;
    editTodoDescNode.value = desc;
  };

  return { addProject, addTodo, selectProject, editTodo };
})();
