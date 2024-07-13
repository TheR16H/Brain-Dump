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
    const taskCardEl =
    $(`<div class = "task-card card m-4 mt-2" id=${task.taskId}>
        <h5 class="card-header">${task.title}</h5>
        <div class="card-body">
          <p class="card-text">${task.description}</p>
          <p class="card-text">${task.date}</p>
          <button class="btn btn-danger border border-white delete">Delete</button>
        </div>
      </div>`);
    }
function renderTaskList() {
    // Clear existing task cards in each lane
    $('#todo-cards').empty();
    $('#in-progress-cards').empty();
    $('#done-cards').empty();

    // Render task cards for each task in the taskList
    taskList.forEach(task => {
        const taskCard = createTaskCard(task); 
        const taskCardElement = $(taskCard); 
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
        taskCardElement.on('click', '.delete-task', function() {
            const taskId = $(this).data('id');
            handleDeleteTask(taskId);
        });
    });
}
 
const submitTask = $('#submit-task');
submitTask.on('click', function(event) {
    event.preventDefault();
    handleAddTask(event);
});
function handleAddTask(event) {
    event.preventDefault();
    const taskTitleInput = $('#name').val();
    const taskDescriptionInput = $('#content').val();
    const deadline = $('#date').val();
    const newTaskId = generateTaskId();
    const newTask = {
        id: newTaskId,
        title: taskTitleInput,
        description: taskDescriptionInput,
        deadline: deadline,
        status: 'to-do'
    };
    taskList.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
    $('#modalForm')[0].reset();
    modal.style.display = 'none';
}

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


function handleDrop(event, ui) {
    const taskId = parseInt(ui.draggable.attr('id').split('-')[1]);
    const newStatus = $(this).attr('id');

    taskList = taskList.map(task => {
        if (task.id === taskId) {
            task.status = newStatus;
        }
        return task;
    });
    renderTaskList();
}


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
    renderTaskList();
});

$(function () {
    $('#task-deadline').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd' // Use yy-mm-dd format
    });
});


