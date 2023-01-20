const fs = require('fs');
const { getZip, loadResponse } = require('../express/app');

module.exports = srv => {
    srv.on('saveZip', async req => {
        await getZip().then(content => {
            fs.writeFile("from_save.zip", content, err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("success");
                }
            })
        });
    });

    srv.on('getZip', async req => {
        await loadResponse(req.context.http.res, 'csv');
    });
}