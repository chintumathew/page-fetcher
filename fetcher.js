
const fs = require('fs');
const request = require('request');



const args = process.argv.slice(2);
const url = args[0];
const path = args[1];
let filesize = 0;

//get file size
const getFileSize = (file) => {
  let stats = fs.statSync(file)
  let fileSizeInBytes = stats.size;
  return fileSizeInBytes;
};


//writeFile

const writeFile = (content, path) => {
  fs.writeFile(path, content, err => {
    if (err) {
      console.error(err)
      return
    }
    //file written successfully
    console.log(`Downloaded and saved ${getFileSize(path)} bytes to ${path}`);

  });

};


//send request

const getFile = (url) => {
  request(url, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  writeFile(body, path);
  });
};

getFile(url);