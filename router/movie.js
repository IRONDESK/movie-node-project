const express = require('express');
let moviedatabase = require('../database/dataMovie.js');

const router = express.Router();

// 메인
router.get('/', (req, res, next) => {
    moviedatabase.getAll()
    .then(data => res.render('index.html', {data}));
})

// 작성
router.get('/write', (req, res, next) => {
    res.render('write.html');
})

// 글보기
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    moviedatabase.findById(id)
    .then(movie => res.render('postdetails.html', {movie}));
})

// 수정
router.get('/edit/:id', (req, res, next) => {
    const id = req.params.id;
    moviedatabase.findById(id)
    .then(movie => res.render('edit.html', {movie}));
})


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
    .then(movie => res.redirect('/movie'));
})

// 삭제(DELETE) : blog/:id
router.delete('/del/:id', (req, res, next) => {
    const id = req.params.id;

    moviedatabase = moviedatabase.filter(b => b.id != id)
    .then(movie => res.render('index.html', {movie}));
})


module.exports = router;
module.exports.moviedatabase = moviedatabase.getAll();