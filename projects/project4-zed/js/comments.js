// Simple comment system with like/dislike and reply
let comments = JSON.parse(localStorage.getItem('officeComments') || '[]');

function saveComments() {
  localStorage.setItem('officeComments', JSON.stringify(comments));
}

function renderComments() {
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
        <button class="like-btn" data-idx="${idx}">👍 ${comment.likes || 0}</button>
        <button class="dislike-btn" data-idx="${idx}">👎 ${comment.dislikes || 0}</button>
        <button class="reply-btn" data-idx="${idx}">Reply</button>
        <button class="delete-btn" data-idx="${idx}">Delete</button>
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
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const type = form['comment-type'].value;
      const heading = form['comment-heading'].value.trim();
      const text = form['comment-text'].value.trim();
      if (!heading || !text) return;
      comments.push({ type, heading, text, likes: 0, dislikes: 0, replies: [] });
      saveComments();
      renderComments();
      form.reset();
    });
  }
  document.getElementById('comments-list').addEventListener('click', function (e) {
    if (e.target.classList.contains('like-btn')) {
      const idx = e.target.getAttribute('data-idx');
      comments[idx].likes = (comments[idx].likes || 0) + 1;
      saveComments();
      renderComments();
    }
    if (e.target.classList.contains('dislike-btn')) {
      const idx = e.target.getAttribute('data-idx');
      comments[idx].dislikes = (comments[idx].dislikes || 0) + 1;
      saveComments();
      renderComments();
    }
    if (e.target.classList.contains('reply-btn')) {
      const idx = e.target.getAttribute('data-idx');
      const reply = prompt('Enter your reply:');
      if (reply && reply.trim()) {
        comments[idx].replies = comments[idx].replies || [];
        comments[idx].replies.push(reply.trim());
        saveComments();
        renderComments();
      }
    }
    if (e.target.classList.contains('delete-btn')) {
      const idx = e.target.getAttribute('data-idx');
      if (confirm('Delete this comment?')) {
        comments.splice(idx, 1);
        saveComments();
        renderComments();
      }
    }
  });
});
