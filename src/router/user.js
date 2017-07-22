import express from 'express';

const userRouter = express.Router();

/******* 유저 프로필 *******/
// 유저 상세정보 조회
userRouter.get('/profiles', (req, res) => {  
  const userId = req.app.get('user_id');
  const ownerId = req.query.owner;

  req.app.get('pool').query(
    `SELECT name, email, phone_no, profile_image FROM user WHERE user_id = ${ownerId};`,
    (err, results, fields) => {
      if (err) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(err.stack);
      }
      res.json(results);
    }
  );
});

// 유저 활동 이력 조회(유저가 작성한 아이디어)
userRouter.get('/history', (req, res) => {
  const userId = req.app.get('user_id');
    
  req.app.get('pool').query(
    `SELECT idea_id, title, contents, empathy_count, join_count FROM idea WHERE user_id = ${userId};`,
    (err, results, fields) => {
      if(err) {
        res.status(500).json({ msg: 'FAIL' });
        console.log(err.stack);
      }
      res.json(results);
    }
  );
});

export default userRouter;
