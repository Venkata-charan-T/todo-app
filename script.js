let taskList = document.getElementById("taskList");
let taskInput = document.getElementById("taskInput");

// Load saved tasks
window.onload = loadTasks;

function addTask() {
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    let li = createTaskElement(taskText);
    taskList.appendChild(li);

    saveTasks();
    taskInput.value = "";
}

function createTaskElement(text, completed = false) {
    let li = document.createElement("li");
    li.textContent = text;

    if (completed) {
        li.classList.add("completed");
    }

    li.onclick = function () {
        li.classList.toggle("completed");
        saveTasks();
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "delete-btn";

    deleteBtn.onclick = function (e) {
        e.stopPropagation();
        li.remove();
        saveTasks();
    };

    li.appendChild(deleteBtn);
    return li;
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        let li = createTaskElement(task.text, task.completed);
        taskList.appendChild(li);
    });
}
