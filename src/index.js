import express from 'express';
import expressLogger from 'express-logger';
import path from 'path';
import bodyPaser from 'body-parser';

import ideasRouter from './router/ideas';

const app = express();
const PORT = 8001;

app.use(bodyPaser.json());
app.use(expressLogger({ path: path.resolve(__dirname, '../express.log') }));
app.use('/ideas', ideasRouter);

app.listen(PORT, (err) => {
  if(err) {
    throw err;
  }
  console.log(`express starts on ${PORT}`);
});
