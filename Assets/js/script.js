// Retrieve tasks and nextId from localStorage (don't edit this)
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

var tasksArray = []


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
localStorage.setItem('taskId', taskId);
console.log(newId);

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>')
        .addClass('card task-card draggable my-3')
        .attr('taskId', task.id);

    // Create a delete button
    const deleteButton = $('<button>')
        .addClass('btn btn-danger delete-button')
        .text('Delete');

    // Add the delete button to the task card
    taskCard.append(deleteButton);

    // Add an event listener to the delete button for task deletion
    deleteButton.on('click', function() {
        // Get the task ID from the task card
        const taskId = taskCard.attr('taskId');
        
        // Perform task deletion logic here (e.g., remove task card from UI and update data)

        // Optionally, you can remove the task card from the UI
        taskCard.remove();
    });

    return taskCard;
    // added a delete button / addeventlistener
}



// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
// drag and drop jquery
createTaskCard();
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
// JSON Dataset  --> stringify()  parse()
//retrieve user input grab value from form put into array store to local storage
taskList.push(task)
var taskListJSON = JSON.stringify(taskList);
localStorage.setItem('tasks', taskListJSON);
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
// Btnclicked $(event.target) format here i think 
// filter() function
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
//  sortable
//update status + color
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});

$(function () {
    $('#date').datepicker({
        changeMonth: true,
        changeYear: true,
    });
});