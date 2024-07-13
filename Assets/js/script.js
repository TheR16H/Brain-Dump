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
    const { deadlineClass, textClass, buttonClass } = determineClasses(task);

    // Return the HTML for the task card
    return `<div id="task-${task.id}" class="task-card card mb-3 ${deadlineClass}">
            <div class="card-header ${textClass}"><h4>${task.title}</h4></div>
        <div class="card-body">
            <p class="card-text ${textClass}">${task.description}</p>
            <p class="card-text ${textClass}">Deadline: ${task.deadline}</p>
            <button class="btn ${buttonClass} delete-task" data-id="${task.id}">Delete</button>
        </div>
    </div>`
};

function renderTaskList() {
    $('#todo-cards').empty();
    $('#in-progress-cards').empty();
    $('#done-cards').empty();

    taskList.forEach(task => {
        const taskCard = createTaskCard(task);
        appendTaskCard(taskCard, task);
    });

    $('.task-card').draggable({
        revert: 'invalid',
        stack: '.task-card',
        helper: 'clone',
        start: function(event, ui) {
            $(ui.helper).addClass('ui-helper');
        }
    });

    $('.lane').droppable({
        accept: '.task-card',
        drop: handleDrop
    });

    $('.delete-task').on('click', handleDeleteTask);
}

function handleAddTask(event) {
    event.preventDefault();

    const taskTitleInput = $('#name').val();
    const taskDescriptionInput = $('#content').val();
    const taskDateInput = $('#date').val();
    const deadline = $('#date').val();

    const newTaskId = generateTaskId();
    
    const newTask = {
        id: newTaskId,
        title: taskTitleInput,
        description: taskDescriptionInput,
        date: taskDateInput,
        deadline: deadline,
        status: 'to-do'
};

// JSON Dataset  --> stringify()  parse()
//retrieve user input grab value from form put into array store to local storage
taskList.push(newTask);
localStorage.setItem('tasks', JSON.stringify(taskList));
localStorage.setItem('nextId', JSON.stringify(nextId));
$('#modalForm')[0].reset();
modal.style.display = 'none';
renderTaskList();
  // var retrievedTaskListJSON = localStorage.getItem('tasks');
// var retrievedTaskList = JSON.parse(retrievedTaskListJSON);
}

 function checkLocalStorage() {
       // dataset initialization (does it exist yet? if not set a value)
       if(localStorage.getItem('tasks')) {
        tasksArray = JSON.parse(localStorage.getItem('tasks'));
     } else {
        tasksArray = [];
     }
     return tasksArray;
 } //----------
 


function handleDeleteTask(event) {
    const taskId = $(event.target).data('id');
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
    // Btnclicked $(event.target) format here i think 
// filter() function
}

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
        dateFormat: 'yy-mm-dd'
    });
});