const legalVideoFormats = [
    "mp4", "flv", "avi", "mov", "mkv", "mpeg", "3gp", "wmv", "swf"
];
window.URL = window.URL || window.webkitURL;

$(function(){
    $("#inputFile").change(function(e){
        $("table").empty();
        $("table").append("<tr><th>檢核項目</th><th>需求規格</th><th>檢查結果</th><th>是否通過</th></tr>");
        processFiles(e.target.files);
    });

    $("#dropbox").on("dragenter", dragenter);
    $("#dropbox").on("dragleave", dragleave);
    $("#dropbox").on("dragover", dragover);
    $("#dropbox").on("drop", drop);
});

function processFiles(files) {
    for(let i = 0; i < files.length; i++) {
        let thisVideo = files[i];
        $("table").append($(`<tr><td colspan="4">影片名稱: ${thisVideo.name}</td></tr>`).css("background-color", "yellow"));
        $("table").append($(`<tr><td>影片長度</td><td>需介於60~90秒</td><td id="thisDuration${i}"></td><td id="thisDurationResult${i}"></td></tr>`));
        $("table").append($(`<tr><td>影片格式</td><td>${legalVideoFormats.join('/').toUpperCase()}</td><td id="thisFormat${i}">${thisVideo.type}</td><td id="thisFormatResult${i}"></td></tr>`));

        var thisFileType = thisVideo.type.split("/");
        if(thisFileType[0] == "video") {
            if(legalVideoFormats.indexOf(thisFileType[1]) != -1) {
                $(`#thisFormatResult${i}`).text("O").css("color", "green");
            } else {
                $(`#thisFormatResult${i}`).text("X").css("color", "red");
            }
        } else {
            $(`#thisFormatResult${i}`).text("非影片格式").css("color", "red");
        }

        $("table").append($(`<tr><td>解析度</td><td>720p(1280*720)以上</td><td id="thisResolution${i}"></td><td id="thisResolutionResult${i}"></td></tr>`));

        let videoElement = document.createElement('video');
        videoElement.preload = 'metadata';
        videoElement.onloadedmetadata = function() {
            thisVideo.duration = videoElement.duration;
            thisVideo.videoWidth = videoElement.videoWidth;
            thisVideo.videoHeight = videoElement.videoHeight;
            $(`#thisDuration${i}`).text(thisVideo.duration);
            $(`#thisResolution${i}`).text(thisVideo.videoWidth + "*" + thisVideo.videoHeight);

            if(thisVideo.duration >= 60 && thisVideo.duration < 91) {
                $(`#thisDurationResult${i}`).text("O").css("color", "green");
            } else {
                $(`#thisDurationResult${i}`).text("X").css("color", "red");
            }

            if(thisVideo.videoWidth >= 1280 && thisVideo.videoHeight >= 720) {
                $(`#thisResolutionResult${i}`).text("O").css("color", "green");
            } else {
                $(`#thisResolutionResult${i}`).text("X").css("color", "red");
            }
        }
        videoElement.src = URL.createObjectURL(thisVideo);
    }
}

function dragenter(){
    $("#dropbox").css("border","5px solid blue");
    $("#dropbox").text("Drop it!");
}

function dragleave() {
    $("#dropbox").css("border", "5px dashed black");
    $("#dropbox").text("Choose file by the button below or Drop here.");
}

function dragover(e){
    e.preventDefault();
}

function drop(e){
    e.preventDefault();
    let files = e.originalEvent.dataTransfer.files;
    if(files.length == 0) {
        return false;
    }

    $("table").empty();
    $("table").append("<tr><th>檢查項目</th><th>需求規格</th><th>檢查結果</th><th>是否通過</th></tr>");

    processFiles(files);
    dragleave();
}
