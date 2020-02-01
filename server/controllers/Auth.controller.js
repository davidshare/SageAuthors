import AuthService from '../services/Auth.services';
import { SIGNUP_SUCCESS, SIGNUP_ERROR } from '../helpers/constants';
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
  static async userSignup(req, res, next){
    try{
      const userObject = req.body;
      if(!userObject.role) userObject.role = 'client';
      userObject.password = AuthHelpers.encryptPassword(userObject.password);
      const user = await AuthService.signup(userObject);
      if(!user){
        return res.status(500).send({
          success: false,
          message: SIGNUP_ERROR,
          user
        });
      }
      return res.status(200).send({
        success: true,
        message: SIGNUP_SUCCESS,
        user
      });
    }catch(error){
      return next(error);
    }
  }
}

export default AuthController;
