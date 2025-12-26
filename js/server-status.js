const SERVER_IP = '31.28.30.23:25565';
const API_URL = `https://api.mcsrvstat.us/2/${SERVER_IP}`;

async function fetchServerStatus() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (data.online) {
            updateStatus(true, data);
        } else {
            updateStatus(false, data);
        }
    } catch (error) {
        console.error('Ошибка получения статуса:', error);
        updateStatus(false, null);
    }
}

function updateStatus(online, data) {
    const card = document.getElementById('statusCard');
    const indicator = document.getElementById('statusIndicator');
    const statusText = document.getElementById('statusText');

    if (online && data) {
        card.className = 'status-card status-online';
        indicator.className = 'status-indicator status-online';
        statusText.textContent = '🟢 Сервер онлайн';

        const onlinePlayers = data.players?.online ?? 0;
        const maxPlayers = data.players?.max ?? '-';
        document.getElementById('playersCount').textContent = `${onlinePlayers}/${maxPlayers}`;

        document.getElementById('version').textContent = data.version || '-';
        document.getElementById('motd').textContent = data.motd?.clean || 'Нет MOTD';

        updatePlayersList(data.players?.list || []);
    } else {
        card.className = 'status-card status-offline';
        indicator.className = 'status-indicator status-offline';
        statusText.textContent = '🔴 Сервер оффлайн';

        document.getElementById('playersCount').textContent = '-/-';
        document.getElementById('version').textContent = '-';
        document.getElementById('motd').textContent = '-';

        document.getElementById('playersList').innerHTML = '';
    }
}

function updatePlayersList(players) {
    const container = document.getElementById('playersList');
    container.innerHTML = '';
    
    players.slice(0, 8).forEach(player => {
        const avatar = document.createElement('div');
        avatar.className = 'player-avatar';
        avatar.title = player;
        avatar.textContent = player;
        container.appendChild(avatar);
    });
}

// Запуск каждые 30 секунд
fetchServerStatus();
setInterval(fetchServerStatus, 30000);
