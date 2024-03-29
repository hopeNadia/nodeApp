const MongoClient = require('mongodb').MongoClient;
const dbConnectionUri =
  'mongodb+srv://atlasHomeAdmin:UHBkEyIeuswbHMY9@cluster1-ibgto.mongodb.net/test?retryWrites=true&w=majority';

const client = new MongoClient(dbConnectionUri, {useNewUrlParser: true, useUnifiedTopology: true});

class SingletonClass {
  constructor() {
    if (SingletonClass.instance) {
      return SingletonClass.instance;
    }

    SingletonClass.instance = this;

    return this;
  }
}

class DBMongo extends SingletonClass {
  constructor() {
    super();

    this._collection = null;
  }

  get collection() {
    return this._collection;
  }

  set collection(v) {
    this._collection = v;
  }

  initializeCollection(dbName, collectionName) {
    client.connect((err, dbInst) => {
      if (err) {
        console.log('DB error', err);
      } else {
        this.collection = dbInst.db(dbName).collection(collectionName);

        console.log('Mongo DB conection success');
        // perform actions on the collection object
        // client.close();
      }
    });
  }

  closeClient() {
    client.close();
  }
}

module.exports = DBMongo;
