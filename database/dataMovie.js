const mongoose = require('mongoose');
const dbConfig = require('../config/dbConfig.json');

// 1. DB세팅, url뒤에 project 주소로 자동 생성됨
// mongodb://[id:pw]localhost:27017/[project]의 형태
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



// DB 연결할 때 수정해야 하는 코드
// let Movies = [{
//     id : 1,
//     title : '아바타',
//     content : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, harum?',
//     rating : 4,
//     watchDate : new Date().toString(),
//     pubDate : new Date().toString(),
//     },{
//     id : 2,
//     title : '다크나이트',
//     content : 'Lorem ipsum the consectetur, adipisicing elit. dolor sit ame Nesciunt',
//     rating : 5,
//     watchDate : new Date().toString(),
//     pubDate : new Date().toString(),
//     },{
//     id : 3,
//     title : '내부자들',
//     content : 'Navive sum adipisicing queen conseel deit. dolor sit ame Nesciunt',
//     rating : 3,
//     watchDate : new Date().toString(),
//     pubDate : new Date().toString(),
//     },
// ]

// module.exports = Movies;