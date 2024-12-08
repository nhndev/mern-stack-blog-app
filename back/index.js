const express = require('express');

const app = express();

require('dotenv').config();

const connectMongo = require('./connectMongo');

connectMongo();

app.use(express.json());

const postsRouter = require('./routes/posts.router');

app.use('/api/posts', postsRouter);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});