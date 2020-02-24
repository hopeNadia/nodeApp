const mongoose = require('mongoose');
const multer = require('multer');
const crypto = require('crypto');

const dbConnectionUri =
  'mongodb+srv://atlasHomeAdmin:UHBkEyIeuswbHMY9@cluster1-ibgto.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(dbConnectionUri, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error'));

mongoose.Promise = global.Promise;

const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

let localGridFsStorage;

db.once('open', () => {
  localGridFsStorage = Grid(db.db, mongoose.mongo);
  localGridFsStorage.collection('uploads');
  console.log('Connection Successful');
});

// Create storage engine
const storage = new GridFsStorage({
  url: dbConnectionUri,
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

const multerUpload = multer({storage});

module.exports = {
  User: require('../user/userModel'),
  multerUpload,
  localGridFsStorage
};

// Mongo connection without mongoose: singletone class
// const client = new MongoClient(dbConnectionUri, {useNewUrlParser: true, useUnifiedTopology: true});

// class SingletonClass {
//   constructor() {
//     if (SingletonClass.instance) {
//       return SingletonClass.instance;
//     }

//     SingletonClass.instance = this;

//     return this;
//   }
// }

// class DBMongo extends SingletonClass {
//   constructor() {
//     super();

//     this._collection = null;
//   }

//   get collection() {
//     return this._collection;
//   }

//   set collection(v) {
//     this._collection = v;
//   }

//   initializeCollection(dbName, collectionName) {
//     client.connect((err, dbInst) => {
//       if (err) {
//         console.log('DB error', err);
//       } else {
//         this.collection = dbInst.db(dbName).collection(collectionName);

//         console.log('Mongo DB conection success');
//         // perform actions on the collection object
//         // client.close();
//       }
//     });
//   }

//   closeClient() {
//     client.close();
//   }
// }
