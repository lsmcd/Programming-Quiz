var rootEl = document.getElementById("root");
var quizState = localStorage.getItem("quizState");
quizState = localStorage.getItem(quizState);

// Listener for the View Highscores nav item that takes you to the highscores screen
document.getElementById("viewHighScores").addEventListener("click", function(){
    clearInterval(interval);
    document.getElementById("timer").textContent = ""
    quizState = 7;
    quizStateCheck();
});

if (quizState === null) {
    quizState = 0;
}

quizStateCheck();
// Timer function with the interval var set in order to cancel it anywhere
var interval;
function startTimer(stop) {
    interval = setInterval(function () {
        let time = parseInt(localStorage.getItem("timer"));
        time--;
        localStorage.setItem("timer", time);
        document.getElementById("timer").textContent = "Time remaining: " + time;
        if (time <= 0) {
            quizState = 6;
            quizStateCheck();
            clearInterval(interval);
        }
    }, 1000);
}
// Function run to update the quiz state
function quizStateCheck() {
    localStorage.setItem("quizState", quizState);
    switch (quizState) {
        case 0: 
            mainMenu();
            break;
        case 1: 
            quizState1();
            break;
        case 2: 
            quizState2();
            break;
        case 3: 
            quizState3();
            break;
        case 4: 
            quizState4();
            break;
        case 5: 
            quizState5();
            break;
        case 6: 
            writeHighScoreScreen();
            break;
        case 7: 
            highScoreScreen();
            break;
    }
}
// Gets displayed right at the beginning
function mainMenu() {
    rootEl.innerHTML = "";
    let h1 = document.createElement("h1");
    let p = document.createElement("p");
    let button = document.createElement("button");
    h1.textContent = "Coding Challenge Quiz";
    p.textContent = "Start it now!";
    button.textContent = "Start";
    rootEl.append(h1, p, button);
    // Button listener that initializes the quiz
    button.addEventListener("click", function (){
        quizState = 1;
        quizState1();
    });
}
// quizState1 sets the scores and timers,
// creates a header and buttons and puts them through the displayQuizElements function
function quizState1() {
    rootEl.innerHTML = "";
    localStorage.setItem("score", 0);
    localStorage.setItem("timer", 60);
    startTimer();
    let h2 = document.createElement("h2");
    let correctButton1 = document.createElement("button");
    let button2 = document.createElement("button");
    let button3 = document.createElement("button");
    let button4 = document.createElement("button");
    h2.textContent = "What does DOM stand for in Web Development?";

    correctButton1.textContent = "Document Object Model";
    button2.textContent = "Display Over Monitor";
    button3.textContent = "Document Origin Model";
    button4.textContent = "Display Object on Monitor";
    displayQuizElements(correctButton1, button2, button3, button4, h2);
}
// QuizState functions 2-5 are identical besides text content, 
// they create a header and buttons and put them through the displayQuizElements function
function quizState2() {
    rootEl.innerHTML = "";
    let h2 = document.createElement("h2");
    let correctButton1 = document.createElement("button");
    let button2 = document.createElement("button");
    let button3 = document.createElement("button");
    let button4 = document.createElement("button");
    h2.textContent = "Array variables are defined with?";

    correctButton1.textContent = "Square Brackets";
    button2.textContent = "Curly Brackets";
    button3.textContent = "Parenthesis";
    button4.textContent = "(var).Array()";
    displayQuizElements(correctButton1, button2, button3, button4, h2);
}
function quizState3() {
    rootEl.innerHTML = "";
    let h2 = document.createElement("h2");
    let correctButton1 = document.createElement("button");
    let button2 = document.createElement("button");
    let button3 = document.createElement("button");
    let button4 = document.createElement("button");
    h2.textContent = "Which of the following are not semantic html elements?";

    correctButton1.textContent = "<summary>";
    button2.textContent = "<article>";
    button3.textContent = "<description>";
    button4.textContent = "<header>";
    displayQuizElements(correctButton1, button2, button3, button4, h2);
}
function quizState4() {
    rootEl.innerHTML = "";
    let h2 = document.createElement("h2");
    let correctButton1 = document.createElement("button");
    let button2 = document.createElement("button");
    let button3 = document.createElement("button");
    let button4 = document.createElement("button");
    h2.textContent = "Which one is not a type of flex wrap?";

    correctButton1.textContent = "flex-wrap: wrap-inverse";
    button2.textContent = "flex-wrap: wrap-reverse";
    button3.textContent = "flex-wrap: wrap";
    button4.textContent = "flex-wrap: no wrap";
    displayQuizElements(correctButton1, button2, button3, button4, h2);
}
function quizState5() {
    rootEl.innerHTML = "";
    let h2 = document.createElement("h2");
    let correctButton1 = document.createElement("button");
    let button2 = document.createElement("button");
    let button3 = document.createElement("button");
    let button4 = document.createElement("button");
    h2.textContent = "How do you center flex elements";

    correctButton1.textContent = "justify-content: center";
    button2.textContent = "center-content: true";
    button3.textContent = "center: true";
    button4.textContent = "flex-position: center";
    displayQuizElements(correctButton1, button2, button3, button4, h2);
}
// The screen right before the high score screen that lets you store your highscore
function writeHighScoreScreen() {
    rootEl.innerHTML = "";
    clearInterval(interval);
    document.getElementById("timer").textContent = ""
    let h2 = document.createElement("h2");
    h2.textContent = "All done!";
    let p = document.createElement("p");
    p.textContent = ("Your final score was " + localStorage.getItem("score") + "!");
    let h4 = document.createElement("h4");
    h4.textContent = "Enter Initials";
    let form = document.createElement("form");
    let input = document.createElement("input");
    let submit = document.createElement("input");
    input.setAttribute("type", "text")
    submit.setAttribute("type", "submit")
    rootEl.append(h2, p, h4, form);
    form.append(input, submit);
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let highScores;
        try {
            highScores = JSON.parse(localStorage.getItem("highScores"));
            highScores.push(form.children[0].value + ": " + localStorage.getItem("score"));
        } catch (e) {
            highScores = [form.children[0].value + ": " + localStorage.getItem("score")]; 
        }
        localStorage.setItem("highScores", JSON.stringify(highScores));
        quizState++;
        quizStateCheck();
    });
}
// Displays highscores
function highScoreScreen() {
    rootEl.innerHTML = "";
    let h2 = document.createElement("h2");
    h2.textContent = "High Scores:";
    let ol = document.createElement("ol");
    // Checks to see if there are any highscores and displays them in the loop
    try {
        let highScores;
        try {
            highScores = JSON.parse(localStorage.getItem("highScores"));
        } catch (e) {
            highScores = []; 
        }
        for (let i = 0; i < highScores.length; i++){
            try { 
                if (!Array.isArray(highScores) || highScores === "") break;
            } catch (e) {}
            let li = []
            li[i] = document.createElement("li");
            li[i].textContent = highScores[i];
            ol.append(li[i]);
        }
    } catch (e){h2.textContent = "No High Scores"}
    let button1 = document.createElement("button");
    button1.textContent = "Go Back";
    let button2 = document.createElement("button");
    button2.textContent = "Clear Highscores";
    rootEl.append(h2, ol, button1, button2)
    // Back to main menu button listener
    button1.addEventListener("click", function(){
        quizState = 0;
        quizStateCheck();
    });
    // Reset Highscores button listener
    button2.addEventListener("click", function(){
        localStorage.setItem("highScores", [])
        highScoreScreen();
    });
}
// Function that is run at the end of every quiz page in order to display all the elements
// and add event listeners to all the buttons 
function displayQuizElements(correctButton1, button2, button3, button4, header) {
    var nums = [];
    nums[0] = correctButton1;
    nums[1] = button2;
    nums[2] = button3;
    nums[3] = button4;

    rootEl.append(header)
    // Counts down from 4 in order to avoid repeat looping
    for (var i = 4; i > 0; i--) {
        // Randomizes the order of the answers
        rand = Math.floor(Math.random() * i);
        rootEl.append(nums[rand]);
        // Listener checks if the correct button was pressed and displays it on the next screen
        nums[rand].addEventListener("click", function () {
            quizState++;
            quizStateCheck();
            if (this.textContent === correctButton1.textContent) {
                let hr = document.createElement("hr");
                let h3 = document.createElement("h3");
                h3.textContent = "Correct!";
                rootEl.append(hr, h3);
                var score = parseInt(localStorage.getItem("score"));
                localStorage.setItem("score", score + 1);
            }
            else {
                let hr = document.createElement("hr");
                let h3 = document.createElement("h3");
                h3.textContent = "Wrong.";
                rootEl.append(hr, h3);
                let time = parseInt(localStorage.getItem("timer"));
                time -= 5;
                localStorage.setItem("timer", time);
            }
        });
        // Removes the winning button
        nums.splice([rand], 1);
    }
}