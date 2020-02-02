import models from '../models';

const { User, Category } = models;

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

  /**
   * @description - method to check if a category exists
   * @static
   * @returns { boolean } true or false
   * @param {String} category
   * @memberof ValidationService
   */
  static async categoryExists(category) {
    try {
      const categoryExists = await Category.findOne({
        where: { title: category }
      });
      return categoryExists;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default ValidationService;
