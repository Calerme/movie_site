const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Movie = require('./models/movie');
const port = process.env.PORT || 3000;

const app = express();

mongoose.connect('mongodb://localhost:12345/movie');

app.set('views', './views/pages');
app.set('view engine', 'pug');

app.use(bodyParser());
app.use('/public',express.static(path.join(__dirname, './public')));

// index page
app.get('/', (req, res) => {
  Movie.fetch(function (err, movies) {
    if (err) console.log(err);

    res.render('index.pug', {
      title: 'imooc 首页',
      movies,
      // [
      //   { _id: 1, title: '金毛狮王', poster: 'http://pic0.qiyipic.com/image/20171114/74/8a/v_112870422_m_601_m2_180_236.jpg'},
      //   { _id: 1, title: '金毛狮王', poster: 'http://pic0.qiyipic.com/image/20171114/74/8a/v_112870422_m_601_m2_180_236.jpg'},
      //   { _id: 1, title: '金毛狮王', poster: 'http://pic0.qiyipic.com/image/20171114/74/8a/v_112870422_m_601_m2_180_236.jpg'},
      //   { _id: 1, title: '金毛狮王', poster: 'http://pic0.qiyipic.com/image/20171114/74/8a/v_112870422_m_601_m2_180_236.jpg'}
      // ]
    });
  });
});

// detail page
app.get('/movie/:id', (req, res) => {
  const id = req.params.id;

  Movie.findById(id, function (err, movie) {

    res.render('detail.pug', {
      title: 'imooc ' + movie.title,
      movie,
      // {
      //   title: 'Hello World',
      //   doctor: 'John',
      //   year: '2014',
      //   country: 'China',
      //   lang: '英语',
      //   _id: 1,
      //   summary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos odit molestias omnis corporis mollitia id iste exercitationem animi aut blanditiis dolorem laboriosam similique non, unde nostrum porro corrupti velit minima!'
      // }
    });
  });
});

// admin page
app.get('/admin/movie', (req, res) => {
  res.render('admin', {
    title: 'imooc 后台录入'
  });
});

// admin movie new
app.post('/admin/movie/new', (req, res) => {
  const id = req.body.movie._id;
  const movieObj = req.body.movie;
  const _movie;

  if (id !== 'undefined') {
    Movie.findById(id, function (err, movie) {
      if (err) {
        console.log(err);
      }

      _movie =
    });
  }
});

// list page
app.get('/admin/list', (req, res) => {
  res.render('list', {
    title: 'imooc 列表页',
    movies: [
      { _id: 1, title: 'Hello World', doctor: 'John', year: '2014', country: 'China'}
    ]
  });
});

app.listen(port);

console.log(`Server is running on port ${port}`);