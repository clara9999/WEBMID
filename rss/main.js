$(function(){
    $("button").on("click", loadRssData);
});

function loadRssData(){
    let rss2json = "https://api.rss2json.com/v1/api.json?rss_url=";
    $.getJSON(rss2json + "http://www.reddit.com/.rss")
    .done(function(data) {
        $("#dataTable").empty(); // 清空內容
        for(let x = 0; x < data.items.length; x++){
            const item = data.items[x];
            const thumbnail = item.thumbnail || "default.jpg"; // 預設圖片

            let row = `<tr>
                <td><a target="_blank" href="${item.link}">${item.title}</a></td>
                <td>${item.pubDate.split(" ")[0]}</td>
                <td><img src="${thumbnail}" alt="Thumbnail"></td>
            </tr>`;
            
            $("#dataTable").append(row);
        }
        console.log("Success");
    })
    .fail(function() {
        console.log("Error");
    })
    .always(function() {
        console.log("Always");
    });
}
