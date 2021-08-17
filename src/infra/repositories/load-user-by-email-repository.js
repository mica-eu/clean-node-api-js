const { MissingParamError } = require('../../utils/errors');

module.exports = class LoadUserByEmailRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async load(email) {
    if (!email) {
      throw new MissingParamError('email');
    }
    const user = await this.userModel.findOne(
      { email },
      { projection: { password: true } },
    );
    if (user) return user;
    return null;
  }
};
