// Christmas Party Voting and Pie Chart
const episodes = [
  "Christmas Party",
  "A Benihana Christmas",
  "Moroccan Christmas",
  "Secret Santa",
  "Classy Christmas",
  "Christmas Wishes"
];
const colors = [
  "#c62828", // deep red
  "#e53935", // bright red
  "#ad1457", // berry
  "#43a047", // green
  "#8bc34a", // light green
  "#d32f2f"  // another red
];
let votes = JSON.parse(localStorage.getItem("officeChristmasVotes") || "[0,0,0,0,0,0]");

function drawPieChart() {
  const canvas = document.getElementById("pieChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const total = votes.reduce((a, b) => a + b, 0) || 1;
  let startAngle = 0;
  for (let i = 0; i < votes.length; i++) {
    const sliceAngle = (votes[i] / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(160, 160);
    ctx.arc(160, 160, 120, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = colors[i];
    ctx.fill();
    startAngle += sliceAngle;
  }
  // Add labels
  startAngle = 0;
  ctx.font = "16px Arial";
  for (let i = 0; i < votes.length; i++) {
    const sliceAngle = (votes[i] / total) * 2 * Math.PI;
    const midAngle = startAngle + sliceAngle / 2;
    const x = 160 + Math.cos(midAngle) * 90;
    const y = 160 + Math.sin(midAngle) * 90;
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText(votes[i], x, y);
    startAngle += sliceAngle;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  drawPieChart();
  const form = document.getElementById("christmas-vote-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const selected = form.episode.value;
      const idx = episodes.indexOf(selected);
      if (idx !== -1) {
        votes[idx]++;
        localStorage.setItem("officeChristmasVotes", JSON.stringify(votes));
        drawPieChart();
        form.reset();
      }
    });
  }
});
