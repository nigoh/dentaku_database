const { json } = require('express')
const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const db = require('./postgres')
const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc');
const app = express()
const port = 3000

const option = {
  "Content-Type": "application/json",
  'Access-Control-Allow-Origin': '*'
}

const awagger_jsdoc_options = {
  swaggerDefinition: {
    info: {
      title: '電卓アプリのAPI',
      version: '1.0.0'
    },
  },
  apis: ['./index.js'],
};


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
app.use('/spec', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(awagger_jsdoc_options)))


/**
 * @swagger
 * /
 *   get:
 *     description:ホーム
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         examples:
 *           result:
 *              msg: 'Hello'
 */
app.get('/', (req, res) => {
  res
    .status(200)
    .set(option)
    .json({ 'msg': 'Hello' })
});

/**
 * @swagger
 * /api/allselect:
 *   get:
 *     description: 今まで登録したレコード全て取得
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         examples:
 *           result:
 *              records: [{"id":6,"formura":"1+2=2"},{"id":7,"formura":"1+2=3"}]
 */
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

/**
 * @swagger
 * /api/alldelete:
 *   get:
 *     description: DBに格納している全てのレコードを削除する
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: nameにJohnを指定した場合、挨拶を返す
 *         examples:
 *           result:
 *              result: 'OK'
 */
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

/**
 * @swagger
 * /api/:val1:
 *   get:
 *     description: 先のように格納すると計算結果を返却する `/api/1,+,2,= `
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: nameにJohnを指定した場合、挨拶を返す
 *         examples:
 *           result:
 *              result: "20"
 */
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

const server = app.listen(process.env.PORT || port, () => {
  console.log('PORT: %d', server.address().port)
});

