# database_ddl
テーブル作成時のDDLを登録する

前提条件として

- `npm install --global --production windows-build-tools`


## npm の使い方

- https://nodejs.org/dist/v14.15.4/node-v14.15.4-x64.msi

- `npm init` - package管理システム(npm)の初期化 ⇒ package.jsonが作成される。　
- `npm i <package名>` - packageのインストール　
    - ⇒ ここに格納されてるpackageをインストールする [npm](https://www.npmjs.com/)

## Splite3の使い方

- [Splite3のpackage](https://www.npmjs.com/package/sqlite3)


## express
- [express](https://www.npmjs.com/package/express)


## TypeScript
http://www.tohoho-web.com/ex/typescript.html


## index.jsの動かし方
1. detabase_dllまでディレクトリを移動する
2. ターミナルに[node index.js]を入力

## 計算方法
1. ターミナルでindex.jsを動かす
2. localhostをブラウザで開く
3. URLに計算式を入力
  - 例
   - localhost:8000/dentaku/1,+,2,=
   - 四則演算の記号：+,-,*,÷