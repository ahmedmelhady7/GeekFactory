(function (scope) {
    "use strict";

    var form = document.getElementById('new-todo');
    var editForm = document.getElementById('edit-todo');
    var editedTask = {};
    var tasksContainer = document.querySelector('#tasks');
    var taskManager = createTaskManager();
    var localStorage = window.localStorage;
    form && form.addEventListener('submit', addTask);
    editForm && editForm.addEventListener('submit', updateTask);
    
    taskManager.onChange(update);
    loadTasks();
    var saveBtn = document.getElementById("save-btn");
    saveBtn.disabled = true;

    function updateTask(event) {
        event.preventDefault();
        var tasks = taskManager.getAll();
        var index = tasks.indexOf(editedTask);
        if(editedTask) {
            event.target.querySelectorAll('input:not([type="submit"]').forEach(function (input) {
                editedTask[input.name] = input.value;
                input.value = null;
            });
            taskManager.update(index, editedTask);
            editedTask = {};
        }
    }

    function addTask(event) {
        event.preventDefault();
        var task = {};
        event.target.querySelectorAll('input:not([type="submit"]').forEach(function (input) {
            task[input.name] = input.value;
            input.value = null;
        });
        taskManager.create(task.category, task.title, task.priority, task.estimate);
    }

    function update() {
        storeTasks(taskManager.getAll());
        while (tasksContainer.hasChildNodes()) {
            tasksContainer.removeChild(tasksContainer.lastChild);
        }
        taskManager.getAll().forEach(function (task) {
            tasksContainer.appendChild(createTaskRow(task));
        });
    }

    function createTaskRow(task) {
        var tr = document.createElement('tr');
        var deleteBtn = document.createElement('a');
        var editBtn = document.createElement('a');
        editBtn.innerText='Edit';
        editBtn.href='';
        deleteBtn.innerText='Delete';
        deleteBtn.href='';
        deleteBtn.addEventListener('click', function(){
            taskManager.remove(task);
        });

        editBtn.addEventListener('click', function(e){
            e.preventDefault();
            document.getElementsByName('category')[1].value=task.category;
            document.getElementsByName('title')[1].value=task.title;
            document.getElementsByName('priority')[1].value=task.priority;
            document.getElementsByName('estimate')[1].value=task.estimate;
            saveBtn.disabled=false;
            editedTask = task;
        });

        tr.appendChild(createTableCell(task.category));
        tr.appendChild(createTableCell(task.title));
        tr.appendChild(createTableCell(task.priority));
        tr.appendChild(createTableCell(task.estimate));
        tr.appendChild(createTableCell(task.spent));
        tr.appendChild(createTableCell(task.remaining));
        tr.appendChild(createTableCell(task.done() && '&#10004;'));
        tr.appendChild(createTableCell(editBtn));
        tr.appendChild(createTableCell(deleteBtn));
        return tr;
    }

    function createTableCell(text) {
        var td = document.createElement('td');
        if (text && typeof text === 'string') {
            var text = document.createTextNode(text);
            td.appendChild(text);
        } else if(text) {
            // debugger;
            td.appendChild(text);
        }
        return td;
    }

    function storeTasks(tasks) {
        if(typeof scope.localStorage !== 'undefined') {
            scope.localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    function loadTasks() {
        if(typeof scope.localStorage !== 'undefined') {
            var tasks = JSON.parse(scope.localStorage.getItem('tasks'));
            tasks && tasks.forEach(function (task) {
                taskManager.create(task.category, task.title, task.priority, task.estimate);
            });
        }
    }
})(window);