const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// path.join
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// 템플릿 엔진 설정과 템플릿 파일 경로 설정(ex: localhost:3000/about, not: localhost:3000/about.hbs)
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// 절대경로 설정으로 모든 hbs 파일에서 경로 설정 시, public 이하 파일명부터 타이핑
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: '김동규',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: '김동규',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: '도움이 되는 문구입니다.',
    title: 'Help',
    name: '김동규',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide  a address term',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({error});
      }

      forecast(latitude, longitude, (error, data) => {
        if (error) {
          return res.send({error});
        }

        res.send({
          forecast: data,
          location,
          address: req.query.address,
        });
      });
    },
  );
});

app.get('/products', (req, res) => {
  // res.send 2번하면 오류 발생(Cannot set headers after they are sent to the client)
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

// error page view
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: '김동규',
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: '김동규',
    errorMessage: 'Page not found.',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
