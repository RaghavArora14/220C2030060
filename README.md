# Microservices Evaluation Submission

This repository contains two microservices for a web application:

1. **AverageCalc** - A microservice that calculates averages of different number sequences
2. **SMAnalytics** - A microservice that simulates social media analytics functionality

## AverageCalc Service

### Overview
The AverageCalc service provides endpoints to generate different number sequences (prime, Fibonacci, even, random) and calculates a running average based on a sliding window approach.

### Features
- Generates different types of number sequences:
  - `p`: Prime numbers
  - `f`: Fibonacci numbers
  - `e`: Even numbers
  - `r`: Random numbers (default)
- Maintains a sliding window of numbers (max size: 5 elements)
- Removes duplicates automatically
- Returns the current average of all numbers in the window

### Endpoints
- `GET /numbers/:type` - Generate numbers of the specified type
  - Query parameters:
    - `count`: Number of values to generate (default: 5)

### Response Format
```json
{
  "windowPrevState": [...],
  "windowCurrState": [...],
  "numbers": [...],
  "avg": "12.34"
}
```

## SMAnalytics Service

### Overview
The SMAnalytics service provides mock endpoints for social media analytics, including users, posts, and comments data.

### Features
- Retrieves user information
- Gets posts for a specific user
- Gets comments for a specific post

### Endpoints
- `GET /test/users` - Get all users
- `GET /test/users/:userid/posts` - Get all posts for a specific user
- `GET /test/posts/:postid/comments` - Get all comments for a specific post

## Setup and Installation

### Prerequisites
- Node.js
- npm or yarn

### AverageCalc Service
```bash
cd AverageCalc
npm install
```
#### Results:
![image](https://github.com/user-attachments/assets/a95d1851-cd1b-4c05-b94a-1b967119fdb9)
![image](https://github.com/user-attachments/assets/b421a62a-1601-43aa-8446-0e1cfaa5b1ce)
![image](https://github.com/user-attachments/assets/939090f3-a3d4-42db-9719-d0fbb0f53448)


### SMAnalytics Service
```bash
cd SMAnalytics
npm install
```
## Results:
![image](https://github.com/user-attachments/assets/e069dbee-4c26-4c60-bfb8-7da909196cd3)

## Running the Services

### AverageCalc Service
```bash
cd AverageCalc
npm start
```
The service will be available at http://localhost:3000

### SMAnalytics Service
```bash
cd SMAnalytics
npm start
```
The service will be available at http://localhost:3000

## Testing

### AverageCalc Service
```bash
cd AverageCalc
npm test
```

### SMAnalytics Service
```bash
cd SMAnalytics
npm test
```

## API Authentication

The repository includes utility scripts for authentication against an external API:

- `registration.mjs` - Registers with the external API to obtain credentials
- `auth.mjs` - Authenticates using the obtained credentials

## Technologies Used

- Express.js
- Mocha/Chai for testing
- Supertest for API testing

## Project Structure

```
├── AverageCalc/
│   ├── average.js
│   ├── package.json
│   └── test/
│       └── averageCalculator.test.js
├── SMAnalytics/
│   ├── analytics.js
│   ├── package.json
│   └── test/
│       └── analyticstest.js
├── auth.mjs
└── registration.mjs
```
