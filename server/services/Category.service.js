import models from '../models';

const { Category } = models;

/**
 *
 * @description - class to manage operations with the database
 * @class CategoryService
 */
class CategoryService {
  /**
   *
   * @description - method to create a category
   * @static
   * @param {string} title
   * @returns {object} category object
   * @memberof CategoryService
   */
  static async saveCategory(title) {
    try {
      const category = await Category.create(title);
      return {
        ...category
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description - method to check if a category exists
   * @static
   * @returns { boolean } true or false
   * @param {String} category
   * @memberof ValidationService
   */
  static async getCategory(category) {
    try {
      const categoryExists = await Category.findOne({
        where: { ...category }
      });
      return categoryExists;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default CategoryService;
