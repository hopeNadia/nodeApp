const Image = require('./imageModel');
const mongoDB = require('../helpers/db');

async function upload(request) {
  console.log(request.body, request.file);

  return {success: true, imageUploaded: request.body};
}

async function get(params) {
  const {fileName} = params;

  const file = await mongoDB.localGridFsStorage.files.findOne({filename: fileName});

  console.log(fileName, file, mongoDB.localGridFsStorage);

  if (!file || file.length === 0) throw 'No such file';

  if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
    // Read output to browser
    const readstream = mongoDB.localGridFsStorage.openDownloadStreamByName(file.filename);
    return readstream;
  } else {
    throw 'Not an image';
  }
}
module.exports = {
  upload,
  get
};
