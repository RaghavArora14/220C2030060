// test/averageCalculator.test.js
import { expect } from 'chai';
import request from 'supertest';
import { app } from '../average.js';



describe('Average Calculator Microservice', function () {
  describe('GET /numbers/p (Prime)', function () {
    it('should return a valid JSON response with prime numbers', async function () {
      const res = await request(app).get('/numbers/p?count=5');
      
      // Log the entire response body
      console.log('Prime (count=5) response:', res.body);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('windowPrevState').that.is.an('array');
      expect(res.body).to.have.property('windowCurrState').that.is.an('array');
      expect(res.body).to.have.property('numbers').that.is.an('array');
      expect(res.body).to.have.property('avg').that.is.a('string');
      expect(res.body.numbers).to.have.lengthOf(5);

      // Quick prime check
      res.body.numbers.forEach(num => {
        expect(isPrime(num)).to.be.true;
      });
    });
  });

  describe('GET /numbers/f (Fibonacci)', function () {
    it('should return a valid JSON response with fibonacci numbers', async function () {
      const res = await request(app).get('/numbers/f?count=5');
      
      // Log the entire response body
      console.log('Fibonacci (count=5) response:', res.body);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('numbers').that.is.an('array');
      expect(res.body.numbers).to.have.lengthOf(5);

      // Check Fibonacci sequence
      const fib = res.body.numbers;
      for (let i = 2; i < fib.length; i++) {
        expect(fib[i]).to.equal(fib[i - 1] + fib[i - 2]);
      }
    });
  });

  describe('GET /numbers/e (Even)', function () {
    it('should return a valid JSON response with even numbers', async function () {
      const res = await request(app).get('/numbers/e?count=4');
      
      // Log the entire response body
      console.log('Even (count=4) response:', res.body);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('numbers').that.is.an('array');
      expect(res.body.numbers).to.have.lengthOf(4);

      // Check even
      res.body.numbers.forEach(num => {
        expect(num % 2).to.equal(0);
      });
    });
  });

  describe('GET /numbers/r (Random)', function () {
    it('should return a valid JSON response with random numbers', async function () {
      const res = await request(app).get('/numbers/r?count=3');
      
      // Log the entire response body
      console.log('Random (count=3) response:', res.body);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('numbers').that.is.an('array');
      expect(res.body.numbers).to.have.lengthOf(3);

      // Check random range
      res.body.numbers.forEach(num => {
        expect(num).to.be.at.least(1);
        expect(num).to.be.at.most(100);
      });
    });
  });

  describe('Sliding Window & Duplicate Removal', function () {
    it('should accumulate numbers and remove duplicates within the window', async function () {
      // 1) Clear the window with a request of 10 random
      let res = await request(app).get('/numbers/r?count=10');
      console.log('After clearing with random(10):', res.body);

      // 2) Request 5 primes
      const primeRes = await request(app).get('/numbers/p?count=5');
      console.log('After requesting 5 primes:', primeRes.body);

      // 3) Request 5 more primes
      const primeRes2 = await request(app).get('/numbers/p?count=5');
      console.log('After requesting another 5 primes:', primeRes2.body);

      const windowState = primeRes2.body.windowCurrState;
      const uniqueValues = new Set(windowState);

      // Log the final window state for clarity
      console.log('Final windowState:', windowState);

      expect(primeRes2.status).to.equal(200);
      expect(uniqueValues.size).to.equal(windowState.length);
      // Make sure we don't exceed the configured WINDOW_SIZE
      expect(windowState.length).to.be.at.most(6); // or 5, depending on your actual window size
    });

    it('should drop oldest items when window exceeds WINDOW_SIZE', async function () {
      // First request
      let res = await request(app).get('/numbers/r?count=5');
      console.log('Request #1 random(5):', res.body);

      // Second request
      res = await request(app).get('/numbers/r?count=5');
      console.log('Request #2 random(5):', res.body);

      // Third request
      res = await request(app).get('/numbers/r?count=5');
      console.log('Request #3 random(5):', res.body);

      // Check final window size
      console.log('Final window state after 3 requests:', res.body.windowCurrState);
      expect(res.status).to.equal(200);
      expect(res.body.windowCurrState.length).to.be.at.most(6); // or 5, depending on your config
    });
  });
});

// Local helper used by prime test
function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}
