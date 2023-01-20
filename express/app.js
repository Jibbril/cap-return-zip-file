const JSZip = require('jszip');
const papa = require('papaparse');
const express = require('express');
const { Readable } = require('stream');
const XLSX = require('xlsx');

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

const buildCsv = () => {
    return data.map(arr => {
        return papa.unparse(arr)
    });
}

const buildXlsx = () => {
    return data.map((arr, i) => {
        const book = XLSX.utils.book_new();
        const sheet = XLSX.utils.json_to_sheet(arr);
        XLSX.utils.book_append_sheet(book, sheet, `test${i}`);
        return XLSX.write(book, {type: 'buffer'});
    });
}

const buildJson = () => {
    return data.map(arr => {
        return JSON.stringify(arr);
    });
}

const buildDocs = (type) => {
    switch (type) {
        case 'csv' : return buildCsv();
        case 'xlsx': return buildXlsx();
        case 'json': return buildJson();
    }
}

const getZip = async (type) => {
    const aDocs = buildDocs(type);
    const zip = new JSZip();
    aDocs.forEach((doc, i) => {
        zip.file(`test${i}.${type}`, doc);
    });
    return zip.generateAsync({type:"nodebuffer"});
}

const loadResponse = async (res, type) => {
    const content = await getZip(type);
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
}


app.get('/getCsv', async (req, res) => {
    await loadResponse(res, 'csv');
});

app.get('/getXlsx', async (req, res) => {
    await loadResponse(res, 'xlsx');
});

app.get('/getJson', async (req, res) => {
    await loadResponse(res, 'json');
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});

module.exports = {
    loadResponse,
    getZip
}