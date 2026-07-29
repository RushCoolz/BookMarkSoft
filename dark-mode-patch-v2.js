const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'tools');

const mappings = [
  { find: 'bg-white', replace: 'dark:bg-slate-900' },
  { find: 'bg-slate-50', replace: 'dark:bg-slate-800/50' },
  { find: 'bg-slate-100', replace: 'dark:bg-slate-800' },
  { find: 'focus:bg-white', replace: 'dark:focus:bg-slate-900' },
  
  { find: 'border-slate-100', replace: 'dark:border-slate-800' },
  { find: 'border-slate-200', replace: 'dark:border-slate-700' },
  { find: 'border-slate-300', replace: 'dark:border-slate-600' },
  
  { find: 'text-slate-800', replace: 'dark:text-slate-200' },
  { find: 'text-slate-700', replace: 'dark:text-slate-300' },
  { find: 'text-slate-600', replace: 'dark:text-slate-400' },
  { find: 'text-slate-500', replace: 'dark:text-slate-400' },
  { find: 'text-slate-400', replace: 'dark:text-slate-500' },
  { find: 'text-slate-300', replace: 'dark:text-slate-600' },
  
  { find: 'hover:text-slate-800', replace: 'dark:hover:text-slate-200' },
  { find: 'hover:text-slate-700', replace: 'dark:hover:text-slate-300' },
  { find: 'hover:text-slate-600', replace: 'dark:hover:text-slate-400' },
  
  { find: 'bg-indigo-50', replace: 'dark:bg-indigo-500/10' },
  { find: 'text-indigo-700', replace: 'dark:text-indigo-400' },
  { find: 'border-indigo-100', replace: 'dark:border-indigo-500/20' },
  
  { find: 'hover:bg-slate-50', replace: 'dark:hover:bg-slate-800/50' },
  { find: 'hover:bg-slate-100', replace: 'dark:hover:bg-slate-800' }
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  mappings.forEach(mapping => {
    // Only match the exact word, not prefixed by 'dark:'
    const regex = new RegExp(`(?<!dark:)\\b${mapping.find.replace(/:/g, '\\:')}\\b`, 'g');
    
    const before = content;
    content = content.replace(regex, (match, offset, fullStr) => {
      // Search a bit ahead to see if we already injected the dark mode equivalent
      const window = fullStr.substring(offset, offset + 100);
      if (window.includes(mapping.replace)) {
        return match; // already injected
      }
      return `${match} ${mapping.replace}`;
    });
    if (before !== content) modified = true;
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${path.basename(filePath)}`);
  }
}

function walkDir(currentPath) {
  const files = fs.readdirSync(currentPath);
  for (const file of files) {
    const filePath = path.join(currentPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkDir(filePath);
    } else if (filePath.endsWith('.tsx')) {
      processFile(filePath);
    }
  }
}

walkDir(dir);
console.log("Done v2.");
