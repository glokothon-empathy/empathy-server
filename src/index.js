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

app.post('/ideas', (req, res) => {
  const { contents, user_id } = req.body;
  connection.query(`insert into idea (contents, user_id) values("${contents}", ${user_id});`,
    (error, results, fields) => {
      if (error) {
        console.log(error.stack);
      }
      res.json(results);
    }
  );
});

app.delete('/ideas', (req, res) => {

});

app.put('/ideas', (req, res) => {

});

app.get('/ideas', (req, res) => {

});

app.get('/ideas/:id', (req, res) => {

});


app.listen(PORT, (err) => {
  if(err) {
    throw err;
  }
});
