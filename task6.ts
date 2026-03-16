interface Task {
    id: number;
    text: string;
    date: string;
    completed: boolean;
}

// DOM elements
const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const dateInput = document.getElementById("dateInput") as HTMLInputElement;
const addTaskBtn = document.getElementById("addTaskBtn") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;
const filterButtons = document.querySelectorAll<HTMLButtonElement>(".filters button");

let tasks: Task[] = [];
let currentFilter: "all" | "completed" | "pending" = "all";

// Add task button click
addTaskBtn.addEventListener("click", addTask);

function addTask(): void {
    const text: string = taskInput.value.trim();
    const date: string = dateInput.value;

    if (text === "") return;

    const newTask: Task = {
        id: Date.now(),
        text,
        date,
        completed: false
    };

    tasks.push(newTask);

    taskInput.value = "";
    dateInput.value = "";

    renderTasks();
}

function renderTasks(): void {
    taskList.innerHTML = "";

    const filteredTasks: Task[] = tasks.filter(task => {
        if (currentFilter === "completed") return task.completed;
        if (currentFilter === "pending") return !task.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        const li: HTMLLIElement = document.createElement("li");
        li.className = `task ${task.completed ? "completed" : ""}`;

        li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""}>
            <span>${task.text}</span>
            <small>${task.date || ""}</small>
        `;

        const checkbox = li.querySelector("input") as HTMLInputElement;

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            renderTasks();
        });

        taskList.appendChild(li);
    });
}

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        currentFilter = btn.dataset.filter as "all" | "completed" | "pending";

        renderTasks();
    });
});
