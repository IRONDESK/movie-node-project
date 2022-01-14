# movie-node-project

## 개요
### 1.1 목적 및 소개
 * 자신이 감상한 영화를 간단히 기록하는 서비스
 * MongoDB 기반의 CRUD를 지원하는 소셜 서비스

## 요약
### 2.1 내용 및 주요 기능
 1. localhost:8080에서 노드 서버를 실행
 2. 글쓰기 버튼을 클릭하면, 작성 폼이 있는 write 페이지로 랜딩
 3. 각 글의 페이지에서 수정 및 삭제 버튼을 클릭하면, 해당 기능 구현
 4. get, post, put, delete 메소드로 CRUD 구현
 5. 넌적스 문법을 활용한 페이지 구현
 6. 네이버 영화 REST API로 기록에 해당하는 영화 포스터 및 정보 보여주기 (진행중)

## 제작 내용
### 3.1 제작 기간 및 역할
#### 3.1.1 제작 기간
1. 백엔드 개발 : 7일+ 소요
2. 프론트엔드 개발 : 30분 소요

#### 3.1.2 제작 인원
 * 개인 작업

## 3.2 주요 코드

### 3.2.1 put, delete 메소드
 * HTML에서는 get, post method를 대응하지만, put, delete에 직접 대응하지 않는다.
 * 이에 method override 모듈을 활용하여 put, delete 메소드를 우회하여 활용할 수 있게 했다.

 > 📂**app.js**
```js
const methodOverride = require('method-override');
```

 > 📂**resource/template/write.html**
```html
<form class="form-style write-form" action="?_method=PUT" method="post">
    <label for="title">영화명</label>
    <input type="text" id="title" name="title" value="{{movie.title}}"><br>
<!---           후략           --->
```

### 3.2.2 database/dataMovie.js
 * 라우트 파일(``router/movie.js``)이 아닌, database 파일에 사용할 데이터를 함수화
 * 기능 구분과 유지 및 보수에 유리

```js
const Movie = mongoose.model('dataMovie', movieSchema);

async function findByTitle(title) {
    return Movie.find({ title });
}

async function findByRating(rating) {
    console.log('데이터 찾기 rating');
    return Movie.find({ rating });
}

async function findById(id) {
    console.log('데이터 찾기 id');
    return Movie.findById(id);
}

async function createMovie(movie) {
    console.log('데이터 생성')
    return new Movie(movie).save().then((movie) => movie._id);
}

async function updateMovie(updateId, updateBody) {
    return Movie.findByIdAndUpdate(updateId, updateBody);
}

async function delMovie(updateId) {
    return Movie.findByIdAndDelete(updateId);
}

async function getAll() {
    console.log('데이터 모두 출력');
    return Movie.find({});
}

module.exports = {findByTitle, findByRating, findById, createMovie, getAll, updateMovie, delMovie, }
```

### 3.2.3 router/movie.js
 * ``dataMovie.js``에서 정의한 함수를 활용해 데이터 CUD 작업
 * put(수정)은 응답값 전체를 받아서(``req.body``), 변경되지 않은 값이 유실되지도 않도록 작업


```js
// POST - 작성
router.post('/', (req, res, next) => {
    // const id = moviedatabase.length + 1;
    const title = req.body.title;
    const content = req.body.content;
    const rating = req.body.rating;
    const watchDate = req.body.watchDate;
    let newMovieData = {
        title, content, rating, watchDate
    }
    const item = moviedatabase.createMovie(newMovieData);
    res.redirect("/movie");
})

// PUT - 수정
router.put('/edit/:id', (req, res, next) => {
    const id = req.params.id;
    const newBody = req.body;
    console.log("수정 시작", newBody);
    moviedatabase.updateMovie(id, newBody)
    .then( () => res.redirect('/movie'));
})

// DELETE - 삭제
router.delete('/del/:id', (req, res, next) => {
    const id = req.params.id;
    console.log("삭제 시작");
    moviedatabase.delMovie(id)
    .then( () => res.redirect('/movie'));
})
```

## 4. 활용 스택

- HTML/CSS
- JavaScript
- Node.js
- MongoDB
- Nunjucks

## 5. 디렉토리 트리
```js
📦movie-node-project
 ┣ 📂config
 ┃ ┣ 📜dbConfig.json
 ┃ ┗ 📜naverConfig.json
 ┣ 📂database
 ┃ ┗ 📜dataMovie.js
 ┣ 📂node_modules
 ┣ 📂resource
 ┃ ┣ 📂static
 ┃ ┃ ┣ 📂assets
 ┃ ┃ ┃ ┗ 📜favicon.ico
 ┃ ┃ ┣ 📂css
 ┃ ┃ ┃ ┣ 📜reset.css
 ┃ ┃ ┃ ┗ 📜styles.css
 ┃ ┃ ┗ 📂js
 ┃ ┃ ┃ ┗ 📜scripts.js
 ┃ ┗ 📂template
 ┃ ┃ ┣ 📜base.html
 ┃ ┃ ┣ 📜del.html
 ┃ ┃ ┣ 📜edit.html
 ┃ ┃ ┣ 📜index.html
 ┃ ┃ ┣ 📜movie.html
 ┃ ┃ ┣ 📜post.html
 ┃ ┃ ┣ 📜postdetails.html
 ┃ ┃ ┗ 📜write.html
 ┣ 📂router
 ┃ ┣ 📜movie.js
 ┃ ┗ 📜naver.js
 ┣ 📜.gitignore
 ┣ 📜app.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜README.md
```

## 6. 어려웠던 점
### 6.1 UD 구현
 * 우선 UD를 구현하는 것 자체부터 쉽지 않았다.
 * 
