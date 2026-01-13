// Game Configuration
const CONFIG = {
    TILE_SIZE: 50,
    PLAYER_SPEED: 5,
    INTERACTION_DISTANCE: 80,
    CANVAS_PADDING: 50
};

// Game State
const gameState = {
    isRunning: false,
    player: {
        x: 0,
        y: 0,
        width: 40,
        height: 40,
        speed: CONFIG.PLAYER_SPEED,
        color: '#3B82F6',
        direction: 'down'
    },
    keys: {
        w: false,
        a: false,
        s: false,
        d: false,
        e: false
    },
    stations: [],
    isModalOpen: false,
    nearbyStation: null
};

// Station Data
const stationData = {
    education: {
        id: 'education',
        name: 'การศึกษา',
        icon: '🎓',
        color: '#22C55E',
        position: { x: 2, y: 2 },
        content: `
            <h3>ปริญญาตรี วิทยาศาสตรบัณฑิต</h3>
            <p class="highlight">สาขาวิทยาการคอมพิวเตอร์</p>
            <h3>มหาวิทยาลัยเทคโนโลยีราชมงคลธัญบุรี (มทร.ธัญบุรี)</h3>
            <p>คณะวิทยาศาสตร์และเทคโนโลยี</p>
            <p><span class="highlight">ปีที่จบ: 2569</span> (กำลังศึกษา)</p>
        `
    },
    experience: {
        id: 'experience',
        name: 'ประสบการณ์',
        icon: '💼',
        color: '#F59E0B',
        position: { x: 8, y: 2 },
        content: `
            <h3>บริษัท บิ๊กซี ซูเปอร์เซ็นเตอร์ จำกัด (มหาชน)</h3>
            <p class="highlight">สาขาพระนครศรีอยุธยา</p>
            <h3>ตำแหน่ง: พนักงานทั่วไป / แคชเชียร์</h3>
            <p>ธุรกิจ: ค้าขายปลีก/ค้าขายส่ง, การตลาด</p>
            <h3>ระยะเวลา: เมษายน 2566 - ปัจจุบัน</h3>
            <p><span class="highlight">ประสบการณ์: 2 ปี 10 เดือน</span></p>
            <p>เงินเดือน: 9,000 บาท/เดือน</p>
            <ul>
                <li>ให้บริการลูกค้าและบริหารจัดการการชำระเงิน</li>
                <li>พัฒนาทักษะการทำงานเป็นทีมและการสื่อสาร</li>
                <li>จัดการงานซ้อนได้อย่างมีประสิทธิภาพ</li>
            </ul>
        `
    },
    skills: {
        id: 'skills',
        name: 'ทักษะ',
        icon: '⚡',
        color: '#8B5CF6',
        position: { x: 2, y: 8 },
        content: `
            <h3>ทักษะทางคอมพิวเตอร์</h3>
            <div class="skill-bar">
                <div class="skill-label">
                    <span>HTML / DHTML</span>
                    <span>ระดับกลาง</span>
                </div>
                <div class="skill-progress-bg">
                    <div class="skill-progress-fill" style="width: 60%"></div>
                </div>
            </div>
            
            <h3>ทักษะภาษา</h3>
            <p><span class="highlight">ภาษาไทย:</span> ดีเยี่ยม (ฟัง, พูด) | ดี (อ่าน, เขียน)</p>
            <p><span class="highlight">ภาษาอังกฤษ:</span> ดี (อ่าน, เขียน) | เริ่มต้น (ฟัง, พูด)</p>
            
            <h3>ทักษะทั่วไป</h3>
            <ul>
                <li>การให้บริการลูกค้า</li>
                <li>การทำงานเป็นทีม</li>
                <li>การสื่อสาร</li>
                <li>การจัดการเวลา</li>
                <li>การแก้ปัญหาเฉพาะหน้า</li>
                <li>ความรับผิดชอบ</li>
            </ul>
        `
    },
    activities: {
        id: 'activities',
        name: 'กิจกรรม',
        icon: '🎯',
        color: '#EC4899',
        position: { x: 8, y: 8 },
        content: `
            <h3>การขายของออนไลน์</h3>
            <p>มีประสบการณ์ในการบริหารจัดการร้านค้าออนไลน์</p>
            <ul>
                <li>ดูแลคำสั่งซื้อและการจัดส่งสินค้า</li>
                <li>บริการลูกค้าผ่านช่องทางออนไลน์</li>
            </ul>
            <p><span class="highlight">รายได้: ไม่คงที่</span></p>
            
            <h3>พนักงานพาร์ทไทม์ขายของ</h3>
            <ul>
                <li>แนะนำสินค้าและให้บริการลูกค้า</li>
                <li>พัฒนาทักษะการขายและการเจรจาต่อรอง</li>
            </ul>
            <p><span class="highlight">รายได้: 600 บาท/วัน</span></p>
        `
    },
    contact: {
        id: 'contact',
        name: 'ติดต่อ',
        icon: '📞',
        color: '#06B6D4',
        position: { x: 5, y: 5 },
        content: `
            <h3>ข้อมูลการติดต่อ</h3>
            <div class="contact-item">
                <span class="contact-icon">📞</span>
                <div class="contact-info">
                    <strong>เบอร์โทรศัพท์</strong>
                    <a href="tel:0806282905">080-628-2905</a>
                </div>
            </div>
            <div class="contact-item">
                <span class="contact-icon">✉️</span>
                <div class="contact-info">
                    <strong>อีเมล</strong>
                    <a href="mailto:apisit11903@gmail.com">apisit11903@gmail.com</a>
                </div>
            </div>
            <div class="contact-item">
                <span class="contact-icon">📍</span>
                <div class="contact-info">
                    <strong>ที่อยู่</strong>
                    <p>ตำบลบางปะอิน อำเภอบางปะอิน</p>
                    <p>จังหวัดพระนครศรีอยุธยา</p>
                </div>
            </div>
            <div class="contact-item">
                <span class="contact-icon">📅</span>
                <div class="contact-info">
                    <strong>วันเดือนปีเกิด</strong>
                    <p>14 กันยายน 2547 (21 ปี)</p>
                </div>
            </div>
        `
    }
};

// DOM Elements
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const minimapCanvas = document.getElementById('minimap-canvas');
const minimapCtx = minimapCanvas.getContext('2d');
const startScreen = document.getElementById('start-screen');
const gameOverlay = document.getElementById('game-overlay');
const startBtn = document.getElementById('start-btn');
const modal = document.getElementById('info-modal');
const modalClose = document.getElementById('modal-close');
const modalIcon = document.getElementById('modal-icon');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const interactionHint = document.getElementById('interaction-hint');

// Initialize Game
function initGame() {
    setupCanvas();
    createStations();
    placePlayer();
    setupEventListeners();
    renderMinimap();
}

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    minimapCanvas.width = 150;
    minimapCanvas.height = 150;
}

function createStations() {
    const gridSize = CONFIG.TILE_SIZE * 3;
    const offsetX = (canvas.width - (11 * gridSize)) / 2;
    const offsetY = (canvas.height - (11 * gridSize)) / 2;
    
    Object.values(stationData).forEach(station => {
        gameState.stations.push({
            ...station,
            x: offsetX + station.position.x * gridSize,
            y: offsetY + station.position.y * gridSize,
            width: gridSize,
            height: gridSize,
            glowIntensity: 0,
            glowDirection: 1
        });
    });
}

function placePlayer() {
    const gridSize = CONFIG.TILE_SIZE * 3;
    const offsetX = (canvas.width - (11 * gridSize)) / 2;
    const offsetY = (canvas.height - (11 * gridSize)) / 2;
    
    gameState.player.x = offsetX + 5 * gridSize + gridSize / 2 - gameState.player.width / 2;
    gameState.player.y = offsetY + 5 * gridSize + gridSize / 2 - gameState.player.height / 2;
}

function setupEventListeners() {
    // Keyboard events
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    // Window resize
    window.addEventListener('resize', handleResize);
    
    // Start button
    startBtn.addEventListener('click', startGame);
    
    // Modal close
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && gameState.isModalOpen) {
            closeModal();
        }
    });
}

function handleKeyDown(e) {
    if (!gameState.isRunning || gameState.isModalOpen) return;
    
    const key = e.key.toLowerCase();
    if (gameState.keys.hasOwnProperty(key)) {
        gameState.keys[key] = true;
    }
    
    // Interaction with E key
    if (key === 'e' && gameState.nearbyStation && !gameState.isModalOpen) {
        openModal(gameState.nearbyStation);
    }
}

function handleKeyUp(e) {
    const key = e.key.toLowerCase();
    if (gameState.keys.hasOwnProperty(key)) {
        gameState.keys[key] = false;
    }
}

function handleResize() {
    setupCanvas();
    createStations();
    placePlayer();
    renderMinimap();
}

function startGame() {
    gameState.isRunning = true;
    startScreen.classList.add('hidden');
    gameOverlay.classList.remove('hidden');
    gameLoop();
}

function openModal(station) {
    gameState.isModalOpen = true;
    
    modalIcon.textContent = station.icon;
    modalTitle.textContent = station.name;
    modalBody.innerHTML = station.content;
    
    modal.classList.remove('hidden');
    
    // Stop player movement
    gameState.keys.w = false;
    gameState.keys.a = false;
    gameState.keys.s = false;
    gameState.keys.d = false;
}

function closeModal() {
    gameState.isModalOpen = false;
    modal.classList.add('hidden');
    
    // Reset nearby station after closing modal
    gameState.nearbyStation = checkNearbyStation();
}

// Game Loop
function gameLoop() {
    if (!gameState.isRunning) return;
    
    update();
    render();
    
    requestAnimationFrame(gameLoop);
}

function update() {
    if (gameState.isModalOpen) return;
    
    // Player movement
    let dx = 0;
    let dy = 0;
    
    if (gameState.keys.w) dy -= gameState.player.speed;
    if (gameState.keys.s) dy += gameState.player.speed;
    if (gameState.keys.a) {
        dx -= gameState.player.speed;
        gameState.player.direction = 'left';
    }
    if (gameState.keys.d) {
        dx += gameState.player.speed;
        gameState.player.direction = 'right';
    }
    
    // Normalize diagonal movement
    if (dx !== 0 && dy !== 0) {
        dx *= 0.707;
        dy *= 0.707;
    }
    
    // Update player position
    gameState.player.x += dx;
    gameState.player.y += dy;
    
    // Keep player in bounds
    const padding = CONFIG.CANVAS_PADDING;
    gameState.player.x = Math.max(padding, Math.min(canvas.width - gameState.player.width - padding, gameState.player.x));
    gameState.player.y = Math.max(padding, Math.min(canvas.height - gameState.player.height - padding, gameState.player.y));
    
    // Check for nearby stations
    gameState.nearbyStation = checkNearbyStation();
    
    // Update interaction hint
    if (gameState.nearbyStation) {
        interactionHint.classList.remove('hidden');
    } else {
        interactionHint.classList.add('hidden');
    }
    
    // Animate station glow
    gameState.stations.forEach(station => {
        station.glowIntensity += 0.02 * station.glowDirection;
        if (station.glowIntensity >= 1 || station.glowIntensity <= 0) {
            station.glowDirection *= -1;
        }
    });
}

function checkNearbyStation() {
    const playerCenter = {
        x: gameState.player.x + gameState.player.width / 2,
        y: gameState.player.y + gameState.player.height / 2
    };
    
    for (const station of gameState.stations) {
        const stationCenter = {
            x: station.x + station.width / 2,
            y: station.y + station.height / 2
        };
        
        const distance = Math.sqrt(
            Math.pow(playerCenter.x - stationCenter.x, 2) +
            Math.pow(playerCenter.y - stationCenter.y, 2)
        );
        
        if (distance < CONFIG.INTERACTION_DISTANCE) {
            return station;
        }
    }
    
    return null;
}

function render() {
    // Clear canvas
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--background-color').trim();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid pattern
    drawGrid();
    
    // Draw stations
    gameState.stations.forEach(station => drawStation(station));
    
    // Draw player
    drawPlayer();
    
    // Update minimap
    renderMinimap();
}

function drawGrid() {
    const gridSize = CONFIG.TILE_SIZE;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function drawStation(station) {
    const isNearby = gameState.nearbyStation && gameState.nearbyStation.id === station.id;
    
    // Draw glow effect
    if (isNearby) {
        const glowSize = 10 + station.glowIntensity * 5;
        ctx.shadowColor = station.color;
        ctx.shadowBlur = 20 + station.glowIntensity * 10;
    } else {
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
    }
    
    // Draw station base
    ctx.fillStyle = station.color;
    ctx.beginPath();
    
    // Rounded rectangle
    const radius = 15;
    ctx.roundRect(station.x, station.y, station.width, station.height, radius);
    ctx.fill();
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    
    // Draw border
    ctx.strokeStyle = isNearby ? '#ffffff' : 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = isNearby ? 3 : 2;
    ctx.stroke();
    
    // Draw icon
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(station.icon, station.x + station.width / 2, station.y + station.height / 2 - 10);
    
    // Draw station name
    ctx.font = 'bold 14px Kanit, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(station.name, station.x + station.width / 2, station.y + station.height - 20);
    
    // Draw interaction indicator
    if (isNearby) {
        ctx.font = '16px Arial';
        ctx.fillText('🔑', station.x + station.width - 20, station.y + 20);
    }
}

function drawPlayer() {
    const player = gameState.player;
    
    // Draw player shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(
        player.x + player.width / 2,
        player.y + player.height - 5,
        player.width / 2,
        8,
        0, 0, Math.PI * 2
    );
    ctx.fill();
    
    // Draw player body
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(
        player.x + player.width / 2,
        player.y + player.height / 2,
        player.width / 2,
        0, Math.PI * 2
    );
    ctx.fill();
    
    // Draw player border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw player face based on direction
    ctx.fillStyle = '#ffffff';
    const eyeOffsetX = gameState.player.direction === 'left' ? -5 : 5;
    
    // Left eye
    ctx.beginPath();
    ctx.arc(player.x + player.width / 2 - 6 + eyeOffsetX * 0.3, player.y + player.height / 2 - 5, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Right eye
    ctx.beginPath();
    ctx.arc(player.x + player.width / 2 + 6 + eyeOffsetX * 0.3, player.y + player.height / 2 - 5, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Smile
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(player.x + player.width / 2 + eyeOffsetX * 0.5, player.y + player.height / 2 + 2, 8, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();
}

function renderMinimap() {
    // Clear minimap
    minimapCtx.fillStyle = 'rgba(30, 41, 59, 0.8)';
    minimapCtx.fillRect(0, 0, minimapCanvas.width, minimapCanvas.height);
    
    const scale = 6;
    const offsetX = 5;
    const offsetY = 5;
    
    // Draw stations on minimap
    gameState.stations.forEach(station => {
        minimapCtx.fillStyle = station.color;
        minimapCtx.beginPath();
        minimapCtx.arc(
            offsetX + station.x / scale + station.width / (scale * 2),
            offsetY + station.y / scale + station.height / (scale * 2),
            6,
            0, Math.PI * 2
        );
        minimapCtx.fill();
    });
    
    // Draw player on minimap
    minimapCtx.fillStyle = '#ffffff';
    minimapCtx.beginPath();
    minimapCtx.arc(
        offsetX + gameState.player.x / scale + gameState.player.width / (scale * 2),
        offsetY + gameState.player.y / scale + gameState.player.height / (scale * 2),
        4,
        0, Math.PI * 2
    );
    minimapCtx.fill();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initGame);
