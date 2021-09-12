const fetch = require('node-fetch'), randomstring = require('randomstring'), config = require('./config.json');

setInterval(async() => fetch(config.discordWebhook, {method: 'POST',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({"content": `https://prnt.sc/${randomstring.generate({length: 6, charset:'alphabetic'}).toLowerCase()}`})}), config.interval)