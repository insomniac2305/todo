import "./style.css";
import Logo from "./assets/logo.svg";
import Controller from "./controller";
import { Priority } from "./types";

const imgLogo = document.getElementById("logo") as HTMLImageElement;
imgLogo.src = Logo;

Controller.loadData();

const newProjectBtn = document.querySelector(".new-project") as HTMLButtonElement;
const newProjectModal = document.querySelector(".modal#project-prompt") as HTMLElement;
const submitNewProjectBtn = document.querySelector("#submit-project-btn") as HTMLButtonElement;
const editProjectIdNode = document.querySelector("#project-id") as HTMLInputElement;
const editProjectColorNode = document.querySelector("#color") as HTMLInputElement;
const editProjectIconNode = document.querySelector("#icon") as HTMLInputElement;
const editProjectTitleNode = document.querySelector("#project-title") as HTMLInputElement;

const editProjectBtn = document.querySelector(".project-edit-btn") as HTMLButtonElement;
const deleteProjectBtn = document.querySelector(".project-delete-btn") as HTMLButtonElement;

const addTodoNode = document.querySelector(".new-todo") as HTMLInputElement;
const newTodoInput = addTodoNode?.querySelector("input#todo-title") as HTMLInputElement;
const newTodoBtn = document.querySelector(".new-todo-btn") as HTMLButtonElement;

const editTodoIdNode = document.querySelector("#todo-id") as HTMLInputElement;
const editTodoTitleNode = document.querySelector("#title") as HTMLInputElement;
const editTodoDueDateNode = document.querySelector("#due") as HTMLInputElement;
const selectTodoPrioNode = document.querySelector("#prio") as HTMLSelectElement;
const editTodoDescNode = document.querySelector("#desc") as HTMLInputElement;
const submitEditBtn = document.querySelector("#submit-edit-btn") as HTMLButtonElement;

function addListenersToSelection(
  selector: string,
  eventType: keyof HTMLElementEventMap,
  listener: (this: Element, ev: Event) => any
) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((elem) => {
    elem.removeEventListener(eventType, listener);
    elem.addEventListener(eventType, listener);
  });
}

function getIdFromEventTarget(e: Event, selector: string) {
  if (e.target instanceof Element) {
    const selectedElement = e.target.closest(selector) as HTMLElement;
    const selectedElementId = selectedElement?.dataset?.id;
    return selectedElementId ? parseInt(selectedElementId, 10) : undefined;
  }
}

function toggleTodoDone(e: Event) {
  const selectedProjectId = Controller.getSelectedProjectId();
  const selectedTodoId = getIdFromEventTarget(e, ".todo");
  if (selectedTodoId && selectedProjectId) {
    Controller.toggleTodoDone(selectedProjectId, selectedTodoId);
  }
}

function editTodo(e: Event) {
  const selectedProjectId = Controller.getSelectedProjectId();
  const selectedTodoId = getIdFromEventTarget(e, ".todo");
  if (selectedTodoId && selectedProjectId) {
    Controller.startEditTodo(selectedProjectId, selectedTodoId);
  }
}

function removeTodo(e: Event) {
  const selectedProjectId = Controller.getSelectedProjectId();
  const selectedTodoId = getIdFromEventTarget(e, ".todo");
  if (selectedTodoId && selectedProjectId) {
    Controller.removeTodo(selectedProjectId, selectedTodoId);
  }
}

function addTodoListeners() {
  addListenersToSelection(".todo-done-btn", "click", toggleTodoDone);
  addListenersToSelection(".todo-edit-btn", "click", editTodo);
  addListenersToSelection(".todo-delete-btn", "click", removeTodo);
}

function selectProject(e: Event) {
  const selectedProjectId = getIdFromEventTarget(e, ".project");
  if (selectedProjectId) {
    Controller.selectProject(selectedProjectId);
    addTodoListeners();
  }
}

function addProject(e: Event) {
  e.preventDefault();
  const title = editProjectTitleNode.value;
  const icon = editProjectIconNode.value;
  const color = editProjectColorNode.value;
  Controller.addProject(title, icon, color);
  Controller.finishNewProject();
  addListenersToSelection(".project", "click", selectProject);
}

function updateProject(e: Event) {
  e.preventDefault();
  const id = parseInt(editProjectIdNode.value, 10);
  const title = editProjectTitleNode.value;
  const icon = editProjectIconNode.value;
  const color = editProjectColorNode.value;
  Controller.updateProject(id, title, icon, color);
  Controller.finishNewProject();
  addListenersToSelection(".project", "click", selectProject);
}

function newProject() {
  submitNewProjectBtn.removeEventListener("click", updateProject);
  submitNewProjectBtn.addEventListener("click", addProject);
  Controller.startNewProject();
}

newProjectBtn.addEventListener("click", newProject);
newProjectModal.addEventListener("click", (e) => {
  if (e.target === newProjectModal) {
    Controller.finishNewProject();
  }
});

function editProject() {
  submitNewProjectBtn.removeEventListener("click", addProject);
  submitNewProjectBtn.addEventListener("click", updateProject);
  const selectedProjectId = Controller.getSelectedProjectId();
  if (selectedProjectId) {
    Controller.startEditProject(selectedProjectId);
  }
}

editProjectBtn.addEventListener("click", editProject);

function removeProject() {
  const selectedProjectId = Controller.getSelectedProjectId();
  if (selectedProjectId) {
    Controller.removeProject(selectedProjectId);
  }
}

deleteProjectBtn.addEventListener("click", removeProject);

function submitEditTodo(e: Event) {
  e.preventDefault();
  const id = parseInt(editTodoIdNode.value, 10);
  const title = editTodoTitleNode.value;
  const dateValue = editTodoDueDateNode.value;
  const date = dateValue ? new Date(dateValue) : undefined;
  const prio = ["low", "med", "high"].includes(selectTodoPrioNode.value)
    ? (selectTodoPrioNode.value as Priority)
    : "none";
  const desc = editTodoDescNode.value;
  const selectedProjectId = Controller.getSelectedProjectId();
  if (selectedProjectId) {
    Controller.finishEditTodo(selectedProjectId, id, title, desc, date, prio);
  }
  addTodoListeners();
}

submitEditBtn.addEventListener("click", submitEditTodo);

function addTodo(e: KeyboardEvent | MouseEvent) {
  const selectedProjectId = Controller.getSelectedProjectId();

  if (selectedProjectId && ((e instanceof KeyboardEvent && e.code === "Enter") || e instanceof MouseEvent)) {
    Controller.addTodo(selectedProjectId, newTodoInput.value, "");

    newTodoInput.value = "";
    addTodoListeners();
  }
}

addTodoNode.addEventListener("keydown", addTodo);
newTodoBtn.addEventListener("click", addTodo);

addListenersToSelection(".project", "click", selectProject);
const firstProject = document.querySelector(".project") as HTMLButtonElement;
firstProject.click();
