import models from '../models';

const { User } = models;

/**
 *
 * @description - class to manage operations with the database
 * @class UserService
 */
class UserService {
  /**
   * @description - method to check if a user exists
   * @static
   * @returns { boolean } true or false
   * @param {String} user
   * @memberof ValidationService
   */
  static async getUser(user) {
    try {
      const foundUser = await User.findOne({
        where: { ...user }
      });
      return foundUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default UserService;
