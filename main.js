const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs-extra');
const config = require('./config');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

client.on('qr', qr => {
    console.log('يرجى مسح كود الـ QR لربط البوت بحسابك على واتساب');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ البوت جاهز للعمل على Railway!');
});

client.on('message', async message => {
    if (message.body.toLowerCase() === 'ping') {
        message.reply('pong!');
    }
});

client.initialize();
