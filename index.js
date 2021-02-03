const express = require('express')
const app = express()
const port = 8000

// データベースの宣言
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');
// テーブルを作成する
db.serialize(function() {
  console.log("create table");
  db.run("CREATE TABLE Cal_TABLE ( formula text )");
});

app.get('/dentaku', (req, res) => {
  let str = "";
  // テーブルのレコードを取得する
  db.serialize(function() {
    db.each("SELECT rowid AS id, formula FROM Cal_TABLE", function( err, row ) {
      // 取得したデータ1レコードずつ処理をする
        console.log( row.id + ": " + row.formula );
        str += row.formula;
        str += "\n";
        console.log( str );
    });
  });
  //let num  = 1 + 2;
  // TODO: 文字列が表示されない。
  res.send('result:' + str);
});

app.get('/dentaku/:val1', (req, res) => {
 // let num  = Number( req.params.val1 ) + Number( req.params.val2 );
  // 文字列を数字と演算子と数字に分解したい
  str = req.params.val1
  var array_str = str.split(",");
  console.log( array_str );
  // 分解した文字で計算したい
  var result = 0;
  for( let i = 0; i < array_str.length ; ++i )
  {
    if(array_str[i] == "+")
    {
      ++i;
      result += Number(array_str[i]) ;
    }
    else if(array_str[i] == "-")
    {
      ++i;
      result -= Number(array_str[i]) ;
    }
    else if(array_str[i] == "*")
    {
      ++i;
      result *= Number(array_str[i]) ;
    }
    else if(array_str[i] == "÷")
    {
      ++i;
      result /= Number(array_str[i]) ;
    }
    else if(array_str[i] == "=")
    {
      break;
    }
    else
    {
      result = Number(array_str[i]) ;
    }
  }

  //計算式と計算結果をnumに入れたい
  let num = array_str.join("") + result;
  // テーブルにインサートする
  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO Cal_TABLE VALUES ( ? )");
    console.log(num);
    stmt.run(num);
    stmt.finalize();
    console.log('finalize');
  });
 // db.close();
  res.send('result:' + num);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


process.on('exit', function() {
  // ここに終了時の処理を書く
  db.close();
  console.log('server end');
});
