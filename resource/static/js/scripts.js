function GetNaverMovieImg(keyword){
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


const formContainer = document.querySelector(".form-container");
const searchBtn = formContainer.querySelector(".form-style .search-btn");
const searchPageBtn = formContainer.querySelector(".form-style #serachPageBtn");
const rateBtnCont = formContainer.querySelector(".rate-wrap .rate-btn")
const titleInput = formContainer.querySelector(".form-style #title");
const ratingInput = formContainer.querySelector(".form-style #rating");
const imglinkInput = formContainer.querySelector(".form-style #imagelink");
const imglinkCont = formContainer.querySelector(".imagelink-list ul");
const SelectedImgPlace = formContainer.querySelector(".selected-img-place");

searchBtn.addEventListener("click", () => {
    findNaverMovie();
});
searchPageBtn.addEventListener("click", () => {
    getSearchResult();
});

function findNaverMovie () {
    const searchResultArray = GetNaverMovieImg(titleInput.value);
    const searchResult = searchResultArray.map( (item, index) => {
        let titleChange = item.title.replace(/(<([^>]+)>)/ig,"");
        return `<li>
<input
    type="radio"
    id="item-No${index}"
    name="result-movie"
    data-title="${titleChange}"
    data-imglink="${item.image}"
    hidden
></input>
<label
    for="item-No${index}"
>
                <b>${titleChange}</b> (${item.pubDate})<br>
                ${item.director.slice(0, -1).split("|")[0]}<br>
                ${item.actor.slice(0, -1).split("|").slice(0, 3).join(", ")}
</label>
        </li>`
    }).join('');
    imglinkCont.innerHTML = searchResult;
}

// 영화 검색 페이지 결과
const resultView = formContainer.querySelector(".result-view");
const resultAmount = formContainer.querySelector(".result-amount");
function getSearchResult () {
    const searchResultArray = GetNaverMovieImg(titleInput.value);
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
        return `<li class="search-page-item" id="result-item-${index}">
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
}

// 선택한 별점 버튼 입력
rateBtnCont.addEventListener("click", (e) => {
    if (e.target.dataset.rate !== undefined) {
        ratingInput.value = e.target.dataset.rate;
    }
});

// 선택한 영화의 이미지 보이기
imglinkCont.addEventListener("click", (e) => {
    if (e.target.dataset.title !== undefined) {
        titleInput.value = e.target.dataset.title;
        imglinkInput.value = e.target.dataset.imglink;
        SelectedImgPlace.innerHTML = `<img src="${e.target.dataset.imglink}" class="selected-movie-img">`;
    }
});

// 글 수정시 기입력된 별점 버튼 선택
if (ratingInput.value) {
    const ratedBtn = rateBtnCont.querySelector('#rate'+ratingInput.value);
    ratedBtn.checked = true;
}