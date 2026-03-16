// DOM elements
var taskInput = document.getElementById("taskInput");
var dateInput = document.getElementById("dateInput");
var addTaskBtn = document.getElementById("addTaskBtn");
var taskList = document.getElementById("taskList");
var filterButtons = document.querySelectorAll(".filters button");
var tasks = [];
var currentFilter = "all";
// Add task button click
addTaskBtn.addEventListener("click", addTask);
function addTask() {
    var text = taskInput.value.trim();
    var date = dateInput.value;
    if (text === "")
        return;
    var newTask = {
        id: Date.now(),
        text: text,
        date: date,
        completed: false
    };
    tasks.push(newTask);
    taskInput.value = "";
    dateInput.value = "";
    renderTasks();
}
function renderTasks() {
    taskList.innerHTML = "";
    var filteredTasks = tasks.filter(function (task) {
        if (currentFilter === "completed")
            return task.completed;
        if (currentFilter === "pending")
            return !task.completed;
        return true;
    });
    filteredTasks.forEach(function (task) {
        var li = document.createElement("li");
        li.className = "task ".concat(task.completed ? "completed" : "");
        li.innerHTML = "\n            <input type=\"checkbox\" ".concat(task.completed ? "checked" : "", ">\n            <span>").concat(task.text, "</span>\n            <small>").concat(task.date || "", "</small>\n        ");
        var checkbox = li.querySelector("input");
        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;
            renderTasks();
        });
        taskList.appendChild(li);
    });
}
filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
        filterButtons.forEach(function (b) { return b.classList.remove("active"); });
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});
