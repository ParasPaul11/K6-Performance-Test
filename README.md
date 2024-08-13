# K6 Performance Test

This repository contains an advanced performance testing setup using the K6 framework. The project includes package management, Webpack bundling, advanced K6 scenarios and thresholds, and continuous integration with GitHub Actions.

## **Table of Contents**

- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [K6 Test Script](#k6-test-script)
- [Webpack Configuration](#webpack-configuration)
- [GitHub Actions CI](#github-actions-ci)
- [Running the Tests Locally](#running-the-tests-locally)


## **Prerequisites**

Before you begin, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [K6](https://k6.io/docs/getting-started/installation/) (you can also install it via this [link](https://k6.io/docs/getting-started/installation/#binary-packages))
- [Git](https://git-scm.com/)

## **Project Setup**

1. **Clone the repository:**
    ```bash
    git clone https://github.com/ParasPaul11/k6-performance-test.git
    cd k6-performance-test
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Bundle the test script using Webpack:**
    ```bash
    npx webpack
    ```

## **K6 Test Script**

The main K6 test script is located in the `src/` directory.

- **`src/test.js`**: The main test script that simulates different user behaviors using multiple scenarios, custom metrics, and thresholds.

## **Webpack Configuration**

Webpack is used to bundle the K6 test script for optimal performance. The configuration file is located at:

- **`webpack.config.js`**: This file defines how the K6 scripts are bundled.

## **GitHub Actions CI**

This project uses GitHub Actions for continuous integration. The CI pipeline is triggered on every push or pull request to the `main` branch.

### **CI Workflow Overview**

- **Workflow File:** `.github/workflows/k6-test.yml`
- **Steps:**
  1. Check out the repository.
  2. Set up Node.js.
  3. Install project dependencies.
  4. Bundle the K6 script using Webpack.
  5. Install and run K6 to execute the performance tests.

## **Running the Tests Locally**

To run the K6 tests locally:

1. **Build the bundle:**
    ```bash
    npx webpack
    ```

2. **Run the K6 tests:**
    ```bash
    k6 run dist/bundle.js
    ```

This will execute the bundled K6 script and display the results in your terminal.


