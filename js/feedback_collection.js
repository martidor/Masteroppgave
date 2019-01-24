var feedback = [
    {"comment": "Forelesningene er gode ooooooooooog konge og bra"},
    {"comment": "Forelesningene er dårlige"},
    {"comment": "Eksemplene er gode"},
    {"comment": "Foilene er bra"}
];

$(document).ready(
    function() {
        $("#js-feedbackInput").fuzzyComplete(feedback);
        $(".prompt").fuzzyComplete(feedback);
    }
);