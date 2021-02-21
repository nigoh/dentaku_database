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