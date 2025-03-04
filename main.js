const INPUT_TASK_HIGH = document.querySelector('.input-form-high')
const INPUT_TASK_LOW = document.querySelector('.input-form-low')
const TASK_INPUT_HIGH = document.querySelector('.task-input-high')
const TASK_INPUT_LOW = document.querySelector('.task-input-low')
const TASKS_HIGH_LIST = document.querySelector('.tasks-high-list')
const TASKS_LOW_LIST = document.querySelector('.tasks-low-list')
const ADD_BNT_HIGH = document.querySelector('.add-btn-high')

let tasks = []

INPUT_TASK_HIGH.addEventListener('submit', (e) => {
    e.preventDefault()
    if (e.keypress === 'enter') {
        addTask('high', TASK_INPUT_HIGH.value.trim())
    }  else {
        addTask('high', TASK_INPUT_HIGH.value.trim())
    }
    TASK_INPUT_HIGH.value = ''
})

INPUT_TASK_LOW.addEventListener('submit', (e) => {
    e.preventDefault()
    if (e.keypress === 'enter') {
        addTask('low', TASK_INPUT_LOW.value.trim())
    }  else {
        addTask('low', TASK_INPUT_LOW.value.trim())
    }
    TASK_INPUT_LOW.value = ''
})

const addTask = (priority, inputValue) => {
    const newTask = {
        id: Date.now(),
        text: inputValue,
        priority: priority,
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

        const form = document.createElement('form')
        form.classList.add('task-form')

        const inputCheck = document.createElement('input')
        inputCheck.type = 'checkbox'
        form.appendChild(inputCheck)
        inputCheck.addEventListener('change', (event) => changeStatus(event))

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
    const newTasks = tasks.filter((task) => task.id !== id)
    tasks = newTasks
    renderTasks()
} 

const changeStatus = (event) => {
    const parentLi = event.target.closest('li')
    if (event.target.checked) {
        parentLi.classList.add('completed')
    } else {
        parentLi.classList.remove('completed')
    }
}
