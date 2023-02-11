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
const tasks = {
     day: ['Proszę umyć regał z soczkami i sprawdzić daty oraz planogram', 'Proszę umyć regał nowości,sprawdzić daty oraz planogram', 'Proszę umyć regał z energetykami i sprawdzić daty oraz planogram', 'Proszę umyć impulsy z gumami/batonami i sprawdzić daty oraz planogram', 'Proszę umyć regał z olejami oraz sprawdzić planogram','Proszę umyć regał z akcesorami samochodowymi oraz sprawdzić planogram','Proszę umyć stojak patriotyczny wdrożyć i sprawdzić planogram','Proszę ułożyc magazyn suchy(mleko,sosy) według zasad FIFO','Proszę umyć regał z czekoladami i sprawdzić daty oraz planogram',],
     day2: ['Proszę umyć regał z Chipsami i sprawdzić daty oraz planogram', 'Proszę umyć regał z Chemią oraz zabawkami i sprawdzić planogram', 'Proszę umyć impulsy verva i sprawdzić daty oraz planogram', 'Proszę umyć impulsy prince polo i sprawdzić daty oraz planogram', 'Proszę umyć regał z ciastkami i sprawdzić daty oraz planogram','Proszę doprowadzić strefe kuchni/szatni do porządku','Prosze doprowadzić kącik gospodarczy do porządku umyć ściany poukładać chemie na półkach,puste butelki po płynach wyrzucić',],
     night:  ['Proszę umyć chłodnie przy kasie z zapiekankami pizzą itp', 'Proszę przejść się po sklepie z kolektorem posprawdzać cenówki,sprawdzić czy plakaty dalej obowiązują gdzie nie ma cenówek je dorobić w odpowiednim kolorze', 'Proszę doprowadzić do porządku strefe zakasową(przetrzeć kurze,zrobić porządek w szafkach z zarówkami itp.)oraz przemyć pleksi(jeśli dalej obowiązują)', 'Proszę gruntownie przemyć toalete pracowniczą','Proszę doprowadzić biuro do porządku,zrobić porządek z papierami itp)'],
     night2: ['Proszę umyć chłodnie z piwem(3 górne półki),sprawdzić daty oraz planogram', 'Proszę umyć chłodnie z napojami kolorowymi ,sprawdzić daty oraz planogram', 'Proszę umyć chłodnie z nabiałem i wodą,sprawdzić daty oraz planogram', 'Proszę umyć lodówke z energetykami,proszę sprawdzić planogram oraz daty','Proszę sprawdzić regał z alkoholami ułożyć według planogramów i według zasady fifo', 'Proszę ułożyć piwa w korytarzu(pełne zgrzewki obok pełnych zgrzewek,pomieszane obok siebie)','Proszę umyć regał z napojami kolorowymi przy kasie i sprawdzić daty oraz planogram','Proszę umyć regał przy kasie z wodami i sprawdzić daty oraz planogram','Proszę umyć chłodnie z piwem(3 dolne półki),sprawdzić daty oraz planogram','Proszę umyć zamrażalke z lodami ułożyć według planogramu','Proszę o uprzatnięcie magazynu półki z piwami','Proszę umyć chłodnie z energetykami,sprawdzić daty oraz planogram','Proszę o uprzatnięcie magazynu półki z energetykami','Proszę o uprzatnięcie magazynu półki z wodą i ciastkami','Proszę o uprzatnięcie magazynu półka z napojami kolorowymi','Proszę o uprzatnięcie magazynu półka z produktami z krótką datą ważności','Proszę o uprzatnięcie strefy drzwi wejściowych oraz okien za lodówkami przy kasie'],
   };
 let drawnTasks = {
   day: [],
   night: [],
   day2:[],
   night2:[],
 };
 
 function drawTask(timeOfDay) {
   if (tasks[timeOfDay].length === 0) {
     alert('Niestety nie ma już wiecej zadań do zrobienia Wiola wszystko zrobiła już,odpocznij sobie ;)');
     return;
   }
   const index = Math.floor(Math.random() * tasks[timeOfDay].length);
 
   const task = tasks[timeOfDay][index];
   tasks[timeOfDay] = tasks[timeOfDay].slice
  
   (0, index).concat(tasks[timeOfDay].slice(index + 1));
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
    date: new Date().toLocaleDateString("en-US", { month: 'numeric',
    day:'numeric',
    year: 'numeric' }),
    type: timeOfDay,
    status: 'not completed',
  });
}
// A function to retrieve and display the complaints from the Firebase database
function displayTasks() {
  var tasksRef = database.ref('tasks');

  tasksRef.on('value', function(snapshot) {
    taskListDay.innerHTML = "";
    taskListDay2.innerHTML = "";
    taskListnight.innerHTML = "";
    taskListnight2.innerHTML = "";

    var tasks = snapshot.val();

    for (var taskKey in tasks) {
      var taskObject = tasks[taskKey];
      var task = taskObject.task;
      var date = taskObject.date;
      var status = taskObject.status;
      

      if(taskObject.type =='day' )
      {
        taskListDay.innerHTML += "<div class='container text-center'>";
        taskListDay.innerHTML += "<div class='row'>";
        taskListDay.innerHTML += "<div class='col-2'>" + date + "</div>";
        taskListDay.innerHTML += "<div class='col-8'>" + task + "</div>";
        taskListDay.innerHTML += "<div class='col-2'><input type='checkbox'></div>";
        taskListDay.innerHTML += "</div>";
        taskListDay.innerHTML += "</div>";
        taskListDay.innerHTML += "</div>";
        taskListDay.innerHTML += "<br>";
         }
   else if(taskObject.type =='day2'){
    taskListDay2.innerHTML += "<div class='container text-center'>";
    taskListDay2.innerHTML += "<div class='row'>";
    taskListDay2.innerHTML += "<div class='col-2'>" + date + "</div>";
    taskListDay2.innerHTML += "<div class='col-8'>" + task + "</div>";
    taskListDay2.innerHTML += "<div class='col-2'><input type='checkbox'></div>";
    taskListDay2.innerHTML += "</div>";
    taskListDay2.innerHTML += "</div>";
    taskListDay2.innerHTML += "</div>";;
      }
      else if(taskObject.type =='night'){
        taskListnight.innerHTML += "<div class='container text-center'>";
        taskListnight.innerHTML += "<div class='row'>";
        taskListnight.innerHTML += "<div class='col-2'>" + date + "</div>";
        taskListnight.innerHTML += "<div class='col-8'>" + task + "</div>";
        taskListnight.innerHTML += "<div class='col-2'><input type='checkbox'></div>";
        taskListnight.innerHTML += "</div>";
        taskListnight.innerHTML += "</div>";
        taskListnight.innerHTML += "</div>";
      }else if(taskObject.type =='night2'){
        taskListnight2.innerHTML += "<div class='container text-center'>";
        taskListnight2.innerHTML += "<div class='row'>";
        taskListnight2.innerHTML += "<div class='col-2'>" + date + "</div>";
        taskListnight2.innerHTML += "<div class='col-8'>" + task + "</div>";
        taskListnight2.innerHTML += "<div class='col-2'><input type='checkbox'></div>";
        taskListnight2.innerHTML += "</div>";
        taskListnight2.innerHTML += "</div>";
        taskListnight2.innerHTML += "</div>";
        taskListnight2.innerHTML += "<br>";
      }
    }
  });
}
window.onload = displayTasks; 
