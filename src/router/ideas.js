import express from 'express';

const ideasRouter = express.Router();

/******* 아이디어 *******/
// 아이디어 추가
ideasRouter.post('/', (req, res) => {
  const { contents } = req.body;
  const userId = req.app.get('user_id');

  req.app.get('pool').query(
    `INSERT INTO idea (contents, user_id) VALUES("${contents}", ${userId});`,
    (err, results, fields) => {
      if (err) {
        console.log(err.stack);
      }
      res.json(results);
    }
  );
});

// 아이디어 수정
ideasRouter.put('/:idea_id', (req, res) => {
  const { contents } = req.body;
  const ideaId = req.params.idea_id;
  const userId = req.app.get('user_id');

  req.app.get('pool').query(
    `UPDATE idea SET contents = "${contents}" WHERE idea_id = ${ideaId};`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(err.stack);
      }
      res.status(200).json(results);
    }
  );
});

// 아이디어 삭제
ideasRouter.delete('/:idea_id', (req, res) => {
  const ideaId = req.params.idea_id;
  const userId = req.app.get('user_id');

  req.app.get('pool').query(
    `DELETE FROM idea WHERE id = ${ideaId};`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(err.stack);
      }
      res.status(200).json(results);
    }
  );
});

// 아이디어 리스트 조회
ideasRouter.get('/', (req, res) => {
  const userId = req.app.get('user_id');

  req.app.get('pool').query(
    `SELECT id, contents, empathy_count, join_count FROM idea;`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(err.stack);
      }
      res.status(200).json(results);
    }
  );
});

// 아이디어 상세 조회
ideasRouter.get('/:idea_id', (req, res) => {
  const userId = req.app.get('user_id');
  const ideaId = req.params.idea_id;

  req.app.get('pool').query(
    `SELECT (id, contents, empathy_count, join_count) FROM idea WHERE idea_id = ${ideaId};`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(err.stack);
      }
      res.status(200).json(results[0]);
    }
  );
});

/******* 아이디어 댓글 *******/
// 아이디어 댓글 추가
ideasRouter.post('/:idea_id/comments', (req, res) => {
  const userId = req.app.get('user_id');
  const ideaId = req.params.idea_id;
  const { contents } = req.body;

  req.app.get('pool').query(
    `INSERT INTO idea_comment (contents, user_id, idea_id) VALUES("${contents}", ${userId}, ${ideaId});`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
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
  const { contents } = req.body;
  const userId = req.app.get('user_id');

  req.app.get('pool').req.app.get('pool').query(
    `UPDATE idea_comment SET contents = "${contents}" WHERE comment_id = ${commentId};`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
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
  const userId = req.app.get('user_id');

  req.app.get('pool').query(
    `DELETE FROM idea_comment WHERE id = ${commentId} AND idea_id = ${ideaId};`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(err.stack);
      }
      res.status(200).json({ msg: 'OK' });
    }
  );
});

// 아이디어 댓글 리스트
ideasRouter.get('/:idea_id/comments', (req, res) => {
  const ideaId = req.params.idea_id;
  const userId = req.app.get('user_id');
  req.app.get('pool').query(
    `SELECT id, contents, user_id, created_at, updated_at FROM idea_comment WHERE idea_id = ${ideaId};`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(err.stack);
      }
      res.status(200).json(results);
    }
  );
});

/******* 아이디어 공감 *******/
// 아이디어 공감 추가
ideasRouter.post('/:idea_id/empathy', (req, res) => {
  const ideaId = req.params.idea_id;
  const userId = req.app.get('user_id');

  req.app.get('pool').query(
    `INSERT INTO idea_empathy (user_id, idea_id) VALUES(${userId}, ${ideaId});`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(err.stack);
      }

      req.app.get('pool').query(
        `UPDATE idea SET empathy_count = empathy_count + 1 WHERE idea_id = ${ideaId};`,
        (err, results, fields) => {
          if(err){
            res.status(500).json({ msg: 'FAIL' });
            console.log(err.stack);
          }

          res.status(200).json(results);
        }
      );
    }
  );
});

// 아이디어 공감 삭제
ideasRouter.delete('/:idea_id/empathy', (req, res) => {
  const ideaId = req.params.idea_id;
  const userId = req.app.get('user_id');

  req.app.get('pool').query(
    `DELETE FROM idea_empathy WHERE user_id = ${userId} AND idea_id = ${ideaId};`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(err.stack);
      }
      req.app.get('pool').query(
        `UPDATE idea SET empathy_count = empathy_count - 1 WHERE idea_id = ${ideaId};`,
        (err, results, fields) => {
          if(err){
            res.status(500).json({ msg: 'FAIL' });
            console.log(err.stack);
          }

          res.status(200).json(results);
        }
      );
    }
  );
});

/******* 아이디어 참여 *******/
// 아이디어 참여 추가
ideasRouter.post('/:idea_id/join', (req, res) => {
  const ideaId = req.params.idea_id;
  const userId = req.app.get('user_id');
  
  req.app.get('pool').query(
    `INSERT INTO idea_join (user_id, idea_id) VALUES(${userId}, ${ideaId});`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(err.stack);
      }
      req.app.get('pool').query(
        `UPDATE idea SET join_count = join_count + 1 WHERE idea_id = ${ideaId};`,
        (err, results, fields) => {
          if(err){
            res.status(500).json({ msg: 'FAIL' });
            console.log(err.stack);
          }
          res.status(200).json(results);
        }
      );
    }
  );
});

// 아이디어 참여 삭제
ideasRouter.delete('/:idea_id/join', (req, res) => {
  const ideaId = req.params.idea_id;
  const userId = req.app.get('user_id');

  req.app.get('pool').query(
    `DELETE FROM idea_join WHERE user_id = ${userId} AND idea_id = ${ideaId};`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(err.stack);
      }
      req.app.get('pool').query(
        `UPDATE idea SET join_count = join_count - 1 WHERE idea_id = ${ideaId};`,
        (err, results, fields) => {
          if(err){
            res.status(500).json({ msg: 'FAIL' });
            console.log(err.stack);
          }
          res.status(200).json(results);
        }
      );
    }
  );
});

// 아이디어 참여 리스트
ideasRouter.get('/:idea_id/join', (req, res) => {
  const ideaId = req.params.idea_id;
  const userId = req.app.get('user_id');

  req.app.get('pool').query(
    `SELECT user.id, user.name FROM idea_join INNER JOIN user ON user.id = idea_join.user_id WHERE idea_id = ${ideaId};`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(err.stack);
      }
      res.status(200).json(results);
    }
  );
});

export default ideasRouter;
