/**
 * ============================================================================
 * ROMANTIC BIRTHDAY EXPERIENCE — JAVASCRIPT ENGINE (script.js)
 * ============================================================================
 */

(function () {
  'use strict';

  // =========================================================================
  // 🔐 CONFIGURATION: CHANGE YOUR SECRET PASSWORD HERE
  // =========================================================================
  const SITE_PASSWORD = "BIRTHDAY123"; // <-- Change this to your chosen password!
  // =========================================================================

  const totalSlides = 7;
  let currentSlide = 0;
  let isMusicPlaying = false;
  let heartCount = 0;
  let audioCtx = null;
  let synthInterval = null;

  // DOM Elements - Password System
  const passwordOverlay = document.getElementById('password-overlay');
  const passwordCard = document.getElementById('password-card');
  const passwordInput = document.getElementById('password-input');
  const togglePwdBtn = document.getElementById('toggle-pwd-btn');
  const unlockBtn = document.getElementById('unlock-btn');
  const passwordErrorMsg = document.getElementById('password-error-msg');

  // DOM Elements - Navigation & Audio
  const slidesWrapper = document.getElementById('slides-wrapper');
  const slides = document.querySelectorAll('.slide');
  const progressTag = document.getElementById('progress-tag');
  const musicToggle = document.getElementById('music-toggle');
  const bgAudio = document.getElementById('bg-audio');
  const bottomNav = document.getElementById('bottom-nav');
  const cameraFlash = document.getElementById('camera-flash');
  const particleCanvas = document.getElementById('particle-canvas');
  const confettiCanvas = document.getElementById('confetti-canvas');
  const cakeInteractive = document.getElementById('cake-interactive');
  const candleFlame = document.getElementById('candle-flame-el');
  const heartTapBtn = document.getElementById('heart-tap-btn');
  const heartBadge = document.getElementById('heart-counter-badge');
  const confessionInkBox = document.getElementById('confession-ink-box');
  const secretModal = document.getElementById('secret-modal');
  const openSecretBtn = document.getElementById('open-secret-letter-btn');
  const closeSecretBtn = document.getElementById('close-secret-modal');

  // =========================================================================
  // 1. PASSWORD PROTECTION LOGIC
  // =========================================================================
  function checkAuthentication() {
    const isSessionUnlocked = sessionStorage.getItem('birthday_site_unlocked') === 'true';
    if (isSessionUnlocked) {
      if (passwordOverlay) passwordOverlay.classList.add('unlocked');
    } else {
      if (passwordOverlay) passwordOverlay.classList.remove('unlocked');
      setTimeout(() => { if (passwordInput) passwordInput.focus(); }, 300);
    }
  }

  function handleUnlockAttempt() {
    const enteredPassword = (passwordInput ? passwordInput.value : '').trim();
    if (enteredPassword === SITE_PASSWORD) {
      sessionStorage.setItem('birthday_site_unlocked', 'true');
      if (passwordErrorMsg) passwordErrorMsg.classList.remove('visible');
      playHarmonicChime(587.33);
      setTimeout(() => playHarmonicChime(880), 160);
      launchHeartConfetti();
      if (passwordOverlay) passwordOverlay.classList.add('unlocked');
      setTimeout(() => { if (currentSlide === 0) triggerPigeonFlight(); }, 400);
    } else {
      if (passwordErrorMsg) passwordErrorMsg.classList.add('visible');
      if (passwordCard) {
        passwordCard.classList.remove('shake');
        void passwordCard.offsetWidth;
        passwordCard.classList.add('shake');
      }
      playHarmonicChime(311.13, 0.4);
      if (passwordInput) {
        passwordInput.focus();
        passwordInput.select();
      }
    }
  }

  if (unlockBtn) unlockBtn.addEventListener('click', handleUnlockAttempt);
  if (passwordInput) {
    passwordInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleUnlockAttempt();
    });
    passwordInput.addEventListener('input', () => {
      if (passwordErrorMsg) passwordErrorMsg.classList.remove('visible');
    });
  }

  if (togglePwdBtn && passwordInput) {
    togglePwdBtn.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      togglePwdBtn.textContent = isPassword ? '🙈' : '👁️';
    });
  }

  // =========================================================================
  // 2. STORY TIMELINE MILESTONES (BOTTOM NAV)
  // =========================================================================
  const chapters = [
    { icon: '🕊️', label: 'Letter' },
    { icon: '🎂', label: 'Wish' },
    { icon: '📸', label: 'Memory' },
    { icon: '💌', label: 'Confession' },
    { icon: '🫂', label: 'Hug' },
    { icon: '✨', label: 'Promise' },
    { icon: '🎁', label: 'Gift' }
  ];

  function initBottomNav() {
    if (!bottomNav) return;
    bottomNav.innerHTML = '';
    chapters.forEach((chap, i) => {
      const item = document.createElement('div');
      item.className = `timeline-item ${i === 0 ? 'active' : ''}`;
      item.setAttribute('aria-label', `Chapter ${i + 1}: ${chap.label}`);
      item.innerHTML = `<span class="timeline-item-icon">${chap.icon}</span><span class="timeline-item-label">${chap.label}</span>`;
      item.addEventListener('click', () => goToSlide(i));
      bottomNav.appendChild(item);
    });
  }

  // =========================================================================
  // 3. SLIDE TRANSITIONS & NEUTRAL/LIGHT THEME SWITCHING
  // =========================================================================
  function updateDeck() {
    if (slidesWrapper) {
      slidesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentSlide);
    });

    if (progressTag) {
      progressTag.textContent = `Chapter 0${currentSlide + 1} / 0${totalSlides}`;
    }

    if (bottomNav) {
      const items = bottomNav.querySelectorAll('.timeline-item');
      items.forEach((item, idx) => {
        item.classList.toggle('active', idx === currentSlide);
      });

      const activeItem = bottomNav.querySelector('.timeline-item.active');
      if (activeItem) {
        const scrollTarget = activeItem.offsetLeft - (bottomNav.clientWidth / 2) + (activeItem.clientWidth / 2);
        bottomNav.scrollTo({ left: Math.max(0, scrollTarget), behavior: 'smooth' });
      }
    }

    // Prevent viewport horizontal drift on mobile devices
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollLeft = 0;
    if (document.body) document.body.scrollLeft = 0;

    // Theme switching: Neutral & Light palettes for all slides
    const targetTheme = slides[currentSlide] ? slides[currentSlide].getAttribute('data-theme') : 'rose';
    if (targetTheme === 'neutral') {
      document.documentElement.style.setProperty('--current-bg-start', 'var(--bg-neutral-start)');
      document.documentElement.style.setProperty('--current-bg-end', 'var(--bg-neutral-end)');
      document.documentElement.style.setProperty('--current-text-primary', 'var(--text-neutral-primary)');
      document.documentElement.style.setProperty('--current-text-muted', 'var(--text-neutral-muted)');
      document.documentElement.style.setProperty('--current-accent-start', 'var(--accent-neutral-start)');
      document.documentElement.style.setProperty('--current-accent-end', 'var(--accent-neutral-end)');
      document.documentElement.style.setProperty('--current-card-bg', 'var(--card-neutral-bg)');
      document.documentElement.style.setProperty('--current-card-border', 'var(--card-neutral-border)');
      document.documentElement.style.setProperty('--current-card-shadow', 'var(--card-neutral-shadow)');
    } else {
      document.documentElement.style.setProperty('--current-bg-start', 'var(--bg-rose-start)');
      document.documentElement.style.setProperty('--current-bg-end', 'var(--bg-rose-end)');
      document.documentElement.style.setProperty('--current-text-primary', 'var(--text-rose-primary)');
      document.documentElement.style.setProperty('--current-text-muted', 'var(--text-rose-muted)');
      document.documentElement.style.setProperty('--current-accent-start', 'var(--accent-rose-start)');
      document.documentElement.style.setProperty('--current-accent-end', 'var(--accent-rose-end)');
      document.documentElement.style.setProperty('--current-card-bg', 'var(--card-rose-bg)');
      document.documentElement.style.setProperty('--current-card-border', 'var(--card-rose-border)');
      document.documentElement.style.setProperty('--current-card-shadow', 'var(--card-rose-shadow)');
    }

    triggerSlideAnimations(currentSlide);
    if ('vibrate' in navigator) navigator.vibrate(20);
  }

  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    if (currentSlide !== index) {
      playHarmonicChime(440 + index * 45);
    }
    currentSlide = index;
    updateDeck();
  }

  function nextSlide() { if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1); }
  function prevSlide() { if (currentSlide > 0) goToSlide(currentSlide - 1); }

  window.deckNext = nextSlide;
  window.deckPrev = prevSlide;

  // =========================================================================
  // 4. SLIDE-SPECIFIC ANIMATIONS
  // =========================================================================
  let confettiFiredOnSlide1 = false;
  const flyingPigeon = document.getElementById('flying-pigeon');
  const pigeonCarriedLetter = document.getElementById('pigeon-carried-letter');
  const droppingLetter = document.getElementById('dropping-letter');
  const replayPigeonBtn = document.getElementById('replay-pigeon-btn');

  function triggerPigeonFlight() {
    if (!flyingPigeon || !droppingLetter) return;
    flyingPigeon.classList.remove('fly-in');
    droppingLetter.classList.remove('dropped', 'landed');
    if (pigeonCarriedLetter) pigeonCarriedLetter.style.opacity = '1';

    void flyingPigeon.offsetWidth;
    flyingPigeon.classList.add('fly-in');

    setTimeout(() => {
      if (pigeonCarriedLetter) pigeonCarriedLetter.style.opacity = '0';
      droppingLetter.classList.add('dropped');
      playHarmonicChime(587.33);

      setTimeout(() => {
        droppingLetter.classList.add('landed');
        playHarmonicChime(880);
        launchHeartConfetti();
      }, 1100);
    }, 1400);
  }

  if (replayPigeonBtn) replayPigeonBtn.addEventListener('click', triggerPigeonFlight);
  if (droppingLetter) droppingLetter.addEventListener('click', handleStart);

  function triggerSlideAnimations(index) {
    if (index === 0) {
      triggerPigeonFlight();
    }

    if (index === 1 && !confettiFiredOnSlide1) {
      confettiFiredOnSlide1 = true;
      setTimeout(launchHeartConfetti, 300);
    }

    if (index === 2 && cameraFlash) {
      cameraFlash.classList.add('flash-active');
      setTimeout(() => cameraFlash.classList.remove('flash-active'), 50);
    }

    if (index === 3) {
      const sentences = document.querySelectorAll('#confession-ink-box .ink-sentence');
      sentences.forEach((s, idx) => {
        s.classList.remove('revealed');
        setTimeout(() => s.classList.add('revealed'), 200 + idx * 600);
      });
    }

    if (index === 4) {
      const chunks = document.querySelectorAll('#reassurance-chunk-box .chunk-para');
      chunks.forEach((c, idx) => {
        c.classList.remove('revealed');
        setTimeout(() => c.classList.add('revealed'), 200 + idx * 650);
      });
    }

    if (index === 5) {
      const flickerLines = document.querySelectorAll('#flicker-box .flicker-line');
      flickerLines.forEach((line, idx) => {
        line.classList.remove('flicker-anim');
        setTimeout(() => line.classList.add('flicker-anim'), 180 + idx * 500);
      });
    }
  }

  if (confessionInkBox) {
    confessionInkBox.addEventListener('click', () => {
      document.querySelectorAll('#confession-ink-box .ink-sentence').forEach(s => s.classList.add('revealed'));
    });
  }

  // =========================================================================
  // 5. INTERACTIVE GAMES & TOUCH EXPERIENCES
  // =========================================================================

  // A. Balloon Pop Game (Slide 1)
  document.querySelectorAll('.interactive-balloon').forEach(balloon => {
    balloon.addEventListener('click', () => {
      if (!balloon.classList.contains('popped')) {
        balloon.classList.add('popped');
        playHarmonicChime(659.25);
        launchHeartConfetti();
      }
    });
  });

  // B. Cake Candle Blowout (Slide 1)
  let candleBlown = false;
  if (cakeInteractive && candleFlame) {
    cakeInteractive.addEventListener('click', () => {
      candleBlown = !candleBlown;
      candleFlame.classList.toggle('blown-out', candleBlown);
      playHarmonicChime(candleBlown ? 783.99 : 523.25);
      if (candleBlown) launchHeartConfetti();
    });
  }

  // C. Runaway "No" Button Game (Slide 2)
  const runawayNoBtn = document.getElementById('runaway-no-btn');
  const runawayYesBtn = document.getElementById('runaway-yes-btn');
  const runawayStatus = document.getElementById('runaway-status');
  const runawayTaunts = [
    "Are you sure? Try again 😉",
    "Nice try, not this one!",
    "Click the other button ❤️",
    "Almost caught it!"
  ];
  let tauntIdx = 0;

  function dodgeButton(e) {
    e.preventDefault();
    const offsetX = (Math.random() - 0.5) * 140;
    const offsetY = (Math.random() - 0.5) * 50;
    if (runawayNoBtn) runawayNoBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    if (runawayStatus) runawayStatus.textContent = runawayTaunts[tauntIdx % runawayTaunts.length];
    tauntIdx++;
    playHarmonicChime(350 + Math.random() * 180, 0.5);
  }

  if (runawayNoBtn) {
    runawayNoBtn.addEventListener('mouseenter', dodgeButton);
    runawayNoBtn.addEventListener('touchstart', dodgeButton, { passive: false });
    runawayNoBtn.addEventListener('click', dodgeButton);
  }

  if (runawayYesBtn) {
    runawayYesBtn.addEventListener('click', () => {
      if (runawayStatus) runawayStatus.textContent = "I knew it! You remember too ❤️✨";
      launchHeartConfetti();
      playHarmonicChime(587.33);
      setTimeout(() => playHarmonicChime(880), 140);
    });
  }

  // D. Secret Unfolded Modal (Slide 3)
  if (openSecretBtn && secretModal) openSecretBtn.addEventListener('click', () => secretModal.classList.add('open'));
  if (closeSecretBtn && secretModal) closeSecretBtn.addEventListener('click', () => secretModal.classList.remove('open'));
  if (secretModal) {
    secretModal.addEventListener('click', (e) => {
      if (e.target === secretModal) secretModal.classList.remove('open');
    });
  }

  // E. Virtual Hug Charger (Slide 4)
  const hugBtn = document.getElementById('hug-btn');
  const hugFill = document.getElementById('hug-progress-fill');
  const hugStatus = document.getElementById('hug-status-text');
  let hugTimer = null;
  let hugProgress = 0;

  function startHugCharge(e) {
    e.preventDefault();
    hugProgress = 0;
    if (hugFill) hugFill.style.width = '0%';
    if (hugStatus) hugStatus.textContent = "Charging warm hug... keep holding ✨";

    hugTimer = setInterval(() => {
      hugProgress += 4;
      if (hugFill) hugFill.style.width = `${hugProgress}%`;
      playHarmonicChime(320 + hugProgress * 5, 0.4);
      if (hugProgress >= 100) {
        clearInterval(hugTimer);
        if (hugStatus) hugStatus.textContent = "Virtual hug delivered straight to your heart ❤️✨";
        launchHeartConfetti();
        if ('vibrate' in navigator) navigator.vibrate([80, 40, 80]);
      }
    }, 100);
  }

  function cancelHugCharge() {
    if (hugProgress < 100) {
      if (hugTimer) clearInterval(hugTimer);
      if (hugFill) hugFill.style.width = '0%';
      if (hugStatus) hugStatus.textContent = "Hold the heart for 3 seconds to send a warm hug";
    }
  }

  if (hugBtn) {
    hugBtn.addEventListener('mousedown', startHugCharge);
    window.addEventListener('mouseup', cancelHugCharge);
    hugBtn.addEventListener('touchstart', startHugCharge, { passive: false });
    window.addEventListener('touchend', cancelHugCharge);
  }

  // F. Pinky Promise Stamp (Slide 5)
  const promiseBtn = document.getElementById('promise-btn');
  const promiseResult = document.getElementById('promise-result');
  if (promiseBtn) {
    promiseBtn.addEventListener('click', () => {
      if (promiseResult) promiseResult.textContent = "Pinky Promise: Clearer talks, always ✨❤️";
      launchHeartConfetti();
      playHarmonicChime(659.25);
      setTimeout(() => playHarmonicChime(880), 120);
    });
  }

  // G. Gift Box Reveal (Slide 6)
  const giftBox = document.getElementById('gift-box');
  const surpriseCard = document.getElementById('surprise-card');
  if (giftBox) {
    giftBox.addEventListener('click', () => {
      giftBox.classList.add('unwrapped');
      if (surpriseCard) surpriseCard.style.display = 'block';
      launchHeartConfetti();
      playHarmonicChime(783.99);
    });
  }

  // H. Heart Tap Counter (Slide 6)
  if (heartTapBtn) {
    heartTapBtn.addEventListener('click', (e) => {
      heartCount++;
      if (heartBadge) heartBadge.textContent = heartCount;
      playHarmonicChime(440 + (heartCount % 8) * 55);
      spawnFloatingHeartAt(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2);
    });
  }

  // =========================================================================
  // 6. AUDIO & HARMONIC MUSIC ENGINE
  // =========================================================================
  function initWebAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  }

  // Warm harmonic chime synthesis (music box / kalimba tone)
  function playHarmonicChime(fundamental = 523.25, duration = 1.4) {
    try {
      initWebAudio();
      if (!audioCtx) return;
      const t = audioCtx.currentTime;

      // Layer 1: Fundamental sine
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(fundamental, t);
      gain1.gain.setValueAtTime(0.06, t);
      gain1.gain.exponentialRampToValueAtTime(0.0001, t + duration);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start(t);
      osc1.stop(t + duration);

      // Layer 2: Soft harmonic overtone (celesta sparkle)
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(fundamental * 2.002, t);
      gain2.gain.setValueAtTime(0.02, t);
      gain2.gain.exponentialRampToValueAtTime(0.0001, t + duration * 0.7);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start(t);
      osc2.stop(t + duration * 0.7);
    } catch (e) { }
  }

  // Peaceful romantic chord arpeggiation (Cmaj9 -> Am9 -> Fmaj7 -> G6)
  const ambientMelody = [
    523.25, 659.25, 783.99, 987.77, 1046.50, // Cmaj9
    440.00, 523.25, 659.25, 880.00,          // Am9
    349.23, 440.00, 523.25, 698.46,          // Fmaj7
    392.00, 493.88, 587.33, 783.99           // G6
  ];

  function startAmbientSynth() {
    if (synthInterval) clearInterval(synthInterval);
    let noteIdx = 0;
    synthInterval = setInterval(() => {
      if (!isMusicPlaying) return;
      playHarmonicChime(ambientMelody[noteIdx % ambientMelody.length], 2.0);
      noteIdx = (noteIdx + 1) % ambientMelody.length;
    }, 1600);
  }

  function toggleMusic(forcePlay = null) {
    initWebAudio();
    const shouldPlay = forcePlay !== null ? forcePlay : !isMusicPlaying;
    isMusicPlaying = shouldPlay;

    if (isMusicPlaying) {
      if (musicToggle) musicToggle.classList.add('playing');
      if (bgAudio && bgAudio.getAttribute('src')) {
        bgAudio.volume = 0.75;
        bgAudio.play()
          .then(() => {
            if (synthInterval) clearInterval(synthInterval);
          })
          .catch(() => {
            startAmbientSynth();
          });
      } else {
        startAmbientSynth();
      }
    } else {
      if (musicToggle) musicToggle.classList.remove('playing');
      if (bgAudio) bgAudio.pause();
      if (synthInterval) clearInterval(synthInterval);
    }
  }

  if (musicToggle) musicToggle.addEventListener('click', () => toggleMusic());

  // Start triggers
  const startBtn = document.getElementById('start-btn');
  function handleStart() {
    toggleMusic(true);
    playHarmonicChime(523.25);
    nextSlide();
  }
  if (startBtn) startBtn.addEventListener('click', handleStart);

  // Restart Button
  const restartBtn = document.getElementById('restart-btn');
  if (restartBtn) restartBtn.addEventListener('click', () => goToSlide(1));

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (sessionStorage.getItem('birthday_site_unlocked') !== 'true') return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') nextSlide();
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') prevSlide();
  });

  // Touch Swipe & Tactile Drag Support
  let touchStartX = 0, touchStartY = 0, touchDeltaX = 0;
  window.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchDeltaX = 0;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    touchDeltaX = e.touches[0].clientX - touchStartX;
    const activeSlide = slides[currentSlide];
    if (activeSlide && Math.abs(touchDeltaX) < 100) {
      activeSlide.style.transform = `scale(${1 - Math.abs(touchDeltaX) * 0.0004}) rotateY(${-touchDeltaX * 0.04}deg)`;
    }
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    const activeSlide = slides[currentSlide];
    if (activeSlide) activeSlide.style.transform = '';
    if (sessionStorage.getItem('birthday_site_unlocked') !== 'true') return;
    const touchDeltaY = Math.abs(e.changedTouches[0].clientY - touchStartY);
    if (Math.abs(touchDeltaX) > 40 && touchDeltaY < 80) {
      if (touchDeltaX < 0) nextSlide();
      else prevSlide();
    }
  }, { passive: true });

  // Prevent accidental horizontal scroll
  window.addEventListener('scroll', () => {
    if (window.scrollX !== 0) window.scrollTo(0, window.scrollY);
  }, { passive: true });

  // =========================================================================
  // 7. PARTICLES ENGINE
  // =========================================================================
  let particles = [];
  const particleCtx = particleCanvas ? particleCanvas.getContext('2d') : null;

  function resizeCanvases() {
    if (particleCanvas) {
      particleCanvas.width = window.innerWidth;
      particleCanvas.height = window.innerHeight;
    }
    if (confettiCanvas) {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    }
  }
  window.addEventListener('resize', resizeCanvases);
  resizeCanvases();

  class Particle {
    constructor() { this.reset(); }
    reset() {
      if (!particleCanvas) return;
      this.x = Math.random() * particleCanvas.width;
      this.y = particleCanvas.height + 20;
      this.size = Math.random() * 7 + 5;
      this.speedY = Math.random() * 0.6 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.4 + 0.15;
      this.isHeart = Math.random() > 0.45;
      this.angle = Math.random() * 360;
      this.spin = (Math.random() - 0.5) * 0.02;
    }
    update() {
      if (!particleCanvas) return;
      this.y -= this.speedY;
      this.x += Math.sin(this.angle) * 0.4 + this.speedX;
      this.angle += this.spin;
      if (this.y < -30) this.reset();
    }
    draw() {
      if (!particleCtx) return;
      particleCtx.save();
      particleCtx.translate(this.x, this.y);
      particleCtx.globalAlpha = this.opacity;
      particleCtx.fillStyle = '#df8ca2';
      if (this.isHeart) {
        particleCtx.font = `${this.size}px serif`;
        particleCtx.fillText('♥', 0, 0);
      } else {
        particleCtx.beginPath();
        particleCtx.arc(0, 0, this.size / 3, 0, Math.PI * 2);
        particleCtx.fill();
      }
      particleCtx.restore();
    }
  }

  if (particleCanvas) {
    for (let i = 0; i < 25; i++) {
      const p = new Particle();
      p.y = Math.random() * particleCanvas.height;
      particles.push(p);
    }
  }

  function animateParticles() {
    if (particleCtx && particleCanvas) {
      particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  function spawnFloatingHeartAt(x, y) {
    const p = new Particle();
    p.x = x;
    p.y = y;
    p.size = Math.random() * 12 + 10;
    p.speedY = Math.random() * 1.4 + 1.1;
    p.opacity = 0.85;
    p.isHeart = true;
    particles.push(p);
  }

  // =========================================================================
  // 8. CONFETTI ENGINE
  // =========================================================================
  let confettiPieces = [];
  const confettiCtx = confettiCanvas ? confettiCanvas.getContext('2d') : null;

  class ConfettiPiece {
    constructor() {
      if (!confettiCanvas) return;
      this.x = confettiCanvas.width / 2;
      this.y = confettiCanvas.height / 2;
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 11 + 5;
      this.vx = Math.cos(angle) * velocity;
      this.vy = Math.sin(angle) * velocity - 2.5;
      this.gravity = 0.26;
      this.size = Math.random() * 9 + 5;
      this.color = ['#df8ca2', '#ba6d84', '#fde4ec', '#fff0f4', '#ffb703', '#f8a5c2'][Math.floor(Math.random() * 6)];
      this.alpha = 1;
      this.isHeart = Math.random() > 0.35;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 8;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.vx *= 0.98;
      this.alpha -= 0.013;
      this.rotation += this.rotSpeed;
    }
    draw() {
      if (this.alpha <= 0 || !confettiCtx) return;
      confettiCtx.save();
      confettiCtx.translate(this.x, this.y);
      confettiCtx.rotate((this.rotation * Math.PI) / 180);
      confettiCtx.globalAlpha = Math.max(0, this.alpha);
      confettiCtx.fillStyle = this.color;
      if (this.isHeart) {
        confettiCtx.font = `${this.size}px serif`;
        confettiCtx.fillText('♥', -this.size / 2, this.size / 2);
      } else {
        confettiCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size / 1.5);
      }
      confettiCtx.restore();
    }
  }

  function launchHeartConfetti() {
    if (!confettiCanvas) return;
    for (let i = 0; i < 55; i++) confettiPieces.push(new ConfettiPiece());
  }

  function animateConfetti() {
    if (confettiCtx && confettiCanvas) {
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      confettiPieces = confettiPieces.filter(p => p.alpha > 0);
      confettiPieces.forEach(p => { p.update(); p.draw(); });
    }
    requestAnimationFrame(animateConfetti);
  }
  animateConfetti();

  // =========================================================================
  // 9. INITIALIZE
  // =========================================================================
  initBottomNav();
  updateDeck();
  checkAuthentication();
})();
