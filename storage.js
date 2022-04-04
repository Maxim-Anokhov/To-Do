const tasksList = new Set();

function setStorege(task) {
    tasksList.add(task)
    localStorage.setItem("task", JSON.stringify([...tasksList]))
}

function storageGetTask() {
    const tasksFromStorage = JSON.parse(localStorage.getItem("task"));
    return tasksFromStorage;
}

export { setStorege, storageGetTask, tasksList }