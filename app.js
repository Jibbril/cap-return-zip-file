const JSZip = require('jszip');
const { saveAs } = require('file-saver');
const fs = require('fs');
const papa = require('papaparse');
const express = require('express');
const { Readable } = require('stream');

const app = express();

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
]

const buildCsvs = () => {
    return data.map(arr => {
        return papa.unparse(arr)
    });
}

const getZip = async () => {
    const aCsvs = buildCsvs();
    const zip = new JSZip();
    aCsvs.forEach((csv, i) => {
        zip.file(`test${i}.csv`, csv);
    });
    return zip.generateAsync({type:"nodebuffer"});
}


app.get('/getBinary', async (req, res) => {
    await getZip().then(async content => {
        res.set('Content-Type', 'application/zip');
        res.set('Content-Disposition', 'attachment; filename="from_express_nodebuffer.zip"');

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

// app.listen(3000, () => {
//     console.log('listening on port 3000');
// });

module.exports = {
    getZip
}