const { MongoClient } = require('mongodb');

module.exports = class MongoHelper {
  constructor(uri, dbName) {
    Object.assign(this, {
      uri,
      dbName,
      isConnected: false,
      connection: null,
      db: null,
    });
  }

  async connect() {
    this.connection = await MongoClient.connect(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.db = await this.connection.db(this.dbName);
    this.isConnected = true;
  }

  async disconnect() {
    await this.connection.close();
    this.isConnected = false;
  }

  async getDB() {
    if (!this.isConnected) {
      await this.connect(this.uri, this.dbName);
    }
    return this.db;
  }
};
