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
 6. 네이버 영화 REST API로 기록에 해당하는 영화 포스터 및 정보 보여주기
 7. 
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
 * 라우트 파일(``router/movie.js``)이 아닌, daabase 파일에 사용할 데이터를 함수화
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
 * HTML 메서드 중 get, post는 ``form`` 태그로 쉽게 구현 가능하지만, put, delete는 태그로 구현할 수 없다.
 ```js
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

 * npm module 중 메서드 오버라이드(method-override)를 사용하여, put, delete를 라우터로 잡아서 사용할 수 있다.
 * 라우터에는 put, delete로 잡고, HTML 마크업 시 ``form`` 태그에 ``method="post"``로 하되 ``action=?_method=put/delete``로 잡는다.

```js
// app.js
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
```
```html
// edit.html
<form class="form-style write-form" action="?_method=PUT" method="post">
```

### 6.2 외부 이미지 차단
 * 네이버 영화 API에는 ``image`` 키에 포스터 이미지의 URL이 값으로 담겨있다.
```json
{
  "items": [
    {
      "title": "<b>해리 포터</b>와 죽음의 성물 - 2부",
      "link": "https://movie.naver.com/movie/bi/mi/basic.nhn?code=47528",
      "image": "https://ssl.pstatic.net/imgmovie/mdi/mit110/0475/47528_P50_144916.jpg",
      "subtitle": "Harry Potter And The Deathly Hallows: Part 2",
      "pubDate": "2011",
      "director": "데이빗 예이츠|",
      "actor": "다니엘 래드클리프|엠마 왓슨|루퍼트 그린트|",
      "userRating": "9.32"
    },
    ]
}
```

 * 해당 API를 JSON 형태로 정상적으로 불러왔으나 이미지는 불러올 수 없었고, 브라우저 콘솔 창에는 다음과 같은 오류 창이 호출되었다.
```
Refused to apply inline style because it violates the following content security policy directive (후략)
```

 * 여기서 '**Content Security Policy**'(CSP)는 외부 공격을 방지하기 위한 일종의 보안 정책이다. HTTP 응답 헤더를 통해서 로드할 수 있는 리소스를 제어한다.
 * 이번에 문제가 된 것은 이미지였기 때문에, CSP의 ``img-src``지시문을 제어해야 한다.
 * npm 모듈 중 ``helmet``은 CSP 헤더를 제어할 수 있게 해준다. 해당 모듈을 설치하고 ``app.js``에서 아래와 같이 설정해주었다.
```
npm install helmet --save
```

```js
// app.js
const helmet = require('helmet');

app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            objectSrc: ["'none'"],
            imgSrc: ["'self'", 'https://ssl.pstatic.net/'],
            upgradeInsecureRequests: [],
        },
        reportOnly: false,
    })
    );
```
 * ``img-src``에 영화 포스터 이미지의 호스트를 추가해, CSP를 제어해주었다.
