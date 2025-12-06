// Use server API for comments
const API_URL = 'http://localhost:3001/api/comments';

async function fetchComments() {
  const res = await fetch(API_URL);
  return await res.json();
}

async function postComment(comment) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  });
  return await res.json();
}

async function updateComment(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}

async function deleteComment(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}

let comments = [];

async function renderComments() {
  comments = await fetchComments();
  const list = document.getElementById('comments-list');
  if (!list) return;
  list.innerHTML = '';
  comments.forEach((comment, idx) => {
    const div = document.createElement('div');
    div.className = 'comment-card';
    div.innerHTML = `
      <strong>${comment.type === 'character' ? 'Character' : 'Episode'}: ${comment.heading}</strong>
      <p>${comment.text}</p>
      <div class="comment-actions">
        <button class="like-btn" data-id="${comment.id}">👍 ${comment.likes || 0}</button>
        <button class="dislike-btn" data-id="${comment.id}">👎 ${comment.dislikes || 0}</button>
        <button class="reply-btn" data-id="${comment.id}">Reply</button>
        <button class="delete-btn" data-id="${comment.id}">Delete</button>
      </div>
      <div class="replies">
        ${(comment.replies||[]).map(r => `<div class="reply"><strong>Reply:</strong> ${r}</div>`).join('')}
      </div>
    `;
    list.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  renderComments();
  const form = document.getElementById('comment-form');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const type = form['comment-type'].value;
      const heading = form['comment-heading'].value.trim();
      const text = form['comment-text'].value.trim();
      if (!heading || !text) return;
      await postComment({ type, heading, text });
      renderComments();
      form.reset();
    });
  }
  document.getElementById('comments-list').addEventListener('click', async function (e) {
    if (e.target.classList.contains('like-btn')) {
      const id = e.target.getAttribute('data-id');
      const comment = comments.find(c => c.id == id);
      await updateComment(id, { ...comment, likes: (comment.likes || 0) + 1 });
      renderComments();
    }
    if (e.target.classList.contains('dislike-btn')) {
      const id = e.target.getAttribute('data-id');
      const comment = comments.find(c => c.id == id);
      await updateComment(id, { ...comment, dislikes: (comment.dislikes || 0) + 1 });
      renderComments();
    }
    if (e.target.classList.contains('reply-btn')) {
      const id = e.target.getAttribute('data-id');
      const comment = comments.find(c => c.id == id);
      const reply = prompt('Enter your reply:');
      if (reply && reply.trim()) {
        const replies = comment.replies || [];
        replies.push(reply.trim());
        await updateComment(id, { ...comment, replies });
        renderComments();
      }
    }
    if (e.target.classList.contains('delete-btn')) {
      const id = e.target.getAttribute('data-id');
      if (confirm('Delete this comment?')) {
        await deleteComment(id);
        renderComments();
      }
    }
  });
});
