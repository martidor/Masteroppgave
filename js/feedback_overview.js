$(document).ready(function() {
        
    let course = sessionStorage.getItem("course");
    let space = course.search(" ");
    let courseCode = course.substring(0, space);
    let courseName = course.substring(space + 1);

    let courseCodeHeader = document.querySelector("#js-courseCodeHeader");
    courseCodeHeader.innerHTML = courseCode;
    
    let courseNameHeader = document.querySelector("#js-courseNameHeader");
    courseNameHeader.innerHTML = courseName;


    let addPositiveButton = document.querySelector("#js-addPositiveButton");
    
    addPositiveButton.addEventListener("click", () => {
        sessionStorage.setItem("isPositive", "true");
    })

    let addNegativeButton = document.querySelector("#js-addNegativeButton");

    addNegativeButton.addEventListener("click", () => {
        sessionStorage.setItem("isPositive", "false");
    })
});
