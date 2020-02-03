import models from '../models';
import AuthHelpers from '../helpers/AuthHelpers';

const { User } = models;

/**
 * @description - used for accessing user data
 * @class UserService
 */
class AuthService {
  /**
   * @description - method to create a new user
   * @static
   * @param {object} userData
   * @returns { object } user or null
   * @memberof UserService
   */
  static async signup(userData) {
    try {
      const user = await User.create(userData);
      return AuthHelpers.stripDateAndPassword(user.dataValues);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description - method to signin a user
   * @static
   * @param {object} userData
   * @returns { object } user or null
   * @memberof UserService
   */
  static async signin(userData) {
    try {
      const user = await User.findOne({
        where: { ...userData.login }
      });

      if (
        user &&
        AuthHelpers.comparePasswords(userData.password, user.password)
      ) {
        return AuthHelpers.stripDateAndPassword(user.dataValues);
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default AuthService;
