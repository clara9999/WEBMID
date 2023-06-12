$(function(){
    $("#randomButton").on("click", function(){
        loadRandomJoke();
    });

    $("#goButton").on("click", function(){
        var keyword = $("#keywordInput").val();
        loadRelatedJokes(keyword);
    });
});

function loadRandomJoke(){
    $.getJSON("https://api.chucknorris.io/jokes/random")
    .done(function(data) {
        $("#showData").text(data.value);
    })
    .fail(function() {
        $("#showData").text("Error occurred while loading joke.");
    });
}

function loadRelatedJokes(keyword){
    $.getJSON("https://api.chucknorris.io/jokes/search?query=" + keyword)
    .done(function(data) {
        var jokes = data.result;
        $("#jokeList").empty();
        if (jokes.length > 0) {
            jokes.forEach(function(joke) {
                $("#jokeList").append("<li>" + joke.value + "</li>");
            });
        } else {
            $("#jokeList").append("<li>No related jokes found.</li>");
        }
    })
    .fail(function() {
        $("#jokeList").empty().append("<li>Error occurred while loading related jokes.</li>");
    });
}
