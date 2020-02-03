import models from '../models';

const { Article } = models;

/**
 *
 * @description - class to manage operations with the database
 * @class ArticleService
 */
class ArticleService {
  /**
   *
   * @description - method to create a article
   * @static
   * @param {object} articleObject
   * @returns {object} article object
   * @memberof ArticleService
   */
  static async saveArticle(articleObject) {
    try {
      const article = await Article.create(articleObject);
      return {
        article
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default ArticleService;
