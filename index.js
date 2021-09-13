const fetch = require('node-fetch'), randomstring = require('randomstring'),
config = require('./config.json'), sites = require('./sites.json')

setInterval(async() => {
	const site = sites.siteList[getRandomNum(0, Object.keys(sites.siteList).length)];

	const siteURL = site.url.replace('++code++', randomstring.generate({length: getRandomNum(site.minCodeLen, site.codeLen), charset:site.codeType}))
	const fetchURL = site.addFIleEXT ? siteURL.replace("++ext++", site.availableEXT[getRandomNum(0, site.availableEXT.length)]) : siteURL

	fetch(config.discordWebhook, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"content": site.lowerCase ? fetchURL.toLowerCase() : fetchURL
		})
	})
}, config.interval)

function getRandomNum(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}