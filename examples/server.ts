import express from 'express';
import { createServer } from 'http';
import { Blink } from '../src';
import { Request, Response } from 'express';

const app = express();
const httpServer = createServer(app);

// Add mock auth endpoint
app.post('/auth', (req: Request, res: Response) => {
    // Always authenticate successfully for testing
    console.log('Authenticating user', req.body);
    res.json({ 
        success: true,
        data: {
            client_identifier: '123',
            permissions: ['backend','developer'],
            groups: ['1']
        }
    });
});

const blink = new Blink({
    server: httpServer,
    heartbeat: {
        interval: 25000,
        timeout: 5000
    },
    redis: {
        host: 'localhost',
        port: 6379,
        password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81'
    },
    auth: {
        webhookUrl: 'http://localhost:3000/auth', // Your auth endpoint
        authType: 'TOKEN_AUTH',
        options: {
            tokenType: 'JWT'
        },
        timeout: 5000
    },
    group: {
        inactiveGroupTimeout: 300
    },
    connection: {
        inactiveTimeout: 10000
    }
});

httpServer.listen(3000, () => {
    console.log('Server running on port 3000');
});

//Example: Send a message every 5 seconds
setInterval(() => {
    blink.sendMessage({
        groupId: '1',
        event: 'update',
        data: {timestamp: Date.now()},
        tags: ['backend'],
        requireAck: false
    }).catch(console.error);
}, 2000); 