// 迪士尼公主資料
const disneyPrincesses = [
    {
        name: "灰姑娘",
        story: "灰姑娘是一個受虐待的少女，但在一個魔法儀式後，她變成了一個美麗的公主，與她的王子結婚。",
        characteristics: "善良、勇敢、堅持",
    },
    {
        name: "睡美人",
        story: "睡美人是一個被邪惡女巫詛咒的公主，只有真愛的吻才能把她從長睡中喚醒。",
        characteristics: "溫柔、浪漫、脆弱",
    },
    // 添加其他迪士尼公主的資料
    // ...
];

// 笑話 API 的網址
const jokeApiUrl = "http://apistore.baidu.com/apiworks/servicedetail";

// 隨機選擇一個迪士尼公主和笑話
function generateRandomPrincess() {
    // 隨機選擇一個迪士尼公主
    const randomPrincess = disneyPrincesses[Math.floor(Math.random() * disneyPrincesses.length)];

    // 顯示迪士尼公主的資訊
    const princessInfo = document.getElementById("princessInfo");
    princessInfo.innerHTML = `
        <h2>迪士尼公主：${randomPrincess.name}</h2>
        <p>故事：${randomPrincess.story}</p>
        <p>特點：${randomPrincess.characteristics}</p>
    `;

    // 使用笑話 API 獲取一個笑話
    fetch(jokeApiUrl)
        .then(response => response.json())
        .then(data => {
            // 顯示笑話
            const joke = document.getElementById("joke");
            joke.innerHTML = `<p>笑話：${data.joke}</p>`;
        })
        .catch(error => console.log(error));
}
