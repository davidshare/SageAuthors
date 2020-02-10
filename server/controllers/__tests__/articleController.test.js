import request from 'supertest';
import app from '../../index';
import {
  API_PREFIX,
  CREATE_ARTICLE_SUCCESS,
  INVALID_TOKEN,
  NOT_A_CATEGORY,
  REQUIRED_ARTICLE_FIELDS,
  INVALID_CATEGORY_ID,
  INVALID_ARTICLE,
  INVALID_TITLE,
  ARTICLE_EXISTS,
  GET_ARTICLE_SUCCESS,
  ARTICLE_NOT_FOUND,
  NO_ARTICLES_FOUND,
  GET_ALL_ARTICLES_SUCCESS,
  GET_USER_ARTICLES_SUCCESS,
  NO_USER_ARTICLES,
  UPDATE_ARTICLE_SUCCESS,
  INVALID_ARTICLE_ID
} from '../../helpers/constants';
import { userSeeds, articleSeeds } from '../../seeders';
import CategoryService from '../../services/Category.service';
import ArticleController from '../Article.controller';

let userToken;
let userToken2;
let categoryId;
let slug;
let articleObject;

describe('Test the create articles endpoint', () => {
  beforeAll(async (done) => {
    const response = await request(app)
      .post(`${API_PREFIX}auth/signup`)
      .send(userSeeds.user7);
    userToken = response.body.token;
    categoryId = (await CategoryService.saveCategory({ title: 'article test' }))
      .dataValues.id;

    const response2 = await request(app)
      .post(`${API_PREFIX}auth/signup`)
      .send(userSeeds.user18);
    userToken2 = response2.body.token;
    done();
  });

  it('should indicate when no article exists', async (done) => {
    const response = await request(app).get(`${API_PREFIX}articles`);
    expect(response.body.message).toBe(NO_ARTICLES_FOUND);
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should create an article with tags', async (done) => {
    const article = { ...articleSeeds.article1, categoryId };
    const response = await request(app)
      .post(`${API_PREFIX}articles`)
      .send(article)
      .set('Authorization', `Bearer ${userToken}`);
    slug = response.body.article.slug;
    articleObject = response.body.article;
    expect(response.body.message).toBe(CREATE_ARTICLE_SUCCESS);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });

  it('should create an article without tags', async (done) => {
    const article = { ...articleSeeds.article4, categoryId };
    const response = await request(app)
      .post(`${API_PREFIX}articles`)
      .send(article)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(CREATE_ARTICLE_SUCCESS);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });

  it('should not create an article without a token', async (done) => {
    const article = { ...articleSeeds.article1, categoryId };
    const response = await request(app)
      .post(`${API_PREFIX}articles`)
      .send(article);
    expect(response.body.message).toBe(INVALID_TOKEN);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create an article without a title', async (done) => {
    const article = { ...articleSeeds.article2, categoryId };
    const response = await request(app)
      .post(`${API_PREFIX}articles`)
      .send(article)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(REQUIRED_ARTICLE_FIELDS);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create an article wit invalid title', async (done) => {
    const article = { ...articleSeeds.article7, categoryId };
    const response = await request(app)
      .post(`${API_PREFIX}articles`)
      .send(article)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(INVALID_TITLE);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create an without a body', async (done) => {
    const article = { ...articleSeeds.article5, categoryId };
    const response = await request(app)
      .post(`${API_PREFIX}articles`)
      .send(article)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(REQUIRED_ARTICLE_FIELDS);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create an article with invalid categoryId', async (done) => {
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

  it('should not create an article with invalid body', async (done) => {
    const article = { ...articleSeeds.article6, categoryId };
    const response = await request(app)
      .post(`${API_PREFIX}articles`)
      .send(article)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(INVALID_ARTICLE);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create an article with a non existent category', async (done) => {
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

  it('should not create an article with an invalid token', async (done) => {
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

  it('should not create a duplicate article with', async (done) => {
    const article = { ...articleSeeds.article1, categoryId };
    const response = await request(app)
      .post(`${API_PREFIX}articles`)
      .send(article)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(ARTICLE_EXISTS);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should return an error if for an something unaccounted for goes wrong', async (done) => {
    const article = async () => ArticleController.createArticle({}, {}, () => {});
    expect(await article()).toBe(undefined);
    done();
  });
});

describe('Test the get article endpoint', () => {
  it('should get all articles', async (done) => {
    const response = await request(app).get(`${API_PREFIX}articles`);
    expect(response.body.message).toBe(GET_ALL_ARTICLES_SUCCESS);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });

  it('should get all articles for a logged in user', async (done) => {
    const response = await request(app)
      .get(`${API_PREFIX}articles/user`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(GET_USER_ARTICLES_SUCCESS);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });

  it('should not get a users articles if no token is provided', async (done) => {
    const response = await request(app).get(`${API_PREFIX}articles/user`);
    expect(response.body.message).toBe(INVALID_TOKEN);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should return not found if the user has no articles', async (done) => {
    const response = await request(app)
      .get(`${API_PREFIX}articles/user`)
      .set('Authorization', `Bearer ${userToken2}`);
    expect(response.body.message).toBe(NO_USER_ARTICLES);
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should get an article using the slug', async (done) => {
    const response = await request(app).get(`${API_PREFIX}articles/s/${slug}`);
    expect(response.body.message).toBe(GET_ARTICLE_SUCCESS);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });

  it('should not get an article by slug if the slug does not exist', async (done) => {
    const response = await request(app).get(
      `${API_PREFIX}articles/s/adsfdasfa-geaeefef-asererws`
    );
    expect(response.body.message).toBe(ARTICLE_NOT_FOUND);
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    done();
  });
});

describe('Test the update article endpoint', () => {
  it('should update an article', async (done) => {
    const article = { ...articleSeeds.article1, categoryId };
    const articleId = articleObject.id;
    const response = await request(app)
      .put(`${API_PREFIX}articles/${articleId}`)
      .send(article)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(UPDATE_ARTICLE_SUCCESS);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });

  it('should not update an article with an invalid articleId', async (done) => {
    const article = { ...articleSeeds.article1, categoryId };
    const response = await request(app)
      .put(`${API_PREFIX}articles/99dkiere`)
      .send(article)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(INVALID_ARTICLE_ID);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not update an article with invalid title', async (done) => {
    const article = { ...articleSeeds.article1, categoryId };
    const articleId = articleObject.id;
    article.title = 'i';
    const response = await request(app)
      .put(`${API_PREFIX}articles/${articleId}`)
      .send(article)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(INVALID_TITLE);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not update an article with invalid title', async (done) => {
    const article = { ...articleSeeds.article1, categoryId };
    const articleId = articleObject.id;
    article.body = 'i';
    const response = await request(app)
      .put(`${API_PREFIX}articles/${articleId}`)
      .send(article)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(INVALID_ARTICLE);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not update an article with invalid title', async (done) => {
    const article = { ...articleSeeds.article1, categoryId };
    const articleId = articleObject.id;
    article.categoryId = 'i';
    const response = await request(app)
      .put(`${API_PREFIX}articles/${articleId}`)
      .send(article)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(INVALID_CATEGORY_ID);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should use existing content to update is nothing is passed', async (done) => {
    const article = { title:'', body: '' };
    const articleId = articleObject.id;
    const response = await request(app)
      .put(`${API_PREFIX}articles/${articleId}`)
      .send(article)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(UPDATE_ARTICLE_SUCCESS);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });
});
