import ArticleService from '../services/Article.service';
import {
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_ERROR,
  ARTICLE_NOT_FOUND,
  GET_ARTICLE_SUCCESS,
  NO_ARTICLES_FOUND,
  GET_ALL_ARTICLES_SUCCESS,
  GET_USER_ARTICLES_SUCCESS,
  NO_USER_ARTICLES,
  UPDATE_ARTICLE_ERROR,
  UPDATE_ARTICLE_SUCCESS
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
        categoryId,
        tags
      } = request.body;
      const userId = request.user.id;

      const slug = GeneralHelper.generateUniqueSlug(title);
      const readTime = GeneralHelper.calculateArticleReadTime(body);
      const article = await ArticleService.saveArticle(
        {
          userId,
          title,
          body,
          slug,
          published,
          featuredImage,
          readTime,
          categoryId
        },
        tags
      );

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

  /**
   * @description - method to update an article
   * @static
   * @param {object} request
   * @param {object} response
   * @param {object} next
   * @returns {object} article object
   * @memberof ArticleController
   */
  static async updateArticle(request, response, next) {
    const { articleId } = request.params;
    const article = await ArticleService.getArticle({ id: articleId });
    try {
      const {
        title,
        body,
        published,
        featuredImage,
        categoryId,
        tags,
      } = request.body;

      const articleTags = tags || article.tags;
      const readTime = GeneralHelper.calculateArticleReadTime(body);
      const updatedArticle = await ArticleService.updateArticle(
        {
          title: title || article.title,
          body: body || article.body,
          published: published || article.published,
          featuredImage: featuredImage || article.featuredImage,
          readTime: readTime || article.readTime,
          categoryId: categoryId || article.categoryId,
          slug: article.slug
        },
        articleTags
      );

      if (!updatedArticle || updatedArticle.length < 1) {
        return response.status(500).send({
          success: false,
          message: UPDATE_ARTICLE_ERROR,
          updatedArticle
        });
      }

      return response.status(200).send({
        success: true,
        message: UPDATE_ARTICLE_SUCCESS,
        updatedArticle
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @static
   * @description - method to get an article using the slug
   * @param { Object } request
   * @param { Object } response
   * @param { function } next
   * @returns { Object } response object
   * @memberof ArticleController
   */
  static async getArticleBySlug(request, response, next) {
    const { slug } = request.params;
    try {
      const article = await ArticleService.getArticle({ slug });
      if (!article) {
        return response.status(404).send({
          success: false,
          message: ARTICLE_NOT_FOUND,
          article
        });
      }
      return response.status(200).send({
        success: true,
        message: GET_ARTICLE_SUCCESS,
        article
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @static
   * @description - method to get an article from a specific user
   * @param { Object } request
   * @param { Object } response
   * @param { function } next
   * @returns { Object } response object
   * @memberof ArticleController
   */
  static async getUserArticles(request, response, next) {
    const userId = request.user.id;
    try {
      const articles = await ArticleService.getAllArticles({ userId });
      if (!articles || articles.length < 1) {
        return response.status(404).send({
          success: false,
          message: NO_USER_ARTICLES,
          articles
        });
      }
      return response.status(200).send({
        success: true,
        message: GET_USER_ARTICLES_SUCCESS,
        articles
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @static
   * @description - method to get all articles
   * @param { Object } request
   * @param { Object } response
   * @param { function } next
   * @returns { Object } response object
   * @memberof ArticleController
   */
  static async getAllArticles(request, response, next) {
    try {
      const articles = await ArticleService.getAllArticles();
      if (!articles || articles.length < 1) {
        return response.status(404).send({
          success: false,
          message: NO_ARTICLES_FOUND,
          articles
        });
      }
      return response.status(200).send({
        success: true,
        message: GET_ALL_ARTICLES_SUCCESS,
        articles
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default ArticleController;
