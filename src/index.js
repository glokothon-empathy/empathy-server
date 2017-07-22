import express from 'express';
import expressLogger from 'express-logger';
import path from 'path';
import bodyPaser from 'body-parser';
import mysql from 'mysql';
import mysqlConfig from './mysql.config';

import ideasRouter from './router/ideas';

const app = express();
const PORT = 8001;
const connection = mysql.createPool(mysqlConfig);

// 미들웨어
app.use(bodyPaser.json());
app.use(expressLogger({ path: path.resolve(__dirname, '../express.log') }));
app.set('pool', connection);

// Todo: 로그인 한것처럼 가정. 로그인 구현 후 삭제
app.set('user_id', 1);

// 라우터 설정
app.use(express.static(path.resolve(__dirname, '../public')));
app.use('/ideas', ideasRouter);

app.listen(PORT, (err) => {
  if(err) {
    throw err;
  }
  console.log(`express starts on ${PORT}`);
});
