let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "active") {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (currentFilter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  }

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span onclick="toggleTask(${task.id})" class="${task.completed ? "completed" : ""}">
        ${task.text}
      </span>
      <button onclick="deleteTask(${task.id})">X</button>
    `;

    list.appendChild(li);
  });

  updateCounter();
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");

  if (input.value === "") return;

  tasks.push({
    id: Date.now(),
    text: input.value,
    completed: false
  });

  input.value = "";
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

function updateCounter() {
  const count = tasks.filter(task => !task.completed).length;
  document.getElementById("counter").innerText = `${count} task(s) left`;
}

function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  renderTasks();
}

renderTasks();
document.getElementById("taskInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});
