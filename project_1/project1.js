
let taskIdCounter = 1;
let array = [];
//הוספת אירוע להגשת הטופס
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("taskForm").addEventListener("submit", function (event) {
        event.preventDefault();
        addTask();
    });
});

// פונקציה לטעינת המשימות מהlocalStorage
document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});



function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    if (Array.isArray(tasks) && tasks.length > 0) {
        const now = new Date();
        // array = [];

        // סינון תאריך ושעה שעברו
        let validTasks = tasks.filter(task => {

            const taskDateTime = new Date(`${task.date}T${task.time}`);


            return taskDateTime.getTime() > now.getTime();
        });


        array = validTasks;

       
        let maxId = 0;

        for (const task of validTasks) {
            const idMatch = task.id.match(/\d+/);
            const idNumber = idMatch ? Number(idMatch[0]) : 0;
            if (idNumber > maxId) {
                maxId = idNumber;
            }
        }

        taskIdCounter = maxId + 1;

        // הוספת המשימות התקפות בלבד
        validTasks.forEach(task => {
            createTaskElement(task);
        });


        localStorage.setItem('tasks', JSON.stringify(validTasks));
    } else {
        taskIdCounter = 1;
    }
}




// פונקציה ליצירת משימה בדף
function createTaskElement(task) {
    let newTask = document.createElement('div');
    newTask.id = task.id;
    newTask.innerHTML = `
        <div class="newTask" >
           <p class="contents"> ${task.taskD}</p>
            <div class="timeDate">${task.date}<br/> ${task.time}</div>
            <i class="fas fa-times delete-btn"></i> 
        </div> `;
    let addTheTasks = document.getElementById('addTheTasks');
    addTheTasks.appendChild(newTask);

    // מחיקת אירוע
    let deleteBtn = newTask.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function () {
        removeTask(newTask);
    });

}
// פונקציה להוספת משימה
function addTask() {

    let data = document.getElementById('data');
    let date = document.getElementById('date');
    let time = document.getElementById('time');

    let addTheTasks = document.getElementById('addTheTasks');
    let newTask = document.createElement('div');
    newTask.classList.add('newTask');
    let contents = document.createElement('div');
    contents.innerText = data.value;
    newTask.appendChild(contents);

    // newTask.innerText = data.value;
    contents.classList.add('contents');


    // הוספת ID 
    newTask.id = `task-${taskIdCounter}`;
    taskIdCounter++;

    //יצירת האיזור של הזמן והשעה
    let timeDate = document.createElement('div');
    timeDate.classList.add('timeDate');
    timeDate.innerHTML = `${date.value}<br/> ${time.value}`;


    newTask.appendChild(timeDate);
    //הכנסת  הפתקית לתוך אזור המשימות
    addTheTasks.appendChild(newTask);

    //יצירת כפתור סגירה לפתקית
    icon = document.createElement('i');
    icon.classList.add('fas', 'fa-times');
    newTask.appendChild(icon);
    icon.classList.add('icon');
    //יצירת אירוע  בעת לחיצה על כפתור סגירה
    icon.addEventListener('click', function () {
        removeTask(newTask);
    });
    // let timeTask = new Date(date.value + " " + time.value).getTime();
    // let now = new Date();
    let obj = { taskD: data.value, date: date.value, time: time.value, id: newTask.id };
    array.push(obj);

    updateLocalStorage();
}

// עדכון ה-localStorage 
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(array));
}


function removeTask(newTask) {
    newTask.remove();
    // הסרת המשימה מתוך המערך לפי ה-id
    array = array.filter(task => task.id !== newTask.id);
    updateLocalStorage();
}


