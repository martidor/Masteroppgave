$(document).ready(function() {
        
    //sessionStorage
    let course = sessionStorage.getItem("course");
    let space = course.search(" ");
    let courseCode = course.substring(0, space);
    let courseName = course.substring(space + 1);

    let courseCodeHeader = document.querySelector("#js-courseCodeHeader");
    courseCodeHeader.innerHTML = courseCode;
    
    let courseNameHeader = document.querySelector("#js-courseNameHeader");
    courseNameHeader.innerHTML = courseName;

    //onClick addButtons
    let addPositiveButton = document.querySelector("#js-addPositiveButton");
    
    addPositiveButton.addEventListener("click", () => {
        sessionStorage.setItem("isPositive", "true");
    })

    let addNegativeButton = document.querySelector("#js-addNegativeButton");

    addNegativeButton.addEventListener("click", () => {
        sessionStorage.setItem("isPositive", "false");
    })

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
    
    let feedbackPositive1 = document.querySelector("#js-feedbackPositive1");
    let feedbackPositive2 = document.querySelector("#js-feedbackPositive2");
    let feedbackPositive3 = document.querySelector("#js-feedbackPositive3");
    let feedbackNegative1 = document.querySelector("#js-feedbackNegative1");
    let feedbackNegative2 = document.querySelector("#js-feedbackNegative2");
    let feedbackNegative3 = document.querySelector("#js-feedbackNegative3");

    feedbackPositive1.innerHTML = "1. " + sessionStorage.getItem("docFeedbackPositive1");
    feedbackPositive2.innerHTML = "2. " + sessionStorage.getItem("docFeedbackPositive2");
    feedbackPositive3.innerHTML = "3. " + sessionStorage.getItem("docFeedbackPositive3");
    feedbackNegative1.innerHTML = "1. " + sessionStorage.getItem("docFeedbackNegative1");
    feedbackNegative2.innerHTML = "2. " + sessionStorage.getItem("docFeedbackNegative2");
    feedbackNegative3.innerHTML = "3. " + sessionStorage.getItem("docFeedbackNegative3");


    /*
    db.collection("courses").doc(courseCode).collection("feedback").doc(sessionStorage.getItem("docFeedbackPositive1")).get()
    .then((doc) => {
        
    })
    .catch(function(error) {
        console.log("Error getting document:", error);
    });
    */
});
