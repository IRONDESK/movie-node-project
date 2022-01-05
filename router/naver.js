const express = require('express');
const router = express.Router();


// // 영화 API //
// router.get('/getNaverMovie', async function (req, res) {
//     let keyword = res.query.query;
//     let reqOptions = {
//         headers: {
//             'X-Naver-Client-Id': 'h0Ptr6nPWVY2Qqa7_mGP',
//             'X-Naver-Client-Secret': 'n9mp9GP0ic'
//         },
//         params: {
//             query: keyword
//         }
//     };
//     try {
//       // 서버로 요청
//         let movieRes = await Axios.get(
//             '/v1/search/movie.json',
//             reqOptions
//         );
//         return res.json(movieRes.data);
//     } catch (e) {
//         return res.json({
//             status: 400,
//             message: e
//         });
//     }
// });

// module.exports = router;

// 네이버 검색 API예제는 블로그를 비롯 전문자료까지 호출방법이 동일하므로 blog검색만 대표로 예제를 올렸습니다.
// 네이버 검색 Open API 예제 - 블로그 검색
var express = require('express');
var app = express();
var client_id = 'h0Ptr6nPWVY2Qqa7_mGP';
var client_secret = 'n9mp9GP0ic';
app.get('/search/blog', function (req, res) {
   var api_url = 'https://openapi.naver.com/v1/search/movie.json?query=' + encodeURI(req.query.query); // json 결과
   var request = require('request');
   var options = {
       url: api_url,
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
   request.get(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
 });
 app.listen(8080, function () {
   console.log('http://127.0.0.1:3000/search/movie?query=검색어 app listening on port 3000!');
 });
