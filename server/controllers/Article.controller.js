import ArticleService from '../services/Article.service';
import {
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_ERROR
} from '../helpers/constants';
import GeneralHelper from '../helpers/GeneralHelpers';

/**
 * @description - class for handling articles http request and responses
 * @class ArticleController
 */
class ArticleController {
  /**
   * @description - method to create a new article
   * @static
   * @param {object} request
   * @param {object} response
   * @param {object} next
   * @returns {object} article object
   * @memberof ArticleController
   */
  static async createArticle(request, response, next) {
    try {
      const {
        title,
        body,
        published,
        featuredImage,
        category,
        categoryId,
        tags
      } = request.body;
      const userId = request.user.id;

      const slug = GeneralHelper.generateUniqueSlug(title);
      const readTime = GeneralHelper.calculateArticleReadTime(body);
      const article = await ArticleService.saveArticle({
        userId,
        title,
        body,
        category,
        slug,
        published,
        featuredImage,
        readTime,
        categoryId
      }, tags);

      if (!article || article.length < 1) {
        return response.status(500).send({
          success: false,
          message: CREATE_ARTICLE_ERROR,
          article
        });
      }

      return response.status(200).send({
        success: true,
        message: CREATE_ARTICLE_SUCCESS,
        article
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default ArticleController;
