var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

// DBを開ける
db.serialize(function() {
  db.run("CREATE TABLE lorem (info TEXT , index2 integer)");

  var stmt = db.prepare("INSERT INTO lorem VALUES ( ? , ? )");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i , i + i );


  }

  // SQL文を確定（コミット）
  stmt.finalize();

  // Selectで取得したデータを全部回す
  db.each("SELECT rowid AS id, info , index2 FROM lorem", function(err, row) {
    // 取得したデータ1レコードずつ処理をする
      console.log(row.id + ": " + row.info + ": " + row.index2);
  });
});

// DBを閉じる（プッシュ）
db.close();