import request from 'supertest';
import app from '../../index';
import {
  API_PREFIX,
  CREATE_CATEGORY_SUCCESS,
  INVALID_CATEGORY,
  CATEGORY_EXISTS,
  INVALID_TOKEN
} from '../../helpers/constants';
import { userSeeds } from '../../seeders';
import CategoryController from '../Category.controller';

describe('Test the create category endpoint', () => {
  let userToken;
  beforeAll( async(done) => {
    const response = await request(app)
    .post(`${API_PREFIX}auth/signup`)
    .send(userSeeds.user6);
    userToken = response.body.token;
    done();
  });

  it('should create a category successfully', async(done) => {
    const response = await request(app).post(`${API_PREFIX}categories`)
    .send({category: 'psychology'})
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(CREATE_CATEGORY_SUCCESS);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });

  it('should not create a category with invalid title', async(done) => {
    const response = await request(app).post(`${API_PREFIX}categories`)
    .send({category: '34psychology'})
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(INVALID_CATEGORY);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create a duplicate category', async(done) => {
    const response = await request(app).post(`${API_PREFIX}categories`)
    .send({category: 'psychology'})
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(CATEGORY_EXISTS);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create a category with an invalid token', async(done) => {
    const category = {
      categoryId: '6cd2a296-3974-40f1-9a5a-8bcbca21c80e'
    };
    const response = await request(app).post(`${API_PREFIX}categories`)
    .send(category)
    .set('Authorization', `Bearer ${'ioerqwwfcweqwrqwrq'}`);
    expect(response.body.message).toBe(INVALID_TOKEN);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should return an error if for an something unaccounted for goes wrong', async(done) => {
    const article = async() => await CategoryController.createCategory({}, {}, ()=>{});
    expect(await article()).toBe(undefined);
    done();
  });
});
