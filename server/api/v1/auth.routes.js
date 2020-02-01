import AuthController from '../../controllers/Auth.controller';
import UserValidator from '../../middleware/UserValidators';

const authRoutes = app => {
  // User signup
  app.post(
    '/api/v1/auth/signup',
    [
      UserValidator.requiredSignupValues,
      UserValidator.isValidEmail,
      UserValidator.isExistingEmail,
      UserValidator.isValidUsername,
      UserValidator.isExistingUsername,
      UserValidator.isValidFirstname,
      UserValidator.isValidLastname,
      UserValidator.isValidPass,
    ],
    AuthController.userSignup
  );

  app.post(
    '/api/v1/auth/signin',
    UserValidator.requireSigninValues,
    AuthController.userSignin
  );
};

export default authRoutes;
