module.exports = class LoadUserByEmailRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async load(email) {
    const user = await this.userModel.findOne(
      { email },
      { projection: { password: true } },
    );
    if (user) return user;
    return null;
  }
};
