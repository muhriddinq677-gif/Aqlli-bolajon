// --- BAZA: 20 TA VAZIFA RO'YXATI ---
const allQuests = [ 
    { id: 1, title: "Matematikadan misol yech", icon: "🧮", file: "matematika.html" }, 
    { id: 2, title: "Tezkor hisoblash mashqi", icon: "🔢", file: "matematika.html" }, 
    { id: 3, title: "Inglizcha so'zlarni top", icon: "🗽", file: "ingiliztili.html" }, 
    { id: 4, title: "Inglizcha audio eshit", icon: "🎧", file: "ingiliztili.html" }, 
    { id: 5, title: "Informatikadan test yech", icon: "💻", file: "informatika.html" }, 
    { id: 6, title: "Kiberxavfsizlik qoidasi", icon: "🛡️", file: "informatika.html" }, 
    { id: 7, title: "Kodni davom ettir (IT)", icon: "🚀", file: "dasturlash.html" }, 
    { id: 8, title: "Algoritm labirintidan o't", icon: "🧩", file: "dasturlash.html" }, 
    { id: 9, title: "Futbol viktorinasi", icon: "⚽", file: "football.html" }, 
    { id: 10, title: "Futbol qoidalarini top", icon: "🏆", file: "football.html" }, 
    { id: 11, title: "Shashka donalarini sur", icon: "🏁", file: "shashka.html" }, 
    { id: 12, title: "Shashka kombinatsiyasini yech", icon: "⚪", file: "shashka.html" }, 
    { id: 13, title: "Tabiiy fandan tajriba", icon: "🌿", file: "tabiiy_game.html" }, 
    { id: 14, title: "Hayvonlar dunyosi testi", icon: "🦁", file: "tabiiy_game.html" }, 
    { id: 15, title: "Atrofimizdagi olam o'yini", icon: "🌍", file: "olam_game.html" }, 
    { id: 16, title: "Sayyoralar va koinot", icon: "🚀", file: "olam_game.html" }, 
    { id: 17, title: "Ona tilidan imlo qoidasi", icon: "✍️", file: "onatili_game.html" }, 
    { id: 18, title: "Gapni to'g'ri tuzing", icon: "📖", file: "onatili_game.html" }, 
    { id: 19, title: "Ertaklar va dostonlar viktorinasi", icon: "📚", file: "adabiyot.html" }, 
    { id: 20, title: "Shoirlar va she'riyat sinovi", icon: "📜", file: "adabiyot.html" } 
];

// Xotirani yuklash
let gameData = JSON.parse(localStorage.getItem('aqlliBolajonData')) || {};

if (gameData.diamonds === undefined) gameData.diamonds = 0; 
if (!gameData.currentMask) gameData.currentMask = '👶';
if (gameData.activeWand === undefined) gameData.activeWand = 1;
if (!gameData.currentQuests) gameData.currentQuests = [];
if (!gameData.lastUpdateDate) gameData.lastUpdateDate = "";

const COST = 50;

// 24 soatda vazifalarni almashtirish funksiyasi
function checkAndRefreshQuests() {
    const today = new Date().toDateString();
    if (gameData.lastUpdateDate !== today || gameData.currentQuests.length === 0) {
        let shuffled = [...allQuests].sort(function() { return 0.5 - Math.random(); });
        let selectedQuests = shuffled.slice(0, 3);
        gameData.currentQuests = selectedQuests.map(function(q) { return q.id; });
        gameData.lastUpdateDate = today;
        localStorage.setItem('aqlliBolajonData', JSON.stringify(gameData));
    }
}

// Barcha elementlarni ekranga chizish
function updatePage() {
    checkAndRefreshQuests();
    
    const dDisp = document.getElementById('diamonds-display');
    const mDisp = document.getElementById('current-mask');
    if(dDisp) dDisp.innerText = gameData.diamonds;
    if(mDisp) mDisp.innerText = gameData.currentMask;

    // Vazifalarni chizish
    const questsContainer = document.getElementById('quests-container');
    if(questsContainer && gameData.currentQuests) {
        questsContainer.innerHTML = '';
        gameData.currentQuests.forEach(function(questId) {
            const quest = allQuests.find(function(q) { return q.id === questId; });
            if (quest) {
                questsContainer.innerHTML += `
                    <div class="item-card">
                        <div>
                            <div class="item-icon">${quest.icon}</div>
                            <div class="item-title">${quest.title}</div>
                            <div style="color: #e67e22; font-weight: bold; font-size: 13px; margin-bottom: 8px;">+5 Olmos</div>
                        </div>
                        <button class="btn-go" onclick="startQuest('${quest.file}')">Bajarish</button>
                    </div>
                `;
            }
        });
    }

    // Tayoqchalar tugmalarini yangilash
 // --- TAYOQCHALAR MATNIDAGI NARXNI 100 GA TO'G'RILASH ---
for (let id = 1; id <= 3; id++) {
    const btn = document.getElementById('wand-' + id);
    if (btn) {
        if (gameData.activeWand === id) {
            btn.innerText = "Yoqilgan ✨";
            btn.style.background = "#9b59b6";
        } else {
            // COST o'rniga 100 yozildi! Endi ekranda ham 100 bo'lib to'g'ri ko'rinadi
            btn.innerText = "🔒 Sotib olish (💎 100)"; 
            btn.style.background = "#4a90e2";
        }
    }
}


    // Niqoblar tugmalarini yangilash
    const maskList = [
        { id: 'lion', emoji: '🦁' },
        { id: 'fox', emoji: '🦊' },
        { id: 'bear', emoji: '🐻' },
        { id: 'ninja', emoji: '🐱‍👤' },
        { id: 'panda', emoji: '🐼' }
    ];

    maskList.forEach(function(mask) {
        const btn = document.getElementById('mask-' + mask.id);
        if (btn) {
            if (gameData.currentMask === mask.emoji) {
                btn.innerText = "Taqilgan";
                btn.style.background = "#2ecc71";
            } else {
                btn.innerText = "🔒 Sotib olish (💎 " + COST + ")";
                btn.style.background = "#4a90e2";
            }
        }
    });

    localStorage.setItem('aqlliBolajonData', JSON.stringify(gameData));
}

function startQuest(fileName) {
    window.location.href = fileName;
}

function handleWand(id) {
    if (gameData.activeWand === id) {
        gameData.activeWand = 1; // Birinchisiga qaytadi
    } else {
        if (gameData.diamonds >= 100) {
            gameData.diamonds -= 100;
            gameData.activeWand = id;
        } else {
            alert("Olmoslaringiz yetarli emas! 😢 Vazifalarni bajaring.");
        }
    }
    updatePage();
}

function handleMask(emoji, maskId) {
    if (gameData.currentMask === emoji) {
        gameData.currentMask = '👶'; // Bolaga qaytadi
    } else {
        if (gameData.diamonds >= 50) {
            gameData.diamonds -= 50;
            gameData.currentMask = emoji;
        } else {
            alert("Olmoslaringiz yetarli emas! 😢 Vazifalarni bajaring.");
        }
    }
    updatePage();
}

// Sichqoncha yoki barmoq ortidan sudraluvchi effekt
function createSparkle(e) {
    if (!gameData.activeWand) return;

    let x = e.clientX || (e.touches && e.touches.clientX);
    let y = e.clientY || (e.touches && e.touches.clientY);
    if (!x || !y) return;

    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.position = 'absolute';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.fontSize = '24px';
    sparkle.style.zIndex = '99999';
    sparkle.style.left = (x + window.scrollX - 10) + 'px';
    sparkle.style.top = (y + window.scrollY - 10) + 'px';
    sparkle.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';

    if (gameData.activeWand === 1) sparkle.innerText = '✨';
    else if (gameData.activeWand === 2) sparkle.innerText = '⭐';
    else if (gameData.activeWand === 3) {
        const partyEffects = ['🎉', '✨', '🎈', '🎊'];
        sparkle.innerText = partyEffects[Math.floor(Math.random() * partyEffects.length)];
    }

    document.body.appendChild(sparkle);

    setTimeout(function() {
        const mx = (Math.random() - 0.5) * 80;
        const my = (Math.random() - 0.5) * 80;
        sparkle.style.transform = "translate(" + mx + "px, " + my + "px) scale(0.2)";
        sparkle.style.opacity = '0';
    }, 10);

    setTimeout(function() { sparkle.remove(); }, 800);
}

window.addEventListener('mousemove', createSparkle);
window.addEventListener('touchmove', createSparkle);

updatePage();
// --- ANIMATSIYALI MODAL OYNA FUNKSIYALARI ---
// --- MODAL OYNA FUNKSIYALARI ---
function openWheelModal() {
    const modal = document.getElementById('wheel-modal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(function() {
            modal.classList.add('active');
            drawWheel(); // G'ildirakni canvasda tekis qilib chizamiz
        }, 10);
    }
}

function closeWheelModal() {
    if (isSpinning) return; // Aylanayotganda yopib bo'lmaydi
    const modal = document.getElementById('wheel-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(function() {
            modal.style.display = 'none';
        }, 300);
    }
}

// --- CANVASDA GEOMETRIK TEKIS G'ILDIRAK CHIZISH ---
const prizes = ['5_olmos', 'qayta', 'niqob', '15_olmos', '10_olmos'];
const prizeLabels = ["💎 5", "💥 Qayta", "🎭 Niqob", "💎 15", "💎 10"];
const colors = ["#ff7675", "#fab1a0", "#00cec9", "#a29bfe", "#74b9ff"];

let currentAngle = 0;
let isSpinning = false;

function drawWheel() {
    const canvas = document.getElementById('wheelCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const numSegments = 5;
    const anglePerSegment = (2 * Math.PI) / numSegments;
    const radius = canvas.width / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(currentAngle);

    for (let i = 0; i < numSegments; i++) {
        // 1. Bo'lak sektorini chizish
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius - 8, i * anglePerSegment, (i + 1) * anglePerSegment);
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();

        // 2. Matnlarni sektor ichiga chizish va markazlashtirish
        ctx.save();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 15px 'Segoe UI', Arial";
        ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
        ctx.shadowBlur = 3;
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        
        // Burchak markazini topish
        const textAngle = (i * anglePerSegment) + (anglePerSegment / 2);
        ctx.rotate(textAngle);
        ctx.fillText(prizeLabels[i], radius - 30, 0);
        ctx.restore();
    }

    // Markazdagi kichik tugmacha/aylana dizayni
    ctx.restore();
    ctx.beginPath();
    ctx.arc(radius, radius, 12, 0, 2 * Math.PI);
    ctx.fillStyle = "#2c3e50";
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.stroke();
}

// --- OMAD CHARXPALAGINI AYLANISH ALGORITMI ---
function spinWheel() {
    if (isSpinning) return;

    // Hozircha sinov rejimi: 5 marta aylantirish imkoniyati (Siz so'ragandek)
    let spinCount = parseInt(localStorage.getItem('wheelSpinCount') || "0");
   if (spinCount >= 1) {
    alert("Siz bugun g'ildirakni aylantirib bo'ldingiz! 🎡 Ertaga yana qayta keling.");
    return;
}

    isSpinning = true;
    const spinBtn = document.getElementById('spin-btn');
    if (spinBtn) spinBtn.disabled = true;

    // Tasodifiy segment tanlash
    const randomSegment = Math.floor(Math.random() * 5);
    const numSegments = 5;
    const anglePerSegment = (2 * Math.PI) / numSegments;

    // Mil tepadagi (1.5 * Math.PI) holatida turgani uchun yutuqni burchakka hisoblash
    const targetAngle = (1.5 * Math.PI) - (randomSegment * anglePerSegment) - (anglePerSegment / 2);
    const totalRotation = (2 * Math.PI * 5) + targetAngle - (currentAngle % (2 * Math.PI));
    
    const startRotation = currentAngle;
    const endRotation = currentAngle + totalRotation;
    const duration = 4000; // 4 soniya aylanish
    const startTime = performance.now();

    // Silliq aylanish animatsiyasi (RequestAnimationFrame yordamida)
    function animate(now) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        
        // Easing effekti (boshida tez, oxirida sekinlashuvchi)
        const easeOut = 1 - Math.pow(1 - t, 3);
        
        currentAngle = startRotation + (endRotation - startRotation) * easeOut;
        drawWheel();

        if (t < 1) {
            requestAnimationFrame(animate);
        } else {
            // Animatsiya tugagach yutuqni aniqlash
            isSpinning = false;
            if (spinBtn) spinBtn.disabled = false;
            
            const result = prizes[randomSegment];
            
            // Imkoniyatlar sonini bittaga oshirish
            spinCount++;
            localStorage.setItem('wheelSpinCount', spinCount.toString());

            if (result === '5_olmos') {
                gameData.diamonds += 5;
                alert("Tabriklaymiz! Siz 💎 5 olmos yutib oldingiz! 🎉");
            } else if (result === '10_olmos') {
                gameData.diamonds += 10;
                alert("Ajoyib! Siz 💎 10 olmos yutib oldingiz! 🎉");
            } else if (result === '15_olmos') {
                gameData.diamonds += 15;
                alert("Daxshat! Siz 💎 15 olmos yutib oldingiz! 🎉");
            } else if (result === 'niqob') {
                const allMasks = ['🦁', '🦊', '🐻', '🥷', '🐼'];
                const randomMask = allMasks[Math.floor(Math.random() * allMasks.length)];
                gameData.currentMask = randomMask;
                alert("Omadli kun! Sizga tekinga yangi " + randomMask + " niqobi sovg'a qilindi! 🎭");
            } else if (result === 'qayta') {
                alert("💥 Qayta urinish! Omad kelmadi, tugmani qayta bosib g'ildirakni aylantiring! 🚀");
                return;
            }

            closeWheelModal();
            if (typeof updatePage === "function") {
                updatePage(); // Asosiy sahifani yangilash
            }
        }
    }
    requestAnimationFrame(animate);
}
