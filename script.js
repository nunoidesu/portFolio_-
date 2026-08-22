document.addEventListener('DOMContentLoaded', () => {
    
    // 1. スキルゲージのアニメーション
    const skillItems = document.querySelectorAll('.skill-item');

    const animateGauge = (item) => {
        const targetStyle = getComputedStyle(item).getPropertyValue('--target').trim();
        const target = parseInt(targetStyle) || 0; 

        if (target === 0) return; 

        let current = 0;
        const duration = 1500; 
        const startTime = performance.now();

        const update = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            current = target * easeOut;

            item.style.setProperty('--p', current);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateGauge(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -10% 0px' });

    skillItems.forEach(item => observer.observe(item));

    // 2. ホバー（マウス乗せ）でテキストを開く処理
    const skillWrappers = document.querySelectorAll('.skill-wrapper');
    const HOVER_DELAY = 500; 
    
    skillWrappers.forEach(wrapper => {
        let timer = null;

        wrapper.addEventListener('mouseenter', () => {
            clearTimeout(timer);
            
            timer = setTimeout(() => {
                // 他が開いていれば閉じる
                document.querySelectorAll('.skill-wrapper.is-open').forEach(openWrapper => {
                    if (openWrapper !== wrapper) {
                        openWrapper.classList.remove('is-open');
                    }
                });
                // 自分を開く
                wrapper.classList.add('is-open');
            }, HOVER_DELAY);
        });

        wrapper.addEventListener('mouseleave', () => {
            clearTimeout(timer);
            wrapper.classList.remove('is-open');
        });
    });

    const openBtn = document.getElementById('open-video');
    const modal = document.getElementById('video-modal');
    const closeBtn = document.querySelector('.modal-close-video');
    const video = document.getElementById('modal-video');

// ボタンをクリックしたらモーダルを表示
    openBtn.addEventListener('click', () => {
       modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        video.pause(); 
        video.currentTime = 0; 
    });


    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            video.pause();
            video.currentTime = 0;
        }
    });

});

// 要素を取得
const openBtn = document.getElementById('open-modal');
const closeBtn = document.getElementById('close-modal');
const modal = document.getElementById('image-modal');

// ボタンをクリックしたらモーダルを表示
openBtn.addEventListener('click', (e) => {
    e.preventDefault(); // リンクのデフォルトの挙動（画面トップにスクロールする等）を防ぐ
    modal.classList.add('is-show');
});

// ×ボタンをクリックしたらモーダルを閉じる
closeBtn.addEventListener('click', () => {
    modal.classList.remove('is-show');
});

// 背景の黒い部分をクリックしても閉じるようにする
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('is-show');
    }
});