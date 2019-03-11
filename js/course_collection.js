$(document).ready(
    function() {
        
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
        
        
        let courses = [];
        db.collection("courses").get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                let course = {course: doc.data().coursecode + " " + doc.data().coursename};
                courses.push(course);
            });
            console.log(courses);
        });

        
        //options set by Fuse.js
        var fuseOptions = { keys: ["course", "course"] }; 
        //options set by FuzzyComplete
        var options = { display: "course", key: "course", fuseOptions: fuseOptions };
        
        $("#js-courseInput").fuzzyComplete(courses, options);
        
        
        let startButton = document.querySelector("#js-courseButton");
        
        startButton.addEventListener("click", () => {
            let input = document.querySelector("#js-courseInput").value;
            sessionStorage.setItem("course", input);
        })


        let feedbackList = [];
        db.collection("courses").doc("TDT4100").collection("feedback").where("isPositive", "==", true).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                console.log(doc.data());
            });
        });

        /*
        var feedback = [
            {"comment": "Forelesningene er gode ooooooooooog konge og bra"},
            {"comment": "Forelesningene er dårlige"},
            {"comment": "Eksemplene er gode"},
            {"comment": "Foilene er bra"}
        ];
        $("#js-courseInput").fuzzyComplete(feedback);
        $(".prompt").fuzzyComplete(feedback);
        */
    }
);
