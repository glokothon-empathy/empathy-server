import express from 'express';

const tipRouter = express.Router();

/******* 팁 *******/
// 팁 추가
tipRouter.post('/', (req, res) => {
  const { title, contents } = req.body;
  const userId = req.app.get('user_id');

  req.app.get('pool').query(
    `INSERT INTO tip (title, contents, user_id) VALUES("${title}", "${contents}", ${userId});`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(err.stack);
      }
      res.status(200).json({ msg: 'OK' });
    }
  );
});

// 팁 수정
tipRouter.put('/:tip_id', (req, res) => {
  const { title, contents } = req.body;
  const tipId = req.params.tip_id;
  const userId = req.app.get('user_id');

  req.app.get('pool').query(
    `UPDATE tip SET title = "${title}", contents = "${contents}" WHERE tip_id = ${tipId};`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(err.stack);
      }
      res.status(200).json({ msg: 'OK' });
    }
  );
});

// 팁 삭제
tipRouter.delete('/:tip_id', (req, res) => {
  const tipId = req.params.tip_id;
  const userId = req.app.get('user_id');

  req.app.get('pool').query(
    `DELETE FROM tip WHERE tip_id = ${tipId};`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(err.stack);
      }
      res.status(200).json({ msg: 'OK' });
    }
  );
});

// 팁 리스트 조회
tipRouter.get('/', (req, res) => {
  const userId = req.app.get('user_id');

  req.app.get('pool').query(
    `SELECT tip.tip_id, tip.title, tip.contents, tip.empathy_count, tip.tip_image, user.name
	   FROM tip 
     INNER JOIN user ON user.user_id = tip.user_id;`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(err.stack);
      }
      res.status(200).json(results);
    }
  );
});

// 팁 상세 조회
tipRouter.get('/:tip_id', (req, res) => {
  const userId = req.app.get('user_id');
  const tipId = req.params.tip_id;
  req.app.get('pool').query(
    `SELECT tip.tip_id, tip.title, tip.contents, tip.empathy_count, tip.tip_image, user.user_id, user.name
	   FROM tip 
     INNER JOIN user ON user.user_id = tip.user_id
     WHERE tip_id = ${tipId};`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(err.stack);
      }
      res.status(200).json(results[0]);
    }
  );
});

/******* 팁 댓글 *******/
// 팁 댓글 추가
tipRouter.post('/:tip_id/comments', (req, res) => {
  const userId = req.app.get('user_id');
  const tipId = req.params.tip_id;
  const { contents } = req.body;

  req.app.get('pool').query(
    `INSERT INTO tip_comment (contents, user_id, tip_id) VALUES("${contents}", ${userId}, ${tipId});`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(err.stack);
      }
      res.status(200).json({ msg: 'OK' });
    }
  );
});

// 팁 댓글 수정
tipRouter.put('/:tip_id/comments/:comment_id', (req, res) => {
  const tipId = req.params.tip_id;
  const commentId = req.params.comment_id;
  const { contents } = req.body;
  const userId = req.app.get('user_id');

  req.app.get('pool').req.app.get('pool').query(
    `UPDATE tip_comment SET contents = "${contents}" WHERE comment_id = ${commentId};`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(err.stack);
      }
      res.status(200).json({ msg: 'OK' });
    }
  );
});

// 팁 댓글 삭제
tipRouter.delete('/:tip_id/comments/:comment_id', (req, res) => {
  const tipId = req.params.tip_id;
  const commentId = req.params.comment_id;
  const userId = req.app.get('user_id');

  req.app.get('pool').query(
    `DELETE FROM tip_comment WHERE id = ${commentId} AND tip_id = ${tipId};`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(err.stack);
      }
      res.status(200).json({ msg: 'OK' });
    }
  );
});

// 팁 댓글 리스트
tipRouter.get('/:tip_id/comments', (req, res) => {
  const tipId = req.params.tip_id;
  const userId = req.app.get('user_id');
  req.app.get('pool').query(
    `SELECT comment_id, contents, user_id, created_at, updated_at FROM tip_comment WHERE tip_id = ${tipId};`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(err.stack);
      }
      res.status(200).json(results);
    }
  );
});

/******* 팁 공감 *******/
// 팁 공감 추가
tipRouter.post('/:tip_id/empathy', (req, res) => {
  const tipId = req.params.tip_id;
  const userId = req.app.get('user_id');

  req.app.get('pool').query(
    `INSERT INTO tip_empathy (user_id, tip_id) VALUES(${userId}, ${tipId});`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(err.stack);
      }

      req.app.get('pool').query(
        `UPDATE tip SET empathy_count = empathy_count + 1 WHERE tip_id = ${tipId};`,
        (err, results, fields) => {
          if(err){
            res.status(500).json({ msg: 'FAIL' });
            console.log(err.stack);
          }
          res.status(200).json({ msg: 'OK' });
        }
      );
    }
  );
});

// 팁 공감 삭제
tipRouter.delete('/:tip_id/empathy', (req, res) => {
  const tipId = req.params.tip_id;
  const userId = req.app.get('user_id');

  req.app.get('pool').query(
    `DELETE FROM tip_empathy WHERE user_id = ${userId} AND tip_id = ${tipId};`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(err.stack);
      }
      req.app.get('pool').query(
        `UPDATE tip SET empathy_count = empathy_count - 1 WHERE tip_id = ${tipId};`,
        (err, results, fields) => {
          if(err){
            res.status(500).json({ msg: 'FAIL' });
            console.log(err.stack);
          }
          res.status(200).json({ msg: 'OK' });
        }
      );
    }
  );
});

export default tipRouter;
