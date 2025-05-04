// Global variables to track the state
let activeTasks = 0;
let currentOperations = 0;
let taskId = 0; // To generate unique IDs for tasks
let tasks = [];

// Function to initiate a task with description
function initiateTask() {
  const description = document.getElementById("taskDescription").value;
  
  if (!description.trim()) {
    alert("Please enter a description for the task.");
    return; // Prevent creating a task if no description is entered
  }

  activeTasks++;
  currentOperations++;
  taskId++;  // Generate a unique ID for each task
  let task = {
    id: taskId,
    name: `Task ${taskId}`,
    description: description, // Store the description
    status: 'Active',
  };
  tasks.push(task); // Add task to the tasks array
  updateDashboard();
  displayTasks();
  document.getElementById("taskDescription").value = ''; // Clear the description field after task is initiated
  alert('Task initiated!');
}

// Function to shut down the system
function shutdownSystem() {
  currentOperations = 0;
  tasks = []; // Clear all tasks when system shuts down
  updateDashboard();
  displayTasks();
  alert('System Shutdown');
}

// Function to start maintenance
function startMaintenance() {
  currentOperations = 0;
  tasks = []; // Clear all tasks during maintenance
  updateDashboard();
  displayTasks();
  alert('Maintenance started');
}

// Function to mark a task as completed
function completeTask(taskId) {
  // Find the task and update its status
  let task = tasks.find(t => t.id === taskId);
  if (task) {
    task.status = 'Completed';
    activeTasks--;
    currentOperations--;
    updateDashboard();
    displayTasks();
    alert(`Task ${taskId} completed!`);
  }
}

// Update dashboard stats dynamically
function updateDashboard() {
  document.getElementById("activeTasks").children[1].textContent = activeTasks;
  document.getElementById("currentOperations").children[1].textContent = currentOperations;

  if (currentOperations === 0) {
    document.getElementById("systemHealth").children[1].textContent = "Good";
  } else {
    document.getElementById("systemHealth").children[1].textContent = "Under Maintenance";
  }
}

// Display active tasks in the list
function displayTasks() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = ''; // Clear the existing list

  tasks.forEach(task => {
    let taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    taskItem.innerHTML = `
      <span>${task.name}: ${task.description} - ${task.status}</span>
      ${task.status === 'Active' ? `<button onclick="completeTask(${task.id})">Complete Task</button>` : ''}
    `;
    
    taskList.appendChild(taskItem);
  });
}
