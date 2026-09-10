document.addEventListener('DOMContentLoaded', () => {
  // FAQ Accordion Toggle Logic
  const faqToggles = document.querySelectorAll('.faq-toggle-btn, .faq-header');
  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const faqRow = toggle.closest('.faq-row') || toggle.parentElement;
      const isActive = faqRow.classList.contains('active');

      // Close all active rows
      document.querySelectorAll('.faq-row, .faq-item').forEach(row => {
        row.classList.remove('active');
      });

      // Toggle clicked item
      if (!isActive) {
        faqRow.classList.add('active');
      }
    });
  });

  // Helper to extract YouTube video ID from various link formats
  function extractYouTubeId(url) {
    if (!url) return 'dQw4w9WgXcQ';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  }

  // Banner Video Popup Modal Trigger Logic
  const heroVideoWrapper = document.getElementById('heroVideoWrapper');
  const openHeroVideo = document.getElementById('openHeroVideo');
  const videoModal = document.getElementById('videoModal');
  const closeVideoModal = document.getElementById('closeVideoModal');
  const videoIframe = document.getElementById('videoIframe');

  if (openHeroVideo && videoModal && videoIframe) {
    openHeroVideo.addEventListener('click', (e) => {
      e.preventDefault();
      const ytUrl = (heroVideoWrapper && heroVideoWrapper.getAttribute('data-youtube-url')) || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      const videoId = extractYouTubeId(ytUrl);

      // Set autoplaying YouTube embed in popup
      videoIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
      videoModal.classList.add('open', 'active');
      document.body.style.overflow = 'hidden'; // prevent background scroll
    });

    const closeModal = () => {
      videoModal.classList.remove('open', 'active');
      videoIframe.src = '';
      document.body.style.overflow = '';
    };

    if (closeVideoModal) {
      closeVideoModal.addEventListener('click', closeModal);
    }

    // Close on backdrop click
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeModal();
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && videoModal.classList.contains('open')) {
        closeModal();
      }
    });
  }
});
