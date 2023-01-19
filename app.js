const JSZip = require('jszip');
const { saveAs } = require('file-saver');
const fs = require('fs');

const zip = new JSZip();
zip.folder("test").file("test.txt", "hejhej");

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