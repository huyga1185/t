// Lấy các phần tử cần thiết từ HTML
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const seekBar = document.getElementById('seek-bar');
const volumeBar = document.getElementById('volume-bar');
const musicBar = document.getElementById('music-bar');
const currentSongTitle = document.getElementById('current-song-title');
const currentSongArtist = document.getElementById('current-song-artist');
const songPlayBtn = document.querySelectorAll('.play-btn');

// Tạo phần tử audio
const musicPlayer = document.createElement('audio');

// Mảng bài hát, cần cung cấp URL bài hát, tên bài hát và nghệ sĩ
let songs = [
    { url: 'path_to_song_1.mp3', title: 'Song 1', artist: 'Artist 1' },
    { url: 'path_to_song_2.mp3', title: 'Song 2', artist: 'Artist 2' },
    { url: 'path_to_song_3.mp3', title: 'Song 3', artist: 'Artist 3' },
];

// Biến theo dõi bài hát hiện tại
let currentSongIndex = 0;

// Lắng nghe sự kiện khi nhấn nút play
document.querySelectorAll('.play-btn').forEach(button => {
    button.addEventListener('click', function() {
        const songUrl = button.getAttribute('data-audio');
        const songTitle = button.getAttribute('data-title');
        const songArtist = button.getAttribute('data-artist');

        // Cập nhật thông tin bài hát hiện tại
        currentSongTitle.textContent = songTitle;
        currentSongArtist.textContent = songArtist;

        // Chơi bài hát
        musicPlayer.src = songUrl;
        musicPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        songPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
        // Hiện thanh điều khiển
        musicBar.classList.remove('hidden');
    });
});

// Điều khiển phát/pause
playPauseBtn.addEventListener('click', () => {
    if (musicPlayer.paused) {
        musicPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        musicPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

// Cập nhật thanh tiến độ
musicPlayer.addEventListener('timeupdate', () => {
    const progress = (musicPlayer.currentTime / musicPlayer.duration) * 100;
    seekBar.value = progress;
});

// Điều chỉnh thanh tiến độ khi người dùng thay đổi
seekBar.addEventListener('input', (event) => {
    const seekTime = (event.target.value / 100) * musicPlayer.duration;
    musicPlayer.currentTime = seekTime;
});

// Điều chỉnh âm lượng
volumeBar.addEventListener('input', (event) => {
    musicPlayer.volume = event.target.value / 100;
});

// Chuyển bài hát
nextBtn.addEventListener('click', () => {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) currentSongIndex = 0;
    musicPlayer.src = songs[currentSongIndex].url;
    musicPlayer.play();
});

// Quay lại bài hát trước
prevBtn.addEventListener('click', () => {
    currentSongIndex--;
    if (currentSongIndex < 0) currentSongIndex = songs.length - 1;
    musicPlayer.src = songs[currentSongIndex].url;
    musicPlayer.play();
});
