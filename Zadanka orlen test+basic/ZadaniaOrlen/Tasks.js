
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
// Lista zadań do zrobienia na daną zmiane
// const tasks = {
//   day: ['Proszę umyć regał z soczkami i sprawdzić daty oraz planogram', 'Proszę umyć regał nowości,sprawdzić daty oraz planogram', 'Proszę umyć regał z energetykami i sprawdzić daty oraz planogram', 'Proszę umyć impulsy z gumami/batonami i sprawdzić daty oraz planogram', 'Proszę umyć regał z olejami oraz sprawdzić planogram','Proszę umyć regał z akcesorami samochodowymi oraz sprawdzić planogram','Proszę umyć stojak patriotyczny wdrożyć i sprawdzić planogram','Proszę ułożyc magazyn suchy(mleko,sosy) według zasad FIFO','Proszę umyć regał z czekoladami i sprawdzić daty oraz planogram',],
//   day2: ['Proszę umyć regał z Chipsami i sprawdzić daty oraz planogram', 'Proszę umyć regał z Chemią oraz zabawkami i sprawdzić planogram', 'Proszę umyć impulsy verva i sprawdzić daty oraz planogram', 'Proszę umyć impulsy prince polo i sprawdzić daty oraz planogram', 'Proszę umyć regał z ciastkami i sprawdzić daty oraz planogram','Proszę doprowadzić strefe kuchni/szatni do porządku','Prosze doprowadzić kącik gospodarczy do porządku umyć ściany poukładać chemie na półkach,puste butelki po płynach wyrzucić',],
//   night: ['Proszę umyć chłodnie z piwem(3 górne półki),sprawdzić daty oraz planogram', 'Proszę umyć chłodnie z napojami kolorowymi ,sprawdzić daty oraz planogram', 'Proszę umyć chłodnie z nabiałem i wodą,sprawdzić daty oraz planogram', 'Proszę umyć lodówke z energetykami,proszę sprawdzić planogram oraz daty','Proszę sprawdzić regał z alkoholami ułożyć według planogramów i według zasady fifo', 'Proszę ułożyć piwa w korytarzu(pełne zgrzewki obok pełnych zgrzewek,pomieszane obok siebie)','Proszę umyć regał z napojami kolorowymi przy kasie i sprawdzić daty oraz planogram','Proszę umyć regał przy kasie z wodami i sprawdzić daty oraz planogram','Proszę umyć chłodnie z piwem(3 dolne półki),sprawdzić daty oraz planogram','Proszę umyć zamrażalke z lodami ułożyć według planogramu','Proszę o uprzatnięcie magazynu półki z piwami','Proszę umyć chłodnie z energetykami,sprawdzić daty oraz planogram','Proszę o uprzatnięcie magazynu półki z energetykami','Proszę o uprzatnięcie magazynu półki z wodą i ciastkami','Proszę o uprzatnięcie magazynu półka z napojami kolorowymi','Proszę o uprzatnięcie magazynu półka z produktami z krótką datą ważności','Proszę o uprzatnięcie strefy drzwi wejściowych oraz okien za lodówkami przy kasie'],
//   night2: ['Proszę umyć chłodnie przy kasie z zapiekankami pizzą itp', 'Proszę przejść się po sklepie z kolektorem posprawdzać cenówki,sprawdzić czy plakaty dalej obowiązują gdzie nie ma cenówek je dorobić w odpowiednim kolorze', 'Proszę doprowadzić do porządku strefe zakasową(przetrzeć kurze,zrobić porządek w szafkach z zarówkami itp.)oraz przemyć pleksi(jeśli dalej obowiązują)', 'Proszę gruntownie przemyć toalete pracowniczą','Proszę doprowadzić biuro do porządku,zrobić porządek z papierami itp)'],
// };
const tasks = {
  day: ['umyj kibel', 'umyj kibel', 'lodowke umyj', 'nasz kibel', 'kibellos'],
  day2: ['1', '2', '3', '4', '5'],
  night: ['x', 'z', 'c', 'b', 'd'],
  night2: ['sadasd', 'dsadas', 'dasdsa umyj', 'dsadas', 'dasda'],
};
// 
let drawnTasks = {
  day: [],
  night: [],
  day2:[],
  night2:[],
};

function drawTask(timeOfDay) {
  // Sprawdzam czy zostały jescze jakieś taski jeśli nie wysylam komunikat
  if (tasks[timeOfDay].length === 0) {
    alert('Niestety nie ma już wiecej zadań do zrobienia Wiola wszystko zrobiła już,odpocznij sobie ;)');
    return;
  }

  // Wybieram losowe zadanie z puli zadań
  const index = Math.floor(Math.random() * tasks[timeOfDay].length);

  const task = tasks[timeOfDay][index];

  // Wybrane zadanie usuwam z puli żeby się nie dublowały zadania
  tasks[timeOfDay] = tasks[timeOfDay].slice
  
  (0, index).concat(tasks[timeOfDay].slice(index + 1));
  

  // Add the task to the list of drawn tasks
  drawnTasks[timeOfDay].push(task);

  return task;
  
  //   updateTaskList();
  
// }

// Funkcja po kliknięciu w przycisk losująca
}
const dayButton = document.getElementById('dayButton');
const dayButton2 = document.getElementById('dayButton2');
const nightButton = document.getElementById('nightButton');
const nightButton2 = document.getElementById('nightButton2');

dayButton.addEventListener('click', () => {
  displayTask(dayButton, 'day');
});

dayButton2.addEventListener('click', () => {
  displayTask(dayButton2, 'day2');
});

nightButton.addEventListener('click', () => {
  displayTask(nightButton, 'night');
});

nightButton2.addEventListener('click', () => {
  displayTask(nightButton2, 'night2');
});
const displayTask = (button, timeOfDay) => {
  // get the current date and time
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString();
  const timeString = currentDate.toLocaleTimeString();

  // get a random task from the task table
  const task = drawTask(timeOfDay);

  // create the elements to display the task information
  const taskRow = document.createElement('div');
  taskRow.classList.add('row');

  const dateColumn = document.createElement('div');
  dateColumn.classList.add('col-5');
  dateColumn.innerText = `${dateString} ${timeString}`;

  const taskColumn = document.createElement('div');
  taskColumn.classList.add('col-6');
  taskColumn.innerText = task;
  const checkboxColumn = document.createElement('div');
  checkboxColumn.classList.add('col-1');
  const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
  // CHECKBOX RESETUJE ZADANIE CO MIESIAC
  const resetTask = (timeOfDay, task) => {
  // Add the task back to the tasks table
  tasks[timeOfDay].push(task);

  // Remove the task from the list of temporarily drawn tasks
  const index = drawnTasks[timeOfDay].indexOf(task);
  drawnTasks[timeOfDay] = drawnTasks[timeOfDay].slice(0, index).concat(drawnTasks[timeOfDay].slice(index + 1));
};

checkbox.addEventListener('click', () => {
  setTimeout(() => {
    resetTask(timeOfDay, task);
  }, 15000);  // reset the task after 15 seconds (15000 milliseconds)
});
  checkboxColumn.appendChild(checkbox);

  // append the elements to the task row
  taskRow.appendChild(dateColumn);
  taskRow.appendChild(taskColumn);
  taskRow.appendChild(checkboxColumn);

  // append the task row after the button
  button.after(taskRow);
};