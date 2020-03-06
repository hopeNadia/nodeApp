const mongoose = require('mongoose');
const multer = require('multer');
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');

class SingletonClass {
  constructor() {
    if (SingletonClass.instance) {
      return SingletonClass.instance;
    }

    SingletonClass.instance = this;

    return this;
  }
}

class MongoDBClass extends SingletonClass {
  constructor() {
    super();

    this._dbConnectionUri =
      'mongodb+srv://atlasHomeAdmin:UHBkEyIeuswbHMY9@cluster1-ibgto.mongodb.net/test?retryWrites=true&w=majority';
    this._localGridFsStorage = null;
    this._connection = null;
    this._multerUpload = null;
  }
  get localGridFsStorage() {
    return this._localGridFsStorage;
  }

  get multerUpload() {
    return this._multerUpload;
  }

  init = callback => {
    mongoose.connect(this._dbConnectionUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      promiseLibrary: global.Promise
    });
    mongoose.Promise = global.Promise;
    this._connection = mongoose.connection;

    this._connection.on('error', console.error.bind(console, 'DB connection error'));

    console.log('#Success DB');

    this._connection.once('open', () => {
      this._localGridFsStorage = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'uploads'
      });
      console.log('#Success init storage');
    });

    const storage = new GridFsStorage({
      url: this._dbConnectionUri,
      file: (req, file) => {
        return new Promise((resolve, reject) => {
          crypto.randomBytes(16, (err, buf) => {
            if (err) {
              return reject(err);
            }
            const filename = file.originalname;
            const fileInfo = {
              filename: filename,
              bucketName: 'uploads'
            };
            resolve(fileInfo);
          });
        });
      }
    });

    this._multerUpload = multer({storage});

    callback();
  };
}

const mongoDB = new MongoDBClass();

mongoDB.init(() => {
  console.log('#Init');
});

module.exports = {
  mongoDB
};
