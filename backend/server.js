import express from 'express';
import { WebSocketServer } from 'ws';
import conf from './config.js'

const app = express();
const port = conf.port
const messages = []; // Store messages here

const server = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    // Send the current messages to the newly connected client
    ws.send(JSON.stringify(messages));

    ws.on('message', (data) => {
        const obj = JSON.parse(data.toString());
        messages.push(obj); // Add the new message to the messages array
        
        // Broadcast the new message to all clients
        wss.clients.forEach(client => {
            if (client.readyState === client.OPEN) {
                client.send(JSON.stringify(obj)); // Send only the new message to all clients
            }
        });
    });
});



