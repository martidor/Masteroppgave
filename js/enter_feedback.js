$(document).ready(function() {
        
    //sessionStorage
    let course = sessionStorage.getItem("course");
    let courseHeader = document.querySelector("#js-courseHeader");
    let space = course.search(" ");
    let courseCode = course.substring(0, space);
    courseHeader.innerHTML = course;
    console.log(courseCode);

    let isPositive = sessionStorage.getItem("isPositive");
    if (isPositive == "true") {
        let header = document.querySelector(".header__grid-container");
        header.classList.add("header--positive");
    } else if (isPositive == "false") {
        let header = document.querySelector(".header__grid-container");
        header.classList.add("header--negative");
        let headerText = document.querySelector("#js-headerText");
        headerText.innerHTML = "Si en ting du ikke liker med faget";
        let inputFieldHeader = document.querySelector("#js-inputFieldHeader");
        inputFieldHeader.innerHTML = "Hva liker du ikke med faget?";
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
    
    let nextButton = document.querySelector("#js-nextButton");
    nextButton.addEventListener("click", () => {
        let feedbackInput = document.querySelector("#js-feedbackInput").value;
        db.collection("courses").doc(courseCode).collection("feedback").add({
            feedbackText: feedbackInput,
            isPositive: isPositive
        }).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    });


});
