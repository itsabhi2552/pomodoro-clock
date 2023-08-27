var speed = 1000;

var startFlag = true;
var session_id = 1;
var sessionTime = 0;
var breakTime = 0;
var flag = false;
var second = 0;
var timer_id;

var firstFlag = true;

function get_timer(a) {
    if (a == "session") {
        return sessionTime;
    } else {
        return breakTime;
    }
}

function set_timer(a, value) {
    if (a == "session") {
        sessionTime = value;
    } else {
        breakTime = value;
    }
}

function setTimer(a, b) {
    var setTimer = get_timer(a);

    if (b == "inc") {
        setTimer++;
        if (setTimer < 10) {
            setTimer = "0" + setTimer;
        }
        document.getElementById("div-" + a + "-timer").innerText = setTimer + " min";
    } else {
        if (setTimer > 0) {
            setTimer--;
            if (setTimer < 10) {
                setTimer = "0" + setTimer;
            }
            document.getElementById("div-" + a + "-timer").innerText = setTimer + " min";
        }
    }

    set_timer(a, setTimer);
}

function changetoStartBtn() {
    var btn = document.getElementById("pause-btn");
    btn.setAttribute("id", "start-btn");
    btn.setAttribute("onclick", "start()");
    btn.innerText = "Start";
}

function changetoPauseBtn() {
    var btn = document.getElementById("start-btn");
    btn.setAttribute("id", "pause-btn");
    btn.setAttribute("onclick", "pause()");
    btn.innerText = "Pause";
}

function calculateTime(total_second) {
    var minute = parseInt(total_second / 60);
    var second = parseInt(total_second % 60);

    if (minute < 10) { minute = "0" + minute; }
    if (second < 10) { second = "0" + second; }

    return minute + ":" + second;
}

function startTimer() {
    var display = document.getElementById("session-timer");
    var session = document.getElementById("session");
    var outline = document.getElementById("session-timer");

    if (startFlag && sessionTime != 0) {
        second = sessionTime * 60;
        second--;
        session.innerHTML = "Session " + (session_id++);
    }

    timer_id = setInterval(function () {
        if (second == 0) {
            if (flag && sessionTime != 0) {
                flag = false;
                second = sessionTime * 60;
                session.innerHTML = "Session " + (session_id++);
                display.style.color = "rgb(30, 203, 217)";
                session.style.color = "rgb(30, 203, 217)";
                outline.style.outline = "8px solid rgb(30, 203, 217)";
            } else if (breakTime != 0) {
                flag = true;
                second = breakTime * 60;
                if(firstFlag) {
                    firstFlag = false;
                    second--;
                }
                session.innerHTML = "Break!";
                display.style.color = "rgb(221, 108, 72)";
                session.style.color = "rgb(221, 108, 72)";
                outline.style.outline = "8px solid rgb(221, 108, 72)";
            } else {
                flag = true;
                second = sessionTime * 60;
                session.innerHTML = "Session " + (session_id++);
            }
        }
        display.innerText = calculateTime(second);
        second--;
    }, speed);
}

function start() {
    if (sessionTime == 0 && breakTime == 0) {
        alert("Set Timer...");
    } else if (startFlag) {
        var display = document.getElementById("session-timer");
        var outline = document.getElementById("session-timer");

        if (sessionTime != 0) {
            display.innerText = calculateTime(sessionTime * 60);
        } else {
            display.innerText = calculateTime(breakTime * 60);
            session.innerHTML = "Break!";
            display.style.color = "rgb(221, 108, 72)";
            session.style.color = "rgb(221, 108, 72)";
            outline.style.outline = "8px solid rgb(221, 108, 72)";
        }
        startTimer();
        changetoPauseBtn();

        var btn = document.getElementsByClassName("btn1");
        var size = btn.length;

        for (var i = 0; i < size; i++) {
            btn[i].disabled = true;
        }
        startFlag = false;
        document.getElementById("reset-btn").disabled = false;
    } else {
        var display = document.getElementById("session-timer");
        var outline = document.getElementById("session-timer");
        if (sessionTime != 0) {
            display.innerText = calculateTime(sessionTime * 60);
        } else {
            display.innerText = calculateTime(breakTime * 60);
            session.innerHTML = "Break!";
            display.style.color = "rgb(221, 108, 72)";
            session.style.color = "rgb(221, 108, 72)";
            outline.style.outline = "8px solid rgb(221, 108, 72)";
        }
        startTimer();
        changetoPauseBtn();
    }
}

function pause() {
    clearInterval(timer_id);
    changetoStartBtn();
}

function reset() {
    var btn = document.getElementsByClassName("btn1");
    var size = btn.length;

    clearInterval(timer_id);

    for (var i = 0; i < size; i++) {
        btn[i].disabled = false;
    }

    startFlag = true;
    sessionTime = 0;
    breakTime = 0;
    session_id = 1;
    flag = false;
    second = 0;

    document.getElementById("div-session-timer").innerText = "00 min";
    document.getElementById("div-break-timer").innerText = "00 min";
    document.getElementById("session").innerText = "Session";
    document.getElementById("session-timer").innerText = "00:00";

    document.getElementById("session-timer").style.color = "rgb(30, 203, 217)";
    document.getElementById("session").style.color = "rgb(30, 203, 217)";
    document.getElementById("session-timer").style.outline = "8px solid rgb(30, 203, 217)";

    changetoStartBtn();
    document.getElementById("reset-btn").disabled = true;
}