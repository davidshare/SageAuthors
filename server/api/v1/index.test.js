import request from 'supertest';
import app from '../../index';

describe('Test the root route', () => {
  it('should return a status code of 200', async done => {
    const response = await request(app).get('/');
    expect(response.body.message).toBe('Welcome to the SageAuthors');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });
});

describe('Test the 404 route', () => {
  it('should return a status code of 404', async done => {
    const response = await request(app).get('/failure');
    expect(JSON.parse(response.error.text).errors.message).toBe('Not Found');
    expect(response.error.status).toBe(404);
    done();
  });
});
