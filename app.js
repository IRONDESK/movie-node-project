const nunjucks = require('nunjucks'); // 넌적스 사용 문법
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const dateFilter = require('nunjucks-date-filter');
const methodOverride = require('method-override'); // PUT, DEL을 사용하기 위한 오버라이드
const path = require('path');

const app = express();
app.set('view engine', 'html');

// 라우터
const movieRouter = require('./router/movie.js');
const naverRouter = require('./router/naver.js');

// 경로
pathSet = path.join(path.join(__dirname + '/resource'), '/static');
app.use('/', express.static(pathSet));
app.use('/movie', express.static(pathSet));
app.use('/movie/edit', express.static(pathSet));
app.use('/movie/del', express.static(pathSet));

let env = nunjucks.configure('resource/template', {
    autoescape: true,
    express: app,
    watch: true
});
env.addFilter('date', dateFilter);

app.use(express.json());
app.use(express.urlencoded( {extended : false } ));

app.use(helmet());
// 네이버 API에서 포스터 가져올 때, CSP 이슈 해결
// 웹 리소스 종류를 특정해서 허용하는 보안정책 Content Security Policy
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
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.get('/', (req, res, next) => {
    console.log('app.js에서 get');
    res.sendStatus(500);
});

// 분기
app.use('/movie', movieRouter);
app.use('/naver', naverRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
})

app.use((err, req, res, next) => {
    console.log('에러 발생!')
    console.log(err);
    res.sendStatus(500);
})

app.listen(8080);