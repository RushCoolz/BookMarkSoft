const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'tools');

const replacements = {
  'bg-white': 'dark:bg-slate-900',
  'bg-slate-50': 'dark:bg-slate-800/50',
  'bg-slate-100': 'dark:bg-slate-800',
  'bg-slate-900': 'dark:bg-slate-100',
  
  'border-slate-100': 'dark:border-slate-800',
  'border-slate-200': 'dark:border-slate-700',
  'border-slate-300': 'dark:border-slate-600',
  
  'text-slate-800': 'dark:text-slate-200',
  'text-slate-700': 'dark:text-slate-300',
  'text-slate-600': 'dark:text-slate-400',
  'text-slate-500': 'dark:text-slate-400',
  'text-slate-400': 'dark:text-slate-500',
  'text-slate-300': 'dark:text-slate-600',
  
  'placeholder-slate-400': 'dark:placeholder-slate-500',
  
  'bg-indigo-50': 'dark:bg-indigo-500/10',
  'text-indigo-700': 'dark:text-indigo-400',
  'border-indigo-100': 'dark:border-indigo-500/20',
  
  'text-white': 'dark:text-slate-900',
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find all className="something" or className={`something`}
  const classRegex = /className=["']([^"']+)["']|className=\{`([^`]+)`\}/g;
  
  content = content.replace(classRegex, (match, p1, p2) => {
    const classStr = p1 || p2;
    const isTemplateString = !!p2;
    
    // Split into tokens
    let tokens = classStr.split(/\s+/);
    let newTokens = [];
    
    for (let token of tokens) {
      newTokens.push(token);
      
      // Check if we have a replacement mapping
      if (replacements[token]) {
        const darkToken = replacements[token];
        // Only append if not already in the string
        if (!tokens.includes(darkToken) && !newTokens.includes(darkToken)) {
          newTokens.push(darkToken);
        }
      }
    }
    
    // Check if the element contains inputs or textareas and they don't have bg defined?
    // Not safely doable here. We just replace existing light mode classes.
    
    const newClassStr = newTokens.join(' ');
    
    if (isTemplateString) {
      return `className={\`${newClassStr}\`}`;
    } else {
      return `className="${newClassStr}"`;
    }
  });
  
  // For raw strings inside className like className={"bg-white " + ...} we might miss them,
  // but most of our react code uses literal strings or template literals.
  
  // Let's also do a fast global pass just in case for input elements without explicit bg classes.
  // Actually, our tools usually have `bg-slate-50` or `bg-white`.
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed: ${path.basename(filePath)}`);
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
console.log("Done.");
