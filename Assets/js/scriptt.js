// moving to condense 
// Retrieve tasks and nextId from localStorage (don't edit this)
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));


//code used to make the modal pop up and the btn work.
const modal = document.getElementById('modalForm');
const btn = document.querySelector('.btn.btn-success');
const closeBtn = modal.querySelector('.close');
btn.addEventListener('click', function(){
    modal.style.display = 'block';
});

// closeBtn.addEventListener('click', function(){
//     modal.style.display = 'none';
// });

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
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

    // return taskCard;

// Todo: create a function to render the task list and make cards draggable


// edited this array name
// let taskListt = []; 

// Todo: create a functican on to handle adding a new task
function handleAddTask(event){
    

function checkLocalStorage() {
    // dataset initialization (does it exist yet? if not set a value)
    if(localStorage.getItem('tasks')) {
       tasksArray = JSON.parse(localStorage.getItem('tasks'));
    } else {
       tasksArray = [];
    }
    return tasksArray;
}




// Todo: create a function to handle dropping a task into a new status lane


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
console.log(taskList); // Check the value of taskList

$(document).ready(function () {
    if (taskList && taskList.length > 0) {
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