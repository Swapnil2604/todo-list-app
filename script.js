let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

// Function to display tasks
function displayTasks() {
    const pendingTasksDiv = document.getElementById('pendingTasks');
    const completedTasksDiv = document.getElementById('completedTasks');
    
    // Clear the task display areas
    pendingTasksDiv.innerHTML = '';
    completedTasksDiv.innerHTML = '';

    // Group tasks by priority
    const groupedTasks = {
        low: [],
        medium: [],
        high: []
    };

    tasks.forEach((task, index) => {
        groupedTasks[task.priority].push({ ...task, index });
    });

    // Display tasks by priority
    for (const priority in groupedTasks) {
        if (groupedTasks[priority].length > 0) {
            const priorityDiv = document.createElement('div');
            priorityDiv.innerHTML = `<strong>${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority</strong>`;
            groupedTasks[priority].forEach(task => {
                const taskDiv = document.createElement('div');
                taskDiv.className = 'task';
                taskDiv.innerHTML = `
                    <span>${task.text}</span>
                    <button onclick="completeTask(${task.index})">Complete</button>
                    <button onclick="deleteTask(${task.index})">Delete</button>
                `;
                priorityDiv.appendChild(taskDiv);
            });
            pendingTasksDiv.appendChild(priorityDiv);
        }
    }

    // Display completed tasks
    completedTasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task completed';
        taskDiv.innerHTML = `
            <span>${task.text}</span>
            <button onclick="deleteCompletedTask(${index})">Delete</button>
        `;
        completedTasksDiv.appendChild(taskDiv);
    });
}

// Function to add a task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    const newTask = {
        text: taskInput.value.trim(),
        priority: prioritySelect.value
    };

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    displayTasks();
}

// Function to complete a task
function completeTask(index) {
    const completedTask = tasks.splice(index, 1)[0];
    completedTasks.push(completedTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    displayTasks();
}

// Function to delete a task from pending tasks
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Function to delete a task from completed tasks
function deleteCompletedTask(index) {
    completedTasks.splice(index, 1);
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    displayTasks();
}

// Event listener for adding a task
document.getElementById('addTaskButton').addEventListener('click', addTask);

// Display tasks on page load
window.onload = displayTasks;
