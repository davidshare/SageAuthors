import {
  EMAIL_REGEX,
  PASS_REGEX,
  NAME_REGEX,
  TITLE_REGEX,
  USERNAME_REGEX,
  UUID_REGEX
} from './constants';

/**
 * @class ValidationHelpers
 * @description class to host methods for validations
 */
class ValidationHelper {
  /**
   * @static
   * @description checks if an email syntax is right or wrong
   * @param {String} email
   * @returns {Boolean} Boolean
   * @memberof ValidationHelper
   */
  static isValidEmail(email) {
    return EMAIL_REGEX.test(email);
  }

  /**
   * @static
   * @description checks if an username syntax is right or wrong
   * @param {String} username
   * @returns {Boolean} Boolean
   * @memberof ValidationHelper
   */
  static isValidUsername(username) {
    return USERNAME_REGEX.test(username);
  }

  /**
   * @static
   * @description checks if a password syntax is right
   * @param {String} password to be tested
   * @returns {Boolean} returns true or false
   * @memberof ValidationHelper
   */
  static isValidPass(password) {
    return PASS_REGEX.test(password);
  }

  /**
   * @static
   * @description checks if a name syntax is right
   * @param {String} name to be tested
   * @return {Boolean} returns true or false
   * @memberof ValidationHelper
   */
  static isValidName(name) {
    return NAME_REGEX.test(name);
  }

  /**
   * @static
   * @description validates the syntax of the title
   * @param {String} title to be tested
   * @return {Boolean} returns true or false
   * @memberof ValidationHelper
   */
  static isValidTitle(title) {
    return TITLE_REGEX.test(title);
  }

  /**
   * @static
   * @description - method to check if a value is empty
   * @param {String} value
   * @memberof ValidationHelper
   * @return {Boolean} returns true or false
   */
  static isEmpty(value) {
    return !value || !value.trim();
  }

  /**
   * @static
   * @description checks if a uuid is valid
   * @param {uuid} uuid to be tested
   * @memberof ValidationHelper
   * @return {Boolean} returns true or false
   */
  static isValidUUID(uuid) {
    return UUID_REGEX.test(uuid);
  }
}

export default ValidationHelper;
