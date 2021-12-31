// Controllers
const masterList = [
  {
    title: "Default",
    tasks: [
      {
        completed: false,
        title: "Hello!",
        description: `Welcome to To-Do'er`,
        dueDate: "2021-12-31",
        priority: 0,
      },
    ],
  },
];

//getLocalList
function getListDB() {
  if (localStorage.getItem("lists") === null) {
    saveListDB(masterList);
  }
  return JSON.parse(localStorage.getItem("lists"));
}
//saveLocalList
function saveListDB(list) {
  localStorage.setItem("lists", JSON.stringify(list));
}
//getList
function getList(listId) {
  const lists = getListDB();
  return lists[listId];
}
//addList
function addList(list) {
  const lists = getListDB();
  const index = lists.push(list) - 1;
  saveListDB(lists);
  return index;
}
//editList
function editList(listId, list) {
  const lists = getListDB();
  lists[listId].title = list.title;
  saveListDB(lists);
}
//rmvList
function rmvList(listId) {
  const lists = getListDB();
  lists.splice(listId, 1);
  saveListDB(lists);
}
//addTask
function addTask(listId, task) {
  const lists = getListDB();
  const index = lists[listId].tasks.push(task) - 1;
  saveListDB(lists);
  return index;
}
//editTask
function editTask(listId, taskId, task) {
  const lists = getListDB();
  lists[listId].tasks[taskId] = task;
  saveListDB(lists);
}
//turnStatusTask
function flipStatusTask(listId, taskId) {
  const lists = getListDB();
  let flip = false;
  if (lists[listId].tasks[taskId].completed === false) {
    lists[listId].tasks[taskId].completed = true;
    flip = true;
  } else {
    lists[listId].tasks[taskId].completed = false;
  }
  saveListDB(lists);
  return flip;
}
//rmvTask
function rmvTask(listId, taskId) {
  const lists = getListDB();
  lists[listId].tasks.splice(taskId, 1);
  saveListDB(lists);
}

// FORMS
function submitList() {
  const listInput = document.getElementById("newListTitle");
  addList({ title: listInput.value, tasks: [] });
  renderDB();
}

function submitListEdits(listId) {
  const newListTit = document.getElementById("listTitleEdit").value;
  const editedList = {
    title: newListTit,
  };
  editList(listId, editedList);
  renderDB();
}

function submitTask() {
  const newTaskList = document.getElementById("availableLists").selectedIndex;
  const newTaskTit = document.getElementById("newTaskTit").value;
  const newTaskDes = document.getElementById("newTaskDes").value;
  const newTaskDue = document.getElementById("newTaskDue").value;
  const newTaskPrio = document.getElementById("newTaskPrio").value;

  const newTask = {
    completed: false,
    title: newTaskTit,
    description: newTaskDes,
    dueDate: newTaskDue,
    priority: newTaskPrio,
  };
  addTask(newTaskList, newTask);

  renderDB();

  document.getElementById("newTaskTit").value = "";
  document.getElementById("newTaskDes").value = "";
  document.getElementById("newTaskDue").value = "";
  document.getElementById("newTaskPrio").value = 1;
}

function submitTaskEdits(listId, taskId) {
  const taskTitEdit = document.getElementById("taskTitEdit").value;
  const taskDesEdit = document.getElementById("taskDesEdit").value;
  const taskDueEdit = document.getElementById("taskDueEdit").value;
  const taskPrioEdit = document.getElementById("taskPrioEdit").value;
  const taskListEdit =
    document.getElementById("availableListsEdit").selectedIndex;
  const editedTask = {
    completed: false,
    title: taskTitEdit,
    description: taskDesEdit,
    dueDate: taskDueEdit,
    priority: taskPrioEdit,
  };

  if (taskListEdit == listId) {
    editTask(listId, taskId, editedTask);
  } else {
    addTask(taskListEdit, editedTask);
    rmvTask(listId, taskId);
  }
}

function renderOptions() {
  const availableLists = document.getElementById("availableLists");
  const availableListsEdit = document.getElementById("availableListsEdit");
  const lists = getListDB();
  for (i = 0; i < lists.length; i++) {
    const option = document.createElement("option");
    option.setAttribute("value", lists[i].title);
    option.setAttribute("selected", "");
    option.innerText = lists[i].title;
    availableLists.appendChild(option);

    const optionEdit = document.createElement("option");
    optionEdit.setAttribute("value", lists[i].title);
    optionEdit.innerText = lists[i].title;
    availableListsEdit.appendChild(optionEdit);
  }
}

function fillTaskForm(list, listId, task, taskId) {
  const tempTaskList = document.getElementById("availableListsEdit");
  const tempTaskTit = document.getElementById("taskTitEdit");
  const tempTaskDes = document.getElementById("taskDesEdit");
  const tempTaskDue = document.getElementById("taskDueEdit");
  const tempTaskPrio = document.getElementById("taskPrioEdit");

  tempTaskList.value = list.title;
  tempTaskTit.value = task.title;
  tempTaskDes.value = task.description;
  tempTaskDue.value = task.dueDate;
  tempTaskPrio.value = task.priority;

  const tempTaskForm = document.getElementById("formTaskEdit");
  tempTaskForm.setAttribute(
    "onsubmit",
    `submitTaskEdits(${listId}, ${taskId})`
  );
}

function fillListForm(list, listId) {
  const tempList = document.getElementById("listTitleEdit");
  tempList.value = list.title;

  const tempListBtn = document.getElementById("updateList");
  tempListBtn.setAttribute("onclick", `submitListEdits(${listId})`);
}

function hideForms() {
  var collapseElementList = [].slice.call(
    document.querySelectorAll(".collapse.show")
  );
  var collapseList = collapseElementList.map(function (collapseEl) {
    return new bootstrap.Collapse(collapseEl);
  });
}

// DOMS
function renderNavTabs(data) {
  for (i = 0; i < data.length; i++) {
    // create lists
    const tabs = document.getElementsByClassName("tabs")[0];
    const listitem = document.createElement("li");
    listitem.setAttribute("id", `list-${i}-nav`);
    listitem.setAttribute("class", "nav-item");
    listitem.setAttribute("role", "presentation");
    // list title
    const listTitle = document.createElement("button");
    listTitle.setAttribute(
      "class",
      "listTitle nav-link d-flex align-items-center justify-content-around"
    );
    listTitle.setAttribute("id", `list-${i}-tab`);
    listTitle.setAttribute("data-bs-toggle", "tab");
    listTitle.setAttribute("data-bs-target", `#list-${i}`);
    listTitle.setAttribute("type", "button");
    listTitle.setAttribute("role", "tab");
    listTitle.setAttribute("aria-controls", `list-${i}`);
    listTitle.setAttribute("aria-selected", "false");

    const listTitleText = document.createElement("div");
    listTitleText.setAttribute("class", "p-1 nav-elem");
    listTitleText.innerText = data[i].title;

    // list edit
    const listEditButton = document.createElement("button");
    listEditButton.setAttribute("id", "editList");
    listEditButton.setAttribute("class", "btn p-1 collapsed");
    listEditButton.setAttribute("data-bs-toggle", "collapse");
    listEditButton.setAttribute("data-bs-target", "#collapseFormListEdit");
    listEditButton.setAttribute("aria-expanded", "false");
    listEditButton.setAttribute("aria-controls", "collapseFormListEdit");
    listEditButton.setAttribute("onclick", "hideForms()");
    const listEditIcon = document.createElement("i");
    listEditIcon.setAttribute("class", "bi bi-pencil nav-elem");
    // list delete
    const listDelButton = document.createElement("button");
    listDelButton.setAttribute("id", "delList");
    listDelButton.setAttribute("class", "btn p-1");
    const listDelIcon = document.createElement("i");
    listDelIcon.setAttribute("class", "bi bi-x-circle nav-elem");

    listDelButton.appendChild(listDelIcon);
    listEditButton.appendChild(listEditIcon);
    listTitle.appendChild(listTitleText);
    listTitle.appendChild(listEditButton);
    listTitle.appendChild(listDelButton);
    listitem.appendChild(listTitle);
    tabs.appendChild(listitem);
  }
}

function renderTabPanels(data) {
  const listContent = document.getElementById("listContent");
  for (i = 0; i < data.length; i++) {
    const tabPanel = document.createElement("div");
    tabPanel.setAttribute("id", `list-${i}`);
    tabPanel.setAttribute("class", "tab-pane fade mx-3");
    tabPanel.setAttribute("role", "tabpanel");
    tabPanel.setAttribute("aria-labelledby", `${data[i].title}-tab`);

    listContent.appendChild(tabPanel);
  }
}

function renderTable(list, listIndex) {
  const tabPanel = document.getElementById(`list-${listIndex}`);
  const table = document.createElement("table");
  table.setAttribute("class", "table table-striped table-hover");
  // HEADER
  const tHead = document.createElement("thead");
  // HEADER ITEMS
  const headTr = document.createElement("tr");
  headTr.setAttribute("scope", "col");
  const headStat = document.createElement("th");
  // headStat.innerHTML = "Complete";
  headStat.setAttribute("scope", "col");
  const headTask = document.createElement("th");
  headTask.innerHTML = "Tasks";
  headTask.setAttribute("scope", "col");
  const headDes = document.createElement("th");
  headDes.innerHTML = "Details";
  headDes.setAttribute("scope", "col");
  const headDue = document.createElement("th");
  headDue.innerHTML = "Due Date";
  headDue.setAttribute("scope", "col");
  const headPrio = document.createElement("th");
  headPrio.innerHTML = "Priority";
  headPrio.setAttribute("scope", "col");
  const headAct = document.createElement("th");
  headAct.innerHTML = "Actions";
  headAct.setAttribute("scope", "col");
  // APPEND HEADER TH TO TR
  headTr.appendChild(headStat);
  headTr.appendChild(headTask);
  headTr.appendChild(headDes);
  headTr.appendChild(headDue);
  headTr.appendChild(headPrio);
  headTr.appendChild(headAct);
  // APPEND HEADER TR TO HEAD
  tHead.appendChild(headTr);
  // APPEND HEADER TO TABLE
  table.appendChild(tHead);

  // CREATE TASKS
  const tBody = document.createElement("tbody");
  for (i = 0; i < list.tasks.length; i++) {
    const task = list.tasks[i];
    const taskElem = document.createElement("tr");
    taskElem.setAttribute("id", `task-${i}`);
    taskElem.setAttribute("class", "align-middle");

    const keys = Object.keys(task);
    for (h = 0; h < keys.length; h++) {
      switch (keys[h]) {
        case "completed":
          const taskComp = document.createElement("td");
          taskComp.setAttribute("class", "col");

          const checkForm = document.createElement("div");
          checkForm.setAttribute("class", "form-check");

          const check = document.createElement("input");
          check.setAttribute("class", "form-check-input");
          check.setAttribute("type", "checkbox");
          check.setAttribute("value", task.completed);
          if (task.completed) {
            check.setAttribute("checked", "");
          }
          check.setAttribute("id", "complete");
          checkForm.appendChild(check);

          taskComp.setAttribute("id", "complete");
          taskComp.appendChild(checkForm);
          taskElem.appendChild(taskComp);
          break;
        case "title":
          const taskTitle = document.createElement("td");
          taskTitle.setAttribute("class", "col");
          taskTitle.innerText = task.title;
          taskElem.appendChild(taskTitle);
          break;
        case "description":
          const taskDesc = document.createElement("td");
          taskDesc.setAttribute("class", "col");
          taskDesc.innerText = task.description;
          taskElem.appendChild(taskDesc);
          break;
        case "dueDate":
          const taskDate = document.createElement("td");
          taskDate.setAttribute("class", "col");
          taskDate.innerText = task.dueDate;
          taskElem.appendChild(taskDate);
          break;
        case "priority":
          const taskPrior = document.createElement("td");
          taskPrior.setAttribute("class", "col");
          if (task.priority == 0) {
            taskPrior.innerText = "Low";
          } else if (task.priority == 1) {
            taskPrior.innerText = "Medium";
          } else {
            taskPrior.innerText = "High";
          }
          taskElem.appendChild(taskPrior);
          break;
        default:
          console.log("key not in switch");
      }
    }

    const actTd = document.createElement("td");
    const editElemButton = document.createElement("button");
    editElemButton.setAttribute("id", "editTask");
    editElemButton.setAttribute("class", "col btn btn-light m-1 collapsed");
    editElemButton.setAttribute("data-bs-toggle", "collapse");
    editElemButton.setAttribute("data-bs-target", "#collapseFormTaskEdit");
    editElemButton.setAttribute("aria-expanded", "false");
    editElemButton.setAttribute("aria-controls", "collapseFormTaskEdit");
    editElemButton.setAttribute("onclick", "hideForms()");
    const editElemIcon = document.createElement("i");
    editElemIcon.setAttribute("class", "bi bi-pencil");

    editElemButton.appendChild(editElemIcon);
    actTd.appendChild(editElemButton);

    const delElemButton = document.createElement("button");
    delElemButton.setAttribute("id", "delTask");
    delElemButton.setAttribute("class", "col btn btn-light m-1");
    const delElemIcon = document.createElement("i");
    delElemIcon.setAttribute("class", "bi bi-x");

    delElemButton.appendChild(delElemIcon);
    actTd.appendChild(delElemButton);

    taskElem.appendChild(actTd);
    tBody.appendChild(taskElem);

    table.appendChild(tHead);
    table.appendChild(tBody);
    tabPanel.appendChild(table);
  }
}

function clearDom() {
  const tabs = document.getElementById("tabs");
  if (tabs.hasChildNodes() === true) {
    while (tabs.firstChild) {
      tabs.removeChild(tabs.lastChild);
    }
  }
  const content = document.getElementById("listContent");
  if (content.hasChildNodes() === true) {
    while (content.firstChild) {
      content.removeChild(content.lastChild);
    }
  }
  const options = document.getElementById("availableLists");
  if (options.hasChildNodes() === true) {
    while (options.firstChild) {
      options.removeChild(options.lastChild);
    }
  }
}

function renderDB() {
  clearDom();
  const data = getListDB();

  renderNavTabs(data);
  renderTabPanels(data);

  for (let i = 0; i < data.length; i++) {
    const tabPanel = document.getElementById(data[i].title);
    const table = renderTable(data[i], i);
  }

  const tabEl = document.querySelectorAll("button[data-bs-toggle='tab']");
  if (tabEl.length == 1) {
    const tab = new bootstrap.Tab(tabEl[0]);
    tab.show();
  } else if (tabEl.length > 1) {
    const tab = new bootstrap.Tab(tabEl[tabEl.length - 1]);
    tab.show();
  }
}
renderDB();
renderOptions();

document.addEventListener("click", function (e) {
  const lists = getListDB();
  if (e.target.id === "delTask") {
    const listId =
      e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id.slice(
        5
      );
    const taskId = e.target.parentNode.parentNode.id.slice(5);

    const confirmation = confirm(
      `Want to delete task: "${lists[listId].tasks[taskId].title}" ?`
    );

    if (confirmation) {
      rmvTask(listId, taskId);
      renderDB();
    }
  } else if (e.target.id === "delList") {
    if (e.target.parentNode.parentNode.parentNode.childNodes.length > 1) {
      const listId = e.target.parentNode.parentNode.id.slice(5, 6);
      const confirmation = confirm(
        `Want to delete list: "${lists[listId].title}" ?`
      );

      if (confirmation) {
        rmvList(listId);
        renderDB();
      }
    } else {
      alert("At least one list must exist");
    }
  } else if (e.target.id === "complete") {
    const listId =
      e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id.slice(
        5,
        6
      );
    const taskId = e.target.parentNode.parentNode.parentNode.id.slice(5);
    flipStatusTask(listId, taskId);
    renderDB();
    const tabEl = document.querySelectorAll("button[data-bs-toggle='tab']");
    const tab = new bootstrap.Tab(tabEl[listId]);
    tab.show();
  } else if (e.target.id === "editTask") {
    const listId =
      e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id.slice(
        5
      );
    const taskId = e.target.parentNode.parentNode.id.slice(5);
    const lists = getListDB();
    const tempTask = lists[listId].tasks[taskId];
    const tempList = lists[listId];
    fillTaskForm(tempList, listId, tempTask, taskId);
  } else if (e.target.id === "editList") {
    const listId = e.target.parentNode.parentNode.id.slice(5, 6);
    const lists = getListDB();
    const tempList = lists[listId];
    fillListForm(tempList, listId);
  }
});
