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

//非同期処理
function promise1(){
  return new Promise((resolve,reject)=>{  
    //serialize内の処理は同期処理
    db.serialize(function() {
      db.all("SELECT rowid AS id, formula FROM Cal_TABLE", function( err, rows ) {
        if(err) {
          reject(err); 
        } else {
          resolve(rows);  //引数のresolveに’成功’を返す
        }
      });
    });
  })
};

app.get('/dentaku', (req, res) => {
  promise1().then(( str )=>{         // TypeError: promise1.then is not a function
    console.log( str );
    res.send(String("<h1>" + str + "</h1>"));
  });　
});

// 計算
app.get('/dentaku/:val1', (req, res) => {
  // 文字列を数字と演算子と数字に分解
  const str = req.params.val1
  var array_str = str.split(",");
  // 分解した文字で計算
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
  //計算式と計算結果をnumに入れる
  let num = array_str.join("") + result;
  // テーブルにインサートする
  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO Cal_TABLE VALUES ( ? )");
    stmt.run(num);
    stmt.finalize();
  });
 // 返すのは計算結果のみ
  res.send( String(result) );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


process.on('exit', function() {
  // ここに終了時の処理を書く
  db.close();
  console.log('server end');
});
