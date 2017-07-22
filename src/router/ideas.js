import express from 'express';
import mysql from 'mysql';
import mysqlConfig from '../mysql.config';

const connection = mysql.createConnection(mysqlConfig);
const ideasRouter = express.Router();

ideasRouter.post('/', (req, res) => {
  const { contents, user_id } = req.body;
  connection.query(
    `insert into idea (contents, user_id) values("${contents}", ${user_id});`,
    (error, results, fields) => {
      if (error) {
        console.log(error.stack);
      }
      res.json(results);
    }
  );
});

ideasRouter.delete('/', (req, res) => {

});

ideasRouter.put('/', (req, res) => {

});

ideasRouter.get('/', (req, res) => {

});

ideasRouter.get('/:id', (req, res) => {

});

export default ideasRouter;
