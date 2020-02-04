import CategoryController from '../../controllers/Category.controller';
import CategoryValidator from '../../middleware/category.validators';
import Authentication from '../../middleware/Authentication';

const categoryRoutes = app => {
  // User signup
  app.post(
    '/api/v1/categories',
    [
      Authentication.authenticateUser,
      CategoryValidator.validateCategory,
      CategoryValidator.isExistingCategory],
    CategoryController.createCategory
  );
};

export default categoryRoutes;
