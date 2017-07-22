import express from 'express';

const ideasRouter = express.Router();

ideasRouter.post('/', (req, res) => {
  const { contents, user_id } = req.body;
  req.app.get('pool').query(
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
  req.app.get('pool').query(
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
  req.app.get('pool').query(
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
  req.app.get('pool').query(
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
  req.app.get('pool').query(
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

/******* 아이디어 댓글 *******/
// 아이디어 댓글 추가
ideasRouter.post('/:id/comments', (req, res) => {
  const { contents, user_id, idea_id } = req.body;
  req.app.get('pool').query(
    `INSERT INTO idea_comment (contents, user_id, idea_id) VALUES("${contents}", ${user_id}, ${idea_id});`,
    (err, results, fields) => {
      if (err) {
        res.status(400).json({});
        console.log(err.stack);
      }
      res.status(200).json(results);
    }
  );
});

// 아이디어 댓글 리스트
ideasRouter.get('/:idea_id/comments/', (req, res) => {
  const ideaId = req.params.idea_id;

  req.app.get('pool').query(
    `SELECT (id, contents, user_id, created_at, updated_at FROM idea_comment WHERE idea_id = ${ideaId};`,
    (err, results, fields) => {
      if (err) {
        res.status(400).json({});
        console.log(err.stack);
      }
      res.status(200).json(results);
    }
  );
});

// 아이디어 댓글 수정
ideasRouter.put('/:idea_id/comments/:comment_id', (req, res) => {
  const ideaId = req.params.idea_id;
  const commentId = req.params.comment_id;
  const { contents, user_id } = req.body;

  req.app.get('pool').query(
    `UPDATE idea_comment SET contents = "${contents}" WHERE id = ${commentId};`,
    (err, results, fields) => {
      if (err) {
        res.status(400).json({});
        console.log(err.stack);
      }
      res.status(200).json(results);
    }
  );
});

// 아이디어 댓글 삭제
ideasRouter.delete('/:idea_id/comments/:comment_id', (req, res) => {
  const ideaId = req.params.idea_id;
  const commentId = req.params.comment_id;

  req.app.get('pool').query(
    `DELETE FROM idea_comment WHERE id = ${commentId} AND idea_id = ${ideaId};`,
    (err, results, fields) => {
      if (err) {
        res.status(400).json({});
        console.log(err.stack);
      }
      res.status(200).json(results);
    }
  );
});

export default ideasRouter;
