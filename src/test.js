import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Counter, Rate, Gauge } from 'k6/metrics';


//Auther: Paras Paul
// Custom metrics
const waitingTime = new Trend('waiting_time'); // Tracks waiting time
const myCounter = new Counter('successful_requests'); // Counts successful requests
const successRate = new Rate('success_rate'); // Measures the rate of successful requests
const responseSize = new Gauge('response_size'); // Tracks the size of responses

// Example setup data
let testData = null;
const host = "https://jsonplaceholder.typicode.com/posts";



export const options = {
  scenarios: {  
  scenario_1: {
      executor: 'constant-vus',
      vus: 5,
      duration: '20s',
    },
    scenario_2: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '5s', target: 5 }, 
        { duration: '5s', target: 5 },
        { duration: '5s', target: 10 },
        { duration: '5s', target: 10 },
        { duration: '0s', target: 0 },
      ],
    },
    scenario_3: {
      executor: 'per-vu-iterations',
      vus: 5,
      iterations: 5,
      maxDuration: '10s',
    },
    scenario_4: {
      executor: 'shared-iterations',
      vus: 3,
      iterations: 20,
      maxDuration: '15s',
    },
    scenario_5: {
      executor: 'constant-arrival-rate',
      rate: 10, // new virtual users per second
      timeUnit: '1s',
      duration: '15s',
      preAllocatedVUs: 5,
      maxVUs: 50,
    },
  },
 
  thresholds: {
    'http_req_duration': ['p(95)<500'], // 95% of requests should be under 500ms
    'waiting_time': ['avg<300'], // Average waiting time should be under 300ms
    'successful_requests': ['count>0'], // There should be at least one successful request
    'success_rate': ['rate>0.95'], // 95% of requests should be successful
},
}; 

export function setup() {
  // Setup tasks, e.g., initialize data or state
  console.log('Setting up test data...');
  
  // Simulate fetching or preparing test data
  testData = http.get(host).json();
  
  // Return any data needed for the test function
  return testData;
}

export default function () {
  const res = http.get(host, {tags: {name: "Tx_00_GetAPI"}});
  
  // Checking the response
  const checkRes = check(res, {
    'status was 200': (r) => r.status === 200,
  });

  // Add custom metric data
  waitingTime.add(res.timings.waiting);
  responseSize.add(res.body.length); // Record the size of the response body

  // Update success metrics
  myCounter.add(1);
  successRate.add(checkRes);
  
  sleep(Math.random() *2); //Generate random delay betn 0-2 secs 
}

export function teardown(data) {
  // Teardown tasks, e.g., cleanup resources or state
  console.log('Tearing down test data...');
  
  // This example just logs the data to the console
  console.log(`Test data summary: ${JSON.stringify(data)}`);
}
