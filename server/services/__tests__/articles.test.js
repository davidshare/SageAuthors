import ArticleService from '../Article.service';

describe('Test Artice service', () => {
  it('should throw an error for invalid article objects', async (done) => {
    await expect(ArticleService.saveArticle({ title: '' })).rejects.toThrow();
    done();
  });

  it('getArticle: should throw an error for invalid article objects', async (done) => {
    await expect(ArticleService.getArticle('000')).rejects.toThrow();
    done();
  });
});
