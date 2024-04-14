// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// todo lanes
const todoCards = $('#todo-cards');
const inProgressCards = $('#in-progress-cards');
const doneCards = $('#done-cards');

let taskArrStore = JSON.parse(localStorage.getItem('taskArrStore')) || [];

console.log(taskArrStore)
console.log(nextId)

//task form selectors
const taskTitle = $('#taskTitle');
const date = $('#datepicker');
const taskDescription = $('#taskDescription');

// Task delete Btn
const deleteTask = $('#deleteTask')

// Id array

let idArray = JSON.parse(localStorage.getItem('idArray')) || [];


// Todo: create a function to generate a unique task id
function generateTaskId() {
    let id = "id-" + Math.random().toString(14).slice(12);
    idArray.push(id);
    localStorage.setItem('idArray', JSON.stringify(idArray))
    return id;
}
console.log(idArray)

// Todo: create a function to create a task card

// function createTaskCard(task)
function createTaskCard(task) {
    


    let card = document.createElement('div');
    card.setAttribute('class', 'ui-widget-content card border-dark mb-3');
    card.setAttribute('id', generateTaskId())

    let cardBody = document.createElement('div');
    
    let cardHeading = document.createElement('h5');
    cardHeading.setAttribute('class', 'card-header mb-2');
    cardHeading.textContent = `${task.title}`;
    cardBody.append(cardHeading);

    let cardTodo = document.createElement('div');
    cardTodo.setAttribute('class', 'card-text mb-2');
    cardTodo.textContent = `${task.description}`;
    cardBody.append(cardTodo);

    let dueDate = document.createElement('div');
    dueDate.setAttribute('class', 'card-text mb-2');
    dueDate.textContent = `${task.date}`;
    cardBody.append(dueDate);

    let deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.setAttribute('class', 'btn btn-danger mb-2');
    deleteBtn.setAttribute('id', 'deleteTask');
    deleteBtn.textContent = 'delete';
    cardBody.append(deleteBtn);

    card.append(cardBody);

    todoCards.append(card);

}


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    
    if (!taskArrStore) {
        return
    } else {
        for (task in taskArrStore) {
            createTaskCard(taskArrStore[task])
        }
    };
    
    for(id in idArray) {
        $(`#${idArray[id]}`).draggable({ revert: 'invalid'})
    };
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();

    let taskForm = {
        title: taskTitle.val(),
        date: datepicker.value,
        description: taskDescription.val()
    };

    taskArrStore.push(taskForm);
    localStorage.setItem('taskArrStore', JSON.stringify(taskArrStore));
    console.log(taskArrStore);


    createTaskCard(taskArrStore[taskArrStore.length - 1]);


    console.log(taskArrStore);


}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    event.preventDefault();


}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    // $(ui.draggable).detach().appendTo(this);
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    renderTaskList();
    
    $('#submit').on('click', handleAddTask);
    
   

    $( "#datepicker" ).datepicker();

    // todoCards.droppable({drop: handleDrop});
    // inProgressCards.droppable({drop: handleDrop});
    // doneCards.droppable({drop: handleDrop});
});
