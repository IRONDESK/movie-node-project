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
const searchBtn = document.getElementById("formPageBtn");
const rateBtnCont = formContainer.querySelector(".rate-wrap .rate-btn");
const titleInput = formContainer.querySelector(".form-style #title");
const ratingInput = formContainer.querySelector(".form-style #rating");
const imglinkInput = formContainer.querySelector(".form-style #imagelink");
const imglinkCont = formContainer.querySelector(".imagelink-list ul");
const SelectedImgPlace = formContainer.querySelector(".selected-img-place");

searchBtn.addEventListener("click", () => {
    findNaverMovie();
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
};

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
};