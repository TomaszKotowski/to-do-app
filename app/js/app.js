/* main js file */
// localStorage.clear();
let tasksList = ["First task", "Second task"];
// IIFE to check the state of the storage
(() => {
    const json = localStorage.getItem('tasks');
    const tasks = JSON.parse(json);
    if (tasks) { tasksList = [...tasks]; }
})();
//IIFE that creates the task list based on the value in the taskList array
((tasksList) => {
    const tasks = document.querySelector('[data-js=tasks]');
    for (let task of tasksList) {
        let taskItem = document.createElement('li');
        taskItem.dataset.js = 'task';
        taskItem.className = 'task';
        taskItem.innerHTML = task;

        let closeButton = document.createElement('button');
        closeButton.dataset.js = 'closeTask';
        closeButton.className = 'closeTask';
        closeButton.innerHTML = 'X';

        taskItem.appendChild(closeButton);
        tasks.appendChild(taskItem);
    }
})(tasksList)

document.querySelector('[data-js=addNewTask]')
    .addEventListener('click', (e) => {
        e.preventDefault();
    });

const createNewTaskItem = (newTask) => {
    let newTaskItem = document.createElement('li');
    newTaskItem.dataset.js = 'task';
    newTaskItem.className = 'task';
    newTaskItem.innerHTML = newTask;

    let newCloseButton = document.createElement('button');
    newCloseButton.dataset.js = 'closeTask';
    newCloseButton.className = 'closeTask';
    newCloseButton.innerHTML = 'X';

    newTaskItem.appendChild(newCloseButton);
    return newTaskItem
};

const handleAddNewTaskItem = () => {
    const newTask = document.querySelector('[data-js=newTask]');
    const tasks = document.querySelector('[data-js=tasks]');
    if ((newTask.value.trim()) == '') {
        alert('Wpisz poprawny task');
    } else {
        tasksList.push(newTask.value);
        localStorage.setItem('tasks', JSON.stringify(tasksList));
        tasks.appendChild(createNewTaskItem(newTask.value));
        newTask.value = '';
    }
};

const handleCloseTask = () => {
    let closeButton = document.querySelectorAll('[data-js=closeTask]');
    for (let i = 0; i < closeButton.length; i++) {
        closeButton[i].addEventListener('click', () => {
            tasksList.splice(i, 1);
            localStorage.setItem('tasks', JSON.stringify(tasksList));
            closeButton[i].parentElement.remove();
        });
    }
};
handleCloseTask();

// Change to iife - later
const handleCheckTask = () => {
    const task = document.querySelectorAll('[data-js=task]');
    task.forEach(task => {
        task.addEventListener('click', () => {
            task.classList.toggle('checked');
        });
    });
};
handleCheckTask();

document.querySelector('[data-js=addTask]')
    .addEventListener('click', () => {
        handleAddNewTaskItem();
        handleCloseTask();
        handleCheckTask()
    });
