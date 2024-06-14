// Retrieve tasks and nextId from localStorage
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
console.log(newId);

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>')
        .addClass('card task-card draggable my-3')
        .attr('taskId', task.id);

    return taskCard;
}


// will any array work?

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
// Btnclicked $(event.target) format here i think 
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
//  sortable
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