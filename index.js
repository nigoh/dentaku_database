const { Pool } = require('pg')
const { json } = require('express');
const express = require('express')
const db = require('./postgres')
const app = express()
const port = 8000

const connectionString = process.env.POSTGRES_URI;
const pool = new Pool({ connectionString });

app.get('/', (req, res) => {
  res.json({
    'msg': 'Hello'
  });
});

app.get('/dentaku/allselect', (req, res) => {
  db.selsectQuery(pool)
    .then((resolve) => {
      res.json({
        'records': resolve.rows
      });
    })
    .catch(e => {
      res.send(String(e));
    })
});

app.get('/dentaku/alldelete', (req, res) => {
  db.deleteQuery(pool)
    .then((resolve) => {
      res.json({
        'result': 'OK'
      });
    })
    .catch(e => {
      res.send(String(e));
    })
});

app.get('/dentaku/:val1', (req, res) => {
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

  db.insertQury(pool, formura)
    .then((resolve) => {
      res.json({
        'result': result
      });
    })
    .catch(e => {
      res.send(String(e));
    })
  // 返すのは計算結果のみ
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

process.on('exit', function () {
  // ここに終了時の処理を書く
  db.close();
  console.log('server end');
});
