/* eslint-disable max-len */
const request = require('supertest');
const mongoose = require('mongoose');
const configExpress = require('../config/express');
const { signToken } = require('../auth/local/auth.service');

const payload = {
  email: 'cajaberu18@gmail.com',
  password: '123456',
};

const app = configExpress();

describe('Favs', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  it('should return 200 and get all Favs', async () => {
    const jwt = signToken(payload);

    const { statusCode, body } = await request(app).get('/api/favs').set('Authorization', `Bearer ${jwt}`);
    expect(statusCode).toBe(200);
    expect(body.message).toMatch('These are the all Favs');
  });

  it('should return 200 and get a single fav', async () => {
    const jwt = signToken(payload);

    const id = '6334e702e7839ab5c0bf2811';

    const { statusCode, body } = await request(app).get(`/api/favs/${id}`).set('Authorization', `Bearer ${jwt}`);
    expect(statusCode).toBe(200);
    expect(body.message).toMatch('This is the Single Fav youy requested');
  });

  it('should return 200 and create a favlist', async () => {
    const jwt = signToken(payload);
    const data = {
      name: `List ${Math.floor(Math.random() * 100)}`,
      favItem: [
        {
          title: 'Mi third Fav',
          description: 'This is my second Fav',
          link: 'http://twitter.com',
        },
      ],
    };

    const { statusCode, body } = await request(app).post('/api/favs/').send(data).set('Authorization', `Bearer ${jwt}`);
    expect(statusCode).toBe(200);
    expect(body.message).toMatch('fav successfully created');
  });

  it('should return 200 and delete a favlist', async () => {
    const jwt = signToken(payload);
    const id = '63136fbb76a088eae931df1a';

    // to check another deletion, make sure to add another fav id from the db

    const { statusCode, body } = await request(app).delete(`/api/favs/${id}`).set('Authorization', `Bearer ${jwt}`);
    expect(statusCode).toBe(200);
    expect(body.message).toMatch('Fav successfully deleted');
  });
});
