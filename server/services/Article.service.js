import models from '../models';
import TagService from './Tag.service';

const { Article } = models;

/**
 *
 * @description - class to manage operations with the database
 * @class ArticleService
 */
class ArticleService {
  /**
   * @description - method to create a article
   * @static
   * @param {object} articleObject
   * @param  {array} tags
   * @returns {object} article object
   * @memberof ArticleService
   */
  static async saveArticle(articleObject, tags) {
    try {
      const article = await Article.create(articleObject);
      let articleTags;
      if (tags) {
        articleTags = await TagService.findOrCreateTag(tags);
        await article.setTags(articleTags);
        article.dataValues.tags = tags;
      }
      return article;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description - method to update an article
   * @static
   * @param {object} articleObject
   * @param  {array} tags
   * @returns {object} article object
   * @memberof ArticleService
   */
  static async updateArticle(articleObject, tags) {
    try {
      const article = await Article.create(articleObject);
      let articleTags;
      if (tags) {
        articleTags = await TagService.findOrCreateTag(tags);
        await article.setTags(articleTags);
        article.dataValues.tags = tags;
      }
      return article;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description - method to find the owner of a specific article
   * @static
   * @param {object} article
   * @returns {object} article object
   * @memberof ArticleService
   */
  static async getArticle(article) {
    try {
      const foundArticle = await Article.findOne({
        where: { ...article }
      });
      return foundArticle;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description - method to find the owner of a specific article
   * @static
   * @param {object} options
   * @returns {object} article object
   * @memberof ArticleService
   */
  static async getAllArticles(options={}) {
    try {
      const articles = await Article.findAll({ where: { ...options } });
      return articles;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default ArticleService;
