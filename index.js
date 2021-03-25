const { json } = require('express')
const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const db = require('./postgres')
const app = express()
const port = 8000

const option = {
  "Content-Type": "application/json",
  'Access-Control-Allow-Origin': '*'
}

app.use(logger("short"));
app.use(helmet())
app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.get('/', (req, res) => {
  res
    .status(200)
    .set(option)
    .json({ 'msg': 'Hello' })
});

app.get('/api/allselect', (req, res) => {
  db.selsectQuery()
    .then((resolve) => {
      res
        .status(200)
        .set(option)
        .json({ 'records': resolve.rows })
    })
    .catch(e => {
      res.status(500).json({ 'error': e });
    })
});

app.get('/api/alldelete', (req, res) => {
  db.deleteQuery()
    .then((resolve) => {
      res
        .status(200)
        .set(option)
        .json({ 'result': 'OK' })

    })
    .catch(e => {
      res.status(500).json({ 'error': e });
    })
});

app.get('/api/:val1', (req, res) => {
  // 文字列を数字と演算子と数字に分解
  const str = req.params.val1
  var array_str = str.split(",");
  // 分解した文字で計算
  var result = 0;
  for (let i = 0; i < array_str.length; ++i) {
    if (array_str[i] == "+") {
      ++i;
      result += Number(array_str[i]);
    }
    else if (array_str[i] == "-") {
      ++i;
      result -= Number(array_str[i]);
    }
    else if (array_str[i] == "*") {
      ++i;
      result *= Number(array_str[i]);
    }
    else if (array_str[i] == "÷") {
      ++i;
      result /= Number(array_str[i]);
    }
    else if (array_str[i] == "=") {
      break;
    }
    else {
      result = Number(array_str[i]);
    }
  }
  //計算式と計算結果をnumに入れる
  let formura = array_str.join("") + result;
  // テーブルにインサートする

  db.insertQury(formura)
    .then((resolve) => {
      res
        .status(200)
        .set(option)
        .json({ 'result': result })
    })
    .catch(e => {
      res.status(500).json({ 'error': e });
    })
  // 返すのは計算結果のみ
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('PORT: %d', server.address().port)
});

