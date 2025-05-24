document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (taskText) {
        const listItem = createTaskItem(taskText, priority);
        
        switch (priority) {
            case 'Low':
                document.getElementById('lowPriorityList').appendChild(listItem);
                break;
            case 'Medium':
                document.getElementById('mediumPriorityList').appendChild(listItem);
                break;
            case 'High':
                document.getElementById('highPriorityList').appendChild(listItem);
                break;
        }

        taskInput.value = '';
        prioritySelect.selectedIndex = 0;
    } else {
        alert('Please enter a task.');
    }
});

function createTaskItem(taskText, priority) {
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', function() {
        completeTask(listItem);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        deleteTask(listItem);
    });

    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);
    
    return listItem;
}

function completeTask(listItem) {
    const completedTasksList = document.getElementById('completedTasksList');
    listItem.querySelector('button').remove(); // Remove the complete button
    listItem.classList.add('completed'); // Add completed class
    completedTasksList.appendChild(listItem); // Move to completed tasks
}

function deleteTask(listItem) {
    listItem.remove(); // Remove the task from the list
}