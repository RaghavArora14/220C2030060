// averageCalculator.js (ESM)
import express from 'express';

const app = express();
const PORT = 3000;
const WINDOW_SIZE = 5;
let windowData = [];

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function prime(count) {
  const primes = [];
  let current = 2;
  while (primes.length < count) {
    if (isPrime(current)) {
      primes.push(current);
    }
    current++;
  }
  return primes;
}

function fibo(count) {
  const fib = [0, 1];
  while (fib.length < count) {
    fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
  }
  return fib.slice(0, count);
}

function even(count) {
  const evens = [];
  let current = 2;
  while (evens.length < count) {
    evens.push(current);
    current += 2;
  }
  return evens;
}

function rand(count) {
  const randoms = [];
  for (let i = 0; i < count; i++) {
    randoms.push(Math.floor(Math.random() * 100) + 1);
  }
  return randoms;
}

function average(arr) {
  if (!arr.length) return 0;
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return sum / arr.length;
}

app.get('/numbers/:type', (req, res) => {
  const type = req.params.type || 'r';
  const count = parseInt(req.query.count) || 5;

  const windowPrevState = [...windowData];

  let newNumbers = [];
  switch (type) {
    case 'p':
      newNumbers = prime(count);
      break;
    case 'f':
      newNumbers = fibo(count);
      break;
    case 'e':
      newNumbers = even(count);
      break;
    case 'r':
    default:
      newNumbers = rand(count);
      break;
  }

  const combined = new Set([...windowData, ...newNumbers]);
  windowData = Array.from(combined);

  while (windowData.length > WINDOW_SIZE) {
    windowData.shift();
  }

  const windowCurrState = [...windowData];
  const avg = average(windowData);

  res.json({
    windowPrevState,
    windowCurrState,
    numbers: newNumbers,
    avg: avg.toFixed(2),
  });
});

// Export the app for testing
export { app };

// If this file is run directly via "node averageCalculator.js", start the server:
if (import.meta.url === process.argv[1] /* or process.argv[1].endsWith('averageCalculator.js') */) {
  app.listen(PORT, () => {
    console.log(`Average Calculator Microservice running on port ${PORT}`);
  });
}
