const console = require('console');
const MongoHelper = require('../infra/helpers/mongo-helper');
const app = require('./config/app');
const { mongoUrl } = require('./config/env');

(async () => {
  try {
    const db = new MongoHelper(mongoUrl);
    await db.connect();
    app.listen(5858, () => console.log('[server] running'));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
