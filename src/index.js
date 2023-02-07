import "./style.css";
import Logo from "./assets/logo.svg";
import Controller from "./controller";

const imgLogo = document.getElementById("logo");
imgLogo.src = Logo;

Controller.addProject("Default", "checklist", "#aaa");
Controller.selectProject(1);
Controller.addTodo(1, "Taxes", "Including crypto this year", new Date("2023-06-01"), "med");
Controller.addTodo(1, "MFA Security", "Add MFA to Home Assistant", new Date("2023-02-22"), "low");
Controller.addTodo(1, "Garbage", "Take out paper", new Date("2023-02-10"), "high");
Controller.startEditTodo(1, 3);
Controller.finishEditTodo(1, 3, "Take out trash", "Paper and Plastics", new Date("2023-02-13"), "med");
Controller.removeTodo(1, 3);
Controller.toggleTodoDone(1, 2);
Controller.removeProject(1);
