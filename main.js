const TASKS_KEY = "nir-Task-Board";

// Create array
let tasks = [];

// load item from local storage
loadFromLocalStorage();

function addTask() {
    // Prevent Refresh
    event.preventDefault();
    // get form's inputs box
    const taskDetailBox = document.getElementById("taskDetailBox");
    const dueDateBox = document.getElementById("dueDateBox");
    const timeBox = document.getElementById("timeBox");

    // Add value to object
    const task = {
        detail: taskDetailBox.value,
        date: dueDateBox.value,
        time: timeBox.value,
        id: tasks.length
    };


    // display array of tasks
    displayNewTask(task, tasks.length);

    // Add object to array
    tasks.push(task);

    // save to local storage
    saveToLocalStorage();

    // Clear form's inputs
    taskDetailBox.value = "";
    dueDateBox.value = "";
    timeBox.value = "";

    // Focus - back to the first input
    taskDetailBox.focus();
}

// Find task index in array from element id
function findTaskIndex(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            return i;
        }
    }
    return -1;
}

// Display new tasks in the container
function displayNewTask(newTask, currentTasksLength) {
    const notesContainer = document.getElementById("notesContainer");
    const child = document.createElement("div");
    child.setAttribute("class", "note");
    const date = new Date(newTask.date);
    const formattedDate = date.toLocaleDateString("en-GB");
    child.innerHTML = `<span id ="${currentTasksLength}" class="deleteIcon btn btn-danger" onclick="deleteTask(this)">X</span>
    <h6 class="scroll">Task Detail:<br> ${newTask.detail} </h6>
    <p>Due Date: ${formattedDate}
    Time: ${newTask.time} </p>`
    notesContainer.appendChild(child);
}

// Display Tasks
function displayAllTasks() {
    const notesContainer = document.getElementById("notesContainer");
    let html = "";
    for (let i = 0; i < tasks.length; i++) {
        const date = new Date(tasks[i].date);
        const formattedDate = date.toLocaleDateString("en-GB");
        html += `<div class="note">
        <span id ="${i}" class="deleteIcon btn btn-danger" onclick="deleteTask(this)">X</span>
        <h6 class="scroll">Task Detail:<br> ${tasks[i].detail} </h6>
        <p>Due Date: ${formattedDate}
        Time: ${tasks[i].time} </p>
            </div>`;
    }
    notesContainer.innerHTML = html;
}

// Delete note
function deleteTask(element) {
    const id = element.id;
    const note = document.getElementById(id);
    note.parentElement.remove();
    const index = findTaskIndex(id);
    if (index < 0) {
        return;
    }
    tasks.splice(index, 1);
    saveToLocalStorage();
}

// Save to Local Storage
function saveToLocalStorage() {
    const str = JSON.stringify(tasks);
    localStorage.setItem(TASKS_KEY, str);
}

// Load from Local Storage
function loadFromLocalStorage() {
    const strTasks = localStorage.getItem(TASKS_KEY);
    if (strTasks != null && strTasks.length > 0) {
        tasks = JSON.parse(strTasks);
    }
    displayAllTasks();
}