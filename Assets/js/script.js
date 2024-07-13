let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;
const modal = document.getElementById('modal'); // Update to select the modal directly
const btn = document.querySelector('.btn.btn-success');
const closeBtn = document.getElementById('close'); // Update to select the close button by ID

function generateTaskId() {
    const randomid = Math.random().toString(16).slice(2);
    const uniqueId = 'id_' + randomid;
    return uniqueId;
}

function appendTaskCard(taskCard, task) {
    if (task.status === 'to-do') {
        $('#todo-cards').append(taskCard);
        } else if (task.status === 'in-progress') {
        $('#in-progress-cards').append(taskCard);
    } else if (task.status === 'done') { 
        $('#done-cards').append(taskCard);
    }
}

function createTaskCard(task) {
    const { id, title, description, deadline } = task;
    
    const taskCardHTML = `
        <div id="task-${id}" class="task-card card mb-3">
            <div class="card-header">
                <h4>${title}</h4>
            </div>
            <div class="card-body">
                <p class="card-text">${description}</p>
                <p class="card-text">Deadline: ${deadline}</p>
                <button class="btn delete-task" data-id="${id}">Delete</button>
            </div>
        </div>
    `;
    
    return taskCardHTML;
}

function renderTaskList() {
    // Clear existing task cards in each lane
    $('#todo-cards').empty();
    $('#in-progress-cards').empty();
    $('#done-cards').empty();

    // Render task cards for each task in the taskList
    taskList.forEach(task => {
        const taskCard = createTaskCard(task); // Create the task card HTML
        const taskCardElement = $(taskCard); // Convert the HTML string to a jQuery element

        // Append the task card to the corresponding lane based on task status
        switch (task.status) {
            case 'to-do':
                $('#todo-cards').append(taskCardElement);
                break;
            case 'in-progress':
                $('#in-progress-cards').append(taskCardElement);
                break;
            case 'done':
                $('#done-cards').append(taskCardElement);
                break;
            default:
                break;
        }
        
        // Make task cards draggable
        taskCardElement.draggable({
            revert: 'invalid',
            stack: '.task-card',
            helper: 'clone',
            start: function(event, ui) {
                $(ui.helper).addClass('ui-helper');
            }
        });

        // Make lanes droppable for task cards
        $('.lane').droppable({
            accept: '.task-card',
            drop: handleDrop
        });

        // Add event listener for deleting tasks
        taskCardElement.find('.delete-task').on('click', function() {
            handleDeleteTask(task.id);
        });
    });
}

function handleAddTask(event) {
    event.preventDefault();
    const taskTitleInput = $('#name').val();
    const taskDescriptionInput = $('#content').val();
    const deadline = $('#date').val(); // Use deadline instead of taskDateInput
    const newTaskId = generateTaskId();
    const newTask = {
        id: newTaskId,
        title: taskTitleInput,
        description: taskDescriptionInput,
        deadline: deadline, // Use deadline instead of taskDateInput
        status: 'to-do'
    };

    taskList.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
    $('#modalForm')[0].reset();
    modal.style.display = 'none';
}
  // var retrievedTaskListJSON = localStorage.getItem('tasks');
// var retrievedTaskList = JSON.parse(retrievedTaskListJSON);


function checkLocalStorage() {
    let newTask;
    if (localStorage.getItem('tasks')) {
        newTask = JSON.parse(localStorage.getItem('tasks'));
    } else {
        newTask = [];
    }
    return newTask;
}
 
 taskList = checkLocalStorage();


 function handleDeleteTask(taskId) {
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
}

taskCardElement.find('.delete-task').on('click', function() {
    const taskId = $(this).data('id');
    handleDeleteTask(taskId);
});

function handleDrop(event, ui) {
    const taskId = parseInt(ui.draggable.attr('id').split('-')[1]);
    const newStatus = $(this).attr('id');

    taskList = taskList.map(task => {
        if (task.id === taskId) {
            task.status = newStatus;
        }
        return task;
    });}

// Event Listeners
function toggleModal() {
    if (modal.style.display === 'none') {
        modal.style.display = 'block';
    } else {
        modal.style.display = 'none';
    }
}

// Event listeners for modal interactions
btn.addEventListener('click', toggleModal);

if (closeBtn) {
    closeBtn.addEventListener('click', toggleModal);
} else {
    console.error('closeBtn is null. Check if the close button is correctly selected.');
}

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        toggleModal();
    }
});

// Document Ready
$(document).ready(function () {
    if (taskList && taskList.length > 0) {
        renderTaskList();
    }
});

$(function () {
    $('#task-deadline').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd' // Use yy-mm-dd format
    });
});