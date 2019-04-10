let date = new Date();
let hour =  date.getHours();
if (hour > 12) {
  hour = hour - 12;
} else if (hour === 0) {
    hour = 12;
}
let hours = hour;
let mins = date.getMinutes();
let secs = date.getSeconds();

function *generatorFunction(start, stop) {
      for (let i = start; i <= stop; i++) {
        if (i === stop) {
            yield *generatorFunction(start, stop);
        }
        yield i;
    }
  }

  let secondsGenerator = generatorFunction(0, 60);
  let minutesGenerator = generatorFunction(0, 60);
  let hoursGenerator = generatorFunction(1, 13);

  function init() {
    for (let i = 0; i <= secs; i++) {
      secondsGenerator.next();
    }
    for (let i = 0; i <= mins; i++) {
      minutesGenerator.next();
    }
    for (let i = 0; i < hours; i++) {
      hoursGenerator.next();
    }
    document.getElementById("clock-hour").innerHTML = hours.toString().padStart(2, '0');
    document.getElementById("clock-min").innerHTML = mins.toString().padStart(2, '0');
    document.getElementById("clock-sec").innerHTML = secs.toString().padStart(2, '0');
  }
  init();

  let interval = setInterval(nextSec, 1000);

  function nextSec() {
    let second = secondsGenerator.next().value;
    document.getElementById('clock-sec').innerHTML = second.toString().padStart(2, '0');
    if (second === 0) {
      let minute = minutesGenerator.next().value;
      document.getElementById("clock-min").innerHTML = minute.toString().padStart(2, '0');
      if (minute === 0) {
        let hour = hoursGenerator.next().value;
        document.getElementById("clock-hour").innerHTML = hour.toString().padStart(2, '0');
      }
    }
  }
