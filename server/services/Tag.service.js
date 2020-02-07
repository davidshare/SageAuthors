import models from '../models';

const { Tag } = models;

/**
 *
 * @description - class to manage operations with the database
 * @class TagService
 */
class TagService {
  /**
   *
   * @description method to add new tags
   * @static
   * @param {array} tagsArray
   * @returns {array} tagsAdded
   * @memberof TagService
   */
  static async findOrCreateTag(tagsArray) {
    const tagsAdded = [];
    const tagData = await Promise.all(tagsArray.map((tagName) => Tag.findOrCreate({
      where: { tag: tagName },
      defaults: {
        tag: tagName
      }
    })));
    tagData.forEach((tags) => {
      tagsAdded.push(tags[0].id);
    });
    return tagsAdded;
  }
}

export default TagService;
