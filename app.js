const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');
const https = require('https');
// const ejsLint = require('ejs-lint');
const app = express();

app.use(bodyParser.urlencoded({ extension: 'true' }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

dotenv.config({ path: path.join(__dirname, 'config.env') });
API_KEY = process.env.API;

app.get('/', async(req, res) => {
  var data = '';
  var url = process.env.URL + "everything?q=india&apiKey=" + API_KEY;
  // console.log(url);
  var news = await axios.get(url).then((response) => {
      console.log(response.status);
      data = response.data;
      // console.log(JSON.parse(data));
      // console.log(data.articles[0].description);
      return data;
    }).catch((err) => {
      console.log(err);
    })
    // var count = object.keys(news).length;
    // console.log(news.totalResults);

  console.log(data.articles[0].urlToImage);

  res.render('index', { news: data.articles, size: news.totalResults });

});
app.get('/Top-Headlines', async(req, res) => {
  var data = '';
  var url = process.env.URL + "top-headlines?country=in&apiKey=" + API_KEY;
  // console.log(url);
  var news = await axios.get(url).then((response) => {
    console.log(response.status);
    data = response.data;
    return data;

  }).catch((err) => {
    console.log(err);
  })

  res.render('index', { news: data.articles, title: "Top-Headlines" });


});

app.post('/search', async(req, res) => {
  var url = process.env.URL + "everything?q=" + req.body.query + "&apiKey=" + API_KEY;
  var data = '';
  var news = await axios.get(url).then(response => {
    console.log(response.status);
    data = response.data;
    return data;
  }).catch((err) => {
    console.log(err);
  })

  res.render('index', { news: news.articles, title: req.body.query })
})

app.get('/publish', (req, res) => {
  res.send("Hy their we are currently under process!!");
})






app.listen(3001, () => {
  console.log('listening on 3001');
})