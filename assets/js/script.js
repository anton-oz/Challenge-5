// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const todoCards = $('#todo-cards')

let taskArrStore = JSON.parse(localStorage.getItem('taskArrStore')) || [];

console.log(taskArrStore)
console.log(nextId)

//task form selectors
const taskTitle = $('#taskTitle');
const date = $('#datepicker');
const taskDescription = $('#taskDescription');


// Todo: create a function to generate a unique task id
function generateTaskId() {
    let id;

    

}


// Todo: create a function to create a task card

// function createTaskCard(task)
function createTaskCard(task) {
    


    let card = document.createElement('div');
    card.setAttribute('id', `id${generateTaskId()}`);
    card.setAttribute('class', 'card text-dark bg-light mb-3');

    let cardHeading = document.createElement('h4');
    cardHeading.setAttribute('class', 'card header');

    let headTitle = task.title;

    console.log(task.title)

    cardHeading.textContent = `woo ${headTitle}`;

    card.append(cardHeading);



    todoCards.append(card);

}


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    
    if (!taskArrStore) {
        return
    } else {
        for (task in taskArrStore) {
            //task + 1
            createTaskCard(task)
        }
    }
    
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();

    let taskForm = {
        title: taskTitle.val(),
        date: datepicker.value,
        description: taskDescription.val()
    };

   if (!taskArrStore) {
   // let taskList = [];
    taskArrStore.push(taskForm)
    localStorage.setItem('taskArrStore', JSON.stringify(taskArrStore))
   // console.log(taskList)

   } else {
    taskArrStore.push(taskForm)
    localStorage.setItem('taskArrStore', JSON.stringify(taskArrStore))
    console.log(taskArrStore)
   };

   createTaskCard(taskArrStore[-1]);


    console.log(taskArrStore);


}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    renderTaskList();
    
    $('#submit').on('click', handleAddTask);
    
   

    $( "#datepicker" ).datepicker();
});
