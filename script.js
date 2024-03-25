let stopwatch;
let isRunning = false;
let lapCounter = 1;

function startStopwatch() {
    if (!isRunning) {
        stopwatch = setInterval(updateStopwatch, 10);
        isRunning = true;
        document.getElementById("start").disabled = true;
        document.getElementById("pause").disabled = false;
        document.getElementById("lap").disabled = false;
    }
}

function pauseStopwatch() {
    clearInterval(stopwatch);
    isRunning = false;
    document.getElementById("start").disabled = false;
    document.getElementById("pause").disabled = true;
    document.getElementById("lap").disabled = true;
}

function resetStopwatch() {
    clearInterval(stopwatch);
    isRunning = false;
    lapCounter = 1;
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
    document.getElementById("milliseconds").innerText = "000";
    document.getElementById("start").disabled = false;
    document.getElementById("pause").disabled = true;
    document.getElementById("lap").disabled = true;
    clearLapList();
}

function updateStopwatch() {
    let minutes = parseInt(document.getElementById("minutes").innerText);
    let seconds = parseInt(document.getElementById("seconds").innerText);
    let milliseconds = parseInt(document.getElementById("milliseconds").innerText);

    milliseconds += 10;

    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
    }

    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    document.getElementById("minutes").innerText = padNumber(minutes);
    document.getElementById("seconds").innerText = padNumber(seconds);
    document.getElementById("milliseconds").innerText = padNumber(milliseconds);
}

function padNumber(number) {
    return number < 10 ? "0" + number : number;
}

function recordLap() {
    const lapTime = document.getElementById("minutes").innerText + ":" +
                     document.getElementById("seconds").innerText + ":" +
                     document.getElementById("milliseconds").innerText;

    const lapItem = document.createElement("li");
    lapItem.innerText = "Lap " + lapCounter + ": " + lapTime;
    document.getElementById("lapList").appendChild(lapItem);

    lapCounter++;
}

function clearLapList() {
    const lapList = document.getElementById("lapList");
    while (lapList.firstChild) {
        lapList.removeChild(lapList.firstChild);
    }
}
