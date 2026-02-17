// Frontend API Integration Test Script
// Run this in the browser console or as a standalone test file

import { API_BASE_URL, APIENDPOINT } from './src/services/api.js';
import { publicAxios, secureAxios } from './src/services/authAxios.js';
import * as authService from './src/services/authService.js';
import * as expertService from './src/services/expertService.js';
import * as centerService from './src/services/centerService.js';
import * as logService from './src/services/logService.js';
import * as appointmentService from './src/services/appointmentService.js';
import * as adminService from './src/services/adminService.js';

// Test results storage
const testResults = {
  passed: [],
  failed: [],
  skipped: []
};

// Helper function to log test results
function logTest(name, status, details = '') {
  const result = { name, status, details, timestamp: new Date().toISOString() };
  
  if (status === 'PASS') {
    testResults.passed.push(result);
    console.log(`✅ ${name}`);
  } else if (status === 'FAIL') {
    testResults.failed.push(result);
    console.error(`❌ ${name}: ${details}`);
  } else {
    testResults.skipped.push(result);
    console.warn(`⏭️  ${name}: ${details}`);
  }
}

// Test data
const testData = {
  user: {
    email: `test_${Date.now()}@example.com`,
    password: 'Test123!@#',
    role: 'user'
  },
  expert: {
    name: 'Dr. Test Expert',
    category: 'Psychologist',
    experience: '5-10 years',
    bio: 'Test bio for expert registration',
    languages: ['English', 'Spanish'],
    contact: {
      phone: '+1234567890',
      email: 'expert@test.com',
      website: 'https://test.com',
      location: 'Test City'
    },
    qualifications: [{ value: 'PhD in Psychology' }],
    specialties: [{ value: 'Anxiety Disorders' }],
    services: [{
      name: 'Individual Therapy',
      format: 'Online',
      duration: '50',
      price: '100'
    }],
    availability: {
      monday: { selected: true, startTime: '09:00', endTime: '17:00' }
    },
    faq: [{ question: 'Test question?', answer: 'Test answer' }]
  },
  center: {
    name: 'Test Wellness Center',
    category: 'Gym & Yoga Center',
    description: 'Test description for wellness center',
    address: '123 Test St, Test City, TS, 12345',
    latitude: '40.7128',
    longitude: '-74.0060',
    phone: '+1234567890',
    email: 'center@test.com',
    website: 'https://testcenter.com'
  }
};

// Store token for authenticated requests
let authToken = null;
let userId = null;

// ============================================
// TEST SUITE 1: Configuration Tests
// ============================================
async function testConfiguration() {
  console.log('\n🔧 Testing Configuration...\n');
  
  try {
    // Test 1: API_BASE_URL is correct
    const expectedBaseUrl = 'http://localhost:4000/api/v1';
    if (API_BASE_URL === expectedBaseUrl) {
      logTest('API_BASE_URL Configuration', 'PASS');
    } else {
      logTest('API_BASE_URL Configuration', 'FAIL', `Expected ${expectedBaseUrl}, got ${API_BASE_URL}`);
    }
    
    // Test 2: APIENDPOINT has required keys
    const requiredEndpoints = [
      'LOGIN', 'SIGNUP', 'GET_USER_ME', 'UPDATE_USER',
      'EXPERTS_LIST', 'EXPERTS_DETAIL', 'EXPERTS_REGISTER',
      'CENTERS_LIST', 'CENTERS_DETAIL', 'CENTERS_REGISTER',
      'LOGS_DASHBOARD', 'LOGS_ACTIVITY', 'LOGS_MEAL', 'LOGS_SLEEP',
      'APPOINTMENTS', 'ADMIN_USERS', 'ADMIN_EXPERTS', 'ADMIN_CENTERS'
    ];
    
    const missingEndpoints = requiredEndpoints.filter(key => !APIENDPOINT[key]);
    if (missingEndpoints.length === 0) {
      logTest('APIENDPOINT Configuration', 'PASS');
    } else {
      logTest('APIENDPOINT Configuration', 'FAIL', `Missing endpoints: ${missingEndpoints.join(', ')}`);
    }
    
    // Test 3: Axios instances configured correctly
    if (publicAxios.defaults.baseURL === API_BASE_URL) {
      logTest('publicAxios Configuration', 'PASS');
    } else {
      logTest('publicAxios Configuration', 'FAIL', `BaseURL mismatch`);
    }
    
    if (secureAxios.defaults.baseURL === API_BASE_URL) {
      logTest('secureAxios Configuration', 'PASS');
    } else {
      logTest('secureAxios Configuration', 'FAIL', `BaseURL mismatch`);
    }
    
  } catch (error) {
    logTest('Configuration Tests', 'FAIL', error.message);
  }
}

// ============================================
// TEST SUITE 2: Auth Service Tests
// ============================================
async function testAuthService() {
  console.log('\n🔐 Testing Auth Service...\n');
  
  try {
    // Test 1: Signup
    try {
      const signupResult = await authService.signup(
        testData.user.email,
        testData.user.password,
        testData.user.role
      );
      
      if (signupResult && signupResult.token) {
        authToken = signupResult.token;
        userId = signupResult.user?.id;
        localStorage.setItem('token', authToken);
        logTest('Auth: Signup', 'PASS');
      } else {
        logTest('Auth: Signup', 'FAIL', 'No token returned');
      }
    } catch (error) {
      logTest('Auth: Signup', 'FAIL', error.toString());
    }
    
    // Test 2: Login
    try {
      const loginResult = await authService.login(
        testData.user.email,
        testData.user.password
      );
      
      if (loginResult && loginResult.token) {
        authToken = loginResult.token;
        userId = loginResult.user?.id;
        localStorage.setItem('token', authToken);
        logTest('Auth: Login', 'PASS');
      } else {
        logTest('Auth: Login', 'FAIL', 'No token returned');
      }
    } catch (error) {
      logTest('Auth: Login', 'FAIL', error.toString());
    }
    
    // Test 3: Get User Me
    if (authToken) {
      try {
        const userResult = await authService.getUserMe();
        
        if (userResult && userResult.id) {
          userId = userResult.id;
          logTest('Auth: Get User Me', 'PASS');
        } else {
          logTest('Auth: Get User Me', 'FAIL', 'No user data returned');
        }
      } catch (error) {
        logTest('Auth: Get User Me', 'FAIL', error.toString());
      }
    } else {
      logTest('Auth: Get User Me', 'SKIP', 'No auth token available');
    }
    
    // Test 4: Update User Profile
    if (authToken) {
      try {
        const updateResult = await authService.updateUserProfile({
          name: 'Test User Updated'
        });
        
        logTest('Auth: Update User Profile', 'PASS');
      } catch (error) {
        logTest('Auth: Update User Profile', 'FAIL', error.toString());
      }
    } else {
      logTest('Auth: Update User Profile', 'SKIP', 'No auth token available');
    }
    
  } catch (error) {
    logTest('Auth Service Tests', 'FAIL', error.message);
  }
}

// ============================================
// TEST SUITE 3: Expert Service Tests
// ============================================
async function testExpertService() {
  console.log('\n👨‍⚕️ Testing Expert Service...\n');
  
  try {
    // Test 1: Fetch Experts List
    try {
      const expertsList = await expertService.fetchExpertsList(
        null, // search
        null, // category
        null, // sortBy
        1,    // page
        10    // limit
      );
      
      if (Array.isArray(expertsList)) {
        logTest('Expert: Fetch List', 'PASS', `Found ${expertsList.length} experts`);
      } else {
        logTest('Expert: Fetch List', 'FAIL', 'Response is not an array');
      }
    } catch (error) {
      logTest('Expert: Fetch List', 'FAIL', error.toString());
    }
    
    // Test 2: Fetch Expert Details (if experts exist)
    try {
      const expertsList = await expertService.fetchExpertsList(null, null, null, 1, 1);
      
      if (expertsList && expertsList.length > 0) {
        const expertId = expertsList[0].id;
        const expertDetails = await expertService.fetchExpertDetails(expertId);
        
        if (expertDetails && expertDetails.id === expertId) {
          logTest('Expert: Fetch Details', 'PASS');
        } else {
          logTest('Expert: Fetch Details', 'FAIL', 'Invalid expert details');
        }
      } else {
        logTest('Expert: Fetch Details', 'SKIP', 'No experts available to test');
      }
    } catch (error) {
      logTest('Expert: Fetch Details', 'FAIL', error.toString());
    }
    
    // Test 3: Register Expert (requires FormData, skip in automated test)
    logTest('Expert: Register', 'SKIP', 'Requires file upload - test manually');
    
  } catch (error) {
    logTest('Expert Service Tests', 'FAIL', error.message);
  }
}

// ============================================
// TEST SUITE 4: Center Service Tests
// ============================================
async function testCenterService() {
  console.log('\n🏢 Testing Center Service...\n');
  
  try {
    // Test 1: Fetch Centers List
    try {
      const centersList = await centerService.fetchCenters(
        null, // search
        null, // category
        null, // sortBy
        1,    // page
        10    // limit
      );
      
      if (Array.isArray(centersList)) {
        logTest('Center: Fetch List', 'PASS', `Found ${centersList.length} centers`);
      } else {
        logTest('Center: Fetch List', 'FAIL', 'Response is not an array');
      }
    } catch (error) {
      logTest('Center: Fetch List', 'FAIL', error.toString());
    }
    
    // Test 2: Fetch Center Details (if centers exist)
    try {
      const centersList = await centerService.fetchCenters(null, null, null, 1, 1);
      
      if (centersList && centersList.length > 0) {
        const centerId = centersList[0].id;
        const centerDetails = await centerService.fetchCenterDetails(centerId);
        
        if (centerDetails && centerDetails.id === centerId) {
          logTest('Center: Fetch Details', 'PASS');
        } else {
          logTest('Center: Fetch Details', 'FAIL', 'Invalid center details');
        }
      } else {
        logTest('Center: Fetch Details', 'SKIP', 'No centers available to test');
      }
    } catch (error) {
      logTest('Center: Fetch Details', 'FAIL', error.toString());
    }
    
    // Test 3: Register Center (requires FormData, skip in automated test)
    logTest('Center: Register', 'SKIP', 'Requires file upload - test manually');
    
  } catch (error) {
    logTest('Center Service Tests', 'FAIL', error.message);
  }
}

// ============================================
// TEST SUITE 5: Log Service Tests
// ============================================
async function testLogService() {
  console.log('\n📊 Testing Log Service...\n');
  
  if (!authToken) {
    logTest('Log Service Tests', 'SKIP', 'No auth token available');
    return;
  }
  
  try {
    // Test 1: Fetch Dashboard Logs
    try {
      const dashboardLogs = await logService.fetchDashboardLogs();
      logTest('Log: Fetch Dashboard', 'PASS');
    } catch (error) {
      logTest('Log: Fetch Dashboard', 'FAIL', error.toString());
    }
    
    // Test 2: Add Activity Log
    try {
      const activityLog = await logService.addActivityLog({
        activity_type: 'Running',
        duration: 30,
        calories_burned: 200,
        date: new Date().toISOString()
      });
      logTest('Log: Add Activity', 'PASS');
    } catch (error) {
      logTest('Log: Add Activity', 'FAIL', error.toString());
    }
    
    // Test 3: Add Meal Log
    try {
      const mealLog = await logService.addMealLog({
        meal_type: 'Breakfast',
        food_items: 'Oatmeal',
        calories: 300,
        date: new Date().toISOString()
      });
      logTest('Log: Add Meal', 'PASS');
    } catch (error) {
      logTest('Log: Add Meal', 'FAIL', error.toString());
    }
    
    // Test 4: Add Sleep Log
    try {
      const sleepLog = await logService.addSleepLog({
        sleep_start: new Date().toISOString(),
        sleep_end: new Date().toISOString(),
        duration: 8,
        quality: 'Good'
      });
      logTest('Log: Add Sleep', 'PASS');
    } catch (error) {
      logTest('Log: Add Sleep', 'FAIL', error.toString());
    }
    
  } catch (error) {
    logTest('Log Service Tests', 'FAIL', error.message);
  }
}

// ============================================
// TEST SUITE 6: Appointment Service Tests
// ============================================
async function testAppointmentService() {
  console.log('\n📅 Testing Appointment Service...\n');
  
  if (!authToken || !userId) {
    logTest('Appointment Service Tests', 'SKIP', 'No auth token or user ID available');
    return;
  }
  
  try {
    // Test 1: Fetch User Appointments
    try {
      const appointments = await appointmentService.fetchUserAppointments(userId);
      
      if (Array.isArray(appointments)) {
        logTest('Appointment: Fetch User Appointments', 'PASS', `Found ${appointments.length} appointments`);
      } else {
        logTest('Appointment: Fetch User Appointments', 'FAIL', 'Response is not an array');
      }
    } catch (error) {
      logTest('Appointment: Fetch User Appointments', 'FAIL', error.toString());
    }
    
    // Test 2: Create Appointment (requires expert ID)
    logTest('Appointment: Create', 'SKIP', 'Requires expert ID - test manually');
    
    // Test 3: Fetch Single Appointment
    logTest('Appointment: Fetch Single', 'SKIP', 'Requires appointment ID - test manually');
    
    // Test 4: Update Appointment
    logTest('Appointment: Update', 'SKIP', 'Requires appointment ID - test manually');
    
  } catch (error) {
    logTest('Appointment Service Tests', 'FAIL', error.message);
  }
}

// ============================================
// TEST SUITE 7: Admin Service Tests
// ============================================
async function testAdminService() {
  console.log('\n👑 Testing Admin Service...\n');
  
  if (!authToken) {
    logTest('Admin Service Tests', 'SKIP', 'No auth token available');
    return;
  }
  
  try {
    // Test 1: Fetch Admin Users
    try {
      const users = await adminService.fetchAdminUsers(1, 10);
      logTest('Admin: Fetch Users', 'PASS', `Found ${users?.length || 0} users`);
    } catch (error) {
      // Expected to fail if not admin
      if (error.toString().includes('403') || error.toString().includes('Forbidden')) {
        logTest('Admin: Fetch Users', 'SKIP', 'User is not admin (expected)');
      } else {
        logTest('Admin: Fetch Users', 'FAIL', error.toString());
      }
    }
    
    // Test 2: Fetch Admin Experts
    try {
      const experts = await adminService.fetchAdminExperts(1, 10);
      logTest('Admin: Fetch Experts', 'PASS', `Found ${experts?.length || 0} experts`);
    } catch (error) {
      if (error.toString().includes('403') || error.toString().includes('Forbidden')) {
        logTest('Admin: Fetch Experts', 'SKIP', 'User is not admin (expected)');
      } else {
        logTest('Admin: Fetch Experts', 'FAIL', error.toString());
      }
    }
    
    // Test 3: Fetch Admin Centers
    try {
      const centers = await adminService.fetchAdminCenters(1, 10);
      logTest('Admin: Fetch Centers', 'PASS', `Found ${centers?.length || 0} centers`);
    } catch (error) {
      if (error.toString().includes('403') || error.toString().includes('Forbidden')) {
        logTest('Admin: Fetch Centers', 'SKIP', 'User is not admin (expected)');
      } else {
        logTest('Admin: Fetch Centers', 'FAIL', error.toString());
      }
    }
    
    // Test 4: Fetch Dashboard Stats
    try {
      const stats = await adminService.fetchDashboardStats();
      logTest('Admin: Fetch Dashboard Stats', 'PASS');
    } catch (error) {
      if (error.toString().includes('403') || error.toString().includes('Forbidden')) {
        logTest('Admin: Fetch Dashboard Stats', 'SKIP', 'User is not admin (expected)');
      } else {
        logTest('Admin: Fetch Dashboard Stats', 'FAIL', error.toString());
      }
    }
    
    // Test 5: Fetch Audit Logs
    try {
      const logs = await adminService.fetchAuditLogs(1, 10);
      logTest('Admin: Fetch Audit Logs', 'PASS', `Found ${logs?.length || 0} logs`);
    } catch (error) {
      if (error.toString().includes('403') || error.toString().includes('Forbidden')) {
        logTest('Admin: Fetch Audit Logs', 'SKIP', 'User is not admin (expected)');
      } else {
        logTest('Admin: Fetch Audit Logs', 'FAIL', error.toString());
      }
    }
    
  } catch (error) {
    logTest('Admin Service Tests', 'FAIL', error.message);
  }
}

// ============================================
// RUN ALL TESTS
// ============================================
async function runAllTests() {
  console.log('🚀 Starting Frontend API Integration Tests...\n');
  console.log('=' .repeat(60));
  
  const startTime = Date.now();
  
  await testConfiguration();
  await testAuthService();
  await testExpertService();
  await testCenterService();
  await testLogService();
  await testAppointmentService();
  await testAdminService();
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 TEST RESULTS SUMMARY\n');
  console.log(`✅ Passed: ${testResults.passed.length}`);
  console.log(`❌ Failed: ${testResults.failed.length}`);
  console.log(`⏭️  Skipped: ${testResults.skipped.length}`);
  console.log(`⏱️  Duration: ${duration}s`);
  
  if (testResults.failed.length > 0) {
    console.log('\n❌ Failed Tests:');
    testResults.failed.forEach(test => {
      console.log(`  - ${test.name}: ${test.details}`);
    });
  }
  
  console.log('\n' + '='.repeat(60));
  
  return testResults;
}

// Export for use
export { runAllTests, testResults };

// Auto-run if in browser console
if (typeof window !== 'undefined') {
  window.runFrontendAPITests = runAllTests;
  console.log('💡 Run tests by calling: window.runFrontendAPITests()');
}
