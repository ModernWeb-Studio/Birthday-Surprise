/* ===== MODERN GEN-Z BIRTHDAY SURPRISE WEBSITE - Enhanced JavaScript ===== */

// ===== GLOBAL VARIABLES =====
let isMusicPlaying = false;
let audioContext;
let hasTriggeredIntro = false;
let birthdayPersonName = '';
let backgroundMusic = null;
let currentSongIndex = 0;

// Multiple songs playlist - add your song files to Assets folder
const songPlaylist = [
    { src: 'Assets/birthday-music.mp3', name: '🎂' },
    { src: 'Assets/song2.mp3', name: '🎵' },
    { src: 'Assets/song3.mp3', name: '🎶' }
];

// ===== BACKGROUND MUSIC SETUP =====
function initBackgroundMusic() {
    if (!backgroundMusic) {
        // Try to use the HTML audio element first
        const htmlAudio = document.getElementById('bg-music');
        if (htmlAudio) {
            backgroundMusic = htmlAudio;
            backgroundMusic.volume = 0.3;
            backgroundMusic.loop = false; // Disable loop for single song, we handle playlist loop

            // Auto-play next song when current one ends
            backgroundMusic.addEventListener('ended', () => {
                if (isMusicPlaying) {
                    playNextSong();
                }
            });
        } else {
            // Create new audio element as fallback
            backgroundMusic = new Audio();
            backgroundMusic.src = songPlaylist[currentSongIndex].src;
            backgroundMusic.loop = false; // We handle playlist loop
            backgroundMusic.volume = 0.3;
            backgroundMusic.preload = 'auto';

            // Auto-play next song when current one ends
            backgroundMusic.addEventListener('ended', () => {
                if (isMusicPlaying) {
                    playNextSong();
                }
            });
        }

        // Handle error - fall back to synthesized melody
        backgroundMusic.onerror = () => {
            console.log('Music file not found, using synthesized melody');
            backgroundMusic = null;
        };
    }
    return backgroundMusic;
}

// Auto-play background music after signup
function autoPlayBackgroundMusic() {
    const music = initBackgroundMusic();
    const musicButton = document.getElementById('music-toggle');

    if (music) {
        // Make sure we're playing from the playlist
        music.src = songPlaylist[currentSongIndex].src;
        music.play().then(() => {
            isMusicPlaying = true;
            if (musicButton) {
                musicButton.classList.add('playing');
                musicButton.innerHTML = `<span class="music-icon">${songPlaylist[currentSongIndex].name}</span>`;
            }
            console.log(`Playing song ${currentSongIndex + 1}: ${songPlaylist[currentSongIndex].src}`);
        }).catch(e => {
            console.log('Music autoplay blocked, user needs to click music button');
            // Fall back to melody on user interaction
        });
    }
}


// ===== INITIALIZE ON PAGE LOAD =====
window.addEventListener('load', () => {
    // Focus on name input when page loads
    const nameInput = document.getElementById('birthday-name');
    if (nameInput) {
        setTimeout(() => nameInput.focus(), 500);

        // Allow Enter key to submit
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitName();
            }
        });
    }
});

// ===== NAME ENTRY FUNCTION =====
function submitName() {
    const nameInput = document.getElementById('birthday-name');
    const nameEntryScreen = document.getElementById('name-entry-screen');
    const introScreen = document.getElementById('intro-screen');
    const loadingName = document.getElementById('loading-name');
    const heroName = document.getElementById('hero-name');

    birthdayPersonName = nameInput.value.trim() || 'Selfie';

    // Update personalized elements
    if (loadingName) loadingName.textContent = birthdayPersonName;
    if (heroName) heroName.textContent = birthdayPersonName.toUpperCase();

    // Animate name entry screen out
    if (nameEntryScreen) {
        nameEntryScreen.classList.add('hide');

        // Show intro screen after name entry hides
        setTimeout(() => {
            nameEntryScreen.style.display = 'none';
            if (introScreen) {
                introScreen.style.display = 'flex';
            }

            // Start playing music during loading screen
            autoPlayBackgroundMusic();

            // After loading, show main content
            setTimeout(() => {
                showMainContent();
                triggerIntroConfetti();
                initScrollAnimations();
                startCountdown();
                setFooterDate();
                initSparkleTrail();
                createFloatingHearts();
                initParallaxEffects();
                initHoverSounds();
            }, 2500);
        }, 800);
    }
}

// Make submitName globally accessible
window.submitName = submitName;

// ===== INTRO & ANIMATIONS =====
function showMainContent() {
    const mainContent = document.getElementById('main-content');
    const introScreen = document.getElementById('intro-screen');

    if (mainContent) mainContent.style.display = 'block';
    if (introScreen) {
        introScreen.classList.add('hide');
        // Remove intro screen after animation
        setTimeout(() => {
            introScreen.style.display = 'none';
        }, 800);
    }
    hasTriggeredIntro = true;
}

// ===== ENHANCED CONFETTI EXPLOSION =====
function triggerIntroConfetti() {
    if (typeof confetti === 'undefined') return;

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
                colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#00f2fe', '#43e97b', '#fa709a', '#ffde59', '#7cff6b']
            })
        );
    }, 250);

    // Side cannons
    setTimeout(() => {
        confetti({
            particleCount: 80,
            angle: 60,
            spread: 80,
            origin: { x: 0, y: 0.7 },
            colors: ['#ff6b9d', '#ffde59', '#7cff6b', '#4cc9ff']
        });
        confetti({
            particleCount: 80,
            angle: 120,
            spread: 80,
            origin: { x: 1, y: 0.7 },
            colors: ['#667eea', '#4facfe', '#f093fb', '#c44cff']
        });
    }, 800);
}

function triggerMassiveConfetti() {
    if (typeof confetti === 'undefined') return;

    const count = 300;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio),
            colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#ffde59', '#ff6b9d', '#7cff6b', '#c44cff']
        });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    // Firework-style bursts
    setTimeout(() => {
        confetti({ particleCount: 50, angle: 60, spread: 80, origin: { x: 0, y: 0.8 } });
        confetti({ particleCount: 50, angle: 120, spread: 80, origin: { x: 1, y: 0.8 } });
    }, 300);

    setTimeout(() => {
        confetti({ particleCount: 60, spread: 100, origin: { x: 0.5, y: 0.3 } });
    }, 600);
}

// ===== SPARKLE CURSOR TRAIL =====
function initSparkleTrail() {
    const sparkleContainer = document.createElement('div');
    sparkleContainer.id = 'sparkle-container';
    sparkleContainer.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9999;';
    document.body.appendChild(sparkleContainer);

    let lastX = 0, lastY = 0;
    let throttle = false;

    document.addEventListener('mousemove', (e) => {
        if (throttle) return;
        throttle = true;

        setTimeout(() => { throttle = false; }, 50);

        const distance = Math.sqrt(Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2));

        if (distance > 30) {
            createSparkle(e.clientX, e.clientY);
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    const emojis = ['✨', '⭐', '💫', '🌟', '✦', '💖', '💕'];
    sparkle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: ${Math.random() * 12 + 10}px;
        pointer-events: none;
        animation: sparkleFloat 1s ease-out forwards;
        z-index: 9999;
    `;

    const container = document.getElementById('sparkle-container');
    if (container) container.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 1000);
}

// ===== FLOATING HEARTS ANIMATION =====
function createFloatingHearts() {
    const heartsContainer = document.createElement('div');
    heartsContainer.id = 'floating-hearts';
    heartsContainer.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; overflow: hidden;';
    document.body.appendChild(heartsContainer);

    // Initial hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createHeart(), i * 500);
    }

    // Continuous hearts
    setInterval(createHeart, 3000);
}

function createHeart() {
    const heart = document.createElement('div');
    const hearts = ['💕', '💖', '💗', '💝', '💓', '🩷', '🩵', '💜', '🤍'];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.className = 'floating-heart-particle';
    heart.style.cssText = `
        position: absolute;
        bottom: -50px;
        left: ${Math.random() * 100}%;
        font-size: ${Math.random() * 20 + 15}px;
        opacity: 0.7;
    `;

    const container = document.getElementById('floating-hearts');
    if (container) container.appendChild(heart);

    setTimeout(() => heart.remove(), 12000);
}

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Hero parallax
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }

        // Shapes parallax
        document.querySelectorAll('.shape').forEach((shape, index) => {
            const speed = 0.2 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.02}deg)`;
        });

        // Stars parallax
        document.querySelectorAll('.star').forEach((star, index) => {
            const speed = 0.1 + (index * 0.05);
            star.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== SCROLL-BASED ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Trigger confetti for wishes section
                if (entry.target.id === 'wishes' && !entry.target.dataset.confettiTriggered) {
                    entry.target.dataset.confettiTriggered = 'true';
                    setTimeout(() => {
                        if (typeof confetti !== 'undefined') {
                            confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
                        }
                    }, 500);
                }
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.gallery-item, .wish-card, section, .section-title').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        observer.observe(item);
    });
}

// ===== WISH CARDS FLIP ANIMATION =====
function toggleWish(element) {
    element.classList.toggle('flipped');

    // Add sparkle effect when revealing
    if (element.classList.contains('flipped')) {
        const rect = element.getBoundingClientRect();
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                createSparkle(
                    rect.left + Math.random() * rect.width,
                    rect.top + Math.random() * rect.height
                );
            }, i * 80);
        }
    }
}

// ===== FINAL SURPRISE TRIGGER =====
function triggerFinalSurprise() {
    // Stop background music when surprise opens
    stopBackgroundMusic();
    isMusicPlaying = false;
    const musicButton = document.getElementById('music-toggle');
    if (musicButton) {
        musicButton.classList.remove('playing');
        musicButton.innerHTML = '<span class="music-icon">🎵</span>';
    }

    triggerMassiveConfetti();

    // Play the surprise sound effect
    playSurpriseSound();

    showCelebrationMessage();
}

// Play surprise reveal sound
function playSurpriseSound() {
    const surpriseAudio = document.getElementById('surprise-sound');
    if (surpriseAudio) {
        surpriseAudio.currentTime = 0;
        surpriseAudio.volume = 0.8;
        surpriseAudio.play().catch(e => {
            console.log('Surprise sound not available');
        });
    }
}

// Stop surprise sound
function stopSurpriseSound() {
    const surpriseAudio = document.getElementById('surprise-sound');
    if (surpriseAudio) {
        surpriseAudio.pause();
        surpriseAudio.currentTime = 0;
    }
}

// Close celebration and resume background music
function closeCelebration() {
    // Stop surprise sound
    stopSurpriseSound();

    // Remove the celebration popup
    const celebrationMsg = document.querySelector('.celebration-message');
    if (celebrationMsg) {
        celebrationMsg.remove();
    }

    // Resume background music
    autoPlayBackgroundMusic();
}

window.closeCelebration = closeCelebration;
window.stopSurpriseSound = stopSurpriseSound;

function showCelebrationMessage() {
    const name = birthdayPersonName || 'Selfie';
    const message = document.createElement('div');
    message.className = 'celebration-message';
    message.innerHTML = `
        <div class="celebration-content">
            <button class="close-celebration" onclick="closeCelebration()">✕</button>
            <div class="floating-popup-emojis">
                <span class="float-emoji">✨</span>
                <span class="float-emoji">🦋</span>
                <span class="float-emoji">💫</span>
                <span class="float-emoji">🌙</span>
                <span class="float-emoji">💜</span>
                <span class="float-emoji">🩷</span>
            </div>
            <div class="emoji-burst">
                <span style="--delay: 0s;">🦋</span>
                <span style="--delay: 0.1s;">💜</span>
                <span style="--delay: 0.2s;">✨</span>
            </div>
            <h2 class="glowing-title">✨ HAPPY BIRTHDAY ${name.toUpperCase()}! ✨</h2>
            <p class="main-message vibey-text">to my favorite soul 🩷</p>
            <div class="emotional-quote genz-quote">
                <p>"you're not just special—you're irreplaceable. the world is lucky to have you in it, ${name}. no cap 💅"</p>
            </div>
            <div class="candle-section">
                <p class="wish-prompt">close your eyes & make a wish 🌙</p>
                <div class="candles-row" id="candles-row">
                    <span class="candle-flame">🕯️</span>
                    <span class="candle-flame">🕯️</span>
                    <span class="candle-flame">🕯️</span>
                </div>
                <button class="blow-btn genz-btn" onclick="blowCandles()">🌬️ blow & wish ✨</button>
            </div>
            <p class="slay-text">you ate and left no crumbs 💅✨</p>
        </div>
    `;

    document.body.appendChild(message);

    // Create floating bubbles effect
    createPopupBubbles(message.querySelector('.celebration-content'));

    // Trigger more confetti
    setTimeout(triggerMassiveConfetti, 500);
}

// Blow candles function
function blowCandles() {
    const candles = document.querySelectorAll('.candle-flame');

    candles.forEach((candle, index) => {
        setTimeout(() => {
            candle.classList.add('blown');
            candle.textContent = '🕯️';
        }, index * 200);
    });

    // Show emotional surprise popup after all candles blown
    setTimeout(() => {
        triggerMassiveConfetti();

        // Close the current celebration modal
        const celebrationMsg = document.querySelector('.celebration-message');
        if (celebrationMsg) {
            celebrationMsg.remove();
        }

        // Show the emotional girlfriend surprise popup
        showEmotionalSurprise();
    }, candles.length * 200 + 500);
}

// Emotional Girlfriend Surprise Popup
function showEmotionalSurprise() {
    const name = birthdayPersonName || 'Selfie';
    const surprise = document.createElement('div');
    surprise.className = 'emotional-surprise-overlay';
    surprise.innerHTML = `
        <div class="emotional-surprise-popup">
            <button class="close-surprise" onclick="closeSurpriseWithVoice()">✕</button>
            <div class="floating-popup-emojis">
                <span class="float-emoji">🦋</span>
                <span class="float-emoji">💜</span>
                <span class="float-emoji">✨</span>
                <span class="float-emoji">🌙</span>
                <span class="float-emoji">💫</span>
                <span class="float-emoji">🩷</span>
            </div>
            <div class="surprise-header">
                <span class="surprise-emoji bouncing">💝</span>
                <h2 class="glowing-title">for you, ${name} 💜</h2>
            </div>
            <div class="genz-vibes-text">it's giving ✨ main character energy ✨</div>
            <div class="emotional-quotes-container">
                <div class="love-quote active">
                    <p>"every moment with you feels like a beautiful dream i never want to wake up from 🦋"</p>
                </div>
                <div class="love-quote">
                    <p>"you're the first person i think of when i wake up & the last before i sleep 🌙"</p>
                </div>
                <div class="love-quote">
                    <p>"in a world of 8 billion people, my heart chose you & it would choose you again, in every lifetime ✨"</p>
                </div>
                <div class="love-quote">
                    <p>"you make me believe in forever. happy birthday to my entire universe 💫"</p>
                </div>
            </div>
            <div class="quote-nav">
                <span class="nav-dot active" onclick="showLoveQuote(0)"></span>
                <span class="nav-dot" onclick="showLoveQuote(1)"></span>
                <span class="nav-dot" onclick="showLoveQuote(2)"></span>
                <span class="nav-dot" onclick="showLoveQuote(3)"></span>
            </div>
            <div class="final-love-message genz-box">
                <p>i love you more than words could ever say, ${name} 💜</p>
                <p class="slay-subtext">you understood the assignment 💅</p>
                <span class="heart-animation">💕</span>
            </div>
            <button class="love-btn genz-btn" onclick="closeSurpriseWithVoice()">
                🩷 i love you too 🩷
            </button>
        </div>
    `;

    document.body.appendChild(surprise);
    triggerMassiveConfetti();

    // Create floating bubbles effect
    createPopupBubbles(surprise.querySelector('.emotional-surprise-popup'));

    // Auto-rotate quotes
    let currentLoveQuote = 0;
    setInterval(() => {
        currentLoveQuote = (currentLoveQuote + 1) % 4;
        showLoveQuote(currentLoveQuote);
    }, 4000);
}

// Close surprise popup
function closeSurpriseWithVoice() {
    // Stop surprise sound
    stopSurpriseSound();

    const overlay = document.querySelector('.emotional-surprise-overlay');
    if (overlay) overlay.remove();

    triggerMassiveConfetti();

    // Resume background music after closing the surprise popup
    autoPlayBackgroundMusic();
}

window.closeSurpriseWithVoice = closeSurpriseWithVoice;

// Show love quote function
function showLoveQuote(index) {
    const quotes = document.querySelectorAll('.love-quote');
    const dots = document.querySelectorAll('.nav-dot');

    quotes.forEach((q, i) => {
        q.classList.remove('active');
        if (i === index) q.classList.add('active');
    });

    dots.forEach((d, i) => {
        d.classList.remove('active');
        if (i === index) d.classList.add('active');
    });
}

window.showLoveQuote = showLoveQuote;

// ===== COUNTDOWN TIMER =====
function startCountdown() {
    function updateCountdown() {
        const now = new Date();

        // Set target to midnight tonight or a custom time
        let targetTime = new Date();
        targetTime.setDate(targetTime.getDate() + 1);
        targetTime.setHours(0, 0, 0, 0);

        const difference = targetTime - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');

            if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
            if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
            if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
            if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        } else {
            // Countdown finished - show celebration
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');

            if (daysEl) daysEl.textContent = '🎉';
            if (hoursEl) hoursEl.textContent = '🎂';
            if (minutesEl) minutesEl.textContent = '🎈';
            if (secondsEl) secondsEl.textContent = '✨';
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===== VIDEO PLAYER TOGGLE =====
function toggleVideo() {
    const videoPlayer = document.getElementById('video-player');
    const videoPlaceholder = document.querySelector('.video-placeholder');

    if (videoPlayer && videoPlayer.style.display === 'none') {
        videoPlayer.style.display = 'flex';
        if (videoPlaceholder) videoPlaceholder.style.display = 'none';
    } else if (videoPlayer) {
        videoPlayer.style.display = 'none';
        if (videoPlaceholder) videoPlaceholder.style.display = 'flex';
    }
}

// Video placeholder click handler
document.addEventListener('DOMContentLoaded', () => {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', toggleVideo);
    }
});

// Close video on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const videoPlayer = document.getElementById('video-player');
        if (videoPlayer) videoPlayer.style.display = 'none';
        const videoPlaceholder = document.querySelector('.video-placeholder');
        if (videoPlaceholder) videoPlaceholder.style.display = 'flex';
    }
});

// ===== SMOOTH SCROLL =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // playSound('whoosh');
    }
}


// ===== MUSIC TOGGLE =====
function toggleMusic() {
    const musicButton = document.getElementById('music-toggle');

    if (isMusicPlaying) {
        // If music is playing, switch to next song
        currentSongIndex = (currentSongIndex + 1) % songPlaylist.length;
        switchSong(currentSongIndex);
        if (musicButton) {
            musicButton.innerHTML = `<span class="music-icon">${songPlaylist[currentSongIndex].name}</span>`;
        }
    } else {
        // If music is not playing, start it
        isMusicPlaying = true;
        if (musicButton) {
            musicButton.classList.add('playing');
            musicButton.innerHTML = `<span class="music-icon">${songPlaylist[currentSongIndex].name}</span>`;
        }
        startBackgroundMusic();
    }
}

// Switch to a different song
function switchSong(index) {
    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.src = songPlaylist[index].src;
        backgroundMusic.load();
        backgroundMusic.play().catch(e => {
            console.log('Could not play song:', songPlaylist[index].src);
        });
    }
}

// Auto-play next song in playlist (1 → 2 → 3 → 1 → 2 → 3...)
function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songPlaylist.length;
    const musicButton = document.getElementById('music-toggle');

    if (backgroundMusic) {
        backgroundMusic.src = songPlaylist[currentSongIndex].src;
        backgroundMusic.load();
        backgroundMusic.play().catch(e => {
            console.log('Could not play next song:', songPlaylist[currentSongIndex].src);
        });
    }

    // Update button emoji to show current song
    if (musicButton) {
        musicButton.innerHTML = `<span class="music-icon">${songPlaylist[currentSongIndex].name}</span>`;
    }

    console.log(`Now playing song ${currentSongIndex + 1}: ${songPlaylist[currentSongIndex].src}`);
}

function startBackgroundMusic() {
    const music = initBackgroundMusic();
    if (music) {
        music.play().catch(e => {
            console.log('Music autoplay blocked, falling back to melody');
            playBackgroundMelody();
        });
    }
}

function stopBackgroundMusic() {
    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    }
}

function playBackgroundMelody() {
    if (!isMusicPlaying) return;

    try {
        const ctx = initAudioContext();
        if (ctx.state === 'suspended') ctx.resume();

        // Happy Birthday melody notes (full song)
        const melody = [
            // "Happy Birthday to you"
            { freq: 392, dur: 0.25 }, // G
            { freq: 392, dur: 0.25 }, // G
            { freq: 440, dur: 0.5 },  // A
            { freq: 392, dur: 0.5 },  // G
            { freq: 523, dur: 0.5 },  // C
            { freq: 494, dur: 1.0 },  // B
            // "Happy Birthday to you"
            { freq: 392, dur: 0.25 }, // G
            { freq: 392, dur: 0.25 }, // G
            { freq: 440, dur: 0.5 },  // A
            { freq: 392, dur: 0.5 },  // G
            { freq: 587, dur: 0.5 },  // D
            { freq: 523, dur: 1.0 },  // C
            // "Happy Birthday dear..."
            { freq: 392, dur: 0.25 }, // G
            { freq: 392, dur: 0.25 }, // G
            { freq: 784, dur: 0.5 },  // G (high)
            { freq: 659, dur: 0.5 },  // E
            { freq: 523, dur: 0.5 },  // C
            { freq: 494, dur: 0.5 },  // B
            { freq: 440, dur: 1.0 },  // A
            // "Happy Birthday to you"
            { freq: 698, dur: 0.25 }, // F
            { freq: 698, dur: 0.25 }, // F
            { freq: 659, dur: 0.5 },  // E
            { freq: 523, dur: 0.5 },  // C
            { freq: 587, dur: 0.5 },  // D
            { freq: 523, dur: 1.0 },  // C
        ];

        let time = ctx.currentTime;
        melody.forEach(note => {
            if (isMusicPlaying) {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.value = note.freq;
                osc.type = 'sine';
                gain.gain.setValueAtTime(0.15, time);
                gain.gain.exponentialRampToValueAtTime(0.01, time + note.dur * 0.9);
                osc.start(time);
                osc.stop(time + note.dur);
                time += note.dur;
            }
        });

        // Loop the melody
        setTimeout(() => {
            if (isMusicPlaying) playBackgroundMelody();
        }, time * 1000 + 1000);
    } catch (e) {
        // Audio not available
    }
}

// ===== CREATE POPUP BUBBLES (Visual Effect) =====
function createPopupBubbles(container) {
    if (!container) return;

    const bubblesContainer = document.createElement('div');
    bubblesContainer.className = 'popup-bubbles';
    bubblesContainer.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; overflow: hidden; border-radius: inherit; z-index: 0;';

    // Create floating bubbles
    for (let i = 0; i < 15; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'popup-bubble';
        bubble.style.cssText = `
            position: absolute;
            width: ${Math.random() * 20 + 10}px;
            height: ${Math.random() * 20 + 10}px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            bottom: -30px;
            left: ${Math.random() * 100}%;
            animation: bubbleFloat ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        bubblesContainer.appendChild(bubble);
    }

    container.style.position = 'relative';
    container.insertBefore(bubblesContainer, container.firstChild);
}

// ===== HOVER EFFECTS (No sounds) =====
function initHoverSounds() {
    // Visual effects only - no sounds on hover
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            item.style.animation = 'bounce 0.5s ease';
            setTimeout(() => item.style.animation = '', 500);
        });
    });
}

// ===== FOOTER DATE =====
function setFooterDate() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = today.toLocaleDateString('en-US', options);

    const footerDate = document.getElementById('footer-date');
    if (footerDate) {
        footerDate.textContent = `Today: ${dateString} 🎉`;
    }
}

// ===== PERSONALIZATION =====
function personalizeWebsite(name = 'Birthday Star', message = 'Today is YOUR day to shine brighter than ever! 💫') {
    const titleElement = document.getElementById('personalized-message');
    if (titleElement) {
        titleElement.textContent = message;
    }
    document.title = `🎉 Happy Birthday ${name}! | A Special Surprise`;
}

// ===== EASTER EGG REMOVED =====
// No keyboard shortcuts - surprise only via button

// ===== KEYBOARD SHORTCUTS DISABLED =====
// Surprise only opens via button click, not keyboard

// ===== TOUCH INTERACTIONS =====
if ('ontouchstart' in window) {
    document.querySelectorAll('.gallery-item, .wish-card, .cta-button').forEach(el => {
        el.addEventListener('touchstart', () => {
            el.style.transform = 'scale(0.98)';
        });
        el.addEventListener('touchend', () => {
            el.style.transform = '';
        });
    });
}

// ===== VISIBILITY CHANGE =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.classList.add('animations-paused');
    } else {
        document.body.classList.remove('animations-paused');
    }
});

// ===== INIT AUDIO ON FIRST INTERACTION =====
document.addEventListener('click', () => {
    initAudioContext();
}, { once: true });

// ===== QUOTES CAROUSEL =====
let currentQuote = 0;
let quoteInterval;

function initQuotesCarousel() {
    const quotes = document.querySelectorAll('.quote-card');
    const dots = document.querySelectorAll('.dot');

    if (quotes.length === 0) return;

    // Auto-rotate quotes
    quoteInterval = setInterval(() => {
        currentQuote = (currentQuote + 1) % quotes.length;
        showQuote(currentQuote);
    }, 5000);
}

function showQuote(index) {
    const quotes = document.querySelectorAll('.quote-card');
    const dots = document.querySelectorAll('.dot');

    if (quotes.length === 0) return;

    // Reset interval on manual click
    clearInterval(quoteInterval);
    quoteInterval = setInterval(() => {
        currentQuote = (currentQuote + 1) % quotes.length;
        showQuote(currentQuote);
    }, 5000);

    currentQuote = index;

    quotes.forEach((quote, i) => {
        quote.classList.remove('active');
        if (i === index) {
            quote.classList.add('active');
            // playSound('whoosh');
        }
    });

    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
}

// Initialize carousel on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initQuotesCarousel, 3000);
});

// ===== EXPORT FUNCTIONS =====
window.personalizeWebsite = personalizeWebsite;
window.triggerFinalSurprise = triggerFinalSurprise;
window.triggerMassiveConfetti = triggerMassiveConfetti;
window.toggleMusic = toggleMusic;
window.scrollToSection = scrollToSection;
window.toggleVideo = toggleVideo;
window.toggleWish = toggleWish;
window.blowCandles = blowCandles;
window.showQuote = showQuote;
window.startBackgroundMusic = startBackgroundMusic;
window.autoPlayBackgroundMusic = autoPlayBackgroundMusic;
window.stopBackgroundMusic = stopBackgroundMusic;
window.playSurpriseSound = playSurpriseSound;

// ===== CONSOLE MESSAGES =====
console.log('%c🎉 Happy Birthday! 🎉', 'font-size: 24px; color: #667eea; font-weight: bold;');
console.log('%c✨ Click the Reveal Surprise button for the magic! ✨', 'font-size: 14px; color: #f093fb; font-weight: bold;');
