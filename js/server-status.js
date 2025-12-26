const SERVER_HOST = '192.168.2.80';  // ← IP вашего MC сервера
const API_BASE_URL = 'http://127.0.0.1:18888/api/minecraft/status';

async function fetchServerStatus() {
    try {
        const response = await fetch(`${API_BASE_URL}/${SERVER_HOST}`);
        const data = await response.json();
        if (response.ok && data.server) {
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

        // Адаптировано под структуру вашего API
        const onlinePlayers = data.players?.online ?? 0;
        const maxPlayers = data.players?.max ?? '-';
        document.getElementById('playersCount').textContent = `${onlinePlayers}/${maxPlayers}`;

        document.getElementById('version').textContent = data.version?.name || '-';
        document.getElementById('motd').textContent = data.description || 'Нет MOTD';

        // Игроки (sample из TCP query)
        updatePlayersList(data.players?.sample || []);
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
    
    // Адаптировано под структуру {name, id} из библиотеки
    (players || []).slice(0, 8).forEach(player => {
        const avatar = document.createElement('div');
        avatar.className = 'player-avatar';
        avatar.title = player.name || player;  // name или fallback на строку
        avatar.textContent = player.name || player;
        container.appendChild(avatar);
    });
}

console.log('Hello World');

fetchServerStatus();