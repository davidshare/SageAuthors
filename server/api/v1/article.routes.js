import ArticleController from '../../controllers/Article.controller';
import ArticleValidator from '../../middleware/article.validators';
import Authentication from '../../middleware/Authentication';

const articleRoutes = (app) => {
  // User signup
  app.post(
    '/api/v1/articles',
    [
      Authentication.authenticateUser,
      ArticleValidator.isValidTitle,
      ArticleValidator.isValidCategoryId,
      ArticleValidator.isValidArticle,
      ArticleValidator.isExistingCategory
    ],
    ArticleController.createArticle
  );
};

export default articleRoutes;
