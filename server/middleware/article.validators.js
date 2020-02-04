import {
  NOT_A_CATEGORY,
  INVALID_CATEGORY_ID,
  INVALID_ARTICLE,
  INVALID_TITLE
} from '../helpers/constants';
import CategoryService from '../services/Category.service';
import ValidationHelper from '../helpers/ValidationHelper';

/**
 * @description - method to validate categories data
 * @class CategoryValidator
 */
class ArticleValidator{
  /**
   * @static
   * @param { Object } request
   * @param { Object } response
   * @param { Object } next
   * @returns { Object | Callback } response or next
   * @description method to check if a category exist
   * @memberof ArticleValidator
   */
  static async isValidCategoryId(request, response, next) {
    const validCategoryId = ValidationHelper.isValidUUID(request.body.categoryId);
    if (!validCategoryId) {
      return response.status(400).json({
        success: false,
        message: INVALID_CATEGORY_ID
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
   * @description method to check if a category exist
   * @memberof ArticleValidator
   */
  static async isExistingCategory(request, response, next) {
    const category = {id: request.body.categoryId.trim()};
    const categoryExists = await CategoryService.getCategory(category);
    if (!categoryExists) {
      return response.status(400).json({
        success: false,
        message: NOT_A_CATEGORY
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
   * @description method to check if an article is valid
   * @memberof ArticleValidator
   */
  static async isValidArticle(request, response, next) {
    const article = request.body.body;

    if (!article || article.length < 10 ) {
      return response.status(400).json({
        success: false,
        message: INVALID_ARTICLE
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
   * @description method to check if an article title is valid
   * @memberof ArticleValidator
   */
  static async isValidTitle(request, response, next) {
    const title = request.body.title;
    if ( !title || !ValidationHelper.isValidTitle(title) ) {
      return response.status(400).json({
        success: false,
        message: INVALID_TITLE
      });
    }

    return next();
  }
}

export default ArticleValidator;
