const express = require('express');
const { response } = require('express');
const app = express();

//  Listen function

app.listen(3000, () => {
  console.log('Heros GO!')
})

// Index Route

app.get('/superheros',(request, response) => {
  response.render('index.ejs')
})

// 