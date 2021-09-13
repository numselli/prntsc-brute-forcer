const fetch = require('node-fetch'), randomstring = require('randomstring'), config = require('./config.json');

const sites = [
	{
		"url": "https://prnt.sc/++code++",
		"codeLen": 6,
		"minCodeLen": 5,
		"codeType": "alphanumeric",
		"lowerCase": true
	},
	{
		"url": "https://postimg.cc/++code++",
		"codeLen": 8,
		"minCodeLen": 7,
		"codeType": "alphanumeric",
		"lowerCase": false
	},
	{
		"url": "https://imgpile.com/i/++code++",
		"codeLen": 6,
		"minCodeLen": 6,
		"codeType": "alphanumeric",
		"lowerCase": false
	},
	{
		"url": " https://ibb.co/++code++",
		"codeLen": 7,
		"minCodeLen": 2,
		"codeType": "alphanumeric",
		"lowerCase": false
	}
]

setInterval(async() => {
	const site = sites[getRandomNum(0, Object.keys(sites).length)];
	const siteURL = site.url.replace('++code++', randomstring.generate({length: getRandomNum(site.minCodeLen, site.codeLen), charset:site.codeType}))
	fetch(config.discordWebhook, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"content": site.lowerCase ? siteURL.toLowerCase() : siteURL
		})
	})
}, config.interval)

function getRandomNum(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}