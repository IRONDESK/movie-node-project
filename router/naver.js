const express = require("express");
const naverConfig = require("../config/naverConfig.json");
const router = express.Router();

router.get("/", function (req, res) {
  const api_url = "https://openapi.naver.com/v1/search/movie?query=" + encodeURI(req.query.query);
  const request = require("request");
  const options = {
    url: api_url,
    headers: {
      "X-Naver-Client-Id": naverConfig.id,
      "X-Naver-Client-Secret": naverConfig.secret,
    },
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8;" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });

});


module.exports = router;
