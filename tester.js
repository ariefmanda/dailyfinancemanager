const express = require('express')



let app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('home', {pageTitle: 'Home'})
})

app.listen(3000, ()=>{
  console.log('Express Listening @3000')
})