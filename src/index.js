import "./style.css";
import Logo from "./assets/logo.svg";
import Controller from "./controller";

const imgLogo = document.getElementById("logo");
imgLogo.src = Logo;

Controller.addProject("General", "checklist", "#f35f4c");
Controller.addProject("Vacation", "flight", "#4c94f3");
Controller.addProject("Shopping", "shopping_cart", "#f3ab4c");
Controller.addTodo(1, "Taxes", "Including crypto this year", new Date("2023-06-01"), "med");
Controller.addTodo(1, "MFA Security", "Add MFA to Home Assistant", new Date("2023-02-22"), "low");
Controller.addTodo(1, "Garbage", "Take out paper", new Date("2023-02-10"), "high");

const newProjectBtn = document.querySelector(".new-project");
const newProjectModal = document.querySelector(".modal#project-prompt");
const submitNewProjectBtn = document.querySelector("#submit-project-btn");
const editProjectIdNode = document.querySelector("#project-id");
const editProjectColorNode = document.querySelector("#color");
const editProjectIconNode = document.querySelector("#icon");
const editProjectTitleNode = document.querySelector("#project-title");

const editProjectBtn = document.querySelector(".project-edit-btn");
const deleteProjectBtn = document.querySelector(".project-delete-btn");

const addTodoNode = document.querySelector(".new-todo");
const newTodoInput = addTodoNode.querySelector("input#todo-title");
const newTodoBtn = document.querySelector(".new-todo-btn");

const editTodoIdNode = document.querySelector("#todo-id");
const editTodoTitleNode = document.querySelector("#title");
const editTodoDueDateNode = document.querySelector("#due");
const selectTodoPrioNode = document.querySelector("#prio");
const editTodoDescNode = document.querySelector("#desc");
const submitEditBtn = document.querySelector("#submit-edit-btn");

function addListenersToSelection(selector, eventType, listener) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((elem) => {
    elem.removeEventListener(eventType, listener);
    elem.addEventListener(eventType, listener);
  });
}

function toggleTodoDone(e) {
  const selectedTodoId = parseInt(e.target.closest(".todo").dataset.id, 10);
  Controller.toggleTodoDone(Controller.getSelectedProjectId(), selectedTodoId);
}

function editTodo(e) {
  const selectedTodoId = parseInt(e.target.closest(".todo").dataset.id, 10);
  Controller.startEditTodo(Controller.getSelectedProjectId(), selectedTodoId);
}

function removeTodo(e) {
  const selectedTodoId = parseInt(e.target.closest(".todo").dataset.id, 10);
  Controller.removeTodo(Controller.getSelectedProjectId(), selectedTodoId);
}

function addTodoListeners() {
  addListenersToSelection(".todo-done-btn", "click", toggleTodoDone);
  addListenersToSelection(".todo-edit-btn", "click", editTodo);
  addListenersToSelection(".todo-delete-btn", "click", removeTodo);
}

function selectProject(e) {
  const selectedProjectId = parseInt(e.target.closest(".project").dataset.id, 10);
  Controller.selectProject(selectedProjectId);
  addTodoListeners();
}

function addProject(e) {
  e.preventDefault();
  const title = editProjectTitleNode.value;
  const icon = editProjectIconNode.value;
  const color = editProjectColorNode.value;
  Controller.addProject(title, icon, color);
  Controller.finishNewProject();
  addListenersToSelection(".project", "click", selectProject);
}

function updateProject(e) {
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
  Controller.startEditProject(Controller.getSelectedProjectId());
}

editProjectBtn.addEventListener("click", editProject);

function removeProject() {
  Controller.removeProject(Controller.getSelectedProjectId());
}

deleteProjectBtn.addEventListener("click", removeProject);

function submitEditTodo(e) {
  e.preventDefault();
  const id = parseInt(editTodoIdNode.value, 10);
  const title = editTodoTitleNode.value;
  const dateValue = editTodoDueDateNode.value;
  const date = dateValue !== "" ? new Date(dateValue) : "";
  const prio = selectTodoPrioNode.value;
  const desc = editTodoDescNode.value;
  Controller.finishEditTodo(Controller.getSelectedProjectId(), id, title, desc, date, prio);
  addTodoListeners();
}

submitEditBtn.addEventListener("click", submitEditTodo);

function addTodo(e) {
  if (
    Controller.getSelectedProjectId() !== undefined &&
    ((e.type === "keydown" && e.code === "Enter") || e.type === "click")
  ) {
    Controller.addTodo(Controller.getSelectedProjectId(), newTodoInput.value, "", null, "");
    newTodoInput.value = "";
    addTodoListeners();
  }
}

addTodoNode.addEventListener("keydown", addTodo);
newTodoBtn.addEventListener("click", addTodo);

addListenersToSelection(".project", "click", selectProject);
document.querySelector(".project").click();
