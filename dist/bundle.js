/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("k6/http");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("k6");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("k6/metrics");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   options: () => (/* binding */ options),
/* harmony export */   setup: () => (/* binding */ setup),
/* harmony export */   teardown: () => (/* binding */ teardown)
/* harmony export */ });
/* harmony import */ var k6_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var k6_http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(k6_http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var k6__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var k6__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(k6__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var k6_metrics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var k6_metrics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(k6_metrics__WEBPACK_IMPORTED_MODULE_2__);




//MyCode
// Custom metrics
var waitingTime = new k6_metrics__WEBPACK_IMPORTED_MODULE_2__.Trend('waiting_time'); // Tracks waiting time
var myCounter = new k6_metrics__WEBPACK_IMPORTED_MODULE_2__.Counter('successful_requests'); // Counts successful requests
var successRate = new k6_metrics__WEBPACK_IMPORTED_MODULE_2__.Rate('success_rate'); // Measures the rate of successful requests
var responseSize = new k6_metrics__WEBPACK_IMPORTED_MODULE_2__.Gauge('response_size'); // Tracks the size of responses

// Example setup data
var testData = null;
var host = "https://jsonplaceholder.typicode.com/posts";
var options = {
  scenarios: {
    scenario_1: {
      executor: 'constant-vus',
      vus: 5,
      duration: '20s'
    },
    scenario_2: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [{
        duration: '5s',
        target: 5
      }, {
        duration: '5s',
        target: 5
      }, {
        duration: '5s',
        target: 10
      }, {
        duration: '5s',
        target: 10
      }, {
        duration: '0s',
        target: 0
      }]
    },
    scenario_3: {
      executor: 'per-vu-iterations',
      vus: 5,
      iterations: 5,
      maxDuration: '10s'
    },
    scenario_4: {
      executor: 'shared-iterations',
      vus: 3,
      iterations: 20,
      maxDuration: '15s'
    },
    scenario_5: {
      executor: 'constant-arrival-rate',
      rate: 10,
      // new virtual users per second
      timeUnit: '1s',
      duration: '15s',
      preAllocatedVUs: 5,
      maxVUs: 50
    }
  },
  thresholds: {
    'http_req_duration': ['p(95)<500'],
    // 95% of requests should be under 500ms
    'waiting_time': ['avg<300'],
    // Average waiting time should be under 300ms
    'successful_requests': ['count>0'],
    // There should be at least one successful request
    'success_rate': ['rate>0.95'] // 95% of requests should be successful
  }
};
function setup() {
  // Setup tasks, e.g., initialize data or state
  console.log('Setting up test data...');

  // Simulate fetching or preparing test data
  testData = k6_http__WEBPACK_IMPORTED_MODULE_0___default().get(host).json();

  // Return any data needed for the test function
  return testData;
}
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var res = k6_http__WEBPACK_IMPORTED_MODULE_0___default().get(host);

  // Checking the response
  var checkRes = (0,k6__WEBPACK_IMPORTED_MODULE_1__.check)(res, {
    'status was 200': function status_was_200(r) {
      return r.status === 200;
    }
  });

  // Add custom metric data
  waitingTime.add(res.timings.waiting);
  responseSize.add(res.body.length); // Record the size of the response body

  // Update success metrics
  myCounter.add(1);
  successRate.add(checkRes);
  (0,k6__WEBPACK_IMPORTED_MODULE_1__.sleep)(1);
}
function teardown(data) {
  // Teardown tasks, e.g., cleanup resources or state
  console.log('Tearing down test data...');

  // This example just logs the data to the console
  console.log("Test data summary: ".concat(JSON.stringify(data)));
}
module.exports = __webpack_exports__;
/******/ })()
;