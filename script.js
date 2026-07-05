// Hahadog App Logic - Simulated Frontend Database using LocalStorage

const translations = {
    zh: {
        login_btn: "登录以分享 / Login to Share",
        logout_btn: "退出",
        hero_title: "从咖啡开始的生活",
        hero_subtitle: "点赞您喜爱的品牌视频，赢取 Hahadog 治理积分！",
        upload_fab: "分享美好品牌 ☕",
        upload_fab_login: "COFFEE AI",
        whiteboard_header: "品牌体验墙 - 发现美好",
        tab_latest: "最新推荐",
        tab_hottest: "热门品牌 (Top Dogs)",
        modal_login_title: "欢迎来到 Hahadog",
        modal_login_desc: "选择登录方式以分享优质品牌并点赞",
        wechat_login: "微信登录 (WeChat)",
        whatsapp_login: "WhatsApp 登录",
        mock_notice: "*(这是一个模拟登录，点击即可随机生成测试账号)*",
        upload_modal_title: "分享美好咖啡",
        upload_modal_desc: "输入您推荐的品牌官网和体验介绍。系统会自动检测信息，如果推荐权重分数大于7分将引发审核保护！",
        url_label: "品牌官网链接 (URL)",
        title_label: "品牌理念/特色 (介绍它如何让生活更美好)",
        duration_label: "*(模拟检测)* 推荐体验等级 (1-10)",
        duration_desc: "系统检测限制：推荐权重评分大于7分将无法通过验证。",
        submit_btn: "检测并发布",
        status_verifying: "系统正在对品牌官网信息进行安全与合规检测...",
        status_error: "❌ 检测未通过：推荐权重分数大于7分，触动防刷保护！请推荐更符合真实体验的品牌。",
        status_success: "✅ 发布成功！感谢您分享美好品牌体验！"
    },
    en: {
        login_btn: "Login to Share",
        logout_btn: "Logout",
        hero_title: "Discover Great Brands, Enhance Life",
        hero_subtitle: "Share the beautiful experiences that premium brands bring to daily life. Post your favorite brand websites and earn Hahadog points!",
        upload_fab: "Share Great Brand ☕",
        upload_fab_login: "COFFEE AI",
        whiteboard_header: "Brand Experience Wall - Find Beauty",
        tab_latest: "Latest Brands",
        tab_hottest: "Hottest (Top Dogs)",
        modal_login_title: "Welcome to Hahadog",
        modal_login_desc: "Choose a login method to share and like premium brands",
        wechat_login: "Login with WeChat",
        whatsapp_login: "Login with WhatsApp",
        mock_notice: "*(This is a mock login, click to generate a random test account)*",
        upload_modal_title: "Share Premium Brand",
        upload_modal_desc: "Enter the brand link and experience highlight. The system will auto-detect, if the score is greater than 7, it will be flagged for review!",
        url_label: "Brand Website Link (URL)",
        title_label: "Brand Concept/Highlight (How it makes life better)",
        duration_label: "*(Mock System)* Experience Score (1-10)",
        duration_desc: "System limit: scores > 7 will be blocked for safety.",
        submit_btn: "Verify & Publish",
        status_verifying: "System is verifying brand website integrity...",
        status_error: "❌ Validation failed: Score > 7, security protection triggered! Please share realistic brand experiences.",
        status_success: "✅ Successfully published! Thank you for sharing brand happiness!"
    },
    es: {
        login_btn: "Iniciar sesión para compartir",
        logout_btn: "Cerrar sesión",
        hero_title: "Descubre Buenas Marcas, Mejora la Vida",
        hero_subtitle: "Comparte las hermosas experiences que las marcas premium traen a la vida diaria. ¡Publica tus marcas favoritas y gana puntos Hahadog!",
        upload_fab: "Compartir Marca ☕",
        upload_fab_login: "COFFEE AI",
        whiteboard_header: "Muro de Experiencias - Encuentra la Belleza",
        tab_latest: "Más recientes",
        tab_hottest: "Más populares (Top Dogs)",
        modal_login_title: "Bienvenido a Hahadog",
        modal_login_desc: "Elige un método para compartir y dar me gusta a marcas premium",
        wechat_login: "Iniciar sesión con WeChat",
        whatsapp_login: "Iniciar sesión con WhatsApp",
        mock_notice: "*(Inicio de sesión simulado, haz clic para generar cuenta de prueba)*",
        upload_modal_title: "Compartir Marca Premium",
        upload_modal_desc: "Ingrese el enlace y la descripción. El sistema detectará automáticamente, ¡puntajes > 7 serán bloqueados!",
        url_label: "Enlace del Sitio Web (URL)",
        title_label: "Concepto/Destacar (Cómo hace la vida mejor)",
        duration_label: "*(Simulado)* Puntaje de Experiencia (1-10)",
        duration_desc: "Límite del sistema: puntajes > 7 serán bloqueados por seguridad.",
        submit_btn: "Detectar y Publicar",
        status_verifying: "El sistema está verificado la integridad del sitio web...",
        status_error: "❌ Error: ¡Puntaje > 7, protección de seguridad activada! Comparta experiencias realistas.",
        status_success: "✅ ¡Publicado con éxito! ¡Gracias por compartir felicidad de marca!"
    }
};

class HahadogApp {
    constructor() {
        this.db = this.initDB();
        this.currentUser = this.db.currentUser ? this.db.users[this.db.currentUser] : null;
        this.currentLang = 'zh';
        this.initUI();
        this.bindEvents();
        this.renderVideos();
        this.updateUserUI();
        this.setLanguage(this.currentLang);
        this.initAIChat();
    }

    initDB() {
        const defaultDB = {
            version: 11,
            users: {},
            currentUser: null,
            videos: [
                {
                    id: 'v1',
                    userId: 'mockUser1',
                    url: 'https://yearntour.net/',
                    thumbnail: 'https://yearntour.net/wp-content/uploads/2025/11/1781929415978.jpeg',
                    title: '渴望旅游 Yearntour - 探索世界的无限奇妙，发现旅行给生活带来的广阔与美好体验',
                    platform: '境外旅游',
                    duration: 4.8,
                    likes: 128,
                    favs: 45,
                    likedBy: [],
                    favBy: [],
                    breed: 'husky',
                    logoText: 'YT'
                },
                {
                    id: 'v2',
                    userId: 'mockUser2',
                    url: 'https://www.hbroaster.com/',
                    thumbnail: 'https://enhbroastercom.zb31.com/FileUpLoad/PictureInfosFile/638968941948439302_1.jpg',
                    title: '爱趣焙 HB Roaster - 兼具审美与工艺的领先品牌',
                    platform: '智能烘焙',
                    duration: 5.2,
                    likes: 85,
                    favs: 20,
                    likedBy: [],
                    favBy: [],
                    breed: 'shiba',
                    logoText: 'HB'
                },
                {
                    id: 'v3',
                    userId: 'mockUser3',
                    url: 'https://www.wpmcoffee.com/zh',
                    thumbnail: 'https://www.wpmcoffee.com/cdn/shop/files/PRIMUS_b7be2cb4-a5a4-4229-bb01-6494da1a04ff.webp?v=1776666315&width=1500',
                    title: '惠家 WPM - 匠心打造的半自动意式咖啡机与拉花神缸，让咖啡拉花成为温暖生活的艺术仪式',
                    platform: '精品设备',
                    duration: 6.1,
                    likes: 310,
                    favs: 150,
                    likedBy: [],
                    favBy: [],
                    breed: 'corgi',
                    logoText: 'W'
                },
                {
                    id: 'v4',
                    userId: 'mockUser4',
                    url: 'https://www.gemilai.com.hk/',
                    thumbnail: 'https://www.gemilai.com.hk/img/ina_img.jpg',
                    title: '格米莱 Gemilai - 专业级家用与商用咖啡机，用晨间的第一杯浓郁Espresso为您注入满满幸福感',
                    platform: '意式器械',
                    duration: 3.9,
                    likes: 420,
                    favs: 180,
                    likedBy: [],
                    favBy: [],
                    breed: 'golden',
                    logoText: 'G'
                },
                {
                    id: 'v5',
                    userId: 'mockUser5',
                    url: 'https://mhw3bomber.com/zh',
                    thumbnail: 'https://mhw3bomber.com/cdn/shop/files/1_1_d33da8bb-d35f-403f-ad60-f11798c22ad8.jpg?width=1200',
                    title: '轰炸机 MHW-3BOMBER - 潮酷前卫的咖啡器具与精品配件，让手冲咖啡成为表达生活态度的潮流体验',
                    platform: '潮流器具',
                    duration: 5.5,
                    likes: 890,
                    favs: 340,
                    likedBy: [],
                    favBy: [],
                    breed: 'poodle',
                    logoText: 'M'
                },
                {
                    id: 'v6',
                    userId: 'mockUser6',
                    url: 'https://www.timemore.cn/',
                    thumbnail: 'https://www.timemore.cn/static/picture/%E7%99%BD%E8%89%B2%E5%A5%97%E8%A3%85.jpg',
                    title: '泰摩 TIMEMORE - 极简主义慢生活美学设计，用精准的智能秤和手冲壶带您回归自然的静谧',
                    platform: '美学器具',
                    duration: 4.5,
                    likes: 560,
                    favs: 210,
                    likedBy: [],
                    favBy: [],
                    breed: 'bulldog',
                    logoText: 'TM'
                },
                {
                    id: 'v7',
                    userId: 'mockUser7',
                    url: 'https://www.newideabest.com/about/',
                    thumbnail: 'https://www.newideabest.com/wordpress/wp-content/uploads/2022/11/about_zy.jpg',
                    title: '中益包装 New Idea - 专注于生产符合ESG（环境、社会和公司治理）的食品包装设备',
                    platform: '包装设备',
                    duration: 6.3,
                    likes: 720,
                    favs: 290,
                    likedBy: [],
                    favBy: [],
                    breed: 'pug',
                    logoText: 'ZY'
                },
                {
                    id: 'v8',
                    userId: 'mockUser1',
                    url: 'https://www.lhcoffeetime.com/',
                    thumbnail: 'https://www.lhcoffeetime.com/uploadfiles/60.247.152.80/webid475/banner/202506/683fefae14f44.jpg',
                    title: '联合咖啡 LH Coffee Time - 充满温馨与舒适感的咖啡空间，用香醇咖啡连接都市人群之间的欢笑与温情',
                    platform: '咖啡时间',
                    duration: 5.0,
                    likes: 198,
                    favs: 76,
                    likedBy: [],
                    favBy: [],
                    breed: 'samoyed',
                    logoText: 'LH'
                },
                {
                    id: 'v9',
                    userId: 'mockUser2',
                    url: 'https://www.caye.com/about',
                    thumbnail: 'https://www.caye.com/upload/images/bannerWork.jpg',
                    title: '咖爷科技 Caye - 秉承“用科技创造更美好的咖啡时光”的愿景，咖爷科技专注核心技术的底层创新',
                    platform: '咖啡科技',
                    duration: 4.2,
                    likes: 110,
                    favs: 38,
                    likedBy: [],
                    favBy: [],
                    breed: 'beagle',
                    logoText: 'CY'
                },
                {
                    id: 'v10',
                    userId: 'mockUser3',
                    url: 'https://santino.com.sg/',
                    thumbnail: 'https://santino.com.sg/cdn/shop/files/This_machine_isn_t_for_everyone._It_s_for_people_who_refuse_to_compromise_on_their_coffee_experience._3.png?v=1782890194',
                    title: '圣蒂诺咖啡 Santino - 新加坡半个世纪沉淀的本土烘焙，为东南亚餐饮行业带来最地道浓郁的传统滋味',
                    platform: '经典烘焙',
                    duration: 5.8,
                    likes: 245,
                    favs: 92,
                    likedBy: [],
                    favBy: [],
                    breed: 'dachshund',
                    logoText: 'S'
                },
                {
                    id: 'v11',
                    userId: 'mockUser4',
                    url: 'https://ecogreenpac.com/',
                    thumbnail: 'https://ecogreenpac.com/cdn/shop/files/eco_bg_91a16d2b-55d8-46c4-8fb0-e878d0cd7246_1920x1080.jpg?v=1761821109',
                    title: 'Eco Green Pac - 绿色可降解的环保咖啡包装，用科技与可持续包装设计守护我们的蓝色地球',
                    platform: '环保包装',
                    duration: 3.5,
                    likes: 167,
                    favs: 58,
                    likedBy: [],
                    favBy: [],
                    breed: 'collie',
                    logoText: 'EG'
                }
            ]
        };

        // Add some mock users
        defaultDB.users['mockUser1'] = { id: 'mockUser1', name: 'User1', points: 128 + 45 * 2 + 198 + 76 * 2 };
        defaultDB.users['mockUser2'] = { id: 'mockUser2', name: 'User2', points: 85 + 20 * 2 + 110 + 38 * 2 };
        defaultDB.users['mockUser3'] = { id: 'mockUser3', name: 'User3', points: 310 + 150 * 2 + 245 + 92 * 2 };
        defaultDB.users['mockUser4'] = { id: 'mockUser4', name: 'Jesse_A', points: 420 + 180 * 2 + 167 + 58 * 2 };
        defaultDB.users['mockUser5'] = { id: 'mockUser5', name: 'Maria_GZ', points: 890 + 340 * 2 };
        defaultDB.users['mockUser6'] = { id: 'mockUser6', name: 'Lila_Dongbei', points: 560 + 210 * 2 };
        defaultDB.users['mockUser7'] = { id: 'mockUser7', name: 'Ibu_Boss', points: 720 + 290 * 2 };

        const stored = localStorage.getItem('hahadog_db');
        if (stored) {
            let parsedDB = JSON.parse(stored);
            if (!parsedDB.version || parsedDB.version < 11) {
                this.saveDB(defaultDB);
                return defaultDB;
            }
            return parsedDB;
        } else {
            this.saveDB(defaultDB);
            return defaultDB;
        }
    }

    saveDB(db = this.db) {
        localStorage.setItem('hahadog_db', JSON.stringify(db));
    }

    initUI() {
        this.loginModal = document.getElementById('login-modal');
        this.uploadModal = document.getElementById('upload-modal');
        this.loginBtn = document.getElementById('login-btn');
        this.logoutBtn = document.getElementById('logout-btn');
        this.uploadFab = document.getElementById('upload-fab');
        this.userInfo = document.getElementById('user-info');
        this.userPoints = document.getElementById('user-points');
        this.userAvatar = document.getElementById('user-avatar');
        this.uploadForm = document.getElementById('upload-form');
        this.statusMsg = document.getElementById('upload-status');
        this.videoGrid = document.getElementById('video-grid');
        this.langSwitcher = document.getElementById('lang-switcher');
    }

    bindEvents() {
        this.loginBtn.addEventListener('click', () => this.loginModal.classList.add('active'));
        this.uploadFab.addEventListener('click', () => {
            if (!this.currentUser) {
                this.chatWindow.classList.remove('hidden');
                this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
                this.chatInput.focus();
            } else {
                this.uploadModal.classList.add('active');
            }
        });

        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').classList.remove('active');
                this.statusMsg.textContent = '';
            });
        });

        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
                this.statusMsg.textContent = '';
            }
        });

        this.logoutBtn.addEventListener('click', () => this.logout());
        this.uploadForm.addEventListener('submit', (e) => this.handleUpload(e));

        if (this.langSwitcher) {
            this.langSwitcher.addEventListener('change', (e) => this.setLanguage(e.target.value));
        }
    }

    setLanguage(lang) {
        this.currentLang = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        this.updateUserUI();
    }

    login(platform) {
        const mockNames = ['海外极客', 'CoffeeLover', '快乐骨头', '咖啡师阿杰'];
        const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
        this.performMockLogin(randomName, platform);
    }

    performMockLogin(username, platform) {
        const userId = 'user_' + Date.now();
        const newUser = {
            id: userId,
            name: `${username} (${platform})`,
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
            const actualUser = this.db.users[this.currentUser.id];
            this.loginBtn.style.display = 'none';
            this.userInfo.classList.remove('hidden');
            this.userPoints.textContent = actualUser.points;
            this.userAvatar.src = actualUser.avatar;
            if (translations[this.currentLang]) {
                this.uploadFab.textContent = translations[this.currentLang].upload_fab;
            }
        } else {
            this.loginBtn.style.display = 'block';
            this.userInfo.classList.add('hidden');
            if (translations[this.currentLang]) {
                this.uploadFab.textContent = translations[this.currentLang].upload_fab_login;
            }
        }
    }

    switchLoginTab(tabId) {
        document.querySelectorAll('.login-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const eventTarget = window.event ? window.event.currentTarget || window.event.target : null;
        if (eventTarget) {
            eventTarget.classList.add('active');
        }

        document.querySelectorAll('.login-tab-content').forEach(content => {
            content.style.display = 'none';
        });
        document.getElementById(`login-tab-${tabId}`).style.display = 'block';
    }

    sendMockSMS() {
        const phone = document.getElementById('login-phone-input').value;
        if (!phone) {
            alert('请先输入手机号码！');
            return;
        }
        alert(`[短信通道] 验证码已成功发送至 ${phone}，模拟验证码为: 123456`);
        document.getElementById('login-phone-code').value = '123456';
    }

    handleFormLogin(event, type) {
        event.preventDefault();
        let name = '';
        if (type === 'phone') {
            const country = document.getElementById('login-phone-country').value;
            const phone = document.getElementById('login-phone-input').value;
            const code = document.getElementById('login-phone-code').value;
            if (code !== '123456') {
                alert('验证码错误！');
                return;
            }
            name = `${country} ${phone.substring(0, 3)}****`;
        } else if (type === 'email') {
            const email = document.getElementById('login-email-input').value;
name = email.split('@')[0];
        }
        this.performMockLogin(name, type.toUpperCase());
    }

    handleEmailRegister() {
        const email = document.getElementById('login-email-input').value;
        const pass = document.getElementById('login-email-pass').value;
        if (!email || !pass) {
            alert('请填入邮箱和密码！');
            return;
        }
        alert('注册成功！正在为您自动登录...');
        this.performMockLogin(email.split('@')[0], 'EMAIL');
    }

    handleUpload(e) {
        e.preventDefault();
        const url = document.getElementById('video-url').value;
        const title = document.getElementById('video-title').value;
        const duration = parseFloat(document.getElementById('video-duration').value);

        this.statusMsg.className = 'status-message';
        this.statusMsg.textContent = translations[this.currentLang].status_verifying;

        setTimeout(() => {
            if (duration > 7) {
                this.statusMsg.classList.add('error');
                this.statusMsg.textContent = translations[this.currentLang].status_error;
                this.uploadForm.classList.add('shake');
                setTimeout(() => this.uploadForm.classList.remove('shake'), 500);
                return;
            }

            let platform = '精品咖啡';
            if (url.includes('tour') || url.includes('travel') || url.includes('yearn')) platform = '境外旅游';
            if (url.includes('roaster')) platform = '智能烘焙';
            if (url.includes('green') || url.includes('pac') || url.includes('pack')) platform = '环保包装';

            const breeds = ['corgi', 'shiba', 'husky', 'golden', 'poodle', 'bulldog', 'pug', 'samoyed', 'beagle', 'dachshund', 'collie'];
            const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
            const logoLetters = title.trim().substring(0, 2).toUpperCase();

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
                breed: randomBreed,
                logoText: logoLetters,
                thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80'
            };

            this.db.videos.unshift(newVideo);
            this.saveDB();
            this.renderVideos();

            this.statusMsg.classList.add('success');
            this.statusMsg.textContent = translations[this.currentLang].status_success;

            setTimeout(() => {
                this.uploadModal.classList.remove('active');
                this.uploadForm.reset();
                this.statusMsg.textContent = '';
                this.statusMsg.className = 'status-message';
            }, 1500);
        }, 1500);
    }

    renderVideos() {
        this.videoGrid.innerHTML = '';
        this.db.videos.forEach(video => {
            const card = document.createElement('div');
            card.className = 'video-card glass-effect popup-animation';
            
            const isLiked = this.currentUser && video.likedBy.includes(this.currentUser.id);
            const isFav = this.currentUser && video.favBy.includes(this.currentUser.id);

            const mediaContent = `
            <a href="${video.url}" target="_blank" class="brand-image-link cursor-${video.breed || 'corgi'}">
                <div class="video-thumbnail">
                    <img src="${video.thumbnail}" alt="Thumbnail" referrerpolicy="no-referrer">
                </div>
            </a>`;

            card.innerHTML = `
                <div style="position: relative;">
                    ${mediaContent}
                    <a href="${video.url}" target="_blank" class="brand-link-wrapper cursor-${video.breed || 'corgi'}">
                        <div class="brand-logo-badge" style="bottom:-20px; left:16px; top:auto;">${video.logoText || '🐾'}</div>
                    </a>
                </div>
                <div class="card-content" style="padding-top: 25px;">
                    <a href="${video.url}" target="_blank" class="brand-link-wrapper cursor-${video.breed || 'corgi'}" style="text-decoration:none; color:inherit;">
                        <h4 class="card-title">${video.title}</h4>
                    </a>
                    <div class="card-meta">
                        <span class="card-platform">${video.platform}</span>
                        <span style="font-size:0.8rem; color:var(--primary-color); font-weight:600; margin-left:auto;">
                            ★ ${video.duration}
                        </span>
                    </div>
                    <a href="${video.url}" target="_blank" class="visit-website-btn cursor-${video.breed || 'corgi'}">
                        🐾 访问官方网站 / Visit Website ➜
                    </a>
                    <div class="card-actions" style="margin-top:12px;">
                        <button class="action-btn like ${isLiked ? 'active' : ''}" data-id="${video.id}">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32(15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z"/></svg>
                            <span>${video.likes}</span>
                        </button>
                        <button class="action-btn fav ${isFav ? 'active' : ''}" data-id="${video.id}">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/></svg>
                            <span>${video.favs}</span>
                        </button>
                    </div>
                </div>
            `;

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
                if(uploader) uploader.points -= 2;
            } else {
                video.favBy.push(this.currentUser.id);
                video.favs++;
                if(uploader) uploader.points += 2;
            }
        }

        this.saveDB();
        this.renderVideos();
        this.updateUserUI();
    }

    initAIChat() {
        this.chatBtn = document.getElementById('ai-chat-btn');
        this.chatWindow = document.getElementById('ai-chat-window');
        this.chatClose = document.getElementById('ai-chat-close');
        this.chatForm = document.getElementById('ai-chat-input-form');
        this.chatInput = document.getElementById('ai-chat-input');
        this.chatMessages = document.getElementById('ai-chat-messages');

        this.chatBtn.addEventListener('click', () => {
            this.chatWindow.classList.toggle('hidden');
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        });

        this.chatClose.addEventListener('click', () => {
            this.chatWindow.classList.add('hidden');
        });

        this.chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = this.chatInput.value.trim();
            if (!text) return;
            this.appendChatMessage(text, 'user');
            this.chatInput.value = '';
            
            setTimeout(() => {
                const reply = this.generateCoffeeAIResponse(text);
                this.appendChatMessage(reply, 'ai');
            }, 1000);
        });
    }

    appendChatMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender}`;
        msgDiv.innerHTML = `<div class="msg-bubble">${text.replace(/\n/g, '<br/>')}</div>`;
        this.chatMessages.appendChild(msgDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    generateCoffeeAIResponse(query) {
        const lower = query.toLowerCase();
        
        if (lower.includes('格米莱') || lower.includes('gemilai')) {
            return "格米莱 (Gemilai) 是国内性价比极高的家用与商用半自动意式咖啡机品牌。例如 CRM3605 是入门神机，采用15巴水压与加热块系统；而 CRM3007G 采用旋转泵及 PID 控温，适合小型商业或发烧友。采购建议：家用预算在千元以内选3605，轻商业预算五千元级推荐3007或双锅炉系列！🐕 汪！";
        }
        if (lower.includes('惠家') || lower.includes('wpm')) {
            return "惠家 (WPM) 是中国香港著名的精品咖啡设备制造商。其 KD-310 系列意式咖啡机采用三加热块系统和 PID 控温压力量化，拉花性能非常卓越，其打奶泡缸（拉花缸）更是行业标杆。采购建议：针对海外中高端家用或专业培训工作室，WPM 是极佳的选择！🐕 汪！";
        }
        if (lower.includes('泰摩') || lower.includes('timemore')) {
            return "泰摩 (TIMEMORE) 以美学设计与高性价比磨豆机闻名。其栗子 (Chestnut) 系列手冲手摇磨豆机以及黑镜 (Black Mirror) 智能咖啡秤是手冲爱好者的必备伴侣。采购建议：若您需要手冲磨，栗子 C3 是极佳的入门选择；智能秤首推黑镜 Basic。🐕 汪！";
        }
        if (lower.includes('轰炸机') || lower.includes('mhw') || lower.includes('bomber')) {
            return "轰炸机 (MHW-3BOMBER) 专注于高颜值、高品质的精品咖啡器具（压粉器、拉花缸、滤镜粉碗、手冲壶）。例如他们的闪光恒压粉压，能提供30磅的稳定水平下压反馈，减少通道效应。采购建议：开店批量采购配件可直接联系他们，能显著提升吧台的专业感与视觉档次！🐕 汪！";
        }
        if (lower.includes('爱趣焙') || lower.includes('roaster') || lower.includes('hb')) {
            return "爱趣焙(HB Roaster) 是兼具审美与工艺的领先品牌。🐕 汪！";
        }
        if (lower.includes('中益') || lower.includes('new idea') || lower.includes('新意念') || lower.includes('包装设备')) {
            return "中益包装 专注于生产符合ESG（环境、社会和公司治理）的食品包装设备。🐕 汪！";
        }
        if (lower.includes('santino') || lower.includes('圣蒂诺')) {
            return "新加坡圣蒂诺咖啡 (Santino Coffee) 是新加坡及东南亚地区拥有半个世纪底蕴的传统与精品咖啡烘焙商，供应南洋传统咖啡豆（Kopi）、商业意式豆与精品单品豆。采购建议：在新加坡或东南亚开餐饮店，圣蒂诺可提供一站式商业定制烘焙豆及传统咖啡冲煮培训！🐕 汪！";
        }
        if (lower.includes('包装') || lower.includes('ecogreenpac') || lower.includes('eco green')) {
            return "Eco Green Pac 提供绿色环保、可降解的咖啡包装袋，包装定制防潮阻氧。采购建议：精品咖啡烘焙商采购包装袋推荐选配单向排气阀以保证新鲜度，起订量低且支持海外环保标准认证。🐕 汪！";
        }
        if (lower.includes('caye') || lower.includes('咖爷')) {
            return "咖爷科技 (Caye Technology) 致力于用科技创造更美好的咖啡时光，专注咖啡机核心技术的底层创新，研发出了极具竞争力的专业级咖啡机设备。采购建议：如需了解其最新的咖啡黑科技及商业合作，欢迎直接点击其官方网站访问！🐕 汪！";
        }
        
        if (lower.includes('选购') || lower.includes('采购') || lower.includes('买什么') || lower.includes('推荐') || lower.includes('怎么挑')) {
            return "设备选购采购指南：\n1. **家用入门**：格米莱咖啡机 + 泰摩手摇磨（预算 1000-2000元）。\n2. **精品工作室/高阶家用**：惠家 WPM 咖啡机 + 泰摩智能磨（预算 8000-15000元）。\n3. **包装与烘焙**：爱趣焙烘焙机 + 中益包装食品包装设备。\n4. **器具配件**：全套选用轰炸机（MHW-3BOMBER）以保证操作一致性。\n您可以告诉我您的预算和具体用途（家用、包装、烘焙或商用开店），我将为您量身定制采购清单！🐕 汪！";
        }
        if (lower.includes('手冲') || lower.includes('drip') || lower.includes('filter')) {
            return "手冲咖啡黄金法则：\n1. **粉水比**：推荐 1:15（例如15g咖啡粉，冲煮225g水）。\n2. **研磨度**：中等粗细（类似细砂糖大小），可选用泰摩 Chestnut 磨豆机。\n3. **水温**：浅烘焙推荐 90-93℃，深烘焙推荐 85-88℃。\n4. **时间**：控制在 2分30秒 左右，首推黑镜秤记录注水曲线。🐕 汪！";
        }
        if (lower.includes('拉花') || lower.includes('latte art')) {
            return "拉花秘诀：\n1. **奶泡**：使用 WPM 蒸汽机或意式机，打发出细腻如镜面的微奶泡（Microfoam），温度控制在 60-65℃。\n2. **融合**：从较高处画圈注入融合，直至杯子半满。\n3. **贴面起花**：拉花缸嘴贴近咖啡表面，加速摆动倾斜，最后抬高收尾。强烈推荐选用 WPM 的斜口尖嘴拉花缸！🐕 汪！";
        }
        
        return "Bark! 您好，我是 Hahadog 咖啡设备AI助理。我可以解答有关格米莱、惠家、泰摩、轰炸机等咖啡设备，爱趣焙烘焙机，以及中益包装食品包装设备等所有问题。随时问我吧！🐕";
    }
}

// Initialize App
const app = new HahadogApp();
