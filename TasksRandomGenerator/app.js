const tasks = {
  day: ['umyj kibel', 'umyj kibel', 'lodowke umyj', 'nasz kibel', 'kibellos'],
  day2: ['1', '2', '3', '4', '5'],
  night: ['x', 'z', 'c', 'b', 'd'],
  night2: ['sadasd', 'dsadas', 'dasdsa umyj', 'dsadas', 'dasda'],
};

let drawnTasks = {
  day: [],
  night: [],
  day2:[],
  night2:[],
};

function drawTask(timeOfDay) {
  // Check if all tasks for the time of day have already been drawn
  if (tasks[timeOfDay].length === 0) {
    alert('All tasks have already been drawn for the ' + timeOfDay + '. Please try again next month.');
    return;
  }

  // Select a random task from the pool
  const index = Math.floor(Math.random() * tasks[timeOfDay].length);

  const task = tasks[timeOfDay][index];

  // Remove the task from the pool so it cannot be drawn again
  tasks[timeOfDay] = tasks[timeOfDay].slice
  
  (0, index).concat(tasks[timeOfDay].slice(index + 1));

  // Add the task to the list of drawn tasks
  drawnTasks[timeOfDay].push(task);

  return task;('You have drawn the task: ' + task);
//   updateTaskList();
// }

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
  dateColumn.classList.add('col-6');
  dateColumn.innerText = `${dateString} ${timeString}`;

  const taskColumn = document.createElement('div');
  taskColumn.classList.add('col-6');
  taskColumn.innerText = task;  // update this line

  // append the elements to the task row
  taskRow.appendChild(dateColumn);
  taskRow.appendChild(taskColumn);

  // append the task row after the button
  button.after(taskRow);
};

