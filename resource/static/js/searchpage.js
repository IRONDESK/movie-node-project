function GetApi(keyword){
    const req = new XMLHttpRequest(); // a new request
    req.open(
        "GET",
        '/naver?query=' + keyword,
        false
        );
    req.send(null);
    const obj = JSON.parse(req.responseText);
    return obj.items;    
};


const container = document.querySelector(".searchpage-container");
const keywordInput = document.getElementById("titleInput");
const searchNameBtn = document.getElementById("serachPageBtn");
const resultView = container.querySelector(".result-view");
const resultAmount = container.querySelector(".result-amount");

searchNameBtn.addEventListener("click", () => {
    getResult();
});
keywordInput.addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
        getResult();
    }
});

function getResult () {
    const searchResultArray = GetApi(keywordInput.value);
    const searchResult = searchResultArray.map( (item, index) => {
        let titleChange = item.title.replace(/(<([^>]+)>)/ig,"");
        function dataCheck( name, target, className="" ) {
            if (target && target !== "0.00") {
                return `
                    <dt>${name}</dt>
                    <dd><span class=${className}>${target}</span></dd>
                `;
            }
            else { return "" }
        };
        return `<li
            class="search-page-item"
            id="result-item-${index}"
            style="animation-delay: ${index * 0.3}s">
                <img src=${item.image}>
                <p>
                    <strong>${titleChange}</strong><br />
                    <i>${item.subtitle}</i>
                </p>
                <dl class="detail-list">
                    ${dataCheck("제작", item.pubDate, "result-pubdate")}
                    ${dataCheck("감독", item.director.slice(0, -1).split("|").join(", "))}
                    ${dataCheck("출연", item.actor.slice(0, -1).split("|").join(", "))}
                    ${dataCheck("네이버 평점", item.userRating, "result-rating")}
                </dl>
        </li>`
    }).join('');
    resultAmount.innerHTML = searchResultArray.length + "개의 검색 결과를 발견했습니다.";
    resultView.innerHTML = searchResult;
};