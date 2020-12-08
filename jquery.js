$(document).ready(function() {

    // Pick a category and secret word
    let categories = [
        ["shelby","lexus","dodge","bugatti", "acura","encore", "silverado"],
        ["milwaukee","waukesha","pewaukee","sussex","oakcreek","franklin"]
    ];
    let randomCategoryArray = categories[Math.floor((Math.random() * categories.length))];
    let randomWord = (randomCategoryArray[Math.floor((Math.random() * randomCategoryArray.length))]).toUpperCase();
    console.log(randomWord);
    let randomWordArray = randomWord.split("");

    // Print category name
    if ($.inArray("shelby", randomCategoryArray) > -1) {
        $(".category").text("Category is vehicles");
    } else {
        $(".category").text("Category is cities");
    }


    // Draw squares for secret word & hide letters
    for(let i = 0; i < randomWord.length; i++) {
        $('#container').append(`<div class="letter ${i}"></div>`);
        $('#container').find(`:nth-child(${i + 1})`).text(randomWordArray[i]);
        $(".letter").css("color", "#4ABDAC");
    }

    // Button click function
    let wrongGuesses = 0;
    $("button").on("click", function(){
        $(this).addClass("used");
        $(this).prop("disabled", "true");
        let matchFound = false;

        // Check if clicked letter is in secret word
        let userGuess = $(this).text();
        for (let i = 0; i < randomWord.length; i++) {
            if (userGuess === randomWord.charAt(i)) {
                $('#container').find(`:nth-child(${i + 1})`).css("color", "#EFEFEF").addClass("winner");
                matchFound = true;
            }
        }

        //Check for winner
        let goodGuesses = [];
        $(".letter").each(function( index ) {
            if ( $(this).hasClass("winner") ) {
                goodGuesses.push(index);
                if (goodGuesses.length === randomWordArray.length) {
                    $("#container").hide();
                    $("button").prop("disabled", "true");
                    $(".category").text("Great job you guessed the secret word!");
                    $(".category").append("<br><button class='play-again'>Play again?</button>");
                }
            }
        });

        // If no match, increase count and add appropriate image
        if (matchFound === false) {
            wrongGuesses += 1;
            // $('.imageNumber').html('<img src="images/' + wrongGuesses + ' "png" />');
            // $(".imageNumber").html('<img src="' + selected + '" data-images=".png" " />');
            $(".imageNumber img").attr("src", "images/step" + wrongGuesses + ".png");
        }

        // 6 wrong Guesses
        if (wrongGuesses === 6) {
            $("#container").hide();
            $("button").prop("disabled", "true");
            $(".category").text(`Sorry you lost! The secret word was ${randomWord}`);
            $(".category").append("<br><button class='play-again'>Play again?</button>");
        }

        // Button to Play again
        $(".play-again").on("click", function(){
            location.reload();
        });

    });

});
