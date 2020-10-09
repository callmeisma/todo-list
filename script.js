// Controllers
const allProjects =  [
  {
    title: 'Default',
    todos: [
      {
        title: 'Hello!',
        description: `Welcome to To-Do'er`,
        dueDate: '2020-12-31',
        priority: 0,
        completed: false
      }
    ]
  }
];

//getLocalProj
function getProjDB() {
  if(localStorage.getItem('projects') === null) {
    saveProjDB(allProjects)
  }
  return JSON.parse(localStorage.getItem('projects'));
};
//saveLocalProj
function saveProjDB(proj) {
  localStorage.setItem('projects', JSON.stringify(proj));
}
//getProj
function getProj(projId) {
  const projects = getProjDB();
  return projects[projId];
};
//addProj
function addProj(proj) {
  const projects = getProjDB();
  const index = projects.push(proj) -1;
  saveProjDB(projects);
  return index;
}
//editProj
function editProj(projId, proj) {
  const projects = getProjDB();
  projects[projId].title = proj.title;
  saveProjDB(projects);
}
//rmvProj
function rmvProj(projId) {
  const projects = getProjDB();
  projects.splice(projId, 1);
  saveProjDB(projects);
}
//getTodo
function getTodos(projId) {
  const projects = getProjDB();
  return projects[projId].todos
}
//addTodo
function addTodo(projId, todo) {
  const projects = getProjDB();
  const index = projects[projId].todos.push(todo) -1;
  saveProjDB(projects);
  return index
}
//editTodo
function editTodo(projId, todoId, todo) {
  const projects = getProjDB();
  projects[projId].todos[todoId] = todo;
  saveProjDB(projects);
}
//turnStatusTodo
function flipStatusTodo(projId, todoId) {
  const projects = getProjDB();
  let flip = false;
  if (projects[projId].todos[todoId].completed === false) {
    projects[projId].todos[todoId].completed = true;
    flip = true;
  } else {
    projects[projId].todos[todoId].completed = false;
  }
  saveProjDB(projects);
  return flip;
}
//rmvTodo
function rmvTodo(projId, todoId) {
  const projects = getProjDB();
  projects[projId].todos.splice(todoId, 1);
  saveProjDB(projects);
}

// Doms
function renderDB() {
  const data = getProjDB();
  for (i = 0; i<data.length; i++) {
    // create projs
    const container = document.getElementsByClassName('container')[0];
    const project = document.createElement('li');
    project.setAttribute('id', `proj-${i}`);
    // proj title
    const projTitle = document.createElement('h2');
    projTitle.setAttribute('class', 'projTitle');
    projTitle.innerText = data[i].title;
    // proj edit
    const projEdit = document.createElement('button')
    projEdit.setAttribute('id', 'editProj');
    projEdit.innerText = 'edit';
    // proj delete
    const projDel = document.createElement('button')
    projDel.setAttribute('id', 'delProj');
    projDel.innerText = 'delete';
    // proj body
    const projBody = document.createElement('div');
    projBody.setAttribute('class', 'projBody');
    // body ul list
    const bodyUl = document.createElement('ul');

    // create todos
    for (j = 0; j < data[i].todos.length; j++) {
        const todo = data[i].todos[j];

        const todoElem = document.createElement('li');
        todoElem.setAttribute('id', `todo-${j}`);

        const keys = Object.keys(todo);
        for (h = 0; h < keys.length; h++) {
          switch(keys[h]) {
            case 'title':
              const todoTitle = document.createElement('h3');
              todoTitle.innerText = todo.title;
              todoElem.appendChild(todoTitle);
              break;
            case 'description':
              const todoDesc = document.createElement('p');
              todoDesc.innerText = todo.description;
              todoElem.appendChild(todoDesc);
              break;
            case 'dueDate':
              const todoDate = document.createElement('p');
              todoDate.innerText = todo.dueDate;
              todoElem.appendChild(todoDate); 
              break;           
            case 'priority':
              const todoPrior = document.createElement('p');
              if (todo.priority === 0) {
                todoPrior.innerText = 'Low';
              } else if (todo.priority === 1) {
                todoPrior.innerText = 'Normal';
              } else {
                todoPrior.innerText = 'High';
              }
              todoElem.appendChild(todoPrior); 
              break;
            case 'completed':
              const todoComp = document.createElement('button');
              todoComp.innerText = todo.completed;
              todoComp.setAttribute('id', 'complete');
              todoElem.appendChild(todoComp);
              break;          
            default:
              console.log('key not in switch');
          }
        };
        
        const editElem = document.createElement('button');
        editElem.innerText = 'edit';
        editElem.setAttribute('id', 'editTodo')
        todoElem.appendChild(editElem);

        const delElem = document.createElement('button');
        delElem.innerText = 'delete';
        delElem.setAttribute('id', 'delTodo')
        todoElem.appendChild(delElem);

        bodyUl.appendChild(todoElem);
      };
    // append creations
    projBody.appendChild(bodyUl);
    project.appendChild(projTitle);
    project.appendChild(projEdit);
    project.appendChild(projDel);
    project.appendChild(projBody);
    container.appendChild(project);
  }
}

function renderUpdates() {
  if (document.getElementById('container').hasChildNodes() === true ) {
      let items = document.getElementById('container');
      while (items.firstChild) {
          items.removeChild(items.lastChild);
      }
  }
  
  renderDB();

  if (document.getElementById('availableProjs').hasChildNodes() === true ) {
    let items = document.getElementById('availableProjs');
    while (items.firstChild) {
        items.removeChild(items.lastChild);
    }

  renderOptions();
}
}

function submitProj() {
  const projInput = document.getElementById('newProjTitle');
  if (projInput.value !== '') {
    console.log(projInput.value);
    addProj({title: projInput.value, todos: []});
    renderUpdates();
    projInput.value = '';
  } else {
    alert('Please enter a project title');
  }
}

function submitTodo() {
  const newTodoProj = document.getElementById('availableProjs').selectedIndex;
  const newTodoTit = document.getElementById('newTodoTit').value;
  const newTodoDes = document.getElementById('newTodoDes').value;
  const newTodoDue = document.getElementById('newTodoDue').value;
  const newTodoStat = document.getElementById('newTodoStat').value;
  
  if (newTodoTit !== '') {
    const newTodo = {
      title: newTodoTit,
      description: newTodoDes,
      dueDate: newTodoDue,
      priority: newTodoStat,
      completed: false
    }
    addTodo(newTodoProj, newTodo)
  } else {
    alert('Please enter a title');
  }

  renderUpdates();

  document.getElementById('newTodoTit').value = '';
  document.getElementById('newTodoDes').value = '';
  document.getElementById('newTodoDue').value = '';
  document.getElementById('newTodoStat').value = 1;
};

function renderOptions() {
  const availableProjs = document.getElementById('availableProjs');
  const projects = getProjDB();
  for (i = 0; i < projects.length; i++) {
    const option = document.createElement('option');
    option.setAttribute('value', projects[i].title)
    option.innerText = projects[i].title;
    availableProjs.appendChild(option);
  }
}

function fillTodoForm(proj, projId, todo, todoId) {
  const tempTodoProj = document.getElementById('availableProjs');
  const tempTodoTit = document.getElementById('newTodoTit');
  const tempTodoDes = document.getElementById('newTodoDes');
  const tempTodoDue = document.getElementById('newTodoDue');
  const tempTodoStat = document.getElementById('newTodoStat');
  const tempTodoBtn = document.getElementById('submitTodo');

  tempTodoProj.value = proj.title;
  tempTodoTit.value = todo.title;
  tempTodoDes.value = todo.description;
  tempTodoDue.value = todo.dueDate;
  tempTodoStat.value = todo.priority;
  tempTodoBtn.innerHTML = 'Update';
  tempTodoBtn.setAttribute('onclick', `submitTodoEdits(${projId}, ${todoId})`)
}

function submitTodoEdits(projId,todoId) {
  const newTodoTit = document.getElementById('newTodoTit').value;
  const newTodoDes = document.getElementById('newTodoDes').value;
  const newTodoDue = document.getElementById('newTodoDue').value;
  const newTodoStat = document.getElementById('newTodoStat').value;
  const newTodoStatInt = parseInt(newTodoStat)
  
  if (newTodoTit !== '') {
    const editedTodo = {
      title: newTodoTit,
      description: newTodoDes,
      dueDate: newTodoDue,
      priority: newTodoStatInt,
      completed: false
    }

    editTodo(projId, todoId, editedTodo);
  } else {
    alert('Please enter a title');
  }

  renderUpdates();

  document.getElementById('newTodoTit').value = '';
  document.getElementById('newTodoDes').value = '';
  document.getElementById('newTodoDue').value = '';
  document.getElementById('newTodoStat').value = 1;

  const tempTodoBtn = document.getElementById('submitTodo');
  tempTodoBtn.innerText = 'Add'
  tempTodoBtn.setAttribute('onclick', `submitTodo()`)
}

function fillProjForm(proj,projId) {
  const tempProj = document.getElementById('newProjTitle');
  tempProj.value = proj.title;

  const tempProjBtn = document.getElementById('submitProj');
  tempProjBtn.innerHTML = 'Update';
  tempProjBtn.setAttribute('onclick', `submitProjEdits(${projId})`);
}

function submitProjEdits(projId) {
  const newProjTit = document.getElementById('newProjTitle').value;
  
  if (newProjTit !== '') {
    const editedProj = {
      title: newProjTit,
    }
    editProj(projId, editedProj);
  } else {
    alert('Please enter a title');
  }

  renderUpdates();

  document.getElementById('newProjTitle').value = '';

  const tempProjBtn = document.getElementById('submitProj');
  tempProjBtn.innerHTML = 'Add';
  tempProjBtn.setAttribute('onclick', `submitProj()`);
}

renderDB();
renderOptions();

document.addEventListener('click', function(e) {
  if (e.target.id === 'delTodo') {
    const projId = e.target.parentNode.parentNode.parentNode.parentNode.id.slice(5);
    const todoId = e.target.parentNode.id.slice(5);
    rmvTodo(projId,todoId);
    renderUpdates();
  } else if (e.target.id === 'delProj') {
    if (e.target.parentNode.id !== 'proj-0') {
      const projId = e.target.parentNode.id.slice(5);
      rmvProj(projId);
      renderUpdates();
    } else {alert('Cannot delete Default Project')};
  } else if (e.target.id === 'complete') {
    const projId = e.target.parentNode.parentNode.parentNode.parentNode.id.slice(5);
    const todoId = e.target.parentNode.id.slice(5);
    flipStatusTodo(projId, todoId);
    renderUpdates();
  } else if (e.target.id === 'editTodo') {
    const projId = e.target.parentNode.parentNode.parentNode.parentNode.id.slice(5);
    const todoId = e.target.parentNode.id.slice(5);
    const projects = getProjDB();
    const tempTodo = projects[projId].todos[todoId];
    const tempProj = projects[projId];
    fillTodoForm(tempProj, projId, tempTodo, todoId);
  } else if (e.target.id === 'editProj') {
    const projId = e.target.parentNode.id.slice(5);
    const projects = getProjDB();
    const tempProj = projects[projId];
    fillProjForm(tempProj, projId);
  }
});