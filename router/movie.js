const express = require('express');
let Movies = require('../database/dataMovie');

const router = express.Router();


router.get('/', (req, res, next) => {
    const data = Movies;
    res.render('index.html', {data});
})

router.get('/write', (req, res, next) => {
    res.render('write.html');
})
router.get('/edit/:id', (req, res, next) => {
    const id = req.params.id;
    const movie = Movies.find(m => m.id == +id);
    res.render('edit.html', {movie});
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const movie = Movies.find(movie => movie.id == +id);
    res.render('postdetails.html', {movie});
})

router.post('/', (req, res, next) => {
    const id = Movies.length + 1;
    const title = req.body.title;
    const content = req.body.content;
    const rating = req.body.rating;
    const watchDate = req.body.watchDate;
    const pubDate = new Date().toString();
    const MovieData = {
        id, title, content, rating, watchDate, pubDate
    }
    Movies.push(MovieData);
    // res.status(201).json(blog); // 201은 create
    res.redirect("/movie");
})

router.post('/edit/:id', (req, res, next) => {
    const id = req.params.id;
    const data = Movies.find(m => m.id === +id);
    if (data){ // 각각의 값이 비어있을 수도 있음
        data.updateOne(
            id,
            { $set: {
            title : req.body.title,
            content : req.body.content,
            rating : req.body.rating,
            watchDate : req.body.watchDate
            }}
            )
        // res.status(200).json(Movies);
        res.render('index.html', {data});
    } else {
        res.status(404);
    }
})
// router.put('/edit/:id', (req, res, next) => {
//     const id = req.params.id;
//     const data = Movies.find(m => m.id === +id);
//     if (data){ // 각각의 값이 비어있을 수도 있음
//         data.title = req.body.title;
//         data.content = req.body.content;
//         data.rating = req.body.rating;
//         data.watchDate = req.body.watchDate;
//         // res.status(200).json(Movies);
//         res.render('index.html', {data});
//     } else {
//         res.status(404);
//     }
// })

// 삭제(DELETE) : blog/:id
router.delete('/del/:id', (req, res, next) => {
    const id = req.params.id;
    Movies = Movies.filter(b => b.id != id) 
    res.render('index.html', {Movies});
    // res.status(200).json(Movies); //굳이 204를 보내줄거면 200로
})


module.exports = router;
module.exports.Movies = Movies; // 좋은 방법은 아닙니다. DB 할 때 다시 리펙토링 해야합니다.