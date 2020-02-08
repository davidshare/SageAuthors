import GeneralHelper from '../GeneralHelpers';
import { loremIpsumText } from '../../seeders/articleSeeds'
;

describe('Test for auth helpers', () => {
  it('should return a number greater than or equal to 1 for words more than 275', (done) => {
    const readTime = GeneralHelper.calculateArticleReadTime(loremIpsumText);
    expect(parseFloat(readTime)).toBeGreaterThanOrEqual(1);
    done();
  });
});
