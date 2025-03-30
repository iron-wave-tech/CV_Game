export class AudioManager {
    constructor() {
        // Commented out sound initialization for now
        /*
        this.sounds = {
            shoot: new Audio(`${process.env.BASE_URL}sounds/shoot.wav`),
            explosion: new Audio(`${process.env.BASE_URL}sounds/explosion.wav`),
            milestone: new Audio(`${process.env.BASE_URL}sounds/milestone.wav`),
            gameOver: new Audio(`${process.env.BASE_URL}sounds/gameover.wav`)
        };

        // Background music
        this.bgMusic = new Audio(`${process.env.BASE_URL}sounds/background.mp3`);
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.3;

        // Set volume for all sound effects
        Object.values(this.sounds).forEach(sound => {
            sound.volume = 0.2;
        });
        */

        // Initialize audio context for Web Audio API
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.gainNode = this.audioContext.createGain();
        this.gainNode.connect(this.audioContext.destination);
    }

    startBackgroundMusic() {
        // Commented out background music start
        /*
        if (this.bgMusic) {
            this.bgMusic.play().catch(error => {
                console.log('Background music playback failed:', error);
            });
        }
        */
    }

    playSound(soundName) {
        // Commented out sound playback
        /*
        if (this.sounds[soundName]) {
            this.sounds[soundName].currentTime = 0;
            this.sounds[soundName].play().catch(error => {
                console.log(`Sound ${soundName} playback failed:`, error);
            });
        }
        */
    }

    stopBackgroundMusic() {
        // Commented out background music stop
        /*
        if (this.bgMusic) {
            this.bgMusic.pause();
            this.bgMusic.currentTime = 0;
        }
        */
    }

    setVolume(volume) {
        // Commented out volume control
        /*
        if (this.gainNode) {
            this.gainNode.gain.value = volume;
        }
        if (this.bgMusic) {
            this.bgMusic.volume = volume * 0.3;
        }
        Object.values(this.sounds).forEach(sound => {
            sound.volume = volume * 0.2;
        });
        */
    }

    // Create a retro-style sound effect using Web Audio API
    createRetroSound(frequency, duration) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + duration);
    }
} 