const cds = require('@sap/cds');
const { loadResponse } = require('./express/app');

cds.once('bootstrap', app => {
	app.get('/getZip', async function(req, res, next) {
        await loadResponse(res, 'csv');
	});
});

module.exports = cds.server;