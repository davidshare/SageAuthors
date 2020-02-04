import models from '../models';

const { User } = models;

/**
 * @description - used for accessing user data
 * @class ValidationService
 */
class ValidationService {
  /**
   * @description - method to check if a email exists
   * @static
   * @returns { boolean } true or false
   * @param {String} email
   * @memberof ValidationService
   */
  static async emailExists(email) {
    try {
      const emailExists = await User.findOne({ where: { email: email } });
      return emailExists;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description - method to check if a username exists
   * @static
   * @returns { boolean } true or false
   * @param {String} username
   * @memberof ValidationService
   */
  static async usernameExists(username) {
    try {
      const usernameExists = await User.findOne({
        where: { username: username }
      });
      return usernameExists;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default ValidationService;
