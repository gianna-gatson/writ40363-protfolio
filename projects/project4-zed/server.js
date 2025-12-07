const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;
const COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.use(cors());
app.use(express.json());

// Helper to read comments
function readComments() {
  if (!fs.existsSync(COMMENTS_FILE)) return [];
  const data = fs.readFileSync(COMMENTS_FILE, 'utf8');
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}
// Helper to write comments
function writeComments(comments) {
  fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2));
}

// GET all comments
app.get('/api/comments', (req, res) => {
  res.json(readComments());
});

// POST new comment
app.post('/api/comments', (req, res) => {
  const comments = readComments();
  const newComment = req.body;
  newComment.id = Date.now();
  newComment.likes = 0;
  newComment.dislikes = 0;
  newComment.replies = [];
  comments.push(newComment);
  writeComments(comments);
  res.json(newComment);
});

// PUT update comment (likes/dislikes/replies)
app.put('/api/comments/:id', (req, res) => {
  const comments = readComments();
  const idx = comments.findIndex(c => c.id == req.params.id);
  if (idx === -1) return res.status(404).send('Not found');
  comments[idx] = { ...comments[idx], ...req.body };
  writeComments(comments);
  res.json(comments[idx]);
});

// DELETE comment
app.delete('/api/comments/:id', (req, res) => {
  let comments = readComments();
  comments = comments.filter(c => c.id != req.params.id);
  writeComments(comments);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Comments API running on http://localhost:${PORT}`);
});
