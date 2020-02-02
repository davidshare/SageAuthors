import CategoryController from '../../controllers/Category.controller';
import CategoryValidator from '../../middleware/category.validators';

const categoryRoutes = app => {
  // User signup
  app.post(
    '/api/v1/categories',
    [CategoryValidator.validateCategory, CategoryValidator.isExistingCategory],
    CategoryController.createCategory
  );
};

export default categoryRoutes;
