// toggler navbar
const navbarToggler = document.getElementById('navbarToggler');
const navbarNav = document.getElementById('navbarNav');

navbarToggler.addEventListener('click', function() {
  if (navbarNav.style.display === 'block') {
    navbarNav.style.display = 'none';
  } else {
    navbarNav.style.display = 'block';
  }
});

var tasks = {
     day: ['Proszę umyć regał z soczkami i sprawdzić daty oraz planogram', 'Proszę umyć regał nowości,sprawdzić daty oraz planogram', 'Proszę umyć regał z energetykami i sprawdzić daty oraz planogram', 'Proszę umyć impulsy z gumami/batonami i sprawdzić daty oraz planogram', 'Proszę umyć regał z olejami oraz sprawdzić planogram','Proszę umyć regał z akcesorami samochodowymi oraz sprawdzić planogram','Proszę umyć stojak patriotyczny wdrożyć i sprawdzić planogram','Proszę ułożyc magazyn suchy(mleko,sosy) według zasad FIFO','Proszę umyć regał z czekoladami i sprawdzić daty oraz planogram',],
     day2: ['Proszę umyć regał z Chipsami i sprawdzić daty oraz planogram', 'Proszę umyć regał z Chemią oraz zabawkami i sprawdzić planogram', 'Proszę umyć impulsy verva i sprawdzić daty oraz planogram', 'Proszę umyć impulsy prince polo i sprawdzić daty oraz planogram', 'Proszę umyć regał z ciastkami i sprawdzić daty oraz planogram','Proszę doprowadzić strefe kuchni/szatni do porządku','Prosze doprowadzić kącik gospodarczy do porządku umyć ściany poukładać chemie na półkach,puste butelki po płynach wyrzucić',],
     night:  ['Proszę umyć chłodnie przy kasie z zapiekankami pizzą itp', 'Proszę przejść się po sklepie z kolektorem posprawdzać cenówki,sprawdzić czy plakaty dalej obowiązują gdzie nie ma cenówek je dorobić w odpowiednim kolorze', 'Proszę doprowadzić do porządku strefe zakasową(przetrzeć kurze,zrobić porządek w szafkach z zarówkami itp.)oraz przemyć pleksi(jeśli dalej obowiązują)', 'Proszę gruntownie przemyć toalete pracowniczą','Proszę doprowadzić biuro do porządku,zrobić porządek z papierami itp)'],
     night2: ['Proszę umyć chłodnie z piwem(3 górne półki),sprawdzić daty oraz planogram', 'Proszę umyć chłodnie z napojami kolorowymi ,sprawdzić daty oraz planogram', 'Proszę umyć chłodnie z nabiałem i wodą,sprawdzić daty oraz planogram', 'Proszę umyć lodówke z energetykami,proszę sprawdzić planogram oraz daty','Proszę sprawdzić regał z alkoholami ułożyć według planogramów i według zasady fifo', 'Proszę ułożyć piwa w korytarzu(pełne zgrzewki obok pełnych zgrzewek,pomieszane obok siebie)','Proszę umyć regał z napojami kolorowymi przy kasie i sprawdzić daty oraz planogram','Proszę umyć regał przy kasie z wodami i sprawdzić daty oraz planogram','Proszę umyć chłodnie z piwem(3 dolne półki),sprawdzić daty oraz planogram','Proszę umyć zamrażalke z lodami ułożyć według planogramu','Proszę umyć chłodnie z energetykami,sprawdzić daty oraz planogram','Proszę o uprzatnięcie strefy drzwi wejściowych oraz okien za lodówkami przy kasie'],
   };
   var drawnTasks = {
    day: [],
    night: [],
    day2: [],
    night2: []
  };
  
  function drawTask(timeOfDay) {
    if (tasks[timeOfDay].length === 0) {
      alert(
        "Niestety nie ma już więcej zadań do zrobienia. Wiola wszystko zrobiła już, odpocznij sobie ;)"
      );
      return;
    }
  
    const drawnTasksForShift = localStorage.getItem(`drawnTasks.${timeOfDay}`);
  
    let availableTasks = tasks[timeOfDay];
  
    if (drawnTasksForShift) {
      availableTasks = availableTasks.filter(
        (task) => !drawnTasksForShift.includes(task)
      );
    }
  
    if (availableTasks.length === 0) {
      alert(
        "Niestety nie ma już więcej zadań do zrobienia. Wiola wszystko zrobiła już, odpocznij sobie ;)"
      );
      return;
    }
  
    const index = Math.floor(Math.random() * availableTasks.length);
    const task = availableTasks[index];
  
    tasks[timeOfDay] = availableTasks.filter((t) => t !== task);
  
    const updatedDrawnTasks = drawnTasksForShift
      ? `${drawnTasksForShift},${task}`
      : task;
    localStorage.setItem(`drawnTasks.${timeOfDay}`, updatedDrawnTasks);
  
    drawnTasks[timeOfDay].push(task);
    return task;
  }
  
  const dayButton = document.getElementById('dayButton');
  const dayButton2 = document.getElementById('dayButton2');
  const nightButton = document.getElementById('nightButton');
  const nightButton2 = document.getElementById('nightButton2');
  const taskListDay = document.getElementById('taskListDay');
  const taskListDay2 = document.getElementById('taskListDay2');
  const taskListNight = document.getElementById('taskListNight');
  const taskListNight2 = document.getElementById('taskListNight2');
  
  dayButton.addEventListener('click', () => {
    if (confirm('Czy na pewno chcesz wylosować zadanie?')) {
      addTask('day');
    }
  });
  
  dayButton2.addEventListener('click', () => {
    if (confirm('Czy na pewno chcesz wylosować zadanie?')) {
      addTask('day2');
    }
  });
  
  nightButton.addEventListener('click', () => {
    if (confirm('Czy na pewno chcesz wylosować zadanie?')) {
      addTask('night');
    }
  });
  
  nightButton2.addEventListener('click', () => {
    if (confirm('Czy na pewno chcesz wylosować zadanie?')) {
      addTask('night2');
    }
  });
  
  function addTask(timeOfDay) {
    const task = drawTask(timeOfDay);
    console.log(task);
  
    const tasksForShift = localStorage.getItem('tasks');
    const tasksData = tasksForShift ? JSON.parse(tasksForShift) : {};
    const date = new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
    const taskData = {
      task: task,
      date: date,
      type: timeOfDay
    };
    if (tasksData.hasOwnProperty(timeOfDay)) {
      tasksData[timeOfDay].push(taskData);
    } else {
      tasksData[timeOfDay] = [taskData];
    }
    localStorage.setItem('tasks', JSON.stringify(tasksData));
  
    removeDrawnTask(timeOfDay, task);
  
    displayTasks();
  }
  
  function removeDrawnTask(timeOfDay, task) {
    const drawnTasksForShift = localStorage.getItem(`drawnTasks.${timeOfDay}`);
    if (drawnTasksForShift) {
      const tasks = drawnTasksForShift.split(',');
      const updatedTasks = tasks.filter(function (drawnTask) {
        return drawnTask !== task;
      });
      localStorage.setItem(`drawnTasks.${timeOfDay}`, updatedTasks.join(','));
      drawnTasks[timeOfDay] = updatedTasks;
    }
  }
  
  function createDeleteButton(timeOfDay, taskData, newDiv) {
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Usuń';
    deleteButton.classList.add('usun-przycisk', 'btn', 'btn-warning', 'btn-rounded', 'btn-sm');
    deleteButton.addEventListener('click', function () {
      removeTask(timeOfDay, taskData.task);
      newDiv.remove();
    });
    newDiv.appendChild(deleteButton);
  }
  
  function displayTasks() {
    taskListDay.innerHTML = "";
    taskListDay2.innerHTML = "";
    taskListNight.innerHTML = "";
    taskListNight2.innerHTML = "";
  
    const tasksForShift = localStorage.getItem('tasks');
    if (!tasksForShift) return;
    var tasksData = JSON.parse(tasksForShift);
  
    for (var timeOfDay in tasksData) {
      if (tasksData.hasOwnProperty(timeOfDay)) {
        var tasks = tasksData[timeOfDay];
        var taskList;
  
        tasks.forEach(function (taskData) {
          var task = taskData.task;
          var date = taskData.date;
          const newDiv = document.createElement('div');
          newDiv.classList.add('zadanie');
          var taskContent = document.createElement('span');
          taskContent.innerHTML = date + ' ' + task + ' ';
          newDiv.appendChild(taskContent);
  
          createDeleteButton(timeOfDay, taskData, newDiv);
  
          if (timeOfDay == 'day') {
            taskListDay.appendChild(newDiv);
          } else if (timeOfDay == 'day2') {
            taskListDay2.appendChild(newDiv);
          } else if (timeOfDay == 'night') {
            taskListNight.appendChild(newDiv);
          } else if (timeOfDay == 'night2') {
            taskListNight2.appendChild(newDiv);
          }
        });
      }
    }
  }
  
  function removeTask(timeOfDay, task) {
    const tasksForShift = localStorage.getItem('tasks');
    if (!tasksForShift) return;
    var tasksData = JSON.parse(tasksForShift);
  
    if (tasksData.hasOwnProperty(timeOfDay)) {
      tasksData[timeOfDay] = tasksData[timeOfDay].filter(function (taskData) {
        return taskData.task !== task;
      });
  
      if (tasksData[timeOfDay].length === 0) {
        delete tasksData[timeOfDay];
      }
  
      localStorage.setItem('tasks', JSON.stringify(tasksData));
    }
  }
  
  window.onload = displayTasks;