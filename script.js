/* --- VIDEO DATA & PLAYLIST LOGIC --- */
const main_video = document.querySelector('.main-video video');
const main_video_title = document.querySelector('.main-video .title');
const video_playlist = document.querySelector('.video-playlist .videos');

let data = [
    {
        id: 'a1',
        title: 'KHỞI ĐỘNG',
        description: 'Tiểu phẩm ATGT do các bạn lớp',
        name: 'video khoi dong.mp4',
        duration: '1:46',
    },
    {
        id: 'a2',
        title: 'HÌNH THÀNH KIẾN THỨC',
        description: 'Chia sẻ thực trạng ATGT',
        name: '6063243178659 video thực trạng tham gia giao thông- nhóm 1.mp4',
        duration: '1:19',
    },
    {
        id: 'a3',
        title: 'HÌNH THÀNH KIẾN THỨC 1',
        description: 'Phỏng vấn học sinh THPT Nguyễn Huệ',
        name: '6063243174851- vieo phỏng vấn HS đã đủ đk tham gia gt- nhóm 3.mp4',
        duration: '1:14',
    },
    {
        id: 'a4',
        title: 'HOẠT ĐỘNG HÌNH THÀNH KIẾN THỨC',
        description: 'Video phỏng vấn chuẩn bị khi tham gia giao thông',
        name: '6063243250988- video phỏng vấn chuẩn bị khi tham gia gt- nhóm 4.mp4',
        duration: '2:45',
    },
    {
        id: 'a5',
        title: 'HOẠT ĐỘNG HÌNH THÀNH KIẾN THỨC',
        description: 'Chia sẻ hình ảnh và phân tích biểu đồ',
        name: 'video ve phan tich.mp4',
        duration: '2:45',
    },
    {
        id: 'a6',
        title: 'HOẠT ĐỘNG HÌNH THÀNH KIẾN THỨC',
        description: 'Thuyết trình về trách nhiệm bản thân',
        name: 'video thuyet trinh.mp4',
        duration: '2:45',
    },
];

// 1. Generate Playlist
data.forEach((video, i) => {
    video_playlist.innerHTML += `
        <div class="video" data-id="${video.id}">
            <img src="images/play.svg" alt="">
            <p>${String(i + 1).padStart(2, '0')}.</p>
            <div class="text">
                <h3 class="title">${video.title}</h3>
                <p class="desc">${video.description}</p>
            </div>
            <p class="time">${video.duration}</p>
        </div>
    `;
});

// 2. Handle Video Clicks
const videos = document.querySelectorAll('.video');
// Set first video active
setActiveVideo(videos[0], data[0]);

videos.forEach(videoEl => {
    videoEl.addEventListener('click', () => {
        const videoData = data.find(v => v.id === videoEl.dataset.id);
        setActiveVideo(videoEl, videoData);
    });
});

function setActiveVideo(videoEl, videoData) {
    if(!videoEl) return;
    videos.forEach(v => {
        v.classList.remove('active');
        // Reset all icons to play
        let img = v.querySelector('img');
        if(img) img.src = 'images/play.svg'; 
    });

    videoEl.classList.add('active');
    // Set active icon to pause
    let img = videoEl.querySelector('img');
    if(img) img.src = 'images/pause.svg';

    main_video.src = `videos/${videoData.name}`;
    main_video_title.textContent = videoData.title;
}

// 3. Toggle Full Screen Video (Hamburger Menu)
const menuIcon = document.querySelector('.menu-icon');
const container = document.querySelector('.container');

if(menuIcon) {
    menuIcon.addEventListener('click', () => {
        container.classList.toggle('large-video');
    });
}


/* --- TAB SWITCHING LOGIC --- */
function openTab(tabName) {
    // Remove active class from buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    // Hide all contents
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Activate selected
    document.getElementById('tab-' + tabName).classList.add('active');
    // Highlight button (hacky way since we use onclick in HTML)
    const btns = document.querySelectorAll('.tab-btn');
    if(tabName === 'video') btns[0].classList.add('active');
    if(tabName === 'images') btns[1].classList.add('active');
}


/* --- LIGHTBOX (POPUP IMAGE) LOGIC --- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');
// Select all images inside cards
const allCardImages = document.querySelectorAll('.card img');

allCardImages.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.classList.add('active');
        lightboxImg.src = img.src;
    });
});

if(closeBtn) {
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
}

// Close when clicking outside image
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.classList.remove('active');
    }
});