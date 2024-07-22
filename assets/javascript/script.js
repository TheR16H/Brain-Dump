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
    const today = dayjs();
    const deadlineDate = dayjs(task.deadline, 'YYYY-MM-DD');
    const daysUntilDeadline = deadlineDate.diff(today, 'day');

    let deadlineClass = '';
    if (daysUntilDeadline < 0) {
        deadlineClass = 'bg-danger'; // Red for passed deadline
    } else if (daysUntilDeadline === 0) {
        deadlineClass = 'bg-danger'; // Red for today's deadline
    } else if (daysUntilDeadline <= 2) {
        deadlineClass = 'bg-warning'; // Yellow for deadline coming up in 2 days or less
    } else if (daysUntilDeadline >= 3) {
    deadlineClass = 'bg-success'; // Green if its 3 or more days out
}

    const taskCardEl =
    $(`<div class="task-card card m-4 mt-2 ${deadlineClass}" id=${task.id}>
        <h5 class="card-header">${task.title}</h5>
        <div class="card-body">
          <p class="card-text">${task.description}</p>
          <p class="card-text">${task.deadline}</p>
          <button class="btn btn-danger border border-white delete" data-task-id=${task.id}>Delete</button>
        </div>
      </div>`);
      
    return taskCardEl;
}

function renderTaskList() {
    $('#todo-cards').empty();
    $('#in-progress-cards').empty();
    $('#done-cards').empty();
    
    taskList.forEach(task => {
        const taskCard = createTaskCard(task); 
        const taskCardElement = $(taskCard); 
        
        // Add task card to the appropriate column
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
        
        taskCardElement.draggable({
            revert: 'invalid',
            zIndex: 100,
            appendTo: '.drop',
            start: function(event, ui) {
                $(ui.helper).addClass('ui-helper');
            }
        });
     

        // Add event listener for deleting tasks
        taskCardElement.on('click', '.delete', function() {
            console.log("Click")
            const taskId = $(this).data('task-id');
            handleDeleteTask(taskId);
        });
    });
}
 
const submitTask = $('#modalForm');
submitTask.on('submit', handleAddTask);

function handleAddTask(event) {
    console.log("data passed: ", event);

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
    console.log("New task: ", newTask)
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
    console.log(taskId)
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
}


function handleDrop(event, ui) {
    const taskId = ui.draggable.attr('id'); // Get the task ID from the dragged task card
    const newStatus = $(this).attr('id'); // Get the new status from the lane where the task card is dropped

    // Update the task status in the taskList
    taskList = taskList.map(task => {
        if (task.id === taskId) {
            task.status = newStatus;
        }
        return task;
    });

    // Save the updated taskList to localStorage and re-render the task board
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
}


// Event Listeners
function toggleModal() {
    console.log("Toggle")
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

    // Make the lanes droppable
    $('.lane').droppable({
        accept: '.task-card',
        drop: handleDrop
    });
});

$(function () {
    $('#task-deadline').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd' // Use yy-mm-dd format
    });
});


