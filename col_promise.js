
// `Promise`インスタンスを作成
const promise = new Promise((resolve, reject) => {
    //処理
    if ( true ) {
      resolve('成功');  //引数のresolveに’成功’を返す
    } else {
      reject(new Error('失敗'));    //引数のreject'失敗'を返す
    }
  });
  
// ここは作成中です
// `then`メソッドで成功時と失敗時に呼ばれるコールバック関数を登録
promise
.then(( res )=>{ console.log( res ) })
.catch( error => { console.log( error ) } );    //エラーハンドリング






/*
function promise1(){
    return new Promise((resolve,reject)=>{
        db.serialize(promise2(str));
    });
}

function promise2(str){
    return new Promise((resolve,reject)=>{
        db.each("SELECT rowid AS id, formula FROM Cal_TABLE",(err,str)=>{
            // 取得したデータ1レコードずつ処理をする
            console.log( row.id + ": " + row.formula );
            str += row.formula;
            str += "\n";
            console.log( str );
        },str);
    });
}

promise1().then(()=>{
    console.log("OK");
    console.log(str);
}).catch(()=>{
    console.log("NG");
});
*/