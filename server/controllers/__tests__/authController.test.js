import request from 'supertest';
import app from '../../index';
import {userSeeds} from '../../seeders';
import {
  API_PREFIX,
  SIGNUP_SUCCESS,
  EMAIL_EXISTS,
  REQUIRED_FIELDS,
  INVALID_FIRSTNAME,
  INVALID_LASTNAME,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  USERNAME_EXISTS,
  INVALID_USERNAME
} from '../../helpers/constants';

describe('Test the user signup', () => {
  it('should create a user successfully', async(done) => {
    const response = await request(app).post(`${API_PREFIX}auth/signup`)
    .send(userSeeds.user1);
    expect(response.body.message).toBe(SIGNUP_SUCCESS);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });

  it('should return an error if email exists', async(done) => {
    const response = await request(app).post(`${API_PREFIX}auth/signup`)
    .send(userSeeds.user1);
    expect(response.body.message).toBe(EMAIL_EXISTS);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should return an error if username exists', async(done) => {
    const response = await request(app).post(`${API_PREFIX}auth/signup`)
    .send(userSeeds.user12);
    expect(response.body.message).toBe(USERNAME_EXISTS);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create a user without a firstname', async(done) => {
    const response = await request(app).post(`${API_PREFIX}auth/signup`)
    .send(userSeeds.user2);
    expect(response.body.message).toBe(REQUIRED_FIELDS);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create a user with an invalid firstname', async(done) => {
    const response = await request(app).post(`${API_PREFIX}auth/signup`)
    .send(userSeeds.user8);
    expect(response.body.message).toBe(INVALID_FIRSTNAME);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create a user without a lastname', async(done) => {
    const response = await request(app).post(`${API_PREFIX}auth/signup`)
    .send(userSeeds.user3);
    expect(response.body.message).toBe(REQUIRED_FIELDS);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create a user with invalid lastname', async(done) => {
    const response = await request(app).post(`${API_PREFIX}auth/signup`)
    .send(userSeeds.user9);
    expect(response.body.message).toBe(INVALID_LASTNAME);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create a user without an email', async(done) => {
    const response = await request(app).post(`${API_PREFIX}auth/signup`)
    .send(userSeeds.user4);
    expect(response.body.message).toBe(REQUIRED_FIELDS);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create a user with invalid email', async(done) => {
    const response = await request(app).post(`${API_PREFIX}auth/signup`)
    .send(userSeeds.user10);
    expect(response.body.message).toBe(INVALID_EMAIL);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create a user with invalid username', async(done) => {
    const response = await request(app).post(`${API_PREFIX}auth/signup`)
    .send(userSeeds.user13);
    expect(response.body.message).toBe(INVALID_USERNAME);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create a user without an password', async(done) => {
    const response = await request(app).post(`${API_PREFIX}auth/signup`)
    .send(userSeeds.user5);
    expect(response.body.message).toBe(REQUIRED_FIELDS);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create a user with an invalid password', async(done) => {
    const response = await request(app).post(`${API_PREFIX}auth/signup`)
    .send(userSeeds.user11);
    expect(response.body.message).toBe(INVALID_PASSWORD);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });
});
