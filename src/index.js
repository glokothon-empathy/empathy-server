import express from 'express';
import expressLogger from 'express-logger';
import path from 'path';
import bodyPaser from 'body-parser';
import mysql from 'mysql';
import mysqlConfig from './mysql.config';

import ideasRouter from './router/ideas';
import userRouter from './router/user';

const app = express();
const PORT = 3000;
const connection = mysql.createPool(mysqlConfig);

// 미들웨어
app.use(bodyPaser.json());
app.use(expressLogger({ path: path.resolve(__dirname, '../express.log') }));
app.set('pool', connection);

// Todo: 로그인 한것처럼 가정. 로그인 구현 후 삭제
app.set('user_id', 1);

var allowCORS = function(req, res, next) {
  res.header('Acess-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  (req.method === 'OPTIONS') ?
    res.send(200) :
    next();
};
 
// 이 부분은 app.use(router) 전에 추가하도록 하자
app.use(allowCORS);
 

// 라우터 설정
app.use(express.static(path.resolve(__dirname, '../public')));
app.use('/ideas', ideasRouter);
app.use('/users', userRouter);

app.listen(PORT, (err) => {
  if(err) {
    throw err;
  }
  console.log(`express starts on ${PORT}`);
});
