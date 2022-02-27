import { buttonAddTask, buttonDeleteTask, buttonChangeStatus, } from "./view.js";
buttonAddTask.forEach((button) => button.addEventListener("click", createTask));
buttonDeleteTask.forEach(button => button.addEventListener("click", deleteTask));
buttonChangeStatus.forEach(button => button.addEventListener("click", changeStatus));

function createTask(event) {
    const windowValue = event.currentTarget.previousElementSibling.value;
    const newTask = event.currentTarget.parentElement.parentElement;
    newTask.insertAdjacentHTML('beforeend', `<div class="paragraf greenStyle"><input class="leftButton greenStyle" id="changeStatusTask" type="button"><p class="content" id="p1">${windowValue}</p><input class="deleteTask" id="deleteTask" type="button"></div>`);
    newTask.lastElementChild.lastElementChild.addEventListener("click", deleteTask);
    newTask.lastElementChild.firstElementChild.addEventListener("click", changeStatus);
}

function deleteTask(event) {
    event.currentTarget.parentElement.remove();
}

function changeStatus(event) {
    event.currentTarget.parentElement.classList.toggle('paragraf')
    event.currentTarget.classList.toggle('greenStyle')
}