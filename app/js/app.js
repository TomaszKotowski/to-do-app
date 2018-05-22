/* main js file */
const tasksList = [
    'Do something',
    'Nothing shall be done',
    'No is the time'
];
console.log(JSON.stringify(tasksList))
localStorage.setItem('tasks', JSON.stringify(tasksList));
console.log(localStorage)

document.querySelector('[data-js=addNewTask]')
    .addEventListener('click', (e) => {
        e.preventDefault();
    });
//Creates the task list based on the value in the taskList array
const handleTaskList = (tasksList) => {
    const tasks = document.querySelector('[data-js=tasks]');
    for (let task of tasksList) {
        console.log(task)
        let taskItem = document.createElement('li');
        taskItem.dataset.js = 'task';
        taskItem.className = 'task';
        taskItem.innerHTML = task;

        let closeButton = document.createElement('button');
        closeButton.dataset.js = 'closeTask';
        closeButton.className = 'closeTask';
        closeButton.innerHTML = 'X';

        taskItem.appendChild(closeButton);       // return newTaskItem
        tasks.appendChild(taskItem);
    }
}
handleTaskList(tasksList)

// let task = document.querySelectorAll('[data-js=task]');
const handleCloseTask = () => {
    let closeButton = document.querySelectorAll('[data-js=closeTask]');
    for (let i = 0; i < closeButton.length; i++) {
        closeButton[i].addEventListener('click', () => {
            closeButton[i].parentElement.remove();
        });
    }
};

handleCloseTask();

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
    tasks.appendChild(createNewTaskItem(newTask.value));
    newTask.value = '';
};

document.querySelector('[data-js=addTask]')
    .addEventListener('click', () => {
        handleAddNewTaskItem();
        handleCloseTask();
        handleCheckTask()
    });

const handleCheckTask = () => {
    const task = document.querySelectorAll('[data-js=task]');
    task.forEach(task => {
        task.addEventListener('click', () => {
            task.classList.toggle('checked');
        });
    });
};
handleCheckTask()
