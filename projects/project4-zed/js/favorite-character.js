// Favorite character selection and header color change
const characterColors = {
  "Michael Scott": "#1976d2", // blue
  "Dwight Schrute": "#cddc39", // beet yellow
  "Jim Halpert": "#388e3c", // green
  "Pam Beesly": "#f06292", // pink
  "Angela Martin": "#fff176", // pale yellow
  "Kevin Malone": "#8d6e63", // brown
  "Stanley Hudson": "#455a64", // dark blue-gray
  "Phyllis Vance": "#ba68c8", // purple
  "Oscar Martinez": "#00bcd4", // teal
  "Creed Bratton": "#757575", // gray
  "Toby Flenderson": "#bdbdbd", // light gray
  "Ryan Howard": "#ffb300", // orange
  "Kelly Kapoor": "#e91e63" // magenta
};

const characterQuotes = {
  "Michael Scott": "I'm not superstitious, but I am a little stitious.",
  "Dwight Schrute": "Bears. Beets. Battlestar Galactica.",
  "Jim Halpert": "Fact: Bears eat beets.",
  "Pam Beesly": "I feel God in this Chili's tonight.",
  "Angela Martin": "If you pray enough, you can change yourself into a cat person.",
  "Kevin Malone": "It's just nice to win one.",
  "Stanley Hudson": "Did I stutter?",
  "Phyllis Vance": "Close your mouth, sweetie. You look like a trout.",
  "Oscar Martinez": "Actually, it's pronounced 'asthma'.",
  "Creed Bratton": "I run a small fake ID business from my car with a laminating machine that I swiped from the sheriff's station.",
  "Toby Flenderson": "I don't think Michael intended to punish me by putting Ryan back here with Kelly.",
  "Ryan Howard": "Wolf!",
  "Kelly Kapoor": "Who says exactly what they're thinking? What kind of game is that?"
};

function setHeaderColor(character) {
  const header = document.querySelector('.office-header');
  const body = document.body;
  if (header && characterColors[character]) {
    header.style.background = characterColors[character];
    header.style.transition = 'background 0.5s';
    // Set body background with low opacity
    body.style.background = characterColors[character] + '22'; // 13% opacity in hex
    body.style.transition = 'background 0.5s';
  }
}

function showWolfPopup() {
  const popup = document.createElement('div');
  popup.textContent = 'Wolf!';
  popup.style.position = 'fixed';
  popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.background = '#ffb300';
  popup.style.color = '#222';
  popup.style.fontSize = '2rem';
  popup.style.padding = '1rem 2rem';
  popup.style.borderRadius = '16px';
  popup.style.boxShadow = '0 2px 16px rgba(0,0,0,0.2)';
  popup.style.zIndex = '9999';
  document.body.appendChild(popup);
  setTimeout(() => {
    popup.remove();
  }, 1200);
}

function showQuotePopup(character) {
  const quote = characterQuotes[character];
  if (!quote) return;
  const popup = document.createElement('div');
  popup.textContent = quote;
  popup.style.position = 'fixed';
  popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.background = characterColors[character] || '#fff';
  popup.style.color = '#222';
  popup.style.fontSize = '1.3rem';
  popup.style.padding = '1rem 2rem';
  popup.style.borderRadius = '16px';
  popup.style.boxShadow = '0 2px 16px rgba(0,0,0,0.2)';
  popup.style.zIndex = '9999';
  popup.style.border = `3px solid ${characterColors[character] || '#1976d2'}`;
  document.body.appendChild(popup);
  setTimeout(() => {
    popup.remove();
  }, 2800);
}

document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.character');
  cards.forEach(card => {
    card.addEventListener('click', function () {
      const selected = card.getAttribute('data-character');
      setHeaderColor(selected);
      cards.forEach(c => c.classList.remove('favorite'));
      card.classList.add('favorite');
      showQuotePopup(selected);
    });
  });
});
