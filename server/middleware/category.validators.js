import ValidationHelper from '../helpers/ValidationHelper';
import { INVALID_CATEGORY, CATEGORY_EXISTS } from '../helpers/constants';
import ValidationService from '../services/Validation.service';

/**
 * @description - method to validate categories data
 * @class CategoryValidator
 */
class CategoryValidator{
  /**
   * @description - method to validate category
   * @static
   * @param { object } request
   * @param { object } response
   * @param { function } next
   * @returns { object } next
   * @memberof CategoryValidator
   */
  static validateCategory(request, response, next){
    const category = request.body.title;
    if(!category || !ValidationHelper.isValidTitle(category)){
      return response.status(400).json({
        success: false,
        message: INVALID_CATEGORY
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
   * @memberof CategoryValidator
   */
  static async isExistingCategory(request, response, next) {
    const category = request.body.title.trim();
    const isDuplicateCategory = await ValidationService.categoryExists(category);
    if (isDuplicateCategory) {
      return response.status(400).json({
        success: false,
        message: CATEGORY_EXISTS
      });
    }

    return next();
  }
}

export default CategoryValidator;
