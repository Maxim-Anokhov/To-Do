import { buttonAddTask, buttonDeleteTask, buttonChangeStatus, } from "./view.js";
import { setStorege, storageGetTask, tasksList } from "./storage.js"

buttonAddTask.forEach((button) => button.addEventListener("click", getTaskName));
buttonDeleteTask.forEach(button => button.addEventListener("click", deleteTask));
buttonChangeStatus.forEach(button => button.addEventListener("click", changeStatus));

function getTaskName(event) {

    event.preventDefault();
    const taskName = event.currentTarget.parentElement.firstElementChild.value;
    const id = event.currentTarget.parentElement.parentElement.id;
    createTask(taskName, id);
}

function createTask(taskName, id) {

    const html_element = `<div class="paragraf greenStyle">
        <input class="leftButton greenStyle" id="changeStatusTask" type="button">
        <p class="content" id="p1">${taskName}</p>
        <input class="deleteTask" id="deleteTask" type="button">
        </div>`;
    const task = new Task(taskName, id, html_element);

    function Task(taskName, id, html_element) {
        this.taskName = taskName;
        this.priority = id;
        this.element = html_element;
    }
    checkTask(task);
}

// recursya
function checkTask(task) {
    const addedTasksName = [];
    const name = Array.from(document.querySelectorAll(".content"));
    let i = 0;

    function add_taskName() {

        addedTasksName.push(name[i++].textContent);
        if (i >= name.length) return;
        add_taskName();
    }
    add_taskName();

    const addedTask = addedTasksName.find(name => task.taskName == name);

    if (task.taskName !== addedTask) {
        setStorege(task);
        addTask(task);
    } else { alert("this task has already been added") }
}

function addTask(task) {

    const taskLow = document.querySelector(".low");
    const taskHigh = document.querySelector(".high");

    if (task.priority != "high") {
        taskLow.insertAdjacentHTML("beforeend", task.element);
    }
    if (task.priority != "low") {
        taskHigh.insertAdjacentHTML("beforeend", task.element);
    }
    document.querySelectorAll(".leftButton").forEach(button => button.addEventListener("click", changeStatus));
    document.querySelectorAll(".deleteTask").forEach(button => button.addEventListener("click", deleteTask));
}

function changeStatus(event) {

    event.currentTarget.parentElement.classList.toggle('paragraf');
    event.currentTarget.classList.toggle('greenStyle');
}


function deleteTask(event) {

    const deleteTask = event.currentTarget.previousElementSibling.textContent;
    const newTaskList = [...tasksList].filter(item => item.taskName !== deleteTask);
    event.currentTarget.parentElement.remove();
    tasksList.clear();
    localStorage.clear();
    newTaskList.forEach(task => {
        setStorege(task);
    });

}

// recursya
function startList() {
    const tasks = storageGetTask();
    let i = 0;
    let j = 0;

    if (localStorage.getItem !== null) {
        add_task_from_storage(tasks);
    }

    function add_task_from_storage(tasks) {

        addTask(tasks[i++]);
        tasksList.add(tasks[j++]);
        if (i >= tasks.length) return;
        add_task_from_storage(tasks);
    }
}
startList();