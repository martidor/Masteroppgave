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

    //get feedback-list from database
    let feedbackList = [];
    db.collection("courses").doc(courseCode).collection("feedback").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            feedbackList.push(doc.data());
        });
        console.log(feedbackList);
    })
    .catch(function(error) {
        console.log("Error getting document:", error);
    });

    //options set by Fuse.js
    var fuseOptions = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 140,
        minMatchCharLength: 1,
        keys: ["feedbackText"]
      };
    //options set by FuzzyComplete
    var options = { display: "feedbackText", key: "feedbackText", resultsLimit: 8, fuseOptions: fuseOptions };
    
    $("#js-feedbackInput").fuzzyComplete(feedbackList, options);


    //next-button (add to database)
    let nextButton = document.querySelector("#js-nextButton");
    nextButton.addEventListener("click", (event) => {
        event.preventDefault();
        let feedbackInput = document.querySelector("#js-feedbackInput").value;
        db.collection("courses").doc(courseCode).collection("feedback").add({
            feedbackText: feedbackInput,
            isPositive: isPositive
        }).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            sessionStorage.setItem("lastIDset", docRef.id);
            if (isPositive == "true") {
                if (sessionStorage.getItem("docFeedbackPositive1") == "") {
                    sessionStorage.setItem("docFeedbackPositive1", feedbackInput);
                } else if (sessionStorage.getItem("docFeedbackPositive2") == "") {
                    sessionStorage.setItem("docFeedbackPositive2", feedbackInput);
                } else if (sessionStorage.getItem("docFeedbackPositive3") == "") {
                    sessionStorage.setItem("docFeedbackPositive3", feedbackInput);
                }
            } else {
                if (sessionStorage.getItem("docFeedbackNegative1") == "") {
                    sessionStorage.setItem("docFeedbackNegative1", feedbackInput);
                } else if (sessionStorage.getItem("docFeedbackNegative2") == "") {
                    sessionStorage.setItem("docFeedbackNegative2", feedbackInput);
                } else if (sessionStorage.getItem("docFeedbackNegative3") == "") {
                    sessionStorage.setItem("docFeedbackNegative3", feedbackInput);
                }
            }
            window.location = "./choose-theme.html";
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
            window.location = "./choose-theme.html";
        });
    });


});
