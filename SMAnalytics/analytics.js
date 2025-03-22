const express = require('express');
const app = express();
const PORT = 3000;
module.exports = { app };
const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Ray Taylor' },
  { id: 3, name: 'Amy Jackson' },
  { id: 4, name: 'Kate Murphy' },
  { id: 5, name: 'Liam Rogers' }
];
const posts = [
  { id: 101, userid: 1, content: 'Post about ant' },
  { id: 102, userid: 1, content: 'Post about bee' },
  { id: 103, userid: 2, content: 'Post about cat' },
  { id: 104, userid: 3, content: 'Post about dog' },
  { id: 105, userid: 3, content: 'Post about elephant' },
  { id: 106, userid: 4, content: 'Post about fish' }
];
const comments = [
  { id: 3001, postid: 101, content: 'Old comment' },
  { id: 3002, postid: 101, content: 'New comment' },
  { id: 3003, postid: 102, content: 'Another comment' },
  { id: 3004, postid: 104, content: 'Comment about dog' },
  { id: 3005, postid: 105, content: 'Comment about elephant' }
];
app.get('/test/users', (req, res) => {
  res.json(users);
});
app.get('/test/users/:userid/posts', (req, res) => {
  const { userid } = req.params;
  const userIdNum = parseInt(userid, 10);
  const userPosts = posts.filter((post) => post.userid === userIdNum);
  res.json({ posts: userPosts });
});
app.get('/test/posts/:postid/comments', (req, res) => {
  const { postid } = req.params;
  const postIdNum = parseInt(postid, 10);
  const postComments = comments.filter((c) => c.postid === postIdNum);
  res.json({ comments: postComments });
});
module.exports = { app };
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
