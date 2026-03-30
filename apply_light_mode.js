import fs from 'fs';
import path from 'path';

const dir = './src/components';
const appFile = './src/App.jsx';

const replacements = [
  // Backgrounds
  { search: /(?<!dark:)bg-gray-950(?![\/\w])/g, replace: 'bg-white dark:bg-gray-950' },
  { search: /(?<!dark:)bg-gray-900(?![\/\w])/g, replace: 'bg-gray-50 dark:bg-gray-900' },
  { search: /(?<!dark:)bg-gray-800(?![\/\w])/g, replace: 'bg-gray-100 dark:bg-gray-800' },
  { search: /(?<!dark:)bg-gray-950\/50/g, replace: 'bg-white/50 dark:bg-gray-950/50' },
  { search: /(?<!dark:)bg-gray-950\/80/g, replace: 'bg-white/80 dark:bg-gray-950/80' },
  { search: /(?<!dark:)bg-gray-900\/80/g, replace: 'bg-gray-50/80 dark:bg-gray-900/80' },
  { search: /(?<!dark:)bg-gray-900\/50/g, replace: 'bg-gray-50/50 dark:bg-gray-900/50' },
  
  // Text
  { search: /(?<!dark:)text-white(?![\/\w])/g, replace: 'text-gray-900 dark:text-white' },
  { search: /(?<!dark:)text-gray-300(?![\/\w])/g, replace: 'text-gray-700 dark:text-gray-300' },
  { search: /(?<!dark:)text-gray-400(?![\/\w])/g, replace: 'text-gray-600 dark:text-gray-400' },
  { search: /(?<!dark:)text-gray-500(?![\/\w])/g, replace: 'text-gray-500 dark:text-gray-500' },
  
  // Borders
  { search: /(?<!dark:)border-white\/5(?![\/\w])/g, replace: 'border-gray-200 dark:border-white/5' },
  { search: /(?<!dark:)border-white\/10(?![\/\w])/g, replace: 'border-gray-200 dark:border-white/10' },
  { search: /(?<!dark:)border-gray-800(?![\/\w])/g, replace: 'border-gray-200 dark:border-gray-800' },
  { search: /(?<!dark:)border-gray-700(?![\/\w])/g, replace: 'border-gray-300 dark:border-gray-700' },
  { search: /(?<!dark:)border-gray-900(?![\/\w])/g, replace: 'border-gray-200 dark:border-gray-900' },
  
  // Gradients
  { search: /(?<!dark:)from-gray-900(?![\/\w])/g, replace: 'from-gray-50 dark:from-gray-900' },
  { search: /(?<!dark:)to-gray-950(?![\/\w])/g, replace: 'to-white dark:to-gray-950' },
  { search: /(?<!dark:)to-gray-800(?![\/\w])/g, replace: 'to-gray-100 dark:to-gray-800' },
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;
  
  replacements.forEach(r => {
    content = content.replace(r.search, r.replace);
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Updated', filePath);
  }
}

// Process components
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));
files.forEach(f => processFile(path.join(dir, f)));

// Process App.jsx
processFile(appFile);
console.log('Update Complete.');
