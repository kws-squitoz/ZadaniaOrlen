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
  //  const tasks = {
  //   day: ['umyj kibel', 'umyj kibel', 'lodowke umyj', 'nasz kibel', 'kibellos'],
  //   day2: ['1', '2', '3', '4', '5'],
  //   night: ['x', 'z', 'c', 'b', 'd'],
  //   night2: ['sadasd', 'dsadas', 'dasdsa umyj', 'dsadas', 'dasda'],
  // };
 var drawnTasks = {
   day: [],
   night: [],
   day2:[],
   night2:[],
 };
 
 function drawTask(timeOfDay) {
  if (tasks[timeOfDay].length === 0) {
    alert(
      "Niestety nie ma już więcej zadań do zrobienia. Wiola wszystko zrobiła już, odpocznij sobie ;)"
    );
    return;
  }

  // Get the list of already drawn tasks from localStorage for this shift
  const drawnTasksForShift = localStorage.getItem(`drawnTasks.${timeOfDay}`);

  let availableTasks = tasks[timeOfDay];

  if (drawnTasksForShift) {
    // If there are already drawn tasks for this shift, remove them from the available tasks
    availableTasks = availableTasks.filter(
      (task) => !drawnTasksForShift.includes(task)
    );
  }

  // If there are no available tasks left for this shift, alert the user and return
  if (availableTasks.length === 0) {
    alert(
      "Niestety nie ma już więcej zadań do zrobienia. Wiola wszystko zrobiła już, odpocznij sobie ;)"
    );
    return;
  }

  // Draw a random task from the available tasks
  const index = Math.floor(Math.random() * availableTasks.length);
  const task = availableTasks[index];

  // Remove the drawn task from the available tasks and update the tasks array
  tasks[timeOfDay] = availableTasks.filter((t) => t !== task);

  // Add the drawn task to the list of tasks drawn for this shift in localStorage
  const updatedDrawnTasks = drawnTasksForShift
    ? `${drawnTasksForShift},${task}`
    : task;
  localStorage.setItem(`drawnTasks.${timeOfDay}`, updatedDrawnTasks);

  // Add the drawn task to the drawnTasks object and return it
  drawnTasks[timeOfDay].push(task);
  return task;
}
const dayButton = document.getElementById('dayButton');
const dayButton2 = document.getElementById('dayButton2');
const nightButton = document.getElementById('nightButton');
const nightButton2 = document.getElementById('nightButton2');

dayButton.addEventListener('click', () => {
   if (confirm('Czy na pewno chcesz wylosować zadanie?')) {
      addTask('day');
}});
dayButton2.addEventListener('click', () => {
   if (confirm('Czy na pewno chcesz wylosować zadanie?')) {
      addTask('day2');
}});
nightButton.addEventListener('click', () => {
   if (confirm('Czy na pewno chcesz wylosować zadanie?')) {
      addTask('night');
}});
nightButton2.addEventListener('click', () => {
   if (confirm('Czy na pewno chcesz wylosować zadanie?')) {
  addTask('night2');
}});

// FIREBASE DATABASE REALTIMEEE
var database = firebase.database();

var taskListDay = document.getElementById("taskListDay");

function addTask(timeOfDay) {  
  const task = drawTask(timeOfDay)
   console.log(task)
  const database = firebase.database();

  // Save the data to the Realtime Database
  const tasksRef = database.ref('tasks');
  tasksRef.push({
    task: task,
    date: new Date().toLocaleDateString("en-US", { day: 'numeric', month: 'numeric', year: 'numeric' }),
    type: timeOfDay,
  });
}
// A function to retrieve and display the Tasks from the Firebase database
function displayTasks() {
  // Get a reference to the 'complaints' child node
  var tasksRef = database.ref('tasks');

  // Add an event listener that fires when the value of the 'complaints' child node changes
  tasksRef.on('value', function(snapshot) {

    taskListDay.innerHTML = "";
    taskListDay2.innerHTML = "";
    taskListnight.innerHTML = "";
    taskListnight2.innerHTML = "";

    // Get the complaints from the snapshot
    var tasks = snapshot.val();

    // Iterate over the complaints and add them to the table
    for (var taskKey in tasks) {
      // Get the complaint data
      var taskObject = tasks[taskKey];
      var task = taskObject.task;
      var date = taskObject.date;
      if (taskObject.type == 'day') {
        const newDiv = document.createElement("div");
        newDiv.innerHTML = date + ' ' + task + ' ';
        newDiv.classList.add("zadanie");
        taskListDay.appendChild(newDiv);
      } else if (taskObject.type == 'day2') {
        const newDiv = document.createElement("div");
        newDiv.innerHTML = date + ' ' + task + ' ';
        newDiv.classList.add("zadanie");
        taskListDay2.appendChild(newDiv);
      } else if (taskObject.type == 'night') {
        const newDiv = document.createElement("div");
        newDiv.innerHTML = date + ' ' + task + ' ';
        newDiv.classList.add("zadanie");
        taskListnight.appendChild(newDiv);
      } else if (taskObject.type == 'night2') {
        const newDiv = document.createElement("div");
        newDiv.innerHTML = date + ' ' + task + ' ';
        newDiv.classList.add("zadanie");
        taskListnight2.appendChild(newDiv);
      }}
    });
  }
  console.log(tasks.day.length)
  console.log(tasks.day2.length)
  console.log(tasks.night.length)
  console.log(tasks.night2.length)

  let storedDataDay = localStorage.getItem('drawnTasks.day');
  let dataArrayDay = storedDataDay.split(',');
  let dataLengthDay = dataArrayDay.length;
  console.log(`${dataLengthDay}`);

  let storedDataDay2 = localStorage.getItem('drawnTasks.day2');
  let dataArrayDay2 = storedDataDay2.split(',');
  let dataLengthDay2 = dataArrayDay2.length;
  console.log(`${dataLengthDay2}`);

  let storedDataNight = localStorage.getItem('drawnTasks.night');
  let dataArrayNight = storedDataNight.split(',');
  let dataLengthNight = dataArrayNight.length;
  console.log(`${dataLengthNight}`);

  let storedDataNight2 = localStorage.getItem('drawnTasks.night2');
  let dataArrayNight2 = storedDataNight2.split(',');
  let dataLengthNight2 = dataArrayNight2.length;
  console.log(`${dataLengthNight2}`);

  document.getElementById("tasksLeftDay").innerHTML =" " + (tasks.day.length - dataLengthDay);
  
  document.getElementById("tasksLeftDay2").innerHTML =" " + (tasks.day2.length - dataLengthDay2);

  document.getElementById("tasksLeftNight").innerHTML =" " + (tasks.night.length - dataLengthNight);

  document.getElementById("tasksLeftNight2").innerHTML =" " + (tasks.night2.length - dataLengthNight2);

  window.onload = displayTasks;


 
  
  
  