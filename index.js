const track = document.getElementById('appTrack');
const baseImgUrl = "https://raw.githubusercontent.com/linuxserver/docker-templates/master/linuxserver.io/img/";

function createAppCard(app) {
    const a = document.createElement('a');
    a.className = 'app-card';
    a.href = app.url;
    a.target = "_blank";
    
    const img = document.createElement('img');
    if (app.img.startsWith('http')) {
        img.src = app.img;
    } else {
        img.src = baseImgUrl + app.img;
    }
    img.alt = app.name;
    img.loading = "lazy";
    const span = document.createElement('span');
    span.textContent = app.name;
    a.appendChild(img);
    a.appendChild(span);
    return a;
}

if (typeof apps !== 'undefined') {
    apps.forEach(app => track.appendChild(createAppCard(app)));
    apps.forEach(app => track.appendChild(createAppCard(app)));
    initHeroAnimation();
}

function initHeroAnimation() {
    const container = document.getElementById('hero-bg');
    if (!container) return;

    const colCount = 7; 
    const shuffledApps = [...apps].sort(() => 0.5 - Math.random());

    for (let i = 0; i < colCount; i++) {
        const col = document.createElement('div');
        col.className = 'hero-col';
        
        const track = document.createElement('div');
        track.className = 'hero-col-track';

        const sliceSize = 15;
        const start = (i * sliceSize) % shuffledApps.length;
        const colApps = shuffledApps.slice(start, start + sliceSize);
        
        if (colApps.length < sliceSize) {
            colApps.push(...shuffledApps.slice(0, sliceSize - colApps.length));
        }

        const renderImages = () => {
            colApps.forEach(app => {
                const img = document.createElement('img');
                img.className = 'hero-icon-img';
                img.src = app.img.startsWith('http') ? app.img : baseImgUrl + app.img;
                img.alt = '';
                track.appendChild(img);
            });
        };

        renderImages();
        renderImages();

        col.appendChild(track);
        container.appendChild(col);
    }
}

function copyCode(btn) {
    const codeBlock = btn.parentElement;
    const clone = codeBlock.cloneNode(true);
    clone.querySelector('.copy-btn').remove();
    const codeText = clone.innerText.trim();
    navigator.clipboard.writeText(codeText).then(() => {
        const originalText = btn.innerText;
        btn.innerText = 'Copied!';
        setTimeout(() => {
            btn.innerText = originalText;
        }, 2000);
    });
}

const lightbox = document.createElement('div');
lightbox.className = 'lightbox-overlay';
const lbImg = document.createElement('img');
lightbox.appendChild(lbImg);
document.body.appendChild(lightbox);

document.querySelectorAll('.tech-visual img').forEach(img => {
    img.addEventListener('click', () => {
        lbImg.src = img.src;
        lightbox.style.display = 'flex';
    });
});

lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});
