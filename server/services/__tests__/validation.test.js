import ValidationService from '../Validation.service';

describe('Test Validation services', () => {
  it('throw an error for invalid email', async (done) => {
    await expect( ValidationService.emailExists() ).rejects.toThrow();
    done();
  });

  it('throw an error for invalid username', async (done) => {
    await expect( ValidationService.usernameExists() ).rejects.toThrow();
    done();
  });
});
