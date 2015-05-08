var newTaskNum = 1;//新建任务号
var newClassNum = 1;//新建类别号
var nowClass = "defaultClass";//当前操作的类别
var nowTask = " ";//当前操作的任务
var taskCount = 0;//总任务数

function todo() {//主程序
    var selAllEle = document.getElementById("selAll");
    var newClassEle = document.getElementById("newClass");
    var newTaskEle = document.getElementById("newTask");
    var selClass = document.getElementById("lists");
    var selTask = document.getElementById("tasks");
    var doneEle = document.getElementById("doneButton");
    var editEle = document.getElementById("editButton");
    var detailsEle = document.getElementById("taskDetail");
    var allTasks = document.getElementById("allTasks");
    var undoTasks = document.getElementById("undoTasks");
    var doneTasks = document.getElementById("doneTasks");
    var defaultClass = document.getElementById("defaultClass");
    defaultClass.taskCount = 0;
    defaultClass.newClassName = "默认分类";
    selAllEle.onclick = selAllTask;
    newClassEle.onclick = addNewClass;
    newTaskEle.onclick = addNewTask;
    selClass.onclick = selingClass;
    selClass.onmouseover = hoverClass;
    selClass.onmouseout = outClass;
    selTask.onclick = selingTask;
    doneEle.onclick = doneTask;
    editEle.onclick = editTask;
    detailsEle.onclick = editTask;
    allTasks.onclick = showAll;
    undoTasks.onclick = showUndo;
    doneTasks.onclick = showDone;
}

function addNewClass(event) {//添加类别事件
    var newClassName = prompt("请输入添加分类的名称", "新建分类" + newClassNum);
    if (newClassName !== null) {
        var listsEle = document.getElementById("lists");
        var newClassLi = document.createElement("li");
        var newLiImg = document.createElement("img");
        var newClassTextNode = document.createTextNode(newClassName);
        var newClassSpan = document.createElement("span");
        var newSpanTextNode = document.createTextNode("(0)");
        newClassLi.id = "newClass" + newClassNum;
        newClassLi.newClassName = newClassName;
        newClassLi.classNum = newClassNum;
        newClassLi.taskCount = 0;
        newLiImg.className = "delTag";
        newLiImg.id = "delTag" + newClassNum;
        newLiImg.classNum = newClassNum;
        newLiImg.src = "./img/del.gif";
        newLiImg.style.visibility = "hidden";
        newLiImg.onclick = delClass;
        newClassLi.appendChild(newLiImg);
        newClassLi.appendChild(newClassTextNode);
        newClassLi.appendChild(newClassSpan);
        newClassSpan.appendChild(newSpanTextNode);
        listsEle.appendChild(newClassLi);
        newClassNum++;
    }
}

function addNewTask(event) {//添加任务事件
    var newTaskDiv = document.getElementById("newTaskEdit");
    var newHeadDiv = document.getElementById("newTaskHead");
    var newDateDiv = document.getElementById("newTaskDate");
    var newConDiv = document.getElementById("newTaskCon");
    var addBtn = document.getElementById("addBtn");
    var canBtn = document.getElementById("canBtn");
    newHeadDiv.style.color = "#DDD";
    newDateDiv.style.color = "#DDD";
    newConDiv.style.color = "#DDD";
    newHeadDiv.value = "新建任务" + newTaskNum;
    newDateDiv.value = "2015-05-08";
    newConDiv.value = "请完成此任务。";
    newTaskDiv.style.display = "block";
    newHeadDiv.onfocus = clearIt;
    newDateDiv.onfocus = clearIt;
    newConDiv.onfocus = clearIt;
    addBtn.onclick = clickAddTask;
    canBtn.onclick = clickCanTask;
}

function clearIt(event) {//点击之后，清空输入框事件
    this.value = "";
    this.style.color = "#000";
    this.onclick = null;
}

function clickAddTask(event) {//点击添加，提交任务之后，触发的事件
    var newTaskDiv = document.getElementById("newTaskEdit");
    var newHeadDiv = document.getElementById("newTaskHead");
    var newDateDiv = document.getElementById("newTaskDate");
    var newConDiv = document.getElementById("newTaskCon");
    var tasksEle = document.getElementById("tasks");
    var newTaskName = newHeadDiv.value;
    var NewTaskDate = newDateDiv.value;
    var NewTtaskDetail = newConDiv.value;
    if (newTaskName.length > 5) {
        alert("请输入少于五个字符的标题！");
        return;
    } else if (!(isDate(NewTaskDate))) {
        alert("日期格式：YY-MM-DD！");
        return;
    } else if (NewTtaskDetail > 140) {
        alert("请输入少于140个字符的任务描述！");
        return;
    }
    var getNowClass = document.getElementById(nowClass);
    var allTask = document.getElementById("selAll");
    var newTaskLi = document.createElement("li");
    var newTaskTextNode = document.createTextNode(newTaskName);
    var taskDateDiv = document.getElementById(NewTaskDate + nowClass);
    if (taskDateDiv === null) {
        taskDateDiv = document.createElement("div");
        var newDateTextNode = document.createTextNode(NewTaskDate);
        taskDateDiv.id = NewTaskDate + nowClass;
        taskDateDiv.belongTo = nowClass;
        taskDateDiv.className = "taskDate";
        taskDateDiv.appendChild(newDateTextNode);
        tasksEle.appendChild(taskDateDiv);
    }
    newTaskLi.className = "undo";
    newTaskLi.doneTag = false;
    newTaskLi.belongTo = nowClass;
    newTaskLi.taskName = newTaskName;
    newTaskLi.taskDate = NewTaskDate;
    newTaskLi.taskDetail = NewTtaskDetail;
    newTaskLi.id = "taskNum" + newTaskNum;
    newTaskLi.appendChild(newTaskTextNode);
    tasksEle.appendChild(newTaskLi);
    newTaskNum++;
    taskCount++;
    getNowClass.taskCount++;
    allTask.innerHTML = "所有任务(" + taskCount + ")";
    getNowClass.lastChild.innerHTML = "(" + getNowClass.taskCount + ")";
    newTaskDiv.style.display = "none";
}

function clickCanTask(event) {//点击取消添加任务，触发的事件
    var newTaskDiv = document.getElementById("newTaskEdit");
    newTaskDiv.style.display = "none";
}

function selAllTask(event) {//选择点击"所有任务"的触发事件
    event = event || window.event;
    var srcAll = event.srcElement;
    var tasksEleKid = document.getElementById("tasks").childNodes;
    var defaultClass = document.getElementById("defaultClass");
    var childs = srcAll.parentNode.childNodes;
    defaultClass.style.color = "#000";
    for (var i = 0, length1 = childs.length; i < length1; i++) {
        if (childs[i].nodeType == 1) childs[i].style.color = "#000";
    }
    srcAll.style.color = "#238c00";
    for (var j = 0, length2 = tasksEleKid.length; j < length2; j++) {
        if (tasksEleKid[j].nodeType == 1) {
            tasksEleKid[j].style.display = "block";
        }
    }
    srcAll.innerHTML = "所有任务(" + taskCount + ")";
}

function selingClass(event) {//选择点击类别事件
    event = event || window.event;
    var srcClass = event.srcElement;
    if (srcClass.nodeName == "SPAN") {
        srcClass = srcClass.parentNode;
    }
    var tasksEleKid = document.getElementById("tasks").childNodes;
    var selAll = document.getElementById("selAll");
    var childs = srcClass.parentNode.childNodes;
    for (var i = 0, length1 = childs.length; i < length1; i++) {
        if (childs[i].nodeType == 1) childs[i].style.color = "#000";
    }
    srcClass.style.color = "#238c00";
    selAll.style.color = "#000";
    nowClass = srcClass.id;
    for (var j = 0, length2 = tasksEleKid.length; j < length2; j++) {
        if (tasksEleKid[j].nodeType == 1) {
            tasksEleKid[j].style.display = "none";
            if (tasksEleKid[j].belongTo == nowClass) {
                tasksEleKid[j].style.display = "block";
            }
        }
    }
}

function hoverClass(event) {//类别列表hover事件
    event = event || window.event;
    var srcClass = event.srcElement;
    var delImg = document.getElementById("delTag" + srcClass.classNum);
    if (delImg !== null) {
        delImg.style.visibility = "visible";
    }
}

function outClass(event) {//类别列表光标移出触发事件
    event = event || window.event;
    var srcClass = event.srcElement;
    var delImg = document.getElementById("delTag" + srcClass.classNum);
    if (delImg !== null) {
        delImg.style.visibility = "hidden";
    }
}

function selingTask(event) {//选择点击任务事件
    event = event || window.event;
    var srcTask = event.srcElement;
    var operateTask;
    if (srcTask.className != "taskDate" && srcTask.taskName !== undefined) {
        nowTask = srcTask.id;
        var taskName = document.getElementById("taskName");
        var taskDate = document.getElementById("taskDate");
        var taskDetail = document.getElementById("taskDetail");
        operateTask = document.getElementById(nowTask);
        taskName.innerHTML = srcTask.taskName;
        taskDate.innerHTML = "任务日期：" + srcTask.taskDate;
        taskDetail.value = operateTask.taskDetail;
    }
    var doneButton = document.getElementById("doneButton");
    if (operateTask.doneTag === false) {
        doneButton.style.display = "block";
    } else {
        doneButton.style.display = "none";
    }
}

function doneTask(event) {//点击完成任务图标的触发事件
    var operateTask = document.getElementById(nowTask);
    var doneButton = document.getElementById("doneButton");
    var sureDone = confirm("确定完成吗？");
    if (sureDone) {
        operateTask.doneTag = true;
        operateTask.className = "done";
        doneButton.style.display = "none";
    }
}

function editTask(event) {//点击编辑任务图标的触发事件
    var taskDetail = document.getElementById("taskDetail");
    taskDetail.focus();
    taskDetail.onchange = saveDetails;
}

function saveDetails(event) {//任务详细描述框内容改变后的触发事件，保存内容
    var operateTask = document.getElementById(nowTask);
    operateTask.text = taskDetail.value;
}

function showAll(event) {//选择点击"所有"的触发事件
    var tasks = document.getElementById("tasks").childNodes;
    for (var i = 0, length1 = tasks.length; i < length1; i++) {
        if (tasks[i].nodeType == 1) {
            tasks[i].style.display = "block";
        }
    }
}

function showUndo(event) {//选择点击"未完成"的触发事件
    var tasks = document.getElementById("tasks").childNodes;
    for (var i = 0, length1 = tasks.length; i < length1; i++) {
        if (tasks[i].nodeType == 1 && tasks[i].doneTag === true) {
            tasks[i].style.display = "none";
        } else if (tasks[i].nodeType == 1) {
            tasks[i].style.display = "block";
        }
    }
}

function showDone(event) {//选择点击"已完成"的触发事件
    var tasks = document.getElementById("tasks").childNodes;
    for (var i = 0, length1 = tasks.length; i < length1; i++) {
        if (tasks[i].nodeType == 1 && tasks[i].doneTag === false) {
            tasks[i].style.display = "none";
        } else if (tasks[i].nodeType == 1) {
            tasks[i].style.display = "block";
        }
    }
}

function delClass(event) {//删除类别的触发事件
    event = event || window.event;
    var srcImg = event.srcElement;
    var classLiEle = document.getElementById("newClass" + srcImg.classNum);
    if (confirm("确定删除？")) {
        var tasks = document.getElementById("tasks").childNodes;
        for (var i = tasks.length - 1; i >= 0; i--) {
            if (tasks[i].nodeType == 1 && tasks[i].belongTo == classLiEle.id) {
                tasks[i].parentNode.removeChild(tasks[i]);
                taskCount--;
                var allTask = document.getElementById("selAll");
                allTask.innerHTML = "所有任务(" + taskCount + ")";
            }
        }
        classLiEle.parentNode.removeChild(classLiEle);
    }
}

function isDate(dat) {//判断日期格式是否为：yy-mm-dd
    return /^(\d{4})-(\d{2})-(\d{2})$/.test(dat);
}
window.onload = todo;//载入页面后执行主程序