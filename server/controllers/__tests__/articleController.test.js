import request from 'supertest';
import app from '../../index';
import {
  API_PREFIX,
  CREATE_ARTICLE_SUCCESS,
  INVALID_TOKEN,
  INVALID_TITLE,
  INVALID_ARTICLE,
  INVALID_CATEGORY_ID,
  NOT_A_CATEGORY
} from '../../helpers/constants';
import { userSeeds, articleSeeds } from '../../seeders';
import CategoryService from '../../services/Category.service';
import ArticleController from '../Article.controller';

describe('Test the create articles endpoint', () => {
  let userToken;
  let categoryId;
  beforeAll(async done => {
    const response = await request(app)
      .post(`${API_PREFIX}auth/signup`)
      .send(userSeeds.user7);
    userToken = response.body.token;
    categoryId = (await CategoryService.saveCategory({ title: 'article test' }))
      .dataValues.id;
    done();
  });

  it('should create an article', async done => {
    const article = { ...articleSeeds.article1, categoryId };
    const response = await request(app)
      .post(`${API_PREFIX}articles`)
      .send(article)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(CREATE_ARTICLE_SUCCESS);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });

  it('should not create an without a token article', async done => {
    const article = { ...articleSeeds.article1, categoryId };
    const response = await request(app)
      .post(`${API_PREFIX}articles`)
      .send(article);
    expect(response.body.message).toBe(INVALID_TOKEN);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create an without a title', async done => {
    const article = { ...articleSeeds.article2, categoryId };
    const response = await request(app)
      .post(`${API_PREFIX}articles`)
      .send(article)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(INVALID_TITLE);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create an without a body', async done => {
    const article = { ...articleSeeds.article3, categoryId };
    const response = await request(app)
      .post(`${API_PREFIX}articles`)
      .send(article)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(INVALID_ARTICLE);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create an with invalid categoryId', async done => {
    const article = { ...articleSeeds.article3, categoryId: '989derer' };
    const response = await request(app)
      .post(`${API_PREFIX}articles`)
      .send(article)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(INVALID_CATEGORY_ID);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create an article with a non existent category', async done => {
    const article = {
      ...articleSeeds.article1,
      categoryId: '6cd2a296-3974-40f1-9a5a-8bcbca21c80e'
    };
    const response = await request(app)
      .post(`${API_PREFIX}articles`)
      .send(article)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(NOT_A_CATEGORY);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create an article with an invalid token', async done => {
    const article = {
      ...articleSeeds.article1,
      categoryId: '6cd2a296-3974-40f1-9a5a-8bcbca21c80e'
    };
    const response = await request(app)
      .post(`${API_PREFIX}articles`)
      .send(article)
      .set('Authorization', `Bearer ${'ioerqwwfcweqwrqwrq'}`);
    expect(response.body.message).toBe(INVALID_TOKEN);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should return an error if for an something unaccounted for goes wrong', async done => {
    const article = async () =>
      await ArticleController.createArticle({}, {}, () => {});
    expect(await article()).toBe(undefined);
    done();
  });
});
