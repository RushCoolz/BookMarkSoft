const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'tools');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const before = content;
  
  // Replace dark:bg-slate-100 with dark:bg-slate-950
  // It was wrongly injected after bg-slate-900 because we assumed all dark elements in light mode should be light in dark mode.
  // But code blocks should remain dark!
  content = content.replace(/dark:bg-slate-100/g, 'dark:bg-slate-950');
  
  if (before !== content) {
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
console.log("Done v3.");
