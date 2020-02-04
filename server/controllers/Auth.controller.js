import AuthService from '../services/Auth.services';
import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNIN_SUCCESS,
  INVALID_SIGNIN
} from '../helpers/constants';
import AuthHelpers from '../helpers/AuthHelpers';

/**
 * @description - for managing requests and response for user data
 * @class AuthController
 */
class AuthController {
  /**
   * @static
   * @description - method for creating a new user
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} - response object
   * @memberof AuthController
   */
  static async userSignup(req, res, next) {
    try {
      const userObject = req.body;
      if (!userObject.role) userObject.role = 'client';
      userObject.password = AuthHelpers.encryptPassword(userObject.password);
      const user = await AuthService.signup(userObject);
      if (!user) {
        return res.status(500).send({
          success: false,
          message: SIGNUP_ERROR,
          user
        });
      }
      return res.status(200).send({
        success: true,
        message: SIGNUP_SUCCESS,
        token: AuthHelpers.generateJWT(user)
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @static
   * @description - method for creating a new user
   * @param {object} request
   * @param {object} response
   * @param {function} next
   * @returns {object} - response object
   * @memberof AuthController
   */
  static async userSignin(request, response, next) {
    try {
      const userData = { password: request.body.password, login: {} };
      if (request.body.email) {
        userData.login.email = request.body.email;
      } else {
        userData.login.username = request.body.username;
      }

      const user = await AuthService.signin({ ...userData });
      if (!user) {
        return response.status(401).send({
          success: false,
          message: INVALID_SIGNIN,
          user
        });
      }
      return response.status(200).send({
        success: true,
        message: SIGNIN_SUCCESS,
        token: AuthHelpers.generateJWT(user)
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default AuthController;
