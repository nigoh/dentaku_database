const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  let num  = 1 + 2;
  res.send('result:' + num);
});

app.get('/nandemo', (req, res) => {
  let num  = 1 + 2;
  res.send('nandemo:' + num);
});


app.get('/nandemo/:val1/:val2', (req, res) => {
  let num  = req.params.val1 + req.params.val2;
  res.send('nandemo:' + num);
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})