$(document).ready(function() {
        
    //sessionStorage
    let course = sessionStorage.getItem("course");
    let courseHeader = document.querySelector("#js-courseHeader");
    let space = course.search(" ");
    let courseCode = course.substring(0, space);
    courseHeader.innerHTML = course;

    let isPositive = sessionStorage.getItem("isPositive");
    if (isPositive == "true") {
        let header = document.querySelector(".header__grid-container");
        header.classList.add("header--positive");
    } else if (isPositive == "false") {
        let header = document.querySelector(".header__grid-container");
        header.classList.add("header--negative");
    }


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDZnTCsAF3coKF78vRtmaojn6oxY-a4yKI",
        authDomain: "masteroppgave-ntnu.firebaseapp.com",
        databaseURL: "https://masteroppgave-ntnu.firebaseio.com",
        projectId: "masteroppgave-ntnu",
        storageBucket: "masteroppgave-ntnu.appspot.com",
        messagingSenderId: "803033729158"
    };

    firebase.initializeApp(config);
    const db = firebase.firestore();

    // done-button (add theme to database)
    let doneButon = document.querySelector("#js-done-button");
    doneButon.addEventListener("click", (event) => {
        event.preventDefault();
        let radioButtons = document.querySelectorAll("form input[type=radio]");
        let chosenTheme;
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                chosenTheme = radioButtons[i].value;
                console.log("Chosen theme: " + chosenTheme);
            }
        }
        let lastIDset = sessionStorage.getItem("lastIDset");
        db.collection("courses").doc(courseCode).collection("feedback").doc(lastIDset).update({
            theme: chosenTheme
        }).then(function() {
            console.log("Document updated");
            window.location = "./feedback-overview.html";
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
            window.location = "./feedback-overview.html";
        });
    });


});
