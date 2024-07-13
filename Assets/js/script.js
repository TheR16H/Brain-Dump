// Retrieve tasks and nextId from localStorage (don't edit this)
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));


//code used to make the modal pop up and the btn work.
document.getElementById('modalForm');
const btn = document.querySelector('.btn.btn-success')
const closeBtn = modal.querySelector('.close');
btn.addEventListener('click', function(){
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', function(){
    modal.style.display = 'none';
});

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const randomid = Math.random().toString(16).slice(2);
    const uniqueId = 'id_' + randomid;
    return uniqueId;
}

const newId = generateTaskId();
localStorage.setItem('taskId', newId);
console.log(newId);



// Todo: create a function to create a task card
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

    // Create a delete button with the class delete-task
    const deleteButton = $('<button>')
        .addClass('btn btn-danger delete-task') // Changed class to delete-task
        .text('Delete');

    // Add the delete button to the task card
    taskCard.append(deleteButton);

    // Add an event listener to the delete button for task deletion
    deleteButton.on('click', function() {
        const taskId = taskCard.attr('id').split('-')[1];
        taskCard.remove();
        taskList = taskList.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(taskList));
    });

    return taskCard;

// Todo: create a function to render the task list and make cards draggable
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

// edited this array name
// let taskListt = []; 

// Todo: create a functican on to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    const taskTitleInput = $('#task-title');
    const taskDescriptionInput = $('#task-description');
    const taskDateInput = $('#task-date');
    const deadline = $('#task-deadline').val();


    const newTask = {
    id: generateTaskId(),
    title: taskTitleInput.val(),
    description:  taskDescriptionInput.val(),
    date:  taskDateInput.val(),
    deadline: deadline,
    status:  'to-do'
};

// JSON Dataset  --> stringify()  parse()
//retrieve user input grab value from form put into array store to local storage
taskList.push(newTask);
localStorage.setItem('tasks', JSON.stringify(taskList));
localStorage.setItem('nextId', JSON.stringify(nextId));
$('#addTaskForm')[0].reset();
 $('#formModal').modal('hide');
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
}


// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    const taskId = $(event.target).data('id');
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
    // Btnclicked $(event.target) format here i think 
// filter() function
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = parseInt(ui.draggable.attr('id').split('-')[1]);
    const newStatus = $(this).attr('id');

    taskList = taskList.map(task => {
        if (task.id === taskId) {
            task.status = newStatus;
        }
        return task;
    });
//  sortable
//update status + color
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    if (taskList != []) {
        renderTaskList();
    }
});

// Include the datepicker initialization code here
$(function () {
    $('#task-deadline').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd'
    });
});