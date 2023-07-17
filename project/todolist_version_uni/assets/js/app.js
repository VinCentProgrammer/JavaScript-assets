
const TODOLIST_VERSION_UNITOP = 'TODOLIST_VERSION_UNITOP';
const saveData = data => {
    localStorage.setItem(TODOLIST_VERSION_UNITOP, JSON.stringify(data));
}

const loadData = () => {
    let data;
    data =  JSON.parse(localStorage.getItem(TODOLIST_VERSION_UNITOP));
    data = data ? data : [];
    return data;
}

const addTask = (taskItem) => {
    let data = loadData();
    data.push(taskItem);
    saveData(data);
}

const createTaskItem = (task, is_complete, index) => {
    return `
        <li>
            <div class="task-item" index = "${index}" is_complete = "${is_complete}">
                <span onclick = "markTaskComplete(${index})">${task}</span>
                <div class="task-action">
                    <div class="action-update">
                        <i onclick = "pushEditTask(${index});" class="fa-regular fa-pen-to-square"></i>
                    </div>
                    <div class="action-delete">
                        <i onclick = "deleteTask(this, ${index})" class="fa-regular fa-trash-can"></i>
                    </div>
                </div>
            </div>
        </li>
    `;
}

const resutlRender = document.querySelector('.body-task');

const renderTasks = () => {
    let dataHtml, data, cnt_task = 0;
    const resTask = document.querySelector('.footer');
    data = loadData();
    dataHtml = data.map((element, index) => {
        if(element.is_complete)
            ++cnt_task;
        return createTaskItem(element.task, element.is_complete, index);
    });
    resutlRender.innerHTML = dataHtml.join('');
    if(cnt_task)
        resTask.innerHTML = `Yeah, ${cnt_task} task complete!`;
    else resTask.innerHTML = '';
}


renderTasks();

const markTaskComplete = (index) => {
    let data = loadData();
    data[index].is_complete = data[index].is_complete ? false : true;
    saveData(data);
    renderTasks();
};

const deleteTask = (element, index) => {
    let data = loadData();
    let delete_confirm = confirm('Do you want to delete this task?');
    if(!delete_confirm) return false;
    data.splice(index, 1);
    saveData(data);
    // element.closest('li').remove();
    renderTasks();
}


const inputAddTask = document.getElementById('task_name');
const buttonAddTask = document.querySelector('#head-task button');

const pushEditTask = (index) => {
    let data = loadData();
    inputAddTask.value = data[index].task;
    inputAddTask.setAttribute('index', index);
    buttonAddTask.innerText = 'EDIT TASK';
}

const editTask = (task, index) => {
    let data = loadData();
    data[index].task = task;
    saveData(data);
    buttonAddTask.innerText = 'ADD TASK';
}

const formAddTask = document.forms;
formAddTask[0].addEventListener('submit', (e) => {
    let taskItem;
    let task = task_name.value;
    if(task != ''){
        let index = task_name.getAttribute('index');
        if(index){
            editTask(task, index);
            task_name.removeAttribute('index');
        }else{
            taskItem = {
                task: task,
                is_complete: false 
            }
            addTask(taskItem);
        }
        renderTasks();
        task_name.value = '';
    }else 
        alert('Please enter your task!!!');
    e.preventDefault();
})

//Create key esc exit update task

document.addEventListener('keyup', (e) => {
    if(e.which == 27){
        inputAddTask.value = '';
        inputAddTask.removeAttribute('index');
        buttonAddTask.innerText = 'ADD TASK';
    }
})