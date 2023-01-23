# Corrupted zip files when using SAP CAP
This example repo showcases an issue where SAP CAP seems to be corrupting .zip files generated on the server and passed back to the client from a function handler. The function that generates the .zip is called `loadResponse` and is available [here](https://github.com/Jibbril/cap-return-zip-file/blob/main/express/app.js#L68). 

# Steps to reproduce issue
## Express (working example)
 - run `node express/app.js` to start an express server listening on localhost:3000.
 - Go to `localhost:3000/getCsv` (route setup from [server/app.js](https://github.com/Jibbril/cap-return-zip-file/blob/main/express/app.js#L86)).
 - A zip file containing dummy data is returned. Everything works as expected.
 
## CAP: Custom route
 - Launch CAP using the .vscode launch config.
 - Go to `localhost:4004/getZip` (route setup from [server.js](https://github.com/Jibbril/cap-return-zip-file/blob/main/server.js#L4).
 - A zip file is downloaded, but it is corrupted and cannot be opened.
 
## CAP: Function handler
 - Launch CAP using the .vscode launch config.
 - Go to `localhost:4004/my/getZip()`(route setup from [srv/my-service.js](https://github.com/Jibbril/cap-return-zip-file/blob/main/srv/my-service.js#L17).
 - A zip file is downloaded, but it is corrupted and cannot be opened.
