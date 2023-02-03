import Project from "./project";
import ToDo from "./todo";

const project = Project("Default", "icon.png");
const myToDo = ToDo("Laundry", "White and color", new Date("2023-02-24"), 1);
const myToDo2 = ToDo("Garbage", "Take out paper", new Date("2023-02-12"), 2);

project.addToDo(myToDo);
project.addToDo(myToDo2);