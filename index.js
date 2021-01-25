const express = require('express')
const app = express()
const port = 8000

// データベースの宣言
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');
// テーブルを作成する
db.serialize(function() {
  console.log("create table");
  db.run("CREATE TABLE lorem ( index2 integer )");
});


app.get('/', (req, res) => {
  let num  = 1 + 2;
  res.send('result:' + num);
});

app.get('/nandemo', (req, res) => {
  let str = "";
  // テーブルのレコードを取得する
  db.serialize(function() {
    db.each("SELECT rowid AS id, index2 FROM lorem", function( err, row ) {
      // 取得したデータ1レコードずつ処理をする
        console.log( row.id + ": " + row.index2 );
        str += row.index2;
        str += "\n";
        console.log( str );
    });
  });
  //let num  = 1 + 2;
  // TODO: 文字列が表示されない。
  res.send('nandemo:' + str);
});


app.get('/nandemo/:val1/:val2', (req, res) => {
  let num  = Number( req.params.val1 ) + Number( req.params.val2 );
  // テーブルにインサートする
  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO lorem VALUES ( ? )");
    console.log(num);
    stmt.run(num);
    stmt.finalize();
    console.log('finalize');
  });
 // db.close();
  res.send('nandemo:' + num);
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


process.on('exit', function() {
  // ここに終了時の処理を書く
  db.close();
  console.log('server end');
});
