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
        
        
        //sessionStorage
        let startButton = document.querySelector("#js-courseButton");
        
        startButton.addEventListener("click", (event) => {
            event.preventDefault();
            let input = document.querySelector("#js-courseInput").value;
            sessionStorage.setItem("course", input);

            //test DENNE FUNKER BARE MED PREVENTDEFAULT()
            console.log("test1");
            db.collection("courses").doc("TDT4100").collection("feedback").add({
                feedbackText: input
            }).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                window.location = "./feedback-overview.html";
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
            console.log("test2");

        })

        
        //test
        let feedbackList = [];
        db.collection("courses").doc("TDT4100").collection("feedback").where("isPositive", "==", true).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                console.log(doc.data());
            });
        });

        /*
        db.collection("courses").add({
            coursecode: "IT2810",
            coursename: "Webutvikling4"
        }).then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        */
        
       
    
    }
);
