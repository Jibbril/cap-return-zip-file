const JSZip = require('jszip');
const { saveAs } = require('file-saver');
const fs = require('fs');
const papa = require('papaparse');


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

const aCsvs = data.map(arr => {
    return papa.unparse(arr)
});

const zip = new JSZip();

aCsvs.forEach((csv, i) => {
    zip.file(`test${i}.csv`, csv);
});


// zip.generateAsync({type:"base64"}).then(content => {
//     saveAs(content, "test.zip");
// })

zip.generateAsync({type:"nodebuffer"}).then(content => {
    fs.writeFile("test.zip", content, err => {
        if (err) {
            console.log(err);
        } else {
            console.log("success");
        }
    })
})