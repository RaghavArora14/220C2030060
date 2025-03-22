const { expect } = require('chai');

const request = require('supertest');
const { app } = require('../analytics');

describe('Social Media Analytics Microservice', function () {
  describe('GET /test/users', function () {
    it('should return the list of all users', async function () {
      const res = await request(app).get('/test/users');
      console.log('GET /test/users response:', res.body);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.at.least(1);
      res.body.forEach(user => {
        expect(user).to.have.property('id');
        expect(user).to.have.property('name');
      });
    });
  });
  describe('GET /test/users/:userid/posts', function () {
    it('should return posts for user with id=1', async function () {
      const res = await request(app).get('/test/users/1/posts');
      console.log('GET /test/users/1/posts response:', res.body);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('posts').that.is.an('array');
      const { posts } = res.body;
      expect(posts).to.have.lengthOf(2);
      posts.forEach(post => {
        expect(post.userid).to.equal(1);
      });
    });
    it('should return an empty list for a user with no posts', async function () {
      const res = await request(app).get('/test/users/999/posts');
      console.log('GET /test/users/999/posts response:', res.body);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('posts').that.is.an('array');
      expect(res.body.posts).to.have.lengthOf(0);
    });
  });
  describe('GET /test/posts/:postid/comments', function () {
    it('should return comments for post with id=101', async function () {
      const res = await request(app).get('/test/posts/101/comments');
      console.log('GET /test/posts/101/comments response:', res.body);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('comments').that.is.an('array');
      const { comments } = res.body;
      expect(comments).to.have.lengthOf(2);
      comments.forEach(comment => {
        expect(comment.postid).to.equal(101);
      });
    });
    it('should return an empty list for a post with no comments', async function () {
      const res = await request(app).get('/test/posts/9999/comments');
      console.log('GET /test/posts/9999/comments response:', res.body);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('comments').that.is.an('array');
      expect(res.body.comments).to.have.lengthOf(0);
    });
  });
});
