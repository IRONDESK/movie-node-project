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
}


const searchBtn = document.querySelector(".searchBtn");
const titleInput = document.querySelector("form #title");
const imglinkInput = document.querySelector("form #imagelink");
const imglinkCont = document.querySelector(".imagelink-list ul");

searchBtn.addEventListener("click", () => {
    const findNaver = GetNaverMovieImg(titleInput.value);
    const listOfMovie = findNaver.map( (item) => {
        let titleChange = item.title.replace(/(<([^>]+)>)/ig,"");
        return `<li data-title="${titleChange}" data-imglink="${item.image}">
        <b>${titleChange}</b> (${item.pubDate})<br>
        감독 | ${item.director.split("|")}<br>
        ${item.actor.split("|").slice(0, 3).join(", ")}<br>
        </li>`
    }).join('');
    imglinkCont.innerHTML = listOfMovie;
});

imglinkCont.addEventListener("click", (e) => {
    titleInput.value = e.target.dataset.title;
    imglinkInput.value = e.target.dataset.imglink;
    if (e.target.dataset.title == undefined) {
        alert("error")
    }
})