
function closeWelcome() {
  const overlay = document.getElementById('welcomeOverlay');
  overlay.style.opacity = '0';
  overlay.style.pointerEvents = 'none';

  setTimeout(() => {
    overlay.style.display = 'none';
  }, 500); 
  
  sessionStorage.setItem('welcomeShown', 'true');
}

window.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('welcomeOverlay');
  
  if (!sessionStorage.getItem('welcomeShown')) {
    overlay.style.display = 'flex';

    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = 'auto';
    });
  }
});

window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    document.getElementById('welcomeOverlay').style.display = 'none';
  }
});