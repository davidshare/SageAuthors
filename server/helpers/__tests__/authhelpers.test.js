import AuthHelpers from '../AuthHelpers';
import { REQUIRED_PASSWORD, REQUIRED_COMPARE_PASSWORDS } from '../constants';

describe('Test for auth helpers', () => {
  it('should return a valid token', () => {
    const token = AuthHelpers.generateJWT({
      firstname: 'Sunday',
      lastname: 'Itam',
      email: 'sunday@gmail.com',
      username: 'sunnyboy',
      password: 'Krispygo,golang2020@'
    });

    expect(AuthHelpers.verifyToken(token)).toBeInstanceOf(Object);
  });

  it( '(encryptPassword) should throw an error if password is null '+
  'or empty for password encryption', ()=> {
    expect(() => AuthHelpers.encryptPassword(null)).toThrowError(
      REQUIRED_PASSWORD
    );
  });

  it( '(comparePasswords) should throw an error if password '+
  'or hashed password is not valid ', ()=> {
    expect(() => AuthHelpers.comparePasswords(null, null)).toThrowError(
      REQUIRED_COMPARE_PASSWORDS
    );
  });

  it( '(generateJWT) should throw an error if  '+
  'the supplied user object is invalid', ()=> {
    expect(() => AuthHelpers.generateJWT({})).toThrowError(
      'Please supply a valid user object.'
    );
  });

  it( '(verifyToken) should throw an error if the token is not a string', ()=> {
    expect(() => AuthHelpers.verifyToken({})).toThrowError(
      'Please supply a valid token.'
    );
  });

  it( '(verifyToken) should return an error if the token is invalid', ()=> {
    const verified = AuthHelpers.verifyToken('8393jddui');
    expect(verified.name).toBe('JsonWebTokenError');
    expect(verified.message).toBe('jwt malformed');
  });

  it( '(stripDate) should throw an error if  '+
  'the supplied user object is invalid', ()=> {
    expect(() => AuthHelpers.stripDateAndPassword({})).toThrowError(
      'Please enter a valid user object.'
    );
  });
});
