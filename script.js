function addTask(newTask) {
    tasks.push(newTask);
    updateStorge()
    alert("Task Added!")
}

function createTask(nameNew, dateNew, checkNew = false) {
    if (!validInput()) {
        return
    }
    let newCreatedTask = {
        name: nameNew,
        date: dateNew,
        check: checkNew
    };
    addTask(newCreatedTask);
}

function editTask(oldName, newName, newDate) {
    let found = false;
    for (let task of tasks) {
        if (task.name === oldName) {
            task.name = newName;
            task.date = newDate;
            found = true;
            break;
        }
    }
    
    if (found) {
        updateStorge()
        alert("Task Updated!")
    } else {
        alert("Task not Found!")
    }
}

function validInput() {
    if (nameInput.value == "" || dateInput.value == "") {
        return false
    }
    return true
}

function displayTasks() {
    allTasks.innerHTML = ""
    for (let i = 0; i < tasks.length; i++) {
        const correntTask = tasks[i];
        if (correntTask["check"]) {
            allTasks.innerHTML += `
            <div class="task finished">
            ${correntTask["name"]} - ${correntTask["date"]}<br>
            <button onclick="finishTask(${i})">Finish Task</button>
            <button onclick="deleteTask(${i})">Delete</button><br>
            finished </div>
            `;
        } else {
            allTasks.innerHTML += `
            <div class="task">
            ${correntTask["name"]} - ${correntTask["date"]}<br>
            <button onclick="finishTask(${i})">Finish Task</button>
            <button onclick="deleteTask(${i})">Delete</button><br>
            not finished </div>`;
        }
    }
}

function findTask(oldName) {
    let found = false;
    for (let task of tasks) {
        if (task.name === oldName) {
            nameInput.value = task.name
            dateInput.value = task.date
            found = true;
            break;
        }
    }
    
    if (found) {
        updateStorge()
        alert("Found Task!")
    }
}

function clearTasks() {
    localStorage.clear()
    tasks = []
    displayTasks()
}

function finishTask(index) {
    tasks[index]["check"] = true
    updateStorge()
    displayTasks()
}

function deleteTask(index) {
    tasks.splice(index, 1)
    updateStorge()
    displayTasks()
}

function updateStorge() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ניקוי localStorage
// localStorage.clear();

// יצירת משימות חדשות
// createTask("Eat", "2.5.2024");
// createTask("Drink", "3.5.2024");

