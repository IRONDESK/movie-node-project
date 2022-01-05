const nunjucks = require('nunjucks');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const movieRouter = require('./router/movie.js');
const dateFilter = require('nunjucks-date-filter');
const path = require('path');

const app = express();
app.set('view engine', 'html');

경로 = path.join(path.join(__dirname + '/resource'), '/static');
console.log(경로);

app.use('/', express.static(경로));
app.use('/movie', express.static(경로));
app.use('/movie/edit', express.static(경로));

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

app.get('/', (req, res, next) => {
    const data = movieRouter.Movies;
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

/////
// var client_id = 'h0Ptr6nPWVY2Qqa7_mGP';
// var client_secret = 'n9mp9GP0ic';
// app.get('/searchnaver', function (req, res) {
//    var api_url = 'https://openapi.naver.com/v1/search/movie.json?query=' + encodeURI(req.query.query); // json 결과
//    var request = require('request');
//    var options = {
//        url: api_url,
//        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
//     };
//    request.get(options, function (error, response, body) {
//      if (!error && response.statusCode == 200) {
//        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
//        res.end(body);
//      } else {
//        res.status(response.statusCode).end();
//        console.log('error = ' + response.statusCode);
//      }
//    });
//  });


app.listen(8080);