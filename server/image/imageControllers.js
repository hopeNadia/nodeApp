const Image = require('./imageModel');
const {localGridFsStorage} = require('../helpers/db');

async function upload(request) {
  console.log(request.body, request.file);

  return {success: true, imageUploaded: request.body};
}

async function get(params) {
  const {fileName} = params;

  console.log(fileName, localGridFsStorage);

  const file = await localGridFsStorage.files.findOne({filename: fileName});

  if (!file || file.length === 0) throw 'No such file';

  if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
    // Read output to browser
    const readstream = localGridFsStorage.createReadStream(file.filename);
    return readstream;
  } else {
    throw 'Not an image';
  }
}
module.exports = {
  upload,
  get
};
