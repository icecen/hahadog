// Hahadog App Logic - Simulated Frontend Database using LocalStorage

class HahadogApp {
    constructor() {
        this.db = this.initDB();
        this.currentUser = this.db.currentUser ? this.db.users[this.db.currentUser] : null;
        this.initUI();
        this.bindEvents();
        this.renderVideos();
        this.updateUserUI();
    }

    initDB() {
        const defaultDB = {
            users: {},
            currentUser: null,
            videos: [
                {
                    id: 'v1',
                    userId: 'mockUser1',
                    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Mock
                    thumbnail: 'https://images.unsplash.com/photo-1585551896839-44ab065963b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // Standup comedy visual
                    title: '新加坡生活吐槽：安哥教我讲Singlish',
                    platform: 'YouTube',
                    duration: 4.5,
                    likes: 128,
                    favs: 45,
                    likedBy: [],
                    favBy: []
                },
                {
                    id: 'v2',
                    userId: 'mockUser2',
                    url: 'https://www.tiktok.com/@user/video/123',
                    thumbnail: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    title: '小红书上的相亲段子，笑不活了！',
                    platform: '小红书',
                    duration: 6.8,
                    likes: 85,
                    favs: 20,
                    likedBy: [],
                    favBy: []
                },
                {
                    id: 'v3',
                    userId: 'mockUser3',
                    url: 'https://wechat.com/video/123',
                    thumbnail: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    title: '职场脱口秀：老板的画饼技术',
                    platform: '视频号',
                    duration: 3.2,
                    likes: 310,
                    favs: 150,
                    likedBy: [],
                    favBy: []
                }
            ]
        };

        // Add some mock users
        defaultDB.users['mockUser1'] = { id: 'mockUser1', name: 'User1', points: 128 + 45 * 2 };
        defaultDB.users['mockUser2'] = { id: 'mockUser2', name: 'User2', points: 85 + 20 * 2 };
        defaultDB.users['mockUser3'] = { id: 'mockUser3', name: 'User3', points: 310 + 150 * 2 };

        const stored = localStorage.getItem('hahadog_db');
        if (stored) {
            return JSON.parse(stored);
        } else {
            this.saveDB(defaultDB);
            return defaultDB;
        }
    }

    saveDB(db = this.db) {
        localStorage.setItem('hahadog_db', JSON.stringify(db));
    }

    initUI() {
        // Modals
        this.loginModal = document.getElementById('login-modal');
        this.uploadModal = document.getElementById('upload-modal');
        
        // Buttons
        this.loginBtn = document.getElementById('login-btn');
        this.logoutBtn = document.getElementById('logout-btn');
        this.uploadFab = document.getElementById('upload-fab');
        
        // User Info
        this.userInfo = document.getElementById('user-info');
        this.userPoints = document.getElementById('user-points');
        this.userAvatar = document.getElementById('user-avatar');

        // Forms
        this.uploadForm = document.getElementById('upload-form');
        this.statusMsg = document.getElementById('upload-status');
        
        // Grid
        this.videoGrid = document.getElementById('video-grid');
    }

    bindEvents() {
        // Modal toggles
        this.loginBtn.addEventListener('click', () => this.loginModal.classList.add('active'));
        this.uploadFab.addEventListener('click', () => {
            if (!this.currentUser) {
                this.loginModal.classList.add('active');
            } else {
                this.uploadModal.classList.add('active');
            }
        });

        // Close buttons
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').classList.remove('active');
                this.statusMsg.textContent = '';
            });
        });

        // Click outside modal to close
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
                this.statusMsg.textContent = '';
            }
        });

        // Logout
        this.logoutBtn.addEventListener('click', () => this.logout());

        // Upload Form
        this.uploadForm.addEventListener('submit', (e) => this.handleUpload(e));
    }

    login(platform) {
        // Mocking authentication
        const mockNames = ['乐天派阿布', '星村搞笑担当', '哈哈怪', '坡县段子手'];
        const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
        const userId = 'user_' + Date.now();
        
        const newUser = {
            id: userId,
            name: `${randomName} (${platform})`,
            points: 0,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`
        };

        this.db.users[userId] = newUser;
        this.db.currentUser = userId;
        this.currentUser = newUser;
        this.saveDB();

        this.loginModal.classList.remove('active');
        this.updateUserUI();
    }

    logout() {
        this.db.currentUser = null;
        this.currentUser = null;
        this.saveDB();
        this.updateUserUI();
    }

    updateUserUI() {
        if (this.currentUser) {
            // Update points dynamically
            const actualUser = this.db.users[this.currentUser.id];
            
            this.loginBtn.style.display = 'none';
            this.userInfo.classList.remove('hidden');
            this.userPoints.textContent = actualUser.points;
            this.userAvatar.src = actualUser.avatar;
            this.uploadFab.textContent = '分享幽默视频 📺';
        } else {
            this.loginBtn.style.display = 'block';
            this.userInfo.classList.add('hidden');
            this.uploadFab.textContent = '登录以分享 📺';
        }
    }

    handleUpload(e) {
        e.preventDefault();
        
        const url = document.getElementById('video-url').value;
        const title = document.getElementById('video-title').value;
        const duration = parseFloat(document.getElementById('video-duration').value);

        this.statusMsg.className = 'status-message';
        this.statusMsg.textContent = '正在由算法验证视频...';

        // Simulate API call and algorithm
        setTimeout(() => {
            if (duration > 7) {
                this.statusMsg.classList.add('error');
                this.statusMsg.textContent = '❌ 验证失败：视频超过7分钟，算法已将其自动删除！请分享更简短的幽默。';
                this.uploadForm.classList.add('shake');
                setTimeout(() => this.uploadForm.classList.remove('shake'), 500);
                return;
            }

            // Determine Platform
            let platform = '其他';
            if (url.includes('youtube.com') || url.includes('youtu.be')) platform = 'YouTube';
            if (url.includes('tiktok.com')) platform = 'TikTok';
            if (url.includes('xiaohongshu.com')) platform = '小红书';
            if (url.includes('wechat') || url.includes('qq.com')) platform = '视频号';

            // Add video
            const newVideo = {
                id: 'v_' + Date.now(),
                userId: this.currentUser.id,
                url,
                title,
                platform,
                duration,
                likes: 0,
                favs: 0,
                likedBy: [],
                favBy: [],
                thumbnail: 'https://images.unsplash.com/photo-1527228117154-e910f540f588?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' // Random mic pic
            };

            this.db.videos.unshift(newVideo);
            this.saveDB();
            this.renderVideos();

            this.statusMsg.classList.add('success');
            this.statusMsg.textContent = '✅ 发布成功！感谢你传递乐观情绪！';

            setTimeout(() => {
                this.uploadModal.classList.remove('active');
                this.uploadForm.reset();
                this.statusMsg.textContent = '';
                this.statusMsg.className = 'status-message';
            }, 1500);

        }, 1500); // 1.5s simulated delay
    }

    renderVideos() {
        this.videoGrid.innerHTML = '';
        
        this.db.videos.forEach(video => {
            const card = document.createElement('div');
            card.className = 'video-card glass-effect popup-animation';
            
            const isLiked = this.currentUser && video.likedBy.includes(this.currentUser.id);
            const isFav = this.currentUser && video.favBy.includes(this.currentUser.id);

            card.innerHTML = `
                <div class="video-thumbnail">
                    <img src="${video.thumbnail}" alt="Thumbnail">
                    <div class="play-icon">▶</div>
                    <div class="duration-badge">${video.duration} min</div>
                </div>
                <div class="card-content">
                    <h4 class="card-title">${video.title}</h4>
                    <div class="card-meta">
                        <span class="card-platform">${video.platform}</span>
                    </div>
                    <div class="card-actions">
                        <button class="action-btn like ${isLiked ? 'active' : ''}" data-id="${video.id}">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z"/></svg>
                            <span>${video.likes}</span>
                        </button>
                        <button class="action-btn fav ${isFav ? 'active' : ''}" data-id="${video.id}">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/></svg>
                            <span>${video.favs}</span>
                        </button>
                    </div>
                </div>
            `;

            // Bind interactions
            const likeBtn = card.querySelector('.like');
            const favBtn = card.querySelector('.fav');

            likeBtn.addEventListener('click', () => this.handleInteraction(video.id, 'like'));
            favBtn.addEventListener('click', () => this.handleInteraction(video.id, 'fav'));

            this.videoGrid.appendChild(card);
        });
    }

    handleInteraction(videoId, type) {
        if (!this.currentUser) {
            this.loginModal.classList.add('active');
            return;
        }

        const video = this.db.videos.find(v => v.id === videoId);
        const uploader = this.db.users[video.userId];
        
        if (type === 'like') {
            const index = video.likedBy.indexOf(this.currentUser.id);
            if (index > -1) {
                video.likedBy.splice(index, 1);
                video.likes--;
                if(uploader) uploader.points -= 1;
            } else {
                video.likedBy.push(this.currentUser.id);
                video.likes++;
                if(uploader) uploader.points += 1;
            }
        } else if (type === 'fav') {
            const index = video.favBy.indexOf(this.currentUser.id);
            if (index > -1) {
                video.favBy.splice(index, 1);
                video.favs--;
                if(uploader) uploader.points -= 2; // Fav gives more points
            } else {
                video.favBy.push(this.currentUser.id);
                video.favs++;
                if(uploader) uploader.points += 2;
            }
        }

        this.saveDB();
        this.renderVideos();
        this.updateUserUI(); // Update UI in case the user liked their own video
    }
}

// Initialize App
const app = new HahadogApp();
