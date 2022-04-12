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

    const task = new Task(taskName, id);
    task.prototype = `<div class="paragraf greenStyle">
        <input class="leftButton greenStyle" id="changeStatusTask" type="button">
        <p class="content" id="p1">${taskName}</p>
        <input class="deleteTask" id="deleteTask" type="button">
        </div>`;

    function Task(taskName, id) {
        this.taskName = taskName;
        this.priority = id;
    }
    checkTask(task);
}

function checkTask(task) {

    const addedTasksName = [];
    document.querySelectorAll(".content").forEach(item => addedTasksName.push(item.textContent));
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
        taskLow.insertAdjacentHTML("beforeend", task.prototype);
    }
    if (task.priority != "low") {
        taskHigh.insertAdjacentHTML("beforeend", task.prototype);
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

function startList() {

    const tasks = storageGetTask();
    if (localStorage.getItem("task") != null) {
        tasks.forEach(task => {
            addTask(task);
            tasksList.add(task);
        });
    }
}
startList();