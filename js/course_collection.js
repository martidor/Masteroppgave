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
            keys: ["course"]
          };
        //options set by FuzzyComplete
        var options = { display: "course", key: "course", resultsLimit: 10, fuseOptions: fuseOptions };
        
        $("#js-courseInput").fuzzyComplete(courses, options);
        
        
        //sessionStorage
        let startButton = document.querySelector("#js-courseButton");
        startButton.addEventListener("click", () => {
            let input = document.querySelector("#js-courseInput").value;
            sessionStorage.setItem("course", input);
            console.log("course set to: " + input);
        });
    
    }
);
