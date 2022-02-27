import { buttonAddTask, buttonDeleteTask, buttonChangeStatus, inputWindowHigh, inputWindowLow } from "./view.js";
const taskName = document.querySelectorAll(".contentHigh")
buttonAddTask.forEach((button) => {
    button.addEventListener("click", function addTask() {
        let idHigh = listHigh.length;
        let idLow = listLow.length;
        if (button.id === "addTaskHigh") {
            idHigh++
            let name = inputWindowHigh.value;
            listHigh.push({ id: idHigh, name, status: "To Do" });

            taskName.forEach((id) => {

                id.insertAdjacentHTML("afterbegin", inputWindowHigh.value)
                console.log(id)
            })
        } else if (button.id === "addTaskLow") {
            idLow++
            let name = inputWindowLow.value;
            listLow.push({ id: idLow, name, status: "To Do" });
            console.log(listLow);
        }

    })
});


buttonDeleteTask.forEach((button) => {
    button.addEventListener("click", deleteTask);
})


const listHigh = [];
const listLow = [];
const sortStatus = [
    { status: "Done" },
    { status: "To Do" },
    { status: "In Progress" },
];
const sortPriority = [
    { priority: "Low" },
    { priority: "High" },
];



// function changeStatus(id, status) {
//     const statusTask = list.find(item => item.id === id);
//     statusTask.status = status;

// }

// function changePriority(id, priority) {
//     const priorityTask = list.find(item => item.id === id);
//     priorityTask.priority = priority;

// }

function deleteTask(id) {
    const index = list.findIndex(item => item.id === id);
    if (index !== -1) {
        list.splice(index, 1);
    }

}

function showListBy(parametr, name) {
    let sortName;
    let newList;
    if (parametr != sortPriority) {
        sortName = "Status";
        newList = list.filter(item => item.status === name).map(item => item.name).join("\n");
    } else if (parametr != sortStatus) {
        sortName = "Priority";
        newList = list.filter(item => item.priority === name).map(item => item.name).join("\n");
    }
    let showList = `Sort by${sortName} "${name}":\n${newList}`;
    console.log(showList);

}
// changeStatus(3, "In Progress");
// changePriority(1, "Higt");
// deleteTask(3);
// console.log(list);
// addTask("have a wolk");
// console.log(list);

// showListBy(sortStatus, "To Do");
// showListBy(sortPriority, "High");