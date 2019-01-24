$(document).ready(
    function() {
        $('.ui.search')
        .search({
            source: content
        });
        console.log("hei");
    }
);

/*
$(document).ready(function() {
    var results = document.querySelector(".results");

});*/

var content = [
    { title: 'Andorraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa a og mere ord her shøøø ja' },
    { title: 'United Arab Emirates' },
    { title: 'Afghanistan' },
    { title: 'Antigua' },
    { title: 'Anguilla' },
    { title: 'Albania' },
    { title: 'Armenia' },
    { title: 'Netherlands Antilles' }
];
