import models from '../models';

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
  static async signup(userData){
    try {
      const user = await User.create(userData);
      if (user) {
        return {
          user
        };
      }
      return null;
    }catch(error){
      throw new Error(error);
    }
  }
}

export default AuthService;
