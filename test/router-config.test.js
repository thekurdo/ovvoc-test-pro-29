const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
  } catch (e) {
    console.error(`FAIL: ${name} - ${e.message}`);
    failed++;
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg || 'Assertion failed');
}

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

test('react-router-dom is installed', () => {
  assert(pkg.dependencies['react-router-dom'], 'react-router-dom should be in dependencies');
});

test('react-router-dom version is 6.x', () => {
  const version = pkg.dependencies['react-router-dom'];
  assert(version.startsWith('6'), `Expected 6.x, got ${version}`);
});

test('react 18 is installed', () => {
  assert(pkg.dependencies.react === '18.2.0', 'react should be 18.2.0');
});

test('router.jsx exists', () => {
  assert(fs.existsSync(path.join(__dirname, '..', 'src', 'router.jsx')), 'router.jsx should exist');
});

test('router uses createBrowserRouter', () => {
  const content = fs.readFileSync(path.join(__dirname, '..', 'src', 'router.jsx'), 'utf8');
  assert(content.includes('createBrowserRouter'), 'should use createBrowserRouter');
});

test('router uses createRoutesFromElements', () => {
  const content = fs.readFileSync(path.join(__dirname, '..', 'src', 'router.jsx'), 'utf8');
  assert(content.includes('createRoutesFromElements'), 'should use createRoutesFromElements');
});

test('router has loader functions', () => {
  const content = fs.readFileSync(path.join(__dirname, '..', 'src', 'router.jsx'), 'utf8');
  assert(content.includes('homeLoader'), 'should have homeLoader');
  assert(content.includes('userLoader'), 'should have userLoader');
});

test('router has action functions', () => {
  const content = fs.readFileSync(path.join(__dirname, '..', 'src', 'router.jsx'), 'utf8');
  assert(content.includes('settingsAction'), 'should have settingsAction');
});

test('hooks.js uses useNavigate', () => {
  const content = fs.readFileSync(path.join(__dirname, '..', 'src', 'hooks.js'), 'utf8');
  assert(content.includes('useNavigate'), 'should use useNavigate');
  assert(content.includes('useSearchParams'), 'should use useSearchParams');
  assert(content.includes('useParams'), 'should use useParams');
});

test('guards.js uses redirect', () => {
  const content = fs.readFileSync(path.join(__dirname, '..', 'src', 'guards.js'), 'utf8');
  assert(content.includes('redirect'), 'should use redirect');
});

test('router has nested routes', () => {
  const content = fs.readFileSync(path.join(__dirname, '..', 'src', 'router.jsx'), 'utf8');
  assert(content.includes("path: '/'"), 'should have root route');
  assert(content.includes("'users/:userId'"), 'should have user route with param');
});

test('router has catch-all route', () => {
  const content = fs.readFileSync(path.join(__dirname, '..', 'src', 'router.jsx'), 'utf8');
  assert(content.includes("path: '*'"), 'should have catch-all route');
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
