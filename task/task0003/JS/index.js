var newTaskNum = 1,//新建任务号
	newClassNum = 1,//新建类别号
	nowClass = "defaultClass",//当前操作的类别
	 nowTask = " ",//当前操作的任务
	 taskCount = 0;//总任务数

function todo() {//主程序
    var selAllEle = $("selAll"), 	
    		newClassEle = $("newClass"),
 		newTaskEle = $("newTask"),
 		selClass = $("lists"),
 		selTask = $("tasks"),
 		doneEle = $("doneButton"),
 		editEle = $("editButton"),
 		detailsEle = $("taskDetail"),
 		allTasks = $("allTasks"),
 		undoTasks = $("undoTasks"),
 		doneTasks = $("doneTasks"),
 		defaultClass = $("defaultClass");
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
        var listsEle = $("lists"),
        	newClassLi = document.createElement("li"),
        	newLiImg = document.createElement("img"),
        	newClassTextNode = document.createTextNode(newClassName),
        	newClassSpan = document.createElement("span"),
        	newSpanTextNode = document.createTextNode("(0)");
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
    var newTaskDiv = $("newTaskEdit"),
    		newHeadDiv = $("newTaskHead"),
    		newDateDiv = $("newTaskDate"),
    		newConDiv = $("newTaskCon"),
    		addBtn = $("addBtn"),
    		canBtn = $("canBtn");
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
    var newTaskDiv = $("newTaskEdit"),
    		newHeadDiv = $("newTaskHead"),
    		newDateDiv = $("newTaskDate"),
    		newConDiv = $("newTaskCon"),
    		tasksEle = $("tasks");
    var newTaskName = newHeadDiv.value,
    		NewTaskDate = newDateDiv.value,
    		NewTtaskDetail = newConDiv.value;
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
    var getNowClass = $(nowClass),
    		allTask = $("selAll"),
    		newTaskLi = document.createElement("li"),
    		newTaskTextNode = document.createTextNode(newTaskName),
    		taskDateDiv = $(NewTaskDate + nowClass);
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
    var newTaskDiv = $("newTaskEdit");
    newTaskDiv.style.display = "none";
}

function selAllTask(event) {//选择点击"所有任务"的触发事件
    var srcAll = getSrcElement(event),
    		tasksEleKid = $("tasks").childNodes,
    		defaultClass = $("defaultClass"),
    		childs = srcAll.parentNode.childNodes;
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
    var srcClass = getSrcElement(event);
    if (srcClass.nodeName == "SPAN") {
        srcClass = srcClass.parentNode;
    }
    var tasksEleKid = $("tasks").childNodes,
    		selAll = $("selAll");
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
    var srcClass = getSrcElement(event);
    var delImg = $("delTag" + srcClass.classNum);
    if (delImg !== null) {
        delImg.style.visibility = "visible";
    }
}

function outClass(event) {//类别列表光标移出触发事件
    var srcClass = getSrcElement(event);
    var delImg = $("delTag" + srcClass.classNum);
    if (delImg !== null) {
        delImg.style.visibility = "hidden";
    }
}

function selingTask(event) {//选择点击任务事件
    var srcTask = getSrcElement(event);
    var operateTask;
    if (srcTask.className != "taskDate" && srcTask.taskName !== undefined) {
        nowTask = srcTask.id;
        var taskName = $("taskName");
        var taskDate = $("taskDate");
        var taskDetail = $("taskDetail");
        operateTask = $(nowTask);
        taskName.innerHTML = srcTask.taskName;
        taskDate.innerHTML = "任务日期：" + srcTask.taskDate;
        taskDetail.value = operateTask.taskDetail;
    }
    var doneButton = $("doneButton");
    if (operateTask.doneTag === false) {
        doneButton.style.display = "block";
    } else {
        doneButton.style.display = "none";
    }
}

function doneTask(event) {//点击完成任务图标的触发事件
    var operateTask = $(nowTask),
    		doneButton = $("doneButton");
    var sureDone = confirm("确定完成吗？");
    if (sureDone) {
        operateTask.doneTag = true;
        operateTask.className = "done";
        doneButton.style.display = "none";
    }
}

function editTask(event) {//点击编辑任务图标的触发事件
    var taskDetail = $("taskDetail");
    taskDetail.focus();
    taskDetail.onchange = saveDetails;
}

function saveDetails(event) {//任务详细描述框内容改变后的触发事件，保存内容
    var operateTask = $(nowTask);
    operateTask.text = taskDetail.value;
}

function showAll(event) {//选择点击"所有"的触发事件
    var tasks = $("tasks").childNodes;
    for (var i = 0, length1 = tasks.length; i < length1; i++) {
        if (tasks[i].nodeType == 1) {
            tasks[i].style.display = "block";
        }
    }
}

function showUndo(event) {//选择点击"未完成"的触发事件
    var tasks = $("tasks").childNodes;
    for (var i = 0, length1 = tasks.length; i < length1; i++) {
        if (tasks[i].nodeType == 1 && tasks[i].doneTag === true) {
            tasks[i].style.display = "none";
        } else if (tasks[i].nodeType == 1) {
            tasks[i].style.display = "block";
        }
    }
}

function showDone(event) {//选择点击"已完成"的触发事件
    var tasks = $("tasks").childNodes;
    for (var i = 0, length1 = tasks.length; i < length1; i++) {
        if (tasks[i].nodeType == 1 && tasks[i].doneTag === false) {
            tasks[i].style.display = "none";
        } else if (tasks[i].nodeType == 1) {
            tasks[i].style.display = "block";
        }
    }
}

function delClass(event) {//删除类别的触发事件
    var srcImg = getSrcElement(event);
    var classLiEle = $("newClass" + srcImg.classNum);
    if (confirm("确定删除？")) {
        var tasks = $("tasks").childNodes;
        for (var i = tasks.length - 1; i >= 0; i--) {
            if (tasks[i].nodeType == 1 && tasks[i].belongTo == classLiEle.id) {
                tasks[i].parentNode.removeChild(tasks[i]);
                taskCount--;
                var allTask = $("selAll");
                allTask.innerHTML = "所有任务(" + taskCount + ")";
            }
        }
        classLiEle.parentNode.removeChild(classLiEle);
    }
}

function isDate(dat) {//判断日期格式是否为：yy-mm-dd
    return /^(\d{4})-(\d{2})-(\d{2})$/.test(dat);
}

function $ ( id ) {//封装常用函数
	return document.getElementById(id);
}

function getSrcElement (event) {//获取事件源元素
	    event = event || window.event;
	    return event.srcElement;
}
window.onload = todo;//载入页面后执行主程序