const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!")
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    const tasks = [];
    const liElements = listContainer.querySelectorAll("li");
    liElements.forEach(li => {
        // Get only the text content of the li, excluding the span
        const taskText = li.childNodes[0].textContent.trim();
        if(taskText) {
            tasks.push(taskText);
        }
    });
    localStorage.setItem("data", JSON.stringify(tasks));
}

function showTask(){
    const savedTasks = localStorage.getItem("data");
    if(savedTasks) {
        const tasks = JSON.parse(savedTasks);
        listContainer.innerHTML = "";
        tasks.forEach(taskText => {
            let li = document.createElement("li");
            li.innerHTML = taskText;
            listContainer.appendChild(li);
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
        });
    }
}
showTask();