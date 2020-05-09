let currentVerb;
let verbs = null;
let points = 0;
let tookQuestions = 0;
let maxQuestions = 20;
let started = false;
$(document).ready(() => {
    $.ajax({
        url: "/verbs",
        success: function (result) {
            verbs = result
        },
        statusCode: {
            404: (res) => {
                alert(`Something went wrong loading the quiz: ${res.responseText}`)
            }
        }
    });
    let startBtn = document.getElementById("start-btn");
    let form = document.getElementById("quiz-form");

    startBtn.addEventListener("click", () => {
        if (!verbs) return alert("Sorry, the irregular verbs didn't load correctly (yet). Wait a bit before trying again.")
        form.style.display = "block";
        points = 0;
        tookQuestions = 0;
        started = true;

        let q = document.getElementById("maxQuestions");
        let val = parseInt(q.value);
        if (val == parseInt(new Number(q.value)) && val != 0) maxQuestions = val;
        
        newVerb();
    })
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let result = $("#quizAnswer").val();
        if (result.trim().toLowerCase() == verbs[currentVerb].engels) {
            document.getElementById("image-placeholder").src = "/images/checkmark.png";
            points++;
        } else {
            document.getElementById("image-placeholder").src = "/images/wrong_answer.png";
            alert(`The correct answer was ${verbs[currentVerb].engels}`)
        }
        tookQuestions++;
        newVerb();
    })

    let q = document.getElementById("maxQuestions");
    q.addEventListener("change", () => {
        if (started) return;
        let val = parseInt(q.value);
        if (val != parseInt(new Number(q.value))) return;
        if (val == 0) return;
        maxQuestions = val;
    })
})
function newVerb() {
    if (tookQuestions == maxQuestions) {
        document.getElementById("quiz-form").style.display = "none"
        document.getElementById("image-placeholder").removeAttribute("src");
        started = false;
        return alert(`Well done! Click the button to start over. Your score was ${points} out of ${maxQuestions} questions`)
    }
    currentVerb = Math.floor(Math.random() * verbs.length);
    document.getElementById("currentVerb").innerText = `${verbs[currentVerb].nederlands}`
    document.getElementById("quizAnswer").value = ""
    document.getElementById("points").innerText = `${points}/${tookQuestions}`
}