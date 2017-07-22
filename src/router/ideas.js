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
  connection.query(
    `select * from idea;`,
    (error, results, fields) => {
      if (error) {
        console.log(error.stack);
      }
      res.json(results);
    }
  );
});

ideasRouter.get('/:id', (req, res) => {

});

/******* 아이디어 댓글 *******/
// 아이디어 댓글 추가
ideasRouter.post('/:id/comments', (req, res) => {
  const { contents, user_id, idea_id } = req.body;
  connection.query(
    `INSERT INTO idea_comment (contents, user_id, idea_id) VALUES("${contents}", ${user_id}, ${idea_id});`,
    (err, results, fields) => {
      if (err) {
        rres.status(400).json({});
        console.log(err.stack);
      }
      res.status(200).json(results);
    }
  );
});

// 리스트 - GET /ideas/{id}/comments
// 아이디어 댓글 리스트

// 수정 - PUT /ideas/{id}/comments/{id}
// 아이디어 댓글 수정

// 삭제 - DELETE /ideas/{id}/comments/{id}
// 아이디어 댓글 삭제



export default ideasRouter;
