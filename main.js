// 유저가 값을 입력한다.
// +버튼을 클릭하면 할일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다
// check버튼을 누르면 할 일이 끝나면서 밑줄이 간다
//  1. check 버튼을 클릭하는 순간 true false
//  2. true이면 끝난걸로 간주하고 밑줄 보여주기
//  3. false이면 안끝난걸로 간주하고 그대로
// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만 나타난다
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input")
let plusButton = document.getElementById("plus-button")
let taskList = []
let tabs = document.querySelectorAll(".task-tabs div")
let mode= "all";
let filterList = []
let underLine = document.getElementById("under-line")

plusButton.addEventListener("click",addTask )
plusButton.addEventListener("click", function(){taskInput.value=""})
taskInput.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        event.preventDefault();
        document.getElementById(plusButton.click())
    }
})
tabs.forEach(menu=> menu.addEventListener("click", (e)=>underlineIndicator(e)))

function underlineIndicator(e) {
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){
        filter(event)
    })
}

function addTask(){
    let task ={
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isStarted: false,
        isComplete: false
    }

    if(task.taskContent==""){
        return alert("할일을 입력해주세요");
    }

    for(let i=0; i<taskList.length; i++){
        if(taskList[i].taskContent == taskInput.value){
            return alert("해당 할일은 이미 추가되어 있습니다");
        }
    }

    taskList.push(task)
    console.log(taskList)
    
    if (mode === "not yet"){
        filterList = taskList.filter((task) => !task.isComplete && !task.isStarted)
    } else if (mode === "in progress"){
        filterList = taskList.filter((task) => !task.isComplete && task.isStarted)
    } else if (mode === "done"){
        filterList = taskList.filter((task) => task.isComplete && task.isStarted)
    }
    render();


}

function render(){
    let resultHTML = ""

        // 1. 내가 선택한 탭에 따라서
        list = [];
        if(mode === "all"){
            list = taskList;
        } else {
            list = filterList;
        }
        // 2. 리스트를 달리 보여준다
    

    for(let i=0; i<list.length; i++){

        if(list[i].isStarted == true && list[i].isComplete == false){
            resultHTML+=`<div class="task task-started">
            <span>${list[i].taskContent}</span>
            <div class="button-box">
                <button onclick="startTask('${list[i].id}')" style="color: rgb(126, 126, 126);"><i class="fa-solid fa-pause"></i></button>
                <button onclick="toggleComplete('${list[i].id}')" style="color: rgb(0, 168, 0);"><i class="fa-solid fa-check"></i></button>
                <button onclick="deleteTask('${list[i].id}')" style="color: red;"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>`
        } else if(list[i].isStarted == true && list[i].isComplete == true){
            resultHTML+=`<div class="task task-done">
                    <span>${list[i].taskContent}</span>
                    <div class="button-box">
                        <button onclick="startTask('${list[i].id}')" style="color: rgb(126, 126, 126);"><i class="fa-solid fa-pause"></i></button>
                        <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-right"></i></button>
                        <button onclick="deleteTask('${list[i].id}')" style="color: red;"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>`
        } else{
            resultHTML += `<div class="task">
            <span>${list[i].taskContent}</span>
            <div class="button-box">
                <button onclick="startTask('${list[i].id}')" style="color: rgb(126, 126, 126);"><i class="fa-solid fa-play"></i></button>
                <button onclick="toggleComplete('${list[i].id}')" style="color: rgb(0, 168, 0);"><i class="fa-solid fa-check"></i></button>
                <button onclick="deleteTask('${list[i].id}')" style="color: red;"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>`
        }

    }

    document.getElementById("task-board").innerHTML = resultHTML
}

function startTask(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id && taskList[i].isComplete == false){
            taskList[i].isStarted = !taskList[i].isStarted;
            console.log(taskList)
            break;
        }
    }

    if (mode === "not yet"){
        filterList = taskList.filter((task) => !task.isComplete && !task.isStarted)
    } else if (mode === "in progress"){
        filterList = taskList.filter((task) => !task.isComplete && task.isStarted)
    } else if (mode === "done"){
        filterList = taskList.filter((task) => task.isComplete && task.isStarted)
    }
    render();

}

function toggleComplete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id && taskList[i].isStarted == true){
            taskList[i].isComplete= !taskList[i].isComplete;
            console.log(taskList)
            break;
        }
    }

    if (mode === "not yet"){
        filterList = taskList.filter((task) => !task.isComplete && !task.isStarted)
    } else if (mode === "in progress"){
        filterList = taskList.filter((task) => !task.isComplete && task.isStarted)
    } else if (mode === "done"){
        filterList = taskList.filter((task) => task.isComplete && task.isStarted)
    }
    render();

}

function deleteTask(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
        }
    }
    if (mode === "not yet"){
        filterList = taskList.filter((task) => !task.isComplete && !task.isStarted)
    } else if (mode === "in progress"){
        filterList = taskList.filter((task) => !task.isComplete && task.isStarted)
    } else if (mode === "done"){
        filterList = taskList.filter((task) => task.isComplete && task.isStarted)
    }
    render();
}

function filter(event){
    console.log("filter", event.target.id)

    mode = event.target.id
    filterList = []

    if(mode == "not yet"){
        //시작 전인 아이템을 보여준다.
        // task.isComplete = false && task.isStarted = false
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === false && taskList[i].isStarted === false){
                filterList.push(taskList[i])
            }
        }
    } else if(mode == "in progress"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === false && taskList[i].isStarted === true){
                filterList.push(taskList[i])
            }
        }
        // 진행중인 아이템을 보여준다.
        //task.isComplete = false && task.isStarted = true
    } else if(mode == "done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
        // 끝난 케이스
        //task.isComplete = true
    }
    render();
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}