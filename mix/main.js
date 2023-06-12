$(function(){
    $("#backgroundInput").change(function(e){
        processFile(e.target.files[0], "background");
    });

    $("#foregroundInput").change(function(e){
        processFile(e.target.files[0], "foreground");
    });

    $("#dropbox").on("dragenter", dragenter);
    $("#dropbox").on("dragleave", dragleave);
    $("#dropbox").on("dragover", dragover);
    $("#dropbox").on("drop", function(e){
        drop(e, "background");
    });

    $("#dropbox2").on("dragenter", dragenter);
    $("#dropbox2").on("dragleave", dragleave);
    $("#dropbox2").on("dragover", dragover);
    $("#dropbox2").on("drop", function(e){
        drop(e, "foreground");
    });
});

let backgroundFile = null;
let foregroundFile = null;

function processFile(file, type) {
    let imageElement = document.createElement("img");
    imageElement.src = URL.createObjectURL(file);

    if (type === "background") {
        backgroundFile = file;
    } else if (type === "foreground") {
        foregroundFile = file;
    }

    if (backgroundFile && foregroundFile) {
        combineImages(backgroundFile, foregroundFile);
    }
}

function combineImages(background, foreground) {
    let backgroundURL = URL.createObjectURL(background);
    let foregroundURL = URL.createObjectURL(foreground);

    $("#imageContainer").css("background-image", `url(${backgroundURL})`);
    $("#imageContainer").append(`<img src="${foregroundURL}">`);
}

function dragenter(){
    $(this).css("border","5px solid blue");
    $(this).text("Drop it!");
}

function dragleave() {
    $(this).css("border", "5px dashed black");
    if($(this).attr("id") === "dropbox") {
        $(this).text("Drop background image here.");
    } else if($(this).attr("id") === "dropbox2") {
        $(this).text("Drop foreground image here.");
    }
}

function dragover(e){
    e.preventDefault();
}

function drop(e, type){
    e.preventDefault();
    let file = e.originalEvent.dataTransfer.files[0];
    if(!file) {
        return false;
    }

    processFile(file, type);
    dragleave.call(this);
}
