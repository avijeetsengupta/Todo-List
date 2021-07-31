//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// event listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//funtions

function addTodo(event) {
    // prevent form from submitting.
    event.preventDefault();
    //Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // crate li 
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"> </i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // apend to List 
    todoList.appendChild(todoDiv);
    //clear to do input value 
    todoInput.value = '';
}


function deleteCheck(e) {
    const item = e.target;
    // Delete Todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall");
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })

    }

    // Check Mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }

}


function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //check--hey do i have aleardy have in there?
    let todos;
    if (locostorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}



