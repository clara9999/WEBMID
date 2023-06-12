var player;

// This function will be called by YouTube API once it's ready
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'qYUEnLBw4Jk', // default YouTube video ID
        playerVars: {
            autoplay: 1, // 是否自動播放
            controls: 0, // 是否顯示控制項
            start: 0, // 開始秒數
            end: 20, // 結束秒數
            iv_load_policy: 3
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    });
}

// Function to handle state change
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        // Video is playing
    } else if (event.data == YT.PlayerState.PAUSED) {
        // Video is paused
    }
}



$(function(){
    var animeOptions = [
        {
            title: "海賊王",
            author: "尾田榮一郎",
            hometown: "熊本縣",
            videoId: "qYUEnLBw4Jk"
            
        },
        {
            title: "排球少年",
            author: "古館春一",
            hometown: "岩手縣",
            videoId: "qYUEnLBw7Jk"

        },
        {
            title: "入間同學入魔了",
            author: "西修",
            hometown: "愛知縣",
            videoId: "qYUEnL7w4Jk"

        },
        {
            title: "火影忍者",
            author: "岸本齊史",
            hometown: "岡山縣",
            videoId: "qY66nLBw4Jk"

        },
        {
            title: "黑色五葉草",
            author: "田畠裕基",
            hometown: "福岡縣",
            videoId: "qYUE6nLBw4k"

        },
        {
            title: "keroro君曹",
            author: "吉崎觀音",
            hometown: "鹿兒島縣",
            videoId: "qYUn3LBw4Jk"

        },
        {
            title: "新石紀",
            author: "稻垣理一郎",
            hometown: "東京都",
            videoId: "qYUnL5Bw4Jk"

        },
        {
            title: "齊木楠雄的災難",
            author: "麻生周一",
            hometown: "埼玉縣",
            videoId: "qYUEnL6Bw4k"

        },
        {
            title: "名偵探柯南-萬聖節的新娘",
            author: "青山剛昌",
            hometown: "鳥取縣",
            videoId: "qUEnLBw74Jk"

        },
        {
            title: "獵人",
            author: "冨樫義博",
            hometown: "山形縣",
            videoId: "LpQ8vCjfwZI"

        },
        {
            title: "咒術迴戰",
            author: "芥見下下",
            hometown: "岩手縣",
            videoId: "LpQ8vCjfwZ1"

        },
        {
            title: "暗殺教室",
            author: "松井優征",
            hometown: "埼玉縣",
            videoId: "LpQ8vCjfwZI2"

        },
        {
            title: "死神",
            author: "久保帶人",
            hometown: "廣島縣",
            videoId: "LpQ8vCfwZI9"

        },
        {
            title: "犬夜叉",
            author: "高橋留美子",
            hometown: "新瀉縣",
            videoId: "LpQ8vCjfwZ5"

        },
        {
            title:  "一拳超人",
            author: "ONE",
            hometown: "新瀉縣",
            videoId: "qYUEnLB4w4Jk"

        },
    ];

    
    
$("input").on("click", function() {
    var numberOfOptions = animeOptions.length;
    var randomOptionNumber = Math.floor(Math.random() * numberOfOptions);
    var randomOption = animeOptions[randomOptionNumber];

    $("h1").text(randomOption.title);

    // 移除先前可能顯示的作者名字和家鄉位置
    $("p").remove();
    $("iframe").remove();

    // 顯示作者名字和家鄉
    var authorInfo = $("<p></p>").text("作者：" + randomOption.author);
    var authorhome = $("<p></p>").text("出生地：" + randomOption.hometown);

    $("ul").append(authorInfo);
    $("ul").append(authorhome);

    // 顯示動漫對應的圖片
    var imagePath = randomOptionNumber + ".jpg";
    $("img").attr("src", imagePath);

    // 顯示家鄉位置
    var hometown = randomOption.hometown;
    var mapUrl = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDMRNwoktsn_JqRyUPmhZYVwL9Pp3_DqEU&q=" + encodeURIComponent(hometown);
    var mapIframe = $("<iframe></iframe>").attr("src", mapUrl).attr("width", "400").attr("height", "300");
    $("body").append(mapIframe);

    // 播放對應的YouTube音樂
    var videoId = randomOption.videoId;
        player.loadVideoById(videoId, 0, "large");
        player.playVideo();
    });



  

 

    
});



