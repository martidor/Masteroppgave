$(document).ready(function() {
        
    let course = sessionStorage.getItem("course");

    let courseHeader = document.querySelector("#js-courseHeader");
    courseHeader.innerHTML = course;

    let isPositive = sessionStorage.getItem("isPositive");
    if (isPositive == "true") {
        let header = document.querySelector(".header__grid-container");
        header.classList.add("header--positive");
    } else if (isPositive == "false") {
        let header = document.querySelector(".header__grid-container");
        header.classList.add("header--negative");
    }
});
