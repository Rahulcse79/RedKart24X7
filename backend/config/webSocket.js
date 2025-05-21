const WebSocket = require('ws');

const clients = new Set();

function initWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        clients.add(ws);
        console.log('WebSocket client connected');

        ws.on('message', (message) => {
            console.log('Received:', message);
            broadcast(message, ws);
        });

        ws.on('close', () => {
            clients.delete(ws);
            console.log('WebSocket client disconnected');
        });
    });

    console.log('WebSocket server attached to HTTP server.');
}

function broadcast(message, sender) {
    clients.forEach(client => {
        if (client !== sender && client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

module.exports = { initWebSocketServer, broadcast };
