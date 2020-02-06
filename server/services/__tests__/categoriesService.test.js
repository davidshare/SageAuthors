import CategoryService from '../Category.service';

describe('Test category services', () => {
  it('throw an error for invalid category', async (done) => {
    await expect(CategoryService.saveCategory({ title: '' })).rejects.toThrow();
    done();
  });

  it('getCategory: should throw an error for invalid categort objects', async (done) => {
    await expect(CategoryService.getCategory('000')).rejects.toThrow();
    done();
  });
});
