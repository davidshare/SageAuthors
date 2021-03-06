import ValidationHelper from '../helpers/ValidationHelper';
import ValidationService from '../services/Validation.service';
import {
  INVALID_FIRSTNAME,
  INVALID_LASTNAME,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  EMAIL_EXISTS,
  REQUIRED_FIELDS,
  USERNAME_EXISTS,
  INVALID_USERNAME
} from '../helpers/constants';

/**
 * @class UserValidator
 * @description class for middlewares for validating user input
 */
class UserValidator {
  /**
   * @static
   * @param {Object} request
   * @param {Object} response
   * @param {Callback} next
   * @returns {object | callback } next or response object
   * @description method to check if firstname is valid
   * @memberof UserValidator
   */
  static isValidFirstname(request, response, next) {
    if (!ValidationHelper.isValidName(request.body.firstname.trim())) {
      return response.status(400).json({
        success: false,
        message: INVALID_FIRSTNAME
      });
    }
    return next();
  }

  /**
   * @static
   * @param {Object} request
   * @param {Object} response
   * @param { Callback } next
   * @returns {object | callback} next or response object
   * @description method to check if lastname is valid
   * @memberof UserValidator
   */
  static isValidLastname(request, response, next) {
    if (!ValidationHelper.isValidName(request.body.lastname.trim())) {
      return response.status(400).json({
        success: false,
        message: INVALID_LASTNAME
      });
    }
    return next();
  }

  /**
   * @static
   * @param {Object} request
   * @param {Object} response
   * @param {Callback} next
   * @returns {Object | Callback} next or response object
   * @description method to check if email is valid
   * @memberof UserValidator
   */
  static isValidEmail(request, response, next) {
    if (!ValidationHelper.isValidEmail(request.body.email.trim())) {
      return response.status(400).json({
        success: false,
        message: INVALID_EMAIL
      });
    }
    return next();
  }

  /**
   * @static
   * @param { Object } request
   * @param {Object} response
   * @param {Callback} next
   * @returns {Object | Callback} next or response object
   * @description method to check if email is valid
   * @memberof UserValidator
   */
  static isValidPass(request, response, next) {
    if (!ValidationHelper.isValidPass(request.body.password.trim())) {
      return response.status(400).json({
        success: false,
        message: INVALID_PASSWORD
      });
    }
    return next();
  }

  /**
   * @static
   * @param { Object } request
   * @param { Object } response
   * @param { Object } next
   * @returns { Object | Callback } response or next
   * @description method to check if a user exists using the email
   * @memberof UserValidator
   */
  static async isExistingEmail(request, response, next) {
    const email = request.body.email.trim();
    const isDuplicateEmail = await ValidationService.emailExists(email);

    if (isDuplicateEmail) {
      return response.status(400).json({
        success: false,
        message: EMAIL_EXISTS
      });
    }

    return next();
  }

  /**
   * @static
   * @param {Object} request
   * @param {Object} response
   * @param {Callback} next
   * @returns {Object | Callback} next or response object
   * @description method to check if email is valid
   * @memberof UserValidator
   */
  static isValidUsername(request, response, next) {
    if (!ValidationHelper.isValidUsername(request.body.username.trim())) {
      return response.status(400).json({
        success: false,
        message: INVALID_USERNAME
      });
    }
    return next();
  }

  /**
   * @static
   * @param { Object } request
   * @param { Object } response
   * @param { Object } next
   * @returns { Object | Callback } response or next
   * @description method to check if a user exists using the email
   * @memberof UserValidator
   */
  static async isExistingUsername(request, response, next) {
    const username = request.body.username.trim();
    const isDuplicateUsername = await ValidationService.usernameExists(username);
    if (isDuplicateUsername) {
      return response.status(400).json({
        success: false,
        message: USERNAME_EXISTS
      });
    }

    return next();
  }

  /**
   * @param { Object } request
   * @param { Object } response
   * @param { Callback } next
   * @returns { Object | Callback } returns an Object or call back
   * @description method to check if all signup fields have been filled
   * @memberof UserValidator
   */
  static requiredSignupValues(request, response, next) {
    const { firstname, lastname, email, username, password } = request.body;
    if (
      ValidationHelper.isEmpty(firstname)
      || ValidationHelper.isEmpty(lastname)
      || ValidationHelper.isEmpty(email)
      || ValidationHelper.isEmpty(username)
      || ValidationHelper.isEmpty(password)
    ) {
      return response.status(400).json({
        success: false,
        message: REQUIRED_FIELDS
      });
    }

    return next();
  }

  /**
   * @param { Object } request
   * @param { Object } response
   * @param { Callback } next
   * @returns { Object | Callback } returns an Object or call back
   * @description method to check if all signup fields have been filled
   * @memberof UserValidator
   */
  static requireSigninValues(request, response, next) {
    const { email, username, password } = request.body;
    if (
      (ValidationHelper.isEmpty(email) && ValidationHelper.isEmpty(username))
      || ValidationHelper.isEmpty(password)
    ) {
      return response.status(400).json({
        success: false,
        message: REQUIRED_FIELDS
      });
    }
    return next();
  }
}

export default UserValidator;
