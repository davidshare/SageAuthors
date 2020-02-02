import request from 'supertest';
import app from '../../index';
import {
  API_PREFIX,
  CREATE_CATEGORY_SUCCESS,
  INVALID_CATEGORY,
  CATEGORY_EXISTS
} from '../../helpers/constants';

describe('Test the category controller', () => {
  it('should create a category successfully', async(done) => {
    const response = await request(app).post(`${API_PREFIX}categories`)
    .send({title: 'psychology'});
    expect(response.body.message).toBe(CREATE_CATEGORY_SUCCESS);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });

  it('should not create a category with invalid title', async(done) => {
    const response = await request(app).post(`${API_PREFIX}categories`)
    .send({title: '34psychology'});
    expect(response.body.message).toBe(INVALID_CATEGORY);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should create a duplicate category', async(done) => {
    const response = await request(app).post(`${API_PREFIX}categories`)
    .send({title: 'psychology'});
    expect(response.body.message).toBe(CATEGORY_EXISTS);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });
});
