const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Tailwind CSS Setup...\n');

const checks = [
  {
    name: 'tailwind.config.js exists',
    path: './tailwind.config.js',
    type: 'file'
  },
  {
    name: 'postcss.config.js exists',
    path: './postcss.config.js',
    type: 'file'
  },
  {
    name: 'src/index.css exists',
    path: './src/index.css',
    type: 'file'
  },
  {
    name: 'src/index.tsx exists',
    path: './src/index.tsx',
    type: 'file'
  }
];

let allPassed = true;

checks.forEach(check => {
  const exists = fs.existsSync(check.path);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${check.name}`);
  if (!exists) allPassed = false;
});

console.log('\n📄 Checking file contents...\n');

// Check index.css for @tailwind directives
if (fs.existsSync('./src/index.css')) {
  const indexCss = fs.readFileSync('./src/index.css', 'utf8');
  const hasTailwindBase = indexCss.includes('@tailwind base');
  const hasTailwindComponents = indexCss.includes('@tailwind components');
  const hasTailwindUtilities = indexCss.includes('@tailwind utilities');
  
  console.log(`${hasTailwindBase ? '✅' : '❌'} @tailwind base directive`);
  console.log(`${hasTailwindComponents ? '✅' : '❌'} @tailwind components directive`);
  console.log(`${hasTailwindUtilities ? '✅' : '❌'} @tailwind utilities directive`);
  
  if (!hasTailwindBase || !hasTailwindComponents || !hasTailwindUtilities) {
    allPassed = false;
  }
}

// Check index.tsx imports index.css
if (fs.existsSync('./src/index.tsx')) {
  const indexTsx = fs.readFileSync('./src/index.tsx', 'utf8');
  const importsIndexCss = indexTsx.includes("import './index.css'");
  
  console.log(`${importsIndexCss ? '✅' : '❌'} index.tsx imports index.css`);
  
  if (!importsIndexCss) allPassed = false;
}

// Check tailwind.config.js content paths
if (fs.existsSync('./tailwind.config.js')) {
  const tailwindConfig = fs.readFileSync('./tailwind.config.js', 'utf8');
  const hasContentPath = tailwindConfig.includes('./src/**/*.{js,jsx,ts,tsx}');
  
  console.log(`${hasContentPath ? '✅' : '❌'} Tailwind content paths configured`);
  
  if (!hasContentPath) allPassed = false;
}

console.log('\n📦 Checking dependencies...\n');

if (fs.existsSync('./package.json')) {
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  const hasTailwind = 'tailwindcss' in deps;
  const hasPostcss = 'postcss' in deps;
  const hasAutoprefixer = 'autoprefixer' in deps;
  
  console.log(`${hasTailwind ? '✅' : '❌'} tailwindcss installed`);
  console.log(`${hasPostcss ? '✅' : '❌'} postcss installed`);
  console.log(`${hasAutoprefixer ? '✅' : '❌'} autoprefixer installed`);
  
  if (!hasTailwind || !hasPostcss || !hasAutoprefixer) {
    allPassed = false;
  }
}

console.log('\n' + '='.repeat(50));

if (allPassed) {
  console.log('✅ All checks passed! Tailwind CSS is properly configured.');
  console.log('\n📝 Next steps:');
  console.log('1. Stop the dev server if running (Ctrl+C)');
  console.log('2. Clear cache: rmdir /s /q node_modules\\.cache');
  console.log('3. Restart: npm start');
  console.log('4. Hard refresh browser (Ctrl+Shift+R)');
} else {
  console.log('❌ Some checks failed. Please review the errors above.');
  console.log('\n📝 To fix:');
  console.log('1. Run: npm install tailwindcss postcss autoprefixer --save-dev --legacy-peer-deps');
  console.log('2. Run: npx tailwindcss init -p');
  console.log('3. Check docs/TAILWIND-SETUP-FIX.md for detailed instructions');
}

console.log('='.repeat(50) + '\n');
