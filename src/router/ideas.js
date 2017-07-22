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
  const { id } = req.body;
  connection.query(
    `delete from idea where id=${id};`,
    (error, results, fields) => {
      if (error) {
        console.log(error.stack);
      }
      res.json({ msg: 'OK' });
    }
  );
});

ideasRouter.put('/', (req, res) => {
  const { id, contents } = req.body;
  connection.query(
    `update idea set contents="${contents}" where id=${id};`,
    (error, results, fields) => {
      if (error) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(error.stack);
      }
      res.status(200).json(results);
    }
  );
});

ideasRouter.get('/', (req, res) => {
  connection.query(
    `select * from idea;`,
    (error, results, fields) => {
      if (error) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(error.stack);
      }
      res.status(200).json(results);
    }
  );
});

ideasRouter.get('/:id', (req, res) => {
  connection.query(
    `select * from idea where id=${req.params.id};`,
    (error, results, fields) => {
      if (error) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(error.stack);
      }
      res.status(200).json(results[0]);
    }
  );
});

export default ideasRouter;
