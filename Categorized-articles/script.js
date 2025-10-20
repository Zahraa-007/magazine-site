// Scroll ticker + video mute toggle
(function() {
  const ticker = document.querySelector('.ticker');
  if (ticker) ticker.innerHTML += ticker.innerHTML;

  const video = document.getElementById('sideVideo');

  function handleResize() {
    if (window.innerWidth < 760) {
      video.removeAttribute('controls');
      video.muted = true;
    } else {
      video.setAttribute('controls', '');
    }
  }
  window.addEventListener('resize', handleResize);
  handleResize();

  // مفتاح (V) لتفعيل أو إيقاف الصوت
  window.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'v') {
      video.muted = !video.muted;
    }
  });
})();
