// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// todo lanes
const todoCards = $('#todo-cards');
const inProgressCards = $('#in-progress-cards');
const doneCards = $('#done-cards');
const lanes = $('#todo-cards, #in-progress-cards, #done-cards')

let taskArrStore = JSON.parse(localStorage.getItem('taskArrStore')) || [];


let todoArr = JSON.parse(localStorage.getItem('todoArr')) || [];

let inProgressArr = JSON.parse(localStorage.getItem('inProgressArr')) || [];

let doneArr = JSON.parse(localStorage.getItem('doneArr')) || [];


//task form selectors
let taskTitle = $('#taskTitle');
let date = $('#datepicker');
let taskDescription = $('#taskDescription');

let form = $('#taskTitle, #datepicker, #taskDescription');

// Task delete Btn
const cardEl = $('.ui-widget-content');



// Todo: create a function to generate a unique task id
function generateTaskId() {
    let id = "id-" + Math.random().toString(14).slice(12);
    return id
}

// Todo: create a function to create a task card
// function createTaskCard(task)
function createTaskCard(task) {

    // let taskId = generateTaskId(task);
    // task.id = taskId;

    let currentDate = dayjs();

    let taskDateObj = dayjs(task.date);

    let card = document.createElement('div');
    if (taskDateObj.isBefore(currentDate, 'day')) {
        card.setAttribute('class', 'ui-widget-content card w-75 mx-auto border-dark mb-3 bg-danger text-white')
    } else if (currentDate.isSame(dayjs(task.date), 'day')) {
        console.log('why?')
        card.setAttribute('class', 'ui-widget-content card w-75 mx-auto border-dark mb-3 bg-warning')
    } else {
        card.setAttribute('class', 'ui-widget-content card w-75 mx-auto border-dark mb-3')
    };
    card.setAttribute('id', task.id);

    let cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body p-0');
    
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
    deleteBtn.setAttribute('class', 'btn btn-danger border-light mb-2');
    deleteBtn.textContent = 'delete';
    cardBody.append(deleteBtn);

    card.append(cardBody);

    todoCards.append(card);

   // $('.ui-widget-content').draggable({snap: '.test', revert: 'invalid', stack: '.ui-widget-content', cursor: 'grab'})

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
    
    

    //$('.ui-widget-content').draggable({revert: 'invalid', stack: '.ui-widget-content'})
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();

    let taskForm = {
        title: taskTitle.val(),
        date: datepicker.value,
        description: taskDescription.val(),
        id: generateTaskId(),
        progress: "to-do"
    };

    taskArrStore.push(taskForm);
    localStorage.setItem('taskArrStore', JSON.stringify(taskArrStore));
    console.log(taskArrStore);

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
    // todoCards
    // inProgressCards
    // doneCards
    // todoArr
    // inProgressArr
    // doneArr
    // let x = JSON.parse(localStorage.getItem('x'))|| 0;
    // x = x+1;
    // console.log(x)




    let childUpdate = $(event.target).children();

    console.log(childUpdate.length)

    for (let i = 0; childUpdate.length > i; i++) {
        //console.log(childUpdate[i].id)

        let currentId = childUpdate[i].id

        let currentIdEl = $(`#${childUpdate[i].id}`)

        let parentEl = $(currentIdEl.parent())

        let parentId = parentEl[0].id

        if (parentId === 'todo-cards') {
            console.log('todo-cards')
            idCheck('todoArr', todoArr, currentId)
            // if (todoArr) {
            //     let check = false;
            //     for (i in todoArr) {
            //         if (todoArr[i] === currentId) {
            //             check = true
            //             console.log('yup')
            //         }
            //     }
            //     if (!check) {
            //         todoArr.push(currentId)
            //         localStorage.setItem('todoArr', JSON.stringify(todoArr))
            //     }
            // }
        } else if (parentId === 'in-progress-cards') {
            console.log('in-progress-cards')
            idCheck('todoArr', todoArr, currentId)
            idCheck('inProgressArr', inProgressArr, currentId)
        } else if (parentId === 'done-cards') {
            console.log('done-cards')
        }
        
    }

    console.log('~~', childUpdate)



    // console.log(ui)
}
function idCheck(arrayName, array, currId) {
    if (array) {
        let check = false;
        let indexMatch;
        for (i in array) {
            if (array[i] === currId) {
                check = true
                indexMatch = i
                console.log('yup')
            }
        }
        if (!check) {
            array.push(currId)
            localStorage.setItem(`${arrayName}`, JSON.stringify(array))
        } else if (check) {
            array.splice(indexMatch, 1)
        }
        
    }
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    renderTaskList();
    
    $('#submit').on('click', handleAddTask);
    
    lanes.on('click', '.btn', handleDeleteTask);
    lanes.sortable({connectWith: ".sortable", update: handleDrop});


    $( "#datepicker" ).datepicker();
});
