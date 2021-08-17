const { MongoClient } = require('mongodb');

module.exports = class MongoHelper {
  constructor(uri, dbName) {
    Object.assign(this, {
      uri,
      dbName,
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
  }

  async disconnect() {
    await this.connection.close();
    this.connection = null;
    this.db = null;
  }

  async getDB() {
    if (!this.connection || !this.connection.isConnected()) {
      await this.connect(this.uri, this.dbName);
    }
    return this.db;
  }
};
