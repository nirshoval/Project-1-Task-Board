// load item from local storage
const TASKS_KEY = "nir-Task-Board";

// Create array
let tasks = [];

loadFromLocalStorage();

function addTask() {
    // Prevent Refresh
    event.preventDefault();
    // get form task box
    const taskDetailBox = document.getElementById("taskDetailBox");
    const dueDateBox = document.getElementById("dueDateBox");
    const timeBox = document.getElementById("timeBox");

    // Add value to object
    const task = {
        detail: taskDetailBox.value,
        date: dueDateBox.value,
        time: timeBox.value
    };

    // Add object to array
    tasks.push(task);
    console.log(tasks);

    // save to local storage
    saveToLocalStorage();

    // display array of tasks
    displayNewTasks(task, tasks.length);


    // Clear the note container
    taskDetailBox.value = "";
    dueDateBox.value = "";
    timeBox.value = "";

    // Focus - back to the first label
    taskDetailBox.focus();

}

function displayNewTasks(newTask, totalTasks) {
    const notesContainer = document.getElementById("notesContainer");
    const child = document.createElement("div");
    child.setAttribute("class", "note");
    const date = new Date(newTask.date);
    const formattedDate = date.toLocaleDateString("en-GB");
    child.innerHTML = `<span id ="${totalTasks}" class="deleteIcon btn btn-danger" onclick="deleteItem(this)">X</span>
    <h6 class="scroll">Task Detail:<br> ${newTask.detail} </h6>
    <p>Due Date: ${formattedDate}
    Time: ${newTask.time} </p>`
    notesContainer.appendChild(child);
}

// Display Tasks
function displayTasks() {
    const notesContainer = document.getElementById("notesContainer");
    let html = "";
    for (let i = 0; i < tasks.length; i++) {
        const date = new Date(tasks[i].date);
        const formattedDate = date.toLocaleDateString("en-GB");
        html += `<div class="note">
        <span id ="${i}" class="deleteIcon btn btn-danger" onclick="deleteItem(this)">X</span>
        <h6 class="scroll">Task Detail:<br> ${tasks[i].detail} </h6>
        <p>Due Date: ${formattedDate}
        Time: ${tasks[i].time} </p>
            </div>`;
    }

    notesContainer.innerHTML = html;

}

function deleteItem(element) {
    const index = element.id;
    const note = document.getElementById(index);
    note.style.opacity = 0;
    note.classList.add("fade-out");
    setTimeout(() => {
        note.style.display = "none";
        tasks.splice(index, 1);
        saveToLocalStorage();
        note.parentElement.remove();
    }, 200);
}

function saveToLocalStorage() {
    const str = JSON.stringify(tasks);
    localStorage.setItem(TASKS_KEY, str);
}

function loadFromLocalStorage() {
    const strTasks = localStorage.getItem(TASKS_KEY);
    if (strTasks != null && strTasks.length > 0) {
        tasks = JSON.parse(strTasks);
    }
    displayTasks();
}

