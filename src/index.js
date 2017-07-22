import express from 'express';
import expressLogger from 'express-logger';
import path from 'path';
import bodyPaser from 'body-parser';
import mysql from 'mysql';
import mysqlConfig from './mysql.config';

const app = express();
const PORT = 8001;

const connection = mysql.createConnection(mysqlConfig);

app.use(bodyPaser.json());
app.use(expressLogger({ path: path.resolve(__dirname, '../express.log') }));

app.get('*', (req, res) => {
  return res.send('hello')
});

app.listen(PORT, (err) => {
  if(err) {
    throw err;
  }
});
