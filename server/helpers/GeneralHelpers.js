import slug from 'slug';
/**
 * @class GeneralHelpers
 * @description class to host authentication methods
 */
class GeneralHelper {
  /**
   * @description function to generate unique slug - credit to Daniel Eze (Author's Haven)
   * @static
   * @param {string} title - article title
   * @returns {string} random string
   * @memberof GeneralHelpers
   */
  static generateUniqueSlug(title) {
    return `${slug(title, { lower: true })}-${Math.random()
      .toString(36)
      .substr(2, 10)}`;
  }

  /**
   * @description Calculates the time it takes to read an article
   * @param {string} article
   * @returns {integer} Time taken to read article
   */
  static calculateArticleReadTime(article) {
    const wordsPerMinute = 275;
    const words = article.split(' ').length;
    const readTime = (words / wordsPerMinute).toFixed(0);
    return readTime == 0 ? 1 : readTime;
  }
}

export default GeneralHelper;
