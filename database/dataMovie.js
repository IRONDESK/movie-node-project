const mongoose = require('mongoose');
const dbConfig = require('../config/dbConfig.json');

// 1. DB 세팅
mongoose.connect(`mongodb+srv://irondesk:${dbConfig.pw}@myproject.yr6gg.mongodb.net/${dbConfig.name}?retryWrites=true&w=majority`);

// 2. 연결 DB 사용
const db = mongoose.connection;

// 3. 연결 실패
db.on('error', function(){
    console.log('연결 실패');
});

// 4. 연결 성공
db.once('open', function() {
    console.log('연결 성공');
});

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: String, required: true },
    imagelink: { type: String, required: true },
    watchDate: { type: Date, default: Date.now },
    pubDate: { type: Date, default: Date.now },
});

// 6. 정의된 스키마를 컴파일(객체처럼 사용하기 위해 model() 함수로 컴파일)
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

