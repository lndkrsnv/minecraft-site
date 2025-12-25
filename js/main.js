function copyIP() {
    const ip = 'your-server-ip:25565'; // Замените на ваш IP
    navigator.clipboard.writeText(ip).then(() => {
        const btn = document.querySelector('.copy-btn');
        const originalText = btn.textContent;
        btn.textContent = '✅ Скопировано!';
        btn.style.background = 'rgba(95,165,13,0.3)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    });
}
