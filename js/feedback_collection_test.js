$(document).ready(
    function() {
        
        var feedback = [
            {"comment": "Forelesningene er gode ooooooooooog konge og bra"},
            {"comment": "Forelesningene er dårlige"},
            {"comment": "Eksemplene er gode"},
            {"comment": "Foilene er bra"}
        ];

        $("#js-feedbackInput").fuzzyComplete(feedback);
        $(".prompt").fuzzyComplete(feedback);
    }
);
