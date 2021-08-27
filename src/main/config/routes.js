/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const router = require('express').Router();
const fastGlob = require('fast-glob');

module.exports = (app) => {
  fastGlob
    .sync('**/src/main/routes/**.js')
    .forEach((file) => require(`../../../${file}`)(router));
  app.use('api', router);
};
