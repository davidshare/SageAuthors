import AuthService from '../Auth.services';

describe('Test Auth service', () => {
  it('should throw an error for invalid signup objects', async done => {
    await expect(AuthService.signup({ title: '' })).rejects.toThrow();
    done();
  });
});
