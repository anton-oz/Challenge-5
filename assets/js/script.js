// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// todo lanes
const todoCards = $('#todo-cards');
const inProgressCards = $('#in-progress-cards');
const doneCards = $('#done-cards');
const lanes = $('#todo-cards, #in-progress-cards, #done-cards')


// array of task objects
let taskArrStore = JSON.parse(localStorage.getItem('taskArrStore')) || [];

//task form selectors
let taskTitle = $('#taskTitle');
let date = $('#datepicker');
let taskDescription = $('#taskDescription');


// Todo: create a function to generate a unique task id
function generateTaskId() {
    let id = "id-" + Math.random().toString(14).slice(12);
    return id
}


function createTaskCard(task) {
    let currentDate = dayjs();

    let taskDateObj = dayjs(task.date);


    let card = document.createElement('div');

    // conditional to have task background white, yellow or red based on task due date
    if (taskDateObj.isBefore(currentDate, 'day')) {
        card.setAttribute('class', 'ui-widget-content card w-75 mx-auto border-dark mb-3 bg-danger text-white')
    } else if (currentDate.isSame(dayjs(task.date), 'day')) {
        card.setAttribute('class', 'ui-widget-content card w-75 mx-auto border-dark mb-3 bg-warning')
    } else {
        card.setAttribute('class', 'ui-widget-content card w-75 mx-auto border-dark mb-3')
    };
    card.setAttribute('id', task.id);

    // task card body styling and classes
    let cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body p-0');
    
    // task card heading styling and classes
    let cardHeading = document.createElement('h5');
    cardHeading.setAttribute('class', 'card-header mb-2');
    cardHeading.textContent = `${task.title}`;
    cardBody.append(cardHeading);

    // task card To do styling and classes
    let cardTodo = document.createElement('div');
    cardTodo.setAttribute('class', 'card-text mb-2');
    cardTodo.textContent = `${task.description}`;
    cardBody.append(cardTodo);

    // task card due date styling and classes
    let dueDate = document.createElement('div');
    dueDate.setAttribute('class', 'card-text mb-2');
    dueDate.textContent = `${task.date}`;
    cardBody.append(dueDate);

    // task card delete btn styling and classes
    let deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.setAttribute('class', 'btn btn-danger border-light mb-2');
    deleteBtn.textContent = 'delete';
    cardBody.append(deleteBtn);

    
    card.append(cardBody);

    // depending on card progress status render in the correct lane
    if (task.progress === 'todo-cards') {
        todoCards.append(card);
    } else if (task.progress === 'in-progress-cards') {
        inProgressCards.append(card)
    } else if (task.progress === 'done-cards') {
        doneCards.append(card)
        card.setAttribute('class', 'ui-widget-content card w-75 mx-auto border-dark mb-3')
    }
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
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();

    let taskForm = {
        title: taskTitle.val(),
        date: datepicker.value,
        description: taskDescription.val(),
        id: generateTaskId(),
        progress: "todo-cards"
    };

    taskArrStore.push(taskForm);
    localStorage.setItem('taskArrStore', JSON.stringify(taskArrStore));

    createTaskCard(taskArrStore[taskArrStore.length - 1]);

    console.log(taskArrStore);

    taskTitle.val('');
    datepicker.value = '';
    taskDescription.val('');
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

    event.preventDefault();

    let task = $(event.target).parent('div').parent('div');

    let taskId = task[0].id

    console.log(taskId)

    function removeFromArr(array, key, value) {
        let index = array.findIndex(function(obj){
            return obj[key] === value
        })

        if (index !== -1) {
            array.splice(index, 1)
        }
    };
    removeFromArr(taskArrStore, 'id', taskId);

    localStorage.setItem('taskArrStore', JSON.stringify(taskArrStore));

    task.remove();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    let eTarg = $(event.target)
    let currentCard = ui.item
    let cardParent = currentCard.parent()

    updateTaskPosition(taskArrStore, 'id', currentCard[0].id, cardParent[0].id)
    localStorage.setItem('taskArrStore', JSON.stringify(taskArrStore))

    // This function is from chat GPT, finds matching id of current card in task object array and then updates the progress value
    function updateTaskPosition(array, id, taskId, progressUpdate) {
        for (let i = 0; i < array.length; i++) {
            if (array[i][id] === taskId) {
                array[i]['progress'] = progressUpdate;
                if (progressUpdate === 'done-cards') {
                    currentCard[0].setAttribute('class', 'ui-widget-content card w-75 mx-auto border-dark mb-3')
                }
            }
        }
    }
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    renderTaskList();
    
    $('#submit').on('click', handleAddTask);
    
    lanes.on('click', '.btn', handleDeleteTask);
    lanes.sortable({connectWith: ".sortable", stop: handleDrop});


    $( "#datepicker" ).datepicker();
});
