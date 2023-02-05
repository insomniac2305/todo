import "./style.css";
import Logo from "./assets/logo.svg";
import Project from "./project";
import ToDo from "./todo";
import Display from "./display";

const imgLogo = document.getElementById("logo");
imgLogo.src = Logo;

const project = Project("Default", "checklist");
const myToDo = ToDo("Laundry", "White and color", new Date("2023-02-24"), "high");
const myToDo2 = ToDo("Garbage", "Take out paper", new Date("2023-02-12"), "med");

project.addToDo(myToDo);
project.addToDo(myToDo2);


Display.addProject(project.getID(), project.title, project.icon, "#aaa", "5");
Display.addTodo(myToDo.title, myToDo.dueDate, myToDo.priority, false);
Display.selectProject(project.getID(), project.title);
