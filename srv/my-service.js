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
            req._.res.set('content-type', 'application/octet-stream');
            req._.res.set('content-disposition', 'attachment; filename="from_cap.zip"');
            req._.res.set('content-length', content.length);

            const stream = new Readable();
            stream.push(content);
            stream.push(null);

            stream.pipe(req._.res);

            await new Promise((resolve, reject) => {
                stream.on('end', resolve);
                stream.on('data', (buf) => {
                    console.log(buf.length);
                })
                stream.on('error', err => reject(err));
            });

            await new Promise(resolve => {
                setTimeout(resolve, 5000);
            })
        })
    });
}