import CategoryService from '../services/Category.service';
import { CREATE_CATEGORY_ERROR, CREATE_CATEGORY_SUCCESS } from '../helpers/constants';

/**
 * @description - class for handling categories http request and responses
 * @class CategoryController
 */
class CategoryController {

  /**
   * @description - method to create a new category
   * @static
   * @param {object} request
   * @param {object} response
   * @param {object} next
   * @returns {object} category object
   * @memberof CategoryController
   */
  static async createCategory(request, response, next) {
    try {
      const { category } = request.body;
      const categoryObject = await CategoryService.saveCategory({ title: category });
      if (!categoryObject || category.length<1) {
        return response.status(500).send({
          success: false,
          message: CREATE_CATEGORY_ERROR,
          category: categoryObject
        });
      }
      return response.status(200).send({
        success: true,
        message: CREATE_CATEGORY_SUCCESS,
        category: categoryObject.dataValues
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default CategoryController;
