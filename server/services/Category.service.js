import models from '../models';

const { Category } = models;

/**
 *
 * @description - class to manage operations with the database
 * @class CategoryService
 */
class CategoryService{

  /**
   *
   * @description - method to create a category
   * @static
   * @param {string} title
   * @returns {object} category object
   * @memberof CategoryService
   */
  static async saveCategory(title){
    try{
      const category = await Category.create(title);
      if(category){
        return {
          category: category
        };
      }
      return null;
    }catch(error){
      throw new Error(error);
    }
  }
}

export default CategoryService;
