// Set the target date and time: August 2, 2025 at 6:00 PM (18:00)
const targetDate = new Date('2025-08-02T19:00:00').getTime();

// Get DOM elements
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const container = document.querySelector('.container');
const countdownContainer = document.querySelector('.countdown-container');

// Add number formatting function
function formatNumber(num) {
    return num.toString().padStart(2, '0');
}

// Add celebration confetti effect
function createConfetti() {
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            confetti.style.animation = `confettiFall ${2 + Math.random() * 3}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, Math.random() * 3000);
    }
}

// Add confetti animation styles
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Main countdown function
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update display
    if (distance > 0) {
        daysElement.textContent = formatNumber(days);
        hoursElement.textContent = formatNumber(hours);
        minutesElement.textContent = formatNumber(minutes);
        secondsElement.textContent = formatNumber(seconds);
        
        // Add pulse effect when time is running low
        if (distance < 86400000) { // Less than 1 day
            countdownContainer.style.animation = 'pulse 1s ease-in-out infinite';
        }
        
        if (distance < 3600000) { // Less than 1 hour
            countdownContainer.style.animation = 'pulse 0.5s ease-in-out infinite';
        }
        
        if (distance < 60000) { // Less than 1 minute
            countdownContainer.style.animation = 'pulse 0.3s ease-in-out infinite';
            document.body.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #48dbfb 100%)';
        }
    } else {
        // Time's up! Show celebration
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        
        // Add celebration class
        container.classList.add('celebration');
        
        // Change the message
        const messageElement = document.querySelector('.message');
        messageElement.innerHTML = '🎉 Chúc mừng! Buổi kỷ niệm đã bắt đầu! 🎉<br/>Hãy tận hưởng những khoảnh khắc đáng nhớ!';
        messageElement.style.fontSize = '1.3rem';
        messageElement.style.fontWeight = '600';
        
        // Create confetti effect
        createConfetti();
        
        // Play celebration sound (optional)
        try {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAZBCOO0/HJ');
            audio.play().catch(() => {}); // Ignore errors if sound fails
        } catch (e) {
            // Audio not supported, ignore
        }
        
        // Add special effects every few seconds
        setInterval(() => {
            createConfetti();
        }, 5000);
    }
}

// Add smooth number transitions
function animateNumber(element, newValue) {
    const currentValue = parseInt(element.textContent);
    if (currentValue !== newValue) {
        element.style.transform = 'scale(1.2)';
        element.style.transition = 'transform 0.2s ease';
        setTimeout(() => {
            element.textContent = formatNumber(newValue);
            element.style.transform = 'scale(1)';
        }, 100);
    }
}

// Enhanced update function with animations
function updateCountdownAnimated() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        animateNumber(daysElement, days);
        animateNumber(hoursElement, hours);
        animateNumber(minutesElement, minutes);
        animateNumber(secondsElement, seconds);
        
        // Progressive urgency effects
        if (distance < 86400000) { // Less than 1 day
            document.querySelector('.countdown-container').style.animation = 'pulse 2s ease-in-out infinite';
        }
        
        if (distance < 3600000) { // Less than 1 hour
            document.querySelector('.countdown-container').style.animation = 'pulse 1s ease-in-out infinite';
            document.body.style.background = 'linear-gradient(135deg, #0a0a0a 0%, #2a2a2a 50%, #1a1a1a 100%)';
        }
        
        if (distance < 600000) { // Less than 10 minutes
            document.querySelector('.countdown-container').style.animation = 'pulse 0.5s ease-in-out infinite';
            document.body.style.background = 'linear-gradient(135deg, #2a1a1a 0%, #4a2a2a 50%, #3a2a2a 100%)';
        }
        
        if (distance < 60000) { // Less than 1 minute
            document.querySelector('.countdown-container').style.animation = 'pulse 0.3s ease-in-out infinite';
            document.body.style.background = 'linear-gradient(135deg, #b8860b 0%, #daa520 50%, #cd853f 100%)';
        }
    } else {
        // Time's up! Show celebration
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        
        // Add celebration class
        container.classList.add('celebration');
        
        // Change the message
        const messageElement = document.querySelector('.message');
        if (messageElement && !messageElement.classList.contains('celebration-message')) {
            messageElement.innerHTML = '🎉 Chúc mừng! Buổi kỷ niệm đã bắt đầu! 🎉<br/>Hãy tận hưởng những khoảnh khắc đáng nhớ bên bạn bè!';
            messageElement.style.fontSize = '1.3rem';
            messageElement.style.fontWeight = '600';
            messageElement.style.color = '#ffd700';
            messageElement.classList.add('celebration-message');
            
            // Create confetti effect
            createConfetti();
            
            // Add special effects every few seconds
            setInterval(() => {
                createConfetti();
            }, 8000);
        }
        
        // Change background to celebration colors
        document.body.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 25%, #b8860b 50%, #daa520 75%, #cd853f 100%)';
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'gradientShift 3s ease infinite';
    }
}

// Initialize countdown immediately
updateCountdownAnimated();

// Update countdown every second
setInterval(updateCountdownAnimated, 1000);

// Add some interactive effects
document.querySelectorAll('.time-box').forEach(box => {
    box.addEventListener('mouseenter', () => {
        box.style.transform = 'translateY(-10px) scale(1.05)';
        box.style.boxShadow = '0 15px 50px rgba(255, 255, 255, 0.2)';
        createMiniFirework(box);
    });
    
    box.addEventListener('mouseleave', () => {
        box.style.transform = 'translateY(0) scale(1)';
        box.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    });
});

// Create mini firework effect on hover
function createMiniFirework(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const spark = document.createElement('div');
        spark.style.position = 'fixed';
        spark.style.left = centerX + 'px';
        spark.style.top = centerY + 'px';
        spark.style.width = '3px';
        spark.style.height = '3px';
        spark.style.background = `hsl(${Math.random() * 360}, 80%, 70%)`;
        spark.style.borderRadius = '50%';
        spark.style.pointerEvents = 'none';
        spark.style.zIndex = '1000';
        
        const angle = (i / 12) * 2 * Math.PI;
        const distance = 50 + Math.random() * 30;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        spark.style.animation = `fireworkSpark 0.6s ease-out forwards`;
        spark.style.setProperty('--endX', endX + 'px');
        spark.style.setProperty('--endY', endY + 'px');
        
        document.body.appendChild(spark);
        
        setTimeout(() => {
            spark.remove();
        }, 600);
    }
}

// Add firework spark animation
const fireworkStyle = document.createElement('style');
fireworkStyle.textContent = `
    @keyframes fireworkSpark {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(calc(var(--endX) - 50vw), calc(var(--endY) - 50vh)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(fireworkStyle);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add some inspirational messages that change periodically
const inspirationalMessages = [
    "Hãy cùng nhau tái ngộ và chia sẻ những kỷ niệm đẹp!",
    "10 năm đã qua, tình bạn vẫn mãi trong tim mỗi người!",
    "Từ những ngày tháng học trò đến hôm nay, chúng ta đã trưởng thành!",
    "Gặp lại nhau để nhớ về những kỷ niệm đẹp nhất!",
    "Tuổi học trò ơi, sao mà đẹp đến thế!"
];

let messageIndex = 0;
setInterval(() => {
    const messageElement = document.querySelector('.message');
    if (messageElement && !messageElement.classList.contains('celebration-message')) {
        messageElement.style.opacity = '0';
        setTimeout(() => {
            messageElement.textContent = inspirationalMessages[messageIndex];
            messageElement.style.opacity = '1';
            messageIndex = (messageIndex + 1) % inspirationalMessages.length;
        }, 500);
    }
}, 10000); // Change message every 10 seconds

// Add touch support for mobile
document.addEventListener('touchstart', () => {}, { passive: true });

console.log('🎓 Countdown to Class 12C3 Reunion - Đại An High School');
console.log('Target: August 2, 2025 at 6:00 PM');
console.log('Created with ❤️ for the reunion celebration!');

// Music Player Functionality
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const repeatBtn = document.getElementById('repeatBtn');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');

let isPlaying = false;
let isRepeating = false;

// Format time function
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Play/Pause functionality
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        playIcon.style.display = 'flex';
        pauseIcon.style.display = 'none';
        isPlaying = false;
    } else {
        audioPlayer.play().catch(e => {
            console.log('Audio autoplay prevented:', e);
            // Show user that they need to interact first
        });
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'flex';
        isPlaying = true;
    }
});

// Repeat control
repeatBtn.addEventListener('click', () => {
    const outlineIcon = repeatBtn.querySelector('.repeat-icon-outline');
    const filledIcon = repeatBtn.querySelector('.repeat-icon-filled');
    
    if (isRepeating) {
        audioPlayer.loop = false;
        repeatBtn.classList.remove('repeat-active');
        outlineIcon.style.display = 'inline';
        filledIcon.style.display = 'none';
        isRepeating = false;
    } else {
        audioPlayer.loop = true;
        repeatBtn.classList.add('repeat-active');
        outlineIcon.style.display = 'none';
        filledIcon.style.display = 'inline';
        isRepeating = true;
    }
});



// Progress bar functionality
progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progressPercentage = clickX / rect.width;
    const newTime = progressPercentage * audioPlayer.duration;
    
    if (!isNaN(newTime)) {
        audioPlayer.currentTime = newTime;
    }
});

// Update progress and time
audioPlayer.addEventListener('timeupdate', () => {
    if (!isNaN(audioPlayer.duration)) {
        const progressPercentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progress.style.width = progressPercentage + '%';
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    }
});

// Load metadata
audioPlayer.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audioPlayer.duration);
});

// Handle audio end
audioPlayer.addEventListener('ended', () => {
    if (!isRepeating) {
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
        isPlaying = false;
        progress.style.width = '0%';
        currentTimeEl.textContent = '0:00';
    }
    // If repeating, the audio will automatically restart due to loop=true
});

// Handle audio error
audioPlayer.addEventListener('error', (e) => {
    console.log('Audio error:', e);
    document.querySelector('.song-title').textContent = 'File not found';
    document.querySelector('.song-artist').textContent = 'Please add TamBietNhe.mp3';
});

// Auto-play with user interaction (optional)
document.addEventListener('click', () => {
    if (audioPlayer.paused && !isPlaying) {
        // Don't auto-play, let user control
    }
}, { once: true });

// Add some interactive effects for music player
document.querySelector('.music-player').addEventListener('mouseenter', () => {
    if (isPlaying) {
        // Add subtle glow effect when playing
        document.querySelector('.music-player').style.boxShadow = '0 12px 40px rgba(74, 144, 226, 0.3)';
    }
});

document.querySelector('.music-player').addEventListener('mouseleave', () => {
    document.querySelector('.music-player').style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
});

// Function to update play/pause button state
function updatePlayPauseButton() {
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    
    if (audioPlayer.paused) {
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
        isPlaying = false;
    } else {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
        isPlaying = true;
    }
}

// Video Popup functionality
const infoBtn = document.getElementById('infoBtn');
const videoPopup = document.getElementById('videoPopup');
const videoCloseBtn = document.getElementById('videoCloseBtn');
const youtubeVideo = document.getElementById('youtubeVideo');
console.log('Elements found:', { infoBtn, videoPopup, videoCloseBtn, youtubeVideo });

// Check if all elements exist before adding event listeners
if (infoBtn && videoPopup && videoCloseBtn && youtubeVideo) {
    infoBtn.addEventListener('click', () => {
        console.log('Info button clicked!');
        videoPopup.classList.add('show');
        console.log('Video popup classes:', videoPopup.classList.toString());
        // Pause music when video opens
        if (!audioPlayer.paused) {
            audioPlayer.pause();
            updatePlayPauseButton();
        }
    });

    videoCloseBtn.addEventListener('click', () => {
        videoPopup.classList.remove('show');
        // Stop video when popup closes
        youtubeVideo.src = youtubeVideo.src;
    });

    // Close video popup when clicking outside
    videoPopup.addEventListener('click', (e) => {
        if (e.target === videoPopup) {
            videoPopup.classList.remove('show');
            youtubeVideo.src = youtubeVideo.src;
        }
    });

    // Close video popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoPopup.classList.contains('show')) {
            videoPopup.classList.remove('show');
            youtubeVideo.src = youtubeVideo.src;
        }
    });

} else {
    console.error('Some elements not found:', {
        infoBtn: !!infoBtn,
        videoPopup: !!videoPopup,
        videoCloseBtn: !!videoCloseBtn,
        youtubeVideo: !!youtubeVideo
    });
}

 
