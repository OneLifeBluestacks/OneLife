document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#8a2be2"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#8a2be2",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        notification.innerHTML = '';
        
        const icon = document.createElement('i');
        if (type === 'success') {
            icon.className = 'fas fa-check-circle';
            notification.style.backgroundColor = '#4CAF50';
        } else if (type === 'error') {
            icon.className = 'fas fa-exclamation-circle';
            notification.style.backgroundColor = '#F44336';
        } else {
            icon.className = 'fas fa-info-circle';
            notification.style.backgroundColor = '#8a2be2';
        }
        
        notification.appendChild(icon);
        notification.appendChild(document.createTextNode(message));
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Navigation functionality
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Check if user is logged in (simulated)
    let isLoggedIn = false;
    let currentUser = null;

    // Simulated user data
    const simulatedUsers = [
        { username: 'test', password: 'test', key: null, regDate: '2023-01-01', hwid: 'ABCD-1234-EFGH-5678' }
    ];

    // Show section function
    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            }
        });
    }

    // Navigation event listeners
    navLinks.forEach(link => {
        if (link.dataset.section) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.dataset.section;
                
                if (sectionId === 'profile' && !isLoggedIn) {
                    document.getElementById('login-modal').style.display = 'block';
                    showNotification('Пожалуйста, войдите в аккаунт', 'error');
                    return;
                }
                
                showSection(sectionId);
            });
        }
    });

    // Hero buttons
    document.getElementById('buy-now-btn').addEventListener('click', (e) => {
        e.preventDefault();
        showSection('shop');
    });

    document.getElementById('free-version-btn').addEventListener('click', (e) => {
        e.preventDefault();
        window.open('https://t.me/onelifebs', '_blank');
    });

    // Modal functionality
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const activateKeyBtn = document.getElementById('activate-key-btn');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const keyModal = document.getElementById('key-modal');
    const closeButtons = document.querySelectorAll('.close');
    const logoutBtn = document.getElementById('logout-btn');

    // Show modals
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    registerBtn.addEventListener('click', () => {
        registerModal.style.display = 'block';
    });

    // Activate key button
    if (activateKeyBtn) {
        activateKeyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (isLoggedIn) {
                keyModal.style.display = 'block';
            } else {
                loginModal.style.display = 'block';
                showNotification('Пожалуйста, войдите в аккаунт', 'error');
            }
        });
    }

    // Close modals
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Login form
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = e.target[0].value;
        const password = e.target[1].value;
        
        // Simulate login
        const user = simulatedUsers.find(u => u.username === username && u.password === password);
        if (user) {
            isLoggedIn = true;
            currentUser = user;
            loginModal.style.display = 'none';
            updateAuthButtons();
            updateProfileInfo();
            showSection('profile');
            showNotification('Вход выполнен успешно!', 'success');
        } else {
            showNotification('Неверный никнейм или пароль!', 'error');
        }
    });

    // Register form
    document.getElementById('register-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = e.target[0].value;
        const password = e.target[1].value;
        const confirmPassword = e.target[2].value;
        
        if (password !== confirmPassword) {
            showNotification('Пароли не совпадают!', 'error');
            return;
        }
        
        // Simulate registration
        if (simulatedUsers.some(u => u.username === username)) {
            showNotification('Этот никнейм уже занят!', 'error');
            return;
        }
        
        const newUser = {
            username,
            password,
            key: null,
            regDate: new Date().toLocaleDateString(),
            hwid: generateHWID()
        };
        
        simulatedUsers.push(newUser);
        isLoggedIn = true;
        currentUser = newUser;
        registerModal.style.display = 'none';
        updateAuthButtons();
        updateProfileInfo();
        showSection('profile');
        showNotification('Регистрация прошла успешно!', 'success');
    });

    // Key activation form
    document.getElementById('key-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const key = e.target[0].value;
        
        // Simulate key activation
        if (key.length === 16) {
            currentUser.key = key;
            
            // Set key expiry based on key prefix (simulated)
            if (key.startsWith('MON')) {
                currentUser.keyExpiry = '1 месяц';
            } else if (key.startsWith('TRI')) {
                currentUser.keyExpiry = '3 месяца';
            } else if (key.startsWith('LIF')) {
                currentUser.keyExpiry = 'Навсегда';
            } else {
                currentUser.keyExpiry = 'Неизвестно';
            }
            
            keyModal.style.display = 'none';
            updateProfileInfo();
            showNotification('Ключ успешно активирован!', 'success');
        } else {
            showNotification('Неверный формат ключа! Должно быть 16 символов', 'error');
        }
    });

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            isLoggedIn = false;
            currentUser = null;
            updateAuthButtons();
            showSection('home');
            showNotification('Вы успешно вышли из аккаунта', 'info');
        });
    }

    // Buy buttons
    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (isLoggedIn) {
                showNotification('После оплаты вам будет выдан ключ активации', 'info');
            } else {
                showNotification('Пожалуйста, войдите или зарегистрируйтесь для покупки', 'error');
                loginModal.style.display = 'block';
            }
        });
    });

    // Helper functions
    function updateAuthButtons() {
        const authButtons = document.querySelector('.auth-buttons');
        if (isLoggedIn) {
            authButtons.innerHTML = `
                <button id="profile-btn" class="holographic-btn">
                    <i class="fas fa-user"></i> ${currentUser.username}
                </button>
            `;
            document.getElementById('profile-btn').addEventListener('click', () => {
                updateProfileInfo();
                showSection('profile');
            });
        } else {
            authButtons.innerHTML = `
                <button id="login-btn" class="holographic-btn"><i class="fas fa-sign-in-alt"></i> ВОЙТИ</button>
                <button id="register-btn" class="holographic-btn"><i class="fas fa-user-plus"></i> РЕГИСТРАЦИЯ</button>
            `;
            // Reattach event listeners
            document.getElementById('login-btn').addEventListener('click', () => {
                loginModal.style.display = 'block';
            });
            document.getElementById('register-btn').addEventListener('click', () => {
                registerModal.style.display = 'block';
            });
        }
    }

    function updateProfileInfo() {
        if (isLoggedIn && currentUser) {
            document.getElementById('profile-username').textContent = currentUser.username;
            document.getElementById('profile-key-status').textContent = currentUser.key ? 'ДА' : 'НЕТ';
            document.getElementById('profile-hwid').textContent = currentUser.hwid;
            document.getElementById('profile-regdate').textContent = currentUser.regDate;
            document.getElementById('profile-key-expiry').textContent = currentUser.keyExpiry || 'НЕ АКТИВИРОВАН';
        }
    }

    function generateHWID() {
        const parts = [];
        for (let i = 0; i < 4; i++) {
            parts.push(Math.random().toString(36).substring(2, 6).toUpperCase());
        }
        return parts.join('-');
    }

    // Create 3D floating cube
    function initFloatingCube() {
        const container = document.getElementById('floating-cube');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(400, 400);
        container.appendChild(renderer.domElement);
        
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ color: 0x8a2be2, linewidth: 2 })
        );
        
        scene.add(line);
        
        camera.position.z = 5;
        
        function animate() {
            requestAnimationFrame(animate);
            
            line.rotation.x += 0.005;
            line.rotation.y += 0.01;
            
            renderer.render(scene, camera);
        }
        
        animate();
    }

    // Initialize
    updateAuthButtons();
    showSection('home');
    initFloatingCube();
});
// Функция для активации ключа
async function activateKey(key) {
    try {
        const response = await fetch('/api/activate-key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ key })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification(data.message, 'success');
            updateProfileInfo();
        } else {
            showNotification(data.message, 'error');
        }
    } catch (error) {
        showNotification('Ошибка соединения с сервером', 'error');
        console.error('Error:', error);
    }
}

// Обновление информации в профиле
function updateProfileInfo() {
    // Здесь код для обновления информации о пользователе
    // после успешной активации ключа
}
