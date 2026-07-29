const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'tools');
const files = fs.readdirSync(dir);
let count = 0;

for (const file of files) {
  if (file.endsWith('.tsx')) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    let changed = false;

    // Split by <select and <input type="date" and fix the className attribute
    // Strategy: find all `className="something"` within `<select...>` block.
    
    // Quick regex to find <select ... >
    content = content.replace(/<select\s+([^>]*?)>/gi, (match, inner) => {
      if (inner.includes('className="')) {
        return match.replace(/className="([^"]+)"/, (cMatch, classes) => {
          if (!classes.includes('dark:bg-slate')) {
            changed = true;
            return `className="${classes} dark:bg-slate-800 dark:text-white dark:border-slate-700"`;
          }
          return cMatch;
        });
      }
      return match;
    });

    content = content.replace(/<input\s+([^>]*?)type="date"([^>]*?)>/gi, (match, p1, p2) => {
      const inner = p1 + p2;
      if (inner.includes('className="')) {
         return match.replace(/className="([^"]+)"/, (cMatch, classes) => {
            if (!classes.includes('dark:bg-slate')) {
              changed = true;
              return `className="${classes} dark:bg-slate-800 dark:text-white dark:border-slate-700"`;
            }
            return cMatch;
         });
      }
      return match;
    });

    if (changed) {
      fs.writeFileSync(fullPath, content);
      console.log("Updated", file);
      count++;
    }
  }
}
console.log("Total updated:", count);
