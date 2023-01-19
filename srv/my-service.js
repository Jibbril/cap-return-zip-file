const { Readable } = require('stream');
const papa = require('papaparse');
const JSZip = require('jszip');
const { Blob } = require('buffer');
const fs = require('fs');
const { getZip} = require('../app');

const data = [
    [{
        "col1": "val1",
        "col2": "val2",
        "col3": "val3",
        "col4": "val4",
    },
    {
        "col1": "val1",
        "col2": "val2",
        "col3": "val3",
        "col4": "val4",
    }],
    [{
        "col1": "val1",
        "col2": "val2",
        "col3": "val3",
        "col4": "val4",
    }]
];



module.exports = srv => {
    srv.on('saveBinary', async req => {
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

    srv.on('getBinary', async req => {
        await getZip().then(async content => {
            
            const res = cds.context.http.res;
            res.set('content-type', 'application/zip');
            res.set('content-disposition', 'attachment; filename="from_cap.zip"');
            res.set('content-length', content.length);

            const stream = new Readable();
            stream.push(content);
            stream.push(null);

            stream.pipe(res);

            await new Promise((resolve, reject) => {
                stream.on('end', resolve);
                stream.on('error', err => reject(err));
            });
        })
    });
}