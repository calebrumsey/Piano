const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j'];

const whiteKeys = document.querySelectorAll('.key.white');
const blackKeys = document.querySelectorAll('.key.black');
const keys = document.querySelectorAll('.key');

keys.forEach((key) => {
  key.addEventListener('click', () => playNote(key));
});

function playNote(key) {
  const noteAudio = document.getElementById(key.dataset.note);
  noteAudio.currentTime = 0;
  noteAudio.play();
  key.classList.add('active'); 

  // Add the note to the display if not already present
  const noteDisplay = document.getElementById('note-display');
  if (!document.getElementById('display-' + key.dataset.note)) {
    const span = document.createElement('span');
    span.id = 'display-' + key.dataset.note;
    span.textContent = key.dataset.note + ' ';
    noteDisplay.appendChild(span);
  }

  noteAudio.addEventListener('ended', () => {
    key.classList.remove('active');
    // Remove the note from the display
    const span = document.getElementById('display-' + key.dataset.note);
    if (span) {
      span.remove();
    }
  }, { once: true });
}

document.addEventListener('keydown', (e) => {
  // Get the key that triggered the event
  const key = e.key;
  const whiteKeyIndex = WHITE_KEYS.indexOf(key);
  const blackKeyIndex = BLACK_KEYS.indexOf(key);

  if (e.repeat) {
    return; // Prevents repeated calls if key is held down
  }
  
  if (whiteKeyIndex > -1) {
    playNote(whiteKeys[whiteKeyIndex]);
  }

  if (blackKeyIndex > -1) {
    playNote(blackKeys[blackKeyIndex]);
  }
});