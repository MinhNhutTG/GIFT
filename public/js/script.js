/* script.js - Interactions for Love Card
   - Open/Close card (3D flip)
   - Play/fade music and voice after user interaction (to satisfy autoplay)
   - Typing effect for message
   - Decorative hearts spawn
   - Share / Save placeholders
*/

(() => {
    // Elements
    const card = document.querySelector('.gift-card-inner');
    const bgMusic = document.getElementById('bg-music');
    const voice = document.getElementById('voice-message');
    const typedEl = document.getElementById('typed');
    const heartLayer = document.getElementById('heart-layer');
    const video = document.getElementById('memoryVideo');

    // Save original text and clear for typing
    const originalText = typedEl ? typedEl.textContent.trim() : '';
    if (typedEl) typedEl.textContent = '';

    // Typing function
    function typeText(el, text, speed = 28) {
        el.textContent = '';
        let i = 0;
        const interval = setInterval(() => {
            el.textContent += text.charAt(i);
            i++;
            if (i >= text.length) clearInterval(interval);
        }, speed);
    }

    // Heart spawn
    function spawnHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

        const cx = vw / 2;
        const offsetX = (Math.random() * 260) - 130; // around center
        const left = Math.max(20, Math.min(vw - 20, cx + offsetX));
        const top = vh * 0.68 + (Math.random() * 30 - 15);
        heart.style.left = `${left}px`;
        heart.style.top = `${top}px`;
        heartLayer.appendChild(heart);
        setTimeout(() => heart.remove(), 2300);
    }

    let heartInterval;
    function startHearts() {
        if (heartInterval) return;
        heartInterval = setInterval(spawnHeart, 260);
        setTimeout(stopHearts, 120000);
    }
    function stopHearts() {
        clearInterval(heartInterval);
        heartInterval = null;
    }

    // Open / close handlers
    function openCard() {
        if (!card) return;
        const isOpen = card.getAttribute('data-open') === 'true';
        if (isOpen) {
            closeCard();
            return;
        }

        card.setAttribute('data-open', 'true');

        // Phát nhạc ngay khi mở thiệp
        try {
            
            bgMusic.volume = 0;
            bgMusic.play().catch(() => { });
            const fadeIn = setInterval(() => {
                if (bgMusic.volume < 0.5) {
                    bgMusic.volume = Math.min(0.5, bgMusic.volume + 0.08);
                } else clearInterval(fadeIn);
            }, 120);
        } catch (e) {
            console.warn('Không phát được nhạc:', e);
        }

        // Gõ chữ ngay
        if (typedEl && originalText) typeText(typedEl, originalText, 30);

        // Phát lời chúc sau 1 giây (để có hiệu ứng tự nhiên)
       
        // Thả tim
        startHearts();
    }

    // Sự kiện click vào thiệp
    if (card) {
        card.addEventListener('click', (ev) => {
            const tag = ev.target.tagName.toLowerCase();
            // bỏ qua nếu click vào nút, link, audio, video
            if (['button', 'a', 'video', 'source', 'audio'].includes(tag)) return;
            openCard(); // phát nhạc ngay khi nhấn mở
        });

        // hỗ trợ bàn phím
        card.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault();
                openCard();
            }
        });
    }

    function closeCard() {
        if (!card) return;
        card.setAttribute('data-open', 'false');
        // fade out music
        try {
            const fadeOut = setInterval(() => {
                if (bgMusic.volume > 0.05) bgMusic.volume = Math.max(0, bgMusic.volume - 0.06);
                else {
                    bgMusic.pause();
                    clearInterval(fadeOut);
                }
            }, 120);
        } catch (e) { }
        voice.pause();
        stopHearts();
    }

    // Toggle music
    window.toggleMusic = (e) => {
        if (e) e.stopPropagation();
        if (!bgMusic) return;
        if (bgMusic.paused) {
            bgMusic.play().catch(() => { });
            bgMusic.volume = 0.4;
        } else {
            bgMusic.pause();
        }
    };

    // Toggle voice (play/pause)
    window.toggleVoice = (e) => {
    if (e) e.stopPropagation();
    if (!voice || !bgMusic) return;

    if (voice.paused) {
        // Tạm dừng nhạc nền
        if (!bgMusic.paused) bgMusic.pause();

        // Phát voice
        voice.play().catch(() => { });

        // Khi voice kết thúc → phát lại nhạc nền
        voice.onended = () => {
            try {
                bgMusic.play().catch(() => { });
                bgMusic.volume = 0.4;
            } catch (err) {
                console.warn('Không thể phát lại nhạc nền:', err);
            }
        };
    } else {
        // Nếu đang phát thì dừng voice
        voice.pause();

        // Phát lại nhạc nền ngay khi dừng voice thủ công
        try {
            bgMusic.play().catch(() => { });
            bgMusic.volume = 0.4;
        } catch (err) {
            console.warn('Không thể phát lại nhạc nền:', err);
        }
    }
};

    // Save card (placeholder: can integrate html2canvas later)
    window.saveCard = () => {
        alert('Tính năng lưu thiệp sẽ được kích hoạt — hiện tại bạn có thể chụp màn hình hoặc yêu cầu tính năng "Tải ảnh thiệp".');
    };

    // Share card
    window.shareCard = () => {
        if (navigator.share) {
            navigator.share({ title: 'Thiệp điện tử', text: 'Mở thiệp nhé 💌', url: window.location.href }).catch(() => { });
        } else {
            prompt('Sao chép link để chia sẻ:', window.location.href);
        }
    };

    // Open on click
    if (card) {
        card.addEventListener('click', (ev) => {
            const tag = ev.target.tagName.toLowerCase();
            if (['button', 'a', 'video', 'source', 'audio'].includes(tag)) return;
            openCard();
        });

        // keyboard accessibility: space/enter to toggle
        card.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault();
                openCard();
            }
        });
    }

    // adjust audio volume when video plays
    if (video) {
        video.addEventListener('play', () => {
            if (!bgMusic.paused) bgMusic.volume = 0.18;
        });
        video.addEventListener('pause', () => {
            if (!bgMusic.paused) bgMusic.volume = 0.42;
        });
    }

    // expose openCard for button
    window.openCard = openCard;

})();



// 
// ========== HIỆU ỨNG TRÁI TIM ==========
const canvas = document.getElementById("hearts-canvas");
const ctx = canvas.getContext("2d");
let hearts = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function spawnHeart() {
  for (let i = 0; i < 10; i++) {
    hearts.push({
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      size: 10 + Math.random() * 20,
      speed: 1 + Math.random() * 2,
      alpha: 1,
      drift: (Math.random() - 0.5) * 2
    });
  }
}

function drawHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < hearts.length; i++) {
    const h = hearts[i];
    ctx.save();
    ctx.globalAlpha = h.alpha;
    ctx.fillStyle = "#ff6b9a";
    ctx.beginPath();
    // Vẽ trái tim nhỏ
    const x = h.x, y = h.y, s = h.size;
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - s/2, y - s/2, x - s, y + s/3, x, y + s);
    ctx.bezierCurveTo(x + s, y + s/3, x + s/2, y - s/2, x, y);
    ctx.fill();
    ctx.restore();
    // cập nhật vị trí
    h.y -= h.speed;
    h.x += h.drift;
    h.alpha -= 0.01;
  }
  hearts = hearts.filter(h => h.alpha > 0);
  requestAnimationFrame(drawHearts);
}
drawHearts();



