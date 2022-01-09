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
app.use(cors());
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.get('/', (req, res, next) => {
    const data = movieRouter.moviedatabase;
    console.log('app.js에서 get');
    res.render('index.html', {data});
});


app.use('/movie', movieRouter);

// app.get('/contact', (req, res, next) => {
//     res.render('contact.html');
// });

app.use((req, res, next) => {
    res.sendStatus(404);
})

app.use((err, req, res, next) => {
    console.log('에러 발생!')
    console.log(err);
    res.sendStatus(500);
})

app.listen(8080);