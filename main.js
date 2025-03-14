import {
    INPUT_TASK_HIGH,
    INPUT_TASK_LOW,
    TASK_INPUT_HIGH,
    TASK_INPUT_LOW,
    TASKS_LOW_LIST,
    TASKS_HIGH_LIST
} from "./constants.js";

let tasks = []

INPUT_TASK_HIGH.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputValue = TASK_INPUT_HIGH.value.trim();

    if (inputValue === '') {
        alert('Пожалуйста, введите задачу.');
        return;
    }

    addTask('high', inputValue);
    TASK_INPUT_HIGH.value = '';
})

INPUT_TASK_LOW.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputValue = TASK_INPUT_LOW.value.trim();

    if (inputValue === '') {
        alert('Пожалуйста, введите задачу.');
        return;
    }

    addTask('low', inputValue);
    TASK_INPUT_LOW.value = '';
})

const addTask = (priority, inputValue) => {
    const newTask = {
        id: Date.now(),
        text: inputValue,
        priority: priority,
        status: false,
    }

    tasks.push(newTask)
    renderTasks()
}

const renderTasks = () => {
    TASKS_HIGH_LIST.innerHTML = ''
    TASKS_LOW_LIST.innerHTML = ''

    tasks.forEach(task => {
        const li = document.createElement('li')
        li.classList.add('task')
        if (task.status) {
            li.classList.add('completed')
        }

        const form = document.createElement('form')
        form.classList.add('task-form')

        const inputCheck = document.createElement('input')
        inputCheck.type = 'checkbox'
        inputCheck.checked = task.status;
        form.appendChild(inputCheck)
        inputCheck.addEventListener('change', (event) => changeStatus(task.id))

        const taskText = document.createElement('p')
        taskText.textContent = task.text
        form.appendChild(taskText)

        const deleteBtn = document.createElement('button')
        deleteBtn.id = task.id
        deleteBtn.classList.add('btn-delete')
        deleteBtn.type = 'button'
        deleteBtn.addEventListener('click', () => deleteTask(task.id))

        const btnIcon = document.createElement('img')
        btnIcon.src = './close-icon.svg'
        btnIcon.alt = 'close-icon'
        deleteBtn.appendChild(btnIcon)
        form.appendChild(deleteBtn)

        li.appendChild(form)

        if (task.priority === 'high') {
            TASKS_HIGH_LIST.appendChild(li)
        } else {
            TASKS_LOW_LIST.appendChild(li)
        }

    })
}

const deleteTask = (id) => {
    tasks = tasks.filter((task) => task.id !== id)
    renderTasks()
}

const changeStatus = (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
       return
    }
    task.status = !task.status;
    renderTasks();
}
