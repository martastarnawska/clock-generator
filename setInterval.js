let date = new Date();
let time = date.toLocaleTimeString();
let timeArr = time.split(":");

let hour =  date.getHours();
if (hour > 12) {
  hour = hour - 12;
} else if (hour === 0) {
    hour = 12;
}
let hours = hour;
let mins = date.getMinutes();
let secs = date.getSeconds();


function * secondsGeneratorFunc() {
  for (let i = 0; i <= 60; i++){
    if (i === 60) {
      let minute = minGenerator.next().value;
      document.getElementById("clock-min").innerHTML = minute.toString().padStart(2, '0');
      yield *secondsGeneratorFunc();
    }
    yield i;
  }
}
let generator = secondsGeneratorFunc();

function *minutesGeneratoFunc() {
  for (let m = 0; m <= 60; m++) {
    if (m === 60) {
      let hour = hourGenerator.next().value;
      document.getElementById("clock-hour").innerHTML = hour.toString().padStart(2, '0');
      yield *minutesGeneratoFunc();
    }
    yield m;
  }
}
let minGenerator = minutesGeneratoFunc();

function *hoursGeneratorFunc() {
  let h = 1
  while (h <= 13) {
    yield h;
    h++;
    if (h === 13){
      yield *hoursGeneratorFunc();
    }
  }
}
let hourGenerator = hoursGeneratorFunc();

function init() {
  for (let i = 0; i <= secs; i++) {
    generator.next();
  }
  for (let i = 0; i <= mins; i++) {
    minGenerator.next();
  }
  for (let i = 0; i < hours; i++) {
    hourGenerator.next();
  }
  document.getElementById("clock-hour").innerHTML = hours.toString().padStart(2, '0');
  document.getElementById("clock-min").innerHTML = mins.toString().padStart(2, '0');
  document.getElementById("clock-sec").innerHTML = secs.toString().padStart(2, '0');
}
init();

let interval = setInterval(nextSec, 1000);

function nextSec() {
  document.getElementById('clock-sec').innerHTML = generator.next().value.toString().padStart(2, '0');
}
