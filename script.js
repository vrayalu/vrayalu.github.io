/* ============================================================
   Personal Website — Scripts
   Handles: scroll-based fade-in, smooth nav, ask-box interaction
   ============================================================ */

(function () {
  'use strict';

  // --- Intersection Observer for fade-in animations ---
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // --- Smooth scroll for nav links ---
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- "Ask a question" box ---
  var askForm = document.getElementById('ask-form');
  var askInput = document.getElementById('ask-input');
  var askResponse = document.getElementById('ask-response');

  if (askForm) {
    askForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var question = askInput.value.trim();
      if (!question) return;

      // Check honeypot field — if filled, silently ignore (anti-spam)
      var honeypot = askForm.querySelector('.hp-field');
      if (honeypot && honeypot.value) {
        askInput.value = '';
        return;
      }

      /*
       * -------------------------------------------------------
       * FUTURE LLM INTEGRATION POINT
       * -------------------------------------------------------
       * Replace the placeholder logic below with a real API call:
       *
       *   1. Send `question` to your backend endpoint
       *      e.g. POST /api/ask  { question: "..." }
       *
       *   2. The backend should:
       *      - Validate & sanitize input
       *      - Rate-limit by IP / session
       *      - Forward to an LLM API (e.g. Anthropic Claude)
       *        with a system prompt scoped to your resume/experience
       *      - Return the generated answer
       *
       *   3. Display the streamed or complete response in `askResponse`
       *
       *   Anti-spam considerations for production:
       *   - Server-side rate limiting (e.g. 5 requests/min per IP)
       *   - Input length validation (already maxlength=500 on client)
       *   - Honeypot field (already implemented above)
       *   - Optional: CAPTCHA challenge after N requests
       *   - Optional: require session token / proof-of-work
       * -------------------------------------------------------
       */

      // Placeholder response
      askResponse.textContent =
        'Thanks for your question! This feature is coming soon — it will be powered by AI to answer questions about my experience and work.';
      askResponse.classList.add('visible');

      askInput.value = '';

      // Auto-hide after 6 seconds
      setTimeout(function () {
        askResponse.classList.remove('visible');
      }, 6000);
    });
  }
})();
